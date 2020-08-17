import { Request, Response } from 'express';
import { ArticleListDataItemType } from '@/pages/frontend/data';

const fakeArticles = [
  {
    id: 1,
    title: '1.1-chan.md',
    content:
      '# 1. 前言\n' +
      'channel是Golang在语言层面提供的goroutine间的通信方式，比Unix管道更易用也更轻便。channel主要用于进程内各goroutine间通信，如果需要跨进程通信，建议使用分布式系统的方法来解决。\n' +
      '\n' +
      '本章从源码角度分析channel的实现机制，实际上这部分源码非常简单易读。\n' +
      '\n' +
      '# 2. chan数据结构\n' +
      '`src/runtime/chan.go:hchan`定义了channel的数据结构：\n' +
      '```go\n' +
      'type hchan struct {\n' +
      '\tqcount   uint           // 当前队列中剩余元素个数\n' +
      '\tdataqsiz uint           // 环形队列长度，即可以存放的元素个数\n' +
      '\tbuf      unsafe.Pointer // 环形队列指针\n' +
      '\telemsize uint16         // 每个元素的大小\n' +
      '\tclosed   uint32\t        // 标识关闭状态\n' +
      '\telemtype *_type         // 元素类型\n' +
      '\tsendx    uint           // 队列下标，指示元素写入时存放到队列中的位置\n' +
      '\trecvx    uint           // 队列下标，指示元素从队列的该位置读出\n' +
      '\trecvq    waitq          // 等待读消息的goroutine队列\n' +
      '\tsendq    waitq          // 等待写消息的goroutine队列\n' +
      '\tlock mutex              // 互斥锁，chan不允许并发读写\n' +
      '}\n' +
      '```\n' +
      '从数据结构可以看出channel由队列、类型信息、goroutine等待队列组成，下面分别说明其原理。\n' +
      '\n' +
      '## 2.1 环形队列\n' +
      'chan内部实现了一个环形队列作为其缓冲区，队列的长度是创建chan时指定的。\n' +
      '\n' +
      '下图展示了一个可缓存6个元素的channel示意图：\n' +
      '\n' +
      '![](images/chan-01-circle_queue.png)\n' +
      '\n' +
      '- dataqsiz指示了队列长度为6，即可缓存6个元素；\n' +
      '- buf指向队列的内存，队列中还剩余两个元素；\n' +
      '- qcount表示队列中还有两个元素；\n' +
      '- sendx指示后续写入的数据存储的位置，取值[0, 6)；\n' +
      '- recvx指示从该位置读取数据, 取值[0, 6)；\n' +
      '\n' +
      '## 2.2 等待队列\n' +
      '从channel读数据，如果channel缓冲区为空或者没有缓冲区，当前goroutine会被阻塞。\n' +
      '向channel写数据，如果channel缓冲区已满或者没有缓冲区，当前goroutine会被阻塞。\n' +
      '\n' +
      '被阻塞的goroutine将会挂在channel的等待队列中：\n' +
      '- 因读阻塞的goroutine会被向channel写入数据的goroutine唤醒；\n' +
      '- 因写阻塞的goroutine会被从channel读数据的goroutine唤醒；\n' +
      '\n' +
      '下图展示了一个没有缓冲区的channel，有几个goroutine阻塞等待读数据：\n' +
      '\n' +
      '![](images/chan-02-wait_queue.png)\n' +
      '\n' +
      '注意，一般情况下recvq和sendq至少有一个为空。只有一个例外，那就是同一个goroutine使用select语句向channel一边写数据，一边读数据。\n' +
      '\n' +
      '## 2.3 类型信息\n' +
      '一个channel只能传递一种类型的值，类型信息存储在hchan数据结构中。\n' +
      '- elemtype代表类型，用于数据传递过程中的赋值；\n' +
      '- elemsize代表类型大小，用于在buf中定位元素位置。\n' +
      '\n' +
      '## 2.4 锁\n' +
      '一个channel同时仅允许被一个goroutine读写，为简单起见，本章后续部分说明读写过程时不再涉及加锁和解锁。\n' +
      '\n' +
      '# 3. channel读写\n' +
      '## 3.1 创建channel\n' +
      '创建channel的过程实际上是初始化hchan结构。其中类型信息和缓冲区长度由make语句传入，buf的大小则与元素大小和缓冲区长度共同决定。\n' +
      '\n' +
      '创建channel的伪代码如下所示：\n' +
      '```go\n' +
      'func makechan(t *chantype, size int) *hchan {\n' +
      '\tvar c *hchan\n' +
      '\tc = new(hchan)\n' +
      '\tc.buf = malloc(元素类型大小*size)\n' +
      '\tc.elemsize = 元素类型大小\n' +
      '\tc.elemtype = 元素类型\n' +
      '\tc.dataqsiz = size\n' +
      '\n' +
      '\treturn c\n' +
      '}\n' +
      '```\n' +
      '\n' +
      '## 3.2 向channel写数据\n' +
      '向一个channel中写数据简单过程如下：\n' +
      '1. 如果等待接收队列recvq不为空，说明缓冲区中没有数据或者没有缓冲区，此时直接从recvq取出G,并把数据写入，最后把该G唤醒，结束发送过程；\n' +
      '2. 如果缓冲区中有空余位置，将数据写入缓冲区，结束发送过程；\n' +
      '3. 如果缓冲区中没有空余位置，将待发送数据写入G，将当前G加入sendq，进入睡眠，等待被读goroutine唤醒；\n' +
      '\n' +
      '简单流程图如下：\n' +
      '\n' +
      '![](images/chan-03-send_data.png)\n' +
      '\n' +
      '## 3.3 从channel读数据\n' +
      '从一个channel读数据简单过程如下：\n' +
      '1. 如果等待发送队列sendq不为空，且没有缓冲区，直接从sendq中取出G，把G中数据读出，最后把G唤醒，结束读取过程；\n' +
      '2. 如果等待发送队列sendq不为空，此时说明缓冲区已满，从缓冲区中首部读出数据，把G中数据写入缓冲区尾部，把G唤醒，结束读取过程；\n' +
      '3. 如果缓冲区中有数据，则从缓冲区取出数据，结束读取过程；\n' +
      '4. 将当前goroutine加入recvq，进入睡眠，等待被写goroutine唤醒；\n' +
      '\n' +
      '简单流程图如下：\n' +
      '\n' +
      '![](images/chan-04-recieve_data.png)\n' +
      '\n' +
      '\n' +
      '## 3.4 关闭channel\n' +
      '关闭channel时会把recvq中的G全部唤醒，本该写入G的数据位置为nil。把sendq中的G全部唤醒，但这些G会panic。\n' +
      '\n' +
      '除此之外，panic出现的常见场景还有：\n' +
      '1. 关闭值为nil的channel\n' +
      '2. 关闭已经被关闭的channel\n' +
      '3. 向已经关闭的channel写数据\n' +
      '\n' +
      '# 4. 常见用法\n' +
      '## 4.1 单向channel\n' +
      '顾名思义，单向channel指只能用于发送或接收数据，实际上也没有单向channel。\n' +
      '\n' +
      '我们知道channel可以通过参数传递，所谓单向channel只是对channel的一种使用限制，这跟C语言使用const修饰函数参数为只读是一个道理。\n' +
      '- func readChan(chanName <-chan int)： 通过形参限定函数内部只能从channel中读取数据\n' +
      '- func writeChan(chanName chan<- int)： 通过形参限定函数内部只能向channel中写入数据\n' +
      '\n' +
      '一个简单的示例程序如下：\n' +
      '```go\n' +
      'func readChan(chanName <-chan int) {\n' +
      '    <- chanName\n' +
      '}\n' +
      '\n' +
      'func writeChan(chanName chan<- int) {\n' +
      '    chanName <- 1\n' +
      '}\n' +
      '\n' +
      'func main() {\n' +
      '    var mychan = make(chan int, 10)\n' +
      '\n' +
      '    writeChan(mychan)\n' +
      '    readChan(mychan)\n' +
      '}\n' +
      '```\n' +
      'mychan是个正常的channel，而readChan()参数限制了传入的channel只能用来读，writeChan()参数限制了传入的channel只能用来写。\n' +
      '\n' +
      '## 4.2 select\n' +
      '使用select可以监控多channel，比如监控多个channel，当其中某一个channel有数据时，就从其读出数据。\n' +
      '\n' +
      '一个简单的示例程序如下：\n' +
      '```go\n' +
      'package main\n' +
      '\n' +
      'import (\n' +
      '    "fmt"\n' +
      '    "time"\n' +
      ')\n' +
      '\n' +
      'func addNumberToChan(chanName chan int) {\n' +
      '    for {\n' +
      '        chanName <- 1\n' +
      '        time.Sleep(1 * time.Second)\n' +
      '    }\n' +
      '}\n' +
      '\n' +
      'func main() {\n' +
      '    var chan1 = make(chan int, 10)\n' +
      '    var chan2 = make(chan int, 10)\n' +
      '\n' +
      '    go addNumberToChan(chan1)\n' +
      '    go addNumberToChan(chan2)\n' +
      '\n' +
      '    for {\n' +
      '        select {\n' +
      '        case e := <- chan1 :\n' +
      '            fmt.Printf("Get element from chan1: %d\\n", e)\n' +
      '        case e := <- chan2 :\n' +
      '            fmt.Printf("Get element from chan2: %d\\n", e)\n' +
      '        default:\n' +
      '            fmt.Printf("No element in chan1 and chan2.\\n")\n' +
      '            time.Sleep(1 * time.Second)\n' +
      '        }\n' +
      '    }\n' +
      '}\n' +
      '```\n' +
      '程序中创建两个channel： chan1和chan2。函数addNumberToChan()函数会向两个channel中周期性写入数据。通过select可以监控两个channel，任意一个可读时就从其中读出数据。\n' +
      '\n' +
      '程序输出如下：\n' +
      '```go\n' +
      'D:\\SourceCode\\GoExpert\\src>go run main.go\n' +
      'Get element from chan1: 1\n' +
      'Get element from chan2: 1\n' +
      'No element in chan1 and chan2.\n' +
      'Get element from chan2: 1\n' +
      'Get element from chan1: 1\n' +
      'No element in chan1 and chan2.\n' +
      'Get element from chan2: 1\n' +
      'Get element from chan1: 1\n' +
      'No element in chan1 and chan2.\n' +
      '\n' +
      '```\n' +
      '从输出可见，从channel中读出数据的顺序是随机的，事实上select语句的多个case执行顺序是随机的，关于select的实现原理会有专门章节分析。\n' +
      '\n' +
      '通过这个示例想说的是：select的case语句读channel不会阻塞，尽管channel中没有数据。这是由于case语句编译后调用读channel时会明确传入不阻塞的参数，此时读不到数据时不会将当前goroutine加入到等待队列，而是直接返回。\n' +
      '\n' +
      '## 4.3 range\n' +
      '通过range可以持续从channel中读出数据，好像在遍历一个数组一样，当channel中没有数据时会阻塞当前goroutine，与读channel时阻塞处理机制一样。\n' +
      '\n' +
      '```go\n' +
      'func chanRange(chanName chan int) {\n' +
      '    for e := range chanName {\n' +
      '        fmt.Printf("Get element from chan: %d\\n", e)\n' +
      '    }\n' +
      '}\n' +
      '```\n' +
      '\n' +
      '注意：如果向此channel写数据的goroutine退出时，系统检测到这种情况后会panic，否则range将会永久阻塞。\n',
    page_view: 20106,
    article_type: '创作集',
    created_at: '2019-08-06 12:12',
  },
  {
    id: 2,
    title: '1.2-slice.md',
    content:
      '# 1. 前言\n' +
      'Slice又称动态数组，依托数组实现，可以方便的进行扩容、传递等，实际使用中比数组更灵活。\n' +
      '\n' +
      '正因为灵活，如果不了解其内部实现机制，有可能遭遇莫名的异常现象。Slice的实现原理很简单，本节试图根据真实的使用场景，在源码中总结实现原理。\n' +
      '\n' +
      '# 2. 热身环节\n' +
      '按照惯例，我们开始前先看几段代码用于检测对Slice的理解程度。\n' +
      '\n' +
      '## 2.1 题目一\n' +
      '下面程序输出什么？\n' +
      '```go\n' +
      'package main\n' +
      '\n' +
      'import (\n' +
      '    "fmt"\n' +
      ')\n' +
      '\n' +
      'func main() {\n' +
      '    var array [10]int\n' +
      '\n' +
      '    var slice = array[5:6]\n' +
      '\n' +
      '    fmt.Println("lenth of slice: ", len(slice))\n' +
      '    fmt.Println("capacity of slice: ", cap(slice))\n' +
      '    fmt.Println(&slice[0] == &array[5])\n' +
      '}\n' +
      '\n' +
      '```\n' +
      '程序解释：\n' +
      'main函数中定义了一个10个长度的整型数组array，然后定义了一个切片slice，切取数组的第6个元素，最后打印slice的长度和容量，判断切片的第一个元素和数组的第6个元素地址是否相等。\n' +
      '\n' +
      '参考答案：\n' +
      'slice跟据数组array创建，与数组共享存储空间，slice起始位置是array[5]，长度为1，容量为5，slice[0]和array[5]地址相同。\n' +
      '\n' +
      '## 2.2 题目二\n' +
      '下面程序输出什么？\n' +
      '```go\n' +
      'package main\n' +
      '\n' +
      'import (\n' +
      '    "fmt"\n' +
      ')\n' +
      '\n' +
      'func AddElement(slice []int, e int) []int {\n' +
      '    return append(slice, e)\n' +
      '}\n' +
      '\n' +
      'func main() {\n' +
      '    var slice []int\n' +
      '    slice = append(slice, 1, 2, 3)\n' +
      '\n' +
      '    newSlice := AddElement(slice, 4)\n' +
      '    fmt.Println(&slice[0] == &newSlice[0])\n' +
      '}\n' +
      '\n' +
      '```\n' +
      '程序解释：\n' +
      '函数AddElement()接受一个切片和一个元素，把元素append进切片中，并返回切片。main()函数中定义一个切片，并向切片中append 3个元素，接着调用AddElement()继续向切片append进第4个元素同时定义一个新的切片newSlice。最后判断新切片newSlice与旧切片slice是否共用一块存储空间。\n' +
      '\n' +
      '参考答案：\n' +
      'append函数执行时会判断切片容量是否能够存放新增元素，如果不能，则会重新申请存储空间，新存储空间将是原来的2倍或1.25倍（取决于扩展原空间大小），本例中实际执行了两次append操作，第一次空间增长到4，所以第二次append不会再扩容，所以新旧两个切片将共用一块存储空间。程序会输出"true"。\n' +
      '\n' +
      '## 2.3 题目三\n' +
      '下面程序由Golang源码改编而来，程序输出什么？\n' +
      '```go\n' +
      'package main\n' +
      '\n' +
      'import (\n' +
      '    "fmt"\n' +
      ')\n' +
      '\n' +
      'func main() {\n' +
      '    orderLen := 5\n' +
      '    order := make([]uint16, 2 * orderLen)\n' +
      '\n' +
      '    pollorder := order[:orderLen:orderLen]\n' +
      '    lockorder := order[orderLen:][:orderLen:orderLen]\n' +
      '\n' +
      '    fmt.Println("len(pollorder) = ", len(pollorder))\n' +
      '    fmt.Println("cap(pollorder) = ", cap(pollorder))\n' +
      '    fmt.Println("len(lockorder) = ", len(lockorder))\n' +
      '    fmt.Println("cap(lockorder) = ", cap(lockorder))\n' +
      '}\n' +
      '```\n' +
      '程序解释：\n' +
      '该段程序源自select的实现代码，程序中定义一个长度为10的切片order，pollorder和lockorder分别是对order切片做了order[low:high:max]操作生成的切片，最后程序分别打印pollorder和lockorder的容量和长度。\n' +
      '\n' +
      '参考答案：\n' +
      'order[low:high:max]操作意思是对order进行切片，新切片范围是[low, high),新切片容量是max。order长度为2倍的orderLen，pollorder切片指的是order的前半部分切片，lockorder指的是order的后半部分切片，即原order分成了两段。所以，pollorder和lockerorder的长度和容量都是orderLen，即5。\n' +
      '\n' +
      '# 3. Slice实现原理\n' +
      'Slice依托数组实现，底层数组对用户屏蔽，在底层数组容量不足时可以实现自动重分配并生成新的Slice。\n' +
      '接下来按照实际使用场景分别介绍其实现机制。\n' +
      '\n' +
      '## 3.1 Slice数据结构\n' +
      '源码包中`src/runtime/slice.go:slice`定义了Slice的数据结构：\n' +
      '```go\n' +
      'type slice struct {\n' +
      '\tarray unsafe.Pointer\n' +
      '\tlen   int\n' +
      '\tcap   int\n' +
      '}\n' +
      '```\n' +
      '从数据结构看Slice很清晰, array指针指向底层数组，len表示切片长度，cap表示底层数组容量。\n' +
      '\n' +
      '## 3.2 使用make创建Slice\n' +
      '使用make来创建Slice时，可以同时指定长度和容量，创建时底层会分配一个数组，数组的长度即容量。\n' +
      '\n' +
      '例如，语句`slice := make([]int, 5, 10)`所创建的Slice，结构如下图所示：\n' +
      '\n' +
      '该Slice长度为5，即可以使用下标slice[0] ~ slice[4]来操作里面的元素，capacity为10，表示后续向slice添加新的元素时可以不必重新分配内存，直接使用预留内存即可。\n' +
      '\n' +
      '## 3.3 使用数组创建Slice\n' +
      '使用数组来创建Slice时，Slice将与原数组共用一部分内存。\n' +
      '\n' +
      '例如，语句`slice := array[5:7]`所创建的Slice，结构如下图所示：\n' +
      '\n' +
      '切片从数组array[5]开始，到数组array[7]结束（不含array[7]），即切片长度为2，数组后面的内容都作为切片的预留内存，即capacity为5。\n' +
      '\n' +
      '数组和切片操作可能作用于同一块内存，这也是使用过程中需要注意的地方。\n' +
      '\n' +
      '## 3.4 Slice 扩容\n' +
      '使用append向Slice追加元素时，如果Slice空间不足，将会触发Slice扩容，扩容实际上是重新分配一块更大的内存，将原Slice数据拷贝进新Slice，然后返回新Slice，扩容后再将数据追加进去。\n' +
      '\n' +
      '例如，当向一个capacity为5，且length也为5的Slice再次追加1个元素时，就会发生扩容，如下图所示：\n' +
      '\n' +
      '扩容操作只关心容量，会把原Slice数据拷贝到新Slice，追加数据由append在扩容结束后完成。上图可见，扩容后新的Slice长度仍然是5，但容量由5提升到了10，原Slice的数据也都拷贝到了新Slice指向的数组中。\n' +
      '\n' +
      '扩容容量的选择遵循以下规则：\n' +
      '- 如果原Slice容量小于1024，则新Slice容量将扩大为原来的2倍；\n' +
      '- 如果原Slice容量大于等于1024，则新Slice容量将扩大为原来的1.25倍；\n' +
      '\n' +
      '使用append()向Slice添加一个元素的实现步骤如下：\n' +
      '1. 假如Slice容量够用，则将新元素追加进去，Slice.len++，返回原Slice\n' +
      '2. 原Slice容量不够，则将Slice先扩容，扩容后得到新Slice\n' +
      '3. 将新元素追加进新Slice，Slice.len++，返回新的Slice。\n' +
      '\n' +
      '## 3.5 Slice Copy\n' +
      '使用copy()内置函数拷贝两个切片时，会将源切片的数据逐个拷贝到目的切片指向的数组中，拷贝数量取两个切片长度的最小值。\n' +
      '\n' +
      '例如长度为10的切片拷贝到长度为5的切片时，将会拷贝5个元素。\n' +
      '\n' +
      '也就是说，copy过程中不会发生扩容。\n' +
      '\n' +
      '## 3.5 特殊切片\n' +
      '跟据数组或切片生成新的切片一般使用`slice := array[start:end]`方式，这种新生成的切片并没有指定切片的容量，实际上新切片的容量是从start开始直至array的结束。\n' +
      '\n' +
      '比如下面两个切片，长度和容量都是一致的，使用共同的内存地址：\n' +
      '```go\n' +
      'sliceA := make([]int, 5, 10)\n' +
      'sliceB := sliceA[0:5]\n' +
      '```\n' +
      '\n' +
      '根据数组或切片生成切片还有另一种写法，即切片同时也指定容量，即slice[start:end:cap], 其中cap即为新切片的容量，当然容量不能超过原切片实际值，如下所示：\n' +
      '```go\n' +
      '    sliceA := make([]int, 5, 10)  //length = 5; capacity = 10\n' +
      '    sliceB := sliceA[0:5]         //length = 5; capacity = 10\n' +
      '    sliceC := sliceA[0:5:5]       //length = 5; capacity = 5\n' +
      '```\n' +
      '这切片方法不常见，在Golang源码里能够见到，不过非常利于切片的理解。\n' +
      '\n' +
      '# 4. 编程Tips\n' +
      '- 创建切片时可跟据实际需要预分配容量，尽量避免追加过程中扩容操作，有利于提升性能；\n' +
      '- 切片拷贝时需要判断实际拷贝的元素个数\n' +
      '- 谨慎使用多个切片操作同一个数组，以防读写冲突\n' +
      '\n' +
      '# 5. Slice总结\n' +
      '- 每个切片都指向一个底层数组\n' +
      '- 每个切片都保存了当前切片的长度、底层数组可用容量\n' +
      '- 使用len()计算切片长度时间复杂度为O(1)，不需要遍历切片\n' +
      '- 使用cap()计算切片容量时间复杂度为O(1)，不需要遍历切片\n' +
      '- 通过函数传递切片时，不会拷贝整个切片，因为切片本身只是个结构体而已\n' +
      '- 使用append()向切片追加元素时有可能触发扩容，扩容后将会生成新的切片\n',
    page_view: 14873,
    article_type: '创作集',
    created_at: '2019-08-06 12:12',
  },
];

let id: number = 0;

function getId() {
  // eslint-disable-next-line no-plusplus
  return id++;
}

function fakeArticleList(num: number): ArticleListDataItemType[] {
  const list = [];
  for (let i = 0; i < num; i += 1) {
    const fakeArticle = Object.assign({}, fakeArticles[i % fakeArticles.length]);
    fakeArticle.id = getId();
    list.push(fakeArticle);
  }

  return list;
}

function getFakeArticleList(req: Request, res: Response) {
  const params = req.query;

  const count = params.count * 1 || 20;

  const result = fakeArticleList(count);

  return res.json(result);
}

export default {
  'GET  /api/article-list': getFakeArticleList,
  fakeArticles,
};

import { Request, Response } from 'express';
import { ArticleListDataItemType } from '@/pages/frontend/data';

const fakeArticles = [
  {
    id: 1,
    title: 'RSSHub Radar — 订阅一个 RSS 源不应该这么难',
    content: '> 学习 React 的过程中实现了一个个人主页，没有复杂的实现和操作，适合入门 ~\n' +
        '> \n' +
        '> 这个项目其实功能很简单，就是常见的主页、博客、demo、关于我等功能。\n' +
        '> \n' +
        '> 页面样式都是自己写的，黑白风格，可能有点丑。不过还是最低级的 CSS ，准备到时候重构 ~\n' +
        '> \n' +
        '> 如果有更好的方法，或者是我的想法有偏差的，欢迎大家交流指正\n' +
        '> \n' +
        '> 欢迎参观：http://axuebin.com/react-blog\n' +
        '> \n' +
        '> Github：https://github.com/axuebin/react-blog\n' +
        '> \n' +
        '> ## 预览图\n' +
        '> ### 首页\n' +
        '> ![](https://camo.githubusercontent.com/ab4d845d7abdd7fd0c66ebd2d93158bb879e8bb7/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545392541362539362545392541312542352e706e67)\n' +
        '> \n' +
        '> ### 博客页\n' +
        '> ![](https://camo.githubusercontent.com/f80b6dd1f00f849b2353d65bce096ca34f65f405/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545352538442539412545352541452541322545392541312542352e706e67)\n' +
        '> \n' +
        '> ### 文章内容页\n' +
        '> ![](https://camo.githubusercontent.com/cd2410d2f149203b3fa85cbf76a49aafa4c070d6/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545362539362538372545372541422541302545352538362538352545352541452542392e706e67)\n' +
        '> \n' +
        '> ### Demo页\n' +
        '> ![](https://camo.githubusercontent.com/492fb6e2e1e0cd001fe8f59064b944cbaa465225/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c6564656d6f2545392541312542352e706e67)\n' +
        '> \n' +
        '> ## 关键技术\n' +
        '> * ES6：项目中用到 ES6 的语法，在写的过程中尽量使用，可能有的地方没想到\n' +
        '> * React\n' +
        '> * React-Router：前端路由\n' +
        '> * React-Redux：状态管理\n' +
        '> * webpack：打包\n' +
        '> * marked：Markdown渲染\n' +
        '> * highlight.js：代码高亮\n' +
        '> * fetch：异步请求数据\n' +
        '> * eslint：代码检查\n' +
        '> * antd：部分组件懒得自己写。。\n' +
        '> \n' +
        '> ## 准备工作\n' +
        '> 由于不是使用 React 脚手架生成的项目，所以每个东西都是自己手动配置的。。。\n' +
        '> \n' +
        '> ### 模块打包器\n' +
        '> 打包用的是 `webpack 2.6.1`，准备入坑 `webpack 3` 。\n' +
        '> \n' +
        '> 官方文档：https://webpack.js.org/\n' +
        '> \n' +
        '> 中文文档：https://doc.webpack-china.org/\n' +
        '> \n' +
        '> 对于 `webpack` 的配置还不是太熟，就简单的配置了一下可供项目启动：\n' +
        '> \n' +
        '> ```js\n' +
        '> var webpack = require(\'webpack\');\n' +
        '> var path = require(\'path\');\n' +
        '> \n' +
        '> module.exports = {\n' +
        '>   context: __dirname + \'/src\',\n' +
        '>   entry: "./js/index.js",\n' +
        '>   module: {\n' +
        '>     loaders: [\n' +
        '>       {\n' +
        '>         test: /\\.js?$/,\n' +
        '>         exclude: /(node_modules)/,\n' +
        '>         loader: \'babel-loader\',\n' +
        '>         query: {\n' +
        '>           presets: [\'react\', \'es2015\']\n' +
        '>         }\n' +
        '>       }, {\n' +
        '>         test: /\\.css$/,\n' +
        '>         loader: \'style-loader!css-loader\'\n' +
        '>       }, {\n' +
        '>         test: /\\.js$/,\n' +
        '>         exclude: /(node_modules)/,\n' +
        '>         loader: \'eslint-loader\'\n' +
        '>       }, {\n' +
        '>         test: /\\.json$/,\n' +
        '>         loader: \'json-loader\'\n' +
        '>       }\n' +
        '>     ]\n' +
        '>   },\n' +
        '>   output: {\n' +
        '>     path: __dirname + "/src/",\n' +
        '>     filename: "bundle.js"\n' +
        '>   }\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> `webpack` 有几个重要的属性：`entry`、`module`、`output`、`plugins`，在这里我还没使用到插件，所以没有配置 `plugins` 。\n' +
        '> \n' +
        '> `module` 中的 `loaders`：\n' +
        '> \n' +
        '> * babel-loader：将代码转换成es5代码\n' +
        '> * css-loader：处理css中路径引用等问题\n' +
        '> * style-loader：动态把样式写入css\n' +
        '> * eslin-loader：使用eslint\n' +
        '> \n' +
        '> ### 包管理\n' +
        '> 包管理现在使用的还是 `NPM` 。\n' +
        '> \n' +
        '> 官方文档：https://docs.npmjs.com/\n' +
        '> \n' +
        '> 1. npm init\n' +
        '> 2. npm install\n' +
        '> 3. npm uninstall\n' +
        '> \n' +
        '> 关于`npm`，可能还需要了解 `dependencies` 和 `devDependencies` 的区别，我是这样简单理解的：\n' +
        '> \n' +
        '> * dependencies：项目跑起来后需要使用到的模块\n' +
        '> * devDependencies：开发的时候需要用的模块，但是项目跑起来后就不需要了\n' +
        '> \n' +
        '> ### 代码检查\n' +
        '> 项目使用现在比较流行的 `ESLint` 作为代码检查工具，并使用 `Airbnb` 的检查规则。\n' +
        '> \n' +
        '> ESLint：https://github.com/eslint/eslint\n' +
        '> \n' +
        '> eslint-config-airbnb：https://www.npmjs.com/package/eslint-config-airbnb\n' +
        '> \n' +
        '> 在 `package.json` 中可以看到，关于 `ESLint` 的包就是放在 `devDependencies` 底下的，因为它只是在开发的时候会使用到。\n' +
        '> \n' +
        '> #### 使用\n' +
        '> * 在 `webpack` 配置中加载 `eslint-loader`：\n' +
        '> \n' +
        '> ```js\n' +
        '> module: {\n' +
        '>   loaders: [\n' +
        '>       {\n' +
        '>         test: /\\.js$/,\n' +
        '>         exclude: /(node_modules)/,\n' +
        '>         loader: \'eslint-loader\'\n' +
        '>       }\n' +
        '>     ]\n' +
        '>   }\n' +
        '> ```\n' +
        '> \n' +
        '> * 创建 `.elintrc`文件：\n' +
        '> \n' +
        '> ```js\n' +
        '> {\n' +
        '>   "extends": "airbnb",\n' +
        '>   "env":{\n' +
        '>     "browser": true\n' +
        '>   },\n' +
        '>   "rules":{}\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> 然后在运行 `webpack` 的时候，就会执行代码检查啦，看着一堆的 `warning` 、`error` 是不是很爽~\n' +
        '> \n' +
        '> 这里有常见的ESLint规则：http://eslint.cn/docs/rules/\n' +
        '> \n' +
        '> ### 数据源\n' +
        '> 由于是为了练习 `React`，暂时就只考虑搭建一个静态页面，而且现在越来越多的大牛喜欢用 `Github Issues` 来写博客，也可以更好的地提供评论功能，所以我也想试试用 `Github Issues` 来作为博客的数据源。\n' +
        '> \n' +
        '> API在这：https://developer.github.com/v3/issues/\n' +
        '> \n' +
        '> 我也没看完全部的API，就看了看怎么获取 `Issues` 列表。。\n' +
        '> \n' +
        '> ```js\n' +
        '> https://api.github.com/repos/axuebin/react-blog/issues?creator=axuebin&labels=blog\n' +
        '> ```\n' +
        '> \n' +
        '> 通过控制参数 `creator` 和 `labels`，可以筛选出作为展示的 `Issues`。它会返回一个带有 `issue` 格式对象的数组。每一个 `issue` 有很多属性，我们可能不需要那么多，先了解了解底下这几种：\n' +
        '> \n' +
        '> ```js\n' +
        '> // 为了方便，我把注释写在json中了。。\n' +
        '> [{\n' +
        '>   "url": ,  // issue 的 url\n' +
        '>   "id": ,  // issue id ， 是一个随机生成的不重复的数字串 \n' +
        '>   "number": ,  // issue number ， 根据创建 issue 的顺序从1开始累加\n' +
        '>   "title": ,  // issue 的标题\n' +
        '>   "labels": [], // issue 的所有 label，它是一个数组\n' +
        '>   "created_at": , // 创建 issue 的时间\n' +
        '>   "updated_at": , // 最后修改 issue 的时间\n' +
        '>   "body": , // issue 的内容\n' +
        '> }]\n' +
        '> ```\n' +
        '> \n' +
        '> #### 异步请求数据\n' +
        '> 项目中使用的异步请求数据的方法时 `fetch`。\n' +
        '> \n' +
        '> 关于 `fetch` ：https://segmentfault.com/a/1190000003810652\n' +
        '> \n' +
        '> 使用起来很简单：\n' +
        '> \n' +
        '> ```js\n' +
        '> fetch(url).then(response => response.json())\n' +
        '>       .then(json => console.log(json))\n' +
        '>       .catch(e => console.log(e));\n' +
        '> ```\n' +
        '> \n' +
        '> ### markdown 渲染\n' +
        '> 在 `Github` 上查找关于如何在 `React` 实现 `markdown` 的渲染，查到了这两种库：\n' +
        '> \n' +
        '> * react-markdown：https://github.com/rexxars/react-markdown\n' +
        '> * marked：https://github.com/chjj/marked\n' +
        '> \n' +
        '> 使用起来都很简单。\n' +
        '> \n' +
        '> 如果是 `react-markdown`,只需要这样做：\n' +
        '> \n' +
        '> ```js\n' +
        '> import ReactMarkdown from \'react-markdown\';\n' +
        '> \n' +
        '> const input = \'# This is a header\\n\\nAnd this is a paragraph\';\n' +
        '> ReactDOM.render(\n' +
        '>     <ReactMarkdown source={input} />,\n' +
        '>     document.getElementById(\'container\')\n' +
        '> );\n' +
        '> ```\n' +
        '> \n' +
        '> 如果是`marked`，这样做：\n' +
        '> \n' +
        '> ```js\n' +
        '> import marked from \'marked\';\n' +
        '> \n' +
        '> const input = \'# This is a header\\n\\nAnd this is a paragraph\';\n' +
        '> const output = marked(input);\n' +
        '> ```\n' +
        '> \n' +
        '> 这里有点不太一样，我们获取到了一个字符串 `output`，注意，是一个字符串，所以我们得将它插入到 `dom`中，在 `React` 中，我们可以这样做：\n' +
        '> \n' +
        '> ```\n' +
        '> <div dangerouslySetInnerHTML={{ __html: output }} />\n' +
        '> ```\n' +
        '> \n' +
        '> 由于我们的项目是基于 `React` 的，所以想着用 `react-markdown`会更好，而且由于安全问题 `React` 也不提倡直接往 `dom` 里插入字符串，然而在使用过程中发现，`react-markdown` 对表格的支持不友好，所以只好弃用，改用 `marked`。\n' +
        '> \n' +
        '> ### 代码高亮\n' +
        '> 代码高亮用的是`highlight.js`：https://github.com/isagalaev/highlight.js\n' +
        '> \n' +
        '> 它和`marked`可以无缝衔接~\n' +
        '> \n' +
        '> 只需要这样既可：\n' +
        '> \n' +
        '> ```js\n' +
        '> import hljs from \'highlight.js\';\n' +
        '> \n' +
        '> marked.setOptions({\n' +
        '>   highlight: code => hljs.highlightAuto(code).value,\n' +
        '> });\n' +
        '> ```\n' +
        '> \n' +
        '> `highlight.js`是支持多种代码配色风格的，可以在`css`文件中进行切换：\n' +
        '> \n' +
        '> ```css\n' +
        '> @import \'~highlight.js/styles/atom-one-dark.css\';\n' +
        '> ```\n' +
        '> \n' +
        '> 在这可以看到每种语言的高亮效果和配色风格：https://highlightjs.org/\n' +
        '> \n' +
        '> ## React\n' +
        '> ### state 和 props 是什么\n' +
        '> 可以看之前的一篇文章：#8\n' +
        '> \n' +
        '> ### 关于React组件的生命周期\n' +
        '> 可以看之前的一篇文章：#9\n' +
        '> \n' +
        '> ## 前端路由\n' +
        '> 项目中前端路由用的是 `React-Router V4`。\n' +
        '> \n' +
        '> 官方文档：https://reacttraining.com/react-router/web/guides/quick-start\n' +
        '> \n' +
        '> 中文文档：http://reacttraining.cn/\n' +
        '> \n' +
        '> ### 基本使用\n' +
        '> ```js\n' +
        '> <Link to="/blog">Blog</Link>\n' +
        '> ```\n' +
        '> \n' +
        '> ```js\n' +
        '> <Router>\n' +
        '>   <Route exact path="/" component={Home} />\n' +
        '>   <Route path="/blog" component={Blog} />\n' +
        '>   <Route path="/demo" component={Demo} />\n' +
        '> </Router>\n' +
        '> ```\n' +
        '> \n' +
        '> 注意：一定要在根目录的 `Route` 中声明 `exact`，要不然点击任何链接都无法跳转。\n' +
        '> \n' +
        '> ### 2级目录跳转\n' +
        '> 比如我现在要在博客页面上点击跳转，此时的 `url` 是 `localhost:8080/blog`,需要变成 `localhost:8080/blog/article`，可以这样做：\n' +
        '> \n' +
        '> ```js\n' +
        '> <Route path={`${this.props.match.url}/article/:number`} component={Article} />\n' +
        '> ```\n' +
        '> \n' +
        '> 这样就可以跳转到 `localhost:8080/blog/article` 了，而且还传递了一个 `number` 参数，在 `article` 中可以通过 `this.props.params.number`获取。\n' +
        '> \n' +
        '> ### HashRouter\n' +
        '> 当我把项目托管到 `Github Page` 后，出现了这样一个问题。\n' +
        '> \n' +
        '> > 刷新页面出现 `Cannot GET /` 提示，路由未生效。\n' +
        '> \n' +
        '> 通过了解，知道了原因是这样，并且可以解决：\n' +
        '> \n' +
        '> * 由于刷新之后，会根据URL对服务器发送请求，而不是处理路由，导致出现 `Cannot GET /` 错误。\n' +
        '> * 通过修改 `<Router>` → `<HashRouter>` 。\n' +
        '> * `<HashRouter>` 借助URL上的哈希值（hash）来实现路由。可以在不需要全屏刷新的情况下，达到切换页面的目的。\n' +
        '> \n' +
        '> ### 路由跳转后不会自动回到顶部\n' +
        '> 当前一个页面滚动到一定区域后，点击跳转后，页面虽然跳转了，但是会停留在滚动的区域，不会自动回到页面顶部。\n' +
        '> \n' +
        '> 可以通过这样来解决：\n' +
        '> \n' +
        '> ```js\n' +
        '> componentDidMount() {\n' +
        '>     this.node.scrollIntoView();\n' +
        '> }\n' +
        '> \n' +
        '> render() {\n' +
        '>   return (\n' +
        '>     <div ref={node => this.node = node} ></div>\n' +
        '>   );\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> ## 状态管理\n' +
        '> 项目中多次需要用到从 `Github Issues` 请求来的数据，因为之前就知道 `Redux` 这个东西的存在，虽然有点大材小用，为了学习还是将它用于项目的状态管理，只需要请求一次数据即可。\n' +
        '> \n' +
        '> 官方文档：http://redux.js.org/\n' +
        '> \n' +
        '> 中文文档：http://cn.redux.js.org/\n' +
        '> \n' +
        '> 简单的来说，每一次的修改状态都需要触发 `action` ，然而其实项目中我现在还没用到修改数据2333。。。\n' +
        '> \n' +
        '> 关于状态管理这一块，由于还不是太了解，就不误人子弟了~\n' +
        '> \n' +
        '> ## 主要组件\n' +
        '> React是基于组件构建的，所以在搭建页面的开始，我们要先考虑一下我们需要一些什么样的组件，这些组件之间有什么关系，哪些组件是可以复用的等等等。\n' +
        '> \n' +
        '> ### 首页\n' +
        '> ![](https://camo.githubusercontent.com/c56d97868a4502bca2878b71d6b56fe2cd943f69/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545392541362539362545392541312542352e676966)\n' +
        '> \n' +
        '> 可以看到，我主要将首页分成了四个部分：\n' +
        '> \n' +
        '> * header：网站标题，副标题，导航栏\n' +
        '> * banner：about me ~，准备用自己的照片换个背景，但是还没有合适的照片\n' +
        '> * card area：暂时是三个卡片\n' +
        '>   \n' +
        '>   * blog card：最近的几篇博文\n' +
        '>   * demo card：几个小demo类别\n' +
        '>   * me card：算是我放飞自我的地方吧\n' +
        '> * footer：版权信息、备案信息、浏览量\n' +
        '> \n' +
        '> ### 博客页\n' +
        '> ![](https://camo.githubusercontent.com/e020a7d8a7d872edd7b55bd6319583935223a7d7/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545352538442539412545352541452541322545392541312542352e676966)\n' +
        '> \n' +
        '> 博客页就是很中规中矩的一个页面吧，这部分是整个项目中代码量最多的部分，包括以下几部分：\n' +
        '> \n' +
        '> * 文章列表组件\n' +
        '> * 翻页组件\n' +
        '> * 归档按钮组件\n' +
        '> * 类别组件\n' +
        '> * 标签组件\n' +
        '> \n' +
        '> #### 文章列表\n' +
        '> 文章列表其实就是一个 `list`，里面有一个个的 `item`:\n' +
        '> \n' +
        '> ```\n' +
        '> <div class="archive-list">\n' +
        '>   <div class="blog-article-item">文章1</div>\n' +
        '>   <div class="blog-article-item">文章2</div>\n' +
        '> <div>\n' +
        '> ```\n' +
        '> \n' +
        '> 对于每一个 `item`，其实是这样的：\n' +
        '> \n' +
        '> ![](https://camo.githubusercontent.com/3637601cf00ee937279bd7e6c139731f5df6b0d0/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545362539362538372545372541422541306974656d2e706e67)\n' +
        '> \n' +
        '> 一个文章item组件它可能需要包括：\n' +
        '> \n' +
        '> * 文章标题\n' +
        '> * 文章发布的时间、类别、标签等\n' +
        '> * 文章摘要\n' +
        '> * ...\n' +
        '> \n' +
        '> 如果用 `DOM` 来描述，它应该是这样的：\n' +
        '> \n' +
        '> ```\n' +
        '> <div class="blog-article-item">\n' +
        '>   <div class="blog-article-item-title">文章标题</div>\n' +
        '>   <div class="blog-article-item-time">时间</div>\n' +
        '>   <div class="blog-article-item-label">类别</div>\n' +
        '>   <div class="blog-article-item-label">标签</div>\n' +
        '>   <div class="blog-article-item-desc">摘要</div>\n' +
        '> </div>\n' +
        '> ```\n' +
        '> \n' +
        '> 所以，我们可以有很多个组件：\n' +
        '> \n' +
        '> * 文章列表组件 `<ArticleList />`\n' +
        '> * 文章item组件 `<ArticleItem />`\n' +
        '> * 类别标签组件 `<ArticleLabel />`\n' +
        '> \n' +
        '> 它们可能是这样一个关系：\n' +
        '> \n' +
        '> ```js\n' +
        '> <ArticleList>\n' +
        '>   <ArticleItem>\n' +
        '>     <ArticleTitle />\n' +
        '>     <ArticleTime />\n' +
        '>     <ArticleLabel />\n' +
        '>     <ArticleDesc />\n' +
        '>   </ArticleItem>\n' +
        '>   <ArticleItem></ArticleItem>\n' +
        '>   <ArticleItem></ArticleItem>\n' +
        '> </ArticleList>\n' +
        '> ```\n' +
        '> \n' +
        '> #### 分页\n' +
        '> 对于分页功能，传统的实现方法是在后端完成分页然后分批返回到前端的，比如可能会返回一段这样的数据：\n' +
        '> \n' +
        '> ```js\n' +
        '> {\n' +
        '>   total:500,\n' +
        '>   page:1,\n' +
        '>   data:[]\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> 也就是后端会返回分好页的数据，含有表示总数据量的`total`、当前页数的`page`，以及属于该页的数据`data`。\n' +
        '> \n' +
        '> 然而，我这个页面只是个静态页面，数据是放在Github Issues上的通过API获取的。（Github Issues的分页貌似不能自定义数量...），所以没法直接返回分好的数据，所以只能在前端强行分页~\n' +
        '> \n' +
        '> 分页功能这一块我偷懒了...用的是 `antd` 的翻页组件 `<Pagination />`。\n' +
        '> \n' +
        '> 官方文档：https://ant.design/components/pagination-cn/\n' +
        '> \n' +
        '> 文档很清晰，使用起来也特别简单。\n' +
        '> \n' +
        '> 前端渲染的逻辑（有点蠢）：将数据存放到一个数组中，根据当前页数和每页显示条数来计算该显示的索引值，取出相应的数据即可。\n' +
        '> \n' +
        '> 翻页组件中：\n' +
        '> \n' +
        '> ```js\n' +
        '> constructor() {\n' +
        '>   super();\n' +
        '>   this.onChangePage = this.onChangePage.bind(this);\n' +
        '> }\n' +
        '> \n' +
        '> onChangePage(pageNumber) {\n' +
        '>   this.props.handlePageChange(pageNumber);\n' +
        '> }\n' +
        '> \n' +
        '> render() {\n' +
        '>   return (\n' +
        '>     <div className="blog-article-paging">\n' +
        '>       <Pagination onChange={this.onChangePage} defaultPageSize={this.props.defaultPageSize} total={this.props.total} />\n' +
        '>     </div>\n' +
        '>   );\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> 当页数发生改变后，会触发从父组件传进 `<ArticlePaging />` 的方法 `handlePageChange`，从而将页数传递到父组件中，然后传递到 `<ArticleList />` 中。\n' +
        '> \n' +
        '> 父组件中：\n' +
        '> \n' +
        '> ```js\n' +
        '> handlePageChange(pageNumber) {\n' +
        '>   this.setState({ currentPage: pageNumber });\n' +
        '> }\n' +
        '> \n' +
        '> render() {\n' +
        '>   return (\n' +
        '>     <div className="archive-list-area">\n' +
        '>       <ArticleList issues={this.props.issues} defaultPageSize={this.state.defaultPageSize} pageNumber={this.state.currentPage} />\n' +
        '>       <ArticlePaging handlePageChange={this.handlePageChange} total={this.props.issues.length} defaultPageSize={this.state.defaultPageSize} />\n' +
        '>     </div>\n' +
        '>   );\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> 列表中：\n' +
        '> \n' +
        '> ```js\n' +
        '> render() {\n' +
        '>   const articlelist = [];\n' +
        '>   const issues = this.props.issues;\n' +
        '>   const currentPage = this.props.pageNumber;\n' +
        '>   const defaultPageSize = this.props.defaultPageSize;\n' +
        '>   const start = currentPage === 1 ? 0 : (currentPage - 1) * defaultPageSize;\n' +
        '>   const end = start + defaultPageSize < issues.length ? start + defaultPageSize : issues.length;\n' +
        '>   for (let i = start; i < end; i += 1) {\n' +
        '>     const item = issues[i];\n' +
        '>     articlelist.push(<ArticleItem />);\n' +
        '>   }\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> #### label\n' +
        '> 在 `Github Issues` 中，可以为一个 `issue` 添加很多个 `label`，我将这些对于博客内容有用的 `label` 分为三类，分别用不同颜色来表示。\n' +
        '> \n' +
        '> 这里说明一下， `label` 创建后会随机生成一个 `id`，虽然说 `id` 是不重复的，但是文章的类别、标签会一直在增加，当新加一个 `label` 时，程序中可能也要进行对应的修改，当作区分 `label` 的标准可能就不太合适，所以我采用颜色来区分它们。\n' +
        '> \n' +
        '> * 表示这是一篇文章的blog：只有有 `blog` 的 `issue` 才能显示在页面上，过滤 `bug` 、`help` 等\n' +
        '> * 表示文章类别的：用来表示文章的类别，比如“前端”、“摄影”等\n' +
        '> * 表示文章标签的：用来表示文章的标签，比如“JavaScript”、“React”等\n' +
        '> \n' +
        '> 即使有新的 `label` ，也只要根据颜色区分是属于哪一类就好了。\n' +
        '> \n' +
        '> ##### 类别\n' +
        '> ![](https://camo.githubusercontent.com/8d0463b2522519ac0c3c18b7bb211d6c13cda7fb/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545372542312542422545352538382541422e676966)\n' +
        '> \n' +
        '> 在这里的思路主要就是：遍历所有 `issues`，然后再遍历每个 `issue`的 `labels`，找出属于类别的 `label`，然后计数。\n' +
        '> \n' +
        '> ```js\n' +
        '> const categoryList = [];\n' +
        '> const categoryHash = {};\n' +
        '> for (let i = 0; i < issues.length; i += 1) {\n' +
        '>   const labels = issues[i].labels;\n' +
        '>   for (let j = 0; j < labels.length; j += 1) {\n' +
        '>     if (labels[j].color === COLOR_LABEL_CATEGORY) {\n' +
        '>       const category = labels[j].name;\n' +
        '>       if (categoryHash[category] === undefined) {\n' +
        '>         categoryHash[category] = true;\n' +
        '>         const categoryTemp = { category, sum: 1 };\n' +
        '>         categoryList.push(categoryTemp);\n' +
        '>       } else {\n' +
        '>         for (let k = 0; k < categoryList.length; k += 1) {\n' +
        '>           if (categoryList[k].category === category) {\n' +
        '>             categoryList[k].sum += 1;\n' +
        '>           }\n' +
        '>         }\n' +
        '>       }\n' +
        '>     }\n' +
        '>   }\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> 这样实现得要经历三次循环，复杂度有点高，感觉有点蠢，有待改进，如果有更好的方法，请多多指教~\n' +
        '> \n' +
        '> ##### 标签\n' +
        '> ![](https://camo.githubusercontent.com/a7e46f965692e5fa2e0de686fe107188af774388/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545362541302538372545372541442542452e676966)\n' +
        '> \n' +
        '> 这里的思路和类别的思路基本一样，只不过不同的显示方式而已。\n' +
        '> \n' +
        '> 本来这里是想通过字体大小来体现每个标签的权重，后来觉得可能对于我来说，暂时只有那几个标签会很频繁，其它标签可能会很少，用字体大小来区分就没有什么意义，还是改成排序的方式。\n' +
        '> \n' +
        '> ### 文章页\n' +
        '> ![](https://camo.githubusercontent.com/c22bf0976203e13e011e48331af14a6ffdd4d841/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545362539362538372545372541422541302545392541312542352e676966)\n' +
        '> \n' +
        '> 文章页主要分为两部分：\n' +
        '> \n' +
        '> * 文章内容区域：显示文章内容，显示在页面的主体区域\n' +
        '> * 章节目录：文章的章节目录，显示在文章的右侧区域\n' +
        '> \n' +
        '> #### 文章内容\n' +
        '> 有两种方式获取文章具体内容：\n' +
        '> \n' +
        '> * 从之前已经请求过的数组中去遍历查找所需的文章内容\n' +
        '> * 通过 `issue number` 重新发一次请求直接获取内容\n' +
        '> \n' +
        '> 最后我选择了后者。\n' +
        '> \n' +
        '> 文章是用 `markdown` 语法写的，所以要先转成 `html` 然后插入页面中，这里用了一个 `React` 不提倡的属性：`dangerouslySetInnerHTML`。\n' +
        '> \n' +
        '> 除了渲染`markdown`，我们还得对文章中的代码进行高亮显示，还有就是定制文章中不同标签的样式。\n' +
        '> \n' +
        '> #### 章节目录\n' +
        '> 首先，这里有一个 `issue`，希望大家可以给一些建议~\n' +
        '> \n' +
        '> 文章内容是通过 `markdown` 渲染后插入 `dom` 中的，由于 `React` 不建议通过 `document.getElementById` 的形式获取 `dom` 元素，所以只能想办法通过字符串匹配的方式获取文章的各个章节标题。\n' +
        '> \n' +
        '> 由于我不太熟悉正则表达式，曾经还在sf上咨询过，就采用了其中一个答案：\n' +
        '> \n' +
        '> ```js\n' +
        '> const issues = content;\n' +
        '> const menu = [];\n' +
        '> const patt = /(#+)\\s+?(.+)/g;\n' +
        '> let result = null;\n' +
        '> while ((result = patt.exec(issues))) {\n' +
        '>   menu.push({ level: result[1].length, title: result[2] });\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> 这样可以获取到所有的 `#` 的字符串，也就是 `markdown` 中的标题， `result[1].length` 表示有几个 `#`，其实就是几级标题的意思，`title` 就是标题内容了。\n' +
        '> \n' +
        '> 这里还有一个问题，本来通过 `<a target="" />` 的方式可以实现点击跳转，但是现在渲染出来的 `html` 中对于每一个标题没有独一无二的标识。。。\n' +
        '> \n' +
        '> ### 归档页\n' +
        '> 按年份归档：\n' +
        '> \n' +
        '> ![](https://camo.githubusercontent.com/c4e7790b42c333d8adffa06a3ee7932dd4e57eab/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c65254535254244253932254536254131254133312e706e67)\n' +
        '> \n' +
        '> 按类别归档：\n' +
        '> \n' +
        '> ![](https://camo.githubusercontent.com/7e7ac3c308a6cb80d4d40477518a24e1fe638144/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545352542442539322545362541312541332e706e67)\n' +
        '> \n' +
        '> 按标签归档：\n' +
        '> \n' +
        '> ![](https://camo.githubusercontent.com/c6e30b6ac882c2e0f8f3f11c98d6355fceb9f3ab/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c65254535254244253932254536254131254133322e706e67)\n' +
        '> \n' +
        '> ## 问题\n' +
        '> 基本功能是已经基本实现了，现在还存在着以下几个问题，也算是一个 `TodoList` 吧\n' +
        '> \n' +
        '> * 评论功能。拟利用 `Github Issues API` 实现评论，得实现 `Github` 授权登录\n' +
        '> * 回到顶部。拟利用 `antd` 的组件，但是 `state` 中 `visibility` 一直是 `false`\n' +
        '> * 首页渲染。现在打包完的js文件还是太大了，导致首页渲染太慢，这个是接下来工作的重点，也了解过关于这方面的优化：\n' +
        '>   \n' +
        '>   * `webpack` 按需加载。这可能是目前最方便的方式\n' +
        '>   * 服务端渲染。这就麻烦了，但是好处也多，不仅解决渲染问题，还有利于SEO，所以也是 `todo` 之一\n' +
        '> * 响应式。现在的样式都是在PC端的，还未适配移动端。\n' +
        '> * 代码混乱，逻辑不对。这是我自己的问题，需要再修炼。\n' +
        '\n' +
        '\n' +
        '\n' +
        '> 学习 React 的过程中实现了一个个人主页，没有复杂的实现和操作，适合入门 ~\n' +
        '> \n' +
        '> 这个项目其实功能很简单，就是常见的主页、博客、demo、关于我等功能。\n' +
        '> \n' +
        '> 页面样式都是自己写的，黑白风格，可能有点丑。不过还是最低级的 CSS ，准备到时候重构 ~\n' +
        '> \n' +
        '> 如果有更好的方法，或者是我的想法有偏差的，欢迎大家交流指正\n' +
        '> \n' +
        '> 欢迎参观：http://axuebin.com/react-blog\n' +
        '> \n' +
        '> Github：https://github.com/axuebin/react-blog\n' +
        '> \n' +
        '> ## 预览图\n' +
        '> ### 首页\n' +
        '> ![](https://camo.githubusercontent.com/ab4d845d7abdd7fd0c66ebd2d93158bb879e8bb7/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545392541362539362545392541312542352e706e67)\n' +
        '> \n' +
        '> ### 博客页\n' +
        '> ![](https://camo.githubusercontent.com/f80b6dd1f00f849b2353d65bce096ca34f65f405/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545352538442539412545352541452541322545392541312542352e706e67)\n' +
        '> \n' +
        '> ### 文章内容页\n' +
        '> ![](https://camo.githubusercontent.com/cd2410d2f149203b3fa85cbf76a49aafa4c070d6/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545362539362538372545372541422541302545352538362538352545352541452542392e706e67)\n' +
        '> \n' +
        '> ### Demo页\n' +
        '> ![](https://camo.githubusercontent.com/492fb6e2e1e0cd001fe8f59064b944cbaa465225/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c6564656d6f2545392541312542352e706e67)\n' +
        '> \n' +
        '> ## 关键技术\n' +
        '> * ES6：项目中用到 ES6 的语法，在写的过程中尽量使用，可能有的地方没想到\n' +
        '> * React\n' +
        '> * React-Router：前端路由\n' +
        '> * React-Redux：状态管理\n' +
        '> * webpack：打包\n' +
        '> * marked：Markdown渲染\n' +
        '> * highlight.js：代码高亮\n' +
        '> * fetch：异步请求数据\n' +
        '> * eslint：代码检查\n' +
        '> * antd：部分组件懒得自己写。。\n' +
        '> \n' +
        '> ## 准备工作\n' +
        '> 由于不是使用 React 脚手架生成的项目，所以每个东西都是自己手动配置的。。。\n' +
        '> \n' +
        '> ### 模块打包器\n' +
        '> 打包用的是 `webpack 2.6.1`，准备入坑 `webpack 3` 。\n' +
        '> \n' +
        '> 官方文档：https://webpack.js.org/\n' +
        '> \n' +
        '> 中文文档：https://doc.webpack-china.org/\n' +
        '> \n' +
        '> 对于 `webpack` 的配置还不是太熟，就简单的配置了一下可供项目启动：\n' +
        '> \n' +
        '> ```js\n' +
        '> var webpack = require(\'webpack\');\n' +
        '> var path = require(\'path\');\n' +
        '> \n' +
        '> module.exports = {\n' +
        '>   context: __dirname + \'/src\',\n' +
        '>   entry: "./js/index.js",\n' +
        '>   module: {\n' +
        '>     loaders: [\n' +
        '>       {\n' +
        '>         test: /\\.js?$/,\n' +
        '>         exclude: /(node_modules)/,\n' +
        '>         loader: \'babel-loader\',\n' +
        '>         query: {\n' +
        '>           presets: [\'react\', \'es2015\']\n' +
        '>         }\n' +
        '>       }, {\n' +
        '>         test: /\\.css$/,\n' +
        '>         loader: \'style-loader!css-loader\'\n' +
        '>       }, {\n' +
        '>         test: /\\.js$/,\n' +
        '>         exclude: /(node_modules)/,\n' +
        '>         loader: \'eslint-loader\'\n' +
        '>       }, {\n' +
        '>         test: /\\.json$/,\n' +
        '>         loader: \'json-loader\'\n' +
        '>       }\n' +
        '>     ]\n' +
        '>   },\n' +
        '>   output: {\n' +
        '>     path: __dirname + "/src/",\n' +
        '>     filename: "bundle.js"\n' +
        '>   }\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> `webpack` 有几个重要的属性：`entry`、`module`、`output`、`plugins`，在这里我还没使用到插件，所以没有配置 `plugins` 。\n' +
        '> \n' +
        '> `module` 中的 `loaders`：\n' +
        '> \n' +
        '> * babel-loader：将代码转换成es5代码\n' +
        '> * css-loader：处理css中路径引用等问题\n' +
        '> * style-loader：动态把样式写入css\n' +
        '> * eslin-loader：使用eslint\n' +
        '> \n' +
        '> ### 包管理\n' +
        '> 包管理现在使用的还是 `NPM` 。\n' +
        '> \n' +
        '> 官方文档：https://docs.npmjs.com/\n' +
        '> \n' +
        '> 1. npm init\n' +
        '> 2. npm install\n' +
        '> 3. npm uninstall\n' +
        '> \n' +
        '> 关于`npm`，可能还需要了解 `dependencies` 和 `devDependencies` 的区别，我是这样简单理解的：\n' +
        '> \n' +
        '> * dependencies：项目跑起来后需要使用到的模块\n' +
        '> * devDependencies：开发的时候需要用的模块，但是项目跑起来后就不需要了\n' +
        '> \n' +
        '> ### 代码检查\n' +
        '> 项目使用现在比较流行的 `ESLint` 作为代码检查工具，并使用 `Airbnb` 的检查规则。\n' +
        '> \n' +
        '> ESLint：https://github.com/eslint/eslint\n' +
        '> \n' +
        '> eslint-config-airbnb：https://www.npmjs.com/package/eslint-config-airbnb\n' +
        '> \n' +
        '> 在 `package.json` 中可以看到，关于 `ESLint` 的包就是放在 `devDependencies` 底下的，因为它只是在开发的时候会使用到。\n' +
        '> \n' +
        '> #### 使用\n' +
        '> * 在 `webpack` 配置中加载 `eslint-loader`：\n' +
        '> \n' +
        '> ```js\n' +
        '> module: {\n' +
        '>   loaders: [\n' +
        '>       {\n' +
        '>         test: /\\.js$/,\n' +
        '>         exclude: /(node_modules)/,\n' +
        '>         loader: \'eslint-loader\'\n' +
        '>       }\n' +
        '>     ]\n' +
        '>   }\n' +
        '> ```\n' +
        '> \n' +
        '> * 创建 `.elintrc`文件：\n' +
        '> \n' +
        '> ```js\n' +
        '> {\n' +
        '>   "extends": "airbnb",\n' +
        '>   "env":{\n' +
        '>     "browser": true\n' +
        '>   },\n' +
        '>   "rules":{}\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> 然后在运行 `webpack` 的时候，就会执行代码检查啦，看着一堆的 `warning` 、`error` 是不是很爽~\n' +
        '> \n' +
        '> 这里有常见的ESLint规则：http://eslint.cn/docs/rules/\n' +
        '> \n' +
        '> ### 数据源\n' +
        '> 由于是为了练习 `React`，暂时就只考虑搭建一个静态页面，而且现在越来越多的大牛喜欢用 `Github Issues` 来写博客，也可以更好的地提供评论功能，所以我也想试试用 `Github Issues` 来作为博客的数据源。\n' +
        '> \n' +
        '> API在这：https://developer.github.com/v3/issues/\n' +
        '> \n' +
        '> 我也没看完全部的API，就看了看怎么获取 `Issues` 列表。。\n' +
        '> \n' +
        '> ```js\n' +
        '> https://api.github.com/repos/axuebin/react-blog/issues?creator=axuebin&labels=blog\n' +
        '> ```\n' +
        '> \n' +
        '> 通过控制参数 `creator` 和 `labels`，可以筛选出作为展示的 `Issues`。它会返回一个带有 `issue` 格式对象的数组。每一个 `issue` 有很多属性，我们可能不需要那么多，先了解了解底下这几种：\n' +
        '> \n' +
        '> ```js\n' +
        '> // 为了方便，我把注释写在json中了。。\n' +
        '> [{\n' +
        '>   "url": ,  // issue 的 url\n' +
        '>   "id": ,  // issue id ， 是一个随机生成的不重复的数字串 \n' +
        '>   "number": ,  // issue number ， 根据创建 issue 的顺序从1开始累加\n' +
        '>   "title": ,  // issue 的标题\n' +
        '>   "labels": [], // issue 的所有 label，它是一个数组\n' +
        '>   "created_at": , // 创建 issue 的时间\n' +
        '>   "updated_at": , // 最后修改 issue 的时间\n' +
        '>   "body": , // issue 的内容\n' +
        '> }]\n' +
        '> ```\n' +
        '> \n' +
        '> #### 异步请求数据\n' +
        '> 项目中使用的异步请求数据的方法时 `fetch`。\n' +
        '> \n' +
        '> 关于 `fetch` ：https://segmentfault.com/a/1190000003810652\n' +
        '> \n' +
        '> 使用起来很简单：\n' +
        '> \n' +
        '> ```js\n' +
        '> fetch(url).then(response => response.json())\n' +
        '>       .then(json => console.log(json))\n' +
        '>       .catch(e => console.log(e));\n' +
        '> ```\n' +
        '> \n' +
        '> ### markdown 渲染\n' +
        '> 在 `Github` 上查找关于如何在 `React` 实现 `markdown` 的渲染，查到了这两种库：\n' +
        '> \n' +
        '> * react-markdown：https://github.com/rexxars/react-markdown\n' +
        '> * marked：https://github.com/chjj/marked\n' +
        '> \n' +
        '> 使用起来都很简单。\n' +
        '> \n' +
        '> 如果是 `react-markdown`,只需要这样做：\n' +
        '> \n' +
        '> ```js\n' +
        '> import ReactMarkdown from \'react-markdown\';\n' +
        '> \n' +
        '> const input = \'# This is a header\\n\\nAnd this is a paragraph\';\n' +
        '> ReactDOM.render(\n' +
        '>     <ReactMarkdown source={input} />,\n' +
        '>     document.getElementById(\'container\')\n' +
        '> );\n' +
        '> ```\n' +
        '> \n' +
        '> 如果是`marked`，这样做：\n' +
        '> \n' +
        '> ```js\n' +
        '> import marked from \'marked\';\n' +
        '> \n' +
        '> const input = \'# This is a header\\n\\nAnd this is a paragraph\';\n' +
        '> const output = marked(input);\n' +
        '> ```\n' +
        '> \n' +
        '> 这里有点不太一样，我们获取到了一个字符串 `output`，注意，是一个字符串，所以我们得将它插入到 `dom`中，在 `React` 中，我们可以这样做：\n' +
        '> \n' +
        '> ```\n' +
        '> <div dangerouslySetInnerHTML={{ __html: output }} />\n' +
        '> ```\n' +
        '> \n' +
        '> 由于我们的项目是基于 `React` 的，所以想着用 `react-markdown`会更好，而且由于安全问题 `React` 也不提倡直接往 `dom` 里插入字符串，然而在使用过程中发现，`react-markdown` 对表格的支持不友好，所以只好弃用，改用 `marked`。\n' +
        '> \n' +
        '> ### 代码高亮\n' +
        '> 代码高亮用的是`highlight.js`：https://github.com/isagalaev/highlight.js\n' +
        '> \n' +
        '> 它和`marked`可以无缝衔接~\n' +
        '> \n' +
        '> 只需要这样既可：\n' +
        '> \n' +
        '> ```js\n' +
        '> import hljs from \'highlight.js\';\n' +
        '> \n' +
        '> marked.setOptions({\n' +
        '>   highlight: code => hljs.highlightAuto(code).value,\n' +
        '> });\n' +
        '> ```\n' +
        '> \n' +
        '> `highlight.js`是支持多种代码配色风格的，可以在`css`文件中进行切换：\n' +
        '> \n' +
        '> ```css\n' +
        '> @import \'~highlight.js/styles/atom-one-dark.css\';\n' +
        '> ```\n' +
        '> \n' +
        '> 在这可以看到每种语言的高亮效果和配色风格：https://highlightjs.org/\n' +
        '> \n' +
        '> ## React\n' +
        '> ### state 和 props 是什么\n' +
        '> 可以看之前的一篇文章：#8\n' +
        '> \n' +
        '> ### 关于React组件的生命周期\n' +
        '> 可以看之前的一篇文章：#9\n' +
        '> \n' +
        '> ## 前端路由\n' +
        '> 项目中前端路由用的是 `React-Router V4`。\n' +
        '> \n' +
        '> 官方文档：https://reacttraining.com/react-router/web/guides/quick-start\n' +
        '> \n' +
        '> 中文文档：http://reacttraining.cn/\n' +
        '> \n' +
        '> ### 基本使用\n' +
        '> ```js\n' +
        '> <Link to="/blog">Blog</Link>\n' +
        '> ```\n' +
        '> \n' +
        '> ```js\n' +
        '> <Router>\n' +
        '>   <Route exact path="/" component={Home} />\n' +
        '>   <Route path="/blog" component={Blog} />\n' +
        '>   <Route path="/demo" component={Demo} />\n' +
        '> </Router>\n' +
        '> ```\n' +
        '> \n' +
        '> 注意：一定要在根目录的 `Route` 中声明 `exact`，要不然点击任何链接都无法跳转。\n' +
        '> \n' +
        '> ### 2级目录跳转\n' +
        '> 比如我现在要在博客页面上点击跳转，此时的 `url` 是 `localhost:8080/blog`,需要变成 `localhost:8080/blog/article`，可以这样做：\n' +
        '> \n' +
        '> ```js\n' +
        '> <Route path={`${this.props.match.url}/article/:number`} component={Article} />\n' +
        '> ```\n' +
        '> \n' +
        '> 这样就可以跳转到 `localhost:8080/blog/article` 了，而且还传递了一个 `number` 参数，在 `article` 中可以通过 `this.props.params.number`获取。\n' +
        '> \n' +
        '> ### HashRouter\n' +
        '> 当我把项目托管到 `Github Page` 后，出现了这样一个问题。\n' +
        '> \n' +
        '> > 刷新页面出现 `Cannot GET /` 提示，路由未生效。\n' +
        '> \n' +
        '> 通过了解，知道了原因是这样，并且可以解决：\n' +
        '> \n' +
        '> * 由于刷新之后，会根据URL对服务器发送请求，而不是处理路由，导致出现 `Cannot GET /` 错误。\n' +
        '> * 通过修改 `<Router>` → `<HashRouter>` 。\n' +
        '> * `<HashRouter>` 借助URL上的哈希值（hash）来实现路由。可以在不需要全屏刷新的情况下，达到切换页面的目的。\n' +
        '> \n' +
        '> ### 路由跳转后不会自动回到顶部\n' +
        '> 当前一个页面滚动到一定区域后，点击跳转后，页面虽然跳转了，但是会停留在滚动的区域，不会自动回到页面顶部。\n' +
        '> \n' +
        '> 可以通过这样来解决：\n' +
        '> \n' +
        '> ```js\n' +
        '> componentDidMount() {\n' +
        '>     this.node.scrollIntoView();\n' +
        '> }\n' +
        '> \n' +
        '> render() {\n' +
        '>   return (\n' +
        '>     <div ref={node => this.node = node} ></div>\n' +
        '>   );\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> ## 状态管理\n' +
        '> 项目中多次需要用到从 `Github Issues` 请求来的数据，因为之前就知道 `Redux` 这个东西的存在，虽然有点大材小用，为了学习还是将它用于项目的状态管理，只需要请求一次数据即可。\n' +
        '> \n' +
        '> 官方文档：http://redux.js.org/\n' +
        '> \n' +
        '> 中文文档：http://cn.redux.js.org/\n' +
        '> \n' +
        '> 简单的来说，每一次的修改状态都需要触发 `action` ，然而其实项目中我现在还没用到修改数据2333。。。\n' +
        '> \n' +
        '> 关于状态管理这一块，由于还不是太了解，就不误人子弟了~\n' +
        '> \n' +
        '> ## 主要组件\n' +
        '> React是基于组件构建的，所以在搭建页面的开始，我们要先考虑一下我们需要一些什么样的组件，这些组件之间有什么关系，哪些组件是可以复用的等等等。\n' +
        '> \n' +
        '> ### 首页\n' +
        '> ![](https://camo.githubusercontent.com/c56d97868a4502bca2878b71d6b56fe2cd943f69/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545392541362539362545392541312542352e676966)\n' +
        '> \n' +
        '> 可以看到，我主要将首页分成了四个部分：\n' +
        '> \n' +
        '> * header：网站标题，副标题，导航栏\n' +
        '> * banner：about me ~，准备用自己的照片换个背景，但是还没有合适的照片\n' +
        '> * card area：暂时是三个卡片\n' +
        '>   \n' +
        '>   * blog card：最近的几篇博文\n' +
        '>   * demo card：几个小demo类别\n' +
        '>   * me card：算是我放飞自我的地方吧\n' +
        '> * footer：版权信息、备案信息、浏览量\n' +
        '> \n' +
        '> ### 博客页\n' +
        '> ![](https://camo.githubusercontent.com/e020a7d8a7d872edd7b55bd6319583935223a7d7/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545352538442539412545352541452541322545392541312542352e676966)\n' +
        '> \n' +
        '> 博客页就是很中规中矩的一个页面吧，这部分是整个项目中代码量最多的部分，包括以下几部分：\n' +
        '> \n' +
        '> * 文章列表组件\n' +
        '> * 翻页组件\n' +
        '> * 归档按钮组件\n' +
        '> * 类别组件\n' +
        '> * 标签组件\n' +
        '> \n' +
        '> #### 文章列表\n' +
        '> 文章列表其实就是一个 `list`，里面有一个个的 `item`:\n' +
        '> \n' +
        '> ```\n' +
        '> <div class="archive-list">\n' +
        '>   <div class="blog-article-item">文章1</div>\n' +
        '>   <div class="blog-article-item">文章2</div>\n' +
        '> <div>\n' +
        '> ```\n' +
        '> \n' +
        '> 对于每一个 `item`，其实是这样的：\n' +
        '> \n' +
        '> ![](https://camo.githubusercontent.com/3637601cf00ee937279bd7e6c139731f5df6b0d0/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545362539362538372545372541422541306974656d2e706e67)\n' +
        '> \n' +
        '> 一个文章item组件它可能需要包括：\n' +
        '> \n' +
        '> * 文章标题\n' +
        '> * 文章发布的时间、类别、标签等\n' +
        '> * 文章摘要\n' +
        '> * ...\n' +
        '> \n' +
        '> 如果用 `DOM` 来描述，它应该是这样的：\n' +
        '> \n' +
        '> ```\n' +
        '> <div class="blog-article-item">\n' +
        '>   <div class="blog-article-item-title">文章标题</div>\n' +
        '>   <div class="blog-article-item-time">时间</div>\n' +
        '>   <div class="blog-article-item-label">类别</div>\n' +
        '>   <div class="blog-article-item-label">标签</div>\n' +
        '>   <div class="blog-article-item-desc">摘要</div>\n' +
        '> </div>\n' +
        '> ```\n' +
        '> \n' +
        '> 所以，我们可以有很多个组件：\n' +
        '> \n' +
        '> * 文章列表组件 `<ArticleList />`\n' +
        '> * 文章item组件 `<ArticleItem />`\n' +
        '> * 类别标签组件 `<ArticleLabel />`\n' +
        '> \n' +
        '> 它们可能是这样一个关系：\n' +
        '> \n' +
        '> ```js\n' +
        '> <ArticleList>\n' +
        '>   <ArticleItem>\n' +
        '>     <ArticleTitle />\n' +
        '>     <ArticleTime />\n' +
        '>     <ArticleLabel />\n' +
        '>     <ArticleDesc />\n' +
        '>   </ArticleItem>\n' +
        '>   <ArticleItem></ArticleItem>\n' +
        '>   <ArticleItem></ArticleItem>\n' +
        '> </ArticleList>\n' +
        '> ```\n' +
        '> \n' +
        '> #### 分页\n' +
        '> 对于分页功能，传统的实现方法是在后端完成分页然后分批返回到前端的，比如可能会返回一段这样的数据：\n' +
        '> \n' +
        '> ```js\n' +
        '> {\n' +
        '>   total:500,\n' +
        '>   page:1,\n' +
        '>   data:[]\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> 也就是后端会返回分好页的数据，含有表示总数据量的`total`、当前页数的`page`，以及属于该页的数据`data`。\n' +
        '> \n' +
        '> 然而，我这个页面只是个静态页面，数据是放在Github Issues上的通过API获取的。（Github Issues的分页貌似不能自定义数量...），所以没法直接返回分好的数据，所以只能在前端强行分页~\n' +
        '> \n' +
        '> 分页功能这一块我偷懒了...用的是 `antd` 的翻页组件 `<Pagination />`。\n' +
        '> \n' +
        '> 官方文档：https://ant.design/components/pagination-cn/\n' +
        '> \n' +
        '> 文档很清晰，使用起来也特别简单。\n' +
        '> \n' +
        '> 前端渲染的逻辑（有点蠢）：将数据存放到一个数组中，根据当前页数和每页显示条数来计算该显示的索引值，取出相应的数据即可。\n' +
        '> \n' +
        '> 翻页组件中：\n' +
        '> \n' +
        '> ```js\n' +
        '> constructor() {\n' +
        '>   super();\n' +
        '>   this.onChangePage = this.onChangePage.bind(this);\n' +
        '> }\n' +
        '> \n' +
        '> onChangePage(pageNumber) {\n' +
        '>   this.props.handlePageChange(pageNumber);\n' +
        '> }\n' +
        '> \n' +
        '> render() {\n' +
        '>   return (\n' +
        '>     <div className="blog-article-paging">\n' +
        '>       <Pagination onChange={this.onChangePage} defaultPageSize={this.props.defaultPageSize} total={this.props.total} />\n' +
        '>     </div>\n' +
        '>   );\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> 当页数发生改变后，会触发从父组件传进 `<ArticlePaging />` 的方法 `handlePageChange`，从而将页数传递到父组件中，然后传递到 `<ArticleList />` 中。\n' +
        '> \n' +
        '> 父组件中：\n' +
        '> \n' +
        '> ```js\n' +
        '> handlePageChange(pageNumber) {\n' +
        '>   this.setState({ currentPage: pageNumber });\n' +
        '> }\n' +
        '> \n' +
        '> render() {\n' +
        '>   return (\n' +
        '>     <div className="archive-list-area">\n' +
        '>       <ArticleList issues={this.props.issues} defaultPageSize={this.state.defaultPageSize} pageNumber={this.state.currentPage} />\n' +
        '>       <ArticlePaging handlePageChange={this.handlePageChange} total={this.props.issues.length} defaultPageSize={this.state.defaultPageSize} />\n' +
        '>     </div>\n' +
        '>   );\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> 列表中：\n' +
        '> \n' +
        '> ```js\n' +
        '> render() {\n' +
        '>   const articlelist = [];\n' +
        '>   const issues = this.props.issues;\n' +
        '>   const currentPage = this.props.pageNumber;\n' +
        '>   const defaultPageSize = this.props.defaultPageSize;\n' +
        '>   const start = currentPage === 1 ? 0 : (currentPage - 1) * defaultPageSize;\n' +
        '>   const end = start + defaultPageSize < issues.length ? start + defaultPageSize : issues.length;\n' +
        '>   for (let i = start; i < end; i += 1) {\n' +
        '>     const item = issues[i];\n' +
        '>     articlelist.push(<ArticleItem />);\n' +
        '>   }\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> #### label\n' +
        '> 在 `Github Issues` 中，可以为一个 `issue` 添加很多个 `label`，我将这些对于博客内容有用的 `label` 分为三类，分别用不同颜色来表示。\n' +
        '> \n' +
        '> 这里说明一下， `label` 创建后会随机生成一个 `id`，虽然说 `id` 是不重复的，但是文章的类别、标签会一直在增加，当新加一个 `label` 时，程序中可能也要进行对应的修改，当作区分 `label` 的标准可能就不太合适，所以我采用颜色来区分它们。\n' +
        '> \n' +
        '> * 表示这是一篇文章的blog：只有有 `blog` 的 `issue` 才能显示在页面上，过滤 `bug` 、`help` 等\n' +
        '> * 表示文章类别的：用来表示文章的类别，比如“前端”、“摄影”等\n' +
        '> * 表示文章标签的：用来表示文章的标签，比如“JavaScript”、“React”等\n' +
        '> \n' +
        '> 即使有新的 `label` ，也只要根据颜色区分是属于哪一类就好了。\n' +
        '> \n' +
        '> ##### 类别\n' +
        '> ![](https://camo.githubusercontent.com/8d0463b2522519ac0c3c18b7bb211d6c13cda7fb/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545372542312542422545352538382541422e676966)\n' +
        '> \n' +
        '> 在这里的思路主要就是：遍历所有 `issues`，然后再遍历每个 `issue`的 `labels`，找出属于类别的 `label`，然后计数。\n' +
        '> \n' +
        '> ```js\n' +
        '> const categoryList = [];\n' +
        '> const categoryHash = {};\n' +
        '> for (let i = 0; i < issues.length; i += 1) {\n' +
        '>   const labels = issues[i].labels;\n' +
        '>   for (let j = 0; j < labels.length; j += 1) {\n' +
        '>     if (labels[j].color === COLOR_LABEL_CATEGORY) {\n' +
        '>       const category = labels[j].name;\n' +
        '>       if (categoryHash[category] === undefined) {\n' +
        '>         categoryHash[category] = true;\n' +
        '>         const categoryTemp = { category, sum: 1 };\n' +
        '>         categoryList.push(categoryTemp);\n' +
        '>       } else {\n' +
        '>         for (let k = 0; k < categoryList.length; k += 1) {\n' +
        '>           if (categoryList[k].category === category) {\n' +
        '>             categoryList[k].sum += 1;\n' +
        '>           }\n' +
        '>         }\n' +
        '>       }\n' +
        '>     }\n' +
        '>   }\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> 这样实现得要经历三次循环，复杂度有点高，感觉有点蠢，有待改进，如果有更好的方法，请多多指教~\n' +
        '> \n' +
        '> ##### 标签\n' +
        '> ![](https://camo.githubusercontent.com/a7e46f965692e5fa2e0de686fe107188af774388/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545362541302538372545372541442542452e676966)\n' +
        '> \n' +
        '> 这里的思路和类别的思路基本一样，只不过不同的显示方式而已。\n' +
        '> \n' +
        '> 本来这里是想通过字体大小来体现每个标签的权重，后来觉得可能对于我来说，暂时只有那几个标签会很频繁，其它标签可能会很少，用字体大小来区分就没有什么意义，还是改成排序的方式。\n' +
        '> \n' +
        '> ### 文章页\n' +
        '> ![](https://camo.githubusercontent.com/c22bf0976203e13e011e48331af14a6ffdd4d841/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545362539362538372545372541422541302545392541312542352e676966)\n' +
        '> \n' +
        '> 文章页主要分为两部分：\n' +
        '> \n' +
        '> * 文章内容区域：显示文章内容，显示在页面的主体区域\n' +
        '> * 章节目录：文章的章节目录，显示在文章的右侧区域\n' +
        '> \n' +
        '> #### 文章内容\n' +
        '> 有两种方式获取文章具体内容：\n' +
        '> \n' +
        '> * 从之前已经请求过的数组中去遍历查找所需的文章内容\n' +
        '> * 通过 `issue number` 重新发一次请求直接获取内容\n' +
        '> \n' +
        '> 最后我选择了后者。\n' +
        '> \n' +
        '> 文章是用 `markdown` 语法写的，所以要先转成 `html` 然后插入页面中，这里用了一个 `React` 不提倡的属性：`dangerouslySetInnerHTML`。\n' +
        '> \n' +
        '> 除了渲染`markdown`，我们还得对文章中的代码进行高亮显示，还有就是定制文章中不同标签的样式。\n' +
        '> \n' +
        '> #### 章节目录\n' +
        '> 首先，这里有一个 `issue`，希望大家可以给一些建议~\n' +
        '> \n' +
        '> 文章内容是通过 `markdown` 渲染后插入 `dom` 中的，由于 `React` 不建议通过 `document.getElementById` 的形式获取 `dom` 元素，所以只能想办法通过字符串匹配的方式获取文章的各个章节标题。\n' +
        '> \n' +
        '> 由于我不太熟悉正则表达式，曾经还在sf上咨询过，就采用了其中一个答案：\n' +
        '> \n' +
        '> ```js\n' +
        '> const issues = content;\n' +
        '> const menu = [];\n' +
        '> const patt = /(#+)\\s+?(.+)/g;\n' +
        '> let result = null;\n' +
        '> while ((result = patt.exec(issues))) {\n' +
        '>   menu.push({ level: result[1].length, title: result[2] });\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> 这样可以获取到所有的 `#` 的字符串，也就是 `markdown` 中的标题， `result[1].length` 表示有几个 `#`，其实就是几级标题的意思，`title` 就是标题内容了。\n' +
        '> \n' +
        '> 这里还有一个问题，本来通过 `<a target="" />` 的方式可以实现点击跳转，但是现在渲染出来的 `html` 中对于每一个标题没有独一无二的标识。。。\n' +
        '> \n' +
        '> ### 归档页\n' +
        '> 按年份归档：\n' +
        '> \n' +
        '> ![](https://camo.githubusercontent.com/c4e7790b42c333d8adffa06a3ee7932dd4e57eab/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c65254535254244253932254536254131254133312e706e67)\n' +
        '> \n' +
        '> 按类别归档：\n' +
        '> \n' +
        '> ![](https://camo.githubusercontent.com/7e7ac3c308a6cb80d4d40477518a24e1fe638144/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545352542442539322545362541312541332e706e67)\n' +
        '> \n' +
        '> 按标签归档：\n' +
        '> \n' +
        '> ![](https://camo.githubusercontent.com/c6e30b6ac882c2e0f8f3f11c98d6355fceb9f3ab/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c65254535254244253932254536254131254133322e706e67)\n' +
        '> \n' +
        '> ## 问题\n' +
        '> 基本功能是已经基本实现了，现在还存在着以下几个问题，也算是一个 `TodoList` 吧\n' +
        '> \n' +
        '> * 评论功能。拟利用 `Github Issues API` 实现评论，得实现 `Github` 授权登录\n' +
        '> * 回到顶部。拟利用 `antd` 的组件，但是 `state` 中 `visibility` 一直是 `false`\n' +
        '> * 首页渲染。现在打包完的js文件还是太大了，导致首页渲染太慢，这个是接下来工作的重点，也了解过关于这方面的优化：\n' +
        '>   \n' +
        '>   * `webpack` 按需加载。这可能是目前最方便的方式\n' +
        '>   * 服务端渲染。这就麻烦了，但是好处也多，不仅解决渲染问题，还有利于SEO，所以也是 `todo` 之一\n' +
        '> * 响应式。现在的样式都是在PC端的，还未适配移动端。\n' +
        '> * 代码混乱，逻辑不对。这是我自己的问题，需要再修炼。\n' +
        '\n',
    page_view: 20106,
    article_type: '创作集',
    created_at: '2019-08-06 12:12',
  },
  {
    id: 2,
    title: '优雅地下载我的B站投币视频',
    content:'> 学习 React 的过程中实现了一个个人主页，没有复杂的实现和操作，适合入门 ~\n' +
        '> \n' +
        '> 这个项目其实功能很简单，就是常见的主页、博客、demo、关于我等功能。\n' +
        '> \n' +
        '> 页面样式都是自己写的，黑白风格，可能有点丑。不过还是最低级的 CSS ，准备到时候重构 ~\n' +
        '> \n' +
        '> 如果有更好的方法，或者是我的想法有偏差的，欢迎大家交流指正\n' +
        '> \n' +
        '> 欢迎参观：http://axuebin.com/react-blog\n' +
        '> \n' +
        '> Github：https://github.com/axuebin/react-blog\n' +
        '> \n' +
        '> ## 预览图\n' +
        '> ### 首页\n' +
        '> ![](https://camo.githubusercontent.com/ab4d845d7abdd7fd0c66ebd2d93158bb879e8bb7/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545392541362539362545392541312542352e706e67)\n' +
        '> \n' +
        '> ### 博客页\n' +
        '> ![](https://camo.githubusercontent.com/f80b6dd1f00f849b2353d65bce096ca34f65f405/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545352538442539412545352541452541322545392541312542352e706e67)\n' +
        '> \n' +
        '> ### 文章内容页\n' +
        '> ![](https://camo.githubusercontent.com/cd2410d2f149203b3fa85cbf76a49aafa4c070d6/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545362539362538372545372541422541302545352538362538352545352541452542392e706e67)\n' +
        '> \n' +
        '> ### Demo页\n' +
        '> ![](https://camo.githubusercontent.com/492fb6e2e1e0cd001fe8f59064b944cbaa465225/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c6564656d6f2545392541312542352e706e67)\n' +
        '> \n' +
        '> ## 关键技术\n' +
        '> * ES6：项目中用到 ES6 的语法，在写的过程中尽量使用，可能有的地方没想到\n' +
        '> * React\n' +
        '> * React-Router：前端路由\n' +
        '> * React-Redux：状态管理\n' +
        '> * webpack：打包\n' +
        '> * marked：Markdown渲染\n' +
        '> * highlight.js：代码高亮\n' +
        '> * fetch：异步请求数据\n' +
        '> * eslint：代码检查\n' +
        '> * antd：部分组件懒得自己写。。\n' +
        '> \n' +
        '> ## 准备工作\n' +
        '> 由于不是使用 React 脚手架生成的项目，所以每个东西都是自己手动配置的。。。\n' +
        '> \n' +
        '> ### 模块打包器\n' +
        '> 打包用的是 `webpack 2.6.1`，准备入坑 `webpack 3` 。\n' +
        '> \n' +
        '> 官方文档：https://webpack.js.org/\n' +
        '> \n' +
        '> 中文文档：https://doc.webpack-china.org/\n' +
        '> \n' +
        '> 对于 `webpack` 的配置还不是太熟，就简单的配置了一下可供项目启动：\n' +
        '> \n' +
        '> ```js\n' +
        '> var webpack = require(\'webpack\');\n' +
        '> var path = require(\'path\');\n' +
        '> \n' +
        '> module.exports = {\n' +
        '>   context: __dirname + \'/src\',\n' +
        '>   entry: "./js/index.js",\n' +
        '>   module: {\n' +
        '>     loaders: [\n' +
        '>       {\n' +
        '>         test: /\\.js?$/,\n' +
        '>         exclude: /(node_modules)/,\n' +
        '>         loader: \'babel-loader\',\n' +
        '>         query: {\n' +
        '>           presets: [\'react\', \'es2015\']\n' +
        '>         }\n' +
        '>       }, {\n' +
        '>         test: /\\.css$/,\n' +
        '>         loader: \'style-loader!css-loader\'\n' +
        '>       }, {\n' +
        '>         test: /\\.js$/,\n' +
        '>         exclude: /(node_modules)/,\n' +
        '>         loader: \'eslint-loader\'\n' +
        '>       }, {\n' +
        '>         test: /\\.json$/,\n' +
        '>         loader: \'json-loader\'\n' +
        '>       }\n' +
        '>     ]\n' +
        '>   },\n' +
        '>   output: {\n' +
        '>     path: __dirname + "/src/",\n' +
        '>     filename: "bundle.js"\n' +
        '>   }\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> `webpack` 有几个重要的属性：`entry`、`module`、`output`、`plugins`，在这里我还没使用到插件，所以没有配置 `plugins` 。\n' +
        '> \n' +
        '> `module` 中的 `loaders`：\n' +
        '> \n' +
        '> * babel-loader：将代码转换成es5代码\n' +
        '> * css-loader：处理css中路径引用等问题\n' +
        '> * style-loader：动态把样式写入css\n' +
        '> * eslin-loader：使用eslint\n' +
        '> \n' +
        '> ### 包管理\n' +
        '> 包管理现在使用的还是 `NPM` 。\n' +
        '> \n' +
        '> 官方文档：https://docs.npmjs.com/\n' +
        '> \n' +
        '> 1. npm init\n' +
        '> 2. npm install\n' +
        '> 3. npm uninstall\n' +
        '> \n' +
        '> 关于`npm`，可能还需要了解 `dependencies` 和 `devDependencies` 的区别，我是这样简单理解的：\n' +
        '> \n' +
        '> * dependencies：项目跑起来后需要使用到的模块\n' +
        '> * devDependencies：开发的时候需要用的模块，但是项目跑起来后就不需要了\n' +
        '> \n' +
        '> ### 代码检查\n' +
        '> 项目使用现在比较流行的 `ESLint` 作为代码检查工具，并使用 `Airbnb` 的检查规则。\n' +
        '> \n' +
        '> ESLint：https://github.com/eslint/eslint\n' +
        '> \n' +
        '> eslint-config-airbnb：https://www.npmjs.com/package/eslint-config-airbnb\n' +
        '> \n' +
        '> 在 `package.json` 中可以看到，关于 `ESLint` 的包就是放在 `devDependencies` 底下的，因为它只是在开发的时候会使用到。\n' +
        '> \n' +
        '> #### 使用\n' +
        '> * 在 `webpack` 配置中加载 `eslint-loader`：\n' +
        '> \n' +
        '> ```js\n' +
        '> module: {\n' +
        '>   loaders: [\n' +
        '>       {\n' +
        '>         test: /\\.js$/,\n' +
        '>         exclude: /(node_modules)/,\n' +
        '>         loader: \'eslint-loader\'\n' +
        '>       }\n' +
        '>     ]\n' +
        '>   }\n' +
        '> ```\n' +
        '> \n' +
        '> * 创建 `.elintrc`文件：\n' +
        '> \n' +
        '> ```js\n' +
        '> {\n' +
        '>   "extends": "airbnb",\n' +
        '>   "env":{\n' +
        '>     "browser": true\n' +
        '>   },\n' +
        '>   "rules":{}\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> 然后在运行 `webpack` 的时候，就会执行代码检查啦，看着一堆的 `warning` 、`error` 是不是很爽~\n' +
        '> \n' +
        '> 这里有常见的ESLint规则：http://eslint.cn/docs/rules/\n' +
        '> \n' +
        '> ### 数据源\n' +
        '> 由于是为了练习 `React`，暂时就只考虑搭建一个静态页面，而且现在越来越多的大牛喜欢用 `Github Issues` 来写博客，也可以更好的地提供评论功能，所以我也想试试用 `Github Issues` 来作为博客的数据源。\n' +
        '> \n' +
        '> API在这：https://developer.github.com/v3/issues/\n' +
        '> \n' +
        '> 我也没看完全部的API，就看了看怎么获取 `Issues` 列表。。\n' +
        '> \n' +
        '> ```js\n' +
        '> https://api.github.com/repos/axuebin/react-blog/issues?creator=axuebin&labels=blog\n' +
        '> ```\n' +
        '> \n' +
        '> 通过控制参数 `creator` 和 `labels`，可以筛选出作为展示的 `Issues`。它会返回一个带有 `issue` 格式对象的数组。每一个 `issue` 有很多属性，我们可能不需要那么多，先了解了解底下这几种：\n' +
        '> \n' +
        '> ```js\n' +
        '> // 为了方便，我把注释写在json中了。。\n' +
        '> [{\n' +
        '>   "url": ,  // issue 的 url\n' +
        '>   "id": ,  // issue id ， 是一个随机生成的不重复的数字串 \n' +
        '>   "number": ,  // issue number ， 根据创建 issue 的顺序从1开始累加\n' +
        '>   "title": ,  // issue 的标题\n' +
        '>   "labels": [], // issue 的所有 label，它是一个数组\n' +
        '>   "created_at": , // 创建 issue 的时间\n' +
        '>   "updated_at": , // 最后修改 issue 的时间\n' +
        '>   "body": , // issue 的内容\n' +
        '> }]\n' +
        '> ```\n' +
        '> \n' +
        '> #### 异步请求数据\n' +
        '> 项目中使用的异步请求数据的方法时 `fetch`。\n' +
        '> \n' +
        '> 关于 `fetch` ：https://segmentfault.com/a/1190000003810652\n' +
        '> \n' +
        '> 使用起来很简单：\n' +
        '> \n' +
        '> ```js\n' +
        '> fetch(url).then(response => response.json())\n' +
        '>       .then(json => console.log(json))\n' +
        '>       .catch(e => console.log(e));\n' +
        '> ```\n' +
        '> \n' +
        '> ### markdown 渲染\n' +
        '> 在 `Github` 上查找关于如何在 `React` 实现 `markdown` 的渲染，查到了这两种库：\n' +
        '> \n' +
        '> * react-markdown：https://github.com/rexxars/react-markdown\n' +
        '> * marked：https://github.com/chjj/marked\n' +
        '> \n' +
        '> 使用起来都很简单。\n' +
        '> \n' +
        '> 如果是 `react-markdown`,只需要这样做：\n' +
        '> \n' +
        '> ```js\n' +
        '> import ReactMarkdown from \'react-markdown\';\n' +
        '> \n' +
        '> const input = \'# This is a header\\n\\nAnd this is a paragraph\';\n' +
        '> ReactDOM.render(\n' +
        '>     <ReactMarkdown source={input} />,\n' +
        '>     document.getElementById(\'container\')\n' +
        '> );\n' +
        '> ```\n' +
        '> \n' +
        '> 如果是`marked`，这样做：\n' +
        '> \n' +
        '> ```js\n' +
        '> import marked from \'marked\';\n' +
        '> \n' +
        '> const input = \'# This is a header\\n\\nAnd this is a paragraph\';\n' +
        '> const output = marked(input);\n' +
        '> ```\n' +
        '> \n' +
        '> 这里有点不太一样，我们获取到了一个字符串 `output`，注意，是一个字符串，所以我们得将它插入到 `dom`中，在 `React` 中，我们可以这样做：\n' +
        '> \n' +
        '> ```\n' +
        '> <div dangerouslySetInnerHTML={{ __html: output }} />\n' +
        '> ```\n' +
        '> \n' +
        '> 由于我们的项目是基于 `React` 的，所以想着用 `react-markdown`会更好，而且由于安全问题 `React` 也不提倡直接往 `dom` 里插入字符串，然而在使用过程中发现，`react-markdown` 对表格的支持不友好，所以只好弃用，改用 `marked`。\n' +
        '> \n' +
        '> ### 代码高亮\n' +
        '> 代码高亮用的是`highlight.js`：https://github.com/isagalaev/highlight.js\n' +
        '> \n' +
        '> 它和`marked`可以无缝衔接~\n' +
        '> \n' +
        '> 只需要这样既可：\n' +
        '> \n' +
        '> ```js\n' +
        '> import hljs from \'highlight.js\';\n' +
        '> \n' +
        '> marked.setOptions({\n' +
        '>   highlight: code => hljs.highlightAuto(code).value,\n' +
        '> });\n' +
        '> ```\n' +
        '> \n' +
        '> `highlight.js`是支持多种代码配色风格的，可以在`css`文件中进行切换：\n' +
        '> \n' +
        '> ```css\n' +
        '> @import \'~highlight.js/styles/atom-one-dark.css\';\n' +
        '> ```\n' +
        '> \n' +
        '> 在这可以看到每种语言的高亮效果和配色风格：https://highlightjs.org/\n' +
        '> \n' +
        '> ## React\n' +
        '> ### state 和 props 是什么\n' +
        '> 可以看之前的一篇文章：#8\n' +
        '> \n' +
        '> ### 关于React组件的生命周期\n' +
        '> 可以看之前的一篇文章：#9\n' +
        '> \n' +
        '> ## 前端路由\n' +
        '> 项目中前端路由用的是 `React-Router V4`。\n' +
        '> \n' +
        '> 官方文档：https://reacttraining.com/react-router/web/guides/quick-start\n' +
        '> \n' +
        '> 中文文档：http://reacttraining.cn/\n' +
        '> \n' +
        '> ### 基本使用\n' +
        '> ```js\n' +
        '> <Link to="/blog">Blog</Link>\n' +
        '> ```\n' +
        '> \n' +
        '> ```js\n' +
        '> <Router>\n' +
        '>   <Route exact path="/" component={Home} />\n' +
        '>   <Route path="/blog" component={Blog} />\n' +
        '>   <Route path="/demo" component={Demo} />\n' +
        '> </Router>\n' +
        '> ```\n' +
        '> \n' +
        '> 注意：一定要在根目录的 `Route` 中声明 `exact`，要不然点击任何链接都无法跳转。\n' +
        '> \n' +
        '> ### 2级目录跳转\n' +
        '> 比如我现在要在博客页面上点击跳转，此时的 `url` 是 `localhost:8080/blog`,需要变成 `localhost:8080/blog/article`，可以这样做：\n' +
        '> \n' +
        '> ```js\n' +
        '> <Route path={`${this.props.match.url}/article/:number`} component={Article} />\n' +
        '> ```\n' +
        '> \n' +
        '> 这样就可以跳转到 `localhost:8080/blog/article` 了，而且还传递了一个 `number` 参数，在 `article` 中可以通过 `this.props.params.number`获取。\n' +
        '> \n' +
        '> ### HashRouter\n' +
        '> 当我把项目托管到 `Github Page` 后，出现了这样一个问题。\n' +
        '> \n' +
        '> > 刷新页面出现 `Cannot GET /` 提示，路由未生效。\n' +
        '> \n' +
        '> 通过了解，知道了原因是这样，并且可以解决：\n' +
        '> \n' +
        '> * 由于刷新之后，会根据URL对服务器发送请求，而不是处理路由，导致出现 `Cannot GET /` 错误。\n' +
        '> * 通过修改 `<Router>` → `<HashRouter>` 。\n' +
        '> * `<HashRouter>` 借助URL上的哈希值（hash）来实现路由。可以在不需要全屏刷新的情况下，达到切换页面的目的。\n' +
        '> \n' +
        '> ### 路由跳转后不会自动回到顶部\n' +
        '> 当前一个页面滚动到一定区域后，点击跳转后，页面虽然跳转了，但是会停留在滚动的区域，不会自动回到页面顶部。\n' +
        '> \n' +
        '> 可以通过这样来解决：\n' +
        '> \n' +
        '> ```js\n' +
        '> componentDidMount() {\n' +
        '>     this.node.scrollIntoView();\n' +
        '> }\n' +
        '> \n' +
        '> render() {\n' +
        '>   return (\n' +
        '>     <div ref={node => this.node = node} ></div>\n' +
        '>   );\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> ## 状态管理\n' +
        '> 项目中多次需要用到从 `Github Issues` 请求来的数据，因为之前就知道 `Redux` 这个东西的存在，虽然有点大材小用，为了学习还是将它用于项目的状态管理，只需要请求一次数据即可。\n' +
        '> \n' +
        '> 官方文档：http://redux.js.org/\n' +
        '> \n' +
        '> 中文文档：http://cn.redux.js.org/\n' +
        '> \n' +
        '> 简单的来说，每一次的修改状态都需要触发 `action` ，然而其实项目中我现在还没用到修改数据2333。。。\n' +
        '> \n' +
        '> 关于状态管理这一块，由于还不是太了解，就不误人子弟了~\n' +
        '> \n' +
        '> ## 主要组件\n' +
        '> React是基于组件构建的，所以在搭建页面的开始，我们要先考虑一下我们需要一些什么样的组件，这些组件之间有什么关系，哪些组件是可以复用的等等等。\n' +
        '> \n' +
        '> ### 首页\n' +
        '> ![](https://camo.githubusercontent.com/c56d97868a4502bca2878b71d6b56fe2cd943f69/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545392541362539362545392541312542352e676966)\n' +
        '> \n' +
        '> 可以看到，我主要将首页分成了四个部分：\n' +
        '> \n' +
        '> * header：网站标题，副标题，导航栏\n' +
        '> * banner：about me ~，准备用自己的照片换个背景，但是还没有合适的照片\n' +
        '> * card area：暂时是三个卡片\n' +
        '>   \n' +
        '>   * blog card：最近的几篇博文\n' +
        '>   * demo card：几个小demo类别\n' +
        '>   * me card：算是我放飞自我的地方吧\n' +
        '> * footer：版权信息、备案信息、浏览量\n' +
        '> \n' +
        '> ### 博客页\n' +
        '> ![](https://camo.githubusercontent.com/e020a7d8a7d872edd7b55bd6319583935223a7d7/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545352538442539412545352541452541322545392541312542352e676966)\n' +
        '> \n' +
        '> 博客页就是很中规中矩的一个页面吧，这部分是整个项目中代码量最多的部分，包括以下几部分：\n' +
        '> \n' +
        '> * 文章列表组件\n' +
        '> * 翻页组件\n' +
        '> * 归档按钮组件\n' +
        '> * 类别组件\n' +
        '> * 标签组件\n' +
        '> \n' +
        '> #### 文章列表\n' +
        '> 文章列表其实就是一个 `list`，里面有一个个的 `item`:\n' +
        '> \n' +
        '> ```\n' +
        '> <div class="archive-list">\n' +
        '>   <div class="blog-article-item">文章1</div>\n' +
        '>   <div class="blog-article-item">文章2</div>\n' +
        '> <div>\n' +
        '> ```\n' +
        '> \n' +
        '> 对于每一个 `item`，其实是这样的：\n' +
        '> \n' +
        '> ![](https://camo.githubusercontent.com/3637601cf00ee937279bd7e6c139731f5df6b0d0/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545362539362538372545372541422541306974656d2e706e67)\n' +
        '> \n' +
        '> 一个文章item组件它可能需要包括：\n' +
        '> \n' +
        '> * 文章标题\n' +
        '> * 文章发布的时间、类别、标签等\n' +
        '> * 文章摘要\n' +
        '> * ...\n' +
        '> \n' +
        '> 如果用 `DOM` 来描述，它应该是这样的：\n' +
        '> \n' +
        '> ```\n' +
        '> <div class="blog-article-item">\n' +
        '>   <div class="blog-article-item-title">文章标题</div>\n' +
        '>   <div class="blog-article-item-time">时间</div>\n' +
        '>   <div class="blog-article-item-label">类别</div>\n' +
        '>   <div class="blog-article-item-label">标签</div>\n' +
        '>   <div class="blog-article-item-desc">摘要</div>\n' +
        '> </div>\n' +
        '> ```\n' +
        '> \n' +
        '> 所以，我们可以有很多个组件：\n' +
        '> \n' +
        '> * 文章列表组件 `<ArticleList />`\n' +
        '> * 文章item组件 `<ArticleItem />`\n' +
        '> * 类别标签组件 `<ArticleLabel />`\n' +
        '> \n' +
        '> 它们可能是这样一个关系：\n' +
        '> \n' +
        '> ```js\n' +
        '> <ArticleList>\n' +
        '>   <ArticleItem>\n' +
        '>     <ArticleTitle />\n' +
        '>     <ArticleTime />\n' +
        '>     <ArticleLabel />\n' +
        '>     <ArticleDesc />\n' +
        '>   </ArticleItem>\n' +
        '>   <ArticleItem></ArticleItem>\n' +
        '>   <ArticleItem></ArticleItem>\n' +
        '> </ArticleList>\n' +
        '> ```\n' +
        '> \n' +
        '> #### 分页\n' +
        '> 对于分页功能，传统的实现方法是在后端完成分页然后分批返回到前端的，比如可能会返回一段这样的数据：\n' +
        '> \n' +
        '> ```js\n' +
        '> {\n' +
        '>   total:500,\n' +
        '>   page:1,\n' +
        '>   data:[]\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> 也就是后端会返回分好页的数据，含有表示总数据量的`total`、当前页数的`page`，以及属于该页的数据`data`。\n' +
        '> \n' +
        '> 然而，我这个页面只是个静态页面，数据是放在Github Issues上的通过API获取的。（Github Issues的分页貌似不能自定义数量...），所以没法直接返回分好的数据，所以只能在前端强行分页~\n' +
        '> \n' +
        '> 分页功能这一块我偷懒了...用的是 `antd` 的翻页组件 `<Pagination />`。\n' +
        '> \n' +
        '> 官方文档：https://ant.design/components/pagination-cn/\n' +
        '> \n' +
        '> 文档很清晰，使用起来也特别简单。\n' +
        '> \n' +
        '> 前端渲染的逻辑（有点蠢）：将数据存放到一个数组中，根据当前页数和每页显示条数来计算该显示的索引值，取出相应的数据即可。\n' +
        '> \n' +
        '> 翻页组件中：\n' +
        '> \n' +
        '> ```js\n' +
        '> constructor() {\n' +
        '>   super();\n' +
        '>   this.onChangePage = this.onChangePage.bind(this);\n' +
        '> }\n' +
        '> \n' +
        '> onChangePage(pageNumber) {\n' +
        '>   this.props.handlePageChange(pageNumber);\n' +
        '> }\n' +
        '> \n' +
        '> render() {\n' +
        '>   return (\n' +
        '>     <div className="blog-article-paging">\n' +
        '>       <Pagination onChange={this.onChangePage} defaultPageSize={this.props.defaultPageSize} total={this.props.total} />\n' +
        '>     </div>\n' +
        '>   );\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> 当页数发生改变后，会触发从父组件传进 `<ArticlePaging />` 的方法 `handlePageChange`，从而将页数传递到父组件中，然后传递到 `<ArticleList />` 中。\n' +
        '> \n' +
        '> 父组件中：\n' +
        '> \n' +
        '> ```js\n' +
        '> handlePageChange(pageNumber) {\n' +
        '>   this.setState({ currentPage: pageNumber });\n' +
        '> }\n' +
        '> \n' +
        '> render() {\n' +
        '>   return (\n' +
        '>     <div className="archive-list-area">\n' +
        '>       <ArticleList issues={this.props.issues} defaultPageSize={this.state.defaultPageSize} pageNumber={this.state.currentPage} />\n' +
        '>       <ArticlePaging handlePageChange={this.handlePageChange} total={this.props.issues.length} defaultPageSize={this.state.defaultPageSize} />\n' +
        '>     </div>\n' +
        '>   );\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> 列表中：\n' +
        '> \n' +
        '> ```js\n' +
        '> render() {\n' +
        '>   const articlelist = [];\n' +
        '>   const issues = this.props.issues;\n' +
        '>   const currentPage = this.props.pageNumber;\n' +
        '>   const defaultPageSize = this.props.defaultPageSize;\n' +
        '>   const start = currentPage === 1 ? 0 : (currentPage - 1) * defaultPageSize;\n' +
        '>   const end = start + defaultPageSize < issues.length ? start + defaultPageSize : issues.length;\n' +
        '>   for (let i = start; i < end; i += 1) {\n' +
        '>     const item = issues[i];\n' +
        '>     articlelist.push(<ArticleItem />);\n' +
        '>   }\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> #### label\n' +
        '> 在 `Github Issues` 中，可以为一个 `issue` 添加很多个 `label`，我将这些对于博客内容有用的 `label` 分为三类，分别用不同颜色来表示。\n' +
        '> \n' +
        '> 这里说明一下， `label` 创建后会随机生成一个 `id`，虽然说 `id` 是不重复的，但是文章的类别、标签会一直在增加，当新加一个 `label` 时，程序中可能也要进行对应的修改，当作区分 `label` 的标准可能就不太合适，所以我采用颜色来区分它们。\n' +
        '> \n' +
        '> * 表示这是一篇文章的blog：只有有 `blog` 的 `issue` 才能显示在页面上，过滤 `bug` 、`help` 等\n' +
        '> * 表示文章类别的：用来表示文章的类别，比如“前端”、“摄影”等\n' +
        '> * 表示文章标签的：用来表示文章的标签，比如“JavaScript”、“React”等\n' +
        '> \n' +
        '> 即使有新的 `label` ，也只要根据颜色区分是属于哪一类就好了。\n' +
        '> \n' +
        '> ##### 类别\n' +
        '> ![](https://camo.githubusercontent.com/8d0463b2522519ac0c3c18b7bb211d6c13cda7fb/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545372542312542422545352538382541422e676966)\n' +
        '> \n' +
        '> 在这里的思路主要就是：遍历所有 `issues`，然后再遍历每个 `issue`的 `labels`，找出属于类别的 `label`，然后计数。\n' +
        '> \n' +
        '> ```js\n' +
        '> const categoryList = [];\n' +
        '> const categoryHash = {};\n' +
        '> for (let i = 0; i < issues.length; i += 1) {\n' +
        '>   const labels = issues[i].labels;\n' +
        '>   for (let j = 0; j < labels.length; j += 1) {\n' +
        '>     if (labels[j].color === COLOR_LABEL_CATEGORY) {\n' +
        '>       const category = labels[j].name;\n' +
        '>       if (categoryHash[category] === undefined) {\n' +
        '>         categoryHash[category] = true;\n' +
        '>         const categoryTemp = { category, sum: 1 };\n' +
        '>         categoryList.push(categoryTemp);\n' +
        '>       } else {\n' +
        '>         for (let k = 0; k < categoryList.length; k += 1) {\n' +
        '>           if (categoryList[k].category === category) {\n' +
        '>             categoryList[k].sum += 1;\n' +
        '>           }\n' +
        '>         }\n' +
        '>       }\n' +
        '>     }\n' +
        '>   }\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> 这样实现得要经历三次循环，复杂度有点高，感觉有点蠢，有待改进，如果有更好的方法，请多多指教~\n' +
        '> \n' +
        '> ##### 标签\n' +
        '> ![](https://camo.githubusercontent.com/a7e46f965692e5fa2e0de686fe107188af774388/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545362541302538372545372541442542452e676966)\n' +
        '> \n' +
        '> 这里的思路和类别的思路基本一样，只不过不同的显示方式而已。\n' +
        '> \n' +
        '> 本来这里是想通过字体大小来体现每个标签的权重，后来觉得可能对于我来说，暂时只有那几个标签会很频繁，其它标签可能会很少，用字体大小来区分就没有什么意义，还是改成排序的方式。\n' +
        '> \n' +
        '> ### 文章页\n' +
        '> ![](https://camo.githubusercontent.com/c22bf0976203e13e011e48331af14a6ffdd4d841/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545362539362538372545372541422541302545392541312542352e676966)\n' +
        '> \n' +
        '> 文章页主要分为两部分：\n' +
        '> \n' +
        '> * 文章内容区域：显示文章内容，显示在页面的主体区域\n' +
        '> * 章节目录：文章的章节目录，显示在文章的右侧区域\n' +
        '> \n' +
        '> #### 文章内容\n' +
        '> 有两种方式获取文章具体内容：\n' +
        '> \n' +
        '> * 从之前已经请求过的数组中去遍历查找所需的文章内容\n' +
        '> * 通过 `issue number` 重新发一次请求直接获取内容\n' +
        '> \n' +
        '> 最后我选择了后者。\n' +
        '> \n' +
        '> 文章是用 `markdown` 语法写的，所以要先转成 `html` 然后插入页面中，这里用了一个 `React` 不提倡的属性：`dangerouslySetInnerHTML`。\n' +
        '> \n' +
        '> 除了渲染`markdown`，我们还得对文章中的代码进行高亮显示，还有就是定制文章中不同标签的样式。\n' +
        '> \n' +
        '> #### 章节目录\n' +
        '> 首先，这里有一个 `issue`，希望大家可以给一些建议~\n' +
        '> \n' +
        '> 文章内容是通过 `markdown` 渲染后插入 `dom` 中的，由于 `React` 不建议通过 `document.getElementById` 的形式获取 `dom` 元素，所以只能想办法通过字符串匹配的方式获取文章的各个章节标题。\n' +
        '> \n' +
        '> 由于我不太熟悉正则表达式，曾经还在sf上咨询过，就采用了其中一个答案：\n' +
        '> \n' +
        '> ```js\n' +
        '> const issues = content;\n' +
        '> const menu = [];\n' +
        '> const patt = /(#+)\\s+?(.+)/g;\n' +
        '> let result = null;\n' +
        '> while ((result = patt.exec(issues))) {\n' +
        '>   menu.push({ level: result[1].length, title: result[2] });\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> 这样可以获取到所有的 `#` 的字符串，也就是 `markdown` 中的标题， `result[1].length` 表示有几个 `#`，其实就是几级标题的意思，`title` 就是标题内容了。\n' +
        '> \n' +
        '> 这里还有一个问题，本来通过 `<a target="" />` 的方式可以实现点击跳转，但是现在渲染出来的 `html` 中对于每一个标题没有独一无二的标识。。。\n' +
        '> \n' +
        '> ### 归档页\n' +
        '> 按年份归档：\n' +
        '> \n' +
        '> ![](https://camo.githubusercontent.com/c4e7790b42c333d8adffa06a3ee7932dd4e57eab/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c65254535254244253932254536254131254133312e706e67)\n' +
        '> \n' +
        '> 按类别归档：\n' +
        '> \n' +
        '> ![](https://camo.githubusercontent.com/7e7ac3c308a6cb80d4d40477518a24e1fe638144/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545352542442539322545362541312541332e706e67)\n' +
        '> \n' +
        '> 按标签归档：\n' +
        '> \n' +
        '> ![](https://camo.githubusercontent.com/c6e30b6ac882c2e0f8f3f11c98d6355fceb9f3ab/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c65254535254244253932254536254131254133322e706e67)\n' +
        '> \n' +
        '> ## 问题\n' +
        '> 基本功能是已经基本实现了，现在还存在着以下几个问题，也算是一个 `TodoList` 吧\n' +
        '> \n' +
        '> * 评论功能。拟利用 `Github Issues API` 实现评论，得实现 `Github` 授权登录\n' +
        '> * 回到顶部。拟利用 `antd` 的组件，但是 `state` 中 `visibility` 一直是 `false`\n' +
        '> * 首页渲染。现在打包完的js文件还是太大了，导致首页渲染太慢，这个是接下来工作的重点，也了解过关于这方面的优化：\n' +
        '>   \n' +
        '>   * `webpack` 按需加载。这可能是目前最方便的方式\n' +
        '>   * 服务端渲染。这就麻烦了，但是好处也多，不仅解决渲染问题，还有利于SEO，所以也是 `todo` 之一\n' +
        '> * 响应式。现在的样式都是在PC端的，还未适配移动端。\n' +
        '> * 代码混乱，逻辑不对。这是我自己的问题，需要再修炼。\n' +
        '\n' +
        '\n' +
        '\n' +
        '> 学习 React 的过程中实现了一个个人主页，没有复杂的实现和操作，适合入门 ~\n' +
        '> \n' +
        '> 这个项目其实功能很简单，就是常见的主页、博客、demo、关于我等功能。\n' +
        '> \n' +
        '> 页面样式都是自己写的，黑白风格，可能有点丑。不过还是最低级的 CSS ，准备到时候重构 ~\n' +
        '> \n' +
        '> 如果有更好的方法，或者是我的想法有偏差的，欢迎大家交流指正\n' +
        '> \n' +
        '> 欢迎参观：http://axuebin.com/react-blog\n' +
        '> \n' +
        '> Github：https://github.com/axuebin/react-blog\n' +
        '> \n' +
        '> ## 预览图\n' +
        '> ### 首页\n' +
        '> ![](https://camo.githubusercontent.com/ab4d845d7abdd7fd0c66ebd2d93158bb879e8bb7/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545392541362539362545392541312542352e706e67)\n' +
        '> \n' +
        '> ### 博客页\n' +
        '> ![](https://camo.githubusercontent.com/f80b6dd1f00f849b2353d65bce096ca34f65f405/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545352538442539412545352541452541322545392541312542352e706e67)\n' +
        '> \n' +
        '> ### 文章内容页\n' +
        '> ![](https://camo.githubusercontent.com/cd2410d2f149203b3fa85cbf76a49aafa4c070d6/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545362539362538372545372541422541302545352538362538352545352541452542392e706e67)\n' +
        '> \n' +
        '> ### Demo页\n' +
        '> ![](https://camo.githubusercontent.com/492fb6e2e1e0cd001fe8f59064b944cbaa465225/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c6564656d6f2545392541312542352e706e67)\n' +
        '> \n' +
        '> ## 关键技术\n' +
        '> * ES6：项目中用到 ES6 的语法，在写的过程中尽量使用，可能有的地方没想到\n' +
        '> * React\n' +
        '> * React-Router：前端路由\n' +
        '> * React-Redux：状态管理\n' +
        '> * webpack：打包\n' +
        '> * marked：Markdown渲染\n' +
        '> * highlight.js：代码高亮\n' +
        '> * fetch：异步请求数据\n' +
        '> * eslint：代码检查\n' +
        '> * antd：部分组件懒得自己写。。\n' +
        '> \n' +
        '> ## 准备工作\n' +
        '> 由于不是使用 React 脚手架生成的项目，所以每个东西都是自己手动配置的。。。\n' +
        '> \n' +
        '> ### 模块打包器\n' +
        '> 打包用的是 `webpack 2.6.1`，准备入坑 `webpack 3` 。\n' +
        '> \n' +
        '> 官方文档：https://webpack.js.org/\n' +
        '> \n' +
        '> 中文文档：https://doc.webpack-china.org/\n' +
        '> \n' +
        '> 对于 `webpack` 的配置还不是太熟，就简单的配置了一下可供项目启动：\n' +
        '> \n' +
        '> ```js\n' +
        '> var webpack = require(\'webpack\');\n' +
        '> var path = require(\'path\');\n' +
        '> \n' +
        '> module.exports = {\n' +
        '>   context: __dirname + \'/src\',\n' +
        '>   entry: "./js/index.js",\n' +
        '>   module: {\n' +
        '>     loaders: [\n' +
        '>       {\n' +
        '>         test: /\\.js?$/,\n' +
        '>         exclude: /(node_modules)/,\n' +
        '>         loader: \'babel-loader\',\n' +
        '>         query: {\n' +
        '>           presets: [\'react\', \'es2015\']\n' +
        '>         }\n' +
        '>       }, {\n' +
        '>         test: /\\.css$/,\n' +
        '>         loader: \'style-loader!css-loader\'\n' +
        '>       }, {\n' +
        '>         test: /\\.js$/,\n' +
        '>         exclude: /(node_modules)/,\n' +
        '>         loader: \'eslint-loader\'\n' +
        '>       }, {\n' +
        '>         test: /\\.json$/,\n' +
        '>         loader: \'json-loader\'\n' +
        '>       }\n' +
        '>     ]\n' +
        '>   },\n' +
        '>   output: {\n' +
        '>     path: __dirname + "/src/",\n' +
        '>     filename: "bundle.js"\n' +
        '>   }\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> `webpack` 有几个重要的属性：`entry`、`module`、`output`、`plugins`，在这里我还没使用到插件，所以没有配置 `plugins` 。\n' +
        '> \n' +
        '> `module` 中的 `loaders`：\n' +
        '> \n' +
        '> * babel-loader：将代码转换成es5代码\n' +
        '> * css-loader：处理css中路径引用等问题\n' +
        '> * style-loader：动态把样式写入css\n' +
        '> * eslin-loader：使用eslint\n' +
        '> \n' +
        '> ### 包管理\n' +
        '> 包管理现在使用的还是 `NPM` 。\n' +
        '> \n' +
        '> 官方文档：https://docs.npmjs.com/\n' +
        '> \n' +
        '> 1. npm init\n' +
        '> 2. npm install\n' +
        '> 3. npm uninstall\n' +
        '> \n' +
        '> 关于`npm`，可能还需要了解 `dependencies` 和 `devDependencies` 的区别，我是这样简单理解的：\n' +
        '> \n' +
        '> * dependencies：项目跑起来后需要使用到的模块\n' +
        '> * devDependencies：开发的时候需要用的模块，但是项目跑起来后就不需要了\n' +
        '> \n' +
        '> ### 代码检查\n' +
        '> 项目使用现在比较流行的 `ESLint` 作为代码检查工具，并使用 `Airbnb` 的检查规则。\n' +
        '> \n' +
        '> ESLint：https://github.com/eslint/eslint\n' +
        '> \n' +
        '> eslint-config-airbnb：https://www.npmjs.com/package/eslint-config-airbnb\n' +
        '> \n' +
        '> 在 `package.json` 中可以看到，关于 `ESLint` 的包就是放在 `devDependencies` 底下的，因为它只是在开发的时候会使用到。\n' +
        '> \n' +
        '> #### 使用\n' +
        '> * 在 `webpack` 配置中加载 `eslint-loader`：\n' +
        '> \n' +
        '> ```js\n' +
        '> module: {\n' +
        '>   loaders: [\n' +
        '>       {\n' +
        '>         test: /\\.js$/,\n' +
        '>         exclude: /(node_modules)/,\n' +
        '>         loader: \'eslint-loader\'\n' +
        '>       }\n' +
        '>     ]\n' +
        '>   }\n' +
        '> ```\n' +
        '> \n' +
        '> * 创建 `.elintrc`文件：\n' +
        '> \n' +
        '> ```js\n' +
        '> {\n' +
        '>   "extends": "airbnb",\n' +
        '>   "env":{\n' +
        '>     "browser": true\n' +
        '>   },\n' +
        '>   "rules":{}\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> 然后在运行 `webpack` 的时候，就会执行代码检查啦，看着一堆的 `warning` 、`error` 是不是很爽~\n' +
        '> \n' +
        '> 这里有常见的ESLint规则：http://eslint.cn/docs/rules/\n' +
        '> \n' +
        '> ### 数据源\n' +
        '> 由于是为了练习 `React`，暂时就只考虑搭建一个静态页面，而且现在越来越多的大牛喜欢用 `Github Issues` 来写博客，也可以更好的地提供评论功能，所以我也想试试用 `Github Issues` 来作为博客的数据源。\n' +
        '> \n' +
        '> API在这：https://developer.github.com/v3/issues/\n' +
        '> \n' +
        '> 我也没看完全部的API，就看了看怎么获取 `Issues` 列表。。\n' +
        '> \n' +
        '> ```js\n' +
        '> https://api.github.com/repos/axuebin/react-blog/issues?creator=axuebin&labels=blog\n' +
        '> ```\n' +
        '> \n' +
        '> 通过控制参数 `creator` 和 `labels`，可以筛选出作为展示的 `Issues`。它会返回一个带有 `issue` 格式对象的数组。每一个 `issue` 有很多属性，我们可能不需要那么多，先了解了解底下这几种：\n' +
        '> \n' +
        '> ```js\n' +
        '> // 为了方便，我把注释写在json中了。。\n' +
        '> [{\n' +
        '>   "url": ,  // issue 的 url\n' +
        '>   "id": ,  // issue id ， 是一个随机生成的不重复的数字串 \n' +
        '>   "number": ,  // issue number ， 根据创建 issue 的顺序从1开始累加\n' +
        '>   "title": ,  // issue 的标题\n' +
        '>   "labels": [], // issue 的所有 label，它是一个数组\n' +
        '>   "created_at": , // 创建 issue 的时间\n' +
        '>   "updated_at": , // 最后修改 issue 的时间\n' +
        '>   "body": , // issue 的内容\n' +
        '> }]\n' +
        '> ```\n' +
        '> \n' +
        '> #### 异步请求数据\n' +
        '> 项目中使用的异步请求数据的方法时 `fetch`。\n' +
        '> \n' +
        '> 关于 `fetch` ：https://segmentfault.com/a/1190000003810652\n' +
        '> \n' +
        '> 使用起来很简单：\n' +
        '> \n' +
        '> ```js\n' +
        '> fetch(url).then(response => response.json())\n' +
        '>       .then(json => console.log(json))\n' +
        '>       .catch(e => console.log(e));\n' +
        '> ```\n' +
        '> \n' +
        '> ### markdown 渲染\n' +
        '> 在 `Github` 上查找关于如何在 `React` 实现 `markdown` 的渲染，查到了这两种库：\n' +
        '> \n' +
        '> * react-markdown：https://github.com/rexxars/react-markdown\n' +
        '> * marked：https://github.com/chjj/marked\n' +
        '> \n' +
        '> 使用起来都很简单。\n' +
        '> \n' +
        '> 如果是 `react-markdown`,只需要这样做：\n' +
        '> \n' +
        '> ```js\n' +
        '> import ReactMarkdown from \'react-markdown\';\n' +
        '> \n' +
        '> const input = \'# This is a header\\n\\nAnd this is a paragraph\';\n' +
        '> ReactDOM.render(\n' +
        '>     <ReactMarkdown source={input} />,\n' +
        '>     document.getElementById(\'container\')\n' +
        '> );\n' +
        '> ```\n' +
        '> \n' +
        '> 如果是`marked`，这样做：\n' +
        '> \n' +
        '> ```js\n' +
        '> import marked from \'marked\';\n' +
        '> \n' +
        '> const input = \'# This is a header\\n\\nAnd this is a paragraph\';\n' +
        '> const output = marked(input);\n' +
        '> ```\n' +
        '> \n' +
        '> 这里有点不太一样，我们获取到了一个字符串 `output`，注意，是一个字符串，所以我们得将它插入到 `dom`中，在 `React` 中，我们可以这样做：\n' +
        '> \n' +
        '> ```\n' +
        '> <div dangerouslySetInnerHTML={{ __html: output }} />\n' +
        '> ```\n' +
        '> \n' +
        '> 由于我们的项目是基于 `React` 的，所以想着用 `react-markdown`会更好，而且由于安全问题 `React` 也不提倡直接往 `dom` 里插入字符串，然而在使用过程中发现，`react-markdown` 对表格的支持不友好，所以只好弃用，改用 `marked`。\n' +
        '> \n' +
        '> ### 代码高亮\n' +
        '> 代码高亮用的是`highlight.js`：https://github.com/isagalaev/highlight.js\n' +
        '> \n' +
        '> 它和`marked`可以无缝衔接~\n' +
        '> \n' +
        '> 只需要这样既可：\n' +
        '> \n' +
        '> ```js\n' +
        '> import hljs from \'highlight.js\';\n' +
        '> \n' +
        '> marked.setOptions({\n' +
        '>   highlight: code => hljs.highlightAuto(code).value,\n' +
        '> });\n' +
        '> ```\n' +
        '> \n' +
        '> `highlight.js`是支持多种代码配色风格的，可以在`css`文件中进行切换：\n' +
        '> \n' +
        '> ```css\n' +
        '> @import \'~highlight.js/styles/atom-one-dark.css\';\n' +
        '> ```\n' +
        '> \n' +
        '> 在这可以看到每种语言的高亮效果和配色风格：https://highlightjs.org/\n' +
        '> \n' +
        '> ## React\n' +
        '> ### state 和 props 是什么\n' +
        '> 可以看之前的一篇文章：#8\n' +
        '> \n' +
        '> ### 关于React组件的生命周期\n' +
        '> 可以看之前的一篇文章：#9\n' +
        '> \n' +
        '> ## 前端路由\n' +
        '> 项目中前端路由用的是 `React-Router V4`。\n' +
        '> \n' +
        '> 官方文档：https://reacttraining.com/react-router/web/guides/quick-start\n' +
        '> \n' +
        '> 中文文档：http://reacttraining.cn/\n' +
        '> \n' +
        '> ### 基本使用\n' +
        '> ```js\n' +
        '> <Link to="/blog">Blog</Link>\n' +
        '> ```\n' +
        '> \n' +
        '> ```js\n' +
        '> <Router>\n' +
        '>   <Route exact path="/" component={Home} />\n' +
        '>   <Route path="/blog" component={Blog} />\n' +
        '>   <Route path="/demo" component={Demo} />\n' +
        '> </Router>\n' +
        '> ```\n' +
        '> \n' +
        '> 注意：一定要在根目录的 `Route` 中声明 `exact`，要不然点击任何链接都无法跳转。\n' +
        '> \n' +
        '> ### 2级目录跳转\n' +
        '> 比如我现在要在博客页面上点击跳转，此时的 `url` 是 `localhost:8080/blog`,需要变成 `localhost:8080/blog/article`，可以这样做：\n' +
        '> \n' +
        '> ```js\n' +
        '> <Route path={`${this.props.match.url}/article/:number`} component={Article} />\n' +
        '> ```\n' +
        '> \n' +
        '> 这样就可以跳转到 `localhost:8080/blog/article` 了，而且还传递了一个 `number` 参数，在 `article` 中可以通过 `this.props.params.number`获取。\n' +
        '> \n' +
        '> ### HashRouter\n' +
        '> 当我把项目托管到 `Github Page` 后，出现了这样一个问题。\n' +
        '> \n' +
        '> > 刷新页面出现 `Cannot GET /` 提示，路由未生效。\n' +
        '> \n' +
        '> 通过了解，知道了原因是这样，并且可以解决：\n' +
        '> \n' +
        '> * 由于刷新之后，会根据URL对服务器发送请求，而不是处理路由，导致出现 `Cannot GET /` 错误。\n' +
        '> * 通过修改 `<Router>` → `<HashRouter>` 。\n' +
        '> * `<HashRouter>` 借助URL上的哈希值（hash）来实现路由。可以在不需要全屏刷新的情况下，达到切换页面的目的。\n' +
        '> \n' +
        '> ### 路由跳转后不会自动回到顶部\n' +
        '> 当前一个页面滚动到一定区域后，点击跳转后，页面虽然跳转了，但是会停留在滚动的区域，不会自动回到页面顶部。\n' +
        '> \n' +
        '> 可以通过这样来解决：\n' +
        '> \n' +
        '> ```js\n' +
        '> componentDidMount() {\n' +
        '>     this.node.scrollIntoView();\n' +
        '> }\n' +
        '> \n' +
        '> render() {\n' +
        '>   return (\n' +
        '>     <div ref={node => this.node = node} ></div>\n' +
        '>   );\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> ## 状态管理\n' +
        '> 项目中多次需要用到从 `Github Issues` 请求来的数据，因为之前就知道 `Redux` 这个东西的存在，虽然有点大材小用，为了学习还是将它用于项目的状态管理，只需要请求一次数据即可。\n' +
        '> \n' +
        '> 官方文档：http://redux.js.org/\n' +
        '> \n' +
        '> 中文文档：http://cn.redux.js.org/\n' +
        '> \n' +
        '> 简单的来说，每一次的修改状态都需要触发 `action` ，然而其实项目中我现在还没用到修改数据2333。。。\n' +
        '> \n' +
        '> 关于状态管理这一块，由于还不是太了解，就不误人子弟了~\n' +
        '> \n' +
        '> ## 主要组件\n' +
        '> React是基于组件构建的，所以在搭建页面的开始，我们要先考虑一下我们需要一些什么样的组件，这些组件之间有什么关系，哪些组件是可以复用的等等等。\n' +
        '> \n' +
        '> ### 首页\n' +
        '> ![](https://camo.githubusercontent.com/c56d97868a4502bca2878b71d6b56fe2cd943f69/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545392541362539362545392541312542352e676966)\n' +
        '> \n' +
        '> 可以看到，我主要将首页分成了四个部分：\n' +
        '> \n' +
        '> * header：网站标题，副标题，导航栏\n' +
        '> * banner：about me ~，准备用自己的照片换个背景，但是还没有合适的照片\n' +
        '> * card area：暂时是三个卡片\n' +
        '>   \n' +
        '>   * blog card：最近的几篇博文\n' +
        '>   * demo card：几个小demo类别\n' +
        '>   * me card：算是我放飞自我的地方吧\n' +
        '> * footer：版权信息、备案信息、浏览量\n' +
        '> \n' +
        '> ### 博客页\n' +
        '> ![](https://camo.githubusercontent.com/e020a7d8a7d872edd7b55bd6319583935223a7d7/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545352538442539412545352541452541322545392541312542352e676966)\n' +
        '> \n' +
        '> 博客页就是很中规中矩的一个页面吧，这部分是整个项目中代码量最多的部分，包括以下几部分：\n' +
        '> \n' +
        '> * 文章列表组件\n' +
        '> * 翻页组件\n' +
        '> * 归档按钮组件\n' +
        '> * 类别组件\n' +
        '> * 标签组件\n' +
        '> \n' +
        '> #### 文章列表\n' +
        '> 文章列表其实就是一个 `list`，里面有一个个的 `item`:\n' +
        '> \n' +
        '> ```\n' +
        '> <div class="archive-list">\n' +
        '>   <div class="blog-article-item">文章1</div>\n' +
        '>   <div class="blog-article-item">文章2</div>\n' +
        '> <div>\n' +
        '> ```\n' +
        '> \n' +
        '> 对于每一个 `item`，其实是这样的：\n' +
        '> \n' +
        '> ![](https://camo.githubusercontent.com/3637601cf00ee937279bd7e6c139731f5df6b0d0/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545362539362538372545372541422541306974656d2e706e67)\n' +
        '> \n' +
        '> 一个文章item组件它可能需要包括：\n' +
        '> \n' +
        '> * 文章标题\n' +
        '> * 文章发布的时间、类别、标签等\n' +
        '> * 文章摘要\n' +
        '> * ...\n' +
        '> \n' +
        '> 如果用 `DOM` 来描述，它应该是这样的：\n' +
        '> \n' +
        '> ```\n' +
        '> <div class="blog-article-item">\n' +
        '>   <div class="blog-article-item-title">文章标题</div>\n' +
        '>   <div class="blog-article-item-time">时间</div>\n' +
        '>   <div class="blog-article-item-label">类别</div>\n' +
        '>   <div class="blog-article-item-label">标签</div>\n' +
        '>   <div class="blog-article-item-desc">摘要</div>\n' +
        '> </div>\n' +
        '> ```\n' +
        '> \n' +
        '> 所以，我们可以有很多个组件：\n' +
        '> \n' +
        '> * 文章列表组件 `<ArticleList />`\n' +
        '> * 文章item组件 `<ArticleItem />`\n' +
        '> * 类别标签组件 `<ArticleLabel />`\n' +
        '> \n' +
        '> 它们可能是这样一个关系：\n' +
        '> \n' +
        '> ```js\n' +
        '> <ArticleList>\n' +
        '>   <ArticleItem>\n' +
        '>     <ArticleTitle />\n' +
        '>     <ArticleTime />\n' +
        '>     <ArticleLabel />\n' +
        '>     <ArticleDesc />\n' +
        '>   </ArticleItem>\n' +
        '>   <ArticleItem></ArticleItem>\n' +
        '>   <ArticleItem></ArticleItem>\n' +
        '> </ArticleList>\n' +
        '> ```\n' +
        '> \n' +
        '> #### 分页\n' +
        '> 对于分页功能，传统的实现方法是在后端完成分页然后分批返回到前端的，比如可能会返回一段这样的数据：\n' +
        '> \n' +
        '> ```js\n' +
        '> {\n' +
        '>   total:500,\n' +
        '>   page:1,\n' +
        '>   data:[]\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> 也就是后端会返回分好页的数据，含有表示总数据量的`total`、当前页数的`page`，以及属于该页的数据`data`。\n' +
        '> \n' +
        '> 然而，我这个页面只是个静态页面，数据是放在Github Issues上的通过API获取的。（Github Issues的分页貌似不能自定义数量...），所以没法直接返回分好的数据，所以只能在前端强行分页~\n' +
        '> \n' +
        '> 分页功能这一块我偷懒了...用的是 `antd` 的翻页组件 `<Pagination />`。\n' +
        '> \n' +
        '> 官方文档：https://ant.design/components/pagination-cn/\n' +
        '> \n' +
        '> 文档很清晰，使用起来也特别简单。\n' +
        '> \n' +
        '> 前端渲染的逻辑（有点蠢）：将数据存放到一个数组中，根据当前页数和每页显示条数来计算该显示的索引值，取出相应的数据即可。\n' +
        '> \n' +
        '> 翻页组件中：\n' +
        '> \n' +
        '> ```js\n' +
        '> constructor() {\n' +
        '>   super();\n' +
        '>   this.onChangePage = this.onChangePage.bind(this);\n' +
        '> }\n' +
        '> \n' +
        '> onChangePage(pageNumber) {\n' +
        '>   this.props.handlePageChange(pageNumber);\n' +
        '> }\n' +
        '> \n' +
        '> render() {\n' +
        '>   return (\n' +
        '>     <div className="blog-article-paging">\n' +
        '>       <Pagination onChange={this.onChangePage} defaultPageSize={this.props.defaultPageSize} total={this.props.total} />\n' +
        '>     </div>\n' +
        '>   );\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> 当页数发生改变后，会触发从父组件传进 `<ArticlePaging />` 的方法 `handlePageChange`，从而将页数传递到父组件中，然后传递到 `<ArticleList />` 中。\n' +
        '> \n' +
        '> 父组件中：\n' +
        '> \n' +
        '> ```js\n' +
        '> handlePageChange(pageNumber) {\n' +
        '>   this.setState({ currentPage: pageNumber });\n' +
        '> }\n' +
        '> \n' +
        '> render() {\n' +
        '>   return (\n' +
        '>     <div className="archive-list-area">\n' +
        '>       <ArticleList issues={this.props.issues} defaultPageSize={this.state.defaultPageSize} pageNumber={this.state.currentPage} />\n' +
        '>       <ArticlePaging handlePageChange={this.handlePageChange} total={this.props.issues.length} defaultPageSize={this.state.defaultPageSize} />\n' +
        '>     </div>\n' +
        '>   );\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> 列表中：\n' +
        '> \n' +
        '> ```js\n' +
        '> render() {\n' +
        '>   const articlelist = [];\n' +
        '>   const issues = this.props.issues;\n' +
        '>   const currentPage = this.props.pageNumber;\n' +
        '>   const defaultPageSize = this.props.defaultPageSize;\n' +
        '>   const start = currentPage === 1 ? 0 : (currentPage - 1) * defaultPageSize;\n' +
        '>   const end = start + defaultPageSize < issues.length ? start + defaultPageSize : issues.length;\n' +
        '>   for (let i = start; i < end; i += 1) {\n' +
        '>     const item = issues[i];\n' +
        '>     articlelist.push(<ArticleItem />);\n' +
        '>   }\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> #### label\n' +
        '> 在 `Github Issues` 中，可以为一个 `issue` 添加很多个 `label`，我将这些对于博客内容有用的 `label` 分为三类，分别用不同颜色来表示。\n' +
        '> \n' +
        '> 这里说明一下， `label` 创建后会随机生成一个 `id`，虽然说 `id` 是不重复的，但是文章的类别、标签会一直在增加，当新加一个 `label` 时，程序中可能也要进行对应的修改，当作区分 `label` 的标准可能就不太合适，所以我采用颜色来区分它们。\n' +
        '> \n' +
        '> * 表示这是一篇文章的blog：只有有 `blog` 的 `issue` 才能显示在页面上，过滤 `bug` 、`help` 等\n' +
        '> * 表示文章类别的：用来表示文章的类别，比如“前端”、“摄影”等\n' +
        '> * 表示文章标签的：用来表示文章的标签，比如“JavaScript”、“React”等\n' +
        '> \n' +
        '> 即使有新的 `label` ，也只要根据颜色区分是属于哪一类就好了。\n' +
        '> \n' +
        '> ##### 类别\n' +
        '> ![](https://camo.githubusercontent.com/8d0463b2522519ac0c3c18b7bb211d6c13cda7fb/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545372542312542422545352538382541422e676966)\n' +
        '> \n' +
        '> 在这里的思路主要就是：遍历所有 `issues`，然后再遍历每个 `issue`的 `labels`，找出属于类别的 `label`，然后计数。\n' +
        '> \n' +
        '> ```js\n' +
        '> const categoryList = [];\n' +
        '> const categoryHash = {};\n' +
        '> for (let i = 0; i < issues.length; i += 1) {\n' +
        '>   const labels = issues[i].labels;\n' +
        '>   for (let j = 0; j < labels.length; j += 1) {\n' +
        '>     if (labels[j].color === COLOR_LABEL_CATEGORY) {\n' +
        '>       const category = labels[j].name;\n' +
        '>       if (categoryHash[category] === undefined) {\n' +
        '>         categoryHash[category] = true;\n' +
        '>         const categoryTemp = { category, sum: 1 };\n' +
        '>         categoryList.push(categoryTemp);\n' +
        '>       } else {\n' +
        '>         for (let k = 0; k < categoryList.length; k += 1) {\n' +
        '>           if (categoryList[k].category === category) {\n' +
        '>             categoryList[k].sum += 1;\n' +
        '>           }\n' +
        '>         }\n' +
        '>       }\n' +
        '>     }\n' +
        '>   }\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> 这样实现得要经历三次循环，复杂度有点高，感觉有点蠢，有待改进，如果有更好的方法，请多多指教~\n' +
        '> \n' +
        '> ##### 标签\n' +
        '> ![](https://camo.githubusercontent.com/a7e46f965692e5fa2e0de686fe107188af774388/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545362541302538372545372541442542452e676966)\n' +
        '> \n' +
        '> 这里的思路和类别的思路基本一样，只不过不同的显示方式而已。\n' +
        '> \n' +
        '> 本来这里是想通过字体大小来体现每个标签的权重，后来觉得可能对于我来说，暂时只有那几个标签会很频繁，其它标签可能会很少，用字体大小来区分就没有什么意义，还是改成排序的方式。\n' +
        '> \n' +
        '> ### 文章页\n' +
        '> ![](https://camo.githubusercontent.com/c22bf0976203e13e011e48331af14a6ffdd4d841/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545362539362538372545372541422541302545392541312542352e676966)\n' +
        '> \n' +
        '> 文章页主要分为两部分：\n' +
        '> \n' +
        '> * 文章内容区域：显示文章内容，显示在页面的主体区域\n' +
        '> * 章节目录：文章的章节目录，显示在文章的右侧区域\n' +
        '> \n' +
        '> #### 文章内容\n' +
        '> 有两种方式获取文章具体内容：\n' +
        '> \n' +
        '> * 从之前已经请求过的数组中去遍历查找所需的文章内容\n' +
        '> * 通过 `issue number` 重新发一次请求直接获取内容\n' +
        '> \n' +
        '> 最后我选择了后者。\n' +
        '> \n' +
        '> 文章是用 `markdown` 语法写的，所以要先转成 `html` 然后插入页面中，这里用了一个 `React` 不提倡的属性：`dangerouslySetInnerHTML`。\n' +
        '> \n' +
        '> 除了渲染`markdown`，我们还得对文章中的代码进行高亮显示，还有就是定制文章中不同标签的样式。\n' +
        '> \n' +
        '> #### 章节目录\n' +
        '> 首先，这里有一个 `issue`，希望大家可以给一些建议~\n' +
        '> \n' +
        '> 文章内容是通过 `markdown` 渲染后插入 `dom` 中的，由于 `React` 不建议通过 `document.getElementById` 的形式获取 `dom` 元素，所以只能想办法通过字符串匹配的方式获取文章的各个章节标题。\n' +
        '> \n' +
        '> 由于我不太熟悉正则表达式，曾经还在sf上咨询过，就采用了其中一个答案：\n' +
        '> \n' +
        '> ```js\n' +
        '> const issues = content;\n' +
        '> const menu = [];\n' +
        '> const patt = /(#+)\\s+?(.+)/g;\n' +
        '> let result = null;\n' +
        '> while ((result = patt.exec(issues))) {\n' +
        '>   menu.push({ level: result[1].length, title: result[2] });\n' +
        '> }\n' +
        '> ```\n' +
        '> \n' +
        '> 这样可以获取到所有的 `#` 的字符串，也就是 `markdown` 中的标题， `result[1].length` 表示有几个 `#`，其实就是几级标题的意思，`title` 就是标题内容了。\n' +
        '> \n' +
        '> 这里还有一个问题，本来通过 `<a target="" />` 的方式可以实现点击跳转，但是现在渲染出来的 `html` 中对于每一个标题没有独一无二的标识。。。\n' +
        '> \n' +
        '> ### 归档页\n' +
        '> 按年份归档：\n' +
        '> \n' +
        '> ![](https://camo.githubusercontent.com/c4e7790b42c333d8adffa06a3ee7932dd4e57eab/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c65254535254244253932254536254131254133312e706e67)\n' +
        '> \n' +
        '> 按类别归档：\n' +
        '> \n' +
        '> ![](https://camo.githubusercontent.com/7e7ac3c308a6cb80d4d40477518a24e1fe638144/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c652545352542442539322545362541312541332e706e67)\n' +
        '> \n' +
        '> 按标签归档：\n' +
        '> \n' +
        '> ![](https://camo.githubusercontent.com/c6e30b6ac882c2e0f8f3f11c98d6355fceb9f3ab/687474703a2f2f6f6d75666a723562762e626b742e636c6f7564646e2e636f6d2f61727469636c65254535254244253932254536254131254133322e706e67)\n' +
        '> \n' +
        '> ## 问题\n' +
        '> 基本功能是已经基本实现了，现在还存在着以下几个问题，也算是一个 `TodoList` 吧\n' +
        '> \n' +
        '> * 评论功能。拟利用 `Github Issues API` 实现评论，得实现 `Github` 授权登录\n' +
        '> * 回到顶部。拟利用 `antd` 的组件，但是 `state` 中 `visibility` 一直是 `false`\n' +
        '> * 首页渲染。现在打包完的js文件还是太大了，导致首页渲染太慢，这个是接下来工作的重点，也了解过关于这方面的优化：\n' +
        '>   \n' +
        '>   * `webpack` 按需加载。这可能是目前最方便的方式\n' +
        '>   * 服务端渲染。这就麻烦了，但是好处也多，不仅解决渲染问题，还有利于SEO，所以也是 `todo` 之一\n' +
        '> * 响应式。现在的样式都是在PC端的，还未适配移动端。\n' +
        '> * 代码混乱，逻辑不对。这是我自己的问题，需要再修炼。\n' +
        '\n',
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

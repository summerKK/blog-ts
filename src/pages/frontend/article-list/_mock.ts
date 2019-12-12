import { Request, Response } from 'express';
import { ArticleListDataItemType } from '@/pages/frontend/data';

const fakeArticles = [
  {
    id: 1,
    title: 'RSSHub Radar — 订阅一个 RSS 源不应该这么难',
    content:
      '<p><img src="https://diygod.me/images/rsshub-radar5.jpg" alt="" data-action="zoom"></p><blockquote><p>如果你问我，RSSHub 能否改变 RSS 的命运，我也不晓得，但我晓得，不认命，就是 RSSHub 的命。 ——《哪吒之魔童降世》</p></blockquote><p>如果你还不知道 RSS：<a href="https://diygod.me/ohmyrss/">《我有特别的 RSS 使用技巧》</a><br>如果你还不知道 RSSHub：<a href="https://sspai.com/post/47100" target="_blank" rel="noopener">《通过 RSSHub 订阅不支持 RSS 的网站》</a></p><p>首先最大的 respect 献给 RSSHub 的 <a href="https://docs.rsshub.app/#contributors" target="_blank" rel="noopener">244 名参与者</a></p><h2 id="订阅一个-RSS-源太难了"><a href="#订阅一个-RSS-源太难了" class="headerlink" title="订阅一个 RSS 源太难了"></a>订阅一个 RSS 源太难了</h2><p>首先需要网站提供了 RSS（这一前提通常就无法满足）；然后我们要随缘在页面中找到 RSS 链接；然后复制链接、打开如 Feedly Inoreader 的 RSS 服务、点击添加订阅、粘贴链接、添加</p><p>看，顺利订阅一个 RSS 源需要天时（随缘找到了 RSS）地利（网站提供了 RSS）人和（不因为订阅步骤过于麻烦而中途放弃），缺一不可</p><p>都 9102 年了，世界不应该这样</p><a id="more"></a><h2 id="解决这个问题"><a href="#解决这个问题" class="headerlink" title="解决这个问题"></a>解决这个问题</h2><p>为了解决这个问题，RSSHub Radar 诞生了</p><p><a href="https://chrome.google.com/webstore/detail/rsshub-radar/kefjpfngnndepjbopdmoebkipbgkggaa" target="_blank" rel="noopener">Chrome Web Store</a> | <a href="https://github.com/DIYgod/RSSHub-Radar" target="_blank" rel="noopener">GitHub</a></p><p>RSSHub Radar 是 RSSHub 的衍生项目，她是一个可以帮助你快速发现和订阅当前网站 RSS 和 RSSHub 的浏览器扩展</p><p><img src="/images/rsshub-radar1.jpg" alt="" data-action="zoom"></p><p>使用很简单，我们在进入一个新页面时，RSSHub Radar 会<strong>自动检测</strong>当前页面有没有 RSS 和 RSSHub 支持，检测到则会在右下角显示一个角标，如果我们想订阅当前页面的 RSS，点击扩展图标，会弹出一个列表，如图所示，列表有三项内容：<strong>当前页面上的 RSS、适用于当前页面的 RSSHub、适用于当前网站的 RSSHub</strong>，你可以选择复制链接或<strong>一键订阅</strong>到 Feedly Inoreader TinyTinyRSS</p><p><img src="/images/rsshub-radar2.jpg" alt="" data-action="zoom"></p><p>设置页允许你使用自建的 RSSHub 域名、设置快捷键、立即更新规则、选择一键订阅到 TinyTinyRSS 还是 Feedly Inoreader、选择是否开启角标提醒等</p><p><img src="/images/rsshub-radar3.jpg" alt="" data-action="zoom"></p><p>支持列表列出了当前支持的 RSSHub 规则</p><h2 id="RSSHub-Radar-是如何工作的"><a href="#RSSHub-Radar-是如何工作的" class="headerlink" title="RSSHub Radar 是如何工作的"></a>RSSHub Radar 是如何工作的</h2><p>RSSHub Radar 是开源的，你可以直接去 <a href="https://github.com/DIYgod/RSSHub-Radar" target="_blank" rel="noopener">GitHub</a> 看源码</p><p>当我们进入一个新页面时，RSSHub Radar 开始检测当前页面的 RSS 和 RSSHub</p><p><strong>当前页面自带的 RSS</strong></p><p>分析页面中的每个链接显然是不现实的，好在标准中指定了一种特殊 MIME 类型的 link 标签来指明 RSS 链接，<code>link[type="application/rss+xml"]</code> 和 <code>link[type="application/atom+xml"]</code>，RSSHub Radar 正是通过这个标签来检测页面是否有自带 RSS，具体实现在<a href="https://github.com/DIYgod/RSSHub-Radar/blob/master/src/js/content/utils.js#L14" target="_blank" rel="noopener">这里</a></p><p><strong>适用于当前页面的 RSSHub</strong></p><p>使用<a href="https://github.com/DIYgod/RSSHub/blob/master/assets/radar-rules.js" target="_blank" rel="noopener">给定规则</a>，根据当前页面的 URL 或 DOM 来获取 RSSHub 链接，规则各个字段的具体含义见<a href="https://docs.rsshub.app/joinus/#%E6%8F%90%E4%BA%A4%E6%96%B0%E7%9A%84-rsshub-radar-%E8%A7%84%E5%88%99" target="_blank" rel="noopener">文档</a>，具体实现在<a href="https://github.com/DIYgod/RSSHub-Radar/blob/master/src/js/background/utils.js#L111" target="_blank" rel="noopener">这里</a></p><p>每隔 5 个小时从 GitHub 远程更新一次规则</p><p><strong>一键订阅</strong></p><p>Feedly Inoreader TinyTinyRSS 都提供了用于订阅的接口，不同的是 Feedly 需要进入页面确认一下，而另外两个会直接订阅上</p><p>比如访问这个 URL 可以快速使用 Feedly 订阅我的博客（需要点 FOLLOW 确认）：<br><a href="https://feedly.com/i/subscription/feed/https://diygod.me/atom.xml" target="_blank" rel="noopener">https://feedly.com/i/subscription/feed/https://diygod.me/atom.xml</a></p><p>这个 URL 可以快速使用 Inoreader 订阅我的博客：<br><a href="https://www.inoreader.com/feed/https://diygod.me/atom.xml" target="_blank" rel="noopener">https://www.inoreader.com/feed/https://diygod.me/atom.xml</a></p><h2 id="参与我们"><a href="#参与我们" class="headerlink" title="参与我们"></a>参与我们</h2><p>如果你对 RSSHub 感兴趣，欢迎<a href="https://docs.rsshub.app/joinus/" target="_blank" rel="noopener">参与</a>或<a href="https://docs.rsshub.app/support/" target="_blank" rel="noopener">支持</a>我们</p><p>最后祝哪吒票房破 50 亿，还没看的一定要去看嗷！</p><p><img src="/images/rsshub-radar4.gif" alt="" data-action="zoom"></p>',
    page_view: 20106,
    article_type: '创作集',
    created_at: '2019-08-06 12:12',
  },
  {
    id: 2,
    title: '优雅地下载我的B站投币视频',
    content:
      '<style>twitter-widget{margin:0 auto!important}</style><twitter-widget class="twitter-tweet twitter-tweet-rendered" id="twitter-widget-1" style="position: static; visibility: visible; display: block; transform: rotate(0deg); max-width: 100%; width: 500px; min-width: 220px; margin-top: 10px; margin-bottom: 10px;" data-tweet-id="1131898671111450625"></twitter-widget><p>&nbsp;</p><p>下载B站视频很简单，you-get 一行命令的事，但我已经懒到命令都不想输了，如果投币之后 NAS 可以自己去下载就好了<a id="more"></a></p><h2 id="设想"><a href="#设想" class="headerlink" title="设想"></a>设想</h2><p>整个设想是这样的：投币操作 -&gt; RSS 更新 -&gt; IFTTT 触发 Webhook -&gt; 服务器下载</p><p>投币到 RSS 更新可以直接用 <a href="https://docs.rsshub.app/social-media.html#up-%E4%B8%BB%E6%8A%95%E5%B8%81%E8%A7%86%E9%A2%91" target="_blank" rel="noopener">RSSHub</a> 实现，RSS 更新到触发 Webhook 也可以直接在 IFTTT 里配置，整个多米诺骨牌就只缺少 Webhook 到下载这一块</p><h2 id="行动"><a href="#行动" class="headerlink" title="行动"></a>行动</h2><p>于是写了一个简单的小工具 —— <a href="https://github.com/DIYgod/download-webhook" target="_blank" rel="noopener">download-webhook</a>，它可以通过一个简单的 post 请求，触发服务器执行 you-get，下载视频到指定目录</p><h2 id="效果"><a href="#效果" class="headerlink" title="效果"></a>效果</h2><ol><li><p>给咬人猫投币</p><p><img src="/images/download-webhook1.jpg" alt="" data-action="zoom"></p></li><li><p>RSS 更新</p><p><img src="/images/download-webhook2.jpg" alt="" data-action="zoom"></p></li><li><p>IFTTT 触发</p><p><img src="/images/download-webhook3.jpg" alt="" data-action="zoom"></p></li><li><p>download-webhook 收到下载请求</p><p><img src="/images/download-webhook4.jpg" alt="" data-action="zoom"></p></li><li><p>下载完成</p><p><img src="/images/download-webhook5.png" alt="" data-action="zoom"></p></li></ol><h2 id="进一步"><a href="#进一步" class="headerlink" title="进一步"></a>进一步</h2><p>以上同样适用于自动下载 YouTube \\ Instagram \\ Tumblr 视频、网易云音乐歌曲等，只要 RSSHub 和 you-get 支持</p><p>另外对于图片，Webhook URL 参数直接传入图片地址也可以下载，所以也可以轻松实现自动下载 Bing 每日壁纸、甚至 Telegram 的涩图频道（这里就不做推荐了）</p>',
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
};

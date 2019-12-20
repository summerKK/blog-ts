import { Request, Response } from 'express';

const fakeArticles = [
  {
    id: 1,
    title: 'RSSHub Radar — 订阅一个 RSS 源不应该这么难',
    content:
      '# mall学习教程\n' +
      '<p>\n' +
      '<a href="#公众号"><img src="http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/badge/%E5%85%AC%E4%BC%97%E5%8F%B7-macrozheng-blue.svg" alt="公众号"></a>\n' +
      '<a href="https://github.com/macrozheng/mall"><img src="http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/badge/%E5%90%8E%E5%8F%B0%E9%A1%B9%E7%9B%AE-mall-blue.svg" alt="后台项目"></a>\n' +
      '<a href="https://github.com/macrozheng/mall-admin-web"><img src="http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/badge/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE-mall--admin--web-green.svg" alt="前端项目"></a>\n' +
      '</p>\n' +
      '\n' +
      '## 简介\n' +
      'mall学习教程，架构、业务、技术要点全方位解析。mall项目（25k+star）是一套电商系统，使用现阶段主流技术实现。\n' +
      '涵盖了SpringBoot2.1.3、MyBatis3.4.6、Elasticsearch6.2.2、RabbitMQ3.7.15、Redis3.2、Mongodb3.2、Mysql5.7等技术，采用Docker容器化部署。\n' +
      '\n' +
      '## 项目地址\n' +
      '- 后台项目：[https://github.com/macrozheng/mall](https://github.com/macrozheng/mall)\n' +
      '- 前端项目：[https://github.com/macrozheng/mall-admin-web](https://github.com/macrozheng/mall-admin-web)\n' +
      '\n' +
      '## 更好的阅读体验\n' +
      '- 文档地址：[http://www.macrozheng.com](http://www.macrozheng.com)\n' +
      '- 备用地址：[https://macrozheng.github.io/mall-learning](https://macrozheng.github.io/mall-learning)\n' +
      '\n' +
      '## 序章\n' +
      '- [mall架构及功能概览](https://juejin.im/post/5cf7c305e51d4510b71da5c5)\n' +
      '- [mall学习所需知识点（推荐资料）](https://juejin.im/post/5cf7c3aef265da1ba84a7fdc)\n' +
      '\n' +
      '## 架构篇\n' +
      '> 手把手教你搭建一个mall在使用的项目骨架\n' +
      '\n' +
      '- [mall整合SpringBoot+MyBatis搭建基本骨架](https://juejin.im/post/5cf7c4a7e51d4577790c1c50)\n' +
      '- [mall整合Swagger-UI实现在线API文档](https://juejin.im/post/5cf9035cf265da1bb47d54f8)\n' +
      '- [mall整合Redis实现缓存功能](https://juejin.im/post/5cf90e9ee51d454f6f16eba0)\n' +
      '- [mall整合SpringSecurity和JWT实现认证和授权（一）](https://juejin.im/post/5cf90fa5e51d455d6d5357d3)\n' +
      '- [mall整合SpringSecurity和JWT实现认证和授权（二）](https://juejin.im/post/5cfa0933f265da1b8f1ab2da)\n' +
      '- [mall整合SpringTask实现定时任务](https://juejin.im/post/5cfa0ea16fb9a07eaf2b8261)\n' +
      '- [mall整合Elasticsearch实现商品搜索](https://juejin.im/post/5cfba3e9f265da1b614fea60)\n' +
      '- [mall整合Mongodb实现文档操作](https://juejin.im/post/5cfba5b0f265da1bcc1933fe)\n' +
      '- [mall整合RabbitMQ实现延迟消息](https://juejin.im/post/5cff98986fb9a07ed36ea139)\n' +
      '- [mall整合OSS实现文件上传](https://juejin.im/post/5cff9944e51d4577555508a9)\n' +
      '\n' +
      '## 业务篇\n' +
      '> 全面解析mall中使用的数据库表结构\n' +
      '\n' +
      '- [mall数据库表结构概览](https://juejin.im/post/5d34684c6fb9a07ef562724b)\n' +
      '- [商品模块数据库表解析（一）](https://juejin.im/post/5d385a7e518825680e4577ee)\n' +
      '- [商品模块数据库表解析（二）](https://juejin.im/post/5d39ba2cf265da1bc23fbd26)\n' +
      '- [订单模块数据库表解析（一）](https://juejin.im/post/5d4196fef265da03bd04fa31)\n' +
      '- [订单模块数据库表解析（二）](https://juejin.im/post/5d46db2a5188255d1e013ca0)\n' +
      '- [订单模块数据库表解析（三）](https://juejin.im/post/5d497f92e51d4561e0516a9d)\n' +
      '- [营销模块数据库表解析（一）](https://juejin.im/post/5d5012856fb9a06ad45135a6)\n' +
      '- [营销模块数据库表解析（二）](https://juejin.im/post/5d555c7ae51d453b386a6302)\n' +
      '- [营销模块数据库表解析（三）](https://juejin.im/post/5d5bf6676fb9a06b0703c0c5)\n' +
      '\n' +
      '## 技术要点篇\n' +
      '> mall中一些功能的技术要点解析\n' +
      '\n' +
      '- [MyBatis Generator使用过程中踩过的一个坑](https://juejin.im/post/5d107037e51d45599e019de8)\n' +
      '- [SpringBoot应用中使用AOP记录接口访问日志](https://juejin.im/post/5d2001bb6fb9a07edf276593)\n' +
      '- [SpringBoot应用整合ELK实现日志收集](https://juejin.im/post/5d2738a2f265da1bac404299)\n' +
      '- [前后端分离项目，如何解决跨域问题](https://juejin.im/post/5d4c162351882560b9545358)\n' +
      '- [Java 8都出那么久了，Stream API了解下？](https://juejin.im/post/5d6d2016e51d453c135c5b25)\n' +
      '- [仅需四步，整合SpringSecurity+JWT实现登录认证！](https://juejin.im/post/5df0e79bf265da33dd2f52af)\n' +
      '\n' +
      '## 部署篇\n' +
      '> mall开发及生产环境的搭建\n' +
      '\n' +
      '- [mall在Windows环境下的部署](https://juejin.im/post/5d1362de51882551fe065b61)\n' +
      '- [mall在Linux环境下的部署（基于Docker容器）](https://juejin.im/post/5d1802ab6fb9a07f0a2df5ae)\n' +
      '- [mall在Linux环境下的部署（基于Docker Compose）](https://juejin.im/post/5d1c98d66fb9a07ebf4b8ad5)\n' +
      '- [mall前端项目的安装与部署](https://juejin.im/post/5d2c7c6b518825076377d7b9)\n' +
      '- [mall-swarm在Windows环境下的部署](https://juejin.im/post/5de3c1a35188256e855b6e54)\n' +
      '- [mall-swarm在Linux环境下的部署（基于Docker容器）](https://juejin.im/post/5de65bffe51d4557f71a5ec1)\n' +
      '\n' +
      '\n' +
      '## 进阶篇\n' +
      '> 一套涵盖大部分核心组件使用的Spring Cloud教程，包括Spring Cloud Alibaba及分布式事务Seata，基于Spring Cloud Greenwich及SpringBoot 2.1.7\n' +
      '\n' +
      '- [Spring Cloud 整体架构概览](https://juejin.im/post/5d764f05e51d4561fb04bfd7)\n' +
      '- [Spring Cloud Eureka：服务注册与发现](https://juejin.im/post/5d78cd53f265da03d55e8351)\n' +
      '- [Spring Cloud Ribbon：负载均衡的服务调用](https://juejin.im/post/5d7f9006f265da03951a260c)\n' +
      '- [Spring Cloud Hystrix：服务容错保护](https://juejin.im/post/5d822d27e51d45621479ad92)\n' +
      '- [Hystrix Dashboard：断路器执行监控](https://juejin.im/post/5d88cb58f265da03e4679eff)\n' +
      '- [Spring Cloud OpenFeign：基于Ribbon和Hystrix的声明式服务调用](https://juejin.im/post/5d9c85c3e51d45782c23fab6)\n' +
      '- [Spring Cloud Zuul：API网关服务](https://juejin.im/post/5d9f2dea6fb9a04e3e724067)\n' +
      '- [Spring Cloud Config：外部集中化配置管理](https://juejin.im/post/5da4709af265da5baa5b06ac)\n' +
      '- [Spring Cloud Bus：消息总线](https://juejin.im/post/5da70d1351882509615bea34)\n' +
      '- [Spring Cloud Sleuth：分布式请求链路跟踪](https://juejin.im/post/5dadb4d36fb9a04e02409a7d)\n' +
      '- [Spring Cloud Consul：服务治理与配置中心](https://juejin.im/post/5db05582f265da4d4c20180f)\n' +
      '- [Spring Cloud Gateway：新一代API网关服务](https://juejin.im/post/5db6eed6518825644076d0b6)\n' +
      '- [Spring Boot Admin：微服务应用监控](https://juejin.im/post/5db98a2d518825649c730f81)\n' +
      '- [Spring Cloud Security：Oauth2使用入门](https://juejin.im/post/5dc013bae51d456e817cec30)\n' +
      '- [Spring Cloud Security：Oauth2结合JWT使用](https://juejin.im/post/5dc2bec6f265da4d4f65bebe)\n' +
      '- [Spring Cloud Security：Oauth2实现单点登录](https://juejin.im/post/5dc95a675188256e040db43f)\n' +
      '- [Spring Cloud Alibaba：Nacos 作为注册中心和配置中心使用](https://juejin.im/post/5dcbf7bc5188250d1f5a78ea)\n' +
      '- [Spring Cloud Alibaba：Sentinel实现熔断与限流](https://juejin.im/post/5dd29bece51d4561e80f9053)\n' +
      '- [使用Seata彻底解决Spring Cloud中的分布式事务问题](https://juejin.im/post/5dd53a9d5188255d35425a08)\n' +
      '- [IDEA中创建和启动SpringBoot应用的正确姿势](https://juejin.im/post/5d8b69366fb9a04e3348b06c)\n' +
      '\n' +
      '## 参考篇\n' +
      '> mall相关技术的使用教程\n' +
      '\n' +
      '- [IDEA常用设置及推荐插件](https://juejin.im/post/5d0458085188256aa76bc678)\n' +
      '- [开发者必备Mysql命令](https://juejin.im/post/5d00fd40f265da1bb67a11b3)\n' +
      '- [开发者必备Linux命令](https://juejin.im/post/5d0253845188255e1305c741)\n' +
      '- [Linux防火墙Firewall和Iptables的使用](https://juejin.im/post/5d0253fe6fb9a07edb39420d)\n' +
      '- [Navicat实用功能：数据备份与结构同步](https://juejin.im/post/5d00fc865188255fc6384126)\n' +
      '- [开发者必备Docker命令](https://juejin.im/post/5d0781f56fb9a07f014ef6be)\n' +
      '- [使用Maven插件构建Docker镜像](https://juejin.im/post/5d08e3d26fb9a07ed8424488)\n' +
      '- [使用DockerFile为SpringBoot应用构建Docker镜像](https://juejin.im/post/5d0a25b76fb9a07ed524a438)\n' +
      '- [使用Docker Compose部署SpringBoot应用](https://juejin.im/user/5cf7c1d7f265da1bc07e28b7)\n' +
      '- [Postman：API接口调试利器](https://juejin.im/post/5d5a9032e51d4561db5e3a4a)\n' +
      '- [10分钟搭建自己的Git仓库](https://juejin.im/post/5d63d600e51d453c135c5af3)\n' +
      '- [IDEA中的Git操作，看这一篇就够了！](https://juejin.im/post/5d667fc6e51d453b5d4d8da5)\n' +
      '- [Hutool中那些常用的工具类和方法](https://juejin.im/post/5d6fb7b0e51d4561c67840de)\n' +
      '- [虚拟机安装及使用Linux，看这一篇就够了！](https://juejin.im/post/5ddfd1665188256ec024cb7c)\n' +
      '- [Nginx的这些妙用，你肯定有不知道的！](https://juejin.im/post/5dee499151882512444014eb)\n' +
      '\n' +
      '\n' +
      '## 公众号\n' +
      '\n' +
      'mall项目全套学习教程连载中，**关注公众号**第一时间获取。\n' +
      '\n' +
      '![公众号图片](http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/banner/qrcode_for_macrozheng_258.jpg)\n',
    page_view: 20106,
    article_type: '创作集',
    created_at: '2019-08-06 12:12',
  },
  {
    id: 2,
    title: '优雅地下载我的B站投币视频',
    content:
      '# mall学习教程\n' +
      '<p>\n' +
      '<a href="#公众号"><img src="http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/badge/%E5%85%AC%E4%BC%97%E5%8F%B7-macrozheng-blue.svg" alt="公众号"></a>\n' +
      '<a href="https://github.com/macrozheng/mall"><img src="http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/badge/%E5%90%8E%E5%8F%B0%E9%A1%B9%E7%9B%AE-mall-blue.svg" alt="后台项目"></a>\n' +
      '<a href="https://github.com/macrozheng/mall-admin-web"><img src="http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/badge/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE-mall--admin--web-green.svg" alt="前端项目"></a>\n' +
      '</p>\n' +
      '\n' +
      '## 简介\n' +
      'mall学习教程，架构、业务、技术要点全方位解析。mall项目（25k+star）是一套电商系统，使用现阶段主流技术实现。\n' +
      '涵盖了SpringBoot2.1.3、MyBatis3.4.6、Elasticsearch6.2.2、RabbitMQ3.7.15、Redis3.2、Mongodb3.2、Mysql5.7等技术，采用Docker容器化部署。\n' +
      '\n' +
      '## 项目地址\n' +
      '- 后台项目：[https://github.com/macrozheng/mall](https://github.com/macrozheng/mall)\n' +
      '- 前端项目：[https://github.com/macrozheng/mall-admin-web](https://github.com/macrozheng/mall-admin-web)\n' +
      '\n' +
      '## 更好的阅读体验\n' +
      '- 文档地址：[http://www.macrozheng.com](http://www.macrozheng.com)\n' +
      '- 备用地址：[https://macrozheng.github.io/mall-learning](https://macrozheng.github.io/mall-learning)\n' +
      '\n' +
      '## 序章\n' +
      '- [mall架构及功能概览](https://juejin.im/post/5cf7c305e51d4510b71da5c5)\n' +
      '- [mall学习所需知识点（推荐资料）](https://juejin.im/post/5cf7c3aef265da1ba84a7fdc)\n' +
      '\n' +
      '## 架构篇\n' +
      '> 手把手教你搭建一个mall在使用的项目骨架\n' +
      '\n' +
      '- [mall整合SpringBoot+MyBatis搭建基本骨架](https://juejin.im/post/5cf7c4a7e51d4577790c1c50)\n' +
      '- [mall整合Swagger-UI实现在线API文档](https://juejin.im/post/5cf9035cf265da1bb47d54f8)\n' +
      '- [mall整合Redis实现缓存功能](https://juejin.im/post/5cf90e9ee51d454f6f16eba0)\n' +
      '- [mall整合SpringSecurity和JWT实现认证和授权（一）](https://juejin.im/post/5cf90fa5e51d455d6d5357d3)\n' +
      '- [mall整合SpringSecurity和JWT实现认证和授权（二）](https://juejin.im/post/5cfa0933f265da1b8f1ab2da)\n' +
      '- [mall整合SpringTask实现定时任务](https://juejin.im/post/5cfa0ea16fb9a07eaf2b8261)\n' +
      '- [mall整合Elasticsearch实现商品搜索](https://juejin.im/post/5cfba3e9f265da1b614fea60)\n' +
      '- [mall整合Mongodb实现文档操作](https://juejin.im/post/5cfba5b0f265da1bcc1933fe)\n' +
      '- [mall整合RabbitMQ实现延迟消息](https://juejin.im/post/5cff98986fb9a07ed36ea139)\n' +
      '- [mall整合OSS实现文件上传](https://juejin.im/post/5cff9944e51d4577555508a9)\n' +
      '\n' +
      '## 业务篇\n' +
      '> 全面解析mall中使用的数据库表结构\n' +
      '\n' +
      '- [mall数据库表结构概览](https://juejin.im/post/5d34684c6fb9a07ef562724b)\n' +
      '- [商品模块数据库表解析（一）](https://juejin.im/post/5d385a7e518825680e4577ee)\n' +
      '- [商品模块数据库表解析（二）](https://juejin.im/post/5d39ba2cf265da1bc23fbd26)\n' +
      '- [订单模块数据库表解析（一）](https://juejin.im/post/5d4196fef265da03bd04fa31)\n' +
      '- [订单模块数据库表解析（二）](https://juejin.im/post/5d46db2a5188255d1e013ca0)\n' +
      '- [订单模块数据库表解析（三）](https://juejin.im/post/5d497f92e51d4561e0516a9d)\n' +
      '- [营销模块数据库表解析（一）](https://juejin.im/post/5d5012856fb9a06ad45135a6)\n' +
      '- [营销模块数据库表解析（二）](https://juejin.im/post/5d555c7ae51d453b386a6302)\n' +
      '- [营销模块数据库表解析（三）](https://juejin.im/post/5d5bf6676fb9a06b0703c0c5)\n' +
      '\n' +
      '## 技术要点篇\n' +
      '> mall中一些功能的技术要点解析\n' +
      '\n' +
      '- [MyBatis Generator使用过程中踩过的一个坑](https://juejin.im/post/5d107037e51d45599e019de8)\n' +
      '- [SpringBoot应用中使用AOP记录接口访问日志](https://juejin.im/post/5d2001bb6fb9a07edf276593)\n' +
      '- [SpringBoot应用整合ELK实现日志收集](https://juejin.im/post/5d2738a2f265da1bac404299)\n' +
      '- [前后端分离项目，如何解决跨域问题](https://juejin.im/post/5d4c162351882560b9545358)\n' +
      '- [Java 8都出那么久了，Stream API了解下？](https://juejin.im/post/5d6d2016e51d453c135c5b25)\n' +
      '- [仅需四步，整合SpringSecurity+JWT实现登录认证！](https://juejin.im/post/5df0e79bf265da33dd2f52af)\n' +
      '\n' +
      '## 部署篇\n' +
      '> mall开发及生产环境的搭建\n' +
      '\n' +
      '- [mall在Windows环境下的部署](https://juejin.im/post/5d1362de51882551fe065b61)\n' +
      '- [mall在Linux环境下的部署（基于Docker容器）](https://juejin.im/post/5d1802ab6fb9a07f0a2df5ae)\n' +
      '- [mall在Linux环境下的部署（基于Docker Compose）](https://juejin.im/post/5d1c98d66fb9a07ebf4b8ad5)\n' +
      '- [mall前端项目的安装与部署](https://juejin.im/post/5d2c7c6b518825076377d7b9)\n' +
      '- [mall-swarm在Windows环境下的部署](https://juejin.im/post/5de3c1a35188256e855b6e54)\n' +
      '- [mall-swarm在Linux环境下的部署（基于Docker容器）](https://juejin.im/post/5de65bffe51d4557f71a5ec1)\n' +
      '\n' +
      '\n' +
      '## 进阶篇\n' +
      '> 一套涵盖大部分核心组件使用的Spring Cloud教程，包括Spring Cloud Alibaba及分布式事务Seata，基于Spring Cloud Greenwich及SpringBoot 2.1.7\n' +
      '\n' +
      '- [Spring Cloud 整体架构概览](https://juejin.im/post/5d764f05e51d4561fb04bfd7)\n' +
      '- [Spring Cloud Eureka：服务注册与发现](https://juejin.im/post/5d78cd53f265da03d55e8351)\n' +
      '- [Spring Cloud Ribbon：负载均衡的服务调用](https://juejin.im/post/5d7f9006f265da03951a260c)\n' +
      '- [Spring Cloud Hystrix：服务容错保护](https://juejin.im/post/5d822d27e51d45621479ad92)\n' +
      '- [Hystrix Dashboard：断路器执行监控](https://juejin.im/post/5d88cb58f265da03e4679eff)\n' +
      '- [Spring Cloud OpenFeign：基于Ribbon和Hystrix的声明式服务调用](https://juejin.im/post/5d9c85c3e51d45782c23fab6)\n' +
      '- [Spring Cloud Zuul：API网关服务](https://juejin.im/post/5d9f2dea6fb9a04e3e724067)\n' +
      '- [Spring Cloud Config：外部集中化配置管理](https://juejin.im/post/5da4709af265da5baa5b06ac)\n' +
      '- [Spring Cloud Bus：消息总线](https://juejin.im/post/5da70d1351882509615bea34)\n' +
      '- [Spring Cloud Sleuth：分布式请求链路跟踪](https://juejin.im/post/5dadb4d36fb9a04e02409a7d)\n' +
      '- [Spring Cloud Consul：服务治理与配置中心](https://juejin.im/post/5db05582f265da4d4c20180f)\n' +
      '- [Spring Cloud Gateway：新一代API网关服务](https://juejin.im/post/5db6eed6518825644076d0b6)\n' +
      '- [Spring Boot Admin：微服务应用监控](https://juejin.im/post/5db98a2d518825649c730f81)\n' +
      '- [Spring Cloud Security：Oauth2使用入门](https://juejin.im/post/5dc013bae51d456e817cec30)\n' +
      '- [Spring Cloud Security：Oauth2结合JWT使用](https://juejin.im/post/5dc2bec6f265da4d4f65bebe)\n' +
      '- [Spring Cloud Security：Oauth2实现单点登录](https://juejin.im/post/5dc95a675188256e040db43f)\n' +
      '- [Spring Cloud Alibaba：Nacos 作为注册中心和配置中心使用](https://juejin.im/post/5dcbf7bc5188250d1f5a78ea)\n' +
      '- [Spring Cloud Alibaba：Sentinel实现熔断与限流](https://juejin.im/post/5dd29bece51d4561e80f9053)\n' +
      '- [使用Seata彻底解决Spring Cloud中的分布式事务问题](https://juejin.im/post/5dd53a9d5188255d35425a08)\n' +
      '- [IDEA中创建和启动SpringBoot应用的正确姿势](https://juejin.im/post/5d8b69366fb9a04e3348b06c)\n' +
      '\n' +
      '## 参考篇\n' +
      '> mall相关技术的使用教程\n' +
      '\n' +
      '- [IDEA常用设置及推荐插件](https://juejin.im/post/5d0458085188256aa76bc678)\n' +
      '- [开发者必备Mysql命令](https://juejin.im/post/5d00fd40f265da1bb67a11b3)\n' +
      '- [开发者必备Linux命令](https://juejin.im/post/5d0253845188255e1305c741)\n' +
      '- [Linux防火墙Firewall和Iptables的使用](https://juejin.im/post/5d0253fe6fb9a07edb39420d)\n' +
      '- [Navicat实用功能：数据备份与结构同步](https://juejin.im/post/5d00fc865188255fc6384126)\n' +
      '- [开发者必备Docker命令](https://juejin.im/post/5d0781f56fb9a07f014ef6be)\n' +
      '- [使用Maven插件构建Docker镜像](https://juejin.im/post/5d08e3d26fb9a07ed8424488)\n' +
      '- [使用DockerFile为SpringBoot应用构建Docker镜像](https://juejin.im/post/5d0a25b76fb9a07ed524a438)\n' +
      '- [使用Docker Compose部署SpringBoot应用](https://juejin.im/user/5cf7c1d7f265da1bc07e28b7)\n' +
      '- [Postman：API接口调试利器](https://juejin.im/post/5d5a9032e51d4561db5e3a4a)\n' +
      '- [10分钟搭建自己的Git仓库](https://juejin.im/post/5d63d600e51d453c135c5af3)\n' +
      '- [IDEA中的Git操作，看这一篇就够了！](https://juejin.im/post/5d667fc6e51d453b5d4d8da5)\n' +
      '- [Hutool中那些常用的工具类和方法](https://juejin.im/post/5d6fb7b0e51d4561c67840de)\n' +
      '- [虚拟机安装及使用Linux，看这一篇就够了！](https://juejin.im/post/5ddfd1665188256ec024cb7c)\n' +
      '- [Nginx的这些妙用，你肯定有不知道的！](https://juejin.im/post/5dee499151882512444014eb)\n' +
      '\n' +
      '\n' +
      '## 公众号\n' +
      '\n' +
      'mall项目全套学习教程连载中，**关注公众号**第一时间获取。\n' +
      '\n' +
      '![公众号图片](http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/banner/qrcode_for_macrozheng_258.jpg)\n',
    page_view: 14873,
    article_type: '创作集',
    created_at: '2019-08-06 12:12',
  },
];

function getFakeArticleItem(req: Request, res: Response) {
  return res.json(fakeArticles[Math.round(Math.random() * (fakeArticles.length - 1))]);
}

export default {
  'GET /api/article-item': getFakeArticleItem,
};

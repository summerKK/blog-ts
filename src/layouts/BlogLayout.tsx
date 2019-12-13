import React, { useEffect } from 'react';
import { Avatar, Icon } from 'antd';
import styles from './BlogLayout.less';
import { throttle, debounce } from 'lodash';
import backgroundCanvas from '@/utils/background';
import CursorSpecialEffects from '@/utils/cursor-effects';
import Aplayer from '@/components/Aplayer';
import avatar from '../assets/images/avatar.jpeg';
import classNames from 'classnames';

interface BlogLayoutProps {
  children: React.ReactElement[];
}

const siteTitle = ['H', 'i', ',', 'S', 'u', 'm', 'm', 'e', 'r'];

const BlogLayout: React.FC<BlogLayoutProps> = props => {
  const { children } = props;
  let key: number = 0;

  // eslint-disable-next-line no-plusplus
  const getKey: () => number = () => ++key;

  useEffect(() => {
    const element: HTMLElement | null = document.getElementById('siteTitle');
    const animatedSpans: HTMLCollectionOf<HTMLElement> = element!.getElementsByTagName('span');
    const animatedLength: number = animatedSpans.length;
    // 字体淡入效果
    for (let i = 0; i < animatedLength; i += 1) {
      setTimeout(() => {
        animatedSpans[i].style.opacity = '1';
      }, i * 250);
    }

    // 监听滚动
    const backToTop: HTMLElement = document.getElementById('backToTop') as HTMLElement;
    let position: number = document.documentElement.scrollTop;
    window.addEventListener(
      'scroll',
      throttle(() => {
        const backHeight: string = `${window.innerHeight - 1180}px`;
        if (document.documentElement.scrollTop > 700 && backToTop.style.top === '-900px') {
          backToTop.style.top = backHeight;
        } else if (document.documentElement.scrollTop <= 700 && backToTop.style.top !== '-900px') {
          backToTop.style.top = '-900px';
        }

        // 查看滑动距离
        const nav: HTMLElement = document.getElementById('nav') as HTMLElement;
        if (document.documentElement.scrollTop > position) {
          debounce(() => {
            nav.classList.remove(styles.slideDown);
            nav.classList.add(styles.slideUp);
          }, 500)();
        } else {
          debounce(() => {
            nav.classList.remove(styles.slideUp);
            nav.classList.add(styles.slideDown);
          }, 500)();
        }
        position = document.documentElement.scrollTop;
      }, 500),
    );

    // 背景
    backgroundCanvas();

    // 鼠标特效
    new CursorSpecialEffects().init();

    // 监听页面变化,调整鼠标特效位置
    window.addEventListener(
      'resize',
      debounce(() => {
        new CursorSpecialEffects().init();
      }, 1000),
    );
  }, []);

  const backToTop: () => void = () => {
    window.scroll(0, -100);
  };

  return (
    <React.Fragment>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <nav className={classNames(styles.nav)} id="nav">
            <ul>
              <li className={styles.menuItem}>
                <Icon type="home" className={styles.iconStyle} />
                <a href="">首页</a>
              </li>
              <li>
                <Icon type="robot" className={styles.iconStyle} />
                <a href="">抓到我</a>
              </li>
              <li>
                <Icon type="sliders" className={styles.iconStyle} />
                <a href="">实验室</a>
              </li>
              <li>
                <Icon type="book" className={styles.iconStyle} />
                <a href="">归档</a>
              </li>
              <li>
                <Icon type="fork" className={styles.iconStyle} />
                <a href="">投喂</a>
              </li>
              <li>
                <Icon type="man" className={styles.iconStyle} />
                <a href="">后宫</a>
              </li>
              <li>
                <Icon type="edit" className={styles.iconStyle} />
                <a href="">留言板</a>
              </li>
              <li>
                <input type="text" placeholder="站内搜索" />
                <button type="submit" value="">
                  <Icon type="search" className={styles.search} />
                </button>
              </li>
            </ul>
          </nav>
          <div className={styles.siteBrandWrap}>
            <div className={styles.siteTitle} id="siteTitle">
              {siteTitle.map(item => (
                <span key={getKey()}>{item}</span>
              ))}
            </div>
          </div>
          <div className={styles.siteMaster}>
            <Avatar src={avatar} className={styles.siteMasterAvatar} />
            <h2 className={styles.siteMasterDescription}>
              <span>写代码是热爱，</span>
              <span>写到世界充满爱！</span>
            </h2>
          </div>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <footer></footer>
      <div
        className={styles.backToTop}
        style={{ top: '-900px' }}
        id="backToTop"
        onClick={backToTop}
      ></div>
      <canvas id="evanyou"></canvas>
      <Aplayer />
      <div id="cursorEffect"></div>
    </React.Fragment>
  );
};

export default BlogLayout;

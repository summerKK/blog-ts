import React, { useEffect } from 'react';
import { Icon } from 'antd';
import styles from './BlogLayout.less';
import { throttle } from 'lodash';
import backgroundCanvas from '@/utils/background';
import Aplayer from '@/components/Aplayer';

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
    window.addEventListener(
      'scroll',
      throttle(() => {
        const backHeight: string = `${window.innerHeight - 1180}px`;
        if (document.documentElement.scrollTop > 700 && backToTop.style.top === '-900px') {
          backToTop.style.top = backHeight;
        } else if (document.documentElement.scrollTop <= 700 && backToTop.style.top !== '-900px') {
          backToTop.style.top = '-900px';
        }
      }, 500),
    );

    // 背景
    backgroundCanvas();
  }, []);

  const backToTop: () => void = () => {
    window.scroll(0, -100);
  };

  return (
    <React.Fragment>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <nav className={styles.nav}>
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
        </div>
      </header>
      <div>{children}</div>
      <footer></footer>
      <div
        className={styles.backToTop}
        style={{ top: '-900px' }}
        id="backToTop"
        onClick={backToTop}
      ></div>
      <canvas id="evanyou"></canvas>
      <Aplayer />
    </React.Fragment>
  );
};

export default BlogLayout;

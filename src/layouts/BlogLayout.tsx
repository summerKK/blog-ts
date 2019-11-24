import React, { Component } from 'react';
import { Icon } from 'antd';
import styles from './BlogLayout.less';

const siteTitle = ['H', 'i', ',', 'S', 'u', 'm', 'm', 'e', 'r'];

class BlogLayout extends Component<any> {
  componentDidMount(): void {
    const element = document.getElementById('siteTitle');
    const animatedSpans = element.getElementsByTagName('span');
    const animatedLength = animatedSpans.length;
    for (let i = 0; i < animatedLength; i += 1) {
      setTimeout(() => {
        animatedSpans[i].style.opacity = '1';
      }, i * 250);
    }
  }

  render() {
    const { children } = this.props;

    return (
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
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default BlogLayout;

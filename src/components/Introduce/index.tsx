import React, { Component } from 'react';
import styles from './index.less';
import card from '@/assets/images/card.jpg';
import { Icon } from 'antd';

class Introduce extends Component {
  componentDidMount(): void {}

  render() {
    return (
      <div className={styles.introduce}>
        <div className={styles.auth}>
          <img src={card} alt="" className={styles.authImg} />
          <p className={styles.authName}>Summer</p>
          <p className={styles.authDescription}>你能抓到我么？</p>
        </div>
        <div className={styles.link}>
          <span>
            <a href="">
              <Icon type="github" />
            </a>
          </span>
          <span>
            <a href="">
              <Icon type="twitter" />
            </a>
          </span>
          <span>
            <a href="">
              <Icon type="qq" />
            </a>
          </span>
          <span>
            <a href="">
              <Icon type="qq" />
            </a>
          </span>
          <span>
            <a href="">
              <Icon type="qq" />
            </a>
          </span>
        </div>
        <div className={styles.top10}>
          <summary>看爆 Top10</summary>
        </div>
      </div>
    );
  }
}

export default Introduce;

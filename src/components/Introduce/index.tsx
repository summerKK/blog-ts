import React, { Component } from 'react';
import styles from './index.less';
import card from '@/assets/images/card.jpg';
import { Affix, Icon } from 'antd';

class Introduce extends Component {
  componentDidMount(): void {}

  render() {
    return (
      <Affix offsetTop={60}>
        <div className={styles.introduce}>
          <div className={styles.auth}>
            <img src={card} alt="" className={styles.authImg} />
            <p className={styles.authName}>Summer</p>
            <p className={styles.authDescription}>天下漫友是一家！</p>
          </div>
          <div className={styles.link}>
            <span data-tip="Github">
              <a href="">
                <Icon type="github" />
              </a>
            </span>
            <span data-tip="Twitter">
              <a href="">
                <Icon type="twitter" />
              </a>
            </span>
            <span data-tip="QQ">
              <a href="">
                <Icon type="qq" />
              </a>
            </span>
          </div>
          <div className={styles.top10}>
            <summary>看爆 Top10</summary>
          </div>
        </div>
      </Affix>
    );
  }
}

export default Introduce;

import React from 'react';
import { Anchor } from 'antd';

const { Link } = Anchor;

interface AnchorItemsType {
  text: string;
  level: number;
  index: string;
  children?: AnchorItemsType[];
}

class Tocify {
  anchorItems: AnchorItemsType[] = [];

  anchorCurrentLevel: number = 0;

  parentAnchor: AnchorItemsType | null = null;

  currentAnchor: AnchorItemsType | null = null;

  constructor() {
    this.init();
  }

  init() {
    this.anchorItems = [];
    this.anchorCurrentLevel = 0;
    this.parentAnchor = null;
    this.currentAnchor = null;
  }

  addAnchor = (text: string, level: number, index: string) => {
    const anchorItem: AnchorItemsType = { text, level, index };
    if (this.anchorItems.length > 0) {
      if (this.anchorCurrentLevel < level) {
        const parent: AnchorItemsType = (this.parentAnchor ||
          this.currentAnchor) as AnchorItemsType;
        if (parent.children) {
          parent.children.push(anchorItem);
        } else {
          parent.children = [anchorItem];
        }
        this.parentAnchor = this.currentAnchor;
      } else if (this.anchorCurrentLevel === level) {
        if (this.parentAnchor) {
          if (this.parentAnchor.children) {
            this.parentAnchor.children.push(anchorItem);
          } else {
            this.parentAnchor.children = [anchorItem];
          }
        } else {
          this.anchorItems.push(anchorItem);
          this.parentAnchor = null;
        }
      } else {
        this.anchorItems.push(anchorItem);
        this.parentAnchor = null;
      }
    } else {
      this.anchorItems.push(anchorItem);
    }

    this.currentAnchor = anchorItem;
    this.anchorCurrentLevel = level;
  };

  renderAnchor = (anchorItems: AnchorItemsType[]) =>
    anchorItems.map((anchorItem: AnchorItemsType) => (
      <Link key={anchorItem.index} href={`#${anchorItem.index}`} title={anchorItem.text}>
        {anchorItem.children && this.renderAnchor(anchorItem.children)}
      </Link>
    ));

  render() {
    return (
      <Anchor showInkInFixed style={{ textAlign: 'left' }} targetOffset={30} affix={false}>
        {this.renderAnchor(this.anchorItems)}
      </Anchor>
    );
  }
}

export default Tocify;

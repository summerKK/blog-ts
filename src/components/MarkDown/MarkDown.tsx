import React, { Component } from 'react';
import marked, { Renderer } from 'marked';
import highlight from 'highlight.js';
import Tocify from '@/components/MarkDown/Tocify';
import 'highlight.js/styles/monokai-sublime.css';

interface MarkDownProps {
  getTocify?: (tocity: Tocify) => void;
  content: string;
  className?: string;
}

class MarkDown extends Component<MarkDownProps> {
  index: number = 0;

  tocify: Tocify;

  constructor(props: MarkDownProps) {
    super(props);
    this.tocify = new Tocify();
  }

  componentDidMount(): void {
    const { getTocify } = this.props;
    if (getTocify) {
      getTocify(this.tocify);
    }
  }

  shouldComponentUpdate(nextProps: Readonly<MarkDownProps>): boolean {
    if (nextProps.content === this.props.content) {
      return false;
    }
    return true;
  }

  // eslint-disable-next-line no-plusplus
  getIndex = () => this.index++;

  getMarkdownText = (content: string): { __html: string } => {
    if (content) {
      this.tocify.init();
      const render: Renderer = new marked.Renderer();
      render.heading = (text, level) => {
        const index = `anchor-${text}${this.getIndex()}`.replace(/\s+/g, '-');
        this.tocify.addAnchor(text, level, index);
        return `<h${level} id="${index}">${text}</h${level}>`;
      };
      marked.setOptions({
        renderer: render,
        highlight(code, language: string) {
          if (language) {
            return highlight.highlight(language, code).value;
          }
          return code;
        },
        // ~~~~~~~
        langPrefix: 'hljs ',
        pedantic: false,
        gfm: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false,
      });
      return { __html: marked(content) };
    }
    return { __html: '' };
  };

  render() {
    const { content, className } = this.props;
    return <div className={className} dangerouslySetInnerHTML={this.getMarkdownText(content)} />;
  }
}

export default MarkDown;

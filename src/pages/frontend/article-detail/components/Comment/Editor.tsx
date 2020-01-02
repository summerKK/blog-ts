import React from 'react';
import { Mentions, Icon, Button, Upload, Card } from 'antd';
import styles from './editor.less';
import calculateNodeHeight from 'antd/lib/input/calculateNodeHeight';
import 'emoji-mart/css/emoji-mart.css';
import { EmojiData, Picker } from 'emoji-mart';
import MarkDown from '@/components/MarkDown/MarkDown';

interface EditorProps {
  minRow?: number;
  maxRow?: number;
  markdownPreview?: boolean;
}

interface EditorStates {
  value: string;
  textareaStyles: object;
  showEmoji: boolean;
  textareaHeight: number;
}

class Editor extends React.Component<EditorProps, EditorStates> {
  textarea: HTMLTextAreaElement | any;

  static defaultProps = {
    markdownPreview: true,
  };

  constructor(props: EditorProps) {
    super(props);
    this.state = {
      value: '',
      textareaStyles: {},
      showEmoji: false,
      textareaHeight: 0,
    };
  }

  componentDidMount(): void {
    this.resizeTextarea();
    document.addEventListener('click', this.hiddenEmojiEvent);
    document.addEventListener('keydown', this.handleKeydownEvent);
  }

  componentWillUnmount(): void {
    document.removeEventListener('click', this.hiddenEmojiEvent);
    document.removeEventListener('keydown', this.handleKeydownEvent);
  }

  setTextarea = (ref: HTMLDivElement) => {
    if (!ref) {
      return;
    }
    // eslint-disable-next-line prefer-destructuring
    this.textarea = ref.getElementsByTagName('textarea')[0];
  };

  resizeTextarea = () => {
    const { maxRow = 100, minRow = 6 } = this.props;
    const textareaStyles = calculateNodeHeight(this.textarea, false, minRow, maxRow);
    this.setState({ textareaStyles });
    this.setState({ textareaHeight: textareaStyles.height });
  };

  handleOnChange = (value: string) => {
    this.setState({ value }, () => this.resizeTextarea());
  };

  handleShowEmoji = () => {
    const { showEmoji } = this.state;
    this.setState({ showEmoji: !showEmoji });
  };

  hiddenEmojiEvent = (event: MouseEvent) => {
    const emojiIconDom = document.querySelector('#emojiIcon')!;
    const emojiDom = document.querySelector('#emoji')!;
    const eventDom = event.target! as Node;
    if (
      emojiIconDom === eventDom ||
      emojiDom === eventDom ||
      emojiIconDom.contains(eventDom) ||
      emojiDom.contains(eventDom)
    ) {
      return;
    }
    this.setState({ showEmoji: false });
  };

  handleEmojiSelect = (emoji: EmojiData) => {
    if ('native' in emoji) {
      const { value } = this.state;
      this.setState({
        value: value + emoji.native,
      });
    }
  };

  handleKeydownEvent = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const indent = '\t';
      const { value } = this.state;
      this.setState({ value: value + indent });
    }
  };

  render() {
    const { textareaStyles, value, showEmoji, textareaHeight } = this.state;
    const { markdownPreview } = this.props;
    return (
      <Card>
        <div className={styles.editor}>
          <div className={styles.textarea} ref={this.setTextarea} style={textareaStyles}>
            <Mentions
              maxLength={2048}
              rows={100}
              onChange={this.handleOnChange}
              value={value}
            ></Mentions>
          </div>
          <div className={styles.toolbar}>
            <div className={styles.info}>
              您需要<a> 登录 </a>才能发表评论
            </div>
            <div className={styles.actions}>
              <div className={styles.action}>
                <Upload className={styles.upload}>
                  <Icon type="picture" />
                </Upload>
              </div>
              <div className={styles.action}>
                <span
                  className={styles.emojiPickerBtn}
                  onClick={this.handleShowEmoji}
                  id="emojiIcon"
                >
                  <Icon type="smile" theme="outlined" />
                </span>
              </div>
              <div className={styles.action}>
                <span className={styles.submit}>
                  <Button htmlType="submit" className={styles.submit} type="primary" icon="message">
                    评论
                  </Button>
                </span>
              </div>
            </div>
          </div>
          <div id="emoji">
            {showEmoji ? (
              <Picker
                set="apple"
                showPreview={false}
                skin={1}
                // @ts-ignore
                darkMode={false}
                style={{ position: 'absolute', top: `${textareaHeight + 60}px`, right: 0 }}
                onSelect={this.handleEmojiSelect}
              />
            ) : (
              ''
            )}
          </div>
        </div>
        {markdownPreview && value && (
          <div className={styles.markdownPreview}>
            <MarkDown content={value} />
          </div>
        )}
      </Card>
    );
  }
}

export default Editor;

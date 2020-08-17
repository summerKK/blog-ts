import React, { ErrorInfo } from 'react';
import fundebug from 'fundebug-javascript';
import 'fundebug-revideo';

fundebug.init({ apikey: 'c97ddcc4f2febd59ae7c1dd1dd4f09f21ad5a8d7cb90fd81f12de6bac409b3b9' });

interface ErrorBoundaryStates {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactElement[];
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryStates> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ hasError: true });
    // 将component中的报错发送到Fundebug
    fundebug.notifyError(error, {
      metaData: {
        info,
      },
    });
  }

  render() {
    if (this.state.hasError) {
      return null;
      // Note: 也可以在出错的component处展示出错信息，返回自定义的结果。
    }
    return this.props.children;
  }
}

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from 'react-bootstrap';

type Props = {
  children?: ReactNode,
};
type State = {
  hasError: boolean,
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="container-fluid d-flex flex-column col-8 align-items-center justify-content-center vh-100">
          <h1>Простите, кажется возникла ошибка!</h1>
          <Button onClick={() => window.location.reload()} variant="outline-warning">Обновить страницу</Button>
        </main>
      );
    }
    return this.props.children;
  }
}
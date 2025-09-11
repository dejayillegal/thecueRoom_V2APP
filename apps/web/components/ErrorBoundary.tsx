'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
    
    // In production, you would send this to your error reporting service
    // Example: Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#0B0B0B] text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
              <p className="text-neutral-400 text-sm">
                We've encountered an unexpected error. This has been logged and our team will investigate.
              </p>
            </div>
            
            <div className="space-y-3 mb-6">
              <button
                onClick={this.handleReload}
                className="w-full rounded bg-lime-300 px-6 py-3 font-semibold text-black hover:bg-lime-200 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={this.handleGoHome}
                className="w-full rounded border border-neutral-700 px-6 py-3 text-neutral-200 hover:border-neutral-600 hover:bg-neutral-900 transition-colors"
              >
                Go Home
              </button>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-left text-xs bg-neutral-900 rounded p-4 border border-neutral-800">
                <summary className="cursor-pointer text-neutral-400 mb-2">
                  Error Details (Dev Only)
                </summary>
                <pre className="text-red-400 whitespace-pre-wrap overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
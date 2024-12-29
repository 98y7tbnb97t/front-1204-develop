import React, { ErrorInfo } from 'react';
import * as Sentry from "@sentry/react";
import { useAppSelector } from '../hooks/redux.ts';

interface ErrorBoundaryProps {
  userEmail: string;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}


class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, _errorInfo: ErrorInfo) {

    const currentScope = Sentry.getCurrentScope();
    // Add a tag indicating that this event is related to an ErrorBoundary
    currentScope.setTag('related_to', 'ErrorBoundary');

    if(this.props.userEmail) {
      currentScope.setUser({ email: this.props.userEmail }); // user
    }

    currentScope.setExtra('message', error.message);
    currentScope.setExtra('stack', error.stack);

    Sentry.captureEvent({
      message: 'Error captured in ErrorBoundary',
      level: 'error',
      contexts: {
        componentError: {
          boundary: 'ErrorBoundary',
          description: 'An error was caught by the ErrorBoundary component.',
        },
      },
    });

    window.alert('Something went wrong. Please report about this issue.');
  }

  render() {
    return this.props.children;
  }
}

// Create a wrapper component to connect ErrorBoundary with Redux
export const ConnectedErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user: { email } } = useAppSelector((state) => state.UserSlice);

  return (
    <ErrorBoundary userEmail={ email }>
      {children}
    </ErrorBoundary>
  );
};

export default ConnectedErrorBoundary;

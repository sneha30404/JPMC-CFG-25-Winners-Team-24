import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Chatbot error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          border: '1px solid #f44336', 
          borderRadius: '8px',
          backgroundColor: '#ffebee', 
          color: '#d32f2f',
          textAlign: 'center'
        }}>
          <h3>Something went wrong with the chatbot.</h3>
          <button onClick={() => this.setState({ hasError: false })}>Try Again</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
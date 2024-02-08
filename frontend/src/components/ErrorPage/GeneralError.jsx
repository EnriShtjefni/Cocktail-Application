import React, { Component } from 'react';
import './ErrorPages.css';

class GeneralError extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <h1>Something went wrong</h1>
          <p>Sorry, something unexpected happened. Please try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GeneralError;
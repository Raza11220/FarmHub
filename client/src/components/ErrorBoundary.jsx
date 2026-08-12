import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error?.message || "Something went wrong." };
  }

  componentDidCatch(error, errorInfo) {
    console.error("FarmHub error boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-page">
          <div className="error-card">
            <span className="section-label">ERROR</span>
            <h1>Something went wrong</h1>
            <p>{this.state.errorMessage}</p>
            <button type="button" className="primary-btn" onClick={() => window.location.reload()}>
              Reload App
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

import React from 'react'

class ErrorBoundary extends React.Component {
  constructor({ children }) {
    super(children)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    const { error } = this.state

    if (error) {
      return (
        <div>
          <h2>Something went wrong</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error?.toString()}
          </details>
        </div>
      )
    }
    return this.children
  }
}

export default ErrorBoundary

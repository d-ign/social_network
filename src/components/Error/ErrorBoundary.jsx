import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  componentDidCatch(error) {
    this.setState({ error })
  }

  render() {
    const { error } = this.state
    const { children } = this.props

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

    return children
  }
}

export default ErrorBoundary

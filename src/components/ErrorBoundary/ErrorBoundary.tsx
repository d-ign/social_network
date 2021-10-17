import React from 'react'

type PropsType = {
  children: React.ReactNode
}

type StateType = {
  error: string | null
  hasError: boolean
}

class ErrorBoundary extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = { error: null, hasError: false }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentDidCatch(error: any): void {
    this.setState({ error })
  }

  render(): React.ReactNode {
    const { error, hasError } = this.state
    const { children } = this.props

    if (hasError) {
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

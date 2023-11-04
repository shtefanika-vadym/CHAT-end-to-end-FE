import type { ErrorInfo, ReactNode } from 'react'
import { Component } from 'react'

import { Box, Button, Card, Text } from '@mantine/core'

import styles from './error-boundary.module.scss'

interface IProps {
  children: ReactNode
}

interface IState {
  hasError: boolean
}

export class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo)
  }

  handleReloadPage() {
    window.location.reload()
  }

  render() {
    const { children } = this.props
    const { hasError } = this.state

    if (hasError) {
      return (
        <Box className={styles.parent}>
          <Card shadow='md' padding='lg' radius='lg'>
            <Text weight={700}>Oops! Something went wrong.</Text>
            <Text size='sm' mt={2}>
              Were sorry, but an unexpected error occurred. Please try again later.
            </Text>
            <Button onClick={this.handleReloadPage} variant='outline' color='blue' mt={10}>
              Reload page
            </Button>
          </Card>
        </Box>
      )
    }

    return children
  }
}

import React, { Suspense } from 'react'
import Preloader from '../Preloader/Preloader'

function withSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  return (props: WCP) => (
    <Suspense fallback={<Preloader />}>
      <WrappedComponent {...props} />
    </Suspense>
  )
}
export default withSuspense

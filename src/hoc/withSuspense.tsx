import React, { Suspense } from 'react'
import Preloader from '../components/common/Preloader/Preloader'

function withSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  return (props: WCP) => (
    <Suspense fallback={<Preloader display='default' />}>
      <WrappedComponent {...props} />
    </Suspense>
  )
}
export default withSuspense

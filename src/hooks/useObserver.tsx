import { useEffect, useRef } from 'react'

const useObserver = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  elementTrigger: React.RefObject<any>,
  canLoad: boolean,
  isFetching: boolean,
  callback: () => void
) => {
  const observer = useRef<IntersectionObserver | undefined>()

  useEffect(() => {
    if (isFetching) return
    if (observer.current) observer.current.disconnect()

    const _callback = (entries: IntersectionObserverEntry[]) => {
      // when the ref disappears from the visibility zone,
      // the callback will not work
      if (entries[0].isIntersecting && canLoad) {
        callback()
      }
    }
    observer.current = new IntersectionObserver(_callback)
    observer.current.observe(elementTrigger.current)
  }, [isFetching, callback, canLoad, elementTrigger])
}

export default useObserver

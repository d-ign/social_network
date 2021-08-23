import { useEffect, useRef } from 'react'

const useObserver = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: any,
  canLoad: boolean,
  isFetching: boolean,
  callback: () => void
) => {
  const observer = useRef<IntersectionObserver | undefined>()

  useEffect(() => {
    if (isFetching) return
    if (observer.current) observer.current.disconnect()

    const _callback = (entries: IntersectionObserverEntry[]) => {
      // при исчезании ref из зоны видимости callback отрабатывать не будет
      if (entries[0].isIntersecting && canLoad) {
        callback()
      }
    }
    observer.current = new IntersectionObserver(_callback)
    observer.current.observe(ref.current)
  }, [isFetching, callback, canLoad, ref])
}

export default useObserver

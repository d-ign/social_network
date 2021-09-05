import { useEffect, Dispatch, SetStateAction } from 'react'

const useResizeWindow = (
  width: number,
  action: Dispatch<SetStateAction<number>>
) => {
  useEffect(() => {
    const handleResizeWindow = () => action(window.innerWidth)

    window.addEventListener('resize', handleResizeWindow)
    return () => {
      window.removeEventListener('resize', handleResizeWindow)
    }
  }, [width, action])
}

export default useResizeWindow

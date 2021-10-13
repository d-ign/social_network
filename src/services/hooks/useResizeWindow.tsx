import { useEffect, useState } from 'react'

type HookType = () => number

const useResizeWindow: HookType = () => {
  const [widthScreen, setWidthScreen] = useState(window.innerWidth)

  useEffect(() => {
    const handleResizeWindow = () => setWidthScreen(window.innerWidth)

    window.addEventListener('resize', handleResizeWindow)

    return () => {
      window.removeEventListener('resize', handleResizeWindow)
    }
  }, [widthScreen, setWidthScreen])

  return widthScreen
}

export default useResizeWindow

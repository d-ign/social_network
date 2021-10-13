import React, { useEffect, PropsWithChildren } from 'react'

type PropsType = {
  alerter: React.RefObject<HTMLDivElement>
  callback: () => void
}

type HookType = (props: PropsWithChildren<PropsType>) => void

const useOutsideAlerter: HookType = ({ alerter, callback }) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        alerter.current &&
        !alerter.current.contains(e.target as HTMLInputElement)
      ) {
        callback()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [alerter, callback])
}

export default useOutsideAlerter

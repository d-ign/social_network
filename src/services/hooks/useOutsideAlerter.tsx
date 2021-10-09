import React, { useEffect, Dispatch, SetStateAction } from 'react'

const useOutsideAlerter = (
  alerter: React.RefObject<HTMLDivElement>,
  action: Dispatch<SetStateAction<boolean>>
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        alerter.current &&
        !alerter.current.contains(e.target as HTMLInputElement)
      ) {
        action(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [alerter, action])
}

export default useOutsideAlerter

import React, { useEffect, Dispatch, SetStateAction } from 'react'

const useOutsideAlerter = (
  ref: React.RefObject<HTMLDivElement>,
  action: Dispatch<SetStateAction<boolean>>
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as HTMLInputElement)) {
        action(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, action])
}

export default useOutsideAlerter

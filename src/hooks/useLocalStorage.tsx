import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { PostType } from '../types/types'

const useLocalStorage = (
  key: string,
  value: string | PostType[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback?: any
) => {
  const dispatch = useDispatch()

  // чтение и применение темы из Local Storage
  useEffect(() => {
    // @ts-ignore
    const arr = JSON.parse(localStorage.getItem(key))

    if (arr) {
      dispatch(action(arr))
      if (callback) callback(arr)
    }
  }, [action, key, callback, dispatch])

  // запись темы в Local Storage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
}
export default useLocalStorage

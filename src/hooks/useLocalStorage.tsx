import { Dispatch, SetStateAction, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { PostType, ThemeType } from '../types/types'

type ActionPostsType = (posts: Array<PostType>) => {
  type: string
  posts: Array<PostType>
}

type ActionThemeType = (theme: ThemeType) => {
  type: string
  theme: ThemeType
}

const useLocalStorage = (
  key: string,
  value: string | PostType[],
  action: ActionPostsType | ActionThemeType,
  callback?: Dispatch<SetStateAction<ThemeType>>
) => {
  const dispatch = useDispatch()

  // reading and applying theme from Local Storage
  useEffect(() => {
    let currentValue
    const currentValueJson = localStorage.getItem(key)

    if (currentValueJson) {
      currentValue = JSON.parse(currentValueJson)
    }

    if (currentValue) {
      dispatch(action(currentValue))
      if (callback) callback(currentValue)
    }
  }, [action, key, callback, dispatch])

  // writing a theme to Local Storage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
}

export default useLocalStorage

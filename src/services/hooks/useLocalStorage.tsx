import { PropsWithChildren, useEffect } from 'react'
import { PayloadActionCreator } from '@reduxjs/toolkit'
import { useAppDispatch } from './useApp'

import { PostType, ThemeType } from '../../types/types'

type ActionPostsType = PayloadActionCreator<PostType[]>
type ActionThemeType = PayloadActionCreator<ThemeType>

type PropsType = {
  key: string
  value: ThemeType | PostType[]
  action: ActionPostsType | ActionThemeType
}

type HookType = (props: PropsWithChildren<PropsType>) => void

const useLocalStorage: HookType = ({ key, value, action }) => {
  const dispatch = useAppDispatch()

  // reading and applying theme from Local Storage
  useEffect(() => {
    const currentValueJson = localStorage.getItem(key)

    if (currentValueJson) {
      dispatch(action(JSON.parse(currentValueJson)))
    }
  }, [action, key, dispatch])

  // writing a theme to Local Storage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
}

export default useLocalStorage

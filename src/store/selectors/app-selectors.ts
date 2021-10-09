import { RootStateType } from '../store'

export const getInitialized = (state: RootStateType) => state.app.initialized

export const getTheme = (state: RootStateType) => state.app.theme

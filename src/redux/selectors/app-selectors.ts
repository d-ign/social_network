import { AppStateType } from '../redux-store'

export const getInitialized = (state: AppStateType) => state.app.initialized

export const getTheme = (state: AppStateType) => state.app.theme

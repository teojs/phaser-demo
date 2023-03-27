import { AppState } from '@/types/store/app'

export default {
  namespaced: true,

  state: {
    colorScheme: 'light',
  } as AppState,

  getters: {
    colorScheme(state: AppState) {
      return state.colorScheme
    },
  },

  mutations: {
    /**
     * 切换主题
     *
     * @param {AppState} state
     * @param {('dark' | 'light')} colorScheme
     */
    switchTheme(state: AppState, colorScheme: 'dark' | 'light') {
      state.colorScheme = colorScheme
      document.documentElement.setAttribute('data-theme', colorScheme)
    },
  },
}

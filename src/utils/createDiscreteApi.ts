import {
  createDiscreteApi,
  ConfigProviderProps,
  lightTheme,
  darkTheme,
} from 'naive-ui'
import store from '@/store'

const theme = store.getters['app/colorScheme']

const configProviderProps: ConfigProviderProps = {
  theme: theme === 'light' ? lightTheme : darkTheme,
}

const { message, notification, dialog, loadingBar } = createDiscreteApi(
  ['message', 'dialog', 'notification', 'loadingBar'],
  {
    configProviderProps,
  }
)

export { message, notification, dialog, loadingBar }

/* eslint-disable no-unused-vars */
import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { LoDashStatic } from '@types/lodash'
import {
  message,
  notification,
  dialog,
  loadingBar,
} from '@/utils/createDiscreteApi'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<any>
    $_: LoDashStatic
    $message: typeof message
    $notification: typeof notification
    $dialog: typeof dialog
    $loadingBar: typeof loadingBar
  }
}

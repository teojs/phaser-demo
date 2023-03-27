/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@/router/routes' {
  export default []
}

interface WWLoginConfig {
  id: string
  appid: string
  agentid: string
  redirect_uri: string
  state: string
  href: string
  lang: string
}

declare module '@/utils/wwLogin-1.2.7' {
  export default class WWLogin {
    constructor(config: WWLoginConfig)
    destroyed() {}
  }
}

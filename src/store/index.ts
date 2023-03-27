import { createStore, createLogger } from 'vuex'
import { RootState } from '@/types/store'
import Persistent from './plugin/persistent'

const debug = import.meta.env.MODE !== 'production'
const files = import.meta.globEager('./modules/*.ts')

const modules: any = {}
Object.keys(files).forEach((c: string) => {
  const module = files[c].default
  const moduleName: string = c.replace(/^\.\/(.*)\/(.*)\.\w+$/, '$2')
  modules[moduleName] = module
})
const persistent = Persistent({
  key: 'vuex',
  modules,
  modulesKeys: {
    local: Object.keys(modules),
    session: [],
  },
})

export default createStore<RootState>({
  modules: {
    ...modules,
  },
  plugins: debug ? [createLogger(), persistent] : [persistent],
})

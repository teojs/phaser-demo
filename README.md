# admin-ts-front

基于 Typescript 的后台管理框架

### vite.config.js 配置

See [Configuration Reference](https://cn.vitejs.dev/config/).

### 自动生成路由配置

参照这个插件：

See
[vue-cli-plugin-auto-routing](https://github.com/ktsn/vue-cli-plugin-auto-routing#readme).

### 食用说明

#### 路由

放在 src/pages 下的页面会自动加载并生成路由，路由规则如下：

- 路由的 path 是根据目录和.vue 文件拼接的，比如有个 test 目录下有个 test.vue，那
  生成的 path 就是/test/test
- 如果一个目录下有 index.vue，那这个目录就是父级，目录下其他 vue 页面都会经过这
  个父级

如果需要添加路由额外配置，比如 redirect、meta 这些，请在对应的.vue 文件
的<route lang="json">里配置

```vue
<route lang="json">
{
  "meta": {
    "title": "用户管理",
    "sort": 2,
    "isMenu": true
  },
  "redirect": "/permission/user/list"
}
</route>
```

新增 meta 属性时，需要在 /src/types/router.d.ts 里追加声明

如果要将页面显示在左边的菜单栏，需要设定 meta 属性 isMenu: true，同时也会被放在
已打开的横向 tab 栏里。

加入缓存的页面，需要使用生命周期 activated 来更新页面,

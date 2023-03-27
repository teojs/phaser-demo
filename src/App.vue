<template>
  <n-config-provider
    abstract
    :theme="theme"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <n-notification-provider>
      <n-dialog-provider>
        <n-message-provider>
          <n-loading-bar-provider>
            <router-view />
          </n-loading-bar-provider>
        </n-message-provider>
      </n-dialog-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { darkTheme, zhCN, dateZhCN } from 'naive-ui'
import { mapState } from 'vuex'

interface AppData {
  darkTheme: typeof darkTheme
  zhCN: typeof zhCN
  dateZhCN: typeof dateZhCN
  theme: typeof darkTheme | null
}

export default defineComponent({
  components: {},
  data() {
    return {
      darkTheme,
      zhCN,
      dateZhCN,
      theme: null,
    } as AppData
  },
  beforeCreate() {},
  created() {
    this.detectColorScheme()
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeUnmount() {},
  unmounted() {},
  methods: {
    detectColorScheme() {
      this.colorScheme === 'light'
        ? (this.theme = null)
        : (this.theme = darkTheme)
      document.documentElement.setAttribute('data-theme', this.colorScheme)
    },
  },
  computed: {
    ...mapState('app', ['colorScheme']),
  },
  watch: {
    colorScheme(value: 'dark' | 'light') {
      value === 'light' ? (this.theme = null) : (this.theme = darkTheme)
    },
  },
})
</script>

<style></style>

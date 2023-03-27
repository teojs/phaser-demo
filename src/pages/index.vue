<template>
  <div class="page">
    <p>VUE + TypeScript + Vite</p>
    <p>下面一段文本是Mockjs随机返回的</p>
    <p>{{ msg }}</p>
  </div>
</template>

<route lang="json">
{
  "meta": {
    "title": "首页",
    "sort": 1,
    "isMenu": true
  }
}
</route>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  data: () => ({
    msg: '',
  }),
  beforeCreate() {},
  created() {},
  beforeMount() {},
  async mounted() {
    const res = await this.$api.getDemo({})
    this.msg = res.body?.msg || '你好!'
  },
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {},
  unmounted() {},
  methods: {},
  filters: {},
  computed: {},
  watch: {},
})
</script>

<style lang="less" scoped>
.page {
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>

<template>
  <div class="not-found" />
  <n-button class="goback" @click="$router.push('/')"> 返回首页 </n-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Views404',
  components: {},
  data() {
    return {}
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeUnmount() {},
  unmounted() {},
  methods: {},
  computed: {},
  watch: {},
})
</script>

<style scoped lang="less">
.not-found {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  flex-direction: column;
  background-image: url(/img/404.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  i {
    font-size: 300px;
    color: #ccc;
  }
}
.goback {
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
}
</style>

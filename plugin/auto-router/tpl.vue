<template>
  component name here
</template>

<route lang="json">
{
  "meta": {
    "title": "component name here",
    "sort": 1
  }
}
</route>

<script lang="ts">
import { defineComponent } from 'vue'
import discreteApiMixin from '@/mixins/discreteApi'

export default defineComponent({
  name: 'component name here',
  components: {},
  mixins: [discreteApiMixin],
  data() {
    return {}
  },
  beforeCreate() {},
  activated() {},
  deactivated() {},
  created() {},
  beforeMount() {},
  mounted() {},
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

<style lang="less" scoped></style>

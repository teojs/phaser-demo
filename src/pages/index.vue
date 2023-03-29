<template>
  <div id="game" />
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
import Phaser from 'phaser'

export default defineComponent({
  components: {},
  data: () => ({
    msg: '',
  }),
  beforeCreate() {},
  created() {},
  beforeMount() {},
  async mounted() {
    class MyScene extends Phaser.Scene {
      private box!: Phaser.Physics.Arcade.Sprite

      constructor() {
        super({ key: 'MyScene' })
      }

      preload() {
        this.load.image('box', '/img/box.png')
        this.load.image('floor', '/img/floor.png')
      }

      create() {
        // 创建可拖动的精灵
        const platforms = this.physics.add.staticGroup()
        platforms
          .create(innerWidth / 2, innerHeight - 25, 'floor')
          .refreshBody()

        // 添加可拖动的精灵
        this.box = this.physics.add.sprite(500, 0, 'box')
        this.box.setBounce(0.2)
        this.box.setCollideWorldBounds(true)

        this.input.enable(this.box)
        this.box.setInteractive()
        this.input.setDraggable(this.box)
        this.input.on('drag', this.handleDrag, this)
        this.input.on('dragend', this.handleDragEnd, this)

        const box2 = this.physics.add.sprite(700, 0, 'box')
        box2.setBounce(0.2)
        box2.setCollideWorldBounds(true)
        this.input.enable(box2)
        box2.setInteractive()
        this.input.setDraggable(box2)

        this.physics.add.collider(this.box, platforms)
        this.physics.add.collider(this.box, box2)
      }

      update() {
        // 精灵跑出屏幕时重置位置
        // if (this.sprite.y > this.scale.height) {
        //   this.sprite.setPosition(400, 300)
        // }
      }

      private handleDrag(
        pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.GameObject,
        dragX: number,
        dragY: number
      ) {
        if (gameObject instanceof Phaser.Physics.Arcade.Sprite) {
          gameObject.x = dragX
          gameObject.y = dragY
          gameObject.body.enable = false
        }
      }

      private handleDragEnd(
        pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.GameObject,
        dragX: number,
        dragY: number
      ) {
        if (gameObject instanceof Phaser.Physics.Arcade.Sprite) {
          gameObject.body.enable = true
        }
      }
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: innerWidth,
      height: innerHeight,
      parent: 'game',
      backgroundColor: '#ffffff',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 2000 },
          // debug: true,
        },
      },
      scene: [MyScene],
    }
    const game = new Phaser.Game(config)
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

<style lang="less">
#game canvas {
  vertical-align: top;
}
</style>

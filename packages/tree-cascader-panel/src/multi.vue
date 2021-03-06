<template>
  <el-tree
    ref="tree"
    show-checkbox
    :node-key="nodeKey"
    :highlight-current="highlightCurrent"
    :check-strictly="checkStrictly"
    @check="handleCheck"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>
<script>
import merge from 'element-ui/src/utils/merge'

const DefaultProps = {
  checkStrictly: false,
  emitPath: true,
  value: 'value',
  label: 'label',
  children: 'children'
}

export default {
  name: 'ThxTreeCascaderPanelMulti',
  props: {
    value: Array,
    nodeKey: {
      type: String,
      default: 'id'
    },
    highlightCurrent: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    tree() {
      return this.$refs.tree
    },
    config() {
      return merge({ ...DefaultProps }, this.$attrs.props || {})
    },
    checkStrictly() {
      return this.config.checkStrictly
    }
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(val) {
        const checked = val || []
        this.$nextTick(() => this.tree.setCheckedKeys(
          this.config.emitPath ? checked.map(it => [...it].pop()) : checked))
      }
    }
  },
  methods: {
    async getCurrentChecked() {
      return new Promise(resolve => this.$nextTick(() => resolve(
        this.getSelectedValue(this.tree.getCheckedKeys(), this.tree.getCheckedNodes()))))
    },
    getSelectedValue(checkedKeys, checkedNodes) {
      const { checkStrictly, emitPath } = this.config
      const keys = checkStrictly ? checkedKeys : checkedNodes
        .filter(node => !node[this.config.children])
        .map(node => node[this.nodeKey])
      const result = emitPath
        ? keys.map(key => this.getLevelData(this.tree.getNode(key)).map(it => it[this.nodeKey]))
        : keys
      
      return result
    },
    handleCheck(current, { checkedKeys, checkedNodes }) {
      const result = this.getSelectedValue(checkedKeys, checkedNodes)
      this.$emit('input', result)
      this.$emit('update:value', result)
    },
    getLevelData(node) {
      if (!node || node.level === 0) return []

      const parent = this.getLevelData(node.parent)
      const { label } = this.config
      const [data, key] = [node.data, this.nodeKey]

      return [...parent, { [key]: data[key], [label]: data[label] }]
    }
  }
}
</script>
<style scoped>
.el-tree span {
  font-size: 14px;
}
</style>

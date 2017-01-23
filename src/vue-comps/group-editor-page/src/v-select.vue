<template lang=pug>
select(v-model="model")
  option(v-for="(item, index) in options") {{ item }}
</template>

<script>
export default {
  name: 'v-select',

  props: {
    options: Array,
    group: String,
    index: Number
  },
  data () {
    return {
      selected: false,
      opt: [],
      model: ''
    }
  },
  watch: {
    'model': function (val, old) {
      if (val !== old) {
        window.bus.$emit('option:changed', {value: val, index: this.index})
      }
    }
  },
  mounted () {
    this.model = this.group
  }
}
</script>

<style lang="scss" scoped>
</style>
<template lang=pug>
.subject-container
  h3 {{ subject.code }}
</template>

<script>
export default {
  name: 'subject',
  props: {
    subject: Object
  },
  mounted () {
    // console.log(this.subject)
  }
}
</script>

<style lang="scss" scoped>
</style>
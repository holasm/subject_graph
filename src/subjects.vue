<template lang=pug>
#app
  ul.areas
    li.subjects-col(v-for="item in 8")
      p Head
      ul.subjects
        li.subject lol
        li.subject lol
        li.subject lol
        li.subject lol
        li.subject lol
        li.subject lol
        li.subject lol
        li.subject lol
        li.subject lol
</template>

<script>
export default {
  name: 'subject',
  data () {
    return {
      count: 10
    }
  }
}
</script>

<style lang="scss" scoped>
body{
  padding: 0;
  margin: 0;
}
#app{
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}
ul{
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
  padding: 0;
  &.areas{ 
    white-space: nowrap;
    overflow: auto;
    margin: 0 5px;
  }
  li{
    padding: 0;
    margin: 0;
    width: 150px;
    list-style: none;
    &.subjects-col{
      margin: 0 5px;
      line-height: 60px;
      display: inline-block;
      text-align: center;
    }
    p {
      background: #e3e3e3;
      font-size: 20px;
    }
    &.subject{
      line-height: 80px;
      background: #f8f8f8;
      margin-bottom: 10px;
    }
  }
}
// subjects-col
</style>
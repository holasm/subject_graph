<template lang=pug>
.container
  #search-group 
    input.search(type="text")
    input.group-name(type="text")
    .button(@click="saveAllSelected") SaveAllSelected
  table
    tr
      th #
      th Code
      th Name
      th Group Name
      th Edit
      th Saved
    tr(v-if="subjects.length", v-for='(subject, index) in subjects')
      td {{subject.id}}
      td {{subject.code}}
      td {{subject.name}}
      td
        v-select(:options="options", :index="index", :group="subject.groupName")
      td
        .button(@click="saveGroup(index)") Save
      td
        span(v-show="subject.done") done
        span(v-show="!subject.done") Not set
</template>

<script>
import select from './v-select'
export default {
  name: 'subject',

  data () {
    return {
      subjects: [],
      options: [
        'ML',
        'BigData'
      ]
    }
  },

  components: {
    'v-select': select
  },

  methods: {
    saveAllSelected: function () {
      console.log('subhasis')
    },
    saveGroup: function (index) {
      var subject = this.subjects[index]
      console.log(subject)
      var course = {
        id: subject.id,
        groupName: subject.groupName
      }
      if (subject.groupName && subject.groupName !== undefined && subject.groupName.toString().trim(' ') !== '') {
        this.$http.post('http://localhost:8000/save-group.php', course).then((res) => {
          console.log(res.body)
        }, (res) => {
          console.log(res)
        })
      }
    }
  },

  beforeMount () {
    // GET /someUrl
    this.$http.get('http://localhost:8000/index.php').then((res) => {
      // this.subjects = JSON.parse(res.body)
      console.log(res.body)
    }, (res) => {
      console.log(res)
    })
  },
  mounted () {
    var self = this
    window.bus.$on('option:changed', function (data) {
      if (self.subjects[data.index]) {
        self.subjects[data.index].groupName = data.value
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.container{
  position: relative;
  width: 90%;
  margin: 0 auto;
  padding-top: 16px;
}
.button{
  display: inline-block;
  padding: 4px 10px;
  background: #e3e3e3;
  margin: 0 12px;
  font-size: 15px;
  cursor: pointer;
  user-select: none;
  &:active{
    background: #aaa;
  }
}
table{
  width: 100%;
  border-collapse: collapse;
}
td, td {
  border: 1px solid #e3e3e3;
}
tr{
  height: 40px;
  border: 1;
  td{
    text-align: center;
  }
}
li.list-item{
  display: block;
  width: 100%; 
}
.head{
  float: left; 
  padding: 0 10px;
  height: 50px;
  width: 200px;
}
#search-group {
  background: #f8f8f8;
  height: 60px;
  input[type=text]{
    margin: 13px 12px;
    line-height: 30px;
    top: 50%;
    font-size: 20px;
    padding: 0 8px;
    &.search{
      width: 500px;
    }
    &.group-name{
      width: 200px;
    }
  }
}
</style>
<template lang=pug>
#app
  ul.graph-container
    svg#deps-arrow
      line(v-for='arrow in depsArrow', :x1='arrow.start.x', :y1='arrow.start.y', :x2='arrow.end.x', :y2='arrow.end.y' style='stroke:rgb(255,0,0);stroke-width:2')
      <!-- polygon(points="700,700 650,650 750,650", style="fill:lime;stroke:purple;stroke-width:1") -->
    li.graph-level(v-for='(level, index) in levels')
      ul.level-container
        li(v-for='subject in level', :class='subject.class')
          subject(:subject='subject')
</template>
<!-- subject(:subject='subject') -->

<script>
import subject from './vue-comps/subject'
import $ from './../node_modules/jquery/dist/jquery.min.js'
export default {
  name: 'app',
  components: {
    subject
  },
  data () {
    return {
      data: [],
      dependency: {},
      depsArrow: [],
      levels: [],
      changed: 0
    }
  },

  watch: {
    '$route' (to, from) {
      var groupId = to.path.split('/')
      this.loadData(groupId[1])
    }
  },
  methods: {
    createLevels: function (data, initLevel, levels, processed) {
      data.forEach((el, index) => {
        if (el.pre_req.length === 0) {
          // node prerequisite required
          levels[initLevel] = levels[initLevel] || []
          el.index = index
          el.class = 'subject-' + el.id
          levels[initLevel].push(el)
          processed.push(el.id) // keeps track of processed subjects
        }
      })

      if (levels[initLevel] !== undefined && levels[initLevel].length) {
        // remove processed subjects
        for (var i = levels[initLevel].length - 1; i >= 0; i--) {
          var subject = levels[initLevel][i]
          this.data.splice(subject.index, 1)
        }

        // remove processed subject from pre_req
        this.data.forEach((el1, index) => {
          for (var index2 = el1.pre_req.length - 1; index2 >= 0; index2--) {
            var el2 = el1.pre_req[index2] // pre_req for one subject
            if (processed.indexOf(el2) > -1) {
              this.data[index].pre_req.splice(index2, 1)
            }
          }
        })
      }
    },
    customRender: function () {
      this.$nextTick(function () {
        var left = 0
        var graphLevel = this.$el.querySelectorAll('.graph-level')
        graphLevel.forEach((el, index) => {
          $(el).css({
            left: left + 'px'
          })
          left += 300
        })

        // draw depedency arrow
        // get element position and savein data
        this.depsArrow = []
        if (this.levels.length) {
          var container = this.$el.querySelector('.graph-container').getBoundingClientRect()
          var basis = {
            x: container.left,
            y: container.top
          }
          for (var subject in this.dependency) {
            var sub = this.$el.querySelectorAll('.subject-' + subject)
            if (sub[0]) {
              var el1 = sub[0].getBoundingClientRect()
              var start = {
                x: el1.right - basis.x,
                y: el1.top + el1.height / 2 - basis.y
              }

              this.dependency[subject].deps.forEach((dept) => {
                // find arrow start and end position
                var dep = this.$el.querySelectorAll('.subject-' + dept)
                var el2 = dep[0].getBoundingClientRect()
                var end = {
                  x: el2.left - basis.x,
                  y: el2.top + el2.height / 2 - basis.y
                }
                this.depsArrow.push({start, end})
                // console.log(start, end, sub, dep)
              })
            }
          }
        }
      })
    },
    createGraph: function () {
      var processed = []
      var levels = []
      var levelCount = 0

      // You must check if there is no circular dependency
      // otherwise stop

      // create dependency object for arrow creation
      this.data.forEach((sub) => {
        var arr = sub.pre_req
        var code = sub.id
        if (arr.length !== 0) {
          arr.forEach((dept) => {
            this.dependency[dept] = this.dependency[dept] || {deps: []}
            this.dependency[dept].deps.push(code)
          })
        }
      })
      // console.log(this.dependency)
      var i = 0
      while (this.data.length) {
        if (++i > 10) {
          break
        }
        this.createLevels(this.data, levelCount++, levels, processed)
      }
      console.log(this.levels)
      // now calculate the positions of the subjects
      // find max level height
      // var maxHeight = 0
      // this.levels.forEach((el) => {
      //   maxHeight = maxHeight > el.length ? maxHeight : el.length
      // })

      this.$nextTick(function () {
        this.levels = levels
        this.customRender()
      })
    },
    loadData: function (groupName) {
      this.$http.get('http://localhost:8000/index.php?group_name=' + groupName).then((res) => {
        // console.log(res.body)
        this.data = JSON.parse(res.body)
        this.createGraph()
      }, (res) => {
        console.log(res)
      })
    }
  },
  mounted () {
    var groupName = this.$route.path.split('/')[1]
    this.loadData(groupName)
  }
}
</script>

<style lang=scss>
$canvas-height: 800px;
$canvas-width: 1200px;
body, html{
  margin: 0;
  padding: 0;
}
#app{
  position: absolute;
  width: 100%;
}
#deps-arrow{
  position: absolute;
  height: $canvas-height;
  width: $canvas-width;
}
.graph-container{
  position: relative;
  display: block;
  height: $canvas-height;
  width: $canvas-width;
  background-color: #f8f8f8;
  overflow: auto; 
}
.graph-container, .level-container{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  li.graph-level {
    position: absolute;
    box-sizing: border-box;
    list-style: none;
    width: 200px;
    padding: 0 35px;
    /* line-height: 20px; */
    list-style: none;
    /* float: left; */
    /* background-color: teal; */
  }
}
.level-container{
  li{
    background-color: #e3e3e3;
    padding: 0;
    margin: 0;
    margin: 70px 0;
    padding: 12px 12px;
    /* width: 100%; */
    text-align: center;
    cursor: pointer;
    list-style: none;
  }
}
</style>

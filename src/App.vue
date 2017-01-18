<template lang=pug>
#app
  ul.graph-container
    svg#deps-arrow
      line(v-for="arrow in depsArrow", :x1="arrow.start.x", :y1="arrow.start.y", :x2="arrow.end.x", :y2="arrow.end.y" style="stroke:rgb(255,0,0);stroke-width:2")
    li.graph-level(v-for="(level, index) in levels")
      ul.level-container
        li(v-for="subject in level", :class="subject.code.toLowerCase()")
          subject(:subject="subject")
</template>
<!-- subject(:subject="subject") -->

<script>
import subject from './vue-comps/subject'
import $ from './../node_modules/jquery/dist/jquery.min.js'
export default {
  name: 'app',
  data () {
    var data = [
      {
        name: 'CS2710',
        pre_req: ['CS2713'],
        code: 'CS2710'
      },
      {
        name: 'CS2711',
        pre_req: ['CS2714', 'CS2713'],
        code: 'CS2711'
      },
      {
        name: 'CS2719',
        pre_req: ['CS2714', 'CS2713'],
        code: 'CS2719'
      },
      {
        name: 'CS2725',
        pre_req: ['CS2714', 'CS2713'],
        code: 'CS2725'
      },
      {
        name: 'CS2735',
        pre_req: ['CS2714', 'CS2713'],
        code: 'CS2735'
      },
      {
        name: 'CS2712',
        pre_req: ['CS2711'],
        code: 'CS2712'
      },
      {
        name: 'CS2772',
        pre_req: ['CS2711'],
        code: 'CS2772'
      },
      {
        name: 'CS2773',
        pre_req: ['CS2711'],
        code: 'CS2773'
      },
      {
        name: 'CS2774',
        pre_req: ['CS2711'],
        code: 'CS2774'
      },
      {
        name: 'CS2758',
        pre_req: ['CS2711'],
        code: 'CS2758'
      },
      {
        name: 'CS2713',
        pre_req: [],
        code: 'CS2713'
      },
      {
        name: 'CS2763',
        pre_req: [],
        code: 'CS2763'
      },
      {
        name: 'CS2764',
        pre_req: [],
        code: 'CS2764'
      },
      {
        name: 'CS2769',
        pre_req: [],
        code: 'CS2769'
      },
      {
        name: 'CS2714',
        pre_req: ['CS2715'],
        code: 'CS2714'
      },
      {
        name: 'CS2755',
        pre_req: ['CS2715'],
        code: 'CS2755'
      },
      {
        name: 'CS2751',
        pre_req: ['CS2715'],
        code: 'CS2751'
      },
      {
        name: 'CS2752',
        pre_req: ['CS2715'],
        code: 'CS2752'
      },
      {
        name: 'CS2715',
        pre_req: [],
        code: 'CS2715'
      },
      {
        name: 'CS2786',
        pre_req: ['CS2712'],
        code: 'CS2786'
      },
      {
        name: 'CS2787',
        pre_req: ['CS2712'],
        code: 'CS2787'
      },
      {
        name: 'CS2788',
        pre_req: ['CS2712'],
        code: 'CS2788'
      },
      {
        name: 'CS2789',
        pre_req: ['CS2712'],
        code: 'CS2789'
      }
    ]
    return {
      data,
      dependency: {},
      depsArrow: [],
      levels: [],
      changed: 0
    }
  },
  components: {
    subject
  },
  methods: {
    createLevels: function (data, initLevel, levels, processed) {
      var processdData = data
      processdData.forEach((el, index) => {
        if (el.pre_req.length === 0) {
          // node prerequisite required
          levels[initLevel] = levels[initLevel] || []
          el.index = index
          levels[initLevel].push(el)
          processed.push(el.code.toLowerCase())
        }
      })

      if (levels[initLevel] !== undefined && levels[initLevel].length) {
        levels[initLevel].sort(function (a, b) {
          return a.index > b.index
        })
        for (var i = levels[initLevel].length - 1; i >= 0; i--) {
          // console.log(i)
          var subject = levels[initLevel][i]
          this.data.splice(subject.index, 1)
        }
        this.data.forEach((el1, index) => {
          for (var index2 = el1.pre_req.length - 1; index2 >= 0; index2--) {
            var el2 = el1.pre_req[index2]
            if (processed.indexOf(el2.toLowerCase()) > -1) {
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
          left += 200
        })

        // draw depedency arrow
        // get element position and savein data
        // this.depsArrow = []
        var container = this.$el.querySelector('.graph-container').getBoundingClientRect()
        var basis = {
          x: container.left,
          y: container.top
        }
        for (var subject in this.dependency) {
          var sub = this.$el.querySelectorAll('.' + subject)
          var el1 = sub[0].getBoundingClientRect()
          var start = {
            x: el1.right - basis.x,
            y: el1.top + el1.height / 2 - basis.y
          }

          this.dependency[subject].deps.forEach((dept) => {
            // find arrow start and end position
            var dep = this.$el.querySelectorAll('.' + dept)
            var el2 = dep[0].getBoundingClientRect()
            var end = {
              x: el2.left - basis.x,
              y: el2.top + el2.height / 2 - basis.y
            }
            this.depsArrow.push({start, end})
            // console.log(start, end, sub, dep)
          })
        }
      })
    }
  },

  beforeMount () {
    var processed = []
    var levels = []
    var levelCount = 0

    // You must check if there is no circular dependency
    // otherwise stop

    // create dependency object for arrow creation
    this.data.forEach((sub) => {
      var arr = sub.pre_req
      var code = sub.code.toLowerCase()
      if (arr.length !== 0) {
        arr.forEach((dep1) => {
          var dep = dep1.toLowerCase()
          this.dependency[dep] = this.dependency[dep] || {deps: []}
          this.dependency[dep].deps.push(code)
        })
      }
    })
    // console.log(this.dependency)
    while (this.data.length) {
      this.createLevels(this.data, levelCount++, levels, processed)
    }
    // now calculate the positions of the subjects
    // find max level height
    var maxHeight = 0
    this.levels.forEach((el) => {
      maxHeight = maxHeight > el.length ? maxHeight : el.length
    })
    this.$nextTick(function () {
      this.levels = levels
      this.customRender()
    })
  }
}
</script>

<style lang=scss>
$canvas-height: 800px;
$canvas-width: 1200px;
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

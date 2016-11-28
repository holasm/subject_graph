jQuery(document).ready(function($) {
  var data = {}, graphArr = [];
  var sidebarList = $('ul.list');
  /* Load data from */
  
  // $('.coursetabid').find('tr').each(function(index, el) {
  //   var info = $(el).find('td');
  //   if(info.length) {
  //     var course_name, code, type, pre_req, slot, room, instructor;
  //     code = info[0] && $(info[0]).text();
  //     course_name = info[1] && $(info[1]).text();
  //     type = info[2] && $(info[2]).text();
  //     pre_req = info[3] && $(info[3]).text();
  //     slot = info[4] && $(info[4]).text();
  //     room = info[5] && $(info[5]).text();
  //     instructor = info[6] && $(info[6]).text();
  //     data[code] = {
  //       code: code,
  //       course_name: course_name,
  //       type: type,
  //       pre_req: pre_req,
  //       slot: slot,
  //       room: room,
  //       instructor: instructor
  //     }
  //   }
  // });

  // console.log(JSON.stringify(data));

  data = {  
   "CS1100":{  
      "code":"CS1100",
      "course_name":"Computational Engineering",
      "type":"Core",
      "pre_req":"      ",
      "slot":"F",
      "room":"CRC 101",
      "instructor":"C. Siva Ram Murthy, Meghana Nasre, Rupesh Nasre, Sayan Ranu, B. V. Raghavendra Rao."
   },
   "CS2300":{  
      "code":"CS2300",
      "course_name":"Foundations of Computer Systems Design",
      "type":"Core",
      "pre_req":"CS1200      ",
      "slot":"C",
      "room":"CS 36",
      "instructor":"V. Kamakoti."
   },
   "CS2310":{  
      "code":"CS2310",
      "course_name":"Foundations of Computer Systems Design Lab",
      "type":"Core",
      "pre_req":"CS1200      ",
      "slot":"Q",
      "room":"HWL",
      "instructor":"V. Kamakoti."
   },
   "CS2700":{  
      "code":"CS2700",
      "course_name":"Programming and Data Structures",
      "type":"Core",
      "pre_req":"CS1200      ",
      "slot":"D",
      "room":"CS 36",
      "instructor":"Aritra Hazra."
   },
   "CS2710":{  
      "code":"CS2710",
      "course_name":"Programming and Data Structures Lab",
      "type":"Core",
      "pre_req":"CS1100, CS1200      ",
      "slot":"P",
      "room":"DCF",
      "instructor":"Aritra Hazra."
   },
   "CS3100":{  
      "code":"CS3100",
      "course_name":"Paradigms of Programming",
      "type":"Core",
      "pre_req":"CS2200, CS2600, CS2710, CS2600, CS2700      ",
      "slot":"B",
      "room":"CS 24",
      "instructor":"Rajsekar Manokaran."
   },
   "CS3300_0":{  
      "code":"CS3300_0",
      "course_name":"Compiler Design",
      "type":"Core",
      "pre_req":"CS2200, CS2800, CS2610      ",
      "slot":"",
      "room":"CS 24",
      "instructor":"V. Krishna Nandivada."
   },
   "CS3310_0":{  
      "code":"CS3310_0",
      "course_name":"Compiler Design Lab",
      "type":"Core",
      "pre_req":"      ",
      "slot":"S",
      "room":"DCF",
      "instructor":"V. Krishna Nandivada."
   },
   "CS3500":{  
      "code":"CS3500",
      "course_name":"Operating Systems",
      "type":"Core",
      "pre_req":"CS2800, CS2810, CS2600, CS2610      ",
      "slot":"F",
      "room":"CS 24",
      "instructor":"Chester Rebeiro."
   },
   "CS3510":{  
      "code":"CS3510",
      "course_name":"Operating Systems Lab",
      "type":"Core",
      "pre_req":"      ",
      "slot":"P",
      "room":"SYSL",
      "instructor":"Chester Rebeiro."
   },
   "CS3700":{  
      "code":"CS3700",
      "course_name":"Introduction to Database Systems",
      "type":"Core",
      "pre_req":"      ",
      "slot":"D",
      "room":"CS 24",
      "instructor":"P. Sreenivasa Kumar, D. Janakiram."
   },
   "CS4100":{  
      "code":"CS4100",
      "course_name":"Computer System Design",
      "type":"Core",
      "pre_req":"      ",
      "slot":"G",
      "room":"CS 34",
      "instructor":"Madhu Mutyam."
   },
   "CS4110":{  
      "code":"CS4110",
      "course_name":"Computer System Design Lab",
      "type":"Core",
      "pre_req":"      ",
      "slot":"P",
      "room":"HWL",
      "instructor":"Madhu Mutyam."
   },
   "CS5011":{  
      "code":"CS5011",
      "course_name":"Machine Learning",
      "type":"Elective",
      "pre_req":"      ",
      "slot":"R",
      "room":"CS 24",
      "instructor":"Balaraman Ravindran."
   },
   "CS5710":{  
      "code":"CS5710",
      "course_name":"B.Tech (DD) Project - I",
      "type":"Core",
      "pre_req":"      ",
      "slot":"",
      "room":"",
      "instructor":"John Augustine."
   },
   "CS5800":{  
      "code":"CS5800",
      "course_name":"Advanced Data Structures and Algorithms",
      "type":"Core",
      "pre_req":"      ",
      "slot":"C",
      "room":"CS 34",
      "instructor":"N.S. Narayanaswamy, Anurag Mittal."
   },
   "CS5806":{  
      "code":"CS5806",
      "course_name":"B.Tech (DD) Seminar",
      "type":"Core",
      "pre_req":"      ",
      "slot":"YY",
      "room":"CS 32",
      "instructor":"John Augustine."
   },
   "CS5820":{  
      "code":"CS5820",
      "course_name":"Probability and Computing",
      "type":"Elective",
      "pre_req":"      ",
      "slot":"E",
      "room":"CS34",
      "instructor":"John Augustine."
   },
   "CS5970":{  
      "code":"CS5970",
      "course_name":"M.Tech Seminar",
      "type":"Core",
      "pre_req":"      ",
      "slot":"S",
      "room":"BSB 361",
      "instructor":"Meghana Nasre."
   },
   "CS5990":{  
      "code":"CS5990",
      "course_name":"M.Tech Project - II",
      "type":"Core",
      "pre_req":"      ",
      "slot":"",
      "room":"",
      "instructor":"Jayalal Sarma."
   },
   "CS6014":{  
      "code":"CS6014",
      "course_name":"Computability and Complexity",
      "type":"Elective",
      "pre_req":"      ",
      "slot":"A",
      "room":"CS 34",
      "instructor":"Jayalal Sarma."
   },
   "CS6015":{  
      "code":"CS6015",
      "course_name":"Linear Algebra and Random Processes",
      "type":"Core",
      "pre_req":"      ",
      "slot":"B",
      "room":"CS 36",
      "instructor":"Hema A. Murthy."
   },
   "CS6030":{  
      "code":"CS6030",
      "course_name":"Logic and Combinatorics for Computer Science",
      "type":"Core",
      "pre_req":"      ",
      "slot":"D",
      "room":"CS 26",
      "instructor":"Jayalal Sarma."
   },
   "CS6040":{  
      "code":"CS6040",
      "course_name":"Router Architectures and Algorithms",
      "type":"Elective",
      "pre_req":"CS3200",
      "slot":"F",
      "room":"CS34",
      "instructor":"Krishna Moorthy Sivalingam."
   },
   "CS6111":{  
      "code":"CS6111",
      "course_name":"Foundations of Cryptography",
      "type":"Elective",
      "pre_req":"      ",
      "slot":"R",
      "room":"CS27",
      "instructor":"Rajsekar Manokaran, C. Pandu Rangan."
   },
   "CS6120":{  
      "code":"CS6120",
      "course_name":"Wireless Communication and Networks",
      "type":"Elective",
      "pre_req":"      ",
      "slot":"B",
      "room":"CS 26",
      "instructor":"C. Siva Ram Murthy."
   },
   "CS6140":{  
      "code":"CS6140",
      "course_name":"Advanced Programming Lab",
      "type":"Elective",
      "pre_req":"      ",
      "slot":"Q",
      "room":"DCF",
      "instructor":"Anurag Mittal."
   },
   "CS6230":{  
      "code":"CS6230",
      "course_name":"CAD for VLSI",
      "type":"Elective",
      "pre_req":"      ",
      "slot":"R",
      "room":"CS 34",
      "instructor":"V. Kamakoti."
   },
   "CS6370":{  
      "code":"CS6370",
      "course_name":"Natural Language Processing",
      "type":"Elective",
      "pre_req":"      ",
      "slot":"A",
      "room":"CS 36",
      "instructor":"Sutanu Chakraborti."
   },
   "CS6380":{  
      "code":"CS6380",
      "course_name":"Artificial Intelligence",
      "type":"Elective",
      "pre_req":"      ",
      "slot":"E",
      "room":"CS 26",
      "instructor":"Deepak Khemani."
   },
   "CS6600":{  
      "code":"CS6600",
      "course_name":"Computer Architecture",
      "type":"Elective",
      "pre_req":"      ",
      "slot":"R",
      "room":"CS 36",
      "instructor":"Madhu Mutyam."
   },
   "CS6690":{  
      "code":"CS6690",
      "course_name":"Pattern Recognition",
      "type":"Elective",
      "pre_req":"      ",
      "slot":"R",
      "room":"CS 26",
      "instructor":"Hema A. Murthy, C. Chandra Sekhar."
   },
   "CS6740":{  
      "code":"CS6740",
      "course_name":"Searching and Indexing in Big Data Sets",
      "type":"Elective",
      "pre_req":"      ",
      "slot":"A",
      "room":"CS 24",
      "instructor":"Sayan Ranu."
   },
   "CS6777":{  
      "code":"CS6777",
      "course_name":"Optimization Methods for Computer Vision Applications",
      "type":"Elective",
      "pre_req":"      ",
      "slot":"D",
      "room":"CS 34",
      "instructor":"Sukhendu Das."
   },
   "CS6842":{  
      "code":"CS6842",
      "course_name":"Algorithmic Algebra",
      "type":"Elective",
      "pre_req":"      ",
      "slot":"B",
      "room":"CS 34",
      "instructor":"B. V. Raghavendra Rao."
   },
   "CS6999":{  
      "code":"CS6999",
      "course_name":"Special Topics in Computer Science and Engineering - I",
      "type":"Core",
      "pre_req":"      ",
      "slot":"",
      "room":"",
      "instructor":"N.S. Narayanaswamy."
   },
   "CS7011":{  
      "code":"CS7011",
      "course_name":"Topics in Reinforcement Learning",
      "type":"Elective",
      "pre_req":"CS6700      ",
      "slot":"D",
      "room":"CS36",
      "instructor":"Balaraman Ravindran."
   },
   "CS7999":{  
      "code":"CS7999",
      "course_name":"Special Topics in Computer Science and Engineering - II",
      "type":"Core",
      "pre_req":"      ",
      "slot":"",
      "room":"",
      "instructor":"N.S. Narayanaswamy."
   }
  };

  // clean the pre requisites
  for(var key in data){
    var el = data[key];
    var arr = el.pre_req.replace(/\s+/g, '').split(',');
    arr[0] == '' ? data[key].pre_req = [] : data[key].pre_req = arr;
    el.visibleInList = 1;
  }

  window.dd = data;

  Object.keys(data).forEach(function(val, index) {
    graphArr[index] = data[val];
  });
  

  for(var key in data){
    var el = data[key];
    if(el.visibleInList) {
      var str = '<li class="item"> ' + 
                '<div class="code">'+ el.code +'</div>' +
                '<div class="name">' + el.course_name + '</div>' +
                '</li>';
      sidebarList.append(str);
    }
  }
  // console.log(Object.keys(data).length)

  var svg = d3.select("#graph");
  var circle = svg.selectAll("div")
    .data(graphArr);

  var circleEnter = circle.enter().append("div").attr('class', 'course-circle');

  circleEnter.append("div").append("div")
    .attr('class', function (course) {
      return 'inner ' + course.code + ' gray'
    })
      .append("span").text(function(course, index) { return course.code; });


  /**
   *
   * Event listeners
   *
   */
  
  $('.inner').mouseover(function(event) {
    $('.inner').addClass('secondary');
    $(event.currentTarget).addClass('up-4').removeClass('secondary');

    // update prequisites
    upgradeRelated($(event.currentTarget).find('span').text());

    // update dependents

  });

  $('.inner').mouseout(function(event) {
    $('.inner').removeClass('secondary');
    $(event.currentTarget).removeClass('up-4');
    // update prequisites
    degradeRelated($(event.currentTarget).find('span').text());
  });

  function degradeRelated(course_code) {
    preReqEdges.forEach((el) => {
      // console.log(el)
      for(var k in el){
        $('.' + k).addClass('gray').removeClass('up-2').removeClass('light-orange').removeClass('secondary');
        $('.' + el[k]).addClass('gray').removeClass('up-2').removeClass('light-orange').removeClass('secondary');
      }
    })
    dependent.forEach((el) => {
      // console.log(el)
      for(var k in el){
        $('.' + k).addClass('gray').removeClass('up-2').removeClass('light-green').removeClass('secondary');
        $('.' + el[k]).addClass('gray').removeClass('up-2').removeClass('light-green').removeClass('secondary');
      }
    })
    // update the vertices
    preReqEdges = [];
    dependent = [];
  }

  var preReqEdges = [];
  var dependent = [];
  function upgradeRelated(course_code) {
    getPreReqEdges(course_code);
    getDependentEdges(course_code);
    // console.log(preReqEdges)
    // console.log('-----')
    // console.log(dependent)
    // update the vertices

    // make all the pre req orange
    preReqEdges.forEach((el) => {
      for(var k in el){
        console.log(k, '->', el[k]);
        $('.' + k).addClass('up-2').addClass('light-orange').removeClass('secondary gray');
        $('.' + el[k]).addClass('up-2').removeClass('secondary gray');

        // add arrow
        
      }
    })

    // make all dependent green
    dependent.forEach((el) => {
      for(var k in el){
        console.log(k, '<-', el[k]);
        $('.' + k).addClass('up-2').removeClass('secondary gray');
        $('.' + el[k]).addClass('up-2').addClass('light-green').removeClass('secondary gray');
      }
    })
    $('.' + course_code).addClass('gray');
    console.log('--------')
  }

  function getPreReqEdges(course_code) {
    var course = data[course_code];
    if (course) {
      var pre_req = course.pre_req;
      if (pre_req.length !== 0) {
        pre_req.forEach((el) => {
          var temp = {};
          temp[el] = course_code;
          preReqEdges.push(temp);
          getPreReqEdges(el)
        })
      }
    }
  }

  function getDependentEdges(course_code) {
    for (var key in data) {
      var el = data[key];
      if(el.pre_req.indexOf(course_code) != -1) {
        var temp = {};
        temp[course_code] = el.code;
        dependent.push(temp);
        getDependentEdges(el);
      }
    }
  }
  // console.log(JSON.stringify(data));

});

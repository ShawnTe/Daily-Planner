$(document).ready(function(){

  draggableBoxes();
  resizableBoxes();
  showNewTodoForm();
  // var doneStructuring = false
  $("#btn-structure").on('click', function() {showTodoLists();});

});

var draggableBoxes = function(){
  $(".box").draggable({
    axis: "y",
    containment: "parent",
    grid: [0, 15],
    opacity: 0.5
  });
};

var resizableBoxes = function(){
  $(".box").resizable({
    grid: [0, 25],
    maxHeight: 400,
    maxWidth: 350,
    minHeight: 25,
    minWidth: 350,
  });
}

var showTodoLists = function(){

    $(".high").on('click', function(){
      $("#medium").hide();
      $("#low").hide();
      $("#high").toggle();
    });

    $(".medium").on('click', function(){
      $("#high").hide();
      $("#low").hide();
      $("#medium").toggle();
    })

    $(".low").on('click', function(){
    $("#low").toggle();
    $("#high").hide();
    $("#medium").hide();
    })
 }
    // alert("I'm in med click")
  // $(".todo-completed").change(function()  {
  //   console.log($(this).attr("name"))
    // debugger
    // var url = '/todos/'
  // })

var showNewTodoForm = function() {
  $("#dialog").dialog({
      autoOpen: false,
      minHeight: 250,
      position: {
                  my: "right center",
                  at: "right center"
               }
    });
  $("#button").on('click', function(){
    event.preventDefault();
    $("#dialog").dialog("open");
  });
};


  //   $.ajax({
  //     // url: url,
  //     // type: "PUT"

  //   })
  // } else {

  // }

// click to clear checked items



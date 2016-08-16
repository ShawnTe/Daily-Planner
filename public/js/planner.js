$(document).ready(function(){

  hideNotesSection();
  draggableBoxes();
  resizableBoxes();
  showNewTodoForm();
  // var doneStructuring = false
  $("#btn-structure").on('click', function() {showTodoLists();});
  submitNewTodo();
  showNotes();
});

var hideNotesSection = function() {
  $("#focus-todo").hide();
}

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
    grid: [0, 15],
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
    $("#showTodoForm").on('click', function(event) {
      event.preventDefault();
      $("#dialog").show();
      $("#showTodos").append($("#dialog"))
    })
  }

  var submitNewTodo = function() {
    $("#dialog").on('submit', function(event) {
      event.preventDefault();
      var url = $(this).children().attr("action");
      var formData = $("#new-todo-form").serialize();
        // $("#new-todo-form").reset();
        $('#new-todo-form').find('input:text').val('');
      $.ajax({
        url: url,
        method: "POST",
        data: formData
      })
      .done(function(server_response) {
        var task = JSON.parse(server_response)
        if (task.brainjuice_id == 1) {
         $( "ul#high li" ).first().prepend(
          "<li><input type='checkbox' name=" + task.id +
          " class='todo-completed'>(" + task.time_est + ") <em>min</em>  " + task.name + "</li>" );

        } else if (task.brainjuice_id ==2) {
            $( "ul#medium li" ).first().prepend(
              "<li><input type='checkbox' name=" + task.id +
              " class='todo-completed'>(" + task.time_est + ") <em>min</em>  " + task.name + "</li>" );
        } else {
            $( "ul#low li" ).first().prepend(
              "<li><input type='checkbox' name=" + task.id +
              " class='todo-completed'>(" + task.time_est + ") <em>min</em>  " + task.name + "</li>" );
        }
      })
      .fail(function(server_response) {
        alert(server_response.error)
      })
    })
  }




  var showNotes = function(){
    $("#showTodos a").on('click', function(){
      event.preventDefault();
      var url = $(this).val("href").attr("href")

      $.ajax({
        url:  url,
        // method: "GET"
      })
// debugger
      .done(function(response) {
        var task = JSON.parse(response)
        $("textarea").text(task.notes)
        $("#focus-todo label").text(task.name)
      })
    })
  }

// Pops up jqueryui dialog box. I don't like how it looks:
// var showNewTodoForm = function() {
//   $("#dialog").dialog({
//       autoOpen: false,
//       minHeight: 250,
//       position: {
//                   my: "right center",
//                   at: "right center"
//                }
//     });
//   $("#button").on('click', function(){
//     event.preventDefault();
//     $("#dialog").dialog("open");
//   });
// };




// click to clear checked items



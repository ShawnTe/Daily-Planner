$(document).ready(function(){

  hideNotesSection();
  draggableBoxes();
  resizableBoxes();
  showNewTodoForm();
  doneStructuringDay();
  submitNewTodo();
  showNotes();
  editNotes();
});

var hideNotesSection = function() {
  $("#focus-todo").hide();
}

var draggableBoxes = function(){
  $(".box").draggable({
    axis: "y",
    containment: "parent",
    grid: [0, 15],
    opacity: 0.5,
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

var showNewTodoForm = function() {
  $("#showTodoForm").on('click', function(event) {
    event.preventDefault();
    $("#dialog").show();
    $("#showTodos").append($("#dialog"))
  })
}

var doneStructuringDay = function(){
  $("#btn-structure").on('click', function() {
    showTodoLists();
    $(this).hide();
  });
}

var submitNewTodo = function() {
  $("#dialog").on('submit', function(event) {
    event.preventDefault();
    var url = $(this).children().attr("action");
    var formData = $("#new-todo-form").serialize();
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
        "<li>(" + task.time_est + " <em>min</em>) <a href=\"/todos/" + task.id + "/edit\"> &nbsp;" + task.name + "</a></li>" );
      } else if (task.brainjuice_id ==2) {
        $( "ul#medium li" ).first().prepend(
         "<li>(" + task.time_est + " <em>min</em>) <a href=\"/todos/" + task.id + "/edit\"> &nbsp;" + task.name + "</a></li>" );
      } else {
        $( "ul#low li" ).first().prepend(
          "<li>(" + task.time_est + " <em>min</em>) <a href=\"/todos/" + task.id + "/edit\"> &nbsp;" + task.name + "</a></li>" );
      }
    })
  .fail(function(server_response) {
      alert(server_response.error)
    })
  })
}

var showNotes = function(){
  $("#showTodos").on('click', 'a', function(){
    event.preventDefault();
    var url = $(this).val("href").attr("href")
    $.ajax({
      url:  url,
    })
    .done(function(server_response) {
      var edit_form = JSON.parse(server_response)
      $("#edit-form").empty().append(edit_form)
      $("#edit-form").show();
    })
    .fail(function(server_response) {
      alert(server_response.error)
    })
  })
}

var editNotes = function() {
  $("#edit-form").on('submit', function(event) {
    var todo_id = $("#edit-form form").attr("id")

    event.preventDefault();
    var url = $("#edit-form form").attr("action");
    var todo_id = $("#edit-form form").attr("id")
    var formData = $("#edit-form form").serialize();
  var whatFunctionIsThis = function() {
    console.log("What to do here?")
  }
      $.ajax({
        url: url,
        data: formData,
        method: "PUT"
      })
      .done(function(a, b, c) {
        whatFunctionIsThis(a, b, c, todo_id)
        $("#edit-form").hide();
        revised_todo = JSON.parse(a)
        if (revised_todo.completed == true) {
          $("[id = " + todo_id + " ]").parent().hide()
        }
      })
      .fail(function(server_response) {
        console.log(errThrown)
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



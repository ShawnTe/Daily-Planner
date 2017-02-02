$(document).ready(function(){

  $("#showTodoForm").hide()
  $(".second-step-flex").hide()
  $(".third-step-flex").hide()
  hideNotesSection();
  draggableBoxes();
  resizableBoxes();
  doneStructuringDay();
  showNewTodoForm();
  submitNewTodo();
  doneEnteringTodos();
  showDetails();
  // saveChanges();
  // editNotes();
  showTodoLists();
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

var doneStructuringDay = function(){
  $("#one").on('click', function() {
    console.log("I clicked first button. Done with structuring day.")
    $(".first-step-flex").hide()
    $(".second-step-flex").show()
    $("#dialog").show();
    $("#showTodos").append($("#dialog"))
  });
}

$(document).on('click','#two',function(){
     console.log("Woot!! Got #2")
     $("#new-todo-form").hide()
     $(".second-step-flex").hide()
     $(".third-step-flex").show()
})

$(document).on('click','#three',function(){
     console.log("Woot!! Got #3")
     $(".third-step-flex").hide()
})

// document.getElementById("col-two").addEventListener("dblclick",function(e) {
// 	// e.target was the clicked element
//   if (e.target && e.target.matches("a.classA")) {
//     console.log("Anchor element clicked!");
// 	}
// });

var showTodoLists = function(){
 $(".high").on('dblclick', function(){
   console.log("Double clicked High BJ")
   $("#medium").hide();
   $("#low").hide();
   $("#high").toggle();
 });
 $(".medium").on('dblclick', function(){
   $("#high").hide();
   $("#low").hide();
   $("#medium").toggle();
 })
 $(".low").on('dblclick', function(){
   $("#low").toggle();
   $("#high").hide();
   $("#medium").hide();
 })
}

var showNewTodoForm = function() {
  $("#showTodoForm").on('click', function(event) {
    event.preventDefault();
    console.log("in ShowNewTodoForm")
    $("#dialog").show();
    $("#showTodos").append($("#dialog"))
    $(this).hide();
  })
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
      $("#todo-done-btn").show();
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

var doneEnteringTodos = function() {
  $("#todo-done-btn").on('click', function() {
    $(this).hide();
    $("#new-todo-form").hide();
  })
}

var showDetails = function(){
  $("#showTodos").on('click', 'a', function(){
    event.preventDefault();
    console.log("in the showDetails function")
    var url = $(this).val("href").attr("href")
    $.ajax({
      url:  url,
    })
    .done(function(server_response) {
      var edit_form = JSON.parse(server_response)
      $("#edit-form").empty().append(edit_form)
      $("#edit-form").show();
      // Still todo: add active to the right drop downs
    })
    .fail(function(server_response) {
      alert(server_response.error)
    })
  })
}

$(document).on('click','#submit-edits-btn', function(){   // This is picking up
     console.log("Woot!! Got submit-edits-btn")
     saveChanges();
    //  debugger
    //  $(".third-step-flex").hide()
})

var saveChanges = function() {
  // $("#submit-edits-btn").on('submit', 'form', function(event) {   // this must not be picking up
    event.preventDefault();
    console.log("in the saveChanges function")    // not showing in console
    console.log(event)
    var url = $("#edit-form form").attr("action");
    var todo_id = $("#edit-form form").attr("id")
    var formData = $("#edit-form form").serialize();
    console.log(formData)
    debugger
    var whatFunctionIsThis = function() {
      console.log("What to do here?")
  }
    $.ajax({
      url: url,
      data: formData,
      method: "PUT"
    })
    .done(function(a, b, c) {
      console.log("in the done part of saveChanges")
      whatFunctionIsThis(a, b, c, todo_id)
      $("#edit-form").hide();
      revised_todo = JSON.parse(a)
      console.log(revised_todo + "Next: update the list item with Ajax")
      if (revised_todo.completed == true) {
        $("[id = " + todo_id + " ]").parent().hide()
      }
    })
    .fail(function(server_response) {
      console.log(errThrown)
    })
  // })
}

// var editNotes = function() {
//   $("#edit-form").on('submit', function(event) {
//     console.log("in the editNotes function")
//     event.preventDefault();
//     var url = $("#edit-form form").attr("action");
//     var todo_id = $("#edit-form form").attr("id")
//     var formData = $("#edit-form form").serialize();
//     var whatFunctionIsThis = function() {
//       console.log("What to do here?")
//   }
//     $.ajax({
//       url: url,
//       data: formData,
//       method: "PUT"
//     })
//     .done(function(a, b, c) {
//       console.log("in the done part of editNotes")
//       whatFunctionIsThis(a, b, c, todo_id)
//       $("#edit-form").hide();
//       revised_todo = JSON.parse(a)
//       console.log(revised_todo + "Next: update the list item with Ajax")
//       if (revised_todo.completed == true) {
//         $("[id = " + todo_id + " ]").parent().hide()
//       }
//     })
//     .fail(function(server_response) {
//       console.log(errThrown)
//     })
//   })
// }





















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

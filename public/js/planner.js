$(document).ready(function(){
  hideNotesSection();
  draggableBoxes();
  resizableBoxes();
  doneStructuringDay();
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
    console.log("Clicked first button. Done with structuring day.")
    $(".first-step-flex").addClass("hidden");
    $(".second-step-flex").removeClass("hidden");
    $("#showTodoForm").removeClass("hidden");
  });
}

$(document).on('click','#two',function(){
     console.log("Woot!! Got #2")
     $("#showTodoForm").addClass("hidden");
     $(".second-step-flex").addClass("hidden");
     $(".third-step-flex").removeClass("hidden");
})

$(document).on('click','#three',function(){
     console.log("Woot!! Got #3")
     $(".third-step-flex").addClass("hidden");
})

var showTodoLists = function(){
 $(".high").on('dblclick', function(){
   console.log("Double clicked High BJ")
   $("#linkToShowTodoForm").removeClass("hidden")
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

$(document).on('click','#completed-the-thing',function(){
     console.log("Got the clickie box of doneness")
     var url = $(this).attr("action")
     $.ajax({
       url: url,
       method: "PUT"
     })
     .done(function(server_response) {
       console.log("Why is the whole list disappearing?")
       debugger
     })
     .fail(function(server_response) {
         alert(server_response.error)
       })
})

$(document).on('click','#linkToShowTodoForm', function(){
    event.preventDefault();
    console.log("in ShowNewTodoForm");
    $("#showTodoForm").removeClass("hidden");
    $(this).addClass("hidden");
})

$(document).on('click','#new-todo-btn', function(){
    event.preventDefault();
    $("#new-todo-btn").removeClass("success")

    var url = $(this).children().attr("action");
    var formData = $("#new-todo-form").serialize();
    $.ajax({
      url: url,
      method: "POST",
      data: formData
    })
    .done(function(server_response) {
      var task = JSON.parse(server_response)
      $("#new-todo-btn").addClass("success")
      $('#new-todo-form').find('input:text').val('');
      $('#new-todo-form').find('textarea').val('');
      // $("#new-todo-btn").removeClass("success")

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

$(document).on('click','#todo-done-btn', function(){
    $("#showTodoForm").addClass("hidden");
  })

$(document).on('click','#showDetails', function(){   // This is picking up
     console.log("Woot!! Got showDetails button")
     event.preventDefault();
     var url = $(this).val("href").attr("href")
     console.log(this)
     console.log(this.parent)
     $.ajax({
       url:  url,
     })
     .done(function(server_response) {
       var edit_form = JSON.parse(server_response);
       $(".second-step-flex").hide();
       $(".third-step-flex").hide();
       $("#edit-form").empty().append(edit_form);
       $("#edit-form").show();
     })
     .fail(function(server_response) {
       alert(server_response.error)
     })
})

var showDetails = function(){
  // $("#showTodos").on('click', 'a', function(){
  // event.preventDefault();
    console.log("in the showDetails function")
  // })
}

$(document).on('click','#submit-edits-btn', function(){   // This is picking up
     console.log("Woot!! Got submit-edits-btn")
     saveChanges();
    //  debugger
    //  $(".third-step-flex").hide()
})

var saveChanges = function() {
  // $("#showTodos").on('submit', 'form', function() {           // this must not be picking up
    event.preventDefault();
    console.log("in the saveChanges function")
    console.log(event)
    var url = $("#edit-form form").attr("action");
    var todo_id = $("#edit-form form").attr("id")
    var formData = $("#edit-form form").serialize();
    console.log(formData)
  //   var whatFunctionIsThis = function() {
  //     console.log("What to do here?")
  // }
    $.ajax({
      url: url,
      data: formData,
      method: "PUT"
    })
    .done(function(a, b, c) {
      console.log("in the done part of saveChanges")
      // whatFunctionIsThis(a, b, c, todo_id)
      $("#edit-form").hide();
      revised_todo = JSON.parse(a)
      console.log ("revised_todo:")
      console.log(revised_todo)
      debugger

      if (revised_todo.completed == true) {
        $("[id = " + revised_id + " ]").parent().hide()
      }
      var liOfItem = $(revised_todo.id)
      // if (revised_todo.id == liOfItem) {
      //   $("[id = " + revised_id + " ]").parent().hide()
      // }
      // debugger
    })
    .fail(function(server_response) {
      console.log(errThrown)
      console.log(server_response)
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





















// Pops up jqueryui showTodoForm box. I don't like how it looks:
// var showNewTodoForm = function() {
//   $("#showTodoForm").showTodoForm({
//       autoOpen: false,
//       minHeight: 250,
//       position: {
//                   my: "right center",
//                   at: "right center"
//                }
//     });
//   $("#button").on('click', function(){
//     event.preventDefault();
//     $("#showTodoForm").showTodoForm("open");
//   });
// };

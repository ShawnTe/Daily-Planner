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
   $("#linkToShowTodoForm").removeClass("hidden")
   $("#medium").hide();
   $("#low").hide();
   $("#high").toggle();
 });
 $(".medium").on('dblclick', function(){
   $("#linkToShowTodoForm").removeClass("hidden")
   $("#high").hide();
   $("#low").hide();
   $("#medium").toggle();
 })
 $(".low").on('dblclick', function(){
   $("#linkToShowTodoForm").removeClass("hidden")
   $("#low").toggle();
   $("#high").hide();
   $("#medium").hide();
 })
}

$(document).on('click','#completed-the-thing',function(){
   event.preventDefault();
   console.log("Got the clickie box of doneness")
   var url = $(this).attr("action")
   console.log(url)
   var formData = $(this).serialize();
   $.ajax({
     url: url,
     method: "PUT",
     data: formData
   })
   .done(function(server_response) {
     var todo = JSON.parse(server_response)
     $("#todo-" + todo.id).hide();
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
    console.log(formData)
    $.ajax({
      url: url,
      method: "POST",
      data: formData
    })
    .done(function(server_response) {
      var task = JSON.parse(server_response)
      console.log(task)
      $("#new-todo-btn").addClass("success")
      $('#new-todo-form').find('input:text').val('');
      $('#new-todo-form').find('textarea').val('');
      if (task.brainjuice_id == 1) {
       $( "ul#high li" ).first().before(
          "<li id=\"todo-" + task.id + "\">(" + task.time_est + " <em>min</em>) &nbsp <form class=\"inline\" action=\"/todos/" + task.id + "\" method=\"post\" id=\"completed-the-thing\"><input type=\"hidden\" name=\"_method\" value=\"PUT\"><i class=\"fa fa-square-o\" aria-hidden=\"true\"></i></form><a href=\"/todos/" + task.id + "/edit\" id=\"showDetails\"> &nbsp;" + task.name + "</a></li>" );
      } else if (task.brainjuice_id ==2) {
        $( "ul#medium li" ).first().before(
          "<li id=\"todo-" + task.id + "\">(" + task.time_est + " <em>min</em>) &nbsp <form class=\"inline\" action=\"/todos/" + task.id + "\" method=\"post\" id=\"completed-the-thing\"><input type=\"hidden\" name=\"_method\" value=\"PUT\"><i class=\"fa fa-square-o\" aria-hidden=\"true\"></i></form><a href=\"/todos/" + task.id + "/edit\" id=\"showDetails\"> &nbsp;" + task.name + "</a></li>" );
      } else {
        $( "ul#low li" ).first().before(
          "<li id=\"todo-" + task.id + "\">(" + task.time_est + " <em>min</em>) &nbsp <form class=\"inline\" action=\"/todos/" + task.id + "\" method=\"post\" id=\"completed-the-thing\"><input type=\"hidden\" name=\"_method\" value=\"PUT\"><i class=\"fa fa-square-o\" aria-hidden=\"true\"></i></form><a href=\"/todos/" + task.id + "/edit\" id=\"showDetails\"> &nbsp;" + task.name + "</a></li>" );
      }
    })
  .fail(function(server_response) {
      alert(server_response.error)
    })
})

$(document).on('click','#todo-done-btn', function(){
    $("#showTodoForm").addClass("hidden");
  })

$(document).on('click','#showDetails', function(){
     console.log("Woot!! Got showDetails button")
     event.preventDefault();
     var url = $(this).val("href").attr("href")
     $.ajax({
       url:  url,
     })
     .done(function(server_response) {
       var edit_form = JSON.parse(server_response);
       console.log("Should be showing in 1 which is hidden");
       $(".first-step-flex").addClass("hidden")
       $(".second-step-flex").addClass("hidden")
       $(".third-step-flex").addClass("hidden")
      //  $("#edit-form").removeClass("hidden");
       $("#edit-form").show();
       $("#edit-form").empty().append(edit_form);
     })
     .fail(function(server_response) {
       alert(server_response.error)
     })
})

$(document).on('click','#submit-edits-btn', function(){   // This is picking up
     console.log("Woot!! Got submit-edits-btn")
     saveChanges();
})

var saveChanges = function() {
    event.preventDefault();
    console.log("in the saveChanges function")
    var url = $("#edit-form form").attr("action");
    var todo_id = $("#edit-form form").attr("id")
    var formData = $("#edit-form form").serialize();
    // console.log(formData)
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
      console.log ("revised_todo id:")
      console.log(revised_todo.id)
      console.log($("#todo-" + revised_todo.id))
      $("#todo-" + revised_todo.id).remove();

      if (revised_todo.brainjuice_id == 1) {
        $( "ul#high li" ).first().before(
          "<li id=\"todo-" + revised_todo.id + "\">(" + revised_todo.time_est + " <em>min</em>) &nbsp <form class=\"inline\" action=\"/todos/" + revised_todo.id + "\" method=\"post\" id=\"completed-the-thing\"><input type=\"hidden\" name=\"_method\" value=\"PUT\"><i class=\"fa fa-square-o\" aria-hidden=\"true\"></i></form><a href=\"/todos/" + revised_todo.id + "/edit\" id=\"showDetails\"> &nbsp;" + revised_todo.name + "</a></li>" );
      } else if (revised_todo.brainjuice_id ==2) {
        $( "ul#medium li" ).first().before(
          "<li id=\"todo-" + revised_todo.id + "\">(" + revised_todo.time_est + " <em>min</em>) &nbsp <form class=\"inline\" action=\"/todos/" + revised_todo.id + "\" method=\"post\" id=\"completed-the-thing\"><input type=\"hidden\" name=\"_method\" value=\"PUT\"><i class=\"fa fa-square-o\" aria-hidden=\"true\"></i></form><a href=\"/todos/" + revised_todo.id + "/edit\" id=\"showDetails\"> &nbsp;" + revised_todo.name + "</a></li>" );
      } else {
        $( "ul#low li" ).first().before(
          "<li id=\"todo-" + revised_todo.id + "\">(" + revised_todo.time_est + " <em>min</em>) &nbsp <form class=\"inline\" action=\"/todos/" + revised_todo.id + "\" method=\"post\" id=\"completed-the-thing\"><input type=\"hidden\" name=\"_method\" value=\"PUT\"><i class=\"fa fa-square-o\" aria-hidden=\"true\"></i></form><a href=\"/todos/" + revised_todo.id + "/edit\" id=\"showDetails\"> &nbsp;" + revised_todo.name + "</a></li>" );
      }
      // NEED TO REFACTOR
    })
    .fail(function(server_response) {
      console.log(server_response)
    })
}

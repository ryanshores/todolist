$(document).ready(function(){
	
	$.getJSON("/api/todos")
	.then(addTodos)
	.catch(function(err){
		console.log(err);
	});

	$("#todoInput").keypress(function(event){
		if(event.which == 13){
			// create todo
			createTodo();
		}
	});

	$(".list").on("click", "span", function(e){
		e.stopPropagation();
		var todoToRemove = $(this).parent();
		removeTodo(todoToRemove);
	})

	$(".list").on("click", "li", function(event){
		updateTodo($(this));
	})
});

function addTodos(todos){
	// add todos to page here
	todos.forEach(function(todo){
		addTodo(todo);
	});
}

function addTodo(todo){
	var newTodo = $("<li class='task'>" + todo.name + "<span>X</span></li>");
	newTodo.data('id', todo._id);
	newTodo.data('completed', todo.completed);
	if(todo.completed){
		newTodo.addClass("done");
	}
	$(".list").append(newTodo);
}

function createTodo(){
	// send request to create new todo
	var userInput = $("#todoInput").val();
	$.post("/api/todos", {name: userInput})
	.then(function(newTodo){
		addTodo(newTodo);
		$("#todoInput").val("")
	})
	.catch(function(err){
		console.log(err);
	});
}

function removeTodo(todo){
	// send request to remove todo and then remove it from the screen
	var deleteURL = "/api/todos/" + todo.data("id");
	$.ajax({
		method: "DELETE",
		url: deleteURL
	})
	.then(function(data){
		todo.remove();
	})
	.catch(function(err){
		console.log(err);
	})
}

function updateTodo(todo){
	var putURL = "/api/todos/" + todo.data('id');
	var isDone = !todo.data('completed');
	var updateData = {completed: isDone};
	$.ajax({
		method: "PUT",
		url: putURL,
		data: updateData
	})
	.then(function(updatedTodo){
		todo.toggleClass('done');
		todo.data('completed', isDone);
	})
	.catch(function(err){
		console.log(err);
	})
}



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
});

function addTodos(todos){
	// add todos to page here
	todos.forEach(function(todo){
		addTodo(todo);
	});
}

function addTodo(todo){
	var newTodo = $("<li class='task'>" + todo.name + "</li>");
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
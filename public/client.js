var todoList = {
  
  todos : [],

  addTodo: function (todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  
  changeTodo: function (position, todoText) {
    this.todos[position].todoText = todoText;
  },
  
  removeTodo: function (position) {
    this.todos.splice(position, 1);
  },
  
  completeToggle: function (position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
    
  toggleAll: function () {
    var completedTodos = 0;  
    var todoLength = this.todos.length;
    // for (var i = 0; i < todoLength; i++){
    //    if (this.todos[i].completed === true){
    //      completedTodos++;
    //    }
    // }
    this.todos.forEach(function (todo) {
      if (todo.completed === true){
         completedTodos++;
      }
    });
      this.todos.forEach(function (todo) {
        if (completedTodos === todoLength) {
            todo.completed = false;
            }
        else {
            todo.completed = true;            
            }
    }); 
  }
 };

//Handlers do things when buttons are clicked 
var handlers = {
  enterAdd: function() {
    document.getElementById('addTodoText').onkeydown = function(event) {
    if (event.keyCode == 13) {
       var addTodoTextFromInput = document.getElementById('addTodoText');
       todoList.addTodo(addTodoTextFromInput.value);
      addTodoTextFromInput.value = '';
      view.displayLi();
      }
    }
  },
  
  displayTodos: function() {
    todoList.displayTodos();
  },
  
  toggleTodos: function() {
    todoList.toggleAll();
    view.displayLi();
  },
    
  addTodo: function() {
    var addTodoTextFromInput = document.getElementById('addTodoText');
    todoList.addTodo(addTodoTextFromInput.value);
    addTodoTextFromInput.value = '';
    view.displayLi();
  },
    
  changeTodo: function() {
    var todoPositionInput = document.getElementById("todoPosition");
    var todoNewText = document.getElementById("todoNewText");
    todoList.changeTodo(todoPositionInput.valueAsNumber, todoNewText.value);
    todoPosition.value = '';
    todoNewText.value = '';
    view.displayLi();
  },
  
  removeTodo: function(position) {
    todoList.removeTodo(position);
    view.displayLi();
  },
  
  toggleTodo: function() {
    var todoTogglePositionInput = document.getElementById("todoTogglePosition");
    todoList.completeToggle(todoTogglePositionInput.valueAsNumber);
    todoTogglePositionInput.value = '';
    view.displayLi();
  }
};


var view = {
    displayLi: function() {
      var pageUl = document.querySelector('ul'); // select the list in the DOM
      pageUl.innerHTML = '';
      todoList.todos.forEach(function (todo, index) {
      var todoLi = document.createElement('li'); //create an <li></li> element   
      var todoWithTextCompletion = '';
      if (todo.completed === true) {
        todoWithTextCompletion = '(x)  - ' + todo.todoText;
      }
      else {
        todoWithTextCompletion = '(  )  - ' + todo.todoText;
      }
      todoLi.id = index;
      todoLi.textContent = todoWithTextCompletion; // insert in <li></li> element the text equivalent of [todo.completed + todoText] 
      todoLi.appendChild(this.createDeleteButton()); // insert in <li></li> element the deleteButton
      pageUl.appendChild(todoLi);  // append this <li>[todo.completed + todoText]</li> to the ul in the DOM 
      },this);
  },
    
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  
  setUpEventListener: function () {
    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function(event) {
      var elementClicked = event.target; //get the clicked element
      if(elementClicked.className === 'deleteButton') {
        handlers.removeTodo(parseInt(elementClicked.parentNode.id)); // pass the id of the Li as a number to handlers.removeTodo
       }
    });
  }
};

var debugg = {
  thisFunction: function (functionToBeDebugged) {
    debugger;
    functionToBeDebugged();
  }
};


view.setUpEventListener();









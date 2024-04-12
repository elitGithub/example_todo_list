
let todosList = JSON.parse(localStorage.getItem('todosList')) || [];

document.addEventListener('DOMContentLoaded', () => {

  const todoForm = document.querySelector('#todoForm');
  if (todosList.length) {
    todosList.map(todo => {
      renderTodo(todo.id, todo.description, todo.isComplete);
    });
  }

  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!todoForm['todosInput'].value) {
      return;
    }

    const id = todosList.length;
    const description = todoForm['todosInput'].value;
    todosList.push({ id, description, isComplete: false });
    todoForm['todosInput'].value = '';
    localStorage.setItem('todosList', JSON.stringify(todosList));
    renderTodo(id, description, false);
  });
});

function renderTodo(id, textContent, isComplete) {
  const todosContainer = document.querySelector('#todosList');
  const li = document.createElement('li');
  li.classList.add('list-group-item');
  li.classList.add('d-flex');
  li.classList.add('justify-content-between');
  const buttonsDiv = document.createElement('div');
  const markDoneSpan = document.createElement('span');
  markDoneSpan.classList.add('fa');
  markDoneSpan.classList.add('fa-check');
  markDoneSpan.classList.add('todo-action-button');
  const deleteSpan = document.createElement('span');
  deleteSpan.classList.add('fa');
  deleteSpan.classList.add('fa-trash');
  deleteSpan.classList.add('todo-action-button');
  deleteSpan.dataset.id = id;
  markDoneSpan.dataset.id = id;
  li.id = `TODO_${id}`;
  li.textContent = textContent;
  if (isComplete) {
    li.classList.add('done');
    li.disabled = true;
    markDoneSpan.disabled = true;
  }
  todosContainer.appendChild(li);
  buttonsDiv.appendChild(markDoneSpan);
  buttonsDiv.appendChild(deleteSpan);
  li.appendChild(buttonsDiv);
  markDoneSpan.addEventListener('click', markDone);
  deleteSpan.addEventListener('click', deleteTodo);
}

function deleteTodo(event) {
  todosList = todosList.filter(item => Number(item.id) !== Number(event.target.dataset.id));
  localStorage.setItem('todosList', JSON.stringify(todosList));
  document.getElementById(`TODO_${event.target.dataset.id}`).remove();
}
function markDone(event) {
  document.getElementById(`TODO_${event.target.dataset.id}`).classList.add('done');
  todosList.forEach(todo => {
    if (Number(todo.id) === Number(event.target.dataset.id)) {
      todo.isComplete = true;
    }
  });
  localStorage.setItem('todosList', JSON.stringify(todosList));
}

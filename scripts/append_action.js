const taskInput = document.getElementById('newTask');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const completedTaskList = document.getElementById('completedTaskList');

addTaskBtn.addEventListener('click', function() {
  const taskValue = taskInput.value;
  if (!taskValue) return;
  
  const taskLi = document.createElement('li');
  const taskCheckbox = document.createElement('input');
  taskCheckbox.type = 'checkbox';
  taskCheckbox.addEventListener('change', function() {
    taskLi.classList.toggle('completed');
    if (taskLi.parentNode === taskList) {
      completedTaskList.appendChild(taskLi);
    } else {
      taskList.appendChild(taskLi);
    }
  });
  taskLi.appendChild(taskCheckbox);
  const taskText = document.createTextNode(taskValue);
  taskLi.appendChild(taskText);
  taskList.appendChild(taskLi);
  
  taskInput.value = '';
});

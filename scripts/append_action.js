const taskInput = document.getElementById('newTask');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const completedTaskList = document.getElementById('completedTaskList');

const addAction = function () {
  const taskValue = taskInput.value;
  if (!taskValue) return;

  const taskLi = document.createElement('li');
  taskLi.className = "action-item";
  const taskCheckbox = document.createElement('input');
  taskCheckbox.type = 'checkbox';
  taskCheckbox.addEventListener('change', function () {
    taskLi.classList.toggle('completed');
    if (taskLi.parentNode === taskList) {
      completedTaskList.appendChild(taskLi);
      if (completedTaskList.style.maxHeight.length != 0) {
        completedTaskList.style.maxHeight = completedTaskList.scrollHeight + "px";
      }
    } else {
      taskList.appendChild(taskLi);
    }
  });

  const taskActionsContainer = document.createElement("div");
  taskActionsContainer.className = "task-actions";

  const trashBtn = document.createElement('button');
  trashBtn.innerText = "Delete";
  trashBtn.className = "delete-btn";
  trashBtn.addEventListener('click', function () {
    dialogButtonsContainer.hidden = false;
    trashBtn.hidden = true;
  });

  const dialogButtonsContainer = document.createElement("div");
  dialogButtonsContainer.className = "dialog-buttons";
  dialogButtonsContainer.hidden = true;

  const confirmButton = document.createElement("button");
  confirmButton.innerText = "Confirm";
  confirmButton.addEventListener('click', function () {
    if (taskLi.parentNode === taskList) {
      taskList.removeChild(taskLi);
    } else {
      completedTaskList.removeChild(taskLi);
    }
    dialogButtonsContainer.hidden = true;
    trashBtn.hidden = false;
  })

  const denyButton = document.createElement("button");
  denyButton.innerText = "Deny";
  denyButton.addEventListener('click', function () {
    dialogButtonsContainer.style.display = "hidden";
    dialogButtonsContainer.hidden = true;
    trashBtn.hidden = false;
  })

  taskLi.appendChild(taskCheckbox);
  const taskText = document.createTextNode(taskValue);
  taskLi.appendChild(taskText);
  taskActionsContainer.appendChild(trashBtn);
  dialogButtonsContainer.appendChild(confirmButton);
  dialogButtonsContainer.appendChild(denyButton);
  taskLi.appendChild(taskActionsContainer);
  taskActionsContainer.appendChild(dialogButtonsContainer);
  taskList.appendChild(taskLi);

  taskInput.value = '';
}

addTaskBtn.addEventListener('click', addAction);

taskInput.addEventListener('keypress', function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTaskBtn.click();
  }
})
const ANIMATION_DURATION = 200;

const taskInput = document.getElementById('newTask');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const completedTaskList = document.getElementById('completedTaskList');
let currentLi;
let list;

const addAction =
    function() {
  const taskValue = taskInput.value;
  if (!taskValue) return;

  const taskLi = document.createElement('li');
  taskLi.className = 'action-item';
  const taskCheckbox = document.createElement('input');
  taskCheckbox.type = 'checkbox';
  taskCheckbox.addEventListener('change', function() {
    taskLi.classList.toggle('completed');
    let previousTop = taskLi.getBoundingClientRect().top;
    let newParent =
        taskLi.parentNode === taskList ? completedTaskList : taskList;
    let styleCopy = taskLi.style;
    let newTop = newParent.getBoundingClientRect().top;
    animation(taskLi, taskLi.parentNode, newParent, ANIMATION_DURATION);
  });

  const taskActionsContainer = document.createElement('div');
  taskActionsContainer.className = 'task-actions';

  const trashBtn = document.createElement('button');
  trashBtn.classList = 'trash-box icon';
  trashBtn.addEventListener('click', function() {
    dialogButtonsContainer.style.display = 'contents';
    trashBtn.hidden = true;
  });

  const dialogButtonsContainer = document.createElement('div');
  dialogButtonsContainer.classList = ['dialog-buttons', 'action-button'];
  dialogButtonsContainer.style.display = 'none';

  const confirmButton = document.createElement('button');
  confirmButton.classList = 'icon acceptButton';
  confirmButton.addEventListener('click', function() {
    if (taskLi.parentNode === taskList) {
      taskList.removeChild(taskLi);
    } else {
      completedTaskList.removeChild(taskLi);
    }
    dialogButtonsContainer.style.display = 'none';
    trashBtn.hidden = false;
  })

  const denyButton = document.createElement('button');
  denyButton.classList = 'icon denyButton';
  denyButton.addEventListener('click', function() {
    dialogButtonsContainer.style.display = 'hidden';
    dialogButtonsContainer.style.display = 'none';
    trashBtn.hidden = false;
  })

  const editButton = document.createElement('button');
  editButton.classList = 'icon replace';
  editButton.addEventListener('mousedown', function(e) {
    currentLi = e.target.parentNode.parentNode;
    list = currentLi.parentNode;
  });

  editButton.addEventListener('mouseup', function(e) {
    let newLi = e.target.parentNode.parentNode;
    let currentList = newLi.parentNode;
    if (currentLi && currentLi !== newLi && currentList === list) {
      list.removeChild(currentLi);
      list.insertBefore(currentLi, e.target.parentNode.parentNode);
    }
    currentLi = null;
  });

  taskLi.appendChild(taskCheckbox);
  const taskText = document.createTextNode(taskValue);
  taskLi.appendChild(taskText);
  taskActionsContainer.appendChild(trashBtn);
  dialogButtonsContainer.appendChild(confirmButton);
  dialogButtonsContainer.appendChild(denyButton);
  taskActionsContainer.appendChild(dialogButtonsContainer);
  taskActionsContainer.appendChild(editButton);
  taskLi.appendChild(taskActionsContainer);
  addElementToCollapsible(taskList, taskLi);

  taskInput.value = '';
}

function animation(element, oldParent, newParent, duration) {
  let start = Date.now();  // remember start time
  let defaultStyle = element.style;
  element.style.height = element.offsetHeight + 'px';
  element.style.width = element.offsetWidth + 'px';
  element.style.position = 'absolute';
  let top = element.getBoundingClientRect().top;
  let newTop =
      newParent.previousElementSibling.classList.contains('completed') ?
      newParent.previousElementSibling.getBoundingClientRect().bottom :
      newParent.getBoundingClientRect().bottom;
  let eps = (newTop - top) / duration;
  let timer = setInterval(function() {
    let timePassed = Date.now() - start;

    if (timePassed >= duration) {
      clearInterval(timer);
      element.style = defaultStyle;
      addElementToCollapsible(newParent, element);
      return;
    }

    draw(timePassed);
  }, 20);

  function draw(timePassed) {
    element.style.top = top + eps * timePassed + 'px';
  }
}

addTaskBtn.addEventListener('click', addAction);

taskInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    addTaskBtn.click();
  }
})

function addElementToCollapsible(collapsible, element) {
  collapsible.appendChild(element);
  if (collapsible.previousElementSibling.classList.contains('active')) {
    collapsible.style.maxHeight = 'none';
    collapsible.style.minHeight = 'fit-content';
    collapsible.style.transition = 'none';
  }
}

const clearAllButton = document.getElementById('deleteAll');
const clearCompletedButton = document.getElementById('deleteCompleted');
const clearDialogContainer = document.getElementById('confirmationButtons');
const clearAcceptButton = document.getElementById('allDeleteConfirmButton');
const clearDenyButton = document.getElementById('allDeleteDenyButton');

clearDenyButton.addEventListener('click', function() {
  clearDialogContainer.style.display = 'none';
  clearAllButton.hidden = false;
});

clearAllButton.addEventListener('click', function() {
  clearDialogContainer.style.display = 'contents';
  clearAllButton.hidden = true;
});

clearAcceptButton.addEventListener('click', function() {
  clearList(taskList);
  clearList(completedTaskList);
  showMessage('Actions cleared!');
  clearDialogContainer.style.display = 'none';
  clearAllButton.hidden = false;
});

clearCompletedButton.addEventListener('click', function() {
  clearList(completedTaskList);
  showMessage('Completed actions cleared!');
});

function clearList(list) {
  while (list.firstChild) {
    if (list.firstChild.tagName === 'li') {
      list.removeChild(list.firstChild);
    } else {
      list.firstChild.remove();
    }
  }
}

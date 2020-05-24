let todoTaskElement=document.getElementsByClassName('addedTodoTask')[0].cloneNode(true);

document.getElementsByClassName('addedTodoTask')[0].remove();
document.getElementsByClassName('addedProgressTask')[0].remove();
document.getElementsByClassName('addedDoneTask')[0].remove();

let modal = document.getElementById("my_modal");
let btn = document.getElementById("delete");
let span = document.getElementsByClassName("close_modal_window")[0];
let btnYes=document.getElementsByClassName('btn_yes')[0];
let btnNo=document.getElementsByClassName('btn_no')[0];

let amountOfTodoTasks = document.getElementsByClassName('addedTodoTask');
let amountOfProgressTasks=document.getElementsByClassName('addedProgressTask');
let amountOfDoneTasks=document.getElementsByClassName('addedDoneTask');

let paragraphInTodo=document.querySelector('div.container div.mainContent div.todo p');
paragraphInTodo.innerHTML+=amountOfTodoTasks.length;

let paragraphInProgress=document.querySelector('div.container div.mainContent div.progress p');
paragraphInProgress.innerHTML+=amountOfProgressTasks.length;

let paragraphInDone=document.querySelector('div.container div.mainContent div.done p');
paragraphInDone.innerHTML+=amountOfDoneTasks.length;

function updateTodoTaskCountText()
{
  paragraphInTodo.innerHTML='amount of tasks'+' - '+amountOfTodoTasks.length;
}
function updateProgressTaskCountText()
{
  paragraphInProgress.innerHTML='amount of tasks'+' - '+amountOfProgressTasks.length;
}
function updateDoneTaskCountText()
{
	paragraphInDone.innerHTML='amount of tasks'+' - '+amountOfDoneTasks.length;
}

function addToDoTask(todoTaskElement)
{
  document.getElementsByClassName('todoFormsTasks')[0].appendChild(todoTaskElement);
  
}

function createTodoTask()
{
  if(document.getElementsByClassName('addedTodoTask').length<6)
  {
    if(document.getElementsByClassName('addedTodoTask').length>0)
    {
      todoTaskElement=document.getElementsByClassName('addedTodoTask')[0].cloneNode(true);
      addToDoTask(todoTaskElement);
    }
    else
    {
      addToDoTask(todoTaskElement);
    }
    let dateOfTask=document.getElementsByClassName('myDate')[0].value;
    todoTaskElement.getElementsByClassName("taskDate")[0].value=dateOfTask;
    document.getElementsByClassName('myDate')[0].value='';
    let todoTaskInputText = document.getElementsByClassName('newTask')[0].value;
    todoTaskElement.getElementsByClassName ("tasksText")[0].value=todoTaskInputText;
    console.log(todoTaskInputText);

    document.getElementsByClassName('newTask')[0].value='';
    updateTodoTaskCountText();
  }
  else
  {
    modal.style.display='block';
    document.querySelector('div.container div.modal div.modal_content p').innerHTML='You can not add more than 6 tasks';
    document.querySelector('div.container div.modal div.modal_content button.btn_yes').innerHTML='Okay';
    document.getElementsByClassName('btn_no')[0].hidden=true;
    btnYes.onclick=function()
    {
    modal.style.display = "none";
    document.querySelector('div.container div.modal div.modal_content p').innerHTML='I wonder if you really want to delete the task?';
    document.querySelector('div.container div.modal div.modal_content button.btn_yes').innerHTML='Yes';
    document.getElementsByClassName('btn_no')[0].hidden=false; 
    } 
    span.onclick = function () 
    {
    modal.style.display = "none";
    document.querySelector('div.container div.modal div.modal_content p').innerHTML='I wonder if you really want to delete the task?';
    document.getElementsByClassName('btn_no')[0].hidden=false; 
    }
  }

}

function placeTaskInTodo(elem)
{
event.preventDefault();
  if(elem.parentElement.className=='addedDoneTask')
  {
    let todoTask=elem.parentElement.cloneNode(true);
    todoTask.className=('addedTodoTask');
    document.getElementsByClassName('todoFormsTasks')[0].appendChild(todoTask);
    elem.parentElement.remove();
    todoTask.getElementsByClassName('movingTaskInNextColumn')[0].innerHTML='&#8594';
    todoTask.getElementsByClassName('movingTaskInNextColumn')[0].setAttribute('onclick','placeTaskInProgress(this)');
  } 
  updateTodoTaskCountText();
  updateProgressTaskCountText();
  updateDoneTaskCountText();

}

function placeTaskInDone(elem)
 {
  let doneTask=elem.parentElement.cloneNode(true);
  doneTask.className="addedDoneTask";
  document.getElementsByClassName('doneFormsTasks')[0].appendChild(doneTask);
  elem.parentElement.remove();
  doneTask.getElementsByClassName("movingTaskInTodo")[0].setAttribute('onclick','placeTaskInTodo(this)');
  doneTask.getElementsByClassName('movingTaskInNextColumn')[0].innerHTML='&#10003';
  doneTask.getElementsByClassName('movingTaskInNextColumn')[0].setAttribute('onclick','deleteTask(this)');
  updateProgressTaskCountText();
  updateDoneTaskCountText();
 }
 

function placeTaskInProgress(elem)
{
  if(document.getElementsByClassName('addedProgressTask').length<5)
  {
    let progressTask=elem.parentElement.cloneNode(true);
    document.getElementsByClassName('progressFormsTasks')[0].appendChild(progressTask);
    progressTask.className="addedProgressTask";
  
    elem.parentElement.remove();
    progressTask.getElementsByClassName("movingTaskInNextColumn")[0].setAttribute('onclick','placeTaskInDone(this)');
    
    updateTodoTaskCountText();
    updateProgressTaskCountText();
  }
  else
  {
    modal.style.display='block';
    document.querySelector('div.container div.modal div.modal_content p').innerHTML='To add a task you should to comlete the previous ones';
    document.querySelector('div.container div.modal div.modal_content button.btn_yes').innerHTML='Okay';
    document.getElementsByClassName('btn_no')[0].hidden=true;
    btnYes.onclick=function()
    {
    modal.style.display = "none";
    document.querySelector('div.container div.modal div.modal_content p').innerHTML='I wonder if you really want to delete the task?';
    document.querySelector('div.container div.modal div.modal_content button.btn_yes').innerHTML='Yes';
    document.getElementsByClassName('btn_no')[0].hidden=false; 
    } 
    span.onclick = function () 
    {
    modal.style.display = "none";
    document.querySelector('div.container div.modal div.modal_content p').innerHTML='I wonder if you really want to delete the task?';
    document.getElementsByClassName('btn_no')[0].hidden=false; 
    }
  }
}



function deleteTask(elem)
{
  if(elem.parentElement.className=='addedProgressTask')
  {
    modal.style.display='block';

    btnYes.onclick=function deleteThisTask()
    {
    elem.parentElement.remove();
    modal.style.display = "none";

    updateTodoTaskCountText();
    updateProgressTaskCountText();
    updateDoneTaskCountText();
    } 
    span.onclick = function () {
    modal.style.display = "none";
    }
    btnNo.onclick= function () 
    {
      modal.style.display = "none";
    }

  }
  else
  {
    elem.parentElement.remove();
    updateTodoTaskCountText();
    updateProgressTaskCountText();
    updateDoneTaskCountText();
  }
}

function clearAllTasks(elem)
{
 if(elem=='progressFormsTasks')
 {
  modal.style.display='block';
  document.querySelector('div.container div.modal div.modal_content p').innerHTML='I wonder if you really want to delete all your tasks?';

  btnYes.onclick=function deleteAllTasks()
  {
    document.getElementsByClassName(elem)[0].innerHTML='';
    modal.style.display = "none";
    updateProgressTaskCountText();

  }
  span.onclick = function () 
  {
    modal.style.display = "none";
  }
  btnNo.onclick= function () 
    {
      modal.style.display = "none";
    }
}
else
  {
  document.getElementsByClassName(elem)[0].innerHTML='';
    updateTodoTaskCountText();
    updateProgressTaskCountText();
    updateDoneTaskCountText();
  }
}
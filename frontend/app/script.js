let todoBtn = document.querySelector('#todo-btn');
let todoTitle = document.querySelector('#todo-title');
let todoDetails = document.querySelector('#todo-details');
let signinBtn = document.querySelector('.top-signin-btn');
let logoutBtn = document.querySelector('.top-logout-btn');

let taskNo = 1;
const API_URL = "http://localhost:3000/Todos";
const SIGNIN_URL = "http://localhost:3000/signin";

function fetchTodos() {
  const token = localStorage.getItem('token');
  if(token) {
    fetch("http://localhost:3000/fetchtodos",{
      method : 'GET',
      headers : {
        'Content-Type' : 'application/json',
        'token' : `${token}`
      }
    })
      .then(response => response.json())
      .then(res => {
        if(res.error) console.log(res.message + ' ERROR-> ' + res.error);
        else {
          document.querySelector('.top-signin-btn-div').setAttribute('style','margin-right: 25px; display: none');
          document.querySelector('.top-logout-btn-div').setAttribute('style','margin-right: 25px; display: block');
          console.log(res);
          res.forEach(todo => {
            addTask(todo.title, todo.details, todo.status, todo.taskno);
            taskNo++;
          });
        }
      }) 
  }
}

//drag and drop functions
function drag(ev) {
  ev.dataTransfer.setData("text",ev.target.id);
}
function allowdrop(ev) {
  ev.preventDefault();
}
function drop(ev) {
  ev.preventDefault();
  let oldId = ev.dataTransfer.getData("text");
  let num1 = oldId.split('-');
  num1 = Number(num1[1]);

  let newId = ev.target.id;
  let num2 = newId.split('-');
  num2 = Number(num2[1]);

  console.log(`old Id : ${num1}`);
  console.log(`new Id : ${num2}`);
  const token = localStorage.getItem('token');
  console.log(" yha ka token " + token);
  fetch(API_URL + `/${num1}/${num2}`, {
    method : 'PUT',
    headers : {
      'Content-Type' : 'application/json',
      'token' : `${token}`
    }
  })
    .then(response => response.json())
    .then(mssg => {
      console.log(mssg.message);
      let oldTitleDiv = document.querySelector(`#todo-${num1}-title`);
      let oldDetailsDiv = document.querySelector(`#todo-${num1}-details`);
      let oldTogglebtn = document.querySelector(`#toggleBtn-${num1}`);
      let newTitleDiv = document.querySelector(`#todo-${num2}-title`);
      let newDetailsDiv = document.querySelector(`#todo-${num2}-details`);
      let newTogglebtn = document.querySelector(`#toggleBtn-${num2}`);

      let temp = oldTitleDiv.innerHTML;
      oldTitleDiv.innerHTML = newTitleDiv.innerHTML;
      newTitleDiv.innerHTML = temp;

      temp = oldDetailsDiv.innerHTML;
      oldDetailsDiv.innerHTML = newDetailsDiv.innerHTML;
      newDetailsDiv.innerHTML = temp;

      let oldAttr = oldTogglebtn.getAttributeNode("src");
      let oldSrc = oldAttr.value;
      let newAttr = newTogglebtn.getAttributeNode("src");
      let newSrc = newAttr.value;
      if(oldSrc === "../img/tick_.png") {
        newTogglebtn.setAttribute("src","../img/tick_.png");
      }
      else {
        newTogglebtn.setAttribute("src","../img/tick.png");
      }

      if(newSrc === "../img/tick_.png") {
        oldTogglebtn.setAttribute("src","../img/tick_.png");
      }
      else {
        oldTogglebtn.setAttribute("src","../img/tick.png");
      }
    })
    .catch(err => console.log("Error in drag & drop " + err));
}

function tick(id) {
  let num = id.split("-");
  console.log(num);
  num = Number(num[1]);
  let btn = document.querySelector(`#toggleBtn-${num}`);
  const attr = btn.getAttributeNode("src");
  const src = attr.value;
  const token = localStorage.getItem('token');

  if(src === "../img/tick_.png") {
    console.log(num);
    fetch(API_URL, {
      method : 'PUT',
      headers : {
        'Content-Type' : 'application/json',
        'token' : `${token}`
      },
      body : JSON.stringify({
        status : true,
        todoNum : num 
      })
    }) 
      .then(response => response.json())
      .then(message => {
        console.log(message);
        btn.setAttribute("src","../img/tick.png");
      })
      .catch(err => console.log("Error in updating" + err));
  }
  else {
    fetch(API_URL, {
      method : 'PUT',
      headers : {
        'Content-Type' : 'application/json',
        'token' : `${token}`
      },
      body : JSON.stringify({
        status : false,
        todoNum : num 
      })
    }) 
      .then(response => response.json())
      .then(message => {
        console.log(message.message);
        btn.setAttribute("src","../img/tick_.png");
      })
      .catch(err => console.log("Error in updating" + err));
  }

}

function deleteTodo(id) {
  let num = id.split("-");
  console.log(num);
  num = Number(num[1]);
  const token = localStorage.getItem('token');
  fetch(API_URL,{
    method : "DELETE",
    headers : {
      'Content-Type' : 'application/json',
      'token' : `${token}`
    },
    body : JSON.stringify({
      todoNum : num,
      total : taskNo
    })
  })
    .then(() => {
      console.log("Todo deleted")
      let container = document.querySelector(`#todo-${num}`);
      container.parentNode.removeChild(container);
      for(let i = num+1;i < taskNo;i++) {
        document.querySelector(`#todo-${i}`).setAttribute("id",`todo-${i-1}`);
        document.querySelector(`#todo-${i}-title`).setAttribute("id",`todo-${i-1}-title`);
        document.querySelector(`#todo-${i}-details`).setAttribute("id",`todo-${i-1}-details`);
        document.querySelector(`#todo-${i}-functions`).setAttribute("id",`todo-${i-1}-functions`);
        document.querySelector(`#todo-${i}-tick`).setAttribute("id",`todo-${i-1}-tick`);
        document.querySelector(`#todo-${i}-cross`).setAttribute("id",`todo-${i-1}-cross`);
        document.querySelector(`#toggleBtn-${i}`).setAttribute("id",`toggleBtn-${i-1}`);
        document.querySelector(`#deleteBtn-${i}`).setAttribute("id",`deleteBtn-${i-1}`);
      }
      taskNo--;
    })
    .catch(() => console.log("Error in deletion"));
}

function addTask(title, details, completeStatus, currentTaskNo) {
  let div = document.createElement('div');

  div.setAttribute("id",`todo-${currentTaskNo}`);
  div.setAttribute('draggable','true');  //allow dragging functionality
  div.setAttribute('ondragstart','drag(event)');
  div.setAttribute('ondragover','allowdrop(event)');
  div.setAttribute('ondrop','drop(event)');

  let parent = document.querySelector('.todo-div');
  parent.appendChild(div);

  let imgUse = '../img/tick_.png';
  if(completeStatus) imgUse = '../img/tick.png';

  div.style.backgroundColor = '#e8bcf0';  
  div.style.width = '250px';
  div.style.height = '150px';
  div.style.borderRadius = '10px';
  div.style.padding = '15px';
  div.style.paddingTop = '5px';
  div.style.paddingBottom = '0';
  div.style.margin = '10px'; 
  div.style.position = 'relative';
  div.innerHTML = `
  <div id="todo-${currentTaskNo}-title"></div>
  <div id="todo-${currentTaskNo}-details"></div>
  <div id="todo-${currentTaskNo}-functions">
      <button id="todo-${currentTaskNo}-tick" onClick="tick(document.activeElement.id);">
        <img src="${imgUse}" width="25" height="25" id="toggleBtn-${currentTaskNo}">
      </button>
      <button id="todo-${currentTaskNo}-cross" onClick="deleteTodo(document.activeElement.id);"> 
        <img src="../img/cross.png" width="32" height="32" id="deleteBtn-${currentTaskNo}">
      </button>
  </div>
  `;
  
  let eleTitle = div.querySelector(`#todo-${currentTaskNo}-title`);
  let eleDetails = div.querySelector(`#todo-${currentTaskNo}-details`);
  let eleFunc = div.querySelector(`#todo-${currentTaskNo}-functions`);
  let tickBtn = div.querySelector(`#todo-${currentTaskNo}-tick`);
  let crossBtn = div.querySelector(`#todo-${currentTaskNo}-cross`);

  eleTitle.innerHTML = title;
  eleTitle.style.color = '#000000';
  eleTitle.style.fontFamily = '"Roboto", serif';
  eleTitle.style.fontWeight = '700';
  eleTitle.style.fontStyle = 'normal';
  eleTitle.style.fontSize = '20px'
  eleTitle.style.height = 'fit-content';
  eleTitle.style.textOverflow = 'ellipsis';
  eleTitle.style.overflow = 'hidden';

  eleDetails.innerHTML = details;
  eleDetails.style.color = '#000000';
  eleDetails.style.fontFamily = '"Roboto", serif';
  eleDetails.style.fontWeight = '500';
  eleDetails.style.fontStyle = 'normal';
  eleDetails.style.fontSize = '15px';
  eleDetails.style.height = '58%';
  eleDetails.style.overflowWrap = 'break-word';
  eleDetails.style.overflow = 'hidden';
  eleDetails.style.textOverflow = 'ellipsis';
  

  eleFunc.style.position = 'absolute';
  eleFunc.style.bottom = '0';
  eleFunc.style.display = 'flex';
  eleFunc.style.width = '250px';
  eleFunc.style.height = '30px';
  eleFunc.style.justifyContent = 'space-between'; 

  tickBtn.style.padding = '0px';
  tickBtn.style.borderRadius = '200px';
  tickBtn.style.backgroundColor = 'transparent';
  tickBtn.style.border = 'none';
  tickBtn.style.cursor = 'pointer';
  
  crossBtn.style.padding = '0px';
  crossBtn.style.borderRadius = '200px';
  crossBtn.style.backgroundColor = 'transparent';
  crossBtn.style.border = 'none';
  crossBtn.style.cursor = 'pointer';
    
  console.log(div);
}

todoBtn.addEventListener('click', () => {
  let addTitle = todoTitle.value;
  let addDetails = todoDetails.value;
  console.log(addTitle);
  console.log(addDetails);
  const token = localStorage.getItem('token');

  fetch(API_URL,{
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json',
      'token' : `${token}`
    },
    body : JSON.stringify({
      taskno : taskNo,
      title : addTitle,
      details : addDetails,
      status : false
    })
  }) 
    .then(response => {
      if(!response.ok) {
        throw new Error(`${response.status}`);
      } else {
        return response.json();
      }
    })
    .then(mssg => {
      console.log(mssg);
      addTask(addTitle, addDetails, false, taskNo);
      taskNo++;
    })
    .catch(err => console.log("error in adding new todo " + err));

});

signinBtn.addEventListener('click', () => {
  window.location.href = SIGNIN_URL;
});

logoutBtn.addEventListener('click', () => {
  window.location.href = SIGNIN_URL;
})

document.addEventListener('DOMContentLoaded',() => {
  fetchTodos();
});
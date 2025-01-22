let todoBtn = document.querySelector('#todo-btn');
let todoTitle = document.querySelector('#todo-title');
let todoDetails = document.querySelector('#todo-details');
let taskNo = 1;
const API_URL = "http://localhost:3000/Todos";

function fetchTodos() {
  fetch(API_URL, {
    method : 'GET'
  })
    .then(response => response.json())
    .then(todoList => {
      console.log("reached here -> ");
      console.log(todoList);
      todoList.forEach(ele => {
        console.log(ele);
        addTask(ele.title, ele.details, ele.status);
      });
    });
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

  fetch(API_URL + `/${num1}/${num2}`, {
    method : 'PUT',
  })
    .then(response => response.json())
    .then(mssg => console.log(mssg))
    .catch(err => console.log("Error in drag & drop " + err));

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
  if(oldSrc === "../tick_.png") {
    newTogglebtn.setAttribute("src","../tick_.png");
  }
  else {
    newTogglebtn.setAttribute("src","../tick.png");
  }

  if(newSrc === "../tick_.png") {
    oldTogglebtn.setAttribute("src","../tick_.png");
  }
  else {
    oldTogglebtn.setAttribute("src","../tick.png");
  }
}

function tick(id) {
  let num = id.split("-");
  console.log(num);
  num = Number(num[1]);
  let btn = document.querySelector(`#toggleBtn-${num}`);
  const attr = btn.getAttributeNode("src");
  const src = attr.value;
  if(src === "../tick_.png") {
    btn.setAttribute("src","../tick.png");

    fetch(API_URL, {
      method : 'PUT',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        status : true,
        todoNum : num 
      })
    }) 
      .then(response => response.json())
      .then(message => console.log(message))
      .catch(err => console.log("Error in updating" + err));
  }
  else {
    btn.setAttribute("src","../tick_.png");

    fetch(API_URL, {
      method : 'PUT',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        status : false,
        todoNum : num 
      })
    }) 
      .then(response => response.json())
      .then(message => console.log(message))
      .catch(err => console.log("Error in updating" + err));
  }

}

function deleteTodo(id) {
  let num = id.split("-");
  console.log(num);
  num = Number(num[1]);

  fetch(API_URL,{
    method : "DELETE",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      todoNum : num
    })
  })
    .then(() => console.log("Todo deleted"))
    .catch(() => console.log("Error in deletion"));

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
}

function addTask(title, details, completeStatus) {
  let div = document.createElement('div');

  div.setAttribute("id",`todo-${taskNo}`);
  div.setAttribute('draggable','true');  //allow dragging functionality
  div.setAttribute('ondragstart','drag(event)');
  div.setAttribute('ondragover','allowdrop(event)');
  div.setAttribute('ondrop','drop(event)');

  let parent = document.querySelector('.todo-div');
  parent.appendChild(div);

  let imgUse = 'tick_.png';
  if(completeStatus) imgUse = 'tick.png';

  div.style.backgroundColor = '#65350f';  
  div.style.width = '250px';
  div.style.height = '150px';
  div.style.borderRadius = '10px';
  div.style.padding = '15px';
  div.style.paddingTop = '5px';
  div.style.paddingBottom = '0';
  div.style.margin = '10px'; 
  div.style.position = 'relative';
  div.innerHTML = `
  <div id="todo-${taskNo}-title"></div>
  <div id="todo-${taskNo}-details"></div>
  <div id="todo-${taskNo}-functions">
      <button id="todo-${taskNo}-tick" onClick="tick(document.activeElement.id);">
        <img src="../${imgUse}" width="25" height="25" id="toggleBtn-${taskNo}">
      </button>
      <button id="todo-${taskNo}-cross" onClick="deleteTodo(document.activeElement.id);"> 
        <img src="../cross.png" width="32" height="32" id="deleteBtn-${taskNo}">
      </button>
  </div>
  `;
  
  let eleTitle = div.querySelector(`#todo-${taskNo}-title`);
  let eleDetails = div.querySelector(`#todo-${taskNo}-details`);
  let eleFunc = div.querySelector(`#todo-${taskNo}-functions`);
  let tickBtn = div.querySelector(`#todo-${taskNo}-tick`);
  let crossBtn = div.querySelector(`#todo-${taskNo}-cross`);

  eleTitle.innerHTML = title;
  eleTitle.style.color = '#ffee8c';
  eleTitle.style.fontFamily = '"IBM Plex Serif", serif';
  eleTitle.style.fontWeight = '500';
  eleTitle.style.fontStyle = 'normal';
  eleTitle.style.fontSize = '20px'
  eleTitle.style.height = 'fit-content';

  eleDetails.innerHTML = details;
  eleDetails.style.color = '#ffee8c';
  eleDetails.style.fontFamily = '"IBM Plex Serif", serif';
  eleDetails.style.fontWeight = '300';
  eleDetails.style.fontStyle = 'normal';
  eleDetails.style.fontSize = '15px';

  eleFunc.style.position = 'absolute';
  eleFunc.style.bottom = '0';
  eleFunc.style.display = 'flex';
  eleFunc.style.width = '250px';
  eleFunc.style.height = '30px';
  eleFunc.style.justifyContent = 'space-between'; 

  tickBtn.style.padding = '0px';
  tickBtn.style.borderRadius = '200px';
  tickBtn.style.backgroundColor = '#65350f';
  tickBtn.style.border = 'none';
  tickBtn.style.cursor = 'pointer';
  
  crossBtn.style.padding = '0px';
  crossBtn.style.borderRadius = '200px';
  crossBtn.style.backgroundColor = '#65350f';
  crossBtn.style.border = 'none';
  crossBtn.style.cursor = 'pointer';
    
  console.log(div);
  taskNo++;
}

todoBtn.addEventListener('click', () => {
  let addTitle = todoTitle.value;
  let addDetails = todoDetails.value;
  console.log(addTitle);
  console.log(addDetails);
  addTask(addTitle, addDetails, false);

  fetch(API_URL,{
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify({
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
    .then(mssg => console.log(mssg))
    .catch(err => console.log("error in adding new todo " + err));
});

document.addEventListener('DOMContentLoaded',() => {
  fetchTodos();
});
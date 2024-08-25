let todoBtn = document.querySelector('#todo-btn');
let todoTitle = document.querySelector('#todo-title');
let todoDetails = document.querySelector('#todo-details');
let taskNo = 1;

function tick(id) {
  let num = id.split("-");
  console.log(num);
  num = Number(num[1]);
  let btn = document.querySelector(`#toggleBtn-${num}`);
  const attr = btn.getAttributeNode("src");
  const src = attr.value;
  if(src === "tick_.png") {
    btn.setAttribute("src","tick.png");
  }
  else {
    btn.setAttribute("src","tick_.png");
  }

}

function deleteTodo(id) {
  let num = id.split("-");
  console.log(num);
  num = Number(num[1]);
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

function addTask(title,details) {
  let div = document.createElement('div');
  div.setAttribute("id",`todo-${taskNo}`);
  let parent = document.querySelector('.todo-div');
  parent.appendChild(div);

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
        <img src="tick_.png" width="25" height="25" id="toggleBtn-${taskNo}">
      </button>
      <button id="todo-${taskNo}-cross" onClick="deleteTodo(document.activeElement.id);"> 
        <img src="cross.png" width="32" height="32" id="deleteBtn-${taskNo}">
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
  addTask(addTitle,addDetails);
});

let todoBtn = document.querySelector('#todo-btn');
let todoTitle = document.querySelector('#todo-title');
let todoDetails = document.querySelector('#todo-details');
let taskNo = 1;

function tick() {
  let btn = document.querySelector(`#toggleBtn-${taskNo}`);
  let outerbtn = document.querySelector(`#todo-${taskNo}-tick`);
  const attr = btn.getAttributeNode("src");
  const src = attr.value;
  if(src === "tick_.png") {
    btn.setAttribute("src","tick.png");
    btn.setAttribute("width","32");
    btn.setAttribute("height","32");
  }
  else {
    btn.setAttribute("src","tick_.png");
    btn.setAttribute("width","25");
    btn.setAttribute("height","25");
  }

}

function addTask(title,details) {
  let div = document.createElement('div');
  div.setAttribute("id",`todo-${taskNo}`);
  let parent = document.querySelector('.todo-div');
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
      <button id="todo-${taskNo}-tick" onClick="tick();">
        <img src="tick_.png" width="25" height="25" id="toggleBtn-${taskNo}">
      </button>
      <button id="todo-${taskNo}-cross"> 
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
  parent.appendChild(div);
  // taskNo++;
}

todoBtn.addEventListener('click', () => {
  let addTitle = todoTitle.value;
  let addDetails = todoDetails.value;
  console.log(addTitle);
  console.log(addDetails);
  addTask(addTitle,addDetails);
});

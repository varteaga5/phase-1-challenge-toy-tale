async function init() {
  grabAddBtn();
  await toyObjs();
  grabToyForm();
  grabLikeBtn();
}
// creates toy form button
function grabToyForm() {
  const submitBtn = document.querySelector('form')
  submitBtn.addEventListener('submit', submitToyForm)  
}
// toy form event
function submitToyForm(e) {
  e.preventDefault();
  const formData = {
    name : e.target[0].value,
    img : e.target[1].value,
    likes : 0
    
  }
  const configObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(formData)
  }
  return fetch('http://localhost:3000/toys', configObj)
  .then(resp => resp.json())
  .then(data => createCardObj(data))
  // .catch(console.log('this is catch error'))
}
function grabAddBtn(){
  const addBtn = document.querySelector("#new-toy-btn");
  addBtn.addEventListener("click", newToyBtnClk);
}
let addToy = false;

function newToyBtnClk(e) {
  // hide & seek with the form
  const toyFormContainer = document.querySelector(".container");
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
}
// GET toy objects
async function toyObjs(){
  return await fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => createCard(data))
}
function createCard(data){
  data.forEach((obj) => {
    // new div variable
    const newDiv = document.createElement('div');
    // add card class
    newDiv.classList.add('card')
    
    // add h2 with toy name
    let h2 = document.createElement('h2')
    h2.innerText = obj.name;
    newDiv.append(h2)
    
    // add img 
    const img = document.createElement('img')
    img.src = obj.image;
    img.classList.add('toy-avatar')
    newDiv.append(img)
    
    // add p tag 'like' label
    let p = document.createElement('p')
    p.innerText = obj.likes + ' likes';
    newDiv.append(p)
    
    // add like button
    let btn = document.createElement('button')
    btn.innerText = 'like';
    btn.id = obj.id;
    btn.classList.add('like-btn')
    newDiv.append(btn)
    
    // append populated div to id toy-collection
    document.querySelector('#toy-collection').append(newDiv)
  })
}
function createCardObj(data){
    // new div variable
    const newDiv = document.createElement('div');
    // add card class
    newDiv.classList.add('card')
    
    // add h2 with toy name
    let h2 = document.createElement('h2')
    h2.innerText = data.name;
    newDiv.append(h2)
    
    // add img 
    let img = document.createElement('img')
    img.src = data.image;
    img.classList.add('toy-avatar')
    newDiv.append(img)
    
    // add p tag 'like' label
    let p = document.createElement('p')
    p.innerText = data.likes + ' likes';
    newDiv.append(p)
    
    // add like button
    let btn = document.createElement('button')
    btn.innerText = 'like';
    btn.id = data.id;
    btn.classList.add('like-btn')
    newDiv.append(btn)
    
    // append populated div to id toy-collection
    document.querySelector('#toy-collection').append(newDiv)
}
function grabLikeBtn() {
  const likeBtn = document.querySelectorAll('.like-btn')
  likeBtn.forEach(element => element.addEventListener('click', clickedLike))
  // likeBtn.addEventListener('click', clickedLike)
}
function clickedLike (e) {
  console.log('like was clicked')
  // return fetch('http://localhost:3000/toys'+ e.target)
  // .then(response => response.json())
  // .then(data => createCard(data))
}






document.addEventListener("DOMContentLoaded", init);

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
    image : e.target[1].value,
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
  fetch('http://localhost:3000/toys', configObj)
  .then(resp => resp.json())
  .then(data => createCardObj(data))
  // .catch(console.log('this is catch error'))
  e.path[0].reset();
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
    
    // add p tag likes label
    let likeLabel = document.createElement('p')
    likeLabel.setAttribute('data-id', obj.id)
    likeLabel.innerHTML = `${obj['likes']} ` 
    newDiv.append(likeLabel);

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
// creates card for new toys added
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

    // add p tag likes label
    let likeLabel = document.createElement('p')
    likeLabel.setAttribute('data-id', data.id)
    likeLabel.innerHTML = `${data['likes']} likes` 
    newDiv.append(likeLabel);


    // add like button
    let btn = document.createElement('button')
    btn.innerText = 'like';
    btn.id = data.id;
    btn.classList.add('like-btn')
    newDiv.append(btn)
    
    // append populated div to id toy-collection
    document.querySelector('#toy-collection').append(newDiv)
    grabLikeBtn();

}
function grabLikeBtn() {
  const likeBtn = document.querySelectorAll('.like-btn')
  console.log(likeBtn)
  likeBtn.forEach(element => element.addEventListener('click', clickedLike))
  // likeBtn.addEventListener('click', clickedLike)
}
function clickedLike (e) {

  // console.log("checking: ", e.target.previousElementSibling)
  // capture toys id
  const toyId = e.target.parentElement.childNodes[3].id;

  // read the current likes value from the DOM
  // grab p tag value store in likes
  let  likes = e.target.previousElementSibling.innerHTML;

  // increase that value by 1
  likes++
  // // set amount equal to innerhtml of p tag
  // e.target.previousElementSibling.innerHTML = `${likes} likes`

  // pass that number along with patch request

  // response received then update DOM with new number

  // PATCH Request
  const configObj = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      // can use short hand by just typing likes, short assignment
      likes : likes
        })
  }
  fetch(`http://localhost:3000/toys/${toyId}`, configObj)
  .then(resp => resp.json())
  .then(updateDOM)
}
function updateDOM (data) {
  // grab clicked p tag by data-id
  const pTag = document.querySelector(`[data-id= '${data.id}']`)
  console.log('this is pTag ',pTag)
  // update innertext to data.likes
  pTag.innerText = data.likes;
}


document.addEventListener("DOMContentLoaded", init);

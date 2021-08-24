'use strict';

// ------------------------ Global Variables ------------------------ //

const itemOneImgElem = document.getElementById('item1_img')
const itemOnePElem = document.getElementById('img1_p')

const itemTwoImgElem = document.getElementById('item2_img')
const itemTwoPElem = document.getElementById('img2_p')

const itemThreeImgElem = document.getElementById('item3_img')
const itemThreePElem = document.getElementById('img3_p')

const allItemsSectionElem = document.getElementById('all_items')

let itemOne = null;
let itemTwo = null;
let itemThree = null;

let rounds = 25;

// ------------------------- Constructor Function ------------------------ //

function Item(name, image){
  this.name = name;
  this.image = image;
  this.timesShown = 0;
  this.votes = 0;
}

// ------------------------- Prototype things ------------------------ //

Item.allItems = [];

Item.prototype.renderSingleItem = function(img, p){
  img.src = this.image;
  p.textContent = this.name;
  this.timesShown++;
}

// ------------------------- Global Functions ------------------------ //

function randomItems(){
  let oneIndex = Math.floor(Math.random()*Item.allItems.length);
  itemOne =  Item.allItems[oneIndex]

  let twoIndex;
  while(twoIndex === undefined || twoIndex === oneIndex){
    twoIndex = Math.floor(Math.random()*Item.allItems.length);
  }
  itemTwo = Item.allItems[twoIndex]

  let threeIndex;
  while(threeIndex === undefined || threeIndex === oneIndex || threeIndex === twoIndex){
    threeIndex = Math.floor(Math.random()*Item.allItems.length);
  }
  itemThree = Item.allItems[threeIndex]

  renderAllItems(itemOne, itemTwo, itemThree);
}

function renderAllItems(itemOne, itemTwo, itemThree){
  itemOne.renderSingleItem(itemOneImgElem,itemOnePElem)
  itemTwo.renderSingleItem(itemTwoImgElem,itemTwoPElem)
  itemThree.renderSingleItem(itemThreeImgElem,itemThreePElem)
}

function clickerHandler(event){
  if(event.target === itemOneImgElem || event.target === itemTwoImgElem || event.target === itemThreeImgElem){
  rounds--;
    if(event.target === itemOneImgElem){
      itemOne.votes++;
    } else if(event.target === itemTwoImgElem){
      itemTwo.votes++;
    } else {
      itemThree.votes++;
    }
    if(rounds === 0){
      allItemsSectionElem.removeEventListener('click', clickerHandler)
      renderResults();
    }
    randomItems();
  }
}

function renderResults(){
  let ulElem = document.getElementById('item-clicks');
  ulElem.innerHTML = '';
  for(let item of Item.allItems){
    const liElem = document.createElement('li');
    liElem.textContent = `${item.name}: ${item.votes}`;
    ulElem.appendChild(liElem);
  }
}

allItemsSectionElem.addEventListener('click', clickerHandler);

// ------------------------- Call Functions -------------------------- //

Item.allItems.push(new Item('bag', './busMallAssets/lab/assets/bag.jpg'));
Item.allItems.push(new Item('banana', './busMallAssets/lab/assets/banana.jpg'));
Item.allItems.push(new Item('bathroom', './busMallAssets/lab/assets/bathroom.jpg'));
Item.allItems.push(new Item('boots', './busMallAssets/lab/assets/boots.jpg'));
Item.allItems.push(new Item('breakfast', './busMallAssets/lab/assets/breakfast.jpg'));
Item.allItems.push(new Item('bubblegum', './busMallAssets/lab/assets/bubblegum.jpg'));
Item.allItems.push(new Item('chair', './busMallAssets/lab/assets/chair.jpg'));
Item.allItems.push(new Item('cthulhu', './busMallAssets/lab/assets/cthulhu.jpg'));
Item.allItems.push(new Item('dog duck', './busMallAssets/lab/assets/dog-duck.jpg'));
Item.allItems.push(new Item('dragon', './busMallAssets/lab/assets/dragon.jpg'));
Item.allItems.push(new Item('pen', './busMallAssets/lab/assets/pen.jpg'));
Item.allItems.push(new Item('pet sweep', './busMallAssets/lab/assets/pet-sweep.jpg'));
Item.allItems.push(new Item('scissors', './busMallAssets/lab/assets/scissors.jpg'));
Item.allItems.push(new Item('shark', './busMallAssets/lab/assets/shark.jpg'));
Item.allItems.push(new Item('sweep', './busMallAssets/lab/assets/sweep.jpg'));
Item.allItems.push(new Item('tauntaun', './busMallAssets/lab/assets/tauntaun.jpg'));
Item.allItems.push(new Item('unicorn', './busMallAssets/lab/assets/unicorn.jpg'));
Item.allItems.push(new Item('water can', './busMallAssets/lab/assets/water-can.jpg'));
Item.allItems.push(new Item('wine glass', './busMallAssets/lab/assets/wine-glass.jpg'));

randomItems();
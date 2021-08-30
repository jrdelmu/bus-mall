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



// function randomItems(){

//   const unavailableItems = [itemOne, itemTwo, itemThree];

  // while(unavailableItems.includes(itemOne)){
  //   let oneIndex = Math.floor(Math.random()*Item.allItems.length);
  //   itemOne =  Item.allItems[oneIndex]
  // }
  // unavailableItems.push(oneIndex);
  // let twoIndex;
  // while(unavailableItems.includes(itemTwo)){
  //   twoIndex = Math.floor(Math.random()*Item.allItems.length);
  //   itemTwo = Item.allItems[twoIndex]
  // }
//   unavailableItems.push(twoIndex);
//   let threeIndex;
//   while(unavailableItems.includes(itemThree)){
//     threeIndex = Math.floor(Math.random()*Item.allItems.length);
//     itemThree = Item.allItems[threeIndex]
//   }
//   renderAllItems(itemOne, itemTwo, itemThree);
// }

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
      renderChart();
    }
    randomItems();
    storeItemsStorage();
  }
}

function renderChart() {
  const itemData = [];
  const itemLabels = [];

  for (let item of Item.allItems) {
    itemData.push(item.votes);
    itemLabels.push(item.name);
  }

var ctx = document.getElementById('itemChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: itemLabels,
        datasets: [{
            label: 'Item Votes',
            data: itemData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
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

//---------------Storage------------------//
function storeItemsStorage(){
  const stringifiedItems = JSON.stringify(Item.allItems);
  localStorage.setItem('items', stringifiedItems);
}

function getItemsStorage(){
  const stringifiedItems = localStorage.getItem('items')
  if(stringifiedItems){
    const parsedItems = JSON.parse(stringifiedItems);
    // for(let item of parsedItems){
    //   const myItem =new Item(item.name, item.image, item.timesShown, item.votes);
    //   Item.allItems.push(myItem);
    //   myItem.renderSingleItem();
    // }
    for (let item of parsedItems) {
      let currName= item.name;

      for (let saveItem of Item.allItems) {
        let saveName = saveItem.name;

        if (currName === saveName) {
          saveItem.votes = item.votes;
          saveItem.timesShown = item.timesShown;
        }
      }
    } 
  }
}

allItemsSectionElem.addEventListener('click', clickerHandler);

// ------------------------- Call Functions -------------------------- //

// Item.allItems.push(new Item('bag', './busMallAssets/lab/assets/bag.jpg'));
// Item.allItems.push(new Item('banana', './busMallAssets/lab/assets/banana.jpg'));
// Item.allItems.push(new Item('bathroom', './busMallAssets/lab/assets/bathroom.jpg'));
// Item.allItems.push(new Item('boots', './busMallAssets/lab/assets/boots.jpg'));
// Item.allItems.push(new Item('breakfast', './busMallAssets/lab/assets/breakfast.jpg'));
// Item.allItems.push(new Item('bubblegum', './busMallAssets/lab/assets/bubblegum.jpg'));
// Item.allItems.push(new Item('chair', './busMallAssets/lab/assets/chair.jpg'));
// Item.allItems.push(new Item('cthulhu', './busMallAssets/lab/assets/cthulhu.jpg'));
// Item.allItems.push(new Item('dog duck', './busMallAssets/lab/assets/dog-duck.jpg'));
// Item.allItems.push(new Item('dragon', './busMallAssets/lab/assets/dragon.jpg'));
// Item.allItems.push(new Item('pen', './busMallAssets/lab/assets/pen.jpg'));
// Item.allItems.push(new Item('pet-sweep', './busMallAssets/lab/assets/pet-sweep.jpg'));
// Item.allItems.push(new Item('scissors', './busMallAssets/lab/assets/scissors.jpg'));
// Item.allItems.push(new Item('shark', './busMallAssets/lab/assets/shark.jpg'));
// Item.allItems.push(new Item('sweep', './busMallAssets/lab/assets/sweep.png'));
// Item.allItems.push(new Item('tauntaun', './busMallAssets/lab/assets/tauntaun.jpg'));
// Item.allItems.push(new Item('unicorn', './busMallAssets/lab/assets/unicorn.jpg'));
// Item.allItems.push(new Item('water can', './busMallAssets/lab/assets/water-can.jpg'));
// Item.allItems.push(new Item('wine glass', './busMallAssets/lab/assets/wine-glass.jpg'));

Item.allItems.push(new Item('bag', 'https://github.com/sarabeth-russert/busMallAssets/blob/main/lab/assets/bag.jpg?raw=true'));
Item.allItems.push(new Item('banana', 'https://github.com/sarabeth-russert/busMallAssets/blob/main/lab/assets/banana.jpg?raw=true'));
Item.allItems.push(new Item('bathroom', 'https://github.com/sarabeth-russert/busMallAssets/blob/main/lab/assets/bathroom.jpg?raw=true'));
Item.allItems.push(new Item('boots', 'https://github.com/sarabeth-russert/busMallAssets/blob/main/lab/assets/boots.jpg?raw=true'));
Item.allItems.push(new Item('breakfast', 'https://github.com/sarabeth-russert/busMallAssets/blob/main/lab/assets/breakfast.jpg?raw=true'));
Item.allItems.push(new Item('bubblegum', 'https://github.com/sarabeth-russert/busMallAssets/blob/main/lab/assets/bubblegum.jpg?raw=true'));
Item.allItems.push(new Item('chair', 'https://github.com/sarabeth-russert/busMallAssets/blob/main/lab/assets/chair.jpg?raw=true'));
Item.allItems.push(new Item('cthulhu', 'https://github.com/sarabeth-russert/busMallAssets/blob/main/lab/assets/cthulhu.jpg?raw=true'));
Item.allItems.push(new Item('dog duck', 'https://github.com/sarabeth-russert/busMallAssets/blob/main/lab/assets/dog-duck.jpg?raw=true'));
Item.allItems.push(new Item('dragon', 'https://github.com/sarabeth-russert/busMallAssets/blob/main/lab/assets/dragon.jpg?raw=true'));
Item.allItems.push(new Item('pen', 'https://github.com/sarabeth-russert/busMallAssets/blob/main/lab/assets/pen.jpg?raw=true'));
Item.allItems.push(new Item('pet-sweep', 'https://github.com/sarabeth-russert/busMallAssets/blob/main/lab/assets/pet-sweep.jpg?raw=true'));
Item.allItems.push(new Item('scissors', 'https://github.com/sarabeth-russert/busMallAssets/blob/main/lab/assets/scissors.jpg?raw=true'));
Item.allItems.push(new Item('shark', 'https://github.com/sarabeth-russert/busMallAssets/blob/main/lab/assets/shark.jpg?raw=true'));
Item.allItems.push(new Item('sweep', 'https://github.com/sarabeth-russert/busMallAssets/blob/main/lab/assets/sweep.png?raw=true'));
Item.allItems.push(new Item('tauntaun', 'https://github.com/sarabeth-russert/busMallAssets/blob/main/lab/assets/tauntaun.jpg?raw=true'));
Item.allItems.push(new Item('unicorn', 'https://github.com/sarabeth-russert/busMallAssets/blob/main/lab/assets/unicorn.jpg?raw=true'));
Item.allItems.push(new Item('water can', 'https://github.com/sarabeth-russert/busMallAssets/blob/main/lab/assets/water-can.jpg?raw=true'));
Item.allItems.push(new Item('wine glass', 'https://github.com/sarabeth-russert/busMallAssets/blob/main/lab/assets/wine-glass.jpg?raw=true'));

randomItems();
getItemsStorage();
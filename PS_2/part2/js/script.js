const GOODS = [
    {
      category: 'furniture',
      name: 'Chair',
      amount: 1,
      price: 20
    },
    {
      category: 'supplies',
      name: 'Gel Pen',
      amount: 20,
      price: 2
    },
    {
      category: 'other',
      name: 'Trash Bin',
      amount: 1,
      price: 5
    },
    {
      category: 'furniture',
      name: 'Sofa',
      amount: 1,
      price: 50
    },
    {
      category: 'supplies',
      name: 'Notebook',
      amount: 3,
      price: 3
    },
    {
      category: 'other',
      name: 'Calendar 2019',
      amount: 1,
      price: 3
    },
    {
      category: 'supplies',
      name: 'Pen',
      amount: 1,
      price: 2 
    } 
  ];

//copy GOODS
let goods = GOODS.concat(); 
const search = document.querySelector('.input'); 
const select = document.querySelector('select');
const tFoot = document.querySelector('tfoot');
//flag to control sorting
let fName = false;
let fCategory = false;

const category = document.querySelector('.category__span');
const name = document.querySelector('.name__span');
let colName = '';
window.onload = () => {
  //build the initial table 
  loadTable(goods, tFoot);
  //Search
  search.addEventListener('keyup', () => {
    DisplaySearch();
  });
  //selection of the type of displayed elements
  select.addEventListener('change', () => {
    const regSelect = new RegExp(select.value);
    //filter elements by type
    goods = GOODS.filter((elem) => regSelect.test(elem.category));
    //sort selected items
    switch(colName){
      case 'category': sortAlphabetically(fCategory, colName);
        break;
      case 'name': sortAlphabetically(fName, colName);
        break;
    }
    //draw a new table
    loadTable(goods, tFoot)
    DisplaySearch();
  })
};

//draw a table
function loadTable (good, tfoot) {  
  let sum = 0;
  const tbody = document.querySelector('.tbody');
  let contentTable  = '';
  for(let goods of good){
    //fill in the table
    contentTable += `<tr><td>${goods.category === 'supplies'?'Office ' + goods.category:goods.category.charAt(0).toUpperCase() + 
    goods.category.substring(1, goods.category.length)}</td><td>${goods.name}</td><td>${goods.amount}</td><td>${goods.price}</td></tr>`;
    //calc the price
    sum += goods.price * goods.amount;
  }

  tbody.innerHTML = contentTable;
  const price = tfoot.rows[0].cells[3];
  //print the price
  price.textContent = sum + '$';
}

//sort column
function sortColumn(columnName) {
  colName = columnName;
  //sort order control
  if(columnName === 'name'){
    fName = !fName;
  } else {
    fCategory = !fCategory;
  }

  //sort by type column
  switch(columnName){
    case 'category': sortAlphabetically(fCategory, columnName);
      category.textContent = fCategory?'▲':'▼';
      name.textContent = '';
      break;
    case 'name': sortAlphabetically(fName, columnName);
      name.textContent = fName?'▲':'▼';
      category.textContent = '';
      break;
  }

  loadTable(goods, tFoot);
  DisplaySearch();
}
 
//sort
function sortAlphabetically(flag, column){
  goods = goods.sort((cell1, cell2) => {
    //sort in alphabetical order in regular and reverse order
    if(flag){
      if (cell1[column].toLowerCase() < cell2[column].toLowerCase()) 
        return 1;
      if (cell1[column].toLowerCase() > cell2[column].toLowerCase())
        return -1;
    } else {
      if (cell1[column].toLowerCase() < cell2[column].toLowerCase()) 
        return -1;
      if (cell1[column].toLowerCase() > cell2[column].toLowerCase())
        return 1;
    }

    return 0;
  })
}

//search output
const DisplaySearch = () => {
  const rows = document.querySelector('.tbody').rows;
  let reg = new RegExp('^' + search.value);
  //resum
  let sum = 0;
    //hide elements
    for(let i = 0; i < rows.length; i++){
      if(reg.test(rows[i].cells[1].textContent)) {
        rows[i].style.display = '';
        sum += parseInt(rows[i].cells[3].textContent.replace('$', '')) * parseInt(rows[i].cells[2].textContent);
      }  else if(search.value !== ''){
        rows[i].style.display = 'none';
      } else {
        //search bar is empty
        rows[i].style.display = '';
        sum += parseInt(rows[i].cells[3].textContent.replace('$', '')) * parseInt(rows[i].cells[2].textContent); 
      }
    }
  const price = document.querySelector('tfoot').rows[0].cells[3];
  price.textContent = sum + '$';
}








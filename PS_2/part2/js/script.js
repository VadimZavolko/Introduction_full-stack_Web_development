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

let goods = [];
for(let i of GOODS){
  goods.push(i);
} 
const search = document.querySelector('.input'); 
const select = document.querySelector('select');
const tFoot = document.querySelector('tfoot');
let fName = false;
let fCategory = false;
const category = document.querySelector('.category__span');
const name = document.querySelector('.name__span');

window.onload = () => { 
  loadTable(goods, tFoot);
  search.addEventListener('keyup', () => {
    DisplaySearch();
  });
  select.addEventListener('change', () => {
    const regSelect = new RegExp(select.value);
    const table = document.querySelector('.table');
    goods = [];
    for(let i of GOODS){
      if(regSelect.test(i.category)){
        goods.push(i);
      }
    }
    loadTable(goods, tFoot)
    DisplaySearch();
  })
};

function loadTable (good, tfoot) {  
  let sum = 0;
  const tbody = document.querySelector('.tbody');
  let contentTable  = '';
  for(let goods of good){
    contentTable += `<tr><td>${goods.category === 'supplies'?'Office ' + goods.category:goods.category.charAt(0).toUpperCase() + 
    goods.category.substring(1, goods.category.length)}</td><td>${goods.name}</td><td>${goods.amount}</td><td>${goods.price}</td></tr>`;
    sum += goods.price * goods.amount;
  }

  tbody.innerHTML = contentTable;
  const price = tfoot.rows[0].cells[3];
  price.textContent = sum + '$';
}

function sortColumn(columnName) {
  if(columnName === 'name'){
    fName = !fName
  } else {
    fCategory = !fCategory
  }

  switch(columnName){
    case 'category': sortAlphabetically(fCategory, columnName)
      category.textContent = category.textContent === '▼'?'▲':'▼'
      break
    case 'name': sortAlphabetically(fName, columnName)
      name.textContent = name.textContent === '▼'?'▲':'▼'
      break
  }

  loadTable(goods, tFoot);
  DisplaySearch();
}
 
function sortAlphabetically(flag, column){
  goods = goods.sort((cell1, cell2) => {
    if(flag){
      if (cell1[column].toLowerCase() < cell2[column].toLowerCase()) 
        return 1
      if (cell1[column].toLowerCase() > cell2[column].toLowerCase())
        return -1
    } else {
      if (cell1[column].toLowerCase() < cell2[column].toLowerCase()) 
        return -1
      if (cell1[column].toLowerCase() > cell2[column].toLowerCase())
        return 1
    }

    return 0 
  })
}

const DisplaySearch = () => {
  const rows = document.querySelector('.tbody').rows
  let reg = new RegExp('^' + search.value)
  let sum = 0;
    for(let i = 0; i < rows.length; i++){
      if(reg.test(rows[i].cells[1].textContent)) {
        rows[i].style.display = ''
        sum += parseInt(rows[i].cells[3].textContent.replace('$', '')) * parseInt(rows[i].cells[2].textContent)
      }  else if(search.value !== ''){
        rows[i].style.display = 'none'
      } else {
        rows[i].style.display = '';
        sum += parseInt(rows[i].cells[3].textContent.replace('$', '')) * parseInt(rows[i].cells[2].textContent); 
      }
    }
  const price = document.querySelector('tfoot').rows[0].cells[3]
  price.textContent = sum + '$'
}








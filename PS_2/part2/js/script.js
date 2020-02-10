let GOODS = [
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
window.onload = () => {
  const tFoot = document.querySelector('tfoot')
  loadTable(GOODS, tFoot);

  const search = document.querySelector('.input')
  search.addEventListener('keyup', () => {
    const rows = document.querySelector('.tbody').rows
    let reg = new RegExp('^' + search.value)
    for(let i = 0; i < rows.length; i++){
      if(reg.test(rows[i].cells[1].textContent) && (search.value != '')) {
        rows[i].style.background = 'black'
        rows[i].style.color = 'white'
        } else {
          rows[i].style.background = 'white'
          rows[i].style.color = 'black'
        }
    } 
  });

  const select = document.querySelector('select')
  select.addEventListener('change', () => {
    const regSelect = new RegExp(select.value);
    const table = document.querySelector('.table')
    let sum = 0
    for(let i = 1; i < table.rows.length - 1; i++){
        const td = table.rows[i].cells
        if(!regSelect.test(td[0].textContent.toLowerCase()) && select.value !== ''){   
            td[0].parentNode.style.display = 'none'
            continue 
        } else {
            td[0].parentNode.style.display = ''
            sum += Math.pow(parseInt(td[3].textContent.replace('$', '')), parseInt(td[2].textContent))
        }
    }
  
    const price = document.querySelector('tfoot').rows[0].cells[3]
    price.textContent = sum + '$'
  })
};

function loadTable (GOODS, tfoot) {  
  let sum = 0;
  const tbody = document.querySelector('.tbody');
  let contentTable  = '';
  for(let goods of GOODS){
    contentTable += `<tr><td>${goods.category === 'supplies'?'Office ' + goods.category:goods.category.charAt(0).toUpperCase() + 
    goods.category.substring(1, goods.category.length)}</td><td>${goods.name}</td><td>${goods.amount}</td><td>${goods.price}</td></tr>`;
    sum += Math.pow(goods.price, goods.amount);
  }

  tbody.innerHTML = contentTable;
  const price = tfoot.rows[0].cells[3];
  price.textContent = sum + '$';
}

let fName = false
let fCategory = false
const category = document.querySelector('.category__span')
const name = document.querySelector('.name__span')
const tFoot = document.querySelector('tfoot')
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

  loadTable(GOODS, tFoot);
}
 
function sortAlphabetically(flag, column){
  GOODS = GOODS.sort((cell1, cell2) => {
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








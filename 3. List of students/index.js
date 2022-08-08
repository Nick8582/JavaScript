import { addStudentsTable } from "./function/add.js";
import { searchFunction, clearSearch } from "./function/search.js";

export let memoryStudents = []; //Здесь будет храниться наш localStorage

let html = '';
let app = document.getElementById('app'); //Получаем id куда будем все наши блоки писать

createApp(app, 'Список студентов', 'Выполнил: Владислав Потапов'); //Вызываеи функцию для отрисовки нашего приложения

let selector = document.querySelector("#dateSkill");
let selectorBrith = document.querySelector("#dateBirth");
let lastDate = '1900';
let lastDateSkill = '2000';
let newDate = new Date(new Date().getFullYear());

new window.JustValidate('#form', {
  colorWrong: '#D11616',
  rules: {
    name: {
      required: true,
      minLength: 2,
    },
    surname: {
      required: true,
      minLength: 2,
    },
    patronymic: {
      required: true,
      minLength: 3,
    },
    dateBirth: {
      required: true,
      function: (name, value) => {
        let dateB = selectorBrith.value;
        console.log(Number(dateB))
        dateB = new Date(dateB);
        dateB = new Date(dateB.getFullYear());
        return Number(newDate) >= Number(dateB) && Number(dateB) >= Number(lastDate)
      }
    },
    dateSkill: {
      required: true,
      minLength: 4,
      function: (name, value) => {
        const date = selector.value;
        return Number(newDate) >= Number(date) && Number(date) >= Number(lastDateSkill);
      }
    },
    fakult: {
      required: true
    }
  },
  messages: {
    name: { required: 'Заполните поле' },
    surname: { required: 'Заполните поле' },
    patronymic: { required: 'Заполните поле' },
    dateBirth: { required: 'Заполните поле', function: 'Год должен быть не меньше 1900 и не больше ' + Number(newDate) },
    dateSkill: { required: 'Заполните поле', minLength: 'Год должен быть не меньше 2000', function: 'Год должен быть не меньше 2000 и не больше ' + Number(newDate) },
    fakult: { required: 'Заполните поле' }
  },
  submitHandler: function(form) {
    addStudentsTable();
  }
})


//Постройка контейнеров из функций
function createApp(container, name, nameAdmin) {
  let header = createHeader(name, nameAdmin);
  let main = createMain();
  container.append(header);
  container.append(main);
};
// </-- ** -->

//Постройка хедера приложения
function createHeader(nameProject, nameAutor) {
  let blockHeader = document.createElement('header');
  let containerHeader = document.createElement('div');
  let lineHeader = document.createElement('div');
  let titleHeader = document.createElement('h1');
  let autor = document.createElement('p');

  blockHeader.classList.add('header', 'p-3');
  containerHeader.classList.add('container');
  lineHeader.classList.add('row', 'justify-content-between', 'align-items-center');
  titleHeader.classList.add('col-4');
  autor.classList.add('col-3', 'm-0');

  titleHeader.textContent = nameProject;
  autor.textContent = nameAutor;

  lineHeader.append(titleHeader);
  lineHeader.append(autor);
  containerHeader.append(lineHeader);
  blockHeader.append(containerHeader);

  return blockHeader
}
// </-- ** -->

// Постройка тела приложения
function createMain() {
  const mainContainer = document.createElement('main');

  //Переделать на функцию создания формы добавления кнопкой и также поиск

  mainContainer.append(createFormBtn());
  mainContainer.append(createSearch());
  mainContainer.append(createForm());
  mainContainer.append(createTable());

  return mainContainer
}
// </-- ** -->

function createFormBtn() {
  let container = document.createElement("div");
  let row = document.createElement("div");

  let btnAdd = document.createElement("button");
  let btnSearch = document.createElement("button");

  container.classList.add('container');
  row.classList.add('row');
  btnAdd.classList.add('btn', 'btn-primary', 'col-3', 'm-3');
  btnSearch.classList.add('btn', 'btn-primary', 'col-3', 'm-3');

  btnAdd.textContent = 'Добавить студента';
  btnSearch.textContent = 'Найти студента';

  btnAdd.setAttribute('id', 'createAdd');
  btnSearch.setAttribute('id', 'createSearch');

  row.append(btnAdd);
  row.append(btnSearch);
  container.append(row);

  return container
}

let btnAdd = document.querySelector('#createAdd');
let btnSearch = document.querySelector('#createSearch');
btnAdd.onclick = function(e) {
  e.preventDefault;
  let addStudentsForm = document.querySelector('#addStudentsForm');
  let searchStudentsForm = document.querySelector('#searchStudentsForm');

  addStudentsForm.classList.toggle('d-none');
  btnAdd.classList.toggle('btn-danger');
  addStudentsForm.setAttribute('data-container', 'block');

  if (searchStudentsForm.dataset.container === 'block') {
    searchStudentsForm.setAttribute('data-container', 'none');
    searchStudentsForm.classList.add('d-none');
    btnSearch.classList.remove('btn-danger');
  };
}

btnSearch.onclick = function(e) {
  e.preventDefault;
  let searchStudentsForm = document.querySelector('#searchStudentsForm');
  let addStudentsForm = document.querySelector('#addStudentsForm');

  searchStudentsForm.classList.toggle('d-none');
  btnSearch.classList.toggle('btn-danger');
  searchStudentsForm.setAttribute('data-container', 'block');

  if (addStudentsForm.dataset.container === 'block') {
    addStudentsForm.setAttribute('data-container', 'none');
    addStudentsForm.classList.add('d-none');
    btnAdd.classList.remove('btn-danger');
  };
}

// Постройка тела формы добавления студента
function createForm() {
  let inputValue = [
    { placeholder: 'Фамилия', id: 'surname', type: 'text' },
    { placeholder: 'Имя', id: 'name', type: 'text' },
    { placeholder: 'Отчество', id: 'patronymic', type: 'text' },
    { placeholder: 'Дата рождения', id: 'dateBirth', type: 'date' },
    { placeholder: 'Год начала обучения', id: 'dateSkill', type: 'number' },
    { placeholder: 'Факультет', id: 'fakult', type: 'text' }
  ]

  let col;
  let html = '';

  for (let i = 0; i < inputValue.length; i++) {
    col = inputValue[i];
    createInput(col);
  }

  let container = document.createElement('div');
  let lineContainer = document.createElement('div');
  let title = document.createElement('h2');
  let formContainer = document.createElement('form');
  let inputContainer = document.createElement('div');
  let btn = document.createElement('button');

  container.classList.add('container', 'd-none');
  lineContainer.classList.add('row', 'justify-content-between');
  formContainer.classList.add('row', 'form');
  inputContainer.classList.add('row', 'mb-3');
  btn.classList.add('btn', 'btn-success', 'col-3');

  formContainer.setAttribute('id', 'form');
  formContainer.setAttribute('metod', 'POST')
  container.setAttribute('id', 'addStudentsForm');
  container.setAttribute('data-container', 'none');

  function createInput(array) {
    let colInput = `
      <div class="col-4 mb-3 position-relative" id="${array.id}Container">
        <label class="col-12">
        <span>${array.placeholder}</span>
        <input class="form-control" id="${array.id}" type="${array.type}" data-validate-field="${array.id}" placeholder="${array.placeholder}">
        </label>
      </div>
    `
    html += colInput
  }

  inputContainer.innerHTML = html;

  title.textContent = 'Форма добавления студента';
  btn.textContent = 'Добавить студента';

  formContainer.append(inputContainer);
  formContainer.append(btn);
  lineContainer.append(title);
  lineContainer.append(formContainer);
  container.append(lineContainer);

  return container
}
// </-- ** -->

function createSearch() {
  let container = document.createElement('div');
  let row = document.createElement('div');
  let form = document.createElement('form');
  let title = document.createElement('h2');
  let inputContainer = document.createElement('div');
  let btn = document.createElement('button');
  let btnClear = document.createElement('button');

  let col;
  let html = '';

  let inputValue = [
    { placeholder: 'Фамилия', id: 'surnameSearch', type: 'text' },
    { placeholder: 'Имя', id: 'nameSearch', type: 'text' },
    { placeholder: 'Отчество', id: 'patronymicSearch', type: 'text' },
    { placeholder: 'Дата рождения', id: 'dateBirthSearch', type: 'date' },
    { placeholder: 'Год начала обучения', id: 'dateSkillSearch', type: 'number' },
    { placeholder: 'Факультет', id: 'fakultSearch', type: 'text' }
  ]

  for (let i = 0; i < inputValue.length; i++) {
    col = inputValue[i];
    createInput(col);
  }

  container.classList.add('container', 'd-none');
  row.classList.add('row');
  form.classList.add('row', 'form');
  inputContainer.classList.add('row', 'mb-3');
  btn.classList.add('btn', 'btn-success', 'col-3', 'm-3');
  btnClear.classList.add('btn', 'btn-secondary', 'col-2', 'm-3');


  title.textContent = 'Форма поиска студента';
  btn.textContent = 'Найти студента';
  btnClear.textContent = 'Сброс';

  container.setAttribute('id', 'searchStudentsForm');
  btn.setAttribute('id', 'btnSearchTo');
  btnClear.setAttribute('id', 'btnSearchClear');
  container.setAttribute('data-container', 'none');

  form.setAttribute('metod', 'POST');

  function createInput(array) {
    let colInput = `
      <div class="col-4 mb-3 position-relative" id="${array.id}Container">
        <label class="col-12">
        <span>${array.placeholder}</span>
        <input class="form-control" id="${array.id}" type="${array.type}" placeholder="${array.placeholder}">
        </label>
      </div>
    `
    html += colInput;
  }

  inputContainer.innerHTML = html;


  form.append(inputContainer);
  form.append(btn);
  form.append(btnClear);
  row.append(title);
  row.append(form);
  container.append(row);

  return container
}


// Построение тела таблицы
function createTable() {
  let container = document.createElement('div');
  let lineContainer = document.createElement('div');
  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');
  let tr = document.createElement('tr');
  let array = [
    { name: 'Фамилия', type: 'string' },
    { name: 'Имя', type: 'string' },
    { name: 'Отчество', type: 'string' },
    { name: 'Дата рождения', type: 'date' },
    { name: 'Год начала обучения', type: 'number' },
    { name: 'Факультет', type: 'string' }
  ]

  container.classList.add('container', 'mb-5');
  lineContainer.classList.add('row');
  table.classList.add('col-12', 'table', 'table-striped');

  let col;
  let a = 1;

  function thArray(arr) {
    let th = document.createElement('th');
    th.classList.add('col');
    th.textContent = arr.name;
    th.setAttribute('data-type', arr.type);
    tr.append(th);
  }

  for (let i = 0; i < array.length; i++) {
    col = array[i];
    thArray(col);
  }

  if (localStorage.getItem('Студенты')) {
    let array = JSON.parse(localStorage.getItem('Студенты'));
    for (let i = 0; i < array.length; i++) {
      memoryStudents.push(array[i]);
      memoryFunction(array[i]);
    }
  }

  tbody.innerHTML = html;
  tbody.setAttribute('id', 'tbody');

  thead.append(tr);
  table.append(thead);
  table.append(tbody);
  lineContainer.append(table);
  container.append(lineContainer);

  return container
}
// </-- ** -->


export function memoryFunction(array) {
  let now = new Date();
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let getDate = new Date(array.dateBirth);
  let getDateNow = new Date(today.getFullYear(), getDate.getMonth(), getDate.getDate());
  let age;

  let fullDate = new Date(array.dateBirth).toLocaleDateString(); /* Дата рождения */

  age = today.getFullYear() - getDate.getFullYear();
  if (today < getDateNow) {
    age = age - 1;
  }

  let dateSkill = Number(array.dateSkill);
  let dateSkillEnd = dateSkill + 4;
  let todaySkill = new Date(now.getFullYear(), now.getMonth());
  let september = new Date('1900-09');
  let dateSkillSeptember = new Date(todaySkill.getFullYear(), september.getMonth());
  let course;

  let b = new Date(now.getFullYear());
  b = Number(b);
  course = b - dateSkill;
  if (dateSkillSeptember > todaySkill) {
    if (course == 0) {
      course = 'Поступил'
    } else if (course > 4) {
      course = 'Закончил'
    } else {
      course = course + ' курс';
    }
  } else if (dateSkillSeptember <= todaySkill) {
    if (course >= 4) {
      course = 'Закончил'
    } else {
      course = course + 1 + ' курс';
    }
  };

  let trBody = `
    <tr>
      <td> ${array.surname} </td>
      <td> ${array.name} </td>
      <td> ${array.patronymic} </td>
      <td> ${fullDate} (${age})  </td>
      <td> ${array.dateSkill} - ${dateSkillEnd} (${course})</td>
      <td> ${array.fakult} </td>
    </tr>
    `

  html += trBody;

  let tbody = document.querySelector("#tbody");
  if (tbody != null) {
    addTbody(tbody, html);
  }
}

function addTbody(tbody, html) {
  tbody.innerHTML = html;
}

let btnSearchTo = document.querySelector('#btnSearchTo');
let btnSearchClear = document.querySelector('#btnSearchClear')

btnSearchTo.onclick = function(event) {
  event.preventDefault;
  searchFunction();

  return false
}

btnSearchClear.onclick = function(event) {
  event.preventDefault;
  clearSearch();

  return false
}

const table = document.querySelector('.table');
const headers = table.querySelectorAll('th');
const tableBody = table.querySelector('tbody');
const rows = tableBody.querySelectorAll('tr');

const directions = Array.from(headers).map(function(header) {
  return '';
});

const transform = function(index, content) {
  const type = headers[index].getAttribute('data-type');
  switch (type) {
    case 'number':
      return parseFloat(content);
    case 'string':
    default:
      return content;
  }
};

const sortColumn = function(index) {
  const direction = directions[index] || 'asc';
  const multiplier = (direction === 'asc') ? 1 : -1;
  const newRows = Array.from(rows);

  newRows.sort(function(rowA, rowB) {
    const cellA = rowA.querySelectorAll('td')[index].innerHTML;
    const cellB = rowB.querySelectorAll('td')[index].innerHTML;

    const a = transform(index, cellA);
    const b = transform(index, cellB);

    switch (true) {
      case a > b:
        return 1 * multiplier;
      case a < b:
        return -1 * multiplier;
      case a === b:
        return 0;
    }
  });
  [].forEach.call(rows, function(row) {
    tableBody.removeChild(row);
  });
  directions[index] = direction === 'asc' ? 'desc' : 'asc';
  newRows.forEach(function(newRow) {
    tableBody.appendChild(newRow);
  });
};
[].forEach.call(headers, function(header, index) {
  header.addEventListener('click', function() {
    sortColumn(index);
  })
});

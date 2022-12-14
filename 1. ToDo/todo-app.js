(function () {

  // Создаем пустой массив куда будем записывать данные для localStorage.
  let todoArray = [];

  // Функция, которая создает title на странице.
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  // Создание формы.
  // <form class="input-group mb-3">
  // **<input class="form-control" placeholder="Введите название нового дела"></input>
  // **<div class="input-group-append">
  // ****<button class="btn btn-primary">Добавить дело</button>
  // **</div>
  // </form>
  function createTodoForm() {
    let form = document.createElement('form'); // Создать элемент <form>
    let input = document.createElement('input'); // Создать элемент <input>
    let button = document.createElement('button'); // Создать элемент <button>
    let buttonWrapper = document.createElement('div'); // Создать элемент <div>

    // Устанавливаем кнопке "Добавить дело" атрибут disabled, когда input пуст.
    button.disabled = !input.value.length;

    // Ставим команду на input, при появлении одного символа убираем атрибут disabled для кнопки
    input.addEventListener('input', () => {
      button.disabled = !input.value.length;
    });

    //Добавим классы для формы
    form.classList.add('input-group', 'mb-3'); // <form class="input-group mb-3">
    input.classList.add('form-control'); // <input class="form-control">
    input.placeholder = 'Введите название нового дела'; // <input class="form-control" placeholder="Введите название нового дела">
    button.classList.add('btn', 'btn-primary'); // <button class="btn btn-primary">
    button.textContent = 'Добавить дело'; // <button class="btn btn-primary">Добавить дело</button>
    buttonWrapper.classList.add('input-group-append'); // <div class="input-group-append">

    //Указываем вложенность элементов
    buttonWrapper.append(button); // <div> <button></button> </div>
    form.append(input); // <form> <input></input> </form>
    form.append(buttonWrapper); // <form> <div> <button></button> </div> </form>
    return {
      form,
      input,
      button,
    };
  }

  // Создание списка дел куда будут вставляться li элементы. <ul class="list-group"></ul>
  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  // Создание элементов списка.
  // <li class="list-group-item d-flex justify-content-between align-items-center">
  // **"Название дела" - item.textContent.
  // **<div class="btn-group btn-group-sm">
  // ****<button class="btn btn-success">Готово</button>
  // ****<button class="btn btn-danger">Удалить</button>
  // **</div>
  // </li>
  function createTodoItem(name) {
    let item = document.createElement('li'); // Создать элемент <li>
    let buttonGroup = document.createElement('div'); // Создать элемент <div>
    let doneButton = document.createElement('button'); // Создать элемент <button>
    let deleteButton = document.createElement('button'); // Создать элемент <button>

    // Присваиваем каждому элементу списка рандомное число. В нашем случае в диапозоне 1500. Округленное до ближайшего целого. Другого способа не могу найти так как если не существует данныйх в локальном хранилище у меня выпадает ошибка.
    let randomIdItem = Math.round(Math.random() * 1500);
    item.id = randomIdItem; // Присваеваем ID нашему элементу списка <li>

    //Добавим классы для списка
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center'); // <li class="list-group-item d-flex justify-content-between align-items-center">
    doneButton.classList.add('btn', 'btn-success'); // <button class="btn btn-success">Готово</button>
    deleteButton.classList.add('btn', 'btn-danger'); // <button class="btn btn-danger">Удалить</button>
    item.textContent = name; // <li>Название дела</li>
    buttonGroup.classList.add('btn-group', 'btn-group-sm'); // <div class="btn-group btn-group-sm">
    doneButton.textContent = 'Готово'; // <button>Готово</button>
    deleteButton.textContent = 'Удалить'; // <button>Удалить</button>

    //Указываем вложенность элементов
    buttonGroup.append(doneButton); // <div><button>Готово</button>
    buttonGroup.append(deleteButton); // <button>Удалить</button></div>
    item.append(buttonGroup); // <li><div>Кнопки</div></li>
    return {
      item,
      doneButton,
      deleteButton,
      buttonGroup,
    };
  }

  // Функция, которая меняет значение у наших li элемнтов. done: true/false
  function changeItemDone(arr, item) {
    arr.map(obj => { // Проходимся по массиву
      if (obj.id === item.id & obj.done === false) { // Если наш объект с присвоенным ID равен <li id="obj.id"> и если у объекта значение done равно false
        obj.done = true; // тогда выполнить код: присовить значению done = true
      } else if (obj.id === item.id & obj.done === true) { // Если наш объект с присвоенным ID равен <li id="obj.id"> и если у объекта значение done равно true
        obj.done = false; // тогда выполнить код: присовить значению done = false
      }
    });
  }

  // Ставим слушателя события по клику на кнопку doneButton(готово)
  function completeTodoItem(item, btn) { // Создаем два аргумента. item - на наш li элемент и кнопку btn у этого элемента.
    btn.addEventListener('click', () => { // на кнопку вешаем событие click
      todoArray = JSON.parse(localStorage.getItem(key)); // получаем в пустой массив todoArray в формате JSON строки, которые получаем из локального хранилища с ключём key
      item.classList.toggle('list-group-item-success'); // Если мы произвели клик на кнопку(готово) добавляем класс к элементу <li> и строчка окрасится в зеленый.
      changeItemDone(todoArray, item); // Это необходимо для того, чтобы значения done менялись у наших <li> элементов.

      localStorage.setItem(key, JSON.stringify(todoArray)); // Записываем в локальное хранилище ключ(key) и его значение(value) - наш массив todoArray с преобразованием в строку
    });
  }

  // Ставим слушателя события по клику на кнопку deleteButton(удалить)
  function deleteTodoItem(item, btn) { // Создаем два аргумента. item - на наш li элемент и кнопку btn у этого элемента.
    btn.addEventListener('click', () => { // на кнопку вешаем событие click
      if (confirm('Вы уверены?')) { // Проводим проверку, когда пользователь хочет удалить элемент из списка. По дефолту confirm имеет true/false
        todoArray = JSON.parse(localStorage.getItem(key)); // получаем в пустой массив todoArray в формате JSON строки, которые получаем из локального хранилища с ключём key
        let newList = todoArray.filter(obj => obj.id !== item.id); // Создаем новую переменную в которой наш массив фильтруется и записывается в новую переменную newlist.
        // obj - если элемент массива вернет true, тогда он останется в массиве, если же он вернет false, то удалится из массива
        // obj.id - присвоенный ID в локальном хранилище строго не равен <li id="obj.id">
        localStorage.setItem(key, JSON.stringify(newList)); // записываем в ключ(key) новую переменную в которой записываем отфильтрованныые элементы списка. (удалим элемент из хранилища)
        item.remove();
      }
    });
  }

  /////////////////////////////////////////////////

  // Создание тела страницы.
  function createTodoApp(container, title, key) { // Приложение принимает 3 аргумента, которые есть у наших 3-ёх страниц. Это container, он один общий. У всех страниц есть title. Ну и ключи, которые будут сохраняться для каждой из страниц свои.
    let todoAppTitle = createAppTitle(title); // Инициализуем в наше приложение Заголовок(Мои дела, Дела мамы, Дела папы).
    let todoItemForm = createTodoForm(); // Инициализуем форму <input> и кнопку <button> добавить дело.
    let todoList = createTodoList(); // Инициализуем наш список дел.

    container.append(todoAppTitle); // Добавляем в container заголовок.
    container.append(todoItemForm.form); // Добавляем в container форму.
    container.append(todoList); // Добавляем в container список дел.

    if (localStorage.getItem(key)) { // Если в хранилище есть ключи, забираем их.
      todoArray = JSON.parse(localStorage.getItem(key));

      for (let obj of todoArray) { // Пробегаемся по нашему массиву todoArray
        let todoItem = createTodoItem(todoItemForm.input.value); // Создаем элементы списка item, buttonGroup.

        todoItem.item.textContent = obj.name; // Из хранилища берем и добавляем в наш item элемент.
        todoItem.item.id = obj.id; // Так же из хранилища берем ID элемента и отдаем его <li>.

        if (obj.done == true) {  // Тут проводим проверку на true/false из нашего хранилища. Если элемент из хранилища будет равен true - закрашиваем <li> в зеленый цвет.
          todoItem.item.classList.add('list-group-item-success');
        } else {
          todoItem.item.classList.remove('list-group-item-success'); // Иначе удаляем класс готовности.
        }

        completeTodoItem(todoItem.item, todoItem.doneButton); // Инициализируем наши элементы списка, а именно <li> кнопку готово.
        deleteTodoItem(todoItem.item, todoItem.deleteButton); // Инициализируем наши элементы списка, а именно <li> кнопку удалить.

        todoList.append(todoItem.item); // К нашему списку добавляем item(<li>)
        todoItem.item.append(todoItem.buttonGroup); // К нашему списку добавляем кнопки (готово, удалить)
      }
    }

    // Ставим слушателя на кнопку добавить дело.
    todoItemForm.form.addEventListener('submit', function (e) {
      e.preventDefault(); // Чтобы страница не перезагружалась при нажатии на кнопку.
      let todoItem = createTodoItem(todoItemForm.input.value); // Добавление дела.

      if (!todoItemForm.input.value) { // Если поле <input> был пусто ничего не делать
        return;
      }

      completeTodoItem(todoItem.item, todoItem.doneButton); // Инициализируем наши элементы списка, а именно <li> кнопку готово.
      deleteTodoItem(todoItem.item, todoItem.deleteButton); // Инициализируем наши элементы списка, а именно <li> кнопку удалить.

      let localStorageData = localStorage.getItem(key); // В новую переменную получаем ключи из key

      if (localStorageData == null) { // если в новой переменной ничего нет, то данные берем из нашего масива todoArray
        todoArray = [];
      } else { // Иначе берем данные из localStorageData
        todoArray = JSON.parse(localStorageData);
      }

      // Создаем наше хранилище itemObj в котором будет = name, id, done
      let createItemObj = (arr) => {
        let itemObj = {}; // пустой объект в который будем записывать
        itemObj.name = todoItemForm.input.value; // Где name будет равен item
        itemObj.id = todoItem.item.id; // где ID будет равен item.id
        itemObj.done = false; // создаем дефолтное значени false для каждого нового элемента
        arr.push(itemObj); // пушим в arr наши данные
      }
      createItemObj(todoArray); //Инициалузируем выше наше хранилище.
      localStorage.setItem(key, JSON.stringify(todoArray));

      todoList.append(todoItem.item); // добавляем в список элементы.
      todoItemForm.input.value = ''; // Когда добавим дело в список - обнулить input
      todoItemForm.button.disabled = !todoItemForm.button.disabled; // Когда добавим дело в список - заблокировать кнопку.
    });
  }
  window.createTodoApp = createTodoApp; // Загружаем все это дело
})();

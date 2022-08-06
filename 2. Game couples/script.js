/*document.addEventListener("DOMContentLoaded", () => {
document.addEventListener("DOMContentLoaded", () => {
  let option = document.getElementById("option").value;
})

let app = document.getElementById("app");

/*Тайтел готово */
let createHeader = (title) => {
  let h1 = document.createElement("h1");
  h1.classList.add("text-center", "mb-3");
  h1.textContent = title;
  return h1;
}

/*Чарт игры*/
let chart = () => {
  let wins = document.createElement("div");
  let title = document.createElement("h3");
  let calc = document.createElement("p");
  wins.classList.add("col-3", "mx-auto", "text-center")


  let summ = "2"; /*Здесь будет стоять счетчик выгранных игр сохранный в локальном хранилище */

  title.textContent = "Выйграно";
  calc.textContent = summ + ' игры';

  wins.append(title);
  wins.append(calc);
  /*В этот блок еще необходимо поставить кнопки для выбора режима */
  return wins;
}

/*Сама игра*/
let gameCard = (arg) => {

    if (arg % 2) {
      alert("Не верное число")
    } else {
      let sumCard = arg * arg; //здесь указывается сколько на сколько поле
      attr = "data-val";

      let row = document.createElement("div");
      row.classList.add("row");

      for (let i = 0; i < sumCard; i++) {
        let card = document.createElement('div');
        card.classList.add("col-3", "size-card");

        const backCard = document.createElement('div');
        let faceCard = document.createElement('div');

        backCard.textContent = "Веселые игры";

        if (i + 1 > sumCard / 2) {
          let duobleTextContent = i + 1 - sumCard / 2;
          faceCard.textContent = duobleTextContent;
          card.setAttribute(attr, duobleTextContent)
        } else {
          let textContent = i + 1;
          faceCard.textContent = textContent;
          card.setAttribute(attr, textContent)
        }

        backCard.classList.add("back-card");
        faceCard.classList.add("fs-1");
        card.append(faceCard);
        card.append(backCard);

        row.append(card);
      }

      return row
    }

  } //СОздали нужное количество карт с нажными параметрами


/*Вывод всего приложения*/
let createTable = (container) => {

  let option = document.getElementById("option").value;

  app.innerHTML = "";

  let titleHeader = createHeader('Игра в пары');
  let top = chart();
  let game = gameCard(option);

  container.append(titleHeader);
  container.append(top);
  container.append(game);
  gameStart()
}



/*createTable(app, arg);*/ //Вызов поля для игры в пары

let gameStart = () => {


  //Логика приложения
  let hasFlippedCard = false; //ставим значение по умолчанию
  let lockCard = false; //Блокировка карт
  let firstCard, secondCard; //Объявляем переменную


  const cards = document.querySelectorAll('.size-card'); //Ищем все карты по классу

  function flipCard() {
    if (lockCard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    lockCard = true;

    checkForMatch();
  }; //Финкция отвечающая за эфект переворачивания

  let checkForMatch = () => {
    let isMath = firstCard.dataset.val === secondCard.dataset.val;
    isMath ? disableCard() : unflipCards();
  }; //Сравнение карт


  let disableCard = () => {
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);

      resetCard();
    } //Отключение обработчика событий

  let unflipCards = () => {
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      resetCard();
    }, 1000);
  }; //Если карты будут отличаться они перевернуться обратно через секунду

  let resetCard = () => {
      [hasFlippedCard, lockCard] = [false, false];
      [firstCard, secondCard] = [null, null];
    } //Сброс карт


  (randomize = () => {
    cards.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * 16);
      card.style.order = ramdomPos;
    });
  })(); //функция чтобы перемешать карты

  cards.forEach(card => card.addEventListener('click', flipCard)); //Обработчик клика
  /*});*/
}
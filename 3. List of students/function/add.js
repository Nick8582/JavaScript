import { memoryStudents, memoryFunction } from "../index.js";

export function addStudentsTable() {
  let name = document.querySelector('#name');
  let surname = document.querySelector('#surname');
  let patronymic = document.querySelector('#patronymic');
  let dateBirth = document.querySelector('#dateBirth');
  let dateSkill = document.querySelector('#dateSkill');
  let fakult = document.querySelector('#fakult');

  let addStudents = {
    name: name.value,
    surname: surname.value,
    patronymic: patronymic.value,
    dateBirth: dateBirth.value,
    dateSkill: dateSkill.value,
    fakult: fakult.value
  };

  name.value = "";
  surname.value = "";
  patronymic.value = "";
  dateBirth.value = "";
  dateSkill.value = "";
  fakult.value = "";

  memoryFunction(addStudents);
  memoryStudents.push(addStudents);

  localStorage.setItem('Студенты', JSON.stringify(memoryStudents));
}
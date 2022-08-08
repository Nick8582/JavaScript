export function searchFunction() {
  let td, txtValue;

  let searchStudentsForm = document.querySelector('#searchStudentsForm');
  let inputSearch = searchStudentsForm.getElementsByTagName('input');

  let table = document.querySelector('#tbody');
  let tr = table.getElementsByTagName('tr');

  let memoryInput = []
  for (let i = 0; i < inputSearch.length; i++) {
    inputSearch[i].id
    memoryInput.push(inputSearch[i].value.toUpperCase())
  }

  endSearch(memoryInput)

  function endSearch(memoryInput) {
    for (let a = 0; a < memoryInput.length; a++) {
      let c = memoryInput[a];
      if (c != '') {
        for (let i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName('td')[a];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(c) > -1) {
              tr[i].classList.remove('d-none');
            } else {
              tr[i].classList.add('d-none');
            }
          }
        }
      }
    }
  }
};

export function clearSearch() {
  let table = document.querySelector('#tbody');
  let tr = table.getElementsByTagName('tr');

  for (let i = 0; i < tr.length; i++) {
    tr[i].classList.remove('d-none')
  }
};

let lists = document.querySelectorAll(".list");
let btnAddCards = document.querySelector(".add_btn");
let field = document.querySelector(".field");
let userArr = [];
let userId = 0;
let currentDate;
let value1;
let value2;
let value3;
let value4;
let value5;
let commentArray = [];
let USER_URL = "https://randomuser.me/api/?results=";

btnAddCards.addEventListener("click", () => {
  field.getElementsByClassName.display = "block";
  btnAddCards.style.display = "none";

  btnAddCards.setAttribute("disabled", true);
  setTimeout(() => {
    showModal();
  }, 1);
});

function showModal() {
  let modal = document.createElement("div");
  modal.className = "modal-wrapper";
  modal.innerHTML = `
            <div class="modal">
            <div class="modal-header">
                <h2>Додавання карточки</h2>      
            </div>
            <div class="modal-column">
                <label class="input_board_card_name" for="title">Назва карточки: </label>
                <input type="text" name="" class="card_title"  value="">
            </div>
            <div class="modal-column">
                <label for="">Опис задачі: </label>
                <textarea name="" class="task_text" ></textarea>
            </div>
            <div class="modal-column">
                <label for="">Сроки для виконання: </label>
                <input type="date" class="expiredDate" name="trip-start"
                value="${currentDate}" min="${currentDate}"> </div>
                <div class="buttons">
                <div class="positionn_btn"><button class="clear__item_btn">Очистити</button></div>
                <div class="positionn_btn"><button class="add__item_btn">Додати задачу</button>
                <button class="remove__item_btn">Відмінити</button>
            </div>
          </div>
        </div>
       `;

  document.querySelector(".field").appendChild(modal);
  dragNDrop();

  document.querySelector(".card_title").addEventListener("input", (e) => {
    value1 = e.target.value;
  });
  document.querySelector(".task_text").addEventListener("input", (e) => {
    value2 = e.target.value;
  });
  document.querySelector(".expiredDate").addEventListener("input", (e) => {
    value3 = e.target.value;
  });
  document.querySelector(".clear__item_btn").addEventListener("click", () => {
    document.querySelector(".card_title").value = "";
    document.querySelector(".task_text").value = "";
    document.querySelector(".expiredDate").value = "";
  });
  document.querySelector(".remove__item_btn").addEventListener("click", () => {
    btnAddCards.style.display = "block";
    modal.remove(".modal-wrapper");
  });
  document
    .querySelector(".add__item_btn")
    .addEventListener("click", renderComments);
  dragNDrop();
  document.querySelector(".add__item_btn").addEventListener("click", () => {
    modal.remove(".modal-wrapper");
    btnAddCards.style.display = "block";
  });
  dragNDrop();
}

function renderComments() {
  const newItem = document.createElement("div");
  newItem.classList.add("list__item");
  newItem.textContent = value1 + " " + value2 + " " + value3;
  newItem.setAttribute("draggable", "true");
  lists[0].appendChild(newItem);
  dragNDrop();
  btn.style.display = "flex";

  task_text.value1 = "";
  card_title.value2 = "";
  expiredDate.value2 = "";
  value1 = "";
  value2 = "";
  value3 = "";
}

let getCurrentDate = () => {
  let today = new Date();
  let year = today.getFullYear();
  let month;
  let date;
  if (today.getMonth() + 1 < 10) {
    month = `` + today.getMonth() + 1;
  } else {
    month = today.getMonth() + 1;
  }
  if (today.getDate() < 10) {
    date = `0` + today.getDate();
  } else {
    date = today.getDate();
  }
  return year + `-` + month + `-` + date;
};

function createBtn() {
  let modalWindow = document.createElement("div");
  modalWindow.classList.add("modal_window");
  document.querySelector("main").append(modalWindow);
  modalWindow.innerHTML = `
          <div class="window">
              <p class="modal_title">Створення нової дошки</p>
              <label class="input_board_name_label" for="input_board_name">Введіть назву дошки:</label>
              <textarea class="textarea" name="" id="input_board_name" cols="5" rows="40"></textarea>
              <label class="input_board_color_label" for="input_board_color">Оберіть колір дошки:</label>
              <input type="color" value="#5F9EA0" class="input_board_color" id="input_board_color">
              <div class="buttons">
              <button class="add__new_dask">Cтворити нову дошку</button>
              <button class="remove__inew_dask">Відмінити</button>
            </div>
          </div>
      `;

  document.querySelector(".remove__inew_dask").addEventListener("click", () => {
    modalWindow.remove(".modal_window");
  });
  dragNDrop();
  const iV = document.querySelector(".input_board_color").value;

  document.querySelector(".add__new_dask").addEventListener("click", () => {
    function addBoard() {
      const boards = document.querySelector(".main__inner_newdiv");
      const board = document.createElement("div");
      board.classList.add("board__item");

      board.innerHTML = `
      
          <span class="title" contenteditable="true" value="">Введіть назву
          </span>
          <div class="list">
          </div>
          <button class="add_modal">+ Додати задачу</button>
          <button class="remove__dask">Видалити дошку</button>
          
      `;
      dragNDrop();
      boards.appendChild(board);
      changeTitle();
      dragNDrop();
      document.querySelector(".add_modal").addEventListener("click", () => {
        showModal();
      });
      document.querySelector(".remove__dask").addEventListener("click", () => {
        board.remove();
      });
      board.style.backgroundColor = iV;
      dragNDrop();
    }

    modalWindow.remove(".modal_window");
    addBoard();

    dragNDrop();
  });
  dragNDrop();
  document.querySelector(".reset_btn").addEventListener("click", () => {
    modalWindow.remove();
    board.remove();
    boards.remove();
  });

  dragNDrop();
}

function changeTitle() {
  const titles = document.querySelectorAll(".title");
  titles.forEach((title) => {
    title.addEventListener("click", (e) => (e.target.textContent = ""));
  });
  dragNDrop();
}
changeTitle();

let draggedItem = null;
function dragNDrop() {
  const listItems = document.querySelectorAll(".list__item");
  const lists = document.querySelectorAll(".list");

  for (let i = 0; i < listItems.length; i++) {
    const item = listItems[i];

    item.addEventListener("dragstart", () => {
      draggedItem = item;
      setTimeout(() => {
        item.style.display = "none";
      }, 0);
    });

    item.addEventListener("dragend", () => {
      setTimeout(() => {
        item.style.display = "block";
        draggedItem = "";
      }, 0);
    });

    item.addEventListener("dblclick", () => {
      item.remove();
    });

    for (let j = 0; j < lists.length; j++) {
      const list = lists[j];

      list.addEventListener("dragover", (e) => e.preventDefault());

      list.addEventListener("dragenter", function (e) {
        e.preventDefault();
        this.style.backgroundColor = "rgba(0,0,0,.1)";
      });

      list.addEventListener("dragleave", function (e) {
        this.style.backgroundColor = "rgba(0,0,0,0)";
        this.append(draggedItem);
      });
    }
  }
}
dragNDrop();

function resetBtn() {
  document.querySelector(".main__inner").remove();
}

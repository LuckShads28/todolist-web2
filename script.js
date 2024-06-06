let ulTasks = $('#ulTasks')
let btnAdd = $('#btnAdd')
let btnReset = $('#btnReset')
let btnSort = $('#btnSort')
let btnCleanup = $('#btnCleanup')
let inpNewTask = $('#inpNewTask')
let darkmodeButton = $("#dark-button");

function loadTodo() {
  let data = JSON.parse(localStorage.getItem("todolist"));

  if (data) {
    data.forEach((element) => {
      let listItem = $("<li>", {
        class: "list-group-item",
        text: element,
      });
      listItem.click(() => {
        listItem.toggleClass("done");
      });
      ulTasks.append(listItem);
    });
  }
}

function getData(todo = null) {
  let data = JSON.parse(localStorage.getItem("todolist"));

  if (data) {
    if (todo) {
      if (data.indexOf(todo) != -1) {
        return data[todo];
      } else {
        return false;
      }
    }
    return data;
  }

  return false;
}

function addItem() {
  var newTodo = inpNewTask.val();

  if (getData(newTodo) != false) {
    alert("Item sudah ditambahkan");
    return;
  }

  let todolist = getData();
  todolist = todolist != false ? todolist : [];
  todolist.push(newTodo);
  todolist = JSON.stringify(todolist);

  localStorage.setItem("todolist", todolist);

  let listItem = $("<li>", {
    class: "list-group-item",
    text: inpNewTask.val(),
  });
  listItem.click(() => {
    listItem.toggleClass("done");
  });
  ulTasks.append(listItem);
  inpNewTask.val("");
  toggleInputButtons();
}

function clearDone() {
  $("#ulTasks .done").remove();
  toggleInputButtons();
}

function clearAll() {
  if (confirm("Apakah anda yakin ingin menghapus semua todolist?")) {
    $("#ulTasks").remove();
    localStorage.removeItem("todolist");
  }
}

function sortTasks() {
  $("#ulTasks .done").appendTo(ulTasks);
}

function toggleInputButtons() {
  btnReset.prop("disabled", inpNewTask.val() == "");
  btnAdd.prop("disabled", inpNewTask.val() == "");
  btnSort.prop("disabled", ulTasks.children().length < 1);
  btnCleanup.prop("disabled", ulTasks.children().length < 1);
}

inpNewTask.keypress((e) => {
  if (e.which == 13) addItem();
});
inpNewTask.on("input", toggleInputButtons);

btnAdd.click(addItem);
btnReset.click(() => {
  inpNewTask.val('')
  toggleInputButtons()
})
btnCleanup.click(clearDone)
btnSort.click(sortTasks)

darkmodeButton.click(() => {
  $("body").toggleClass("dark-mode");
  $("#darkButton-icon").toggleClass("fa-sun");
  $("#darkButton-icon").toggleClass("fa-moon");
});

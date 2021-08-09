const storageKey = "Todo_Apps_Submission";

let todos = [];
let todo;
function cekStorage() {
    if (typeof (Storage) === undefined) {
        alert('Browser kamu todak mendukung local storage');
        return false;
    }
    return true;
}

function susunObject(judul, penulis, tahun, isComplete) {
    return {
        id: +new Date,
        judul,
        penulis,
        tahun,
        isComplete
    };
}

function updateStorage() {
    if (cekStorage())
        saveData();
}
function saveData() {
    const parsed = JSON.stringify(todos);
    localStorage.setItem(storageKey, parsed);
    document.dispatchEvent(new Event('ondatasaved'));
}

function loadStorage() {
    const serializeData = localStorage.getItem(storageKey);

    let data = JSON.parse(serializeData);
    if (data !== null)
        todos = data;
    document.dispatchEvent(new Event('ondataloaded'));
}

function findTodo(todoId) {
    for (todo of todos) {
        if (todo.id === todoId)
            return todo;
    }
    return null;
}

function findIndex(todoId) {

    let index = 0
    for (todo of todos) {
        if (todo.id === todoId)
            return index;

        index++;
    }

    return -1;
}
const id_belum = "incompleteBookshelfList";
const id_selesai = "completeBookshelfList";
const TODO_ITEMID = "itemId";

function addTodo() {
    const belum_dibaca = document.getElementById(id_belum);
    const selesai_dibaca = document.getElementById(id_selesai);

    const judul = document.getElementById('inputBookTitle').value;
    const penulis = document.getElementById('inputBookAuthor').value;
    const tahun = document.getElementById('inputBookYear').value;

    const isComplete = document.getElementById('inputBookIsComplete').checked;

    const bikinTodo = makeTodo(judul, penulis, tahun, isComplete, true);

    // 
    const todoObject = susunObject(judul, penulis, tahun, isComplete);
    bikinTodo[TODO_ITEMID] = todoObject.id;

    todos.push(todoObject);
    // 

    if (isComplete) {
        selesai_dibaca.append(bikinTodo);
    } else {
        belum_dibaca.append(bikinTodo);
    }

    updateStorage();
}

function makeTodo(judul, penulis, tahun, isComplete, selectText) {
    // datanya
    const h3_judul = document.createElement('h3');
    const p_penulis = document.createElement('p');
    const p_tahun = document.createElement('p');
    h3_judul.innerText = judul;

    if (selectText) {
        p_penulis.innerText = 'Penulis: ' + penulis;
        p_tahun.innerText = 'Tahun: ' + tahun;
    } else {
        p_penulis.innerText = penulis;
        p_tahun.innerText = tahun;
    }

    //buat kerangka
    const container = document.createElement('article');
    container.classList.add('book_item');

    const action = document.createElement('div');
    action.classList.add('action');

    if (isComplete) {
        action.append(
            belum_selesai_dibaca(),
            tombol_hapus()
        )
    } else {
        action.append(
            selesai_dibaca(),
            tombol_hapus()
        );
    }

    container.append(h3_judul, p_penulis, p_tahun);
    container.append(action);

    return container;
}


function selesai_dibaca() {
    return createButton('green', 'Selesai dibaca', function (event) {
        addBoookComplete(event.target.parentElement.parentElement);
    });
}

function belum_selesai_dibaca() {
    return createButton('green', 'Belum selesai di Baca', function (event) {
        addBookNotComplete(event.target.parentElement.parentElement);
    });
}

function tombol_hapus() {
    return createButton('red', 'Hapus buku', function (event) {
        hapus_item(event.target.parentElement.parentElement);
    });
}

function hapus_item(taskElement) {
    // 
    const todoPosition = findIndex(taskElement[TODO_ITEMID]);
    todos.splice(todoPosition, 1);
    // 

    taskElement.remove();
    updateStorage();
}

function createButton(nameClass, txt, eventListener) {
    const button = document.createElement('button');
    button.classList.add(nameClass);
    button.innerText = txt;
    button.addEventListener('click', function (event) {
        eventListener(event);
        event.stopPropagation();
    });

    return button;
}


function addBoookComplete(taskElement) {
    const selesai_dibaca = document.getElementById(id_selesai);

    const h3_judul = taskElement.querySelector('h3').innerText;
    const p_penulis = taskElement.querySelectorAll('p')[0].innerText;
    const p_tahun = taskElement.querySelectorAll('p')[1].innerText;

    const complete = true;

    const todo = findTodo(taskElement[TODO_ITEMID]);

    const newTodo = makeTodo(h3_judul, p_penulis, p_tahun, complete, false);
    todo.isComplete = complete;
    newTodo[TODO_ITEMID] = todo.id;


    selesai_dibaca.append(newTodo);
    taskElement.remove();

    updateStorage();
}

function addBookNotComplete(taskElement) {
    const belum_dibaca = document.getElementById(id_belum);

    const h3_judul = taskElement.querySelector('h3').innerText;
    const p_penulis = taskElement.querySelectorAll('p')[0].innerText;
    const p_tahun = taskElement.querySelectorAll('p')[1].innerText;

    const newTodo = makeTodo(h3_judul, p_penulis, p_tahun, false, false);
    // 
    const todo = findTodo(taskElement[TODO_ITEMID]);

    todo.isComplete = false;
    newTodo[TODO_ITEMID] = todo.id;
    // 

    belum_dibaca.append(newTodo);
    taskElement.remove();

    updateStorage();
}

function refreshTodos() {
    const listUncompleted = document.getElementById(id_belum);
    const listCompleted = document.getElementById(id_selesai);

    for (let todo of todos) {
        const newTodo = makeTodo(todo.judul, todo.penulis, todo.tahun, todo.isComplete, true);
        newTodo[TODO_ITEMID] = todo.id;

        if (todo.isComplete) {
            listCompleted.append(newTodo);
        } else {
            listUncompleted.append(newTodo);
        }
    }
}

function pencarian() {
    const semuaElement = document.querySelectorAll('article');

    const search = document.getElementById('searchBookTitle').value;

    for (let element of semuaElement) {
        element.style.display = 'none';
        let judul = element.querySelector('h3').innerText;
        if (judul.includes(search)) {
            element.style.display = 'block';
        };
    }

}

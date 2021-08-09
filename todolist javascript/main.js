document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('inputBook');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        addTodo();
    });
    if (cekStorage()) {
        loadStorage();
    }
});

document.addEventListener('ondatasaved', () => {
    console.log('data berhasil disimpan')
});

document.addEventListener('ondataloaded', () => {
    refreshTodos();
});

const search = document.getElementById('searchBook');
search.addEventListener('submit', function (e) {
    e.preventDefault();
    pencarian();
});
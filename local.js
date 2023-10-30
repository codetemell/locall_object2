let inp = document.querySelector('.text')
let addTodo = document.querySelector('.addTodo')
let todoBox = document.querySelector('.todoBox')
let deleteAll = document.querySelector('.deleteAll')

const state = {
    todos: [],
    newTodo: {
        id: Math.random(),
        title: '',
    },
    editTodo: {
        id: 0,
        title: ''
    }
}

function getValue() {
    inp.addEventListener('keyup', (event) => {
        state.newTodo.title = event.target.value
    })
}

getValue()

addTodo.addEventListener('click', (event) => {
    event.preventDefault()
    
    if (!state.newTodo.title) {
        return; // Başlık boş ise ekleme yapma
    }

    if (state.editTodo.id) {
        let index = state.todos.findIndex(todo => todo.id === state.editTodo.id)
        if (index !== -1) {
            state.todos[index].title = state.newTodo.title
            let todo = document.getElementById(state.editTodo.id)
            if (todo) {
                todo.firstChild.textContent = state.newTodo.title
            }
        }
        state.editTodo = {}
    } else {
        let todo = {
            id: Math.random(),
            title: state.newTodo.title
        }
        state.todos.push(todo)
        let todoHtml = `
        <li class="todo" id="${todo.id}">
            ${todo.title}
            <div>
                <button data-delete="delete" class="delete">X</button>
                <button class="change" data-id="${todo.id}"><i class='bx bxs-chat'></i></button>
            </div>
        </li>`
        todoBox.insertAdjacentHTML("beforeend", todoHtml)
    }

    localStorage.setItem('todos', JSON.stringify(state.todos))
    inp.value = ''
})

todoBox.addEventListener('click', (event) => {
    let btn = event.target.dataset.delete
    if (btn) {
        let todo = event.target.closest('.todo')
        let id = todo.getAttribute('id')

        for (let i = 0; i < state.todos.length; i++) {
            if (state.todos[i].id === parseFloat(id)) {
                state.todos.splice(i, 1)
                localStorage.setItem('todos', JSON.stringify(state.todos))
                todo.remove()
                state.editTodo = {}
                break;
            }
        }
    }

    let changeBtn = event.target.closest('.change')
    if (changeBtn) {
        let id = changeBtn.getAttribute('data-id')
        let todo = state.todos.find(todo => todo.id === parseFloat(id))

        if (todo) {
            inp.value = todo.title
            state.editTodo = {
                id: todo.id,
                title: todo.title
            }
        }
    }
})

// deleteAll.addEventListener('click', (event) => {
//     event.preventDefault()
//     todoBox.innerHTML = ''
//     state.todos = []
//     localStorage.removeItem('todos')
// })

document.addEventListener("DOMContentLoaded", function() {
    deleteAll.addEventListener('click', (event) => {
      event.preventDefault()
      todoBox.innerHTML = ''
      state.todos = []
      localStorage.removeItem('todos')
    });
  });


function renderTodos() {
    todoBox.innerHTML = '' // Todo listesini temizle

    state.todos.forEach(item => {
        let todoHtml = `
            <li class="todo" id="${item.id}">
                ${item.title}
                <div>
                    <button data-delete="delete" class="delete">X</button>
                    <button class="change" data-id="${item.id}"><i class='bx bxs-chat'></i></button>
                </div>
             </li>`

        todoBox.insertAdjacentHTML("beforeend", todoHtml)
    })
}

function getTodosFromLocalStorage() {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || []

    state.todos = [...storedTodos]
    renderTodos() // Sayfa render edilirken todos listesini göster

    console.log(state);
}

getTodosFromLocalStorage()
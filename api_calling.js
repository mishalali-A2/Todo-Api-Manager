//api collecting data from
const Data_URL = 'https://jsonplaceholder.typicode.com/todos';

const todo_cont = '#todos-container';
const add_todo_form = '#add-todo-form';
const update_todo_item = '#update-todo-form';
const search_form = '#search-user-form';
const reset_search = '#reset-search';

//console local logging for api calls
let local_todo_arr = [];


$(document).ready(function () {
    debugger;
    fetch_todo_data();

    $(search_form).submit(function (e) {
        e.preventDefault();
        const userId = $('#search-user-id').val().trim();
        if (!userId) {
            display_Todo(local_todo_arr);
            return;
        }
        
        const filtered = local_todo_arr.filter(t => t.userId == userId);
        display_Todo(filtered);
    });

    $(reset_search).click(function () {
        $('#search-user-id').val('');
        fetch_todo_data();
    });

    $(add_todo_form).submit(function (e) {
        e.preventDefault();

        const todoData = {
            title: $('#title').val().trim(),
            completed: $('#complete').is(':checked'),
            userId: parseInt($('#userId').val())
        };

        if (!todoData.title || isNaN(todoData.userId)) {
            alert('Please enter valid title and user ID');
            return;
        }
        
        $.post(Data_URL, todoData)
            .done(function(newTask) {
                console.log('Task successfully added:', newTask);
                add_todos(newTask);
            })
            .fail(function(error) {
                console.error('Error adding task:', error);
                alert('Error adding task. Please try again.');
            });
    });

    $(update_todo_item).submit(function (e) {
        e.preventDefault();

        const id = $('#update-id').val();
        const title = $('#update-title').val();
        const completed = $('#update-status').is(':checked');

        const data_updates = { completed };
        if (title) {
            data_updates.title = title;
        }

        $.ajax({
            url: `${Data_URL}/${id}`,
            type: 'PUT',
            data: data_updates,
            success: function(updatedItem) {
                console.log('Task successfully updated:', updatedItem);
                update_todo_task(updatedItem);
            },
            error: function(error) {
                console.error('Error updating task:', error);
                alert('Error updating task. Please try again.');
            }
        });
    });
});

function fetch_todo_data() {
    console.log('Fetching todos:...');
    $.get(Data_URL)
        .done(function (todos) {
            if (!Array.isArray(todos)) {
                if (typeof todos === 'object' && todos !== null) {
                    todos = Object.values(todos);
                } else {
                    todos = [];
                }
            }
            local_todo_arr = todos;
            display_Todo(local_todo_arr);
        })
        .fail(function (error) {
            console.error('Error fetching todo tasks:', error);
            $(todo_cont).html('<div style="color: red;">Error loading the todo tasks. Try again!</div>');
        });
}

function add_todos(new_task) {
    alert(`Todo task added successfully with ID: ${new_task.id}`);
    $(add_todo_form)[0].reset();
    //unshift-> for putting data at the start of array
    local_todo_arr.unshift(new_task); 
    display_Todo(local_todo_arr);
}

function update_todo_task(update_item) {
    alert(`Todo task ID: ${update_item.id} updated successfully!`);
    $(update_todo_item)[0].reset();
    const id = update_item.id;
    const idx = local_todo_arr.findIndex(t => t.id == id);
    if (idx !== -1) {
        local_todo_arr[idx] = { ...local_todo_arr[idx], ...update_item };
    } else {
        local_todo_arr.unshift(update_item); 
    }
    display_Todo(local_todo_arr);
}


function display_Todo(todos) {
    const $todoCont = $(todo_cont);
    $todoCont.empty();
//convert to array
    if (!Array.isArray(todos)) {
        if (typeof todos === 'object' && todos !== null) {
            todos = Object.values(todos);
        } else {
            $todoCont.html('<div style="color: blue;">No Todo Tasks found!!</div>');
            return;
        }
    }

    if (todos.length === 0) {
        $todoCont.html('<div style="color: blue;">No Todo Tasks found!!</div>');
        return;
    }

    const scroll_div = $('<div>').addClass('scrollable-list');
    todos.forEach(todo => {
        const todo_elem = $('<div>')
            .addClass(`todo ${todo.completed ? 'completed' : ''}`)
            .html(`
                <h3>${todo.title}</h3>
                <p>ID: ${todo.id} | User ID: ${todo.userId}</p>
                <p>Status: ${todo.completed ? 'Completed' : 'Pending'}</p>
            `);
        scroll_div.append(todo_elem);
    });
    $todoCont.append(scroll_div);
}
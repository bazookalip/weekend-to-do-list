$(document).ready(onReady);


function onReady() {
    console.log('jQ ready');
    $('#addButton').on('click', addButton);
    $('#tableId').on('click', '.updateButton', updateButton)
    $('#tableId').on('click', '.deleteButton', deleteButton)
    getTasks();
}



function addButton() {
    let tasks = $('#task').val();
    console.log(tasks);
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: {
            tasks: tasks
        }
    }).then(function () {
        getTasks();
        clear();
    });
}


function clear() {
    $('#task').val('');
}


function getTasks() {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log(response);
        $('#tableId').empty();
        response.forEach((tasks) => {
            if (tasks.status === 'done') {
                $('#tableId').append(`
                <tr>
                    <td class ="completed">${tasks.task} </td>
                    <td>${tasks.status}</td>
                    <td><button class="updateButton btn btn-light btn-sm" data-id="${tasks.id}"><i class="fas fa-check"></i></button></td>
                    <td><button class="deleteButton btn btn-light btn-sm" data-id="${tasks.id}"><i class="fas fa-trash-alt"></i></button></td> 
                </tr>  
        `)
            } else {
                $('#tableId').append(`
                <tr>
                    <td>${tasks.task} </td>
                    <td>${tasks.status}</td>
                    <td><button class="updateButton btn btn-light btn-sm" data-id="${tasks.id}"><i class="fas fa-check"></i></button></td>
                    <td><button class="deleteButton btn btn-light btn-sm" data-id="${tasks.id}"><i class="fas fa-trash-alt"></i></button></td> 
                </tr>  
        `)
            }
           
        });

    })
}

function deleteButton() {
    $.ajax({
        method: "DELETE",
        url: '/tasks/' + $(this).data().id
    }).then(function () {
        getTasks();
    })

}


function updateButton() {
    const taskId = $(this).data().id;
    $.ajax({
        method: 'PUT',
        url: '/tasks/' + taskId,
        data: {
            status: 'done'
        }
    }).then(function () {
        getTasks();
    })
}



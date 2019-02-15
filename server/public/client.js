$(document).ready(onReady);


function onReady(){
    console.log('jQ ready');
    $('#addButton').on('click', addButton);
    getTasks();
}



function addButton(){
    let task = $('#task').val();
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: {
            task: task,
         
        }
    }).then(function () {
    }); clear();
}

    
function clear(){
    $('#task').val('');
}


function getTasks() {

    $('#tableId').append(`
                <td>take out trash</td>
                <td><button>Completed</button><td>
                <td><button>Delete</button><td>`)
    // $.ajax({
    //     method: 'GET',
    //     url: '/tasks'
    // }).then(function (response) {
    //     console.log(response);
    //     $('#tableId').empty();
    //     response.forEach((tasks) => {
    //         $('#tableId').append(`
    //             <td>take out trash</td>
               
             
    //     `)
    //     });
    //     clear();
    // })
}
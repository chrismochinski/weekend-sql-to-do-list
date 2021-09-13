console.log('Javascript - ready to rock!');

$(readyNow);

function readyNow() {
    console.log('JQ - ready to roll!');
    refreshList();
    clickHandlers();
}

function clickHandlers() {
    $('#submitButton').on('click', handleSubmit); //submitting new task button click handler
    $('#toDoList').on('click', '.deleteButton', deleteTask); //delete button click handler
    $('#toDoList').on('click', '.markCompletedButton', markComplete); //markComplete button click handler
}

function handleSubmit() {
    console.log('Submit button clicked - in handleSubmit function');
    let todo = {};
    todo.task = $('#taskInput').val();
    todo.description = $('#descriptionInput').val();
    todo.priority = $('#prioritySelector option:selected').val();

    //conditional - no blank inputs allowed! :)
    if ('' == todo.task) {
        swal({ title: "Please enter a task.", button: "Got it!", icon: "info" });
        return;
    }
    if ('' == todo.description) {
        swal({ title: "Please enter a description.", button: "Got it!", icon: "info" });
        return;
    }
    if ('' == todo.task && '' == todo.description) {
        swal({ title: "Please enter some info.", button: "Got it!", icon: "info" });;
        return;
    }
    if ('Priority' === todo.priority) {
        swal({ title: "Please select a priority level.", button: "Got it!", icon: "info" });;
        return;
    }
    else {
        addToList(todo);
    };
};

//client-side POST - user adding to fields via button
function addToList(todo) {
    $('body').removeClass('fireworks');
    console.log(todo);
    $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo
    }).then(function (response) {
        console.log('response from server:', response);
        refreshList();
    }).catch(function (error) {
        console.log('Error in POST:', error);
        alert('Unable to add to list at this time. Please try again later.');
    });
    clearInputs(); //send to function that returns inputs/dropdown to empty
};

//client-side GET - get the todo list
function refreshList() {
    $.ajax({
        type: 'GET',
        url: '/todo'
    }).then(function (response) {
        console.log(response);
        printListToDom(response);
        printSuccessMessage(response);
    }).catch(function (error) {
        console.log('error in GET', error);
    });
};

function printSuccessMessage(response) {
    if (response.length === 0) {
        $('.container').addClass('fireworks')
        $('#successMessage').css('font-size', '80px');
        $('#successMessage').text(`You did it!`);
    }
    else if (response.length === 1) {
        $('#successMessage').css('font-size', '50px');
        $('#successMessage').text(`Almost there! Just 1 task left!`);
    }
    else if (response.length >= 2 && response.length < 6) {
        $('#successMessage').css('font-size', '40px');
        $('#successMessage').text(`Almost there! Just ${response.length} tasks to go!`);
    }
    else if (response.length >= 6) {
        $('#successMessage').css('font-size', '25px');
        $('#successMessage').text(`Let's get to work! ${response.length} Tasks to go...`);
    }
}

//client-side DELETE - remove task from list
function deleteTask() {
    const taskID = $(this).data('id');
    $.ajax({
        method: 'DELETE',
        url: `/todo/${taskID}`
    }).then(function (response) {
        console.log('Task was deleted!');
        refreshList();
    }).catch(function (error) {
        alert('Sorry - something went wrong test');
        console.log('error in DELETE', error);
    });
};

// client-side PUT - mark task complete
function markComplete() {
    swal({ title: "Nice Work!", text: "You completed a task", button: "Woot!", icon: "success" });
    const taskID = $(this).data('id');
    console.log(taskID);
    $.ajax({
        method: 'PUT',
        url: `/todo/${taskID}`,
    }).then(function (response) {
        console.log('Task marked as completed!');
        refreshList();
    }).catch(function (error) {
        alert('Something went wrong with the update.');
        console.log('Error in PUT, error:', error);
    });
};
``

//printing ToDo List to DOM!
function printListToDom(list) {
    $('#toDoList').empty(); //clear it out pre-fresh-print
    let completed;
    for (let i = 0; i < list.length; i++) {
        let listItem = list[i];

        //ternary
        let completed = listItem.isItDone ? 'Done!' : `<button data-id="${listItem.id}" class="markCompletedButton">Complete</button>`;

        // if(listItem.isItDone === false) {
        //     completed = `<button data-id="${listItem.id}" class="markCompletedButton">Mark Completed</button>`;
        // }
        // else if(listItem.isItDone === true) {
        //     completed = 'Done!';
        // }


        // if(true === listItem.isItDone) {
        //     rowClass = 'completedTask';
        // }

        let priorityClass = '';
        if (true === listItem.isItDone) {
            // do nothing.
        }
        else if ('Urgent' === listItem.priority) {
            priorityClass = 'priorityUrgent';
        } else if ('Medium' === listItem.priority) {
            priorityClass = 'priorityMedium';
        } else if ('Low' === listItem.priority) {
            priorityClass = 'priorityLow';
        };

        $('#toDoList').append(`
        <tr class=${listItem.isItDone ? 'completedTask' : ''}>
            <td><b>"${listItem.task}"</b></td>
            <td>${listItem.description}</td> 
            <td id="priority" class=${priorityClass}>${listItem.priority}</td>
            <td class="buttonColumn">${completed}</td>   
            <td class="buttonColumn"><button data-id="${listItem.id}" class="deleteButton">Delete</button></td>
        </tr>
        `);
    };
};

// clear inputs after use hits submit
function clearInputs() {
    swal({ title: "Success!", text: "Task added.", button: "Woot!", icon: "success" });
    $('#taskInput').val('');
    $('#descriptionInput').val('');
    $('#prioritySelector').val('Priority');
}

console.log('Javascript - ready to rock!');

$(readyNow);

function readyNow() {
    console.log('JQ - ready to roll!');
    refreshList();
}

//client-side GET
function refreshList() {
    $.ajax({
        type: 'GET',
        url: '/todo'
    }).then(function (response) {
        console.log(response);
        renderBooks(response);
    }).catch(function (error) {
        console.log('error in GET', error);
    });
}
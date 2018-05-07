let transportType = signalR.TransportType.WebSockets;
let http = new signalR.HttpConnection(`http://${document.location.host}/messengerHub`, { transport: transportType });
let connection = new signalR.HubConnection(http);
var called = false;

connection.start();

connection.on('ShouldRemoveMessage', (guid) => {
    const containDiv = '#messages';
   removeMessage($,containDiv,'#'+guid)
});

connection.on('ReceiveMessage', (message, guid) => {
    var date = new Date();
    const containDiv = '#messages';
    const messageData ={
        message :message,
        id : guid,
        timeStamp :date.toISOString()
    };

    addMessage($,containDiv,messageData)

    $('#'+messageData.id).on( "click", function() {
        connection.invoke('RemoveMessage', guid);
        event.preventDefault();
    });
});

document.getElementById('frm-send-message').addEventListener('submit', event => {
    let message = document.getElementById('message').value;
    document.getElementById('message').value = '';
    var guid =  NewGuid() + "-"+connection.id;
    connection.invoke('Send', message,guid);
    event.preventDefault();
});

$(document).ready(function() {
    $("abbr.timeago").timeago();
});
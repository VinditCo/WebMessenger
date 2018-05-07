let transportType = signalR.TransportType.WebSockets;
let http = new signalR.HttpConnection(`http://${document.location.host}/messengerHub`, { transport: transportType });
let connection = new signalR.HubConnection(http);
var called = false;

connection.start();

connection.on('ShouldRemoveMessage', (guid) => {
    const containDiv = '#messages';
   removeMessage($,containDiv,'#'+guid)
});

function addMessageAndAssignDelete($,containDiv, messageData) {
    addMessage($, containDiv, messageData); 
    addDeleteToOnClick(messageData, messageData.id);
}

connection.on('ReceiveMessage', (message, guid) => {
    var date = new Date();
    const containDiv = '#messages';
    const messageData ={
        message :message,
        id : guid,
        timeStamp :date.toISOString()
    };

    addMessageAndAssignDelete($,containDiv, messageData);
});

$('#message').on('input',function( event ) {
    validateInput($,$('#message'),inputNotification,hideInputNotification)
});

addSendToOnClick();

function addSendToOnClick() {
    document.getElementById('frm-send-message').addEventListener('submit', event => {
        let message = document.getElementById('message').value;
        document.getElementById('message').value = '';
        var guid = NewGuid() + "-" + connection.id;
        connection.invoke('Send', message, guid);
        pageNotification($, "Message Sent", "#pageNotification", fadeInPageNotification, fadeOutPageNotification)
        event.preventDefault();
    });
}

function addDeleteToOnClick(messageData, guid) {
    $('#' + messageData.id).on("click", function () {
        connection.invoke('RemoveMessage', guid);
        event.preventDefault();
        pageNotification($, "Message Deleted", "#pageNotification", fadeInPageNotification, fadeOutPageNotification)
    });
}

function fadeInPageNotification(element) {
    element.fadeIn(1000);
}

function fadeOutPageNotification(element) {
    element.fadeOut(1000);
}


function inputNotification($, message) {
    return pageNotification($, message, '#inputNotification', fadeInPageNotification, function () {})
}

function hideInputNotification($) {
    return pageNotificationForceHide($, '#inputNotification')
}

$(document).ready(function() {
    $("abbr.timeago").timeago();
    validateInput($,$('#message'),inputNotification,hideInputNotification)
});
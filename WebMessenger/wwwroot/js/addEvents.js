function addSendToOnClick() {
    document.getElementById('frm-send-message').addEventListener('submit', event => {
        let message = document.getElementById('message').value;
        document.getElementById('message').value = '';
        var guid = NewGuid() + "-" + connection.id;
        broadcastSend(message, guid);
        pageNotification($, "Message Sent", "#pageNotification", fadeInPageNotification, fadeOutPageNotification)
        validateInput($, $('#message'), inputNotification, hideInputNotification)
    });
}

function broadcastSend(message, guid) {
    connection.invoke('Send', message, guid);
    event.preventDefault();
}

function addDeleteToOnClick(messageData, guid) {
    $('#deleteButton').on("click", function () {
        connection.invoke('RemoveMessage', guid);
        event.preventDefault();
        pageNotification($, "Message Deleted", "#pageNotification", fadeInPageNotification, fadeOutPageNotification)
    });
}

function addMessageAndAssignDelete($,containDiv, messageData) {
    addMessage($, containDiv, messageData);
    addDeleteToOnClick(messageData, messageData.id);
  
}

function addValidationToInput() {
    $('#message').on('input', function (event) {
        validateInput($, $('#message'), inputNotification, hideInputNotification)
    });
}

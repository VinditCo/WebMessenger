let transportType = signalR.TransportType.WebSockets;
let http = new signalR.HttpConnection(`http://${document.location.host}/messengerHub`, { transport: transportType });
let connection = new signalR.HubConnection(http);

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
    addMessageAndAssignDelete($,containDiv, messageData);
    $("time.timeago").timeago();
});
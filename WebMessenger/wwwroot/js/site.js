let transportType = signalR.TransportType.WebSockets;
let http = new signalR.HttpConnection(`http://${document.location.host}/messengerHub`, { transport: transportType });
let connection = new signalR.HubConnection(http);
var called = false;

connection.start();

connection.on('RemoveMessage', ( guid) => {

    removeElement(guid);
});

connection.on('Send', (message, guid) => {
    prependLine(message, guid);
});

hideAllElements($,".clear");

function UpdateButtons() {
    if (called){
        return;
    } 
    var bns = document.getElementsByName("frm-delete-Message");
    if (bns != null) {
        for (i = 0; i < bns.length; i++) {
            var thisElement = bns[i];
            if (thisElement != null) {
                console.log(thisElement.name);
                var parent = thisElement.parentNode;
                console.log("Adding event to ", parent.id);
                thisElement.innerText+="ADDED"+parent.id;
                thisElement.addEventListener("click", function(){
                  // always the same ? ref to the same parent ?
                    console.log(parent.id)
                });

            }
        }
    }
    called = true;
}

UpdateButtons();

document.getElementById('frm-send-message').addEventListener('submit', event => {
    let message = document.getElementById('message').value;
    document.getElementById('message').value = '';
    var guid =  NewGuid() + "-"+connection.id;
    connection.invoke('Send', message,guid);
   
    event.preventDefault();
});

function prependLine(line, guid) {
    let li = document.createElement('li');
    li.id = guid;
    var myform = document.createElement("form");
    myform.name = "frm-delete-Message";
    myform.action = "#";
    var input = document.createElement("input");
    input.type = "submit";
    input.name = "button";
    input.value = "ON THE FLY DELETE";
    myform.appendChild(input);
    myform.addEventListener('submit', event => {
        connection.invoke('RemoveMessage', guid);
    });
    
    li.id = guid;
    li.innerText = line;
    li.appendChild(myform);
    document.getElementById('messages').prepend(li);
    
};



function removeElement(id) {
    var elem = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
}


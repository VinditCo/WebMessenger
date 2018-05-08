function addMessage ($, container, messageData, onDelete) {
    if ($ == null){
        return null;
    }

    if (messageData == null || this.invalidInputString(messageData.message) || this.invalidInputString(messageData.id) || this.invalidInputString(messageData.timeStamp) ) {
        return $(container);
    }
    return $(container).prepend('<div class="message" id='+messageData.id+'>'+messageData.message+'<time class="timeago" datetime='+ messageData.timeStamp +'></time><button id="deleteButton">Delete</button></div>');

}

function removeMessage ($, container, messageID) {
    if ($ == null){
        return null;
    }
    if (this.invalidInputString(messageID)) {
        return $(container);
    }

    $(messageID).remove();
    return $(container);
}

function invalidInputString (message) {
    return message == null || message.trim().length === 0;
}

if(typeof exports !== 'undefined') {
    exports.invalidInputString = invalidInputString;
    exports.addMessage = addMessage;
    exports.removeMessage = removeMessage;
}
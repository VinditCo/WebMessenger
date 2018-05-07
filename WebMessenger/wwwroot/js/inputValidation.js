
function validateInput($,element, pageNotification,hidePageNotification) {
    if (isValid()){
        showSendButton();
        if (canHideNotifications()){
            hidePageNotification($,element);
        }
        return true;
    }
    
    if (shouldShowEmptyTextNotification()){
        pageNotification($,"Enter Text")
    }
    else if(shouldShowTextTooLongNotification()){
        pageNotification($,"Input must be below 150 characters")
    }
    else if (canHideNotifications()){
        hidePageNotification($,element);
    }
    
    hideSendButton();
    
    return false;
    
    function isValid() {
        return element != null && !emptyElement() && element.val().toString().length <= 150;
    }
    
    function emptyElement() {
        return element.val() == null || element.val().toString().length === 0;
    }

    function canHideNotifications() {
        return hidePageNotification != null && typeof hidePageNotification === "function";
    }
    
    function shouldShowEmptyTextNotification() {
        return element != null && emptyElement() && pageNotification != null && typeof pageNotification === "function";
    }

    function shouldShowTextTooLongNotification() {
        return element != null && !emptyElement() && pageNotification != null && typeof pageNotification === "function";
    }

    function hideSendButton() {
        if (element!=null){
            element.next().css('display', 'none');
        }
    }
    
    function showSendButton() {
        element.next().css('display', 'initial');
    }
}

if(typeof exports !== 'undefined') {
  exports.validateInput = validateInput;
}
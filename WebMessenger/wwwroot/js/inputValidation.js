
function validateInput($,element, pageNotification,hidePageNotification) {

    function isValid() {
        return element != null && !emptyElement() && element.val().toString().length <= 150;
    }

    function emptyElement() {
        return element.val() == null || element.val().toString().length === 0;
    }

    function canHideNotifications() {
        return hidePageNotification != null && typeof hidePageNotification === "function";
    }

    function hasPageNotification() {
        return pageNotification != null && typeof pageNotification === "function";
    }

    function shouldShowEmptyTextNotification() {
        return element != null && emptyElement() && hasPageNotification();
    }

    function shouldShowTextTooLongNotification() {
        return element != null && !emptyElement() && hasPageNotification();
    }

    function hideSendButton() {
        if (element!=null){
            element.next().css('display', 'none');
        }
    }
    
    function showSendButton() {
        element.next().css('display', 'initial');
    }
    

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
}


if(typeof exports !== 'undefined') {
  exports.validateInput = validateInput;
}
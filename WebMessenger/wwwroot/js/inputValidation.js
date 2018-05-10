
function validateInput($,element, pageNotification,hidePageNotification, test) {
    if (CheckValidateInput().isValidElement(element,test)){
        ShowHideSendButton().showSendButton(element);
        if (CheckValidateInput().canHideNotifications(hidePageNotification)){
            hidePageNotification($,element);
        }

        return true;
    }

    if (CheckValidateInput().shouldShowEmptyTextNotification(element,pageNotification)){
        pageNotification($,"Enter Text")
    }
    else if(CheckValidateInput().shouldShowTextTooLongNotification(element,pageNotification)){
        pageNotification($,"Input must be below 150 characters")
    }
    else if (CheckValidateInput().canHideNotifications(hidePageNotification)){
        hidePageNotification($,element);
    }
    ShowHideSendButton().hideSendButton(element);
    return false;
}

var ShowHideSendButton = function () {
    var showSendButton = function(element) {
        element.next().css('display', 'initial');
    };
    
    var hideSendButton= function(element) {
        if (element!=null){
            element.next().css('display', 'none');
        }
    };
    return{
        hideSendButton: function(element) {
            hideSendButton(element);
        },
        showSendButton: function(element) {
            showSendButton(element);
        }
    };
};

var CheckValidateInput = function () {
    const emptyElement = function(element) {
        return element.val() == null || element.val().toString().length === 0;
    };
    var isValidElement = function (element, test) {
        return (element != null && !emptyElement(element) && element.val().toString().length <= 150);
    };


    var canHideNotifications= function(hidePageNotification) {
        return hidePageNotification != null && typeof hidePageNotification === "function";
    };

    var hasPageNotification = function(pageNotification) {
        return pageNotification != null && typeof pageNotification === "function";
    };

    var shouldShowEmptyTextNotification= function(element,pageNotification) {
        return element != null && emptyElement(element) && hasPageNotification(pageNotification);
    };

    var shouldShowTextTooLongNotification= function(element,pageNotification) {
        return element != null && !emptyElement(element) && hasPageNotification(pageNotification);
    };
    
    return {
        isValidElement: function(element,test) {
            return isValidElement(element,test);
        },
        canHideNotifications: function(hidePageNotification) {
            return canHideNotifications(hidePageNotification);
        },
        shouldShowEmptyTextNotification: function(element,pageNotification) {
            return shouldShowEmptyTextNotification(element,pageNotification);
        },
        shouldShowTextTooLongNotification: function(element,pageNotification) {
            return shouldShowTextTooLongNotification(element,pageNotification);
        }
    };

};


if(typeof exports !== 'undefined') {
  exports.validateInput = validateInput;
}
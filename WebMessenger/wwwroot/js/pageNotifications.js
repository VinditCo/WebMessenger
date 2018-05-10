function pageNotification($, notificationMessage, notificationID, fadeInNotification, fadeOutNotification) {

    if ($ == null) {
        return null;
    }
    const element = $(notificationID);

    if (CheckPageNotificationInput().invalidInput(fadeOutNotification,fadeInNotification,element,notificationMessage,notificationID)) {
        return null;
    }

    if (CheckPageNotificationInput().noNotificationMessage(notificationMessage)) {
        return element;
    }

    element.empty();
    element.append(notificationMessage);

    PageNotificationTransitions().fadeIn(element,fadeInNotification);

    PageNotificationTransitions().fadeOut(element,fadeOutNotification);

    return element;
}

var CheckPageNotificationInput = function () {

    var noNotificationMessage = function(notificationMessage) {
        return notificationMessage.trim().length === 0;
    };

    var invalidInput = function (fadeOutNotification,fadeInNotification,element,notificationMessage,notificationID) {
        return fadeOutNotification == null || typeof fadeOutNotification !== "function" || fadeInNotification == null || typeof fadeInNotification !== "function" || element == null || notificationMessage == null || notificationID.trim().length === 0;
    };
    return {
        noNotificationMessage: function(notificationMessage) {
            return noNotificationMessage(notificationMessage);
        },
        invalidInput: function(fadeOutNotification,fadeInNotification,element,notificationMessage,notificationID) {
            return invalidInput(fadeOutNotification,fadeInNotification,element,notificationMessage,notificationID);
        },
    };
};


var PageNotificationTransitions = function () {

    var fadeIn = function (element,fadeInNotification) {
        fadeInNotification(element);
    };

    var fadeOut = function(element,fadeOutNotification) {
        if (element.promise != null) {
            element.promise().done(function () {
                fadeOutNotification(element);
            });
        }
        else {
            fadeOutNotification(element,fadeOutNotification);
        }
    };
    return {
        fadeIn: function(element,fadeInNotification) {
            return fadeIn(element,fadeInNotification);
        },
        fadeOut: function(fadeOutNotification,fadeInNotification,element,notificationMessage,notificationID) {
            return fadeOut(fadeOutNotification,fadeInNotification,element,notificationMessage,notificationID);
        },
    };
};

function pageNotificationForceHide($, notificationID) {
    if ($ == null || notificationID == null|| notificationID.trim().length === 0) {
        return;
    }
    const element = $(notificationID);
    element.empty();
    element.css('display', 'none');

}


if (typeof exports !== 'undefined') {
    exports.pageNotification = pageNotification;
    exports.pageNotificationForceHide = pageNotificationForceHide;
}

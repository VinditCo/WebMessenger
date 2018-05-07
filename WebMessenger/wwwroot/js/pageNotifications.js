function pageNotification($, notificationMessage, notificationID, fadeInNotification, fadeOutNotification) {

    if ($ == null) {
        return null;
    }
    const element = $(notificationID);

    if (invalidInput()) {
        return null;
    }

    if (noNotificationMessage()) {
        return element;
    }

    element.empty();
    element.append(notificationMessage);

    fadeIn();

    fadeOut();

    return element;

    function fadeIn() {
        fadeInNotification(element);
    }


    function fadeOut() {
        if (element.promise != null) {
            element.promise().done(function () {
                fadeOutNotification(element);
            });
        }
        else {
            fadeOutNotification(element);
        }
    }

    function noNotificationMessage() {
        return notificationMessage.trim().length === 0;
    }

    function invalidInput() {
        return fadeOutNotification == null || typeof fadeOutNotification !== "function" || fadeInNotification == null || typeof fadeInNotification !== "function" || element == null || notificationMessage == null || notificationID.trim().length === 0;
    }
}

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

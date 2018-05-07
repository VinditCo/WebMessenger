function pageNotification($, notificationMessage, notificationID, fadeInNotification, fadeOutNotification) {
}

function fadeInPageNotificationDummy(element) {
}

function fadeOutPageNotificationDummy(element) {
}

function fadeInPageNotificationFake(element) {
    element.css("display", "block");
}

function fadeOutPageNotificationFake(element) {
    element.css("display", "none");
}

function pageNotificationFake($, message) {
    const PageNotification = require('./pageNotifications.js');
    return PageNotification.pageNotification($, message, '#inputNotification', fadeInPageNotificationFake, fadeOutPageNotificationDummy)
}

function hidePageNotificationFake($) {
    const PageNotification = require('./pageNotifications.js');
    return PageNotification.pageNotificationForceHide($, '#inputNotification')
}

if (typeof exports !== 'undefined') {
    exports.pageNotification = pageNotification;
    exports.fadeInPageNotificationDummy = fadeInPageNotificationDummy;
    exports.fadeOutPageNotificationDummy = fadeOutPageNotificationDummy;
    exports.fadeInPageNotificationFake = fadeInPageNotificationFake;
    exports.fadeOutPageNotificationFake = fadeOutPageNotificationFake;
    exports.pageNotificationFake = pageNotificationFake;
    exports.hidePageNotificationFake = hidePageNotificationFake;
}
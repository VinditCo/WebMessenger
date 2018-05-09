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
    const PageNotification = require('../pageNotifications.js');
    return PageNotification.pageNotification($, message, '#inputNotification', fadeInPageNotificationFake, fadeOutPageNotificationDummy)
}

function hidePageNotificationFake($) {
    const PageNotification = require('../pageNotifications.js');
    return PageNotification.pageNotificationForceHide($, '#inputNotification')
}

if (typeof exports !== 'undefined') {
    exports.fadeInPageNotificationDummy = fadeInPageNotificationDummy;
    exports.fadeOutPageNotificationDummy = fadeOutPageNotificationDummy;
    exports.fadeInPageNotification = fadeInPageNotificationFake;
    exports.fadeOutPageNotification = fadeOutPageNotificationFake;
    exports.pageNotificationFake = pageNotificationFake;
    exports.hidePageNotificationFake = hidePageNotificationFake;
}
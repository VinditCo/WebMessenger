function fadeInPageNotification(element) {
    element.fadeIn(1000);
}

function fadeOutPageNotification(element) {
    element.fadeOut(1000);
}

function inputNotification($, message) {
    return pageNotification($, message, '#inputNotification', fadeInPageNotification, function () {})
}

function hideInputNotification($) {
    return pageNotificationForceHide($, '#inputNotification')
}

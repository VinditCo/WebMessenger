addValidationToInput();

addSendToOnClick();


$(document).ready(function() {
    validateInput($,$('#message'),inputNotification,hideInputNotification)
        $("time.timeago").timeago();
});

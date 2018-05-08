addValidationToInput();

addSendToOnClick();


$(document).ready(function() {
    $("abbr.timeago").timeago();
    validateInput($,$('#message'),inputNotification,hideInputNotification)
});


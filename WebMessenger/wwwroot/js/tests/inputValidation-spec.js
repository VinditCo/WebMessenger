'use strict';

const expect = require('chai').expect;
const cheerio = require('cheerio');

describe('InputValidation', function () {
    it('should exist', function () {
        const InputValidation = require('../inputValidation.js');
        expect(InputValidation).to.not.be.undefined;
    })
});

describe('InputValidation', function () {
    it('should have Validate function', function () {
        const InputValidation = require('../inputValidation.js');
        expect(InputValidation.validateInput(null, null, null)).to.not.throw
    })
});

describe('InputValidation', function () {
    it('should return false if input null', function () {
        const InputValidation = require('../inputValidation.js');
        expect(InputValidation.validateInput(null, null)).false

    })
});

describe('InputValidation', function () {
    it('should return false if element input is empty', function () {
        const InputValidation = require('../inputValidation.js');
        const $ = get$();
        const $input = $('#message');
        const isValid = InputValidation.validateInput($, $input, null);
        expect(isValid).false
    })
});

describe('InputValidation', function () {
    it('should return true if character count is one', function () {
        const InputValidation = require('../inputValidation.js');
        const $ = get$();
        const $input = $('#message');
        $input.val("a");
        const isValid = InputValidation.validateInput($, $input, null,null,true);
        expect(isValid).true
    })
});

describe('InputValidation', function () {
    it('should return false if character count is over 150', function () {
        const InputValidation = require('../inputValidation.js');
        const $ = get$();
        const $input = $('#message');
        $input.val("x".repeat(151));
        const isValid = InputValidation.validateInput($, $input, null);
        expect(isValid).false
    })
});


describe('InputValidation', function () {
    it('should hide send button if invalid input', function () {
        const InputValidation = require('../inputValidation.js');
        const $ = get$();
        const $input = $('#message');
        $input.val("x".repeat(151));
        const isValid = InputValidation.validateInput($, $input, null);
        expect(isValid).false;
        const $button = $('#sendButton');
        expect($button.css('display')).to.equal('none')
    })
});

describe('InputValidation', function () {
    it('should show send button if valid input', function () {
        const InputValidation = require('../inputValidation.js');
        const $ = get$();
        const $input = $('#message');
        $input.val("x".repeat(140));
        const isValid = InputValidation.validateInput($, $input, null);
        expect(isValid).true;
        const $button = $('#sendButton');
        expect($button.css('display')).to.not.equal('none')
    })
});


describe('Input Validation', function () {
    it('should show enter text notification if input if empty', function () {
        const InputValidation = require('../inputValidation.js');
        const Mocks = require('./mocks.js');
    
        const $ = get$();
        const $input = $('#message');
        let divID = '#inputNotification';
        InputValidation.validateInput($, $input, Mocks.pageNotificationFake, Mocks.hidePageNotificationFake);
        $input.val("x".repeat(151));
        InputValidation.validateInput($, $input, Mocks.pageNotificationFake, Mocks.hidePageNotificationFake);
        expect($(divID).text()).to.not.equal("Enter Text")
    })
});


describe('Input Validation', function () {
    it('should show no notifications if valid input', function () {
        const InputValidation = require('../inputValidation.js');
        const Mocks = require('./mocks.js');
        var text = "Notification Text";
        const $ = get$WithNotificationText(text);

        // Valid input
        const $input = $('#message');
        $input.val("x".repeat(33));
        let divID = '#inputNotification';

        InputValidation.validateInput($, $input, Mocks.pageNotificationFake, Mocks.hidePageNotificationFake);
        expect($(divID).text()).to.not.equal(text)
    })
});


describe('Input Validation', function () {
    it('should show notifications if input is too long', function () {
        const InputValidation = require('../inputValidation.js');
        const Mocks = require('./mocks.js');
        var text = "Input must be below 150 characters";
        const $ = get$(text);

        // Valid input
        const $input = $('#message');
        $input.val("x".repeat(160));
        let divID = '#inputNotification';

        InputValidation.validateInput($, $input, Mocks.pageNotificationFake, Mocks.hidePageNotificationFake);
        expect($(divID).text()).to.equal(text)
    })
});


function get$() {
    return cheerio.load('<html><head></head><body> <form id="frm-send-message" action="#"> <label for="message">Message:</label><input type="text" id="message"/><div id = "sendButton"><input type="submit" id="send" value="Send"/></div></form><div id = "inputNotification"></div></body></html>');
}

function get$WithNotificationText(text) {
    return cheerio.load('<html><head></head><body> <form id="frm-send-message" action="#"> <label for="message">Message:</label><input type="text" id="message"/><div id = "sendButton"><input type="submit" id="send" value="Send"/></div></form><div id = "inputNotification">' + text + '</div></body></html>');
}

'use strict';

const expect = require('chai').expect;
const cheerio = require('cheerio');


context.setup = function(fn){
    jQuery.fx.off = true;
};
context.teardown = function(fn){
    jQuery.fx.off = false;
};

describe('AddRemoveMessages',function () {
    it('should exist', function () {
        const AddRemoveMessages = require('../addRemoveMessages.js');

        expect(AddRemoveMessages).to.not.be.undefined;
    })
});

describe('RemoveMessage',function () {
    it('should have RemoveMessage function', function () {
        const AddRemoveMessages = require('../addRemoveMessages.js');

        expect(AddRemoveMessages.removeMessage(null, null,null)).to.not.throw;
    })
});

describe('RemoveMessage',function () {
    it('should only return null if dom is not present', function () {
        const AddRemoveMessages = require('../addRemoveMessages.js');
        const $ = cheerio.load('<html><head></head><body><div id="messages"></div></body></html>');
        let $div = AddRemoveMessages.removeMessage(null, null, null);
        expect($div).to.be.null
        $div = AddRemoveMessages.removeMessage($,null,null);
        
        expect($div).to.not.be.null
    })
});

describe('RemoveMessage',function () {
    it('should return correct element', function () {
        const AddRemoveMessages = require('../addRemoveMessages.js');
        const $ = cheerio.load('<html><head></head><body><div id="messages"></div></body></html>');
        const containDiv = '#messages';
        const $div = AddRemoveMessages.removeMessage($, containDiv, null);
        expect($div.attr('id')).to.equal('messages')
    })
});

describe('RemoveMessage',function () {
    it('should not remove any divs if messageID invalid', function () {
        const AddRemoveMessages = require('../addRemoveMessages.js');
        const $ = cheerio.load('<html><head></head><body><div id="messages"><div id="testID"></div></div></body></html>');
        const containDiv = '#messages';
        const $div = AddRemoveMessages.removeMessage($, containDiv, null);

        expect($div.children().length).to.equal(1)
    })
});

describe('RemoveMessage',function () {
    it('should not remove any divs if messageID does not match and ids ', function () {
        const AddRemoveMessages = require('../addRemoveMessages.js');
        const divName = "testDiv";
        const invalidDivName = "invalidDiv";
        const $ = cheerio.load('<html><head></head><body><div id="messages"><div id=' + divName + '></div></div></body></html>');
        const containDiv = '#messages';
        const $div = AddRemoveMessages.removeMessage($, containDiv, invalidDivName);

        expect($div.children().length).to.equal(1)
    })
});

describe('RemoveMessage',function () {
    it('should remove div with id matching messageID ', function () {
        const AddRemoveMessages = require('../addRemoveMessages.js');
        const divName = "testDiv";
        const $ = cheerio.load('<html><head></head><body><div id="messages"><div id=' + divName + '></div></div></body></html>');
        const containDiv = '#messages';
        const $div = AddRemoveMessages.removeMessage($, containDiv, '#' + divName);

        expect($div.children().length).to.equal(0)
    })
});

describe('RemoveMessage',function () {
    it('should remove multiple divs with matching messageIDs ', function () {
        const AddRemoveMessages = require('../addRemoveMessages.js');
        const divName = "testDiv";
        const $ = cheerio.load('<html><head></head><body><div id="messages"><div id=' + divName + '></div><div id=' + divName + '></div></div></body></html>');
        const containDiv = '#messages';
        const $div = AddRemoveMessages.removeMessage($, containDiv, '#' + divName);

        expect($div.children().length).to.equal(0)
    })
});

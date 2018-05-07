'use strict';

const expect = require('chai').expect;
const cheerio = require('cheerio');

describe('AddRemoveMessages',function () {
    it('should exist', function () {
        const AddRemoveMessages = require('./addRemoveMessages.js');
        expect(AddRemoveMessages).to.not.be.undefined;
    })
});

describe('AddRemoveMessages',function () {
    it('should be able to add and them remove message', function () {
        const AddRemoveMessages = require('./addRemoveMessages.js');
        const $ = cheerio.load('<html><head></head><body><div id="messages"></div></body></html>');
        const containDiv = '#messages';
        const newMessage = "Hello";

        const id = "id-1234";
        let $div = AddRemoveMessages.addMessage($, containDiv, getMessageDataWithID(newMessage, id));
        expect($div.children().length).to.equal(1);
        $div = AddRemoveMessages.removeMessage($,$div,"#"+id);
        expect($div.children().length).to.equal(0)
    })
});

describe('AddRemoveMessages',function () {
    it('should be able to add multiplemessages', function () {
        const AddRemoveMessages = require('./addRemoveMessages.js');
        const $ = cheerio.load('<html><head></head><body><div id="messages"></div></body></html>');
        const containDiv = '#messages';
        const newMessage = "Hello";
        const id1 = "id-12341";
        const id2 = "id-12342";
        const id3 = "id-12343";

        AddRemoveMessages.addMessage($,containDiv,getMessageDataWithID(newMessage,id1));
        AddRemoveMessages.addMessage($,containDiv,getMessageDataWithID(newMessage,id2));
        const $div = AddRemoveMessages.addMessage($, containDiv, getMessageDataWithID(newMessage, id3));

        expect($div.find('#'+id1).attr('id')).to.equal(id1);
        expect($div.find('#'+id2).attr('id')).to.equal(id2);
        expect($div.find('#'+id3).attr('id')).to.equal(id3);

        expect($div.children().length).to.equal(3)
    })
});

describe('AddRemoveMessages',function () {
    it('should be able to add multiplemessages and remove multiple messages', function () {
        const AddRemoveMessages = require('./addRemoveMessages.js');
        const $ = cheerio.load('<html><head></head><body><div id="messages"></div></body></html>');
        const containDiv = '#messages';
        const newMessage = "Hello";
        const id1 = "id-12341";
        const id2 = "id-12342";
        const id3 = "id-12343";
        const id4 = "id-12344";

        AddRemoveMessages.addMessage($,containDiv,getMessageDataWithID(newMessage,id1));
        AddRemoveMessages.addMessage($,containDiv,getMessageDataWithID(newMessage,id2));
        AddRemoveMessages.addMessage($,containDiv,getMessageDataWithID(newMessage,id3));

        let $div = AddRemoveMessages.addMessage($, containDiv, getMessageDataWithID(newMessage, id4));

        expect($div.find('#'+id1).attr('id')).to.equal(id1);
        expect($div.find('#'+id2).attr('id')).to.equal(id2);
        expect($div.find('#'+id3).attr('id')).to.equal(id3);
        expect($div.find('#'+id4).attr('id')).to.equal(id4);
        
        expect($div.children().length).to.equal(4);

        $div = AddRemoveMessages.removeMessage($,$div,"#"+id2);
        $div = AddRemoveMessages.removeMessage($,$div,"#"+id3);

        expect($div.children().length).to.equal(2)
        
    })
});

function getMessageDataWithID(inputMessage, inputID) {
    return {
        message :inputMessage,
        id : inputID,
        timeStamp : '2018-01-01T01:01:01'
    };
}
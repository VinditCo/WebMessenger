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

describe('AddMessage',function () {
    it('should have AddMessage function', function () {
        const AddRemoveMessages = require('../addRemoveMessages.js');
        expect(AddRemoveMessages.addMessage(null, null,null)).to.not.throw;
    })
});


describe('AddMessage',function () {
    it('should only return null if dom is not present', function () {
        const AddRemoveMessages = require('../addRemoveMessages.js');
        const $ = cheerio.load('<html><head></head><body><div id="messages"></div></body></html>');
        let $div = AddRemoveMessages.addMessage($, null, null);
        expect($div).to.not.be.null;
        $div = AddRemoveMessages.addMessage(null,null,null);
        expect($div).to.be.null
        
    })
});


describe('AddMessage',function () {
    it('should return correct element', function () {
        const AddRemoveMessages = require('../addRemoveMessages.js');
        const $ = cheerio.load('<html><head></head><body><div id="messages"></div></body></html>');
        const containDiv = '#messages';
        const $div = AddRemoveMessages.addMessage($, containDiv, null);
        expect($div.attr('id')).to.equal('messages')
    })
});

describe('AddMessage',function () {
    

    it('should not add new div if message or ID is null, empty or white space ', function () {
        const AddRemoveMessages = require('../addRemoveMessages.js');


        const $ = cheerio.load('<html><head></head><body><div id="messages"></div></body></html>');
        const containDiv = '#messages';

        // id null or empty
        var messageData = getMessageData();
        messageData.id = null;
        var $div = AddRemoveMessages.addMessage($,containDiv,messageData);
        expect($div.children().length).equal(0);
        messageData = getMessageData();
        messageData.id = " " ;
        var $div = AddRemoveMessages.addMessage($,containDiv,messageData);
        expect($div.children().length).equal(0);
        
        // Message null or empty
        var messageData = getMessageData();
        messageData.message = null;
        var $div = AddRemoveMessages.addMessage($,containDiv,messageData);
        expect($div.children().length).equal(0);
        messageData = getMessageData();
        messageData.message = " " ;
        var $div = AddRemoveMessages.addMessage($,containDiv,messageData);
        expect($div.children().length).equal(0);


        // Message timeStamp or empty
        var messageData = getMessageData();
        messageData.timeStamp = null;
        var $div = AddRemoveMessages.addMessage($,containDiv,messageData);
        expect($div.children().length).equal(0);
        messageData = getMessageData();
        messageData.timeStamp = " " ;
        var $div = AddRemoveMessages.addMessage($,containDiv,messageData);
        expect($div.children().length).equal(0);
        

    })
});

describe('AddMessage',function () {
    it('should add new div if valid input', function () {
        const AddRemoveMessages = require('../addRemoveMessages.js');
        const $ = cheerio.load('<html><head></head><body><div id="messages"></div></body></html>');
        const containDiv = '#messages';

        const $div = AddRemoveMessages.addMessage($, containDiv, getMessageData());

        expect($div.children().length).equal(1);
    })
});

describe('AddMessage',function () {
    it('should add new div with correct class if valid input', function () {
        const AddRemoveMessages = require('../addRemoveMessages.js');
        const $ = cheerio.load('<html><head></head><body><div id="messages"></div></body></html>');
        const containDiv = '#messages';
        const className = "message";
        const $div = AddRemoveMessages.addMessage($, containDiv, getMessageData());

        expect($div.children().length).equal(1);
        expect($div.children().first().attr('class')).equal(className)
    })
});


describe('AddMessage',function () {
    it('should add new div with correct ID if valid input', function () {
        const AddRemoveMessages = require('../addRemoveMessages.js');
        const messageData = getMessageData();
        const $ = cheerio.load('<html><head></head><body><div id="messages"></div></body></html>');
        const containDiv = '#messages';

        const $div = AddRemoveMessages.addMessage($, containDiv, messageData);
        const newMessage = $('#'+messageData.id);
        
        expect(newMessage.text()).to.not.be.null
    })
});

describe('AddMessage',function () {
    it('should add new div with correct message if valid input', function () {
        const AddRemoveMessages = require('../addRemoveMessages.js');
        const messageData = getMessageData();

        const $ = cheerio.load('<html><head></head><body><div id="messages"></div></body></html>');
        const containDiv = '#messages';
        
        AddRemoveMessages.addMessage($, containDiv, messageData);
        let messageDiv = '#'+messageData.id;
        const text =  $(messageDiv).contents().not($(messageDiv).children()).text();
        expect(text).to.equal(messageData.message);


    })
});


describe('AddMessage',function () {
    it('should prepend new message', function () {
        const AddRemoveMessages = require('../addRemoveMessages.js');
        const messageData = getMessageData();
        const $ = cheerio.load('<html><head></head><body><div id="messages"></div></body></html>');
        const containDiv = '#messages';
        let $div = AddRemoveMessages.addMessage($, containDiv, messageData);

        expect($div.find('#'+messageData.id).attr('id')).to.equal(messageData.id);

        const secondMessage = getMessageData();
        secondMessage.id = "SecondMessageID";

        $div = AddRemoveMessages.addMessage($,containDiv,secondMessage);
        
        expect($div.children().first().attr('id')).to.equal(secondMessage.id);
        expect($div.children().eq(1).attr('id')).to.equal(messageData.id)
    })
});

describe('AddMessage',function () {
    it('should have span element with correct data-livestamp attribute', function () {
        const AddRemoveMessages = require('../addRemoveMessages.js');
        const messageData = getMessageData();
        const containDiv = '#messages';
        const $ = cheerio.load('<html><head></head><body><div id="messages"></div></body></html>');

        AddRemoveMessages.addMessage($, containDiv, messageData);
        var time = $( "time" );
        expect(time.length).to.equal(1);
        expect(time.attr('datetime')).to.equal(messageData.timeStamp);
        
    })
});

describe('AddMessage',function () {
    it('should show message with a delete button', function () {
        const AddRemoveMessages = require('../addRemoveMessages.js');
        const messageData = getMessageData();
        const containDiv = '#messages';
        const $ = cheerio.load('<html><head></head><body><div id="messages"></div></body></html>');

        AddRemoveMessages.addMessage($, containDiv, messageData);

        var button = $( "button" );
        expect(button.length).to.equal(1);
        expect(button.text()).equal("Delete")
  

    })
});

describe('AddMessage',function () {
    it('should add function to Delete button on Click', function () {
        const AddRemoveMessages = require('../addRemoveMessages.js');
        const messageData = getMessageData();
        const containDiv = '#messages';
        const $ = cheerio.load('<html><head></head><body><div id="messages"></div></body></html>');

        AddRemoveMessages.addMessage($, containDiv, messageData, function () {
            
        });

        var button = $( "button" );
        expect(button.length).to.equal(1);
        expect(button.text()).equal("Delete")


    })
});



function getMessageData() {
    return {
        message : "Hello",
        id : "id-1234",
        timeStamp : '2018-01-01T01:01:01'
    };
}
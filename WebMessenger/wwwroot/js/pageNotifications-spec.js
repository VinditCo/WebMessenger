'use strict';

const expect = require('chai').expect;
const cheerio = require('cheerio');

describe('PageNotifications',function () {
    it('should exist', function () {
        const AddRemoveMessages = require('./pageNotifications.js');
        expect(AddRemoveMessages).to.not.be.undefined;
    })
});


describe('PageNotification',function () {
    it('should have PageNotification function', function () {
        const Notifications = require('./pageNotifications.js');
        const Mocks = require('./mocks');
        expect(Notifications.pageNotification(null,"Message","#div",Mocks.fadeInPageNotificationDummy,Mocks.fadeOutPageNotificationDummy)).to.not.throw;
    })
});

describe('PageNotification',function () {
    it('should return null if input is null', function () {
        let PageNotifications = require('./pageNotifications.js');
        const Mocks = require('./mocks');
        
        
        expect(PageNotifications.pageNotification(null,"Message","#div",Mocks.adeInPageNotificationDummy,Mocks.fadeOutPageNotificationDummy)).to.be.null;

        PageNotifications = require('./pageNotifications.js');
        expect(PageNotifications.pageNotification(null,null,"#div",Mocks.fadeInPageNotificationDummy,Mocks.fadeOutPageNotificationDummy)).to.be.null;

        PageNotifications = require('./pageNotifications.js');
        expect(PageNotifications.pageNotification(null,null,null,Mocks.fadeInPageNotificationDummy,Mocks.fadeOutPageNotificationDummy)).to.be.null
    })
});

describe('PageNotification',function () {
    it('should return null if target div is whitespace', function () {
        let PageNotifications = require('./pageNotifications.js');
        const Mocks = require('./mocks');
        expect(PageNotifications.pageNotification(null,"Message","    ",Mocks.fadeInPageNotificationDummy,Mocks.fadeOutPageNotificationDummy)).to.be.null
   })
});


describe('PageNotification',function () {
    it('should return pageNotifications element if valid input', function () {
        const Notifications = require('./pageNotifications.js');
        const Mocks = require('./mocks');
        
        const $ = cheerio.load('<html><head></head><body><div id="messages"></div><div id="pageNotification"></div></body></html>');
        const pageNotificationElement = Notifications.pageNotification($, "Message", '#pageNotification', Mocks.fadeInPageNotificationDummy, Mocks.fadeOutPageNotificationDummy);
        expect(pageNotificationElement.attr('id')).to.equal("pageNotification")

    })
});

describe('PageNotification',function () {
    it('should have correct copy inside element', function () {
        const Notifications = require('./pageNotifications.js');
        const Mocks = require('./mocks');
        
        
        const $ = cheerio.load('<html><head></head><body><div id="messages"></div><div id="pageNotification"></div></body></html>');
        const pageNotificationElement = Notifications.pageNotification($, "Message", '#pageNotification', Mocks.fadeInPageNotificationDummy, Mocks.fadeOutPageNotificationDummy);

        expect(pageNotificationElement.attr('id')).to.equal("pageNotification");
        expect(pageNotificationElement.text()).to.equal("Message")
    })
});

describe('PageNotification',function () {
    it('should have correct copy inside element if already has text', function () {
        const Notifications = require('./pageNotifications.js');  
        const Mocks = require('./mocks');

        const $ = cheerio.load('<html><head></head><body><div id="messages"></div><div id="pageNotification">Old Text</div></body></html>');
        const pageNotificationElement = Notifications.pageNotification($, "Message", '#pageNotification', Mocks.fadeInPageNotificationDummy, Mocks.fadeOutPageNotificationDummy);

        expect(pageNotificationElement.attr('id')).to.equal("pageNotification");
        expect(pageNotificationElement.text()).to.equal("Message")
    })
});

describe('PageNotification',function () {
    it('should be visible', function () {
        const Notifications = require('./pageNotifications.js');
        const Mocks = require('./mocks');
        
        const $ = cheerio.load('<html><head></head><body><div id="messages"></div><div style="display: none;" id="pageNotification"></div></body></html>');
        const pageNotificationElement = Notifications.pageNotification($, "Message", '#pageNotification', Mocks.fadeInPageNotificationFake, Mocks.fadeOutPageNotificationDummy);
        expect(pageNotificationElement.css('display')).to.not.equal('none')

    })
});

describe('PageNotification',function () {
    it('should fade out', function () {
        const Notifications = require('./pageNotifications.js');
        const Mocks = require('./mocks');
        
        const $ = cheerio.load('<html><head></head><body><div id="messages"></div><div style="display: none;" id="pageNotification"></div></body></html>');
        const pageNotificationElement = Notifications.pageNotification($, "Message", '#pageNotification', Mocks.fadeInPageNotificationFake, Mocks.fadeOutPageNotificationFake);
        expect(pageNotificationElement.css('display')).to.equal('none')

    })
});

describe('PageNotification',function () {
    it('should not show if message is invalid', function () {
        const Notifications = require('./pageNotifications.js');
        const Mocks = require('./mocks');
        
        const $ = cheerio.load('<html><head></head><body><div id="messages"></div><div style="display: none;" id="pageNotification"></div></body></html>');
        const pageNotificationElement = Notifications.pageNotification($, "    ", '#pageNotification', Mocks.fadeInPageNotificationFake, Mocks.fadeOutPageNotificationDummy);
        expect(pageNotificationElement.css('display')).to.equal('none')

    })
});


describe('PageNotification',function () {
    it('should have PageNotificationForceHde function', function () {
        const Notifications = require('./pageNotifications.js');
   
        expect(Notifications.pageNotificationForceHide(null,"#div")).to.not.throw;
    })
});


describe('PageNotifications',function () {
    it('should force hide element when called',function () {
        const Notifications = require('./pageNotifications.js');
        const Mocks = require('./mocks');

        const $ = cheerio.load('<html><head></head><body><div id="messages"></div><div style="display: inline;" id="pageNotification"></div></body></html>');
        Notifications.pageNotificationForceHide($,"#pageNotification");
        
        expect($("#pageNotification").css('display')).to.equal('none')
    })
});

describe('PageNotifications',function () {
    it('should do nthing if invalid elementID',function () {
        const Notifications = require('./pageNotifications.js');

        const $ = cheerio.load('<html><head></head><body><div id="messages"></div><div style="display: inline;" id="pageNotification"></div></body></html>');
        Notifications.pageNotificationForceHide($,"#invalid");

        expect($("#pageNotification").css('display')).to.not.equal('none')
    })
});



//message sent
//message deleted 

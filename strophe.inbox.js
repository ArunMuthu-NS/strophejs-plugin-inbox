import { $iq, Strophe} from 'strophe.js';

Strophe.addConnectionPlugin('inbox',{
    _c: null,
    init: function (conn) {
        this._c = conn;
        Strophe.addNamespace('INBOX','erlang-solutions.com:xmpp:inbox:0');
    },
    query: function(options) {
        var attr = {
            type: 'set',
        };
        options = options || {};
        var inboxAttr = {xmlns: Strophe.NS.INBOX};
        if (!!options.queryid) {
            inboxAttr.queryid = options.queryid;
            delete options.queryid;
        }
        var iq = $iq(attr).c('inbox',inboxAttr).c('x',{xmlns:'jabber:x:data', type:'form'});

        iq.c('field',{var:'FORM_TYPE', type:'hidden'}).c('value').t(Strophe.NS.INBOX).up().up();

        iq.up();

        var onMessage = options.onMessage;
        delete options.onMessage;
        var onComplete = options.onComplete;
        delete options.onComplete;

        var _c = this._c;
        var handler = _c.addHandler(onMessage, Strophe.NS.INBOX, 'message', null);
        return this._c.sendIQ(iq, function(){
           _c.deleteHandler(handler);
           onComplete.apply(this, arguments);
        });
    }
});

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function() {
		this.initButtonHandler('body/btnSubmit', 'onBtnSubmitClicked');
		this.initButtonHandler('body/btnClose', 'onBtnCloseClicked');
    },

	initButtonHandler: function(path, cb) {
        var btn = cc.find(path, this.node);
        cc.vv.utils.addClickEvent(btn, this.node, 'Feedback', cb);
    },

	onBtnSubmitClicked: function(event) {
		var body = this.node.getChildByName('body');
		var edtContent = cc.find('content/edtContent', body).getComponent(cc.EditBox);
		var edtQQ = cc.find('qq/edtQQ', body).getComponent(cc.EditBox);
		var edtPhone = cc.find('phone/edtPhone', body).getComponent(cc.EditBox);

		var content = edtContent.string;
		var qq = edtQQ.string;
		var phone = edtPhone.string;
		var errmsg = null;

		if (content == '') {
			errmsg = '';
		} else if (qq == '') {
			errmsg = '';
		} else if (qq == '') {
			errmsg = '';
		}

		if (errmsg) {
			cc.vv.alert.show('');
			return;
		}

		
    },

	onBtnCloseClicked: function(event) {
		cc.vv.utils.showDialog(this.node, 'body', false);
    },
});


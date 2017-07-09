
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function() {
		this.initButtonHandler('body/btnSubmit', 'onBtnSubmitClicked');
		this.initButtonHandler('body/btnClose', 'onBtnCloseClicked');
    },

	reset: function() {
		var body = this.node.getChildByName('body');
		var edtContent = cc.find('content/edtContent', body).getComponent(cc.EditBox);
		var edtQQ = cc.find('qq/edtQQ', body).getComponent(cc.EditBox);
		var edtPhone = cc.find('phone/edtPhone', body).getComponent(cc.EditBox);

		edtContent.string = '';
		edtQQ.string = '';
		edtPhone.string = '';
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
			errmsg = '请填写反馈内容';
		} else if (qq == '') {
			errmsg = '请填写QQ号码，以便我们联系您!';
		} else if (phone == '') {
			errmsg = '请填写电话号码，以便我们联系您!';
		}

		if (errmsg) {
			cc.vv.alert.show(errmsg);
			return;
		}

		// TODO: send to server
		this.close();
		cc.vv.alert.show('感谢您的反馈，我们会尽快处理!');
    },

	onBtnCloseClicked: function(event) {
		this.close();
    },

	close: function() {
		cc.vv.utils.showDialog(this.node, 'body', false);
		this.reset();
    },
});


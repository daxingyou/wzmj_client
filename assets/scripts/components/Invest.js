
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function() {
		this.initButtonHandler('body/btnSubmit', 'onBtnSubmitClicked');
		this.initButtonHandler('/body/btnClose', 'onBtnCloseClicked');
    },

	reset: function() {
		var body = this.node.getChildByName('body');
		var edtName = cc.find('name/edit', body).getComponent(cc.EditBox);
		var edtPhone = cc.find('phone/edit', body).getComponent(cc.EditBox);
		var edtWechat = cc.find('wechat/edit', body).getComponent(cc.EditBox);

		edtName.string = '';
		edtPhone.string = '';
		edtWechat.string = '';
    },

	initButtonHandler: function(path, cb) {
        var btn = cc.find(path, this.node);
        cc.vv.utils.addClickEvent(btn, this.node, 'Invest', cb);
    },

	onBtnSubmitClicked: function(event) {
		var body = this.node.getChildByName('body');
		var edtName = cc.find('name/edit', body).getComponent(cc.EditBox);
		var edtPhone = cc.find('phone/edit', body).getComponent(cc.EditBox);
		var edtWechat = cc.find('wechat/edit', body).getComponent(cc.EditBox);

		var name = edtName.string;
		var phone = edtPhone.string;
		var wechat = edtWechat.string;
		var errmsg = null;

		if (name == '') {
			errmsg = '请填写名字';
		} else if (phone == '') {
			errmsg = '请填写电话号码，以便我们联系您!';
		} else if (wechat == '') {
			errmsg = '请填写微信，以便我们联系您!';
		}

		if (errmsg) {
			cc.vv.alert.show(errmsg);
			return;
		}

		// TODO: send to server
		this.close();
		cc.vv.alert.show('感谢您的信任，我们会尽快联系您!');
    },

	onBtnCloseClicked: function(event) {
		this.close();
    },

	close: function() {
		cc.vv.utils.showDialog(this.node, 'body', false);
		this.reset();
    },
});


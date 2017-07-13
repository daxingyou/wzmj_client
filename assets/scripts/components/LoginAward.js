
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function() {
		var node = this.node;

		var btnClose = cc.find('body/btnClose', node);
		cc.vv.utils.addClickEvent(btnClose, this.node, 'LoginAward', 'onBtnCloseClicked');
    },

	start: function() {
		// TODO
    },

	onBtnCloseClicked: function(event) {
		var node = this.node;

		cc.vv.audioMgr.playButtonClicked();
	    cc.vv.utils.showDialog(node, 'body', false);
    },
});


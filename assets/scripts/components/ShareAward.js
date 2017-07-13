
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function() {
		var node = this.node;

		var btnClose = cc.find('body/btnClose', node);
		cc.vv.utils.addClickEvent(btnClose, this.node, 'ShareAward', 'onBtnCloseClicked');
    },

	onBtnCloseClicked: function(event) {
		var node = this.node;

		cc.vv.audioMgr.playButtonClicked();
	    cc.vv.utils.showDialog(node, 'body', false);
    },
});


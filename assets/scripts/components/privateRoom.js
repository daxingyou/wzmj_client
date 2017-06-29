
cc.Class({
    extends: cc.Component,

    properties: {
		joinGameWin: cc.Node,
		createRoomWin: cc.Node,
    },

    // use this for initialization
    onLoad: function () {
    },

    onBtnCloseClicked: function(event) {
        cc.vv.audioMgr.playButtonClicked();
		cc.vv.utils.showDialog(this.node, 'body', false);
    },

	onCreateRoomClicked:function(){
        cc.vv.audioMgr.playButtonClicked();

		cc.vv.utils.showDialog(this.node, 'body', false);

        if(cc.vv.gameNetMgr.roomId != null){
            cc.vv.alert.show("房间已经创建!\n必须解散当前房间才能创建新的房间");
            return;
        }

		cc.vv.utils.showDialog(this.createRoomWin, 'body', true);
    },

	onJoinGameClicked: function() {
        cc.vv.audioMgr.playButtonClicked();

		cc.vv.utils.showDialog(this.node, 'body', false);

		cc.vv.utils.showDialog(this.joinGameWin, 'panel', true);
    },
});


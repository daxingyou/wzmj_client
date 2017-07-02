cc.Class({
    extends: cc.Component,

    properties: {
        _wanfa: null,
        _gamenum: null,
        _playernum: null,
        _pay: null,
        _idx: 0,
    },

    // use this for initialization
    onLoad: function () {
        this._wanfa = [];
        var t = cc.find("body/grpGame", this.node);
        for (var i = 0; i < t.childrenCount; i++) {
            var n = t.children[i].getComponent("RadioButton");
            if (n != null) {
                this._wanfa.push(n);
            }
        }

        this._gamenum = [];
        var t = cc.find("body/grpGameNum", this.node);
        for (var i = 0; i < t.childrenCount; i++) {
            var n = t.children[i].getComponent("RadioButton");
            if (n != null) {
                this._gamenum.push(n);
            }
        }

        this._playernum = [];
        var t = cc.find("body/grpPlayerNum", this.node);
        for (var i = 0; i < t.childrenCount; i++) {
            var n = t.children[i].getComponent("RadioButton");
            if (n != null) {
                this._playernum.push(n);
            }
        }

        this._pay = [];
        var t = cc.find("body/grpPay", this.node);
        for (var i = 0; i < t.childrenCount; i++) {
            var n = t.children[i].getComponent("RadioButton");
            if (n != null) {
                this._pay.push(n);
            }
        }

		var self = this;

		this.wanfas = [ 'wzmj', 'zzmj' ];
		this.showWanfa(this._idx);

		this.node.on("rb-updated", function(event) {
            var id = event.detail.id;
            self.showWanfa(id);
        });
	},

	showWanfa: function(id) {
		var wanfas = this.wanfas;

		if (id == null || id < 0 || id >= wanfas.length) {
			return;
		}

		this._idx = id;

		var w = cc.find('body/wanfa', this.node);

		for (var i = 0; i < w.childrenCount; i++) {
			var child = w.children[i];
			child.active = i == id;
		}
	},

    onBtnClose:function() {
        cc.vv.audioMgr.playButtonClicked();
		cc.vv.utils.showDialog(this.node, 'body', false);
    },

    onBtnOK:function() {
        cc.vv.audioMgr.playButtonClicked();
        cc.vv.utils.showDialog(this.node, 'body', false);
        this.createRoom();
    },

    createRoom: function() {
        var self = this;
        var onCreate = function(ret) {
            if(ret.errcode !== 0){
                cc.vv.wc.hide();

                if(ret.errcode == 2222){
                    cc.vv.alert.show("房卡不足，创建房间失败!");  
                }
                else{
                    cc.vv.alert.show("创建房间失败,错误码:" + ret.errcode);
                }
            }
            else{
                cc.vv.gameNetMgr.connectGameServer(ret);
            }
        };

        var wanfas = [ 'wzmj', 'zzmj' ];
        var wanfa = null;
        for (var i = 0; i < self._wanfa.length; ++i) {
            if (self._wanfa[i].checked) {
                wanfa = wanfas[i];
                break;
            }
        }

        var gamenum = 0;
		var gamenums = [ 4, 8, 16 ];
        for (var i = 0; i < self._gamenum.length; ++i) {
            if (self._gamenum[i].checked) {
                gamenum = gamenums[i];
                break;
            }
        }
        
        var playernum = 0;
        var playernums = [ 4, 2 ];
        for (var i = 0; i < self._playernum.length; ++i) {
            if (self._playernum[i].checked) {
                playernum = playernums[i];
                break;
            }
        }

        var pay = 0;
        for (var i = 0; i < self._pay.length; i++) {
            if (self._pay[i].checked) {
                pay = i;
                break;
            }
        }
        
        var conf = {
            type: wanfa,
            gamenum: gamenum,
            playernum: playernum,
            pay: pay,
        };

		var id = self._idx;
		var w = cc.find('body/wanfa', self.node);
		var node = w.children[id];

		if (0 == id) {
			var t = node.getChildByName('btnGangFen').getComponent("CheckBox");
			conf.gangfen = t.checked;

            var t = node.getChildByName('btnCaishen').getComponent("CheckBox");
			conf.caishenfen = t.checked;
			
			var t = node.getChildByName('btnGangKai').getComponent("CheckBox");
			conf.gangkai = t.checked;
		} else if (1 == id) {
			var hu = 0;
			var t = node.getChildByName('grpHu');
			for (var i = 0; i < t.childrenCount; i++) {
				var n = t.children[i].getComponent("RadioButton");
				if (n.checked) {
					hu = i;
					break;
				}
			}
			
			conf.hu = hu;
			
			var birdNum = 0;
			var t = node.getChildByName('grpBirds');
			var birds = [ 2, 4, 6 ];
			for (var i = 0; i < t.childrenCount; i++) {
				var n = t.children[i].getComponent("RadioButton");
				if (n.checked) {
					birdNum = birds[i];
					break;
				}
			}
			
			conf.birds = birdNum;
		}

        var data = {
            account: cc.vv.userMgr.account,
            sign: cc.vv.userMgr.sign,
            conf: JSON.stringify(conf)
        };

        console.log(data);
        cc.vv.wc.show(2);
        cc.vv.http.sendRequest("/create_private_room", data, onCreate);   
    }
});


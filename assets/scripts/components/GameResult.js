
cc.Class({
    extends: cc.Component,

    properties: {
        _gameresult:null,
        _seats:[],

		_time: null,
		_roominfo: null,
		_lastSeconds: 0,
    },

    onLoad: function() {
		if (cc.vv == null) {
			return;
		}

        var gameresult = this.node.getChildByName('game_result');
		this._gameresult = gameresult;

		this._time = gameresult.getChildByName('time').getComponent(cc.Label);
		this._roominfo = gameresult.getChildByName('roominfo').getComponent(cc.Label);

        var seats = this._gameresult.getChildByName('seats');
        for (var i = 0; i < seats.children.length; i++) {
            this._seats.push(seats.children[i].getComponent('Seat'));   
        }

        var btnClose = gameresult.getChildByName('btnClose');
        if (btnClose) {
            cc.vv.utils.addClickEvent(btnClose, this.node, 'GameResult', 'onBtnCloseClicked');
        }

        var btnShare = gameresult.getChildByName('btnShare');
        if (btnShare) {
            cc.vv.utils.addClickEvent(btnShare, this.node, 'GameResult', 'onBtnShareClicked');
        }

        var self = this;
        this.node.on('game_end', function(data) {
			self.onGameEnd(data.detail);
		});
    },

    showResult: function(seat, info, winner) {
    	var values = seat.getChildByName('values');

        values.getChildByName('button').getComponent(cc.Label).string = info.numzz;
        values.getChildByName('gang').getComponent(cc.Label).string = info.numgang;
        values.getChildByName('maidi').getComponent(cc.Label).string = info.nummd;
        values.getChildByName("dingdi").getComponent(cc.Label).string = info.numdd;
		values.getChildByName("yingpai").getComponent(cc.Label).string = info.numyp;
        values.getChildByName("sf").getComponent(cc.Label).string = info.numsf;

        seat.getChildByName('winner').active = winner;
    },

    onGameEnd: function(endinfo) {
		var net = cc.vv.gameNetMgr;
		var seats = net.seats;
		var nSeats = net.numOfSeats;
		var maxscore = -1;

		for (var i = 0; i < seats.length; i++) {
            var seat = seats[i];
            if (seat.score > maxscore) {
                maxscore = seat.score;
            }
        }

        for (var i = 0; i < nSeats; i++) {
            var seat = seats[i];
            var isBigwin = false;
            if (seat.score > 0) {
                isBigwin = seat.score == maxscore;
            }

            this._seats[i].setInfo(seat.name, seat.score);
            this._seats[i].setID(seat.userid);

            this.showResult(this._seats[i].node, endinfo[i], isBigwin);
        }

		for (var i = nSeats; i < 4; i++) {
			var node = this._seats[i].node;

			node.active = false;
		}
		
		this._roominfo.string = '房间号: ' + net.roomId + ' 局数: ' + net.numOfGames + '/' + net.maxNumOfGames;
    },
    
    onBtnCloseClicked:function(){
        cc.director.loadScene("hall");
    },
    
    onBtnShareClicked:function(){
        cc.vv.audioMgr.playButtonClicked();

		setTimeout(function() {
			cc.vv.anysdkMgr.shareResult();
		}, 100);
    },

	curentTime: function() {
		var now = new Date();

		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var day = now.getDate();

		var hh = now.getHours();
		var mm = now.getMinutes();
		var ss = now.getSeconds();

		var clock = year + "-";

		if (month < 10) {
			clock += "0";
		}

		clock += month + "-";

		if (day < 10) {
			clock += "0";
		}

		clock += day + " ";

		if (hh < 10) {
			clock += "0";
		}

		clock += hh + ":";
		if (mm < 10) {
			clock += '0';
		}

		clock += mm + ":";

		if (ss < 10) {
			clock += '0';
		}

		clock += ss;
		
		return clock;
    },

    update: function (dt) {
		var seconds = Math.floor(Date.now()/1000);
        if (this._lastSeconds != seconds) {
            this._lastSeconds = seconds;

            this._time.string = this.curentTime();
        }
    },
});


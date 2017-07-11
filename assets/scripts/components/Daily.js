
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function() {
		var daily = this.node.getChildByName('daily');
		daily.active = false;

		var btnClose = cc.find('body/btnClose', daily);
		cc.vv.utils.addClickEvent(btnClose, this.node, 'Daily', 'onBtnCloseClicked');

		
    },

	onBtnCloseClicked: function(event) {
		var daily = this.node.getChildByName('daily');

		cc.vv.audioMgr.playButtonClicked();
	    cc.vv.utils.showDialog(daily, 'body', false);
    },

	showDaily: function() {
		var daily = this.node.getChildByName('daily');

		cc.vv.utils.showDialog(daily, 'body', true);

		var self = this;
		cc.vv.userMgr.getDailyStatus(function(data) {
			if (!data) {
				return;
			}

			var body = daily.getChildByName('body');
			var dailyActive = cc.find('dailyActive/value', body).getComponent(cc.Label);
			var weekActive = cc.find('week/weekActive/value', body).getComponent(cc.Label);
			var progress = body.getChildByName('progress');
			var current = progress.getChildByName('current').getComponent(cc.Sprite);
			var tasks = body.getChildByName('tasks');

			var day = data.dayActive;
			var week = data.weekActive;
			var dayGot = data.dayGot;
			var weekGot = data.weekGot;

			dailyActive.string = day;
			weekActive.string = week;

			current.fillRange = day / 100;

			var boxes = progress.getChildByName('boxes');
			for (var i = 0; i < boxes.childrenCount; i++) {
				var box = boxes.children[i].getComponent(cc.Button);

				box.interactable = (day >= (i + 1) * 20) && (dayGot[i] == 0);
			}

			boxes = cc.find('week/boxes', body);
			var off = [ 400, 700 ];
			for (var i = 0; i < boxes.childrenCount; i++) {
				var box = boxes.children[i].getComponent(cc.Button);

				box.interactable = (week >= off[i] && weekGot[i] == 0);
			}

			var ts = data.tasks;

			var index = 0;
			for (var i = 0; i < ts.length && i < tasks.childrenCount; i++) {
				var item = tasks.children[i];
				var t = ts[i];

				var type = item.getChildByName('type').getComponent('SpriteMgr');
				var content = item.getChildByName('content').getComponent(cc.Label);
				var prog = item.getChildByName('progress').getComponent(cc.Label);
				var award = item.getChildByName('award').getComponent(cc.Label);

				item.active = true;
				type.setIndex(t.type);
				content.string = t.content;
				prog.string = t.progress;
				award.string = 'x' + t.award;

				index++;
			}

			for (var i = index; i < tasks.childrenCount; i++) {
				var item = tasks.children[i];
				item.active = false;
			}
		});
    },
});


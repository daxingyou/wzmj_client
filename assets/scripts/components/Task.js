
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad: function () {
		var task = this.node.getChildByName('task');
		task.active = false;

		var btnClose = cc.find('body/btnClose', task);
		cc.vv.utils.addClickEvent(btnClose, this.node, 'Task', 'onBtnCloseClicked');

		var btnTask = cc.find('bottom/buttons/btnTask', this.node);
		cc.vv.utils.addClickEvent(btnTask, this.node, 'Task', 'onBtnTaskClicked');

		var content = cc.find('body/list/view/content', task);

		var task0 = content.children[0];
		var button = task0.getChildByName('entry');
		cc.vv.utils.addClickEvent(button, this.node, 'Task', 'onBtnBindClicked');

		var task1 = content.children[1];
		task1.active = false;

		var task2 = content.children[2];
		button = task2.getChildByName('entry');
		cc.vv.utils.addClickEvent(button, this.node, 'Task', 'onBtnDailyClicked');

		var task3 = content.children[3];
		button = task3.getChildByName('entry');
		cc.vv.utils.addClickEvent(button, this.node, 'Task', 'onBtnLoginClicked');
    },

	onBtnTaskClicked: function(event) {
		cc.vv.audioMgr.playButtonClicked();

		var self = this;
		var task = this.node.getChildByName('task');
		var content = cc.find('body/list/view/content', task);

		cc.vv.utils.showDialog(task, 'body', true);

		cc.vv.userMgr.getTaskStatus(function(data) {
			if (!data) {
				return;
			}

			content.children[0].active = !data.hasBindPhone;
		});
    },

	onBtnCloseClicked: function(event) {
		var task = this.node.getChildByName('task');

		cc.vv.audioMgr.playButtonClicked();
	    cc.vv.utils.showDialog(task, 'body', false);
    },

	onBtnBindClicked: function(event) {
		// TODO
		cc.vv.audioMgr.playButtonClicked();
		cc.vv.alert.show('即将开启，敬请期待');
    },

	onBtnDailyClicked: function(event) {
		cc.vv.audioMgr.playButtonClicked();

		var task = this.node.getChildByName('task');
		var daily = this.node.getComponent('Daily');

		cc.vv.utils.showDialog(task, 'body', false);
		daily.showDaily();
    },

	onBtnLoginClicked: function(event) {
		cc.vv.audioMgr.playButtonClicked();

		var task = this.node.getChildByName('task');
		var loginAward = this.node.getChildByName('loginAward');

		cc.vv.utils.showDialog(task, 'body', false);
		cc.vv.utils.showDialog(loginAward, 'body', true);
    },
});


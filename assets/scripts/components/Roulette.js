
cc.Class({
    extends: cc.Component,

    properties: {
		rname: '',

		_running: false,
		_last: 0,
    },

    onLoad: function() {
		var node = this.node;

		var btnStart = node.getChildByName('btnStart');
		cc.vv.utils.addClickEvent(btnStart, this.node, 'Roulette', 'onBtnStartClicked');
    },

	start: function() {
		this.init();
    },

	onBtnStartClicked: function(event) {
		var self = this;

		if (this._running) {
			return;
		}

		cc.vv.userMgr.runRoulette(self.rname, function(data) {
			if (!data) {
				return;
			}

			self.run(data.id);
		});
    },

	setRunning: function(status) {
		this._running = status;

		var node = this.node;
		var pointer = node.getChildByName('pointer');
		var bgpointer = node.getChildByName('bgpointer');
		var light = node.getChildByName('light');

		light.active = !status;
		bgpointer.active = status;

		if (status) {
			bgpointer.rotation = 0;
			pointer.rotation = 0;
		} else {
			this._last = 0;
			light.rotation = 22.5;
			pointer.rotation = 0;
		}
    },

	run: function(id) {
		var duration = 6;
		var rounds = 10;
		var angle = parseInt(Math.random() * 35 + (id * 45 + 5));
		var node = this.node;
		var pointer = node.getChildByName('pointer');

		var rotate = cc.rotateBy(duration, angle + 360 * rounds);

		this.setRunning(true);

		pointer.runAction(rotate).easing(cc.easeCubicActionOut(duration));

		var self = this;

		setTimeout(function() {
			self.setRunning(false);
		}, duration * 1000 + 500);
    },

	init: function(data) {
		var node = this.node;

		cc.vv.userMgr.getRouletteInfo(self.rname, function(data) {
			if (!data) {
				return;
			}

			// TODO
		});
    },

	update: function (dt) {
		var node = this.node;
		var pointer = node.getChildByName('pointer');
		var bgpointer = node.getChildByName('bgpointer');
		var light = node.getChildByName('light');

		if (this._running) {
			var rotation = pointer.rotation % 360;
			var id = parseInt(rotation / 45);

			bgpointer.rotation = (id + 1) * 45;
		} else {
			var rotation = light.rotation % 360;
			var last = this._last;

			last += dt;

			if (last >= 1.5) {
				last -= 1.5;

				rotation += 45;
				light.rotation = rotation;
			}

			this._last = last;
		}
    },
});


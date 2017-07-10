
cc.Class({
    extends: cc.Component,

    properties: {
		_tmpGoods: null,
    },

    onLoad: function () {
		var exc = this.node.getChildByName('exchange');
		exc.active = false;

		var btnExc = cc.find('bottom/buttons/btnExchange', this.node);
		cc.vv.utils.addClickEvent(btnExc, this.node, 'Exchange', 'onBtnExcClicked');

		var btnClose = cc.find('body/btnClose', exc);
		cc.vv.utils.addClickEvent(btnClose, this.node, 'Exchange', 'onBtnCloseClicked');

		var content = cc.find('body/list/view/content', exc);
		var tmp = content.children[0];

		cc.vv.utils.addClickEvent(tmp, this.node, 'Exchange', 'onBtnBuyClicked');

		this._tmpGoods = tmp;
		content.removeChild(tmp, false);
    },

	onBtnCloseClicked: function(event) {
		var exc = this.node.getChildByName('exchange');

		cc.vv.audioMgr.playButtonClicked();
	    cc.vv.utils.showDialog(exc, 'body', false);
    },

	onBtnBuyClicked: function(event) {
		
    },

	getExcItem: function(index) {
        var content = cc.find('body/list/view/content', exc);

        if (content.childrenCount > index) {
            return content.children[index];
        }

        var node = cc.instantiate(this._tmpGoods);

        content.addChild(node);
        return node;
    },

	onBtnExcClicked: function(event) {
		var self = this;
		var exc = this.node.getChildByName('exchange');

		cc.vv.audioMgr.playButtonClicked();
		cc.vv.utils.showDialog(exc, 'body', true); 

		var content = cc.find('body/list/view/content', exc);

		cc.vv.userMgr.getGameExchange(function(data) {
			if (!data) {
				return;
			}

			for (var i = 0; i < data.length; i++) {
				var item = this.getExcItem(i);
				var title = item.getChildByName('title').getComponent(cc.Label);
				var price = item.getChildByName('price').getComponent(cc.Label);
				var img = item.getChildByName('img').getComponent('SpriteMgr');
				var button = item.getChildByName('entry');
				var info = data[i];

				title.string = info.title;
				price.string = info.price;
				img.setIndex(info.imgid);

				item.exchangeInfo = info;
			}

			this.shrinkContent(content, data.length);
		});
    },

	shrinkContent: function(content, num) {
        while (content.childrenCount > num) {
            var lastOne = content.children[content.childrenCount -1];
            content.removeChild(lastOne, true);
        }
    },
});


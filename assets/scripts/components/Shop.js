
cc.Class({
    extends: cc.Component,

    properties: {
		_payChannel: 0,
    },

    onLoad: function () {
		var shop = this.node.getChildByName('shop');
		shop.active = false;
	
		var btnMall = cc.find('bottom/buttons/btnMall', this.node);
		cc.vv.utils.addClickEvent(btnMall, this.node, 'Shop', 'onBtnShopClicked');

		var btnAdd = cc.find('top_left/coins/diamond/btnAdd', this.node);
		cc.vv.utils.addClickEvent(btnAdd, this.node, 'Shop', 'onBtnShopClicked');

		var btnClose = cc.find('body/btnClose', shop);
		cc.vv.utils.addClickEvent(btnClose, this.node, 'Shop', 'onBtnCloseClicked');

		var goods = cc.find('body/goods', shop);
		for (var i = 0; i < goods.childrenCount; i++) {
			var good = goods.children[i];
			var btnBuy = good.getChildByName('btnBuy');
			cc.vv.utils.addClickEvent(btnBuy, this.node, 'Shop', 'onBtnGoodsClicked');
		}

		var btnPay = cc.find('body/pay', shop);
		cc.vv.utils.addClickEvent(btnPay, this.node, 'Shop', 'onBtnPaySelClicked');

		this.selectPayChannel(0);

		var popup = cc.find('body/popup', shop);
		var pays = popup.getChildByName('pays');

		for (var i = 0; i < pays.childrenCount; i++) {
			var pay = pays.children[i];

			cc.vv.utils.addClickEvent(pay, this.node, 'Shop', 'onBtnPayClicked');
		}
    },

	selectPayChannel: function(channel) {
		var shop = this.node.getChildByName('shop');
		var img = cc.find('body/pay/img', shop).getComponent('SpriteMgr');

		img.setIndex(channel);
		this._payChannel = channel;
    },

	onBtnPaySelClicked: function(event) {
		var shop = this.node.getChildByName('shop');
		var popup = cc.find('body/popup', shop);

		popup.active = !popup.active;
    },

	onBtnPayClicked: function(event) {
		var shop = this.node.getChildByName('shop');
		var popup = cc.find('body/popup', shop);

		var name = event.target.name;
		var pays = [ 'appstore', 'wechat', 'zhifubao' ];

		var index = pays.indexOf(name);

		if (index >= 0) {
			this.selectPayChannel(index);
		}

		popup.active = false;
    },

	onBtnGoodsClicked: function(event) {
		console.log('onBtnGoodsClicked');

		var info = event.target.goodsInfo;

		
    },

	onBtnShopClicked: function(event) {
		var self = this;
		var shop = this.node.getChildByName('shop');

		cc.vv.audioMgr.playButtonClicked();
		cc.vv.utils.showFrame(shop, 'head', 'body', true); 

		var goods = cc.find('body/goods', shop);
		for (var i = 0; i < goods.childrenCount; i++) {
				var good = goods.children[i];

				good.active = false;
		}

		cc.vv.userMgr.getGameGoods(function(data) {
			if (!data) {
				return;
			}

			var index = 0;
			for (var i = 0; i < data.length && i < goods.childrenCount; i++) {
				var good = goods.children[i];
				var info = data[i];
				var price = cc.find('btnBuy/lblPrice', good).getComponent(cc.Label);
				var number = cc.find('lblNum', good).getComponent(cc.Label);

				good.active = true;

				price.string = info.goods_price;
				number.string = info.goods_num;

				good.goodsInfo = info;

				index++;
			}

			for (var i = index; i < goods.childrenCount; i++) {
				var good = goods.children[i];

				good.active = false;
			}
		});
    },

	onBtnCloseClicked: function(event) {
		var shop = this.node.getChildByName('shop');

		cc.vv.audioMgr.playButtonClicked();
	    cc.vv.utils.showFrame(shop, 'head', 'body', false); 
    },
});


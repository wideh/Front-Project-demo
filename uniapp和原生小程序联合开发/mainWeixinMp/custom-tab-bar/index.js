Component({
	data: {
		selected: 0,
		"color": "#7C7C7C",
		"selectedColor": "#34A853",
		"backgroundColor": "#FFFFFF",
		"list": [{
				"pagePath": "/pages/index/index",
				"iconPath": "static/icon-home.png",
				"selectedIconPath": "static/icon-home-active.png",
				"text": "首页",
				"code": ""
			},
			// {
			// 	"pagePath": "/pages/door/opendoor",
			// 	"iconPath": "static/icon-door.png",
			// 	"selectedIconPath": "static/icon-door.png",
			// 	"text": "一键开门",
			// 	"code": "hzero.miniprogram.intelligentaccesscontrol.dooropening.ps.default"
			// },
			{
				"pagePath": "/pages/nova-mall/entry",
				"iconPath": "static/sale-service.png",
				"selectedIconPath": "static/sale-service.png",
				"text": "商城",
				"code": "hzero.miniprogram.communityeonlineretailers.mallentrance.ps.default"
			},
			{
				"pagePath": "/pages/me/me",
				"iconPath": "static/icon-me.png",
				"selectedIconPath": "static/icon-me-active.png",
				"text": "我的",
				"code": ""
			}
		],
		defaultList: [{
				"pagePath": "/pages/index/index",
				"iconPath": "static/icon-home.png",
				"selectedIconPath": "static/icon-home-active.png",
				"text": "首页",
				"code": ""
			},
			// {
			// 	"pagePath": "/pages/door/opendoor",
			// 	"iconPath": "static/icon-door.png",
			// 	"selectedIconPath": "static/icon-door.png",
			// 	"text": "一键开门",
			// 	"code": "hzero.miniprogram.intelligentaccesscontrol.dooropening.ps.default"
			// },
			{
				"pagePath": "/pages/nova-mall/entry",
				"iconPath": "static/sale-service.png",
				"selectedIconPath": "static/sale-service.png",
				"text": "商城",
				"code": "hzero.miniprogram.communityeonlineretailers.mallentrance.ps.default"
			},
			{
				"pagePath": "/pages/me/me",
				"iconPath": "static/icon-me.png",
				"selectedIconPath": "static/icon-me-active.png",
				"text": "我的",
				"code": ""
			}
		]
	},
	lifetimes: {
		attached: async function() {
			let me = this;
			setTimeout(function() {
				me.updatePermissionData();
			}, 2000)
		},
	},
	ready: async function() {
		// 页面被展示
		let me = this;
		setTimeout(function() {
			me.updatePermissionData();
		}, 1000)
	},
	methods: {
		updatePermissionData() {
			let me = this;
			let permissionDatas = wx.getStorageSync('permissionDatasId');
			permissionDatas = permissionDatas === '' ? [] : permissionDatas;
			let data = me.data.defaultList;
			const newGridList = data.filter((r) => r.code == '' || permissionDatas.some((p) => p
				.code === r.code && p.approve === true));
			me.setData({
				list: newGridList,
			});
		},
		switchTab(e) {
			const data = e.currentTarget.dataset
			const url = data.path
			// 页面被展示
			wx.switchTab({
				url,
				fail: function(e) {
					var page = getCurrentPages().pop();
					if (page == undefined || page == null) return;
					page.onLoad();
				}
			});
		}
	}
})
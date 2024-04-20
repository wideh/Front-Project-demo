(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["packageWM/sale-activity/sale-activity-order"],{"18c8":function(t,e,o){"use strict";(function(t,e){var n=o("4ea4");o("895d");n(o("66fd"));var i=n(o("7b62"));t.__webpack_require_UNI_MP_PLUGIN__=o,e(i.default)}).call(this,o("bc2e")["default"],o("543d")["createPage"])},4062:function(t,e,o){"use strict";(function(t,n){var i=o("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=i(o("2eee")),c=i(o("c973")),a={data:function(){return{customerName:"",customerPhone:"",totalCount:"",goodsList:[],activityId:"",skip:0,take:9999,orderList:[],nickNames:"",Bookings:[],remarks:"",footerData:null,showPrivacy:!1}},components:{orderDetailList:function(){o.e("packageWM/components/order-detail/order-detail-list").then(function(){return resolve(o("1471"))}.bind(null,o)).catch(o.oe)},customFooter:function(){o.e("components/custom-footer/custom-footer").then(function(){return resolve(o("7d39"))}.bind(null,o)).catch(o.oe)},userPrivacy:function(){o.e("components/userPrivacy/userPrivacy").then(function(){return resolve(o("594f"))}.bind(null,o)).catch(o.oe)}},onShow:function(){this.customerName=t.getStorageSync("customerName"),this.customerPhone=t.getStorageSync("phoneNumber"),this.getGoodsInfo(),this.customerName&&this.customerPhone||this.getCustomerInfo(),this.getFooterData()},onLoad:function(e){var o=this;this.totalCount=e.totalAmount,this.goodsList=JSON.parse(e.bookings),this.Bookings=this.goodsList,this.activityId=e.activityId,this.nickNames=t.getStorageSync("nickNames")?t.getStorageSync("nickNames"):"";var i=[];this.goodsList.forEach((function(t){t.quantity&&i.push(t)})),this.goodsList=i,console.log("goodsList"),console.log(this.goodsList),n.onNeedPrivacyAuthorization&&n.onNeedPrivacyAuthorization((function(t,e){o.showPrivacy=!0,o.resolvePrivacyAuthorization=t}))},methods:{agreePrivacy:function(){this.showPrivacy=!1,this.resolvePrivacyAuthorization({buttonId:"agree-btn",event:"agree"})},disagreePrivacy:function(){this.showPrivacy=!1},getFooterData:function(){var t=this;return(0,c.default)(s.default.mark((function e(){var o;return s.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$footerConfig.get();case 2:o=e.sent,t.footerData=o;case 4:case"end":return e.stop()}}),e)})))()},getCustomerInfo:function(){var e=this;this.$http.get("/api/v2.0/WeChat/Bookings/UserInfo").then((function(o){e.customerName=o.customerName,e.customerPhone=o.customerPhone,t.setStorageSync("customerName",o.customerName),t.setStorageSync("customerPhone",o.customerPhone)})).catch((function(t){console.log(t)}))},changeName:function(t){this.customerName=t.detail.value},getGoodsInfo:function(){var t=this;this.$http.get("/api/v2.0/WeChat/Campaigns/".concat(this.activityId,"/Dishes?skip=").concat(this.skip,"&take=").concat(this.take)).then((function(e){console.log("这是商品信息"),console.log(e.data),e.data.dishes.forEach((function(e){t.goodsList.forEach((function(o){o.campaignDishesId==e.cmpaignDishesId&&(e.reservedQuantity=o.quantity,e.dishesFilePath=e.filePath,e.dishesName=e.dishesInfo,e.allocatedQuantity=0,t.orderList.push(e))}))})),console.log("orderList"),console.log(t.orderList)})).catch((function(t){console.log(t)}))},changePhone:function(t){this.customerPhone=t.detail.value},changeRemarks:function(t){this.remarks=t.detail.value},getuserinfo:function(e){"getUserInfo:ok"==e.detail.errMsg&&(this.nickNames=e.detail.userInfo.nickName,t.setStorageSync("nickNames",this.nickNames))},submit:function(){var e=this;this.nickNames?this.orderInfo():t.login({provider:"weixin",success:function(o){t.getUserInfo({provider:"weixin",success:function(o){e.nickNames=o.userInfo.nickName,e.$http.get("/api/v2.0/wechat/authorized-users/me/nickName?nickName="+e.nickNames).then((function(o){e.orderInfo(),t.setStorageSync("nickNames",e.nickNames)})).catch((function(t){console.log(t)}))}})}})},orderInfo:function(){var e=this,o=this.customerPhone,n=this.Bookings,i=this.customerName,s=this.remarks;i&&o?t.showModal({content:"确认要提交您的订单吗?",success:function(c){c.confirm&&e.$http.post("/api/v2.0/WeChat/Bookings",{bookings:n,phoneNum:o,subscriber:i,remark:s}).then((function(e){t.showModal({content:"下单成功",success:function(){t.switchTab({url:"/pages/index/index"})}})})).catch((function(e){t.showModal({title:"提示",content:"".concat(e.message),success:function(t){}})}))}}):t.showModal({content:"请填写姓名和电话"})}}};e.default=a}).call(this,o("543d")["default"],o("bc2e")["default"])},"4a12":function(t,e,o){},"5d3c":function(t,e,o){"use strict";o.d(e,"b",(function(){return i})),o.d(e,"c",(function(){return s})),o.d(e,"a",(function(){return n}));var n={userPrivacy:function(){return o.e("components/userPrivacy/userPrivacy").then(o.bind(null,"594f"))}},i=function(){var t=this.$createElement,e=(this._self._c,new Number(this.totalCount).toFixed(2));this.$mp.data=Object.assign({},{$root:{g0:e}})},s=[]},"7b62":function(t,e,o){"use strict";o.r(e);var n=o("5d3c"),i=o("7e0b");for(var s in i)["default"].indexOf(s)<0&&function(t){o.d(e,t,(function(){return i[t]}))}(s);o("965a");var c=o("f0c5"),a=Object(c["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);e["default"]=a.exports},"7e0b":function(t,e,o){"use strict";o.r(e);var n=o("4062"),i=o.n(n);for(var s in n)["default"].indexOf(s)<0&&function(t){o.d(e,t,(function(){return n[t]}))}(s);e["default"]=i.a},"965a":function(t,e,o){"use strict";var n=o("4a12"),i=o.n(n);i.a}},[["18c8","common/runtime","common/vendor"]]]);
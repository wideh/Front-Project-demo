(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/activity/item/item"],{"0b53":function(t,e,n){"use strict";n.r(e);var o=n("208f"),i=n.n(o);for(var r in o)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=i.a},1278:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return o}));var o={mpHtml:function(){return Promise.all([n.e("common/vendor"),n.e("components/mp-html/mp-html")]).then(n.bind(null,"6551"))},uPopup:function(){return n.e("components/u-popup/u-popup").then(n.bind(null,"f766"))},userPrivacy:function(){return n.e("components/userPrivacy/userPrivacy").then(n.bind(null,"594f"))}},i=function(){var t=this.$createElement;this._self._c},r=[]},"208f":function(t,e,n){"use strict";(function(t,o){var i=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=i(n("2eee")),a=i(n("9523")),c=i(n("c973")),s=i(n("7504"));function u(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function d(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?u(Object(n),!0).forEach((function(e){(0,a.default)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var l={components:{customFooter:function(){n.e("components/custom-footer/custom-footer").then(function(){return resolve(n("7d39"))}.bind(null,n)).catch(n.oe)},mpHtml:function(){Promise.all([n.e("common/vendor"),n.e("components/mp-html/mp-html")]).then(function(){return resolve(n("6551"))}.bind(null,n)).catch(n.oe)},UPopup:function(){n.e("components/u-popup/u-popup").then(function(){return resolve(n("f766"))}.bind(null,n)).catch(n.oe)},userPrivacy:function(){n.e("components/userPrivacy/userPrivacy").then(function(){return resolve(n("594f"))}.bind(null,n)).catch(n.oe)}},computed:{displayButtonText:function(){if(this.activity){if(this.activity.haveIJoined)return"已报名";if(2===this.activity.status)return"未开始";if(4===this.activity.status)return"已过期"}return"去参与"},couldBeJoin:function(){return!!this.activity&&(!this.activity.haveIJoined&&(2!==this.activity.status&&4!==this.activity.status))},displayApplyDate:function(){var t=this.activity.registrationStartTime,e=this.activity.registrationEndTime;return t&&e?this.$tool.date.format(t,"yyyy-MM-dd")+" 至 "+this.$tool.date.format(e,"yyyy-MM-dd"):t&&!e?this.$tool.date.format(t,"yyyy-MM-dd"):!t&&e?this.$tool.date.format(e,"yyyy-MM-dd"):""}},data:function(){return{id:0,community:{},activity:{},outTradeNo:null,jsPayParameter:"",isGetPhoneNumber:!1,footerData:null,html:"<div>Hello World!</div>",customerId:null,value:!1,maskCloseAble:!0,remark:"",userId:null,showPrivacy:!1}},onLoad:function(e){var n=this;e&&e.id&&(this.id=e.id),t.onNeedPrivacyAuthorization&&t.onNeedPrivacyAuthorization((function(t,e){n.showPrivacy=!0,n.resolvePrivacyAuthorization=t})),this.community=o.getStorageSync(this.$config.storageKeys.community),this.$httpCommon.get("/wy/api/v2.0/weChat/user-resources/me").then((function(t){if(t&&t.success){var e=t.result;e&&e.length>0&&(n.customerId=e[0].customerId)}}))},onShow:function(){o.hideLoading(),this.getUserPhone(),this.init(),this.getFooterData(),this.getUserId()},methods:{agreePrivacy:function(){this.showPrivacy=!1,this.resolvePrivacyAuthorization({buttonId:"agree-btn",event:"agree"})},disagreePrivacy:function(){this.showPrivacy=!1},getFooterData:function(){var t=this;return(0,c.default)(r.default.mark((function e(){var n;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$footerConfig.get();case 2:n=e.sent,t.footerData=n;case 4:case"end":return e.stop()}}),e)})))()},getUserId:function(){var t=this;t.$httpCommon.post("".concat(s.default.apiBaseUrl,"/nova-customer-service/v1/").concat(t.$config.tenantId,"/customer/activity/currentUser")).then((function(e){e&&e.success&&(t.userId=e.result)}))},init:function(){if(this.id){var t=this;t.$httpCommon.get("/nova-customer-service/v1/".concat(t.$config.tenantId,"/customer/activity/detail/").concat(t.id)).then((function(e){if(e&&e.success){var n=e.result,o=d(d({},n),{},{coverImage:n.imgUrl,registrationEndTime:n.registerEndTime,registrationStartTime:n.registerStartTime,joinTotal:n.registerNum,haveIJoined:n.isRegister,address:n.activityLocation,introInfo:n.introduction,registrationFee:n.price});console.log("newData",o),t.activity=o}})).catch((function(t){console.log(t)}))}},popupClose:function(){this.value=!1},getOrder:function(){var t=this;return new Promise((function(e,n){t.$http.post("/api/v2.0/wechat/group-campaign-orders",{id:t.activity.id,regionId:t.community.id,paidType:11}).then((function(n){t.outTradeNo=n.outTradeNo,t.jsPayParameter=JSON.parse(n.jsPayParameter),e()})).catch((function(t){n(),o.hideLoading(),o.showModal({title:"提示",content:t.message})}))}))},wxPay:function(t){return new Promise((function(e,n){o.requestPayment({provider:"wxpay",timeStamp:t.timeStamp,nonceStr:t.nonceStr,package:t.package,signType:t.signType,paySign:t.paySign,success:function(t){console.log("支付成功回调",t),e()},fail:function(t){console.log("支付失败回调",t),n(),o.hideLoading(),o.showModal({title:"提示",content:t.message})}})}))},signUp:function(){var t=this;t.$httpCommon.post("/nova-customer-service/v1/".concat(t.$config.tenantId,"/customer/activity/register"),{activityId:this.activity.id,customerId:this.customerId,price:this.activity.price?this.activity.price:void 0,remark:this.remark?this.remark:void 0}).then((function(e){t.activity.haveIJoined=!0,o.hideLoading(),t.value=!1,o.navigateTo({url:"../success/success"})})).catch((function(t){console.log(t),o.showToast({icon:"none",title:t.message,duration:1500})}))},confirm:function(){return new Promise((function(t,e){o.showModal({title:"提示",content:"确定参加该活动吗？",success:function(e){e.confirm?t(!0):t(!1)}})}))},apply:function(){var t=this;return(0,c.default)(r.default.mark((function e(){var n;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n=t,n.activity&&n.activity.id&&(n.value=!0);case 2:case"end":return e.stop()}}),e)})))()},noFreeClicked:function(){var t=this;return(0,c.default)(r.default.mark((function e(){var n,i,a,c;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n=t,o.showLoading({mask:!0,title:"报名中..."}),n.activity.registrationFee>0?(i=o.getStorageSync(t.$config.storageKeys.user),a=JSON.stringify({userId:n.userId?n.userId:void 0,customerId:i.customerId?i.customerId:void 0,remark:t.remark}),console.log("attachStr",a),c={tenantId:s.default.tenantId,channelCode:"WECHAT_MP",orderDescribe:"活动缴费",goodsTotalFee:100*n.activity.registrationFee,sourceBiz:"NOVA_CUSTOMER_SER",bizNotifyUrl:"".concat(s.default.apiBaseUrl,"/nova-customer-service/v1/").concat(s.default.tenantId,"/customer/activity/").concat(n.activity.id,"/pay/callBack"),goodsList:[{goodsName:n.activity.title,goodsCode:n.activity.id,goodsFee:100*n.activity.registrationFee,goodsCount:1}],attach:a},console.log("params",c),n.$httpCommon.post(s.default.apiBaseUrl+"/npay/v1/unifiedOrder",c,{method:"POST"}).then((function(e){if(console.log("res: ",e),e)if(1==e.failed)o.showToast({title:"发起支付失败",icon:"none"});else{var n=e.params;o.requestPayment({provider:"wxpay",timeStamp:n.timeStamp,signType:n.signType,package:n.package,paySign:n.paySign,nonceStr:n.nonceStr,success:function(e){t.popupClose(),t.remark="",o.navigateTo({url:"../success/success"})},fail:function(t){var e=t.errMsg;if(e&&e.includes("cancel"))return o.showToast({title:"支付取消",icon:"none"})}})}})).catch((function(){return o.hideLoading()}))):n.signUp();case 3:case"end":return e.stop()}}),e)})))()},getImageHttpUrl:function(t){return t?this.$tool.image.getHttpUrl(t):""},onGetphonenumber:function(t){if(console.log("获取手机号",t),t.detail.encryptedData){var e=this;o.showLoading({title:"获取中"}),e.$httpHd.get("/oauth/choerodon/v1/mp/user/wechat",{iv:t.detail.iv,encryptedData:t.detail.encryptedData,openId:o.getStorageSync(this.$config.storageKeys.openId)}).then(function(){var t=(0,c.default)(r.default.mark((function t(n){var i;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$token.reLogin();case 2:i=t.sent,i&&e.$http.post("/api/v2.0/wechat-mini-program-oauth/decryptphonenumber",{phoneNumber:n.phoneNumber,purePhoneNumber:n.purePhoneNumber,countryCode:n.countryCode}).then((function(t){o.hideLoading(),e.addUserPhone(t.phoneNumber)})).catch((function(t){console.log(t),o.showToast({title:t.message,icon:"none"})}));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){console.log(t)}))}},addUserPhone:function(t){var e=this;this.$http.request("/api/v2.0/weChat/application-users/me",{phoneNumber:t,sex:"男",verificationCode:"111111"},{method:"PUT"}).then((function(t){e.$datas.user.syncData().then((function(t){o.hideLoading(),e.getUserPhone(),e.apply()})).catch((function(t){console.log(t),o.hideLoading(),o.showToast({icon:"none",title:"绑定失败"})}))})).catch((function(t){console.log(t),o.hideLoading(),o.showToast({icon:"none",title:"绑定失败"})}))},getUserPhone:function(){var t=o.getStorageSync(this.$config.storageKeys.user);t&&t.phoneNumber&&""!==t.phoneNumber&&(this.isGetPhoneNumber=!0)},navigate:function(t){t&&t.href&&o.redirectTo({url:"/pages/activity/detail-webview/detail-webview?src=".concat(t.href)})}}};e.default=l}).call(this,n("bc2e")["default"],n("543d")["default"])},8553:function(t,e,n){"use strict";(function(t,e){var o=n("4ea4");n("895d");o(n("66fd"));var i=o(n("feca"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(i.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},a5cf:function(t,e,n){"use strict";var o=n("aa33"),i=n.n(o);i.a},aa33:function(t,e,n){},feca:function(t,e,n){"use strict";n.r(e);var o=n("1278"),i=n("0b53");for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("a5cf");var a=n("f0c5"),c=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);e["default"]=c.exports}},[["8553","common/runtime","common/vendor"]]]);
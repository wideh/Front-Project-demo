(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/position/room/room"],{"010b":function(e,t,n){"use strict";n.r(t);var o=n("627d"),r=n("d87b");for(var i in r)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(i);n("055e");var a=n("f0c5"),c=Object(a["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);t["default"]=c.exports},"0384":function(e,t,n){},"055e":function(e,t,n){"use strict";var o=n("0384"),r=n.n(o);r.a},"0e80":function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return o}));var o={sudaLoading:function(){return n.e("components/suda-loading/suda-loading").then(n.bind(null,"09dd"))},sudaRoomCard:function(){return n.e("components/suda-room-card/suda-room-card").then(n.bind(null,"fab6"))},pageEmpty:function(){return n.e("components/page-empty/page-empty").then(n.bind(null,"1068"))},userPrivacy:function(){return n.e("components/userPrivacy/userPrivacy").then(n.bind(null,"594f"))}},r=function(){var e=this,t=e.$createElement,n=(e._self._c,e.list&&e.list.length>0),o=n?e.__map(e.list,(function(t,n){var o=e.__get_orig(t),r=e.displayAddress(t);return{$orig:o,m0:r}})):null,r=e.list&&e.list.length>0;e.$mp.data=Object.assign({},{$root:{g0:n,l0:o,g1:r}})},i=[]},"10fa":function(e,t,n){},"17c7":function(e,t,n){"use strict";var o=n("10fa"),r=n.n(o);r.a},"2da0":function(e,t,n){"use strict";(function(e,o){var r=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=r(n("2eee")),a=r(n("c973")),c=r(n("010b")),u={components:{pageEmpty:function(){n.e("components/page-empty/page-empty").then(function(){return resolve(n("1068"))}.bind(null,n)).catch(n.oe)},sudaLoading:function(){n.e("components/suda-loading/suda-loading").then(function(){return resolve(n("09dd"))}.bind(null,n)).catch(n.oe)},roomUseAgreement:c.default,customFooter:function(){n.e("components/custom-footer/custom-footer").then(function(){return resolve(n("7d39"))}.bind(null,n)).catch(n.oe)},userPrivacy:function(){n.e("components/userPrivacy/userPrivacy").then(function(){return resolve(n("594f"))}.bind(null,n)).catch(n.oe)}},data:function(){return{key:this.$config.positionKeys.room,returnUrl:"",targetKey:"",list:[],isLoading:!1,isPromptShow:!0,footerData:null,showPrivacy:!1}},computed:{selectedAll:function(){return this.list.every((function(e){return e.selected}))}},onLoad:function(){var t=this;e.onNeedPrivacyAuthorization&&e.onNeedPrivacyAuthorization((function(e,n){console.log("被动触发本次事件的接口是："+n.referrer),t.showPrivacy=!0,t.resolvePrivacyAuthorization=e}))},onShow:function(){this.getFooterData()},methods:{agreePrivacy:function(){this.showPrivacy=!1,this.resolvePrivacyAuthorization({buttonId:"agree-btn",event:"agree"})},disagreePrivacy:function(){this.showPrivacy=!1},getFooterData:function(){var e=this;return(0,a.default)(i.default.mark((function t(){var n;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$footerConfig.get();case 2:n=t.sent,e.footerData=n;case 4:case"end":return t.stop()}}),t)})))()},addRoom:function(){if(0==this.list.length)return o.showToast({title:"当前手机号无可绑定房间",icon:"none"});var e=this.list.filter((function(e){return e.selected}));if(0==e.length)return o.showToast({title:"请至少选择一个房间",icon:"none"});o.showLoading({title:"获取中"});var t=this;this.$http.post("/api/v2.0/weChat/user-resources/bind",JSON.stringify(e),{headers:{"Content-Type":"application/json"}}).then((function(e){o.navigateBack({delta:1}),t.$http.get("/api/v2.0/wechat/authorized-users/me").then((function(e){o.setStorageSync(t.$config.storageKeys.user,e)})).catch((function(e){o.hideLoading(),console.log(e)})),setTimeout((function(){o.showToast({title:"添加成功",icon:"none"})}))})).catch((function(e){console.log(e),o.showToast({title:"err: "+e.message,icon:"none"})}))},operation:function(e,t){this.list[t].selected=!this.list[t].selected},displayAddress:function(e){return(e.regionName?e.regionName:"")+(e.groupName?"/"+e.groupName:"")+(e.buildingName?"/"+e.buildingName:"")+(e.unitName?"/"+e.unitName:"")+(e.resourceCode?"/"+e.resourceCode:"")},cancelSelectAll:function(){this.list=this.list.map((function(e){return e.selected=!1,e}))},handleSelectAll:function(){this.list=this.list.map((function(e){return e.selected=!0,e}))},agreePrompt:function(e){var t=this;this.isPromptShow=!1;var n=e&&e.phoneNumber;this.$http.get("/api/v2.0/weChat/user-resources/unbind?phoneNumber="+n).then((function(e){t.isLoading=!1,t.list=e.map((function(e){return e.selected=!0,e}))})).catch((function(e){console.log(e),t.isLoading=!1}))},getUnbindRooms:function(e){var t=this,n=e&&e.phoneNumber;this.$http.get("/api/v2.0/weChat/user-resources/unbind?phoneNumber="+n).then((function(e){t.isLoading=!1,t.list=e.map((function(e){return e.selected=!0,e}))})).catch((function(e){console.log(e),t.isLoading=!1}))},onGetphonenumber:function(e){var t=this;console.log("获取手机号",e),e.detail.encryptedData&&(o.showLoading({title:"获取中"}),this.$httpHd.get("/oauth/choerodon/v1/mp/user/wechat",{iv:e.detail.iv,encryptedData:e.detail.encryptedData,openId:o.getStorageSync(this.$config.storageKeys.openId)}).then(function(){var e=(0,a.default)(i.default.mark((function e(n){var r;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$token.reLogin();case 2:r=e.sent,r&&t.$http.post("/api/v2.0/wechat-mini-program-oauth/decryptphonenumber",{phoneNumber:n.phoneNumber,purePhoneNumber:n.purePhoneNumber,countryCode:n.countryCode}).then((function(e){o.hideLoading(),t.agreePrompt(e)})).catch((function(e){console.log(e),o.showToast({title:"err: "+e.message,icon:"none"})}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){console.log(e)})))}}};t.default=u}).call(this,n("bc2e")["default"],n("543d")["default"])},"627d":function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return o}));var o={userPrivacy:function(){return n.e("components/userPrivacy/userPrivacy").then(n.bind(null,"594f"))}},r=function(){var e=this.$createElement;this._self._c},i=[]},"6a97":function(e,t,n){"use strict";(function(e,o){var r=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=r(n("2eee")),a=r(n("c973")),c={components:{userPrivacy:function(){n.e("components/userPrivacy/userPrivacy").then(function(){return resolve(n("594f"))}.bind(null,n)).catch(n.oe)}},props:{isPromptShow:{type:Boolean,default:!0},isGetPhoneNumber:{type:Boolean,default:!1}},data:function(){return{phoneNumber:null,showPrivacy:!1}},created:function(){var t=this,n=e.getStorageSync(this.$config.storageKeys.user);this.phoneNumber=n.phoneNumber;o.onNeedPrivacyAuthorization&&o.onNeedPrivacyAuthorization((function(e,n){t.showPrivacy=!0,t.resolvePrivacyAuthorization=e}))},methods:{agreePrivacy:function(){this.showPrivacy=!1,this.resolvePrivacyAuthorization({buttonId:"agree-btn",event:"agree"})},disagreePrivacy:function(){this.showPrivacy=!1},handleAgreePrivacyAuthorization:function(){this.showPrivacy=!1},handleOpenPrivacyContract:function(){o.openPrivacyContract({success:function(){console.log("隐私协议打开成功")},fail:function(){console.log("隐私协议打开失败")},complete:function(){}})},agreePrompt:function(){var e={};this.phoneNumber&&(e.phoneNumber=this.phoneNumber),this.$emit("agreePrompt",e)},disagreePrompt:function(){e.navigateBack()},viewPrompt:function(){e.navigateTo({url:"/pages/me/room/room-prompt/room-prompt"})},onGetphonenumber:function(t){var n=this;if(console.log("获取手机号",t),t.detail.encryptedData){var o=this;e.showLoading({title:"获取中"}),o.$httpHd.get("/oauth/choerodon/v1/mp/user/wechat",{iv:t.detail.iv,encryptedData:t.detail.encryptedData,openId:e.getStorageSync(this.$config.storageKeys.openId)}).then(function(){var t=(0,a.default)(i.default.mark((function t(r){var a;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,o.$token.reLogin();case 2:a=t.sent,a&&o.$http.post("/api/v2.0/wechat-mini-program-oauth/decryptphonenumber",{phoneNumber:r.phoneNumber,purePhoneNumber:r.purePhoneNumber,countryCode:r.countryCode}).then((function(t){e.hideLoading(),n.$emit("agreePrompt",t)})).catch((function(t){console.log(t),e.showToast({title:t.message,icon:"none"})}));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(e){console.log(e)}))}}}};t.default=c}).call(this,n("543d")["default"],n("bc2e")["default"])},"76c2":function(e,t,n){"use strict";(function(e,t){var o=n("4ea4");n("895d");o(n("66fd"));var r=o(n("b54f"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(r.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},b54f:function(e,t,n){"use strict";n.r(t);var o=n("0e80"),r=n("fa66");for(var i in r)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(i);n("17c7");var a=n("f0c5"),c=Object(a["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);t["default"]=c.exports},d87b:function(e,t,n){"use strict";n.r(t);var o=n("6a97"),r=n.n(o);for(var i in o)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=r.a},fa66:function(e,t,n){"use strict";n.r(t);var o=n("2da0"),r=n.n(o);for(var i in o)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=r.a}},[["76c2","common/runtime","common/vendor"]]]);
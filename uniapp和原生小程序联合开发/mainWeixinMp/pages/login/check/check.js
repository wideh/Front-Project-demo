(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/check/check"],{"2a3e":function(e,n,t){},"8e88":function(e,n,t){"use strict";var o=t("2a3e"),i=t.n(o);i.a},a129:function(e,n,t){"use strict";t.r(n);var o=t("b2c3"),i=t("f2cb");for(var r in i)["default"].indexOf(r)<0&&function(e){t.d(n,e,(function(){return i[e]}))}(r);t("8e88");var a=t("f0c5"),c=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);n["default"]=c.exports},b2c3:function(e,n,t){"use strict";t.d(n,"b",(function(){return i})),t.d(n,"c",(function(){return r})),t.d(n,"a",(function(){return o}));var o={uniIcons:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(t.bind(null,"cff5"))},userPrivacy:function(){return t.e("components/userPrivacy/userPrivacy").then(t.bind(null,"594f"))}},i=function(){var e=this.$createElement;this._self._c},r=[]},ccee:function(e,n,t){"use strict";(function(e,o){var i=t("4ea4");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=i(t("2eee")),a=i(t("c973")),c=i(t("0b6f")),u=(i(t("cb1a")),{components:{uniIcons:function(){Promise.all([t.e("common/vendor"),t.e("node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons")]).then(function(){return resolve(t("1533"))}.bind(null,t)).catch(t.oe)},customFooter:function(){t.e("components/custom-footer/custom-footer").then(function(){return resolve(t("7d39"))}.bind(null,t)).catch(t.oe)},userPrivacy:function(){t.e("components/userPrivacy/userPrivacy").then(function(){return resolve(t("594f"))}.bind(null,t)).catch(t.oe)}},data:function(){return{user:{},sexSeq:0,birthday:null,telephone:null,sexArr:[{value:0,text:"女"},{value:1,text:"男"}],isGettingPhone:!1,isBinding:!1,footerData:null,showPrivacy:!1}},computed:{displaySex:function(){return this.sexArr[this.sexSeq].text},sexValue:function(){return this.sexArr[this.sexSeq].value}},onLoad:function(){var n=this;e.onNeedPrivacyAuthorization&&e.onNeedPrivacyAuthorization((function(e,t){n.showPrivacy=!0,n.resolvePrivacyAuthorization=e})),this.user=o.getStorageSync(this.$config.storageKeys.user)},onShow:function(){this.getFooterData()},methods:{agreePrivacy:function(){this.showPrivacy=!1,this.resolvePrivacyAuthorization({buttonId:"agree-btn",event:"agree"})},disagreePrivacy:function(){this.showPrivacy=!1},getFooterData:function(){var e=this;return(0,a.default)(r.default.mark((function n(){var t;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$footerConfig.get();case 2:t=n.sent,e.footerData=t;case 4:case"end":return n.stop()}}),n)})))()},back:function(){o.navigateBack({delta:1})},onGetphonenumber:function(e){if(console.log("获取手机号",e),e.detail.encryptedData){var n=this;n.isGettingPhone=!0,n.$httpHd.get("/oauth/choerodon/v1/mp/user/wechat",{encryptedData:e.detail.encryptedData,iv:e.detail.iv,openId:o.getStorageSync(this.$config.storageKeys.openId)}).then(function(){var e=(0,a.default)(r.default.mark((function e(t){var o;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log(t),e.next=3,c.default.reLogin();case 3:o=e.sent,o&&n.$http.post("/api/v2.0/wechat-mini-program-oauth/decryptphonenumber",{phoneNumber:t.phoneNumber,purePhoneNumber:t.purePhoneNumber,countryCode:t.countryCode}).then((function(e){n.$datas.user.syncData(),n.telephone=e.phoneNumber,n.isGettingPhone=!1})).catch((function(e){console.log(e),n.isGettingPhone=!1}));case 5:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()).catch((function(e){console.log(e)}))}},onSexChange:function(e){this.sexSeq=e.detail.value},onBirthdayChange:function(e){this.birthday=e.detail.value},error:function(e){o.hideLoading(),o.showToast({icon:"none",title:e})},onConfirmClick:function(){var e=this;if(o.showLoading({title:"信息绑定中",mask:!0}),this.telephone)if(null!=this.sexValue){this.$http.request("/api/v2.0/weChat/application-users/me",{phoneNumber:this.telephone,sex:this.sexValue,birthday:this.birthday,verificationCode:"111111"},{method:"PUT"}).then((function(n){e.$datas.user.syncData().then((function(e){o.hideLoading(),o.showToast({icon:"none",title:"绑定成功"}),setTimeout((function(){o.navigateBack({delta:1})}),1e3)})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))}else this.error("还没有选择性别");else this.error("还没有获取手机号")}}});n.default=u}).call(this,t("bc2e")["default"],t("543d")["default"])},ec2e:function(e,n,t){"use strict";(function(e,n){var o=t("4ea4");t("895d");o(t("66fd"));var i=o(t("a129"));e.__webpack_require_UNI_MP_PLUGIN__=t,n(i.default)}).call(this,t("bc2e")["default"],t("543d")["createPage"])},f2cb:function(e,n,t){"use strict";t.r(n);var o=t("ccee"),i=t.n(o);for(var r in o)["default"].indexOf(r)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(r);n["default"]=i.a}},[["ec2e","common/runtime","common/vendor"]]]);
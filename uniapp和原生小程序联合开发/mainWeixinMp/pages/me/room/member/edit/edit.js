(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/me/room/member/edit/edit"],{"3eda":function(e,t,o){},"4b27":function(e,t,o){"use strict";o.d(t,"b",(function(){return a})),o.d(t,"c",(function(){return i})),o.d(t,"a",(function(){return n}));var n={uniIcons:function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(o.bind(null,"cff5"))},userPrivacy:function(){return o.e("components/userPrivacy/userPrivacy").then(o.bind(null,"594f"))}},a=function(){var e=this.$createElement;this._self._c},i=[]},"7d8f":function(e,t,o){"use strict";(function(e,n){var a=o("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(o("2eee")),r=a(o("c973")),s={components:{uniIcons:function(){Promise.all([o.e("common/vendor"),o.e("node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons")]).then(function(){return resolve(o("1533"))}.bind(null,o)).catch(o.oe)},customFooter:function(){o.e("components/custom-footer/custom-footer").then(function(){return resolve(o("7d39"))}.bind(null,o)).catch(o.oe)},userPrivacy:function(){o.e("components/userPrivacy/userPrivacy").then(function(){return resolve(o("594f"))}.bind(null,o)).catch(o.oe)}},data:function(){return{resourceId:0,houseMemberId:0,houseCustomerId:0,members:[{relationTypeStr:"父母",id:1},{relationTypeStr:"夫妻",id:2},{relationTypeStr:"子女",id:3},{relationTypeStr:"亲戚",id:4},{relationTypeStr:"朋友",id:5},{relationTypeStr:"其他",id:7}],name:"",phone:"",index:null,value:"",photoImg:"https://pms-statics.oss-cn-shenzhen.aliyuncs.com/wechat-static/me/photo.png",isChangeImg:!1,errorText:"",footerData:null,showPrivacy:!1}},onLoad:function(t){var o=this;e.onNeedPrivacyAuthorization&&e.onNeedPrivacyAuthorization((function(e,t){o.showPrivacy=!0,o.resolvePrivacyAuthorization=e}));var a=this;a.resourceId=t.resourceId,a.houseCustomerId=t.houseCustomerId,a.houseMemberId=t.houseMemberId,a.type=t.type,"add"==a.type?n.setNavigationBarTitle({title:"新增成员"}):(n.setNavigationBarTitle({title:"编辑成员"}),a.init())},onShow:function(){this.getFooterData()},methods:{agreePrivacy:function(){this.showPrivacy=!1,this.resolvePrivacyAuthorization({buttonId:"agree-btn",event:"agree"})},disagreePrivacy:function(){this.showPrivacy=!1},getFooterData:function(){var e=this;return(0,r.default)(i.default.mark((function t(){var o;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$footerConfig.get();case 2:o=t.sent,e.footerData=o;case 4:case"end":return t.stop()}}),t)})))()},init:function(){var e=this;e.$http.get("/api/v2.0/wechat/house-members/".concat(e.houseMemberId)).then((function(t){e.name=t.name,e.phone=t.phone,e.index=e.members.findIndex((function(e){return e.id==t.relationType})),e.value=e.members.find((function(e){return e.id==t.relationType})).relationTypeStr,e.organizationItemId=t.organizationItemId,t.faceImageRelativePath&&(e.photoImg=e.$tool.image.getHttpUrl(t.faceImageRelativePath))})).catch((function(e){console.log(e)}))},validatePhone:function(){var e=1*this.phone;return!(e<1e10||e>19999999999)||(n.showToast({title:"手机号不符合要求",duration:2e3,icon:"none"}),!1)},validate:function(){return this.errorText="",this.name?this.value?!!this.validatePhone():(n.showToast({title:"请选择家庭角色",icon:"none"}),!1):(n.showToast({title:"请输入姓名",icon:"none"}),!1)},goNext:function(){var e=this,t=e.members[e.index].id;if(e.validate()){var o=n.getStorageSync(e.$config.storageKeys.token);if(n.showLoading({title:"保存中"}),"add"==e.type){var a={OrganizationItemId:e.resourceId,Name:e.name,Phone:e.phone,RelationType:t,HouseCustomerId:e.houseCustomerId};e.isChangeImg?n.uploadFile({url:e.$config.apiWYBaseUrl+"/api/v2.0/wechat/house-members",filePath:e.photoImg,name:"FaceImage",formData:a,header:{Authorization:o.token_type+" "+o.access_token},success:function(t){n.hideLoading();var o=JSON.parse(t.data);o.success?n.navigateTo({url:"../success/success?type=add"}):e.errorText=o.error.message},fail:function(t){n.hideLoading(),e.errorText=t.message,console.log("2:"+t)}}):n.request({url:e.$config.apiWYBaseUrl+"/api/v2.0/wechat/house-members",method:"POST",header:{"Content-Type":"application/x-www-form-urlencoded",Authorization:o.token_type+" "+o.access_token},data:a,success:function(e){if(n.hideLoading(),200===e.statusCode&&e.data){var t=e.data;t.success?n.navigateTo({url:"../success/success?type=add"}):n.showToast({title:t.error.message,icon:"none"})}else console.log("系统繁忙")},fail:function(t){n.hideLoading(),e.errorText=t,console.log("1:"+t)}})}else if("edit"==e.type){var i={OrganizationItemId:e.organizationItemId,Name:e.name,Phone:e.phone,RelationType:t,HouseCustomerId:e.houseCustomerId,Id:e.houseMemberId};e.isChangeImg?n.uploadFile({url:e.$config.apiWYBaseUrl+"/api/v2.0/wechat/house-members/".concat(e.houseMemberId),filePath:e.photoImg,name:"FaceImage",formData:i,header:{Authorization:o.token_type+" "+o.access_token},success:function(t){n.hideLoading();var o=JSON.parse(t.data);o.success?n.navigateTo({url:"../success/success?type=edit"}):e.errorText=o.error.message},fail:function(t){n.hideLoading(),e.errorText=t,console.log("4:"+t)}}):n.request({url:e.$config.apiWYBaseUrl+"/api/v2.0/wechat/house-members/".concat(i.Id),method:"PUT",header:{"Content-Type":"application/x-www-form-urlencoded",Authorization:o.token_type+" "+o.access_token},data:i,success:function(e){if(n.hideLoading(),200===e.statusCode&&e.data){var t=e.data;t.success?n.navigateTo({url:"../success/success?type=edit"}):n.showToast({title:t.error.message,icon:"none"})}else console.log("系统繁忙")},fail:function(t){n.hideLoading(),console.log("3:"+t),e.errorText=t.message}})}}},goToPhoto:function(){var e=this;n.getStorageSync("user").defaultResourceName;n.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["camera"],success:function(t){e.photoImg=t.tempFilePaths[0],e.isChangeImg=!0}})},bindPickerChange:function(e){this.index=e.target.value,this.value=this.members[e.target.value].relationTypeStr}}};t.default=s}).call(this,o("bc2e")["default"],o("543d")["default"])},c387:function(e,t,o){"use strict";(function(e,t){var n=o("4ea4");o("895d");n(o("66fd"));var a=n(o("dd20"));e.__webpack_require_UNI_MP_PLUGIN__=o,t(a.default)}).call(this,o("bc2e")["default"],o("543d")["createPage"])},dd20:function(e,t,o){"use strict";o.r(t);var n=o("4b27"),a=o("df36");for(var i in a)["default"].indexOf(i)<0&&function(e){o.d(t,e,(function(){return a[e]}))}(i);o("fae2");var r=o("f0c5"),s=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);t["default"]=s.exports},df36:function(e,t,o){"use strict";o.r(t);var n=o("7d8f"),a=o.n(n);for(var i in n)["default"].indexOf(i)<0&&function(e){o.d(t,e,(function(){return n[e]}))}(i);t["default"]=a.a},fae2:function(e,t,o){"use strict";var n=o("3eda"),a=o.n(n);a.a}},[["c387","common/runtime","common/vendor"]]]);
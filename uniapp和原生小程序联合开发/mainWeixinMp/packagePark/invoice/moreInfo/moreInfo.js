require('../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["packagePark/invoice/moreInfo/moreInfo"],{"5ce3":function(e,n,t){"use strict";var a=t("841d"),o=t.n(a);o.a},"841d":function(e,n,t){},"9fed":function(e,n,t){"use strict";(function(e,n){var a=t("4ea4");t("895d");a(t("66fd"));var o=a(t("dc98"));e.__webpack_require_UNI_MP_PLUGIN__=t,n(o.default)}).call(this,t("bc2e")["default"],t("543d")["createPage"])},a44e:function(e,n,t){"use strict";t.r(n);var a=t("f6b7"),o=t.n(a);for(var c in a)["default"].indexOf(c)<0&&function(e){t.d(n,e,(function(){return a[e]}))}(c);n["default"]=o.a},c528:function(e,n,t){"use strict";t.d(n,"b",(function(){return a})),t.d(n,"c",(function(){return o})),t.d(n,"a",(function(){}));var a=function(){var e=this.$createElement;this._self._c},o=[]},dc98:function(e,n,t){"use strict";t.r(n);var a=t("c528"),o=t("a44e");for(var c in o)["default"].indexOf(c)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(c);t("5ce3");var i=t("f0c5"),r=Object(i["a"])(o["default"],a["b"],a["c"],!1,null,"943aaabc",null,!1,a["a"],void 0);n["default"]=r.exports},f6b7:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={name:"MoreInfo",components:{FieldItem:function(){t.e("packagePark/components/field-item/field-item").then(function(){return resolve(t("a0fc"))}.bind(null,t)).catch(t.oe)}},onLoad:function(n){var t=n.type;this.type=t;var a=e.getStorageSync("invoice-more-info");console.log("moreInfo: ",a),this.address=a.address||"",this.phone=a.phone||"",this.bankName=a.bankName||"",this.bankCardNo=a.bankCardNo||""},data:function(){return{address:"",phone:"",bankName:"",bankCardNo:"",type:2}},watch:{},methods:{confirm:function(){e.setStorageSync("invoice-more-info",{address:this.address,phone:this.phone,bankName:this.bankName,bankCardNo:this.bankCardNo}),e.navigateBack()}}};n.default=a}).call(this,t("543d")["default"])}},[["9fed","common/runtime","common/vendor"]]]);
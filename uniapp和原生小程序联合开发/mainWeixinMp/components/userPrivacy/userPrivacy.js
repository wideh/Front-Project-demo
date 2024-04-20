(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/userPrivacy/userPrivacy"],{"594f":function(n,e,t){"use strict";t.r(e);var c=t("d0c1"),a=t("e1a5");for(var i in a)["default"].indexOf(i)<0&&function(n){t.d(e,n,(function(){return a[n]}))}(i);t("f8fe");var r=t("f0c5"),o=Object(r["a"])(a["default"],c["b"],c["c"],!1,null,"4d8d5e7d",null,!1,c["a"],void 0);e["default"]=o.exports},"7c73":function(n,e,t){},a5ca:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={props:{showPrivacy:{type:Boolean,default:!1}},data:function(){return{phoneNumber:null}},methods:{handleAgreePrivacyAuthorization:function(){this.agreePrivacy()},handleOpenPrivacyContract:function(){n.openPrivacyContract({success:function(){console.log("隐私协议打开成功")},fail:function(){console.log("隐私协议打开失败")},complete:function(){}})},agreePrivacy:function(){this.$emit("agreePrivacy")},disagreePrivacy:function(){this.$emit("disagreePrivacy")}}};e.default=t}).call(this,t("bc2e")["default"])},d0c1:function(n,e,t){"use strict";t.d(e,"b",(function(){return c})),t.d(e,"c",(function(){return a})),t.d(e,"a",(function(){}));var c=function(){var n=this.$createElement;this._self._c},a=[]},e1a5:function(n,e,t){"use strict";t.r(e);var c=t("a5ca"),a=t.n(c);for(var i in c)["default"].indexOf(i)<0&&function(n){t.d(e,n,(function(){return c[n]}))}(i);e["default"]=a.a},f8fe:function(n,e,t){"use strict";var c=t("7c73"),a=t.n(c);a.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/userPrivacy/userPrivacy-create-component',
    {
        'components/userPrivacy/userPrivacy-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("594f"))
        })
    },
    [['components/userPrivacy/userPrivacy-create-component']]
]);

(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["packageVisitor/components/suda-visitor-card/suda-visitor-card"],{4294:function(t,i,e){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e={name:"sudaVisitorCard",props:{visitor:{type:Object,default:{}}},computed:{isUseabled:function(){return!this.visitor.hasBeenUsed&&!this.isOutOfDate},isOutOfDate:function(){if(this.visitor.effectiveEndTime){var t=this.$tool.date.parse(this.visitor.effectiveEndTime);if(new Date>t)return!0}return!1},displayStatus:function(){return 0==this.visitor.status?"待确认":1==this.visitor.status?"已放行":2==this.visitor.status?"已拒绝":void 0},displayTime:function(){return this.visitor.endDate?this.$tool.date.format(this.visitor.endDate,"yyyy-MM-dd hh:mm"):""},visitTime:function(){return this.visitor.visitDate?this.$tool.date.format(this.visitor.visitDate,"yyyy-MM-dd hh:mm"):""}},methods:{previewClicked:function(i){t.previewImage({urls:[i]})}}};i.default=e}).call(this,e("543d")["default"])},"44b1":function(t,i,e){"use strict";e.r(i);var n=e("4294"),s=e.n(n);for(var r in n)["default"].indexOf(r)<0&&function(t){e.d(i,t,(function(){return n[t]}))}(r);i["default"]=s.a},ae39:function(t,i,e){"use strict";e.r(i);var n=e("d6cf"),s=e("44b1");for(var r in s)["default"].indexOf(r)<0&&function(t){e.d(i,t,(function(){return s[t]}))}(r);e("f72b");var a=e("f0c5"),u=Object(a["a"])(s["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);i["default"]=u.exports},c02f:function(t,i,e){},d6cf:function(t,i,e){"use strict";e.d(i,"b",(function(){return n})),e.d(i,"c",(function(){return s})),e.d(i,"a",(function(){}));var n=function(){var t=this.$createElement;this._self._c},s=[]},f72b:function(t,i,e){"use strict";var n=e("c02f"),s=e.n(n);s.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'packageVisitor/components/suda-visitor-card/suda-visitor-card-create-component',
    {
        'packageVisitor/components/suda-visitor-card/suda-visitor-card-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("ae39"))
        })
    },
    [['packageVisitor/components/suda-visitor-card/suda-visitor-card-create-component']]
]);

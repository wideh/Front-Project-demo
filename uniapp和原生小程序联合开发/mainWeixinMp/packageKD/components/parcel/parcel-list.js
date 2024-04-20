(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["packageKD/components/parcel/parcel-list"],{"02b8":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={props:{parcelInfo:Object,receiveDate:{type:Boolean,default:!0}},methods:{receive:function(e){"未领取"==e&&this.$emit("receive",this.parcelInfo.id)},Qrcode:function(){e.navigateTo({url:"../../pages/parcel/qrcode?trackingNumber="+this.parcelInfo.parcelExpressCode})}}};t.default=n}).call(this,n("543d")["default"])},"6a9c":function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){}));var a=function(){var e=this.$createElement,t=(this._self._c,this.receiveDate?this.$tool.date.format(this.parcelInfo.createdTime,"yyyy-MM-dd hh:mm:ss"):null);this.$mp.data=Object.assign({},{$root:{g0:t}})},c=[]},ac8a:function(e,t,n){"use strict";var a=n("bbe2"),c=n.n(a);c.a},bbe2:function(e,t,n){},bf24:function(e,t,n){"use strict";n.r(t);var a=n("02b8"),c=n.n(a);for(var r in a)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(r);t["default"]=c.a},f44b:function(e,t,n){"use strict";n.r(t);var a=n("6a9c"),c=n("bf24");for(var r in c)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return c[e]}))}(r);n("ac8a");var i=n("f0c5"),o=Object(i["a"])(c["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],void 0);t["default"]=o.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'packageKD/components/parcel/parcel-list-create-component',
    {
        'packageKD/components/parcel/parcel-list-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("f44b"))
        })
    },
    [['packageKD/components/parcel/parcel-list-create-component']]
]);

require('../../../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["packageDecoration/components/uv-icon/components/uv-icon/uv-icon"],{"04f5":function(t,i,e){"use strict";var n=e("07ae"),s=e.n(n);s.a},"07ae":function(t,i,e){},"09e7":function(t,i,e){"use strict";e.r(i);var n=e("f18e"),s=e.n(n);for(var a in n)["default"].indexOf(a)<0&&function(t){e.d(i,t,(function(){return n[t]}))}(a);i["default"]=s.a},"19e8":function(t,i,e){"use strict";e.r(i);var n=e("ad0c"),s=e("09e7");for(var a in s)["default"].indexOf(a)<0&&function(t){e.d(i,t,(function(){return s[t]}))}(a);e("04f5");var o=e("f0c5"),u=Object(o["a"])(s["default"],n["b"],n["c"],!1,null,"0bb6b58a",null,!1,n["a"],void 0);i["default"]=u.exports},ad0c:function(t,i,e){"use strict";e.d(i,"b",(function(){return n})),e.d(i,"c",(function(){return s})),e.d(i,"a",(function(){}));var n=function(){var t=this,i=t.$createElement,e=(t._self._c,t.isImg?t.__get_style([t.imgStyle,t.$uv.addStyle(t.customStyle)]):null),n=t.isImg?null:t.__get_style([t.iconStyle,t.$uv.addStyle(t.customStyle)]),s=""!==t.label?t.$uv.addUnit(t.labelSize):null,a=""!==t.label&&"right"==t.labelPos?t.$uv.addUnit(t.space):null,o=""!==t.label&&"bottom"==t.labelPos?t.$uv.addUnit(t.space):null,u=""!==t.label&&"left"==t.labelPos?t.$uv.addUnit(t.space):null,l=""!==t.label&&"top"==t.labelPos?t.$uv.addUnit(t.space):null;t.$mp.data=Object.assign({},{$root:{s0:e,s1:n,g0:s,g1:a,g2:o,g3:u,g4:l}})},s=[]},f18e:function(t,i,e){"use strict";var n=e("4ea4");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var s=n(e("44ce")),a=n(e("b3ce")),o=n(e("2613")),u=n(e("5d9d")),l={name:"uv-icon",emits:["click"],mixins:[s.default,a.default,u.default],data:function(){return{colorType:["primary","success","info","error","warning"]}},computed:{uClasses:function(){var t=[];return t.push(this.customPrefix),t.push(this.customPrefix+"-"+this.name),this.color&&this.colorType.includes(this.color)&&t.push("uv-icon__icon--"+this.color),t},iconStyle:function(){var t={};return t={fontSize:this.$uv.addUnit(this.size),lineHeight:this.$uv.addUnit(this.size),fontWeight:this.bold?"bold":"normal",top:this.$uv.addUnit(this.top)},this.color&&!this.colorType.includes(this.color)&&(t.color=this.color),t},isImg:function(){var t=this.name.indexOf("data:")>-1&&this.name.indexOf("base64")>-1;return-1!==this.name.indexOf("/")||t},imgStyle:function(){var t={};return t.width=this.width?this.$uv.addUnit(this.width):this.$uv.addUnit(this.size),t.height=this.height?this.$uv.addUnit(this.height):this.$uv.addUnit(this.size),t},icon:function(){var t=o.default["uvicon-"+this.name];return t?unescape("%u".concat(t)):["uvicon"].indexOf(this.customPrefix)>-1?this.name:""}},methods:{clickHandler:function(t){this.$emit("click",this.index),this.stop&&this.preventEvent(t)}}};i.default=l}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'packageDecoration/components/uv-icon/components/uv-icon/uv-icon-create-component',
    {
        'packageDecoration/components/uv-icon/components/uv-icon/uv-icon-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("19e8"))
        })
    },
    [['packageDecoration/components/uv-icon/components/uv-icon/uv-icon-create-component']]
]);

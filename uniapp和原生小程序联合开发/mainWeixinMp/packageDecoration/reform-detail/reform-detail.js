require('../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["packageDecoration/reform-detail/reform-detail"],{"3b24":function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,a=(t._self._c,t.getStatusStr(t.reformData.status)),n=t.reformData.creationDate?t.formatDateNewTime(t.reformData.creationDate):null,r=t.reformData.attachments&&0!==t.reformData.attachments.length||0!==t.picList.length;t.$mp.data=Object.assign({},{$root:{m0:a,m1:n,g0:r}})},r=[]},"8f4f":function(t,e,a){},c16b:function(t,e,a){"use strict";a.r(e);var n=a("eb2f"),r=a.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=r.a},c964:function(t,e,a){"use strict";(function(t,e){var n=a("4ea4");a("895d");n(a("66fd"));var r=n(a("e184"));t.__webpack_require_UNI_MP_PLUGIN__=a,e(r.default)}).call(this,a("bc2e")["default"],a("543d")["createPage"])},e184:function(t,e,a){"use strict";a.r(e);var n=a("3b24"),r=a("c16b");for(var o in r)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return r[t]}))}(o);a("ea84");var c=a("f0c5"),i=Object(c["a"])(r["default"],n["b"],n["c"],!1,null,"742f5436",null,!1,n["a"],void 0);e["default"]=i.exports},ea84:function(t,e,a){"use strict";var n=a("8f4f"),r=a.n(n);r.a},eb2f:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{reformData:{},picList:[]}},onLoad:function(t){var e=this;console.log("options",t),this.$httpCommon.get("/decoration/v1/".concat(this.$config.tenantId,"/reformRequirement/page?current=1&quickSearch=").concat(t.reformCode,"&size=10")).then((function(t){if(t&&"00000"===t.code){var a=t.data.records;a&&a.length>0&&(e.reformData=a[0],e.$httpCommon.get("/decoration/v1/".concat(e.$config.tenantId,"/reformDetail/list/").concat(a[0].id,"/attachment")).then((function(t){t&&"00000"===t.code&&(e.picList=t.data||[])})))}}))},methods:{getStatusStr:function(t){var e="";switch(this.reformData.status){case 0:e="审批中";break;case 1:e="整改中";break;case 2:e="待确认";break;case 3:e="已完成";break;case 4:e="已关闭";break}return e},formatDateNewTime:function(t){return this.$formatDateNewTime(t)}}};e.default=n}},[["c964","common/runtime","common/vendor"]]]);
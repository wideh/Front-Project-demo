require('../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["packageRepair/flowRepair/history/history"],{"0083":function(t,e,n){"use strict";n.r(e);var i=n("e5d8"),o=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=o.a},"790d":function(t,e,n){},"867c":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var i={pageEmpty:function(){return n.e("components/page-empty/page-empty").then(n.bind(null,"1068"))}},o=function(){var t=this,e=t.$createElement,n=(t._self._c,0===t.current?t.unFinishedList.length:null),i=1===t.current?t.finishedList.length:null,o=1===t.current&&i>0?t.__map(t.finishedList,(function(e,n){var i=t.__get_orig(e),o="已关闭"==e.repairStatusStr||"已撤回"==e.repairStatusStr?t.getColor(e.repairStatus):null;return{$orig:i,m0:o}})):null;t.$mp.data=Object.assign({},{$root:{g0:n,g1:i,l0:o}})},r=[]},ac97:function(t,e,n){"use strict";var i=n("790d"),o=n.n(i);o.a},acc2:function(t,e,n){"use strict";n.r(e);var i=n("867c"),o=n("0083");for(var r in o)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("ac97");var s=n("f0c5"),a=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],void 0);e["default"]=a.exports},bc91:function(t,e,n){"use strict";(function(t,e){var i=n("4ea4");n("895d");i(n("66fd"));var o=i(n("acc2"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(o.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},e5d8:function(t,e,n){"use strict";(function(t){var i=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("2eee")),r=i(n("c973")),s=i(n("448a")),a=n("dfda"),u={components:{uniSegmentedControl:function(){n.e("node-modules/@dcloudio/uni-ui/lib/uni-segmented-control/uni-segmented-control").then(function(){return resolve(n("3f52"))}.bind(null,n)).catch(n.oe)},uniTag:function(){n.e("node-modules/@dcloudio/uni-ui/lib/uni-tag/uni-tag").then(function(){return resolve(n("f7b5"))}.bind(null,n)).catch(n.oe)},pageEmpty:function(){n.e("components/page-empty/page-empty").then(function(){return resolve(n("1068"))}.bind(null,n)).catch(n.oe)},customFooter:function(){n.e("components/custom-footer/custom-footer").then(function(){return resolve(n("7d39"))}.bind(null,n)).catch(n.oe)}},data:function(){return{items:["未完成","已完成"],current:0,unFinishedList:[],finishedList:[],footerData:null,triggered:!0,scrollTop:0,old:{scrollTop:0},page:1,pageSize:10,pages:1}},onLoad:function(){},onShow:function(){this.finishedList=[],this.unFinishedList=[],this.getList({page:1,pageSize:10,status:this.current}),this.getFooterData()},methods:{error:function(e){t.hideLoading(),t.showToast({icon:"none",title:e||"系统繁忙，请稍候重试",duration:2500})},getList:function(t){1==t.status?this.finishedList=[]:this.unFinishedList=[];var e=this;this.$httpCommon.post("".concat(a.PRE_FIX,"/repair/records/list?isMiniProgram=true"),{page:t.page||1,pageSize:t.pageSize||10,isMine:!0,isCompleted:!!t.status}).then((function(n){var i=n.result;e.page=i.current,e.pageSize=i.size,e.pages=i.pages;var o=i.records.map((function(t){var e=(t.buttons||[]).findIndex((function(t){return 6==t.buttonType}))>-1,n=(t.buttons||[]).findIndex((function(t){return 7==t.buttonType}))>-1,i=e||n;return t.isSettingAffirm=n,t.isCanComment=e,t.isCanRet=i,t}));0==t.status?e.unFinishedList.length<=i.total?e.unFinishedList=[].concat((0,s.default)(e.unFinishedList),(0,s.default)(o)):e.unFinishedList=o:e.finishedList.length<=i.total?e.finishedList=[].concat((0,s.default)(e.finishedList),(0,s.default)(o)):e.finishedList=o}))},onClickItem:function(t){this.finishedList=[],this.unFinishedList=[],this.current!==t&&(console.log(t),this.current=t.currentIndex),this.getList({page:1,pageSize:10,status:this.current})},scrolltolower:function(){console.log("触底",this.page,this.pages),this.page<this.pages&&(this.page+=1,this.getList({page:this.page,pageSize:this.pageSize,status:this.current}))},onRefresh:function(){var t=this;this.triggered=!0,setTimeout((function(){t.triggered=!1,t.unFinishedList=[],t.finishedList=[],t.getList({page:1,pageSize:10,status:t.current})}),1e3)},confirmComplete:function(e){var n=this;t.showLoading({title:"加载中",mask:!0}),this.$httpCommon.post("".concat(a.PRE_FIX,"/repair_mine/confirm"),{repairId:e,resetFlow:!1,remark:"确认完成"}).then((function(e){e&&e.success?setTimeout((function(){t.hideLoading(),n.getList({page:1,pageSize:10,status:n.current})}),500):(t.hideLoading(),n.error(e.error.message||"确认完成失败"))}))},gotoComment:function(e){t.navigateTo({url:"../comment/comment?id="+e})},goToDetail:function(e){t.navigateTo({url:"../detail/detail?id="+e.id})},goToRework:function(e){var n=this;t.showLoading({title:"加载中",mask:!0}),this.$httpCommon.post("".concat(a.PRE_FIX,"/repair_mine/reset"),{repairId:e,remark:"没有修好"}).then((function(e){t.hideLoading(),e&&e.success?t.navigateTo({url:"../rework-success/rework-success?delta=2"}):n.error(e.error.message||"返修申请失败")})).catch((function(t){console.log(t)}))},getFooterData:function(){var t=this;return(0,r.default)(o.default.mark((function e(){var n;return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$footerConfig.get();case 2:n=e.sent,t.footerData=n;case 4:case"end":return e.stop()}}),e)})))()},getColor:function(t){return null==t?"#cccccc":7==t?"#de8c84":"#f4b302"}}};e.default=u}).call(this,n("543d")["default"])}},[["bc91","common/runtime","common/vendor","packageRepair/common/vendor"]]]);
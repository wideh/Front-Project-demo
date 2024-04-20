(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/complaints/evaluation-advice"],{"029b":function(t,e,o){"use strict";(function(t,e){var a=o("4ea4");o("895d");a(o("66fd"));var n=a(o("b773"));t.__webpack_require_UNI_MP_PLUGIN__=o,e(n.default)}).call(this,o("bc2e")["default"],o("543d")["createPage"])},"4e36":function(t,e,o){"use strict";o.d(e,"b",(function(){return n})),o.d(e,"c",(function(){return i})),o.d(e,"a",(function(){return a}));var a={uniIcons:function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(o.bind(null,"cff5"))},userPrivacy:function(){return o.e("components/userPrivacy/userPrivacy").then(o.bind(null,"594f"))}},n=function(){var t=this.$createElement,e=(this._self._c,this.complainNormalData.attachments.length),o=this.complainNormalData.attachments.length;this.$mp.data=Object.assign({},{$root:{g0:e,g1:o}})},i=[]},"55b9":function(t,e,o){"use strict";(function(t,a){var n=o("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(o("9523")),r=n(o("7037")),c=n(o("7504"));function s(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,a)}return o}function l(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?s(Object(o),!0).forEach((function(e){(0,i.default)(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):s(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}var u={components:{userPrivacy:function(){o.e("components/userPrivacy/userPrivacy").then(function(){return resolve(o("594f"))}.bind(null,o)).catch(o.oe)}},data:function(){return{formItemList:[],showCsApproval:!0,complainTypeList:[],regionList:[],complainPostDataKey:"",complainNormalData:{complainType:"",typeId:"",regionName:"",regionId:"",customer:"",phone:"",csDate:"",detail:"",attachments:[]},timeId:null,timer:null,formDesign:"",isUploadImg:!1,subLoading:!1,isGetFormSuccess:!1,textareaMaxLength:500,textareaWordCount:0,showPrivacy:!1}},onLoad:function(){var e=this;t.onNeedPrivacyAuthorization&&t.onNeedPrivacyAuthorization((function(t,o){e.showPrivacy=!0,e.resolvePrivacyAuthorization=t}));var o=this,a=new Date,n=a.getFullYear(a)>9?a.getFullYear(a):"0"+a.getFullYear(a),i=a.getMonth(a)+1>9?a.getMonth(a)+1:"0"+(a.getMonth(a)+1),c=a.getDate(a)>9?a.getDate(a):"0"+a.getDate(a);this.complainNormalData.csDate="".concat(n,"-").concat(i,"-").concat(c),this.$httpWorkflow.get("/cs_approval/form").then((function(t){if(t&&t.success){e.isGetFormSuccess=!0;var a,n=t.result;o.formDesign=n.formDesign,function(t){if("string"!=typeof t)return!1;try{var e=JSON.parse(t);return!("object"!=(0,r.default)(e)||!e)}catch(o){return!1}}(n.formDesign)&&(a=JSON.parse(n.formDesign)),console.log("formItemData",a.schema),a.schema.properties&&Object.keys(a.schema.properties).map((function(t){var e=a.schema.properties["".concat(t)];"CsApproval"==e["x-component"]&&(o.showCsApproval=!0,o.complainPostDataKey="".concat(t),o.formItemList.push({componentType:e["x-component"]}))}))}})).catch((function(t){console.log(t)})),this.fetchComplainTypeList(),this.fetchRegion(),this.getUserInfo()},onHide:function(){this.timeId&&clearTimeout(this.timeId),this.timer&&clearTimeout(this.timer)},methods:{agreePrivacy:function(){this.showPrivacy=!1,this.resolvePrivacyAuthorization({buttonId:"agree-btn",event:"agree"})},disagreePrivacy:function(){this.showPrivacy=!1},descInput:function(t){this.textareaWordCount=t.detail.value.length},error:function(t){a.hideLoading(),a.showToast({icon:"none",title:t||"系统繁忙，请稍候重试",duration:2500})},fetchRegion:function(){var t=this;this.$http.request("/api/v1.0/app/CommonApi/regions").then((function(e){e&&(t.regionList=e)}))},fetchComplainTypeList:function(){var t=this;this.$httpWorkflow.get("/cs_type/enable-list").then((function(e){if(e&&e.success){var o=e.result;t.complainTypeList=o}})).catch((function(t){console.log(t)}))},getUserInfo:function(){var t=this;this.$http.get("/api/v2.0/wechat/authorized-users/me").then((function(e){console.log("个人信息",e),e&&(t.complainNormalData.customer=e.customerName,t.complainNormalData.phone=e.phoneNumber)}))},onComplainTypeChange:function(t){console.log("投诉类型change事件:",t);var e=this.complainTypeList[t.target.value];this.complainNormalData=l(l({},this.complainNormalData),{},{complainType:e.name,typeId:e.id})},clearComplainTypeData:function(){this.complainNormalData=l(l({},this.complainNormalData),{},{complainType:"",typeId:""})},onRegionChange:function(t){console.log("管理区change事件:",t);var e=this.regionList[t.target.value];this.complainNormalData=l(l({},this.complainNormalData),{},{regionName:e.text,regionId:e.id})},clearRegionData:function(){this.complainNormalData=l(l({},this.complainNormalData),{},{regionName:"",regionId:""})},onComplainDateChange:function(t){this.complainNormalData=l(l({},this.complainNormalData),{},{csDate:t.target.value})},clearComplainDateData:function(){this.complainNormalData=l(l({},this.complainNormalData),{},{csDate:""})},addFiles:function(){var t=this;t.isUploadImg=!1;var e=["img","jpg","png","gif","jpeg","BMP","svg","TIFF","bmp","JPG","JPEG","GIF","PNG","IMG","SVG"];a.chooseImage({count:3,sizeType:["original","compressed"],success:function(o){var n;console.log("选择文件临时",o),console.log("选取图片路径",o.tempFiles[0].path),console.log("选取图片大小",o.tempFiles[0].size);var i=o.tempFiles[0].path;if(-1!==e.indexOf(i.split(".")[(null===(n=i.split("."))||void 0===n?void 0:n.length)-1]))if(o.tempFiles[0].size>2097152)t.error("上传文件大小不得超过2M！");else{t.isUploadImg=!0;var r=i.substring(i.lastIndexOf("/")+1);console.log("fileName",r);var s=r,l=a.getStorageSync(c.default.storageKeys.token);a.uploadFile({url:t.$config.apiBaseUrl+"/hfle/v1/files/multipart",filePath:i,name:"file",formData:{filename:r,bucketName:"public",directory:"hpfm05"},header:{"Content-Type":"multipart/form-data",Authorization:l.token_type+" "+l.access_token},success:function(e){console.log("上传文件成功",e);var o={fileName:s,filePath:e.data};t.complainNormalData.attachments.push(o),t.isUploadImg=!1},fail:function(e){return t.isUploadImg=!1,t.error("上传文件失败，请重新上传"),!1}})}else{var u="只能上传".concat(e.map((function(t){return".".concat(t)})).join(","),"类型图片!");t.error(u)}}})},downloadFile:function(e){a.downloadFile({url:e.filePath,success:function(o){if(200===o.statusCode){var n=e.fileName.split("."),i=["jpg","jpeg","png","webp","bmp"].indexOf(n[n.length-1]);if(i>-1){var r=t.env.USER_DATA_PATH+"/"+e.fileName;t.getFileSystemManager().saveFile({tempFilePath:o.tempFilePath,filePath:r,success:function(e){t.saveImageToPhotosAlbum({filePath:r,success:function(e){t.showModal({title:"文件已保存到手机相册",confirmColor:"#0bc183",confirmText:"知道了",showCancel:!1})},fail:function(t){console.log(t)}})},fail:function(t){console.log(t)}})}else a.saveFile({tempFilePath:o.tempFilePath,success:function(t){console.log("savedFilePath",t.savedFilePath),a.showToast({icon:"none",mask:!0,title:"请点击右上角的..., 下载文件到本地",duration:3e3}),setTimeout((function(){a.openDocument({filePath:t.savedFilePath,showMenu:!0,success:function(t){}})}),1e3)}})}},fail:function(t){console.log("下载失败",t),a.showToast({icon:"none",mask:!0,title:"失败请重新下载"})}})},actionSheetTap:function(t){var e=t,o=this,n=this.complainNormalData.attachments.map((function(t){return t.filePath}));a.showActionSheet({itemList:["删除","预览"],success:function(t){0==t.tapIndex&&o.deleteImg(e),1==t.tapIndex&&a.previewImage({current:e,urls:n})}})},deleteImg:function(t){this.complainNormalData.attachments.splice(t,1)},verificationRequired:function(){if(this.showCsApproval){if(!this.complainNormalData.complainType)return this.error("请选择投诉类型"),!1;if(!this.complainNormalData.regionName)return this.error("请选择管理区"),!1;if(!this.complainNormalData.customer)return this.error("请输入商户名称(联系人)"),!1;if(!/^(((0\d{2,3}-)?\d{7,8})|(1\d{10}))$/gi.test(this.complainNormalData.phone))return this.error("请输入固定电话或 11 位手机号！"),!1;if(!this.complainNormalData.csDate)return this.error("请选择投诉日期"),!1;if(!this.complainNormalData.detail)return this.error("请输入投诉内容"),!1;if(!this.isGetFormSuccess)return this.error("没有设置投诉建议流程，请联系系统管理员处理"),!1}return!0},addApproval:function(){var t=this;this.timeId&&clearTimeout(this.timeId),this.timeId=setTimeout((function(){if(t.verificationRequired()){var e=t;if(t.isUploadImg)e.error("操作过快，请在图片上传完成后点击提交按钮");else{var o={};if(t.showCsApproval){var n=t.complainPostDataKey,i=new Date,r=i.getHours(i)>9?i.getHours(i):"0"+i.getHours(i),c=i.getMinutes(i)>9?i.getMinutes(i):"0"+i.getMinutes(i),s=i.getSeconds(i)>9?i.getSeconds(i):"0"+i.getSeconds(i);o["".concat(n)]={values:l(l({},t.complainNormalData),{},{csDate:"".concat(t.complainNormalData.csDate," ").concat(r,":").concat(c,":").concat(s)})}}t.subLoading=!0,t.$httpWorkflow.post("/cs_approval/add",{formDesign:e.formDesign,formData:JSON.stringify(o)}).then((function(e){e&&e.success?(a.navigateBack(),t.timer=setTimeout((function(){t.subLoading=!1}),50)):(t.subLoading=!1,t.error(e||"新建申请失败"))})).catch((function(e){t.subLoading=!1,console.log(e)}))}}}),500)}}};e.default=u}).call(this,o("bc2e")["default"],o("543d")["default"])},6202:function(t,e,o){"use strict";o.r(e);var a=o("55b9"),n=o.n(a);for(var i in a)["default"].indexOf(i)<0&&function(t){o.d(e,t,(function(){return a[t]}))}(i);e["default"]=n.a},"639a":function(t,e,o){"use strict";var a=o("c7b7"),n=o.n(a);n.a},b773:function(t,e,o){"use strict";o.r(e);var a=o("4e36"),n=o("6202");for(var i in n)["default"].indexOf(i)<0&&function(t){o.d(e,t,(function(){return n[t]}))}(i);o("639a");var r=o("f0c5"),c=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"ccb02bd0",null,!1,a["a"],void 0);e["default"]=c.exports},c7b7:function(t,e,o){}},[["029b","common/runtime","common/vendor"]]]);
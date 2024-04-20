(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/complaints/complaints-evaluation"],{2629:function(e,t,n){"use strict";n.r(t);var o=n("686b"),i=n("9903");for(var a in i)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(a);n("2da2");var s=n("f0c5"),c=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,"e1069d94",null,!1,o["a"],void 0);t["default"]=c.exports},"2ac9":function(e,t,n){"use strict";(function(e,o){var i=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=i(n("7037")),s=i(n("7504")),c={components:{sxRate:function(){Promise.all([n.e("common/vendor"),n.e("components/sx-rate/index")]).then(function(){return resolve(n("0289"))}.bind(null,n)).catch(n.oe)},userPrivacy:function(){n.e("components/userPrivacy/userPrivacy").then(function(){return resolve(n("594f"))}.bind(null,n)).catch(n.oe)}},data:function(){return{id:"",appraiseList:[],commentGradeName:"",commentGrade:"",comment:"",attachments:[],formDesign:"",complainPostDataKey:"comment_node",isUploadImg:!1,textareaMaxLength:500,textareaWordCount:0,evaluateTypes:[],commentStar:4,showPrivacy:!1}},onLoad:function(t){var n=this;e.onNeedPrivacyAuthorization&&e.onNeedPrivacyAuthorization((function(e,t){n.showPrivacy=!0,n.resolvePrivacyAuthorization=e})),console.log("投诉建议id",t.id),this.id=t.id,this.getEvaluateTypes(),this.getPermissions()},methods:{agreePrivacy:function(){this.showPrivacy=!1,this.resolvePrivacyAuthorization({buttonId:"agree-btn",event:"agree"})},disagreePrivacy:function(){this.showPrivacy=!1},onComprehensiveChange:function(e){this.commentStar=e},onOtherComentChange:function(e,t){this.evaluateTypes[t].evaluate=e},descInput:function(e){this.textareaWordCount=e.detail.value.length},error:function(e){o.hideLoading(),o.showToast({icon:"none",title:e||"系统繁忙，请稍候重试",duration:2500})},getAppraiseList:function(){var e=this;this.$httpWorkflow.get("/enum/cs-comment-grade").then((function(t){t&&t.success&&(e.appraiseList=t.result)})).catch((function(e){console.log(e)}))},getEvaluateTypes:function(){var e=this;this.$httpWorkflow.get("/cs_evaluation_types?status=0").then((function(t){t&&t.success&&(e.evaluateTypes=t.result,e.evaluateTypes.forEach((function(e){return e.evaluate=4}))),console.log(e.evaluateTypes)})).catch((function(e){console.log(e)}))},getPermissions:function(){var e=this;this.$httpWorkflow.get("/cs_approval/permissions/".concat(this.id)).then((function(t){if(t&&t.success){var n,o=t.result;if(o.formDesign)e.formDesign=o.formDesign,function(e){if("string"!=typeof e)return!1;try{var t=JSON.parse(e);return!("object"!=(0,a.default)(t)||!t)}catch(n){return!1}}(o.formDesign)&&(n=JSON.parse(o.formDesign)),n.schema.properties&&Object.keys(n.schema.properties).map((function(e){var t=n.schema.properties["".concat(e)];"CommentNode"==t["x-component"]&&(me.complainPostDataKey="".concat(e))}))}})).catch((function(e){console.log(e)}))},bindPickerChange:function(e){var t=this.appraiseList[e.target.value];this.commentGradeName=t.text,this.commentGrade=t.id},addFiles:function(){var e=this;e.isUploadImg=!1;var t=["img","jpg","png","gif","jpeg","BMP","svg","TIFF","bmp","JPG","JPEG","GIF","PNG","IMG","SVG"];o.chooseImage({count:10,sizeType:["original","compressed"],success:function(n){var i;console.log("选择文件临时",n),console.log("选取图片路径",n.tempFiles[0].path),console.log("选取图片大小",n.tempFiles[0].size);var a=n.tempFiles[0].path;if(-1!==t.indexOf(a.split(".")[(null===(i=a.split("."))||void 0===i?void 0:i.length)-1]))if(n.tempFiles[0].size>2097152)e.error("上传文件大小不得超过2M！");else{e.isUploadImg=!0;var c=a.substring(a.lastIndexOf("/")+1);console.log("fileName",c);var r=c,u=o.getStorageSync(s.default.storageKeys.token);o.uploadFile({url:e.$config.apiBaseUrl+"/hfle/v1/files/multipart",filePath:a,name:"file",formData:{filename:c,bucketName:"public",directory:"hpfm05"},header:{"Content-Type":"multipart/form-data",Authorization:u.token_type+" "+u.access_token},success:function(t){console.log("上传文件成功",t.data);var n={fileName:r,filePath:t.data};e.attachments.push(n),e.isUploadImg=!1},fail:function(t){return e.isUploadImg=!1,e.error("上传文件失败，请重新上传"),!1}})}else{var l="只能上传".concat(t.map((function(e){return".".concat(e)})).join(","),"类型图片!");e.error(l)}}})},downloadFile:function(t){o.downloadFile({url:t.url,success:function(n){if(200===n.statusCode){var i=t.name.split("."),a=["jpg","jpeg","png","webp","bmp"].indexOf(i[i.length-1]);if(a>-1){var s=e.env.USER_DATA_PATH+"/"+t.name;e.getFileSystemManager().saveFile({tempFilePath:n.tempFilePath,filePath:s,success:function(t){e.saveImageToPhotosAlbum({filePath:s,success:function(t){e.showModal({title:"文件已保存到手机相册",confirmColor:"#0bc183",confirmText:"知道了",showCancel:!1})},fail:function(e){console.log(e)}})},fail:function(e){console.log(e)}})}else o.saveFile({tempFilePath:n.tempFilePath,success:function(e){console.log("savedFilePath",e.savedFilePath),o.showToast({icon:"none",mask:!0,title:"请点击右上角的..., 下载文件到本地",duration:3e3}),setTimeout((function(){o.openDocument({filePath:e.savedFilePath,showMenu:!0,success:function(e){}})}),1e3)}})}},fail:function(e){console.log("下载失败",e),o.showToast({icon:"none",mask:!0,title:"失败请重新下载"})}})},actionSheetTap:function(e){var t=e,n=this,i=this.attachments.map((function(e){return e.filePath}));o.showActionSheet({itemList:["删除","预览"],success:function(e){0==e.tapIndex&&n.deleteImg(t),1==e.tapIndex&&o.previewImage({current:t,urls:i})}})},deleteImg:function(e){this.attachments.splice(e,1)},verificationRequired:function(){return!!this.comment||(this.error("请输入评价内容"),!1)},onOk:function(){if(console.log(this.commentStar,this.evaluateTypes),this.verificationRequired())if(this.isUploadImg)this.error("操作过快，请在图片上传完成后点击确认按钮");else{var e=[];this.evaluateTypes.forEach((function(t){e.push({evaluationName:t.name,grade:t.evaluate-1})}));var t={},n=this.complainPostDataKey;t["".concat(n)]={values:{commentGrade:this.commentStar-1,comment:this.comment,attachments:this.attachments,evaluations:e}};var i={formDesign:this.formDesign,formData:JSON.stringify(t)};this.$httpWorkflow.post("/cs_approval/comment/".concat(this.id),i).then((function(e){e&&e.success&&o.navigateBack({delta:2})})).catch((function(e){console.log(e)}))}}}};t.default=c}).call(this,n("bc2e")["default"],n("543d")["default"])},"2da2":function(e,t,n){"use strict";var o=n("92f7"),i=n.n(o);i.a},"44ad":function(e,t,n){"use strict";(function(e,t){var o=n("4ea4");n("895d");o(n("66fd"));var i=o(n("2629"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(i.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},"686b":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return o}));var o={uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(n.bind(null,"cff5"))},userPrivacy:function(){return n.e("components/userPrivacy/userPrivacy").then(n.bind(null,"594f"))}},i=function(){var e=this.$createElement,t=(this._self._c,this.attachments.length),n=this.attachments.length;this.$mp.data=Object.assign({},{$root:{g0:t,g1:n}})},a=[]},"92f7":function(e,t,n){},9903:function(e,t,n){"use strict";n.r(t);var o=n("2ac9"),i=n.n(o);for(var a in o)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=i.a}},[["44ad","common/runtime","common/vendor"]]]);
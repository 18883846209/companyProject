window.share = {
   title: '还在为买东西焦头烂额？快来万年历看看吧！',
   friendTitle: '还在为买东西焦头烂额？快来万年历看看吧！',
   link: 'https://mobile.51wnl.com/temporary/pay2017/index.html',
   imgUrl: 'https://mobile.51wnl.com/temporary/pay2017/img/share.jpg',
   desc: '涵盖所有的分期购物平台，海量商品全放进你的口袋，还犹豫什么，赶快点击我！'
};
var shareOB = window.share;
$(function() {
   FastClick.attach(document.body);
   var lists = $('.data').length;
   console.log(lists);
// if (WNLUtil.isWnl) {
// 			if ((WNLUtil.isIOS && WNLUtil.appVersion <= 450) || (WNLUtil.isAndroid && WNLUtil.appVersion <= 451)) {
// 				WNLUtil.setShareDataOld({
// 					pureText: share.title,
// 					text: share.title,
// 					image: '0',
// 					url: share.link,
// 					targetUrl: share.link,
// 					imageURL: share.imgUrl
// 				});
// 				//分享埋点
// 				if (WNLUtil.isIOS) {
// 					_czc.push(['_trackEvent','guyu2017_oldshare_ios', 'click']);
// 				}else if (WNLUtil.isAndroid) {
// 					_czc.push(['_trackEvent','guyu2017_oldshare_android', 'click']);
// 				}
// 				}else {
// 					$('.sharemask, .wnl-sharetool').removeClass('hidden');
// 					setWnlShare(shareOB);
// 					if (WNLUtil.isIOS) {
// 						_czc.push(['_trackEvent','guyu2017_newshare_ios', 'click']);
// 				}else if (WNLUtil.isAndroid) {
// 						_czc.push(['_trackEvent','guyu2017_newshare_android', 'click']);
// 						}
// 					}
// 				}
// 				else if (WNLUtil.isWeixin) {
// 					if (WNLUtil.isIOS) {
// 						_czc.push(['_trackEvent', 'guyu2017_wxsharebtn_ios', 'click']);
// 					} else if (WNLUtil.isAndroid) {
// 						_czc.push(['_trackEvent', 'guyu2017_wxsharebtn_android', 'click']);
// 					}
// 					$('.showShareMask').removeClass('hidden');//移除分享列表
// 				}

   //万年历分享工具设置
//    $('.showShareMask').click(function(){
//        $(this).addClass('hidden');
//    });

//    $('.sharemask, .cancle-share').click(function(){
//        $('.sharemask, .wnl-sharetool').addClass('hidden');
//    });

   wx.ready(function() {  //微信分享
       setShareInfo();
   });
   

    function setShareInfo() {
       //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
       wx.onMenuShareTimeline({
           title: share.title, // 分享标题
           link: share.link, // 分享链接
           imgUrl: share.imgUrl, // 分享图标
           success: function () {
               // 用户确认分享后执行的回调函数
               $('.showShareMask').addClass('hidden');
               if (WNLUtil.isIOS) {
                   _czc.push(['_trackEvent', 'wnltekan_wxshare_timeline', 'click', 'ios']);
               } else if (WNLUtil.isAndroid) {
                   _czc.push(['_trackEvent', 'wnltekan_wxshare_timeline', 'click', 'az']);
               }
           },
           cancel: function () {
               // 用户取消分享后执行的回调函数
           }
       });
       //获取“分享给朋友”按钮点击状态及自定义分享内容接口
       wx.onMenuShareAppMessage({
           title: share.friendTitle, // 分享标题
           desc: share.desc, // 分享描述
           link: share.link, // 分享链接
           imgUrl: share.imgUrl, // 分享图标
           success: function () {
               // 用户确认分享后执行的回调函数
               $('.showShareMask').addClass('hidden');
               if (WNLUtil.isIOS) {
                   _czc.push(['_trackEvent', 'wnltekan_wxshare_appmessage', 'click', 'ios']);
               } else if (WNLUtil.isAndroid) {
                   _czc.push(['_trackEvent', 'wnltekan_wxshare_appmessage', 'click', 'az']);
               }
           },
           cancel: function () {
               // 用户取消分享后执行的回调函数
           }
       });
       //获取“分享到QQ”按钮点击状态及自定义分享内容接口
       wx.onMenuShareQQ({
           title: share.title, // 分享标题
           desc: share.desc, // 分享描述
           link: share.link, // 分享链接
           imgUrl: share.imgUrl, // 分享图标
           success: function () {
               // 用户确认分享后执行的回调函数
               $('.showShareMask').addClass('hidden');
           },
           cancel: function () {
               // 用户取消分享后执行的回调函数
           }
       });
   }

})

// function shareCallback(state) {
//    $('.sharemask, .wnl-sharetool').addClass('hidden');
//    if (WNLUtil.isAndroid) {
//        _czc.push(['_trackEvent', 'pay2017_appshare_android', 'click']);
//    }
//    else if (WNLUtil.isIOS) {
//        _czc.push(['_trackEvent', 'pay2017_appshare_ios', 'click']);
//    }
// }

// function showWnlShareTool(){
// 	$('.sharemask, .wnl-sharet.ool').removeClass('hidden');
// 	setWnlShare(shareOB);
// }

// function setWnlShare(param){
// 	if (typeof param == 'string') {
// 		$('.weixin').click(function(){
// 			WNLUtil.setShareDataForImage('weixin', param);
// 			window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
// 		});
// 		$('.weixin_circle').click(function(){
// 			WNLUtil.setShareDataForImage('weixin_circle', param);
// 			window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
// 		});
// 		$('.qq').click(function(){
// 			WNLUtil.setShareData('qq', {
// 				title: share.title,
// 				text: share.title,
// 				image: param,
// 				url: share.link
// 			});
// 			window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
// 		});
// 		$('.weibo').click(function(){
//             if(WNLUtil.isIOS){
//                 WNLUtil.setShareDataForImage('sina', param);
//                 window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
//             }else if (WNLUtil.isAndroid) {
//                 WNLUtil.setShareDataForSina('sina', param);
//     			window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
//                 // WNLUtil.setShareData('sina', {
//                 //     title: share.title,
//                 //     text: share.title+share.link,
//                 //     image: share.imgUrl,
//                 //     url: share.link
//                 // });
//                 // window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
//             }
//             // android 4.6.3 不支持直接分享图片了。。。下个版本改回来
// 			// WNLUtil.setShareDataForSina('sina', param);
// 			// window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
// 		});
// 	}else if (typeof param == 'object') {
// 		$('.weixin').click(function(){
// 			WNLUtil.setShareData('weixin', {
// 				title: share.title,
// 				text: share.desc,
// 				image: share.imgUrl,
// 				url: share.link
// 			});
// 			window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
// 		});
// 		$('.weixin_circle').click(function(){
// 			WNLUtil.setShareData('weixin_circle', {
// 				title: share.title,
// 				text: share.desc,
// 				image: share.imgUrl,
// 				url: share.link
// 			});
// 			window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
// 		});
// 		$('.qq').click(function(){
// 			WNLUtil.setShareData('qq', {
// 				title: '',
// 				text: share.desc,
// 				image: share.imgUrl,
// 				url: share.link
// 			});
// 			window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
// 		});
// 		$('.weibo').click(function(){
//             if(WNLUtil.isIOS){
// 				WNLUtil.setShareData('sina', {
// 					title: '',
// 					text: share.desc,
// 					image: share.imgUrl,
// 					url: share.link
// 				});
// 				window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
// 			}else if (WNLUtil.isAndroid) {
// 				WNLUtil.setShareData('sina', {
// 					title: share.title,
// 					text: share.title+share.link,
// 					image: share.imgUrl,
// 					url: share.link
// 				});
// 				window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
// 			}
// 		});
// 	}
// }

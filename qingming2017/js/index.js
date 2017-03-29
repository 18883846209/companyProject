//生成一个唯一码
function unique() {
    var guid = "{";
    for (var i = 1; i <= 32; i++){
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) ||  (i == 20))
            guid += "-";
        }
    guid += "}";
    guid = guid.substring(1,guid.length-2);
    return guid;
}

window.share = {
	title : '这个清明，一起来种株佛心莲吧。',//设置分享的题目
	friendTitle : '这个清明，一起来种株佛心莲吧。',//分享之后显示的题目
	link : 'https://b.cqyouloft.com/qingming2017/index.html?share=1',//分享链接
	imgUrl : 'https://b.cqyouloft.com/qingming2017/img/share.jpg',//图片的链接
	desc : '千灯万盏，不如心灯一盏。'//附加的描述信息
};
var shareOB = window.share,shareImage;

$(function() {
	//alert(localStorage.getItem('masteUser'));
    FastClick.attach(document.body);

	//背景音乐控制
	var music = document.getElementsByClassName('music')[0];
	var musicbtn = document.getElementsByClassName('musicbtn')[0];
	var img = document.getElementsByTagName('img')[0];
	music.play();
	$('img').eq(0).addClass('circle');
	$('.musicbtn').click(function() {
		if(music.paused) {
			music.play();
			$('img').eq(0).addClass('circle');
			img.src = 'https://b.cqyouloft.com/qingming2017/img/music_on@2x.png';
		}else {
			$('img').eq(0).removeClass('circle');
			music.pause();
			img.src = 'https://b.cqyouloft.com/qingming2017/img/music_off@2x.png';
		}
	})
	


	var userId = unique();
	localStorage.setItem('masteUser',userId);
	//区分万年历和微信打开
	if (WNLUtil.isWeixin) {
		if (WNLUtil.isIOS) {
			_czc.push(['_trackEvent','qingming2017_click_wx', 'view', 'ios']);
		}else if (WNLUtil.isAndroid) {
			_czc.push(['_trackEvent','qingming2017_click_wx', 'view', 'az']);
		};
		$('.page2').find('.btns,.foot').addClass('hidden');
		$('.page2').find('.weixin').removeClass('hidden');
	}else if (WNLUtil.isWnl) {
		if (WNLUtil.isIOS) {
			_czc.push(['_trackEvent','qingming2017_click_wnl', 'view', 'ios']);
		}else if (WNLUtil.isAndroid) {
			_czc.push(['_trackEvent','qingming2017_click_wnl_az', 'view', 'az']);
		}
	};

    var arr = ['每个人所见所遇到的都早有安排，一切都是缘。缘起缘灭，缘聚缘散，一切都是天意。','今生种种皆是前生因果。世间万物皆空。唯其空，便能包容万物。','菩提本非树，明镜亦无台。本来无一物，何处染尘埃。','人生有八苦：生，老，病，死，爱别离，怨长久，求不得，放不下。唯有身心放空，方能人离难，难离身，一切灾殃化为尘。','笑着面对，不去埋怨。悠然，随心，随性，随缘。注定让一生改变的，只在百年后，那一朵花开的时间。'];
    $('.page1').find('.plant').click(function() {
		if(localStorage.getItem('masteUser') === userId) {
			userId = localStorage.getItem('masteUser');
		} else {
			userId = unique();
		}

        $.ajax({
            url: 'https://msg.51wnl.com/api/Active/getRank?userid=' + userId,
            type: 'post',
            success: function(response) {
                var text = $.parseJSON(response);
                $('.page2').find('.num').text(text['num']);
				$('.page2').find('.text').text(arr[Math.floor(Math.random()*5+1)]);
				$('.page1').addClass('hidden');
				$('.page2').removeClass('hidden');
			}		
		})
    });

    //点击再种一株
    $('.page2').find('.again').click(function() {
        $('.page2').addClass('hidden');
        $('.page1').removeClass('hidden');
        //userId = unique();
    });

    //点击分享
    $('.page2').find('.share').click(function() {
        //分享之后...
		if (WNLUtil.isWnl) {
			if ((WNLUtil.isIOS && WNLUtil.appVersion <= 450) || (WNLUtil.isAndroid && WNLUtil.appVersion <= 451)) {
				WNLUtil.setShareDataOld({
					pureText: share.title,
					text: share.title,
					image: '0',
					url: share.link,
					targetUrl: share.link,
					imageURL: share.imgUrl
				});
				//分享埋点
				if (WNLUtil.isIOS) {
					_czc.push(['_trackEvent','foolday2017_oldshare_ios', 'click']);
				}else if (WNLUtil.isAndroid) {
					_czc.push(['_trackEvent','foolday2017_oldshare_android', 'click']);
				}
				}else {
					$('.sharemask, .wnl-sharetool').removeClass('hidden');
					setWnlShare(shareOB);
					if (WNLUtil.isIOS) {
						_czc.push(['_trackEvent','foolday2017_newshare_ios', 'click']);
				}else if (WNLUtil.isAndroid) {
						_czc.push(['_trackEvent','foolday2017_newshare_android', 'click']);
						}
					}
				}
				else if (WNLUtil.isWeixin) {
					if (WNLUtil.isIOS) {
						_czc.push(['_trackEvent', 'foolday2017_wxsharebtn_ios', 'click']);
					} else if (WNLUtil.isAndroid) {
						_czc.push(['_trackEvent', 'foolday2017_wxsharebtn_android', 'click']);
					}
					$('.showShareMask').removeClass('hidden');//移除分享列表
				};
			share.title = '我种下了第'+ $('.page2').find('.num').text() +'株佛心莲，它代表了……';
			share.friendTitle = '我种下了第'+ $('.page2').find('.num').text() +'株佛心莲';
			share.desc = '它代表的竟然是……';
			//share.link = '';
			setShareInfo();
    })

    //万年历分享工具设置
    $('.showShareMask').click(function(){
		$(this).addClass('hidden');
	});

	$('.sharemask, .cancle-share').click(function(){
		$('.sharemask, .wnl-sharetool').addClass('hidden');
	});

	wx.ready(function() {  //微信分享
		setShareInfo();
	});
})

	


function setShareInfo() {
	//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
	wx.onMenuShareTimeline({
		title: share.title, // 分享标题
		link: share.link, // 分享链接
		imgUrl: share.imgUrl, // 分享图标
		success: function () {
			// 用户确认分享后执行的回调函数
			_czc.push(['_trackEvent', 'foolday2017_wxshare_timeline', 'click']);//统计分享次数，后台可查看
		},
		cancel: function () {
			// 自定义用户取消分享后执行的回调函数
		}
	});

	//获取“分享给朋友”按钮点击状态及自定义分享内容接口
	wx.onMenuShareAppMessage({
		title: share.friendTitle, // 分享标题(引用分享给朋友之后的标题)
		desc: share.desc, // 分享描述
		link: share.link, // 分享链接
		imgUrl: share.imgUrl, // 分享图片地址
		//type: '', // 分享类型,music、video或link，不填默认为link
		//dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		success: function () {
			// 用户确认分享后执行的回调函数
			$('.showShareMask').addClass('hidden');
			_czc.push(['_trackEvent', 'foolday2017_wxshare_appmessage', 'click']);
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
			_czc.push(['_trackEvent', 'foolday2017_wxshare_qq', 'click']);
		},
		cancel: function () {
			// 用户取消分享后执行的回调函数
		}
	});
}

function shareCallback(state) {
	$('.sharemask, .wnl-sharetool').addClass('hidden');
	if (WNLUtil.isAndroid) {
		_czc.push(['_trackEvent', 'foolday2017_appshare_android', 'click']);
	}
	else if (WNLUtil.isIOS) {
		_czc.push(['_trackEvent', 'foolday2017_appshare_ios', 'click']);
	}
}

function showWnlShareTool(){
	$('.sharemask, .wnl-sharetool').removeClass('hidden');
	setWnlShare(shareOB);
}

function setWnlShare(param){
	if (typeof param == 'string') {
		$('.weixin').click(function(){
			WNLUtil.setShareDataForImage('weixin', param);
			window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
		});
		$('.weixin_circle').click(function(){
			WNLUtil.setShareDataForImage('weixin_circle', param);
			window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
		});
		$('.qq').click(function(){
			WNLUtil.setShareData('qq', {
				title: share.title,
				text: share.title,
				image: param,
				url: share.link
			});
			window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
		});
		$('.weibo').click(function(){
			WNLUtil.setShareDataForImage('sina', param);
			window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
		});
	}else if (typeof param == 'object') {
		$('.weixin').click(function(){
			WNLUtil.setShareData('weixin', {
				title: share.title,
				text: share.desc,
				image: share.imgUrl,
				url: share.link
			});
			window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
		});
		$('.weixin_circle').click(function(){
			WNLUtil.setShareData('weixin_circle', {
				title: share.title,
				text: share.desc,
				image: share.imgUrl,
				url: share.link
			});
			window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
		});
		$('.qq').click(function(){
			WNLUtil.setShareData('qq', {
				title: share.title,
				text: share.desc,
				image: share.imgUrl,
				url: share.link
			});
			window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
		});
		$('.weibo').click(function(){
			WNLUtil.setShareData('sina', {
				title: share.title,
				text: share.desc,
				image: share.imgUrl,
				url: share.link
			});
			window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
		});
	}
}

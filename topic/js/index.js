window.share = {
    title: '邀请参与话题讨论',
    desc: '爱情究竟应该是两个人互补还是相似呢?',
    link: 'http://192.168.2.19:81/topic/index.html?share=1',
    imgUrl: 'http://192.168.2.19/topic/img/share.png'
};
var shareOB = window.share;
function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r !== null) {
		return decodeURIComponent(r[2]);
	}
	return null;
}

//时间转换
function getDateDiff(dateTimeStamp){
	var minute = 1000 * 60;
	var hour = minute * 60;
	var day = hour * 24;
	var halfamonth = day * 15;
	var month = day * 30;
	var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
	// var diffValue = now - 1502164549123;    
	if(diffValue < 0){return;}
	var monthC =diffValue/month;
	var weekC =diffValue/(7*day);
	var dayC =diffValue/day;
	var hourC =diffValue/hour;
	var minC =diffValue/minute;
	if(monthC>=1){
		result="" + parseInt(monthC) + "月前";
	}
	else if(weekC>=1){
		result="" + parseInt(weekC) + "周前";
	}
	else if(dayC>=1){
		result=""+ parseInt(dayC) +"天前";
	}
	else if(hourC>=1){
		result=""+ parseInt(hourC) +"小时前";
	}
	else if(minC>=1){
		result=""+ parseInt(minC) +"分钟前";
	}else
	result="刚刚";
	return result;
}

//标准时间转换为时间戳
function getDateTimeStamp(dateStr){
 return Date.parse(dateStr.replace(/-/gi,"/")); 
}

$(function() {
    FastClick.attach(document.body);
    var ua=navigator.userAgent.toLocaleLowerCase();
    var wnl=ua.indexOf("wnl")>-1;
    var wx=ua.indexOf("micromessenger")>-1;
    var isIOSPhone=ua.indexOf("iphone")>-1||ua.indexOf("ipod")>-1;
    var isIOS=isIOSPhone||ua.indexOf("ipad")>-1;
    var isAndroid=ua.indexOf("android")>-1;
    var isWP=ua.indexOf("windows phone")>-1;
    if(wx) {
        $('.llsBanner').show()
    } else {
        $('.llsBanner').hide()        
    }

    var jl = $('.v').width() - 140;
    $.ajax({
        url:'http://lilith.51wnl.com//GetTopicsInfo?tid=10035&uid=10001&cid=Youloft_IOS&tkn=6480F2A608958030D190E9E62590174A ',
        type:'get',
        success: function(respond) {
            var text1 = respond.data.option[0].title,text2 = respond.data.option[1].title;
            var sum1 = respond.data.option[0].vote,sum2 = respond.data.option[1].vote;
            $('.xs').html(respond.data.option[0].shortTitle);
            $('.hb').html(respond.data.option[1].shortTitle);            
            $('.problem').css('background','url(' +respond.data.backImg+')');
            // $('.problem').find('p').html('#爱情，应该是互补还是相似的两个人在一起呢?');
            $('.problem').find('p').html(respond.data.title);            
            $('.change .right1').css('width',sum2*jl/(sum1 + sum2));
            $('.change .right').css({'backgroundColor':'rgb(27,170,169)','width':sum2*jl/(sum1 + sum2)});
            
            $('.left').animate({
                width: sum1*jl/(sum1 + sum2) + 'px'
            },1000);
             $('.right1').animate({
                width: 0
            },1000);
            console.log(text1);
            localStorage.setItem('t1',text1);
            localStorage.setItem('t2',text2);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus);
                }
    })

    $.ajax({
        url:'http://lilith.51wnl.com//GetVoteList?tid=10035&skip=1&cid=Youloft_IOS&tkn=6480F2A608958030D190E9E62590174A ',
        type:'get',
        success:function(respond) {
            var html = '',xb = '',xz='',hf = '',hf_more = '',dzclass = '',dzimg = '',option = '';
            for (let i = 0; i < respond.data.length; i ++) {
                if(respond.data[i].topicOptionId%2 == 0) {
                    option = '<div class="tp_blue">投票给：'+localStorage.getItem('t2')+'</div>';
                } else {
                    option = '<div class="tp">投票给：'+localStorage.getItem('t1')+'</div>';
                };                
                if(respond.data[i].sex == '1') {
                    xb = 'fe'   //女性
                } else {
                    xb = ''  //男性
                };
                function getXz(n) {
                    switch (n) {
                        case 0:
                            xz = ''
                            break;
                        case 1:
                            xz = '水瓶座'
                            break;
                        case 2:
                            xz = '双鱼座'
                            break;
                        case 3:
                            xz = '白羊座'
                            break;
                        case 4:
                            xz = '金牛座'
                            break;
                        case 5:
                            xz = '双子座'
                            break;
                        case 6:
                            xz = '巨蟹座'
                            break;
                        case 7:
                            xz = '狮子座'
                            break;
                        case 8:
                            xz = '处女座'
                            break;
                        case 9:
                            xz = '天秤座'
                            break;
                        case 10:
                            xz = '天蝎座'
                            break;
                        case 11:
                            xz = '射手座'
                            break;
                        case 12:
                            xz = '摩羯座'
                            break;
                    }
                        return xz;
                }
                
                if(respond.data[i].reply === 0) {
                    hf = '回复';
                    hf_more = '';
                } else if(respond.data[i].reply === 1) {
                    hf = 1;
                    hf_more = '<div class="pl"><p>' + respond.data[i].replyList[0].nickName + ':'+respond.data[i].replyList[0].contents + '</p></div>';
                } else if(respond.data[i].reply === 2) {
                    hf = 2;
                    hf_more = '<div class="pl"><p>' + respond.data[i].replyList[0].nickName+':'+respond.data[i].replyList[0].contents + '</p>' + '<p>' + respond.data[i].replyList[1].nickName+':'+respond.data[i].replyList[1].contents + '</p></div>';
                } else if(respond.data[i].reply === 3) {
                    hf = 3;
                    hf_more = '<div class="pl"><p>' + respond.data[i].replyList[0].nickName+':'+respond.data[i].replyList[0].contents + '</p>' + '<p>' + respond.data[i].replyList[1].nickName+':'+respond.data[i].replyList[1].contents + '</p>' + '<p>' + respond.data[i].replyList[2].nickName+':'+respond.data[i].replyList[2].contents + '</p></div>';
                } else{
                    hf = respond.data[i].reply;
                    hf_more = '<div class="pl"><p>' + respond.data[i].replyList[0].nickName+':'+respond.data[i].replyList[0].contents + '</p>' + '<p>' + respond.data[i].replyList[1].nickName+':'+respond.data[i].replyList[1].contents + '</p>' + '<p>' + respond.data[i].replyList[2].nickName+':'+respond.data[i].replyList[2].contents + '</p>' + '<p>查看全部评论' + respond.data[i].reply + '条</p></div>';
                    
                }
                if(respond.data[i].zan > 0) {
                    dzclass = 'dzchange';
                    dzimg = 'img/topic-liking-icon@2x.png';
                } else {
                    dzclass = '';
                    dzimg = 'img/topic-like-icon@2x.png';                                        
                }
                // console.log(getDateDiff(getDateTimeStamp(respond.data[i].buildDate)))
                html += '<div class="person"><div class="user_head"><img src="'+respond.data[i].headImg+'"></div><div class="zl"><div class="xq"><p class="username">'+respond.data[i].nickName+'</p><p class="xz"><img src="img/topic-'+xb+'male-icon@2x.png" alt=""><span class="user_xz">'+getXz(respond.data[i].signs)+'</span></p></div><div class="time"><span>'+getDateDiff(getDateTimeStamp(respond.data[i].buildDate))+'</span></div><div class="none"></div>'+option+'<div class="gd">'+respond.data[i].viewpoint+'</div><div class="dz"><img src="'+dzimg+'" alt="" class="dz_icon"><span class="dz_count '+dzclass+'">'+respond.data[i].zan+'</span></div><div class="hf"><img src="img/topic-talking-icon@2x.png" alt="" class="hf_icon"><span class="hf_count">'+hf+'</span></div>'+hf_more+'</div></div><hr size="1" style="opacity:0.3"/>'
                
            };
            $('.content').append(html); 
            $('.content').find('hr').eq($('.person').length - 1).remove();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
        }
    })
    
   
    // $('.more').on('touchstart',function() {
    //     $('.content').append('<hr size="1" style="opacity:0.3"/>');
    //     $(this).hide();         
    //      $.ajax({
    //         url:'http://lilith.51wnl.com//GetVoteList?tid=10004&skip=1&cid=Youloft_IOS&tkn=6480F2A608958030D190E9E62590174A ',
    //         type:'get',
    //         success:function(respond) {
    //             console.log(respond.data);
    //             var html = '',xb = '',xz='',hf = '',hf_more = '',dzclass = '',dzimg = '';
    //             for (let i = 5; i < respond.data.length; i ++) {
    //                 if(respond.data[i].sex == '1') {
    //                     xb = 'fe'   //女性
    //                 } else {
    //                     xb = ''  //男性
    //                 };
    //                 function getXz(n) {
    //                     switch (n) {
    //                         case 0:
    //                             xz = ''
    //                             break;
    //                         case 1:
    //                             xz = '水瓶座'
    //                             break;
    //                         case 2:
    //                             xz = '双鱼座'
    //                             break;
    //                         case 3:
    //                             xz = '白羊座'
    //                             break;
    //                         case 4:
    //                             xz = '金牛座'
    //                             break;
    //                         case 5:
    //                             xz = '双子座'
    //                             break;
    //                         case 6:
    //                             xz = '巨蟹座'
    //                             break;
    //                         case 7:
    //                             xz = '狮子座'
    //                             break;
    //                         case 8:
    //                             xz = '处女座'
    //                             break;
    //                         case 9:
    //                             xz = '天秤座'
    //                             break;
    //                         case 10:
    //                             xz = '天蝎座'
    //                             break;
    //                         case 11:
    //                             xz = '射手座'
    //                             break;
    //                         case 12:
    //                             xz = '摩羯座'
    //                             break;

    //                     }
    //                         return xz;
    //                 }
                    
    //                 if(respond.data[i].reply === 0) {
    //                     hf = '回复';
    //                     hf_more = '';
    //                 } else if(respond.data[i].reply === 1) {
    //                     hf = 1;
    //                     hf_more = '<p>' + respond.data[i].replyList[0].nickName + ':'+respond.data[i].replyList[0].contents + '</p>';
    //                 } else if(respond.data[i].reply === 2) {
    //                     hf = 2;
    //                     hf_more = '<p>' + respond.data[i].replyList[0].nickName+':'+respond.data[i].replyList[0].contents + '</p>' + '<p>' + respond.data[i].replyList[1].nickName+':'+respond.data[i].replyList[1].contents + '</p>';
    //                 } else if(respond.data[i].reply === 3) {
    //                     hf = 3;
    //                     hf_more = '<p>' + respond.data[i].replyList[0].nickName+':'+respond.data[i].replyList[0].contents + '</p>' + '<p>' + respond.data[i].replyList[1].nickName+':'+respond.data[i].replyList[1].contents + '</p>' + '<p>' + respond.data[i].replyList[2].nickName+':'+respond.data[i].replyList[2].contents + '</p>';
    //                 } else{
    //                     hf = respond.data[i].reply;
    //                     hf_more = '<p>' + respond.data[i].replyList[0].nickName+':'+respond.data[i].replyList[0].contents + '</p>' + '<p>' + respond.data[i].replyList[1].nickName+':'+respond.data[i].replyList[1].contents + '</p>' + '<p>' + respond.data[i].replyList[2].nickName+':'+respond.data[i].replyList[2].contents + '</p>' + '<p>查看全部评论' + respond.data[i].reply + '条';
                        
    //                 }
    //                 if(respond.data[i].zan > 0) {
    //                     dzclass = 'dzchange';
    //                     dzimg = 'img/topic-liking-icon@2x.png';
    //                 } else {
    //                     dzclass = '';
    //                     dzimg = 'img/topic-like-icon@2x.png';                                        
    //                 }
    //                 html += '<div class="person"><div class="user_head"><img src="'+respond.data[i].headImg+'"></div><div class="zl"><div class="xq"><p class="username">'+respond.data[i].nickName+'</p><p class="xz"><img src="img/topic-'+xb+'male-icon@2x.png" alt=""><span class="user_xz">'+getXz(respond.data[i].signs)+'</span></p></div><div class="time"><span>'+getDateDiff(getDateTimeStamp(respond.data[i].buildDate))+'</span></div><div class="none"></div> <div class="tp">投票给：相似更好，因为可以更好地理解对方</div> <div class="gd">'+respond.data[i].viewpoint+'</div><div class="dz"><img src="'+dzimg+'" alt="" class="dz_icon"><span class="dz_count '+dzclass+'">'+respond.data[i].zan+'</span></div><div class="hf"><img src="img/topic-talking-icon@2x.png" alt="" class="hf_icon"><span class="hf_count">'+hf+'</span></div>'+hf_more+'</div></div><hr size="1" style="opacity:0.3"/>'
                    
    //             };
    //             $('.content').append(html); 
    //             $('.content').find('hr').eq($('.person').length - 1).remove();                
    //         }
    //     })
    // })


    //点击分享
    $('.sharemask, .cancle-share').click(function() {
        $('.sharemask, .wnl-sharetool').addClass('hidden');
    });
    if (WNLUtil.isWnl) {
        if ((WNLUtil.isIOS && WNLUtil.appVersion <= 450) || (WNLUtil.isAndroid && WNLUtil.appVersion <= 451)) {
            WNLUtil.setShareDataOld({
                pureText: share.title,
                text: share.desc,
                image: '0',
                url: share.link,
                targetUrl: share.link,
                imageURL: share.imgUrl
            });
            //分享埋点
            if (WNLUtil.isIOS) {
                _czc.push(['_trackEvent', 'test2017_oldshare_ios', 'click']);
            } else if (WNLUtil.isAndroid) {
                _czc.push(['_trackEvent', 'test2017_oldshare_android', 'click']);
            }
        } else {
            setWnlShare(shareOB);
            if (WNLUtil.isIOS) {
                _czc.push(['_trackEvent', 'test2017_newshare_ios', 'click']);
            } else if (WNLUtil.isAndroid) {
                _czc.push(['_trackEvent', 'test2017_newshare_android', 'click']);
            }
        }
    } else if (WNLUtil.isWeixin) {
        if (WNLUtil.isIOS) {
            _czc.push(['_trackEvent', 'test2017_wxsharebtn_ios', 'click']);
        } else if (WNLUtil.isAndroid) {
            _czc.push(['_trackEvent', 'test2017_wxsharebtn_android', 'click']);
        }
        $('.showShareMask').removeClass('hidden'); //移除分享列表
    }
})

function shareCallback(state) {
    $('.sharemask, .wnl-sharetool').addClass('hidden');
    if (WNLUtil.isAndroid) {
        _czc.push(['_trackEvent', 'test2017_appshare_android', 'click']);
    } else if (WNLUtil.isIOS) {
        _czc.push(['_trackEvent', 'test2017_appshare_ios', 'click']);
    }
}

function showWnlShareTool() {
    $('.sharemask, .wnl-sharetool').removeClass('hidden');
    setWnlShare(shareOB);
}

function setWnlShare(param) {
    if (typeof param == 'string') {
        $('.weixin').click(function() {
            WNLUtil.setShareDataForImage('weixin', param);
            window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
        });
        $('.weixin_circle').click(function() {
            WNLUtil.setShareDataForImage('weixin_circle', param);
            window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
        });
        $('.qq').click(function() {
            // WNLUtil.setShareData('qq', {
            // 	title: share.title,
            // 	text: share.title,
            // 	image: param,
            // 	url: share.link
            // });
            // window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
            WNLUtil.setShareDataForImage('qq', param);
            window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
        });
        $('.weibo').click(function() {
            if (WNLUtil.isIOS) {
                WNLUtil.setShareDataForImage('sina', param);
                window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
            } else if (WNLUtil.isAndroid) {
                WNLUtil.setShareDataForSina('sina', param);
                window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
                // WNLUtil.setShareData('sina', {
                //     title: share.title,
                //     text: share.title+share.link,
                //     image: share.imgUrl,
                //     url: share.link
                // });
                // window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
            }
            // android 4.6.3 不支持直接分享图片了。。。下个版本改回来
            // WNLUtil.setShareDataForSina('sina', param);
            // window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
        });
    } else if (typeof param == 'object') {
        $('.weixin').click(function() {
            WNLUtil.setShareData('weixin', {
                title: share.title,
                text: share.desc,
                image: share.imgUrl,
                url: share.link
            });
            window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
        });
        $('.weixin_circle').click(function() {
            WNLUtil.setShareData('weixin_circle', {
                title: share.title,
                text: share.desc,
                image: share.imgUrl,
                url: share.link
            });
            window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
        });
        $('.qq').click(function() {
            WNLUtil.setShareData('qq', {
                title: '',
                text: share.desc,
                image: share.imgUrl,
                url: share.link
            });
            window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
        });
        $('.weibo').click(function() {
            if (WNLUtil.isIOS) {
                WNLUtil.setShareData('sina', {
                    title: '',
                    text: share.desc,
                    image: share.imgUrl,
                    url: share.link
                });
                window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
            } else if (WNLUtil.isAndroid) {
                WNLUtil.setShareData('sina', {
                    title: share.title,
                    text: share.title + share.link,
                    image: share.imgUrl,
                    url: share.link
                });
                window.location.href = 'protocol://share#' + encodeURIComponent(JSON.stringify(WNLUtil.shareObject));
            }
        });
    }
}
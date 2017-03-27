

window.share = {
	title : '热门游戏推荐',//设置分享的题目
	friendTitle : '2017最热门的在线手机游戏！占领排行榜的超热门！',//分享之后显示的题目
	link : 'https://b.cqyouloft.com/gamecenter/album.html?share=1',//分享链接
	imgUrl : 'https://b.cqyouloft.com/gamecenter/img/share.jpg',//图片的链接
	desc : '2017最火游戏！不能不玩的游戏合集！'//附加的描述信息
};
var shareOB = window.share,shareImage;

$(function() {
    FastClick.attach(document.body);
    var arr = ['每个人所见所遇到的都早有安排，一切都是缘。缘起缘灭，缘聚缘散，一切都是天意。','今生种种皆是前生因果。世间万物皆空。唯其空，便能包容万物。','菩提本非树，明镜亦无台。本来无一物，何处染尘埃。','人生有八苦：生，老，病，死，爱别离，怨长久，求不得，放不下。唯有身心放空，方能人离难，难离身，一切灾殃化为尘。','笑着面对，不去埋怨。悠然，随心，随性，随缘。注定让一生改变的，只在百年后，那一朵花开的时间。'];

    $('.page1').find('.plant').click(function() {
        $('.page2').find('.text').text(arr[Math.floor(Math.random()*5+1)]);
        $('.page1').addClass('hidden');
        $('.page2').removeClass('hidden');
    });


    $('.page2').find('.again').click(function() {
        $('.page2').addClass('hidden');
        $('.page1').removeClass('hidden');
    })
})
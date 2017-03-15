$(function () {
    var setInit = {
        'ulIdName':'',
        'nextTime': 2000,
        'i'        : 0,
        'n'        : 0,
        'liLengh' : null,
        'ulWidth' : null,
        'width'   : document.body.clientWidth,
        'nIndex'  : null,
        'underDot': null,
        'largeYes'  : null,
    }
    //初始化数据
    var time = 600;
    setInit.nextTime = 2000;
    setInit.ulIdName = 'div_ul';
    setInit.liLengh = $('#'+setInit.ulIdName+'>li').length;
    setInit.ulWidth = 100 *  setInit.liLengh;
    setInit.underDot = 'dot_banner';
    // setInit.largeYes = 'yes'          //屏幕大于1920的时候拉伸平铺图片

    setClass(setInit.i,setInit.ulIdName,setInit.ulWidth,setInit.width,setInit.underDot,setInit.largeYes);
    setSpan(setInit.liLengh,setInit.underDot);
    $('#'+setInit.underDot+'>span').eq(0).addClass('dot_opacity').siblings('span').removeClass('dot_opacity');
    //变化窗口自适应
    $(window).resize(function () {
        setInit.width = document.body.clientWidth;
        setClass(setInit.i,setInit.ulIdName,setInit.ulWidth,setInit.width,setInit.underDot,setInit.largeYes)
    })

    //滚动执行
    var setGo = setInterval(antoPlay,setInit.nextTime);
    //鼠标悬停
    $('#'+setInit.underDot+'>span').hover(function () {
        $(this).addClass('dot_opacity').siblings('span').removeClass('dot_opacity');
        setInit.i = $(this).index();
        animateGo(setInit.ulIdName,setInit.i,time);
        clearInterval(setGo);
        $(setInit.ulIdName).stop();
    },function () {
        setGo = setInterval(antoPlay,setInit.nextTime);
    });
    //自动运行banner图片函数
    function antoPlay() {
        setInit.i++;
        if(setInit.i >= setInit.liLengh){
            setInit.i = 0;
        }
        animateGo(setInit.ulIdName,setInit.i,time);
        $('#'+setInit.underDot+'>span').eq(setInit.i).addClass('dot_opacity').siblings('span').removeClass('dot_opacity');
    }
})


function setSpan(le,underDot) {
    for(var t=0;t<le;t++){
        $('#'+underDot).append("<span></span>")
    }
}
function setClass(i,IdName,ulWidth,width,dot_span,largeYes) {
    $('#'+IdName).css('width',ulWidth +'%');
    $('#'+IdName).children('li').css('width',width).each(function () {
        var data_bg = $(this).children('a').attr('data_bg');
        $('#'+dot_span+'>span').eq(i).addClass('dot_opacity').siblings('span').removeClass('dot_opacity');
        $(this).children('a').css({'background':"url("+data_bg+") no-repeat center 0"});
        if(largeYes === "yes"){
            if(width >1920){
                $(this).children('a').css({'background':"url("+data_bg+") no-repeat center 0","backgroundSize":"100% 100%"});
            }
        }
    });
}
function animateGo(IdName,i,time,type) {
    if(!type){
        var n = i*100;
        $('#'+IdName).animate({'left':'-'+n+'%'},time)
    }else {
        //
    }
}

/*轮播图 函数封装*/
//固定classname
// li.className:loop_play  li active.className:lpactive
// points.className:loop_play_point   points active.className:lppactive
// Btn  goPre.className:goPre    goNext.className:goNext
function loopplay(intervalTime) {//intervalTime 是每隔time秒播放下一张
    var lis = document.querySelectorAll('.loop_play');//获取图片
    var pointfather = document.querySelector('#loop_play_points');
    var goPreBtn = document.querySelector('.goPre');//获取   向前按钮
    var goNextBtn = document.querySelector('.goNext');//获取  向后按钮
    var time = 0;//设置开关  用于手动点击下一张时，重置播放时间
    var cutTime = 100;//对intervalTime 分成intervalTime / cutTime 段
    var index = 0;//
    (function CreatePoints() {//动态创建points  这是一个立即执行函数
        for(let i = 0;i < lis.length; i++) {
            if (i === 0) {
                var points = '<li class="loop_play_point lppactive" data-index="'+i+'"></li>';
                pointfather.insertAdjacentHTML('beforeend', points);
            } else {
                var points = '<li class="loop_play_point" data-index="'+i+'"></li>';
                pointfather.insertAdjacentHTML('beforeend', points);
            }
        }
    })();
    pointfather.addEventListener('click',function (e) {//事件委托  给points   注册事件  然后冒泡上去
        if(e.target.tagName === "LI"){//判断点击的 是否为  li标签   是才继续执行
            index = e.target.getAttribute('data-index');//获取  第几个
            goIndex();
        }
    });
    function clearActive() {//对类名 全部清除   清除之后再添加
        for(let i = 0;i < lis.length;i++){
            lis[i].className = 'loop_play';
            pointfather.children[i].className = 'loop_play_point';
        }
    }
    function goIndex() {
        clearActive();//每次播放下一张时  重置类名
        time = 0;//重置时间
        lis[index].className = 'loop_play lpactive';
        pointfather.children[index].className = 'loop_play_point lppactive';
    }
    var goNext = function(){//对index进行赋值  播放下一张或第一张
        if(index < lis.length-1){
            index++;
        }
        else{
            index = 0;
        }
        goIndex();
    };
    var goPre = function(){//对index进行赋值  播放上一张或最后一张
        if(index === 0){
            index = lis.length-1;
        }
        else{
            index--;
        }
        goIndex();
    };
    goPreBtn.addEventListener('click',function () {
        goPre();
    });
    goNextBtn.addEventListener('click',function () {
        goNext();
    });
    setInterval(function () {//每隔intervaTime秒执行goNext()函数
        time++;
        if(time === (intervalTime / cutTime)){//对time判断
            goNext();
            time = 0 ;
        }
    },cutTime);
    //轮播图  动态获取
    Ajax('JSON').get("http://musicapi.leanapp.cn/banner?type=0",function (url) {
        for(let i = 0;i < lis.length;i++){
            lis[i].style.background = 'url("'+url.banners[i].picUrl+'") no-repeat';
            lis[i].style.backgroundSize = 'cover';
        }
    });
}
loopplay(2000);//传入是每隔time秒播放下一张  的 参数
/////////////////////////////轮播图  函数封装结束  目前只有一个参数intervalTime  (播放时间)

///show  函数封装
function Show(myClassName) {
    var obj  = document.querySelector(""+myClassName+"");//获取类 对象
    obj.style.display = 'block';//对css样式 修改
    obj.style.zIndex = '10';
    obj.style.opacity = '1';
}
function Hide(myClassName) {
    var obj  = document.querySelector(" "+myClassName+" ");//获取类 对象
    obj.style.display = 'none';//对css样式修改
    obj.style.zIndex = '-10';
    obj.style.opacity = '0';
}

//登录页面点击  关闭按钮
var clickClose = document.querySelector('.click_close');
var clickShow = document.querySelector('.click_show');
var loginbox1 = document.querySelector('.loginbox1');
loginbox1.addEventListener('click',function () {
    Show('.login_box');//显示 总登录框
    Show('.login_container');//显示选择登录框
    Hide('.login_goback');//此时在 总登录框中   无需返回按钮出现
    Hide('.em_container');//隐藏手机号登录 框
    Hide('.mb_container');//隐藏邮箱号登录 框
});
clickShow.addEventListener('click',function () {
    Show('.login_box');//显示 总登录框
    Show('.login_container');//显示选择登录框
    Hide('.login_goback');//此时在 总登录框中   无需返回按钮出现
    Hide('.em_container');//隐藏手机号登录 框
    Hide('.mb_container');//隐藏邮箱号登录 框
});
clickClose.addEventListener('click',function () {
    Hide('.login_box');
});

//login总登录框    点击 返回
//
var login_goback = document.querySelector('.login_goback');
login_goback.addEventListener('click',function () {
    clickShow.click();//执行一次登录  字体点击   不用在去执行函数;
});

//登录页面点击  显示
var mb_login = document.querySelector('.mobile_login');
var em_login = document.querySelector('.email_login');
mb_login.addEventListener('click',function () {//点击手机号登录
    Hide('.login_container');//隐藏总  登录框
    Hide('.em_container');//隐藏  邮箱登录框
    Show('.mb_container');//显示  手机号登录框

    Show('.login_goback');//显示  返回按钮
});
em_login.addEventListener('click',function () {
    Hide('.login_container');
    Hide('.mb_container');
    Show('.em_container');

    Show('.login_goback');
});//此注释更以上注释一样  这里不再重复说明

//封装一个  清除value的函数
// 行内框 value 清空
function clearValue(myClassName) {
    document.querySelector(""+myClassName+"").value = '';
}

///手机号登录
var loginCode = null;//用于判断登录状态
var mbbtn = document.querySelector('.mbbtn');
mbbtn.addEventListener('click',function () {
    var mbnum = document.querySelector('.mbnum').value;//获取手机号
    var mbpass = document.querySelector('.mbpass').value;//获取密码
   Ajax('JSON').get("http://musicapi.leanapp.cn/login/cellphone?phone="+mbnum+"&password="+mbpass+"",function (data) {
       loginCode = data.code;//得到code  用于判定登录状态
        if(loginCode === 200){//密码正确 登录成功
            Hide('.login1');
            Show('.login2');
            Hide('.click_show');//隐藏 登录 这两个体  让头像显示
            Show('.suce_login');
            document.querySelector('.suce_login').style.background = 'url('+data.profile.avatarUrl+') no-repeat';  //通过api获取账号的头像背景
            document.querySelector('.suce_login').style.backgroundSize = 'cover';////更换头像
            clearValue('.mbnum');//登录成功后 清除input框
            clearValue('.mbpass');
            clickClose.click();//同时关闭  登录框   即用函数模拟手动 点击，，执行一次  关闭事件
        }
        else {
            alert("账号或密码错误");//账号或密码错误
            document.querySelector('.mbpass').value = '';//清空 密码 框
        }
   });
});
///邮箱登录    //////注释跟 手机号 注释一样  这里就不重复注释
var embtn = document.querySelector('.embtn');
embtn.addEventListener('click',function () {
    var emnum = document.querySelector('.emnum').value;
    var empass = document.querySelector('.empass').value;
    Ajax('JSON').get("http://musicapi.leanapp.cn/login?email="+emnum+"&password="+empass+"",function (data) {
        loginCode = data.code;
        if(loginCode === 200){
            document.querySelector('.click_show').style.display = 'none';
            document.querySelector('.suce_login').style.display = 'block';
            document.querySelector('.suce_login').style.background = 'url('+data.profile.avatarUrl+') no-repeat';
            document.querySelector('.suce_login').style.backgroundSize = 'cover';
            clickClose.click();
            document.querySelector('.emnum').value = '';
            document.querySelector('.empass').value = '';
        }
        else {
            alert("账号或密码错误");
            document.querySelector('.empass').value = '';
        }
    });
});

//榜单 动态获取   函数封装

rank('.risesongs',3);//飙升榜
rank('.newsong',0);
rank('.originsongs',2);
function rank(myClassName,id) {
    var songs = document.querySelectorAll(""+myClassName+"");
    Ajax('JSON').get("http://musicapi.leanapp.cn/top/list?idx="+id+"",function (data) {
        if(data.code === 200){
            for(let i = 0;i < songs.length;i++){
                songs[i].lastChild.innerHTML= ''+data.playlist.tracks[i].name+'';
                songs[i].firstChild.setAttribute('data-id',data.playlist.tracks[i].id);
            }
        }
    });
}

//给rank 播放按钮注册  播放事件
function rp(myId) {
    var rank = document.querySelector(""+myId+"");//事件委托
    rank.addEventListener('click',function (e) {
        var id = e.target.getAttribute('data-id');
        document.querySelector('#audio').setAttribute('src',"https://music.163.com/song/media/outer/url?id="+id+".mp3")
    });

}
rp('#risesongs');
rp('#newsong');
rp('#originsongs');




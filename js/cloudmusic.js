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
        for (let i = 0; i < lis.length; i++) {
            if (i === 0) {
                var points = '<li class="loop_play_point lppactive" data-index="' + i + '"></li>';
                pointfather.insertAdjacentHTML('beforeend', points);
            } else {
                var points = '<li class="loop_play_point" data-index="' + i + '"></li>';
                pointfather.insertAdjacentHTML('beforeend', points);
            }
        }
    })();
    pointfather.addEventListener('click', function (e) {//事件委托  给points   注册事件  然后冒泡上去
        if (e.target.tagName === "LI") {//判断点击的 是否为  li标签   是才继续执行
            index = e.target.getAttribute('data-index');//获取  第几个
            goIndex();
        }
    });

    function clearActive() {//对类名 全部清除   清除之后再添加
        for (let i = 0; i < lis.length; i++) {
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

    var goNext = function () {//对index进行赋值  播放下一张或第一张
        if (index < lis.length - 1) {
            index++;
        } else {
            index = 0;
        }
        goIndex();
    };
    var goPre = function () {//对index进行赋值  播放上一张或最后一张
        if (index === 0) {
            index = lis.length - 1;
        } else {
            index--;
        }
        goIndex();
    };
    goPreBtn.addEventListener('click', function () {
        goPre();
    });
    goNextBtn.addEventListener('click', function () {
        goNext();
    });
    setInterval(function () {//每隔intervaTime秒执行goNext()函数
        time++;
        if (time === (intervalTime / cutTime)) {//对time判断
            goNext();
            time = 0;
        }
    }, cutTime);
    //轮播图  动态获取
    Ajax('JSON').get("http://musicapi.leanapp.cn/banner?type=0", function (url) {
        for (let i = 0; i < lis.length; i++) {
            lis[i].style.background = 'url("' + url.banners[i].picUrl + '") no-repeat';
            lis[i].style.backgroundSize = 'cover';
        }
    });
}

loopplay(2000);//传入是每隔time秒播放下一张  的 参数
/////////////////////////////轮播图  函数封装结束  目前只有一个参数intervalTime  (播放时间)

//搜索框 跳转
var search = document.querySelector('.search');
search.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        let url = encodeURI("./search.html?keyword=" + search.value + "");//进行编码  防止中文出现乱码
        location.assign("" + url + "");
        search.value = '';
    }
});

// 我的音乐 跳转
var mymusic = document.querySelector('.mymusic');
mymusic.addEventListener('click',function () {
    let url = encodeURI("./like.html");
    location.assign(""+url+"");
});

//登录页面点击  关闭按钮
var clickClose = document.querySelector('.click_close');
var clickShow = document.querySelector('.click_show');
var loginbox1 = document.querySelector('.loginbox1');
loginbox1.addEventListener('click', function () {
    Show('.login_box');//显示 总登录框
    Show('.login_container');//显示选择登录框
    Hide('.login_goback');//此时在 总登录框中   无需返回按钮出现
    Hide('.em_container');//隐藏手机号登录 框
    Hide('.mb_container');//隐藏邮箱号登录 框
});
clickShow.addEventListener('click', function () {
    Show('.login_box');//显示 总登录框
    Show('.login_container');//显示选择登录框
    Hide('.login_goback');//此时在 总登录框中   无需返回按钮出现
    Hide('.em_container');//隐藏手机号登录 框
    Hide('.mb_container');//隐藏邮箱号登录 框
});
clickClose.addEventListener('click', function () {
    Hide('.login_box');
});

//login总登录框    点击 返回
//
var login_goback = document.querySelector('.login_goback');
login_goback.addEventListener('click', function () {
    clickShow.click();//执行一次登录  字体点击   不用在去执行函数;
});

//登录页面点击  显示
var mb_login = document.querySelector('.mobile_login');
var em_login = document.querySelector('.email_login');
mb_login.addEventListener('click', function () {//点击手机号登录
    Hide('.login_container');//隐藏总  登录框
    Hide('.em_container');//隐藏  邮箱登录框
    Show('.mb_container');//显示  手机号登录框

    Show('.login_goback');//显示  返回按钮
});
em_login.addEventListener('click', function () {
    Hide('.login_container');
    Hide('.mb_container');
    Show('.em_container');

    Show('.login_goback');
});//此注释更以上注释一样  这里不再重复说明

///手机号登录
var loginCode = null;//用于判断登录状态
var mbbtn = document.querySelector('.mbbtn');
mbbtn.addEventListener('click', function () {
    var mbnum = document.querySelector('.mbnum').value;//获取手机号
    var mbpass = document.querySelector('.mbpass').value;//获取密码
    Ajax('JSON').get("http://musicapi.leanapp.cn/login/cellphone?phone=" + mbnum + "&password=" + mbpass + "", function (data) {
        if (data.code === 200) {//密码正确 登录成功
            sessionStorage.setItem('data', JSON.stringify(data));
            Hide('.login1');
            Show('.login2');
            Hide('.click_show');//隐藏 登录 这两个体  让头像显示
            Show('.suce_login');
            clearValue('.mbnum');//登录成功后 清除input框
            clearValue('.mbpass');
            clickClose.click();//同时关闭  登录框   即用函数模拟手动 点击，，执行一次  关闭事件

            //更新信息
            document.querySelector('.suce_login').style.background = 'url(' + data.profile.avatarUrl + ') no-repeat';  //通过api获取账号的头像背景
            document.querySelector('.suce_login').style.backgroundSize = 'cover';////更换头像
            document.querySelector('.idpic').style.background = 'url(' + data.profile.avatarUrl + ') no-repeat';
            document.querySelector('.idpic').style.backgroundSize = 'cover';////更换头像
            document.querySelector('.nickname').innerText = "" + data.profile.nickname + "";//获取 名字
            document.querySelector('.eC').innerText = "" + data.profile.eventCount + "";//获取  动态数量
            document.querySelector('.fl').innerText = "" + data.profile.follows + "";//获取  关注  数量
            document.querySelector('.fld').innerText = "" + data.profile.followeds + "";//获取  粉丝  数量
            Ajax('JSON').get("http://musicapi.leanapp.cn/user/detail?uid=" + data.account.id + "", function (leveldata) {
                document.querySelector('.level').innerText = "" + leveldata.level + "";//获取 等级
            })
        } else {
            alert("账号或密码错误");//账号或密码错误
            document.querySelector('.mbpass').value = '';//清空 密码 框
        }
    });
});
///邮箱登录    //////注释跟 手机号 注释一样  这里就不重复注释
var embtn = document.querySelector('.embtn');
embtn.addEventListener('click', function () {
    var emnum = document.querySelector('.emnum').value;
    var empass = document.querySelector('.empass').value;
    Ajax('JSON').get("http://musicapi.leanapp.cn/login?email=" + emnum + "&password=" + empass + "", function (data) {
        loginCode = data.code;
        if (loginCode === 200) {
            document.querySelector('.click_show').style.display = 'none';
            document.querySelector('.suce_login').style.display = 'block';
            document.querySelector('.suce_login').style.background = 'url(' + data.profile.avatarUrl + ') no-repeat';
            document.querySelector('.suce_login').style.backgroundSize = 'cover';
            clickClose.click();
            document.querySelector('.emnum').value = '';
            document.querySelector('.empass').value = '';
        } else {
            alert("账号或密码错误");
            document.querySelector('.empass').value = '';
        }
    });
});

//防止刷新  要再次登录  储存session
if (sessionStorage.getItem('data')) {
    let data = JSON.parse(sessionStorage.getItem('data'));
    if (data.token) {
        Hide('.click_show');//隐藏 登录 这两个字  让头像显示
        Show('.suce_login');
        Hide('.login1');
        Show('.login2');
        clickClose.click();//同时关闭  登录框   即用函数模拟手动 点击，，执行一次  关闭事件
        document.querySelector('.suce_login').style.background = 'url(' + data.profile.avatarUrl + ') no-repeat';  //通过api获取账号的头像背景
        document.querySelector('.suce_login').style.backgroundSize = 'cover';////更换头像
        document.querySelector('.idpic').style.background = 'url(' + data.profile.avatarUrl + ') no-repeat';
        document.querySelector('.idpic').style.backgroundSize = 'cover';////更换头像
        document.querySelector('.nickname').innerText = "" + data.profile.nickname + "";//获取 名字
        document.querySelector('.eC').innerText = "" + data.profile.eventCount + "";//获取  动态数量
        document.querySelector('.fl').innerText = "" + data.profile.follows + "";//获取  关注  数量
        document.querySelector('.fld').innerText = "" + data.profile.followeds + "";//获取  粉丝  数量
        Ajax('JSON').get("http://musicapi.leanapp.cn/user/detail?uid=" + data.account.id + "", function (leveldata) {
            document.querySelector('.level').innerText = "" + leveldata.level + "";//获取 等级
        })
    }
}

//退出登录
var Signout = document.querySelector('.Signout');
Signout.addEventListener('click',function () {
    sessionStorage.removeItem('data');
    Show('.click_show');//隐藏 登录 这两个字  让头像显示
    Hide('.suce_login');
    Show('.login1');
    Hide('.login2');

});

//榜单 动态获取   函数封装
rank('.risesongs', 3);//飙升榜
rank('.newsong', 0);//新歌榜
rank('.originsongs', 2);//原创榜
function rank(myClassName, id) {
    var songs = document.querySelectorAll("" + myClassName + "");
    Ajax('JSON').get("http://musicapi.leanapp.cn/top/list?idx=" + id + "", function (data) {
        if (data.code === 200) {
            for (let i = 0; i < songs.length; i++) {
                songs[i].lastChild.innerHTML = '' + data.playlist.tracks[i].name + '';
                songs[i].firstChild.setAttribute('data-id', data.playlist.tracks[i].id);
            }
        }
        else{
            document.querySelector('.unload').style.opacity = 1;
            setTimeout(function () {
                document.querySelector('.unload').style.opacity = 0;
            },3000);
        }
    });
}

//给rank 播放按钮注册  播放事件
var id;
var Iid
var playlist = document.querySelector('.playlist');//获取  播放历史里的ul
function rp(myId) {
    var rank = document.querySelector("" + myId + "");//事件委托
    rank.addEventListener('click', function (e) {
        if (e.target.tagName === "I") {//事件委托 判断当前点击的是否为  i标签
            id = e.target.getAttribute('data-id');//得到 h5  里 的自定义id
            Iid = e.target.getAttribute('data-id');
            audio.setAttribute('src', "https://music.163.com/song/media/outer/url?id=" + id + ".mp3");
            audio.setAttribute('data-number', "" + playlist.children.length + "");
            Ajax('JSON').get("http://musicapi.leanapp.cn/song/detail?ids=" + id + "", function (songdata) {
                var dt = formatSeconds(songdata.songs[0].dt / 1000);
                for (let i = 0; i < playlist.children.length; i++) {
                    playlist.children[i].className = 'playlists';
                }//给播放历史里的li  清除类名
                let listli = '<li class="playlists playing"><i class="listplay " data-id="' + id + '"></i><h4 class="listname">' + songdata.songs[0].name + '</h4><span class="listsinger">' + songdata.songs[0].ar[0].name + '</span><h6 class="listtime">' + dt + '</h6></li>'
                playlist.insertAdjacentHTML('beforeend', listli);//给播放历史 新增一个当前点击的li
            })
        }
    })
}

rp('#risesongs');
rp('#newsong');
rp('#originsongs');



//播放器 功能
var playpause = document.querySelector('.playpause');
var audio = document.querySelector('#audio');
//给playlists  的播放按钮 注册事件
if (document.querySelectorAll('.playlists')) {//判断 是否存在播放历史 里的li
    playlist.addEventListener('click', function (e) {//给播放历史里的播放按钮注册事件
        if (e.target.tagName === "I") {//事件委托  判断点击的是否为播放按钮，即i标签
            Iid = e.target.getAttribute('data-id');
            audio.setAttribute('src', "https://music.163.com/song/media/outer/url?id=" + Iid + ".mp3");//给audio 添加当前的src
            for (let i = 0; i < playlist.children.length; i++) {//给播放历史里的li  清除类名
                playlist.children[i].className = 'playlists';
                if (e.target.parentNode === playlist.children[i]) {
                    audio.setAttribute('data-number', "" + i + "");
                }
            }
            e.target.parentNode.className = 'playlists playing';//给播放历史里要点击的li  添加类名
        }
    })
}
var currenttime = 0;//当前歌曲时间
var historyFlag = 0;//判断  list是否展开
var cc = document.querySelector('.cc');
var c_up = document.querySelector('.icon-cs-xs-1');
var timekeeper;//定义一个定时器
//这里需要用到 上面的id
audio.addEventListener('play', function () {
    if (audio.currentSrc) {
        var alltime = formatSeconds("" + audio.duration + "");//通过封装函数 把秒 变成分，秒
        var progress = document.querySelector(".alltime");
        progress.addEventListener('click', function (e) {//随意点击 进度条  跳转时长
            var x = e.pageX - (this.offsetLeft - this.clientWidth / 2 + this.offsetParent.offsetLeft + this.offsetParent.offsetParent.offsetLeft) - 1;//得到当前 鼠标在 总长度 里的坐标
            currenttime = audio.duration * x / 493;//小学算法  相似比例问题
            audio.currentTime = "" + currenttime + "";
        });
        timekeeper = setInterval(function () {//设置定时器， 在播放时  时长+1
            currenttime++;
            var currentlength = (currenttime / audio.duration) * 493;//小学算法  相似比例问题
            document.querySelector('.currenttime').style.width = "" + currentlength + "" + "px";//当前进度条  宽度变化
            document.querySelector('.songcurrenttime').innerText = "" + formatSeconds(currenttime) + "";//每次写入 播放时长
        }, 1000);//播放时  调用定时器
        document.querySelector('.songalltime').innerText = "" + alltime + "";//写入 总时长
        playpause.className = 'playpause icon-zantingtingzhi iconfont';//更改播放图标
        document.querySelector('.c_pic').style.animationPlayState = 'running';
        Ajax('JSON').get("http://musicapi.leanapp.cn/song/detail?ids=" + Iid + "", function (songdata) {
            if (songdata.code === 200) {
                document.querySelector('.getsong').innerText = "" + songdata.songs[0].name + "";//更改  歌名
                document.querySelector('.c_songname').innerText = "" + songdata.songs[0].name + "";//更改  歌名
                document.querySelector('.getsinger').innerText = "" + songdata.songs[0].ar[0].name + "";//更改  歌手
                document.querySelector('.c_singer').innerText = "" + songdata.songs[0].ar[0].name + "";//更改  歌手
                document.querySelector('.songpic').style.background = 'url(' + songdata.songs[0].al.picUrl + ') no-repeat';//更换  歌手图片
                document.querySelector('.c_pic').style.background = 'url(' + songdata.songs[0].al.picUrl + ') no-repeat';//更换  歌手图片
                document.querySelector('.songpic').style.backgroundSize = 'cover';
                document.querySelector('.c_pic').style.backgroundSize = 'cover';
            }
        });//歌手名字 歌曲 加载
        Ajax('JSON').get("http://musicapi.leanapp.cn/comment/music?id=" + Iid + "", function (comment) {
            if (comment.code === 200) {

                cc.innerHTML = '<i class="icon-cs-xs-1 iconfont"></i>';
                cc.addEventListener('click', function (e) {
                    if(e.target.className === 'icon-cs-xs-1 iconfont'){
                        c_song.style.display = 'flex';
                        cc.style.height = '0';
                    }
                });
                for (let i = 0; i < comment.hotComments.length; i++) {
                    var c_url = comment.hotComments[i].user.avatarUrl;
                    var cts = '<div class="ct"><div class="ct_pic"></div><div class="ct_text"><span class="ct_name">' + comment.hotComments[i].user.nickname + '</span>' + comment.hotComments[i].content + '</div><i class="icon-- iconfont ct_nice"></i></div>';
                    cc.insertAdjacentHTML('beforeend', cts);
                    var ct_pic = document.querySelectorAll('.ct_pic');
                    ct_pic[i].style.background = 'url("'+c_url+'") no-repeat';
                    ct_pic[i].style.backgroundSize = 'cover';
                }
            }
        })//sidebar 歌手 歌曲 加载
    }
});
audio.addEventListener('pause', function () {//当暂停时
    playpause.className = 'playpause icon-icon-4 iconfont';//更改 图标
    document.querySelector('.c_pic').style.animationPlayState = 'paused';
    clearInterval(timekeeper);//清除定时器
});
audio.addEventListener('abort', function () {//当 可以播放时，清除上一个定时器，播放时长为0
    clearInterval(timekeeper);
    currenttime = 0;
});
playpause.addEventListener('click', function () {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});
document.querySelector('.history').addEventListener('click', function () {  //播放历史点击事件
    if (historyFlag === 0) {
        Show('.CP_list');
        historyFlag = 1;
    } else {
        Hide('.CP_list');
        historyFlag = 0;
    }
});

//音量控制
document.querySelector('.volume').addEventListener('click', function () {//音量  显示或隐藏 事件
    if (volumeFlag === 0) {
        Show('.CP_volume');
        volumeFlag = 1;
    } else {
        Hide('.CP_volume');
        volumeFlag = 0;
    }
});
var volumeFlag = 0;//用于判断 音量 当前处于  显示还是隐藏
var vol = 0.5;//当前音量 大小
audio.volume = "" + vol + "";   //初始化音量
var vlall = document.querySelector('.vlall');//音量的总高度
vlall.addEventListener('click', function (e) {
    var vl = this.clientHeight - (e.pageY - window.pageYOffset - (this.offsetParent.offsetParent.offsetParent.offsetTop - this.offsetParent.clientHeight + 25));//得到鼠标在总音量里的坐标
    vol = vl / this.clientHeight;//用鼠标  与当前的高度 进行比例化
    document.querySelector('.vlcur').style.height = "" + vl + "" + "px";//用于当前音量的高度 变化
    audio.volume = "" + vol + "";//音量大小变化
});

//上一首或下一首
var nextsong = document.querySelector('.nextsong');
var presong = document.querySelector('.lastsong');
nextsong.addEventListener('click', function () {
    var number = parseInt(audio.getAttribute('data-number'));//获取当前播放的li 的索引号
    if (playlist.children.length !== ++number) {//判断number+1 是否为最后一个
        Iid = playlist.children[number].firstChild.getAttribute('data-id');//得到  当前播放的li的下一个的id
        audio.setAttribute('src', "https://music.163.com/song/media/outer/url?id=" + Iid + ".mp3");//给audio 添加当前的src
        audio.setAttribute('data-number', "" + number + "");//将audio 的h5 data-number  加1
        for (let i = 0; i < playlist.children.length; i++) {//给播放历史里的li  清除类名
            playlist.children[i].className = 'playlists';
        }
        playlist.children[number].className = 'playlists playing';//给播放历史里要点击的li  添加类名
    } else {
        Iid = playlist.children[0].firstChild.getAttribute('data-id');//得到  当前播放的li的第一个的id
        audio.setAttribute('src', "https://music.163.com/song/media/outer/url?id=" + Iid + ".mp3");//给audio 添加当前的src
        audio.setAttribute('data-number', 0);//将audio 的h5 data-number  加1
        for (let i = 0; i < playlist.children.length; i++) {//给播放历史里的li  清除类名
            playlist.children[i].className = 'playlists';
        }
        playlist.children[0].className = 'playlists playing';//给播放历史里要点击的li  添加类名
    }
});
presong.addEventListener('click', function () {
    var number = parseInt(audio.getAttribute('data-number'));//获取当前播放的li 的索引号
    var length = playlist.children.length - 1;
    if (number !== 0) {//判断number+1 是否为最后一个
        Iid = playlist.children[number - 1].firstChild.getAttribute('data-id');//得到  当前播放的li的下一个的id
        audio.setAttribute('src', "https://music.163.com/song/media/outer/url?id=" + Iid + ".mp3");//给audio 添加当前的src
        audio.setAttribute('data-number', "" + number - 1 + "");//将audio 的h5 data-number  加1
        for (let i = 0; i < playlist.children.length; i++) {//给播放历史里的li  清除类名
            playlist.children[i].className = 'playlists';
        }
        playlist.children[number - 1].className = 'playlists playing';//给播放历史里要点击的li  添加类名
    } else {
        Iid = playlist.children[length].firstChild.getAttribute('data-id');//得到  当前播放的li的最后一个的id
        audio.setAttribute('src', "https://music.163.com/song/media/outer/url?id=" + Iid + ".mp3");//给audio 添加当前的src
        audio.setAttribute('data-number', "" + length + "");//将audio 的h5 data-number  减1
        for (let i = 0; i < playlist.children.length; i++) {//给播放历史里的li  清除类名
            playlist.children[i].className = 'playlists';
        }
        playlist.children[length].className = 'playlists playing';//给播放历史里要点击的li  添加类名
    }
});


//评论
var comment = document.querySelector('.comment');
var c_close = document.querySelector('.icon-close');
var ch = document.querySelector('.commenthidden');
var c_drop = document.querySelector('.icon-cs-xx-1');
var c_song = document.querySelector('.c_song');
c_close.addEventListener('click', function () {
    comment.style.left = '-420px';
    ch.style.left = '0';
});
ch.addEventListener('click', function () {
    comment.style.left = '40px';
    ch.style.left = '-50px';
});
c_drop.addEventListener('click', function () {
    c_song.style.display = 'none';
    cc.style.height = '100%';
});
c_up.addEventListener('click', function () {
    c_song.style.display = 'flex';
    cc.style.height = '0';
});
cc.addEventListener('click', function (e) {
    if (e.target.className === 'icon-- iconfont ct_nice') {
        e.target.style.color = 'red';
    }
});




















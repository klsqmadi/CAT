//页面跳转  判断是否登录
if (sessionStorage.getItem('userdata')) {
    let userdata = JSON.parse(sessionStorage.getItem('userdata'));
    if (userdata.token) {
        Hide('.click_show');//隐藏 登录 这两个字  让头像显示
        Show('.suce_login');
        document.querySelector('.suce_login').style.background = 'url(' + userdata.profile.avatarUrl + ') no-repeat';  //通过api获取账号的头像背景
        document.querySelector('.suce_login').style.backgroundSize = 'cover';////更换头像
    }
}

var keyword = decodeURI(location.href.split('keyword=')[1]);//对传过来的url--keyword  进行解码
if (keyword !== "undefined") {
    let scf = document.querySelector('.scf').value = "" + keyword + "";//对两个input  写入keyword
    let topsearch = document.querySelector('.search').value = "" + keyword + "";


//搜索内容
    Ajax('JSON').get("http://musicapi.leanapp.cn/search?keywords= 海阔天空&timestamp=1503019930000", function (song_data) {
        console.log(song_data);
        var s_ct = document.querySelector('.s_ct');
        for (let i = 0; i < song_data.result.songs.length; i++) {
            if ((i + 2) % 2 === 0) {
                let time = formatSeconds('song_data.result.songs[i].duration');
                let item = '<div class="item"><i class="sc_play"></i><div class="s_name">' + song_data.result.songs[i].name + '</div><div class="s_singer"><span class="s_s">' + song_data.result.songs[i].artists[0].name + '</span></div><div class="s_album">《<span class="s_a">' + song_data.result.songs[i].album.name + '</span>》</div><div class="s_length">' + time + '</div></div>';
                s_ct.insertAdjacentHTML('beforeend', item);
            } else {
                let time = formatSeconds('song_data.result.songs[i].duration');
                let item = '<div class="item even"><i class="sc_play"></i><div class="s_name">' + song_data.result.songs[i].name + '</div><div class="s_singer"><span class="s_s">' + song_data.result.songs[i].artists[0].name + '</span></div><div class="s_album">《<span class="s_a">' + song_data.result.songs[i].album.name + '</span>》</div><div class="s_length">' + time + '</div></div>';
                s_ct.insertAdjacentHTML('beforeend', item);
            }
        }
    });   //ip被封  搜索功能暂时用不了
}



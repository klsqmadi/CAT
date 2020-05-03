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
let scf = document.querySelector('.scf');
let topsearch = document.querySelector('.search')
var keyword = decodeURI(location.href.split('keyword=')[1]);//对传过来的url--keyword  进行解码
if (keyword !== "undefined") {
    scf.value = "" + keyword + "";//对两个input  写入keyword
    topsearch.value = "" + keyword + "";
//搜索内容
    Ajax('JSON').get("http://musicapi.leanapp.cn/search?keywords=" + keyword + "", function (song_data) {
        console.log(song_data);
        if (song_data.code === 200) {
            var sc_ct = document.querySelector('.sc_ct');
            for (let i = 0; i < song_data.result.songs.length; i++) {
                if ((i + 2) % 2 === 0) {
                    let time = formatSeconds(song_data.result.songs[i].duration / 1000);
                    let item = '<div class="item"><i class="sc_play"></i><div class="s_name">' + song_data.result.songs[i].name + '</div><div class="s_singer"><span class="s_s">' + song_data.result.songs[i].artists[0].name + '</span></div><div class="s_album">《<span class="s_a">' + song_data.result.songs[i].album.name + '</span>》</div><div class="s_length">' + time + '</div></div>';
                    sc_ct.insertAdjacentHTML('beforeend', item);
                } else {
                    let time = formatSeconds(song_data.result.songs[i].duration / 1000);
                    let item = '<div class="item even"><i class="sc_play"></i><div class="s_name">' + song_data.result.songs[i].name + '</div><div class="s_singer"><span class="s_s">' + song_data.result.songs[i].artists[0].name + '</span></div><div class="s_album">《<span class="s_a">' + song_data.result.songs[i].album.name + '</span>》</div><div class="s_length">' + time + '</div></div>';
                    sc_ct.insertAdjacentHTML('beforeend', item);
                }
            }
        }
    });   //ip被封  搜索功能暂时用不了
}
var searchword;
topsearch.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        searchword = topsearch.value;
        scf.value = "" + searchword + "";
        Ajax('JSON').get("http://musicapi.leanapp.cn/search?keywords= " + searchword + "", function (song_data) {
            console.log(song_data.code === 200);
            if (song_data) {
                var sc_ct = document.querySelector('.sc_ct');
                for (let i = 0; i < song_data.result.songs.length; i++) {
                    if ((i + 2) % 2 === 0) {
                        let time = formatSeconds(song_data.result.songs[i].duration / 1000);
                        let item = '<div class="item"><i class="sc_play"></i><div class="s_name">' + song_data.result.songs[i].name + '</div><div class="s_singer"><span class="s_s">' + song_data.result.songs[i].artists[0].name + '</span></div><div class="s_album">《<span class="s_a">' + song_data.result.songs[i].album.name + '</span>》</div><div class="s_length">' + time + '</div></div>';
                        sc_ct.insertAdjacentHTML('beforeend', item);
                    } else {
                        let time = formatSeconds(song_data.result.songs[i].duration / 1000);
                        let item = '<div class="item even"><i class="sc_play"></i><div class="s_name">' + song_data.result.songs[i].name + '</div><div class="s_singer"><span class="s_s">' + song_data.result.songs[i].artists[0].name + '</span></div><div class="s_album">《<span class="s_a">' + song_data.result.songs[i].album.name + '</span>》</div><div class="s_length">' + time + '</div></div>';
                        sc_ct.insertAdjacentHTML('beforeend', item);
                    }
                }
            }
        });
    }
});
scf.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        searchword = scf.value;
        Ajax('JSON').get("http://musicapi.leanapp.cn/search?keywords=" + searchword + "", function (song_data) {
            if (song_data.code === 200) {
                var sc_ct = document.querySelector('.sc_ct');
                for (let i = 0; i < song_data.result.songs.length; i++) {
                    if ((i + 2) % 2 === 0) {
                        let time = formatSeconds(song_data.result.songs[i].duration / 1000);
                        let item = '<div class="item"><i class="sc_play"></i><div class="s_name">' + song_data.result.songs[i].name + '</div><div class="s_singer"><span class="s_s">' + song_data.result.songs[i].artists[0].name + '</span></div><div class="s_album">《<span class="s_a">' + song_data.result.songs[i].album.name + '</span>》</div><div class="s_length">' + time + '</div></div>';
                        sc_ct.insertAdjacentHTML('beforeend', item);
                    } else {
                        let time = formatSeconds(song_data.result.songs[i].duration / 1000);
                        let item = '<div class="item even"><i class="sc_play"></i><div class="s_name">' + song_data.result.songs[i].name + '</div><div class="s_singer"><span class="s_s">' + song_data.result.songs[i].artists[0].name + '</span></div><div class="s_album">《<span class="s_a">' + song_data.result.songs[i].album.name + '</span>》</div><div class="s_length">' + time + '</div></div>';
                        sc_ct.insertAdjacentHTML('beforeend', item);
                    }
                }
            }
        });
    }
});

//资源懒加载---------有个问题  短时间请求api过多，会导致api失效，
var lazy;
var none = document.querySelector('.none');
window.addEventListener('scroll', function () {
    if (window.pageYOffset + window.innerHeight === none.offsetTop) {
        document.querySelector('.lazyload').style.display = 'block';
        lazy = setInterval(function () {
            var sc_ct = document.querySelector('.sc_ct');
            var account = sc_ct.children.length;
            var all = account+30;
            Ajax('JSON').get("http://musicapi.leanapp.cn/search?keywords= " + scf.value + "&limit=" + all + "", function (song_data) {
                if (song_data.code === 200) {
                    for (let i = account; i < account + 30; i++) {
                        if ((i + 2) % 2 === 0) {
                            let time = formatSeconds(song_data.result.songs[i].duration / 1000);
                            let item = '<div class="item"><i class="sc_play"></i><div class="s_name">' + song_data.result.songs[i].name + '</div><div class="s_singer"><span class="s_s">' + song_data.result.songs[i].artists[0].name + '</span></div><div class="s_album">《<span class="s_a">' + song_data.result.songs[i].album.name + '</span>》</div><div class="s_length">' + time + '</div></div>';
                            sc_ct.insertAdjacentHTML('beforeend', item);
                        } else {
                            let time = formatSeconds(song_data.result.songs[i].duration / 1000);
                            let item = '<div class="item even"><i class="sc_play"></i><div class="s_name">' + song_data.result.songs[i].name + '</div><div class="s_singer"><span class="s_s">' + song_data.result.songs[i].artists[0].name + '</span></div><div class="s_album">《<span class="s_a">' + song_data.result.songs[i].album.name + '</span>》</div><div class="s_length">' + time + '</div></div>';
                            sc_ct.insertAdjacentHTML('beforeend', item);
                        }
                    }
                }
                else{
                    document.querySelector('.lazyload').innerHTML = '加载失败';
                    setTimeout(function () {
                        document.querySelector('.lazyload').style.display = 'none';
                    })
                }
            });
        }, 3000);
    } else {
        document.querySelector('.lazyload').style.display = 'none';
        clearInterval(lazy);
    }
});




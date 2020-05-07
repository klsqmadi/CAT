//引入喜欢的音乐
var collect = document.querySelector('.collectlist');
var flag = 0;
if(sessionStorage.getItem('data')){
    var data=  JSON.parse(sessionStorage.getItem('data'));
    document.querySelector('.myhead').style.background = 'url(' + data.profile.avatarUrl + ') no-repeat';  //通过api获取账号的头像背景
    document.querySelector('.myhead').style.backgroundSize = 'cover';////更换头像
    document.querySelector('.myname').innerText = "" + data.profile.nickname + "";//获取 名字
    Ajax('JSON').get("http://musicapi.leanapp.cn/likelist?uid="+data.account.id+"",function (likedata) {
        console.log(likedata);
        if(likedata.code === 200){
            for(let i = 0;i < likedata.ids.length;i++){
                Ajax('JSON').get("http://musicapi.leanapp.cn/song/detail?ids="+likedata.ids[i]+"",function (songdata) {
                    var t = songdata.songs[0].dt / 1000;
                    var time = formatSeconds(t);
                    var number = i+1;
                    if((i+4)%2 === 0){
                        let lls = '<div class="likelist even"><span class="numbers">'+number+'</span><div class="songname">'+songdata.songs[0].name+'</div><div class="singername">'+songdata.songs[0].ar[0].name+'</div><div class="songtime">'+time+'</div></div>';
                        if(flag === 1){
                            collect.insertAdjacentHTML('beforeend',lls);
                            flag = 0;
                        }
                    }
                    else{
                        let lls = '<div class="likelist"><span class="numbers">'+number+'</span><div class="songname">'+songdata.songs[0].name+'</div><div class="singername">'+songdata.songs[0].ar[0].name+'</div><div class="songtime">'+time+'</div></div>';
                        collect.insertAdjacentHTML('beforeend',lls);
                    }
                })
            }
        }
        else{
            alert('加载失败');
        }
    })
}
else{
    Hide('.homelist');
    Hide('.collectlist');
    alert('请先登录');
}
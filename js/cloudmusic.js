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
                var points = '<li class="loop_play_point lppactive" data-index="i"></li>';
                pointfather.insertAdjacentHTML('beforeend', points);
            } else {
                var points = '<li class="loop_play_point" data-index="i"></li>';
                pointfather.insertAdjacentHTML('beforeend', points);
            }
        }
    })();//动态创建points  这是一个立即执行函数
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
}
loopplay(2000);//传入是每隔time秒播放下一张  的 参数
/////////////////////////////
/////////////////////////////轮播图  函数封装结束  目前只有一个参数intervalTime  (播放时间)
////////
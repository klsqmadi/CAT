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

//封装一个  清除value的函数
// 行内框 value 清空
function clearValue(myClassName) {
    document.querySelector(""+myClassName+"").value = '';
}

//歌曲 时长 转换
function formatSeconds(value) {

    var theTime = parseInt(value);// 秒
    var middle= 0;// 分
    var hour= 0;// 小时

    if(theTime > 60) {
        middle= parseInt(theTime/60);
        theTime = parseInt(theTime%60);
        if(middle> 60) {
            hour= parseInt(middle/60);
            middle= parseInt(middle%60);
        }
    }
    var result = ""+parseInt(theTime);
    if(result < 10){
        result = "0"+parseInt(theTime);
    }
    if(middle > 0) {
        result = "0"+parseInt(middle)+":"+result;
    }
    if(middle === 0){
        result = "00"+":"+result;
    }
    if(hour > 0) {
        result = ""+parseInt(hour)+":"+result;
    }
    return result;
}
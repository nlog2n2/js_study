// アプリケーションに使う変数を定義
var timer;
var start;
var isStared = false;

// DOM で操作する要素を代入
var startButton = document.getElementById('start');
var stopButton  = document.getElementById('stop');
var resetButton = document.getElementById('reset');
var watch       = document.querySelector('.stopwatch p')

// イベント監視
startButton.addEventListener('click',watchStart,false);
stopButton.addEventListener('click',watchStop,false);
resetButton.addEventListener('click',watchReset,false);

// 開始ボタンのイベントハンドラー
function watchStart(){
    if(! isStared){
        start = new Date();
        timer = setInterval(updateWatch, 1000/60);

        isStared = true;
    }
}

// 停止ボタンのイベントハンドラー
function watchStop() {
    if (isStared) {
        clearInterval(timer);
        isStared = false;
    }
}

// リセットボタンのイベントハンドラー
function watchReset(){
    watchStop();
    watch.innerHTML = "00:00:00:000";
}

// 計測中の時刻計算用関数
function updateWatch(){
    //経過時間を計算
    var date = new Date();
    var diff = date.getTime() - start.getTime();
    //時、分、秒、ミリ秒をそれぞれ計算
    var hour        = Math.floor(diff / 3600000);
    var minute      = Math.floor(diff / 60000 % 60);
    var second      = Math.floor(diff / 1000  % 60);
    var milliSecond = Math.floor(diff % 1000)

    // 表示用に桁を合わせる
    if(hour < 10){
        hour = "0" + hour;
    }
    if(minute < 10){
        minute = "0" + minute;
    }
    if(second < 10){
        second = "0" + second
    }

    if(milliSecond < 100){
        if(milliSecond < 10){
            milliSecond = "00" + milliSecond;
          }else{
            milliSecond = "0" + milliSecond;
        }
    }
    
    // タイマー要素に書き出し
    watch.innerHTML = hour + ':' + minute + ':' + second + ':' + milliSecond;
}
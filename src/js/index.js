
var root = window.player;
var dataList;
var len;
var audio = root.audioManager;
var control;
var timer;
var $scope = $(document.body);





function getData(url) {
    $.ajax({
        type:"GET",
        url:url, 
        success:function(data){
            console.log(data);
            len = data.length;
            control = new root.controlIndex(len);
            dataList = data;
            root.render(data[0]);
            audio.getAudio(data[0].audio);
            bindEvent();
          
        },
        error:function(){
            console.log('error');
        }
    })
}



function bindEvent(){
    $('body').on('play:change',function(e,index){
    $('.img-box').attr('data-deg',0);
    $('.img-box').css({
        'transform':'rotateZ(0deg)',
        'transition':'none'
    })
        audio.getAudio(dataList[index].audio);
        root.render(dataList[index]);

    })
    $('.prev').on('click',function(){
        var i = control.prev(); 
        $('body').trigger('play:change',i);
        audio.play();
        if(audio.play){
            $('.play .block').css('display','none');
            $('.play .none').css('display','block');
            clearInterval(timer);
            rotated(0);
        }
    })
    $('.next').on('click',function(){
        var i = control.next();
        $('body').trigger('play:change',i);   
        audio.play();     
        if(audio.play){
            $('.play .block').css('display','none');
            $('.play .none').css('display','block');
            clearInterval(timer);
            rotated(0);
        }
    })
    $('.play').on('click',function(){
        if(audio.status == "pause"){
            var deg = $('.img-box').attr('data-deg');
            audio.play();
            $('.play .block').css('display','none');
            $('.play .none').css('display','block');
            rotated(deg);
            
        }else{
            audio.pause();
            $('.play .block').css('display','block');
            $('.play .none').css('display','none');
            clearInterval(timer);
        }
           
    })
}

function rotated(deg){
    clearInterval(timer);
    // var deg = 0;
    deg =+ deg;
    timer = setInterval(function(){
        deg += 2;
        $('.img-box').attr('data-deg',deg);
        $('.img-box').css({
            'transform':'rotateZ(' + deg + 'deg)',
            'transition':'all 1s ease-out'
        })
    },100)
    
}


getData("../mock/data.json");


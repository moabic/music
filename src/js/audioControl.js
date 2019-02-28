(function($,root){
    function AudioManager(){
        //创建音频对象
        this.audio = new Audio();
        
        //默认状态
        this.status = "pause";
    };

    AudioManager.prototype = {
        play : function(){
            console.log(audio)
            this.audio.play();
            this.status = "play";
        },
        pause : function(){
            this.audio.pause();
            this.status = "pause";
        },
        getAudio:function(src){
            this.audio.src = src;
            this.audio.load();
        }
    }
    root.audioManager = new AudioManager();

})(window.Zepto,window.player || (window.player = {}))
(function($,root){

    function renderAllTime(time){
        $('.ali-time').html(time)
    }
    function renderAllTime(time){
        function formatTime(t){
            var m = Math.floor(t / 60);
            var s = t - m * 60;
            return m + ':' + s;
        }
    }


})(window.Zepto,window.player || (window.player = {}))
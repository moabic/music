var dataList,len,control,timer,root=window.player,audio=root.audioManager,$scope=$(document.body);function getData(a){$.ajax({type:"GET",url:a,success:function(a){len=a.length,control=new root.controlIndex(len),dataList=a,root.render(a[0]),audio.getAudio(a[0].audio),bindEvent()},error:function(){}})}function bindEvent(){$("body").on("play:change",function(a,o){$(".img-box").attr("data-deg",0),$(".img-box").css({transform:"rotateZ(0deg)",transition:"none"}),audio.getAudio(dataList[o].audio),root.render(dataList[o])}),$(".prev").on("click",function(){var a=control.prev();$("body").trigger("play:change",a),audio.play(),audio.play&&($(".play .block").css("display","none"),$(".play .none").css("display","block"),clearInterval(timer),rotated(0))}),$(".next").on("click",function(){var a=control.next();$("body").trigger("play:change",a),audio.play(),audio.play&&($(".play .block").css("display","none"),$(".play .none").css("display","block"),clearInterval(timer),rotated(0))}),$(".play").on("click",function(){if("pause"==audio.status){var a=$(".img-box").attr("data-deg");audio.play(),$(".play .block").css("display","none"),$(".play .none").css("display","block"),rotated(a)}else audio.pause(),$(".play .block").css("display","block"),$(".play .none").css("display","none"),clearInterval(timer)})}function rotated(a){clearInterval(timer),a=+a,timer=setInterval(function(){a+=2,$(".img-box").attr("data-deg",a),$(".img-box").css({transform:"rotateZ("+a+"deg)",transition:"all 1s ease-out"})},100)}getData("../mock/data.json");
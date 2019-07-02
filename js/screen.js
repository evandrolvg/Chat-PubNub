$( document ).ready(function() {
    var modoTv = false;

    $("#video_all").click(function(){
        if(modoTv == false){
            $("#cabecalho").hide();
            $("#menuEsquerda").hide();
            $("#menuCentral").hide(); //esconde para remodular as classes
            $("#menuCentral").removeClass("col-md-8 col-md-offset-1");
            $("#menuCentral").addClass("col-md-12");
            $("#menuCentral").fadeIn(1500); //reaparece com estilo ^_~
            $("#btnModoTV").text("Sair do Modo TV");
            modoTv = true;
            
            entrarFullScreen();
            
        }else{
            $("#cabecalho").show();
            $("#menuEsquerda").show();
            $("#menuCentral").hide();
            $("#menuCentral").removeClass("col-md-12");
            $("#menuCentral").addClass("col-md-8 col-md-offset-1");
            $("#menuCentral").show();
            $("#btnModoTV").text("Entrar no Modo TV");
            modoTv = false;
            
            sairFullScreen();
            
        }
    });
});


function entrarFullScreen(){
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) { 
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    }
}
    
function sairFullScreen(){
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}
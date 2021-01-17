document.getElementById("toggle").addEventListener("click",showmenu)
document.getElementById("close").addEventListener("click",hideb)
document.getElementById("close1").addEventListener("click",hidem)
function showmenu(){
        document.getElementById("menu").style.transform="scale(3)"
}
function showb1(){
            $("#containerofmenus").show();
            $("#controlmenu").show();
            $("#PowerUpmenu").hide();
            $("#Goalmenu").hide();
}
function showb2(){
        $("#containerofmenus").show();
        $("#PowerUpmenu").show();
        $("#controlmenu").hide();
        $("#Goalmenu").hide();
}
function showb3(){
        $("#containerofmenus").show();
        $("#Goalmenu").show();
        $("#controlmenu").hide();
        $("#PowerUpmenu").hide();
}
function hideb(){
        document.getElementById("containerofmenus").style.display="none"
        document.getElementById("menu").style.transform="scale(0)"
}
function hidem(){
    $("#names").hide();
}
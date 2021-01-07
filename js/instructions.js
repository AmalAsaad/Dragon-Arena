




$("#box h3").text("HOW TO PLAY")
$("<div>").appendTo("#popcontainer").attr("id","firstpagemove")
$("<div>").appendTo("#popcontainer").attr("id","firstpagefire")
//$("<p>").appendTo("#firstpagemove").text("use arrow to move")

$("#box #nextpage").click(nextinstruction)
function nextinstruction(){
    $("#box h3").text("Bullets")
    //$("#popcontainer").empty();
    //$("<div>").appendTo("#popcontainer").attr("id","firstpagemove")
}
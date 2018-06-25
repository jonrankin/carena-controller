serverStatus('#status')

//console.log("YAA");
//player_list('#players')
drawRAM()
drawCPU()
google.charts.setOnLoadCallback(drawHDD);

var modal = document.getElementById('restartModal');
var btn = document.getElementById('restart');
var span = document.getElementById('closeModal');


btn.onclick = function() {
     modal.style.display = "block";
}

span.onclick = function(){
     modal.style.display= "none";
}

window.onclick = function(event){
        if (event.target == modal) {
            modal.style.display = "none";
        }
}

document.getElementById("reset_key").addEventListener("keydown", function(e) {
    if (!e) { var e = window.event; }
    //e.preventDefault(); // sometimes useful
    // Enter is pressed
    if (e.keyCode == 13) { processKey(); }
}, false);

function processKey(){
   var key = $("#reset_key").val();
   $("#restart_text").fadeOut("slow");
   $.ajax({
        'async': true,
        'global': false,
        'url': '/restart/' + key,
        'dataType': "json",
        'success': function (data) {
            console.log(data["status"]);
            var input = $("#reset_key");
            if (data["status"] === "success"){
                $("#restart_text").text(data['status'])
                $("#restart_text").fadeIn("slow");
            }else {

                $("#restart_text").fadeOut("slow", function(){
                           $("#restart_text").text(data['message']);
                           $("#restart_text").fadeIn("slow");
                });
                 setTimeout(function(){
                          $("#restart_text").fadeOut("slow",function(){
                          $("#restart_text").html(input);
                         $("#restart_text").fadeIn("slow");
                          });
                },4000);
            }
        }
    });


}



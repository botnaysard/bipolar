$(document).ready(function(){

    $("#main").fadeIn();

    var submitData = {};

    $("#moodlist").on("click", "div", function () {
                var moodText = $(this).text();
                var moodInt = parseInt(moodText);
                var moodDate = Date();
                //console.log(moodText, moodInt, moodDate);
                $("#moodlist").hide();
                $("#meds").fadeIn();
                $("#howmood").hide();
                $("#takemeds").fadeIn();
                $("#moodhelp").hide();
                submitData.rating = moodInt;
                submitData.date = moodDate;             
    });

    $("#meds").on("click", "div", function() {
                var tookMeds = $(this).text();                
                $("#meds").hide();
                $("#sleep").fadeIn();
                $("#takemeds").hide();
                $("#howsleep").fadeIn();
                submitData.meds = tookMeds;
    });

    $("#sleep").on("click", "div", function() {
        var sleepAmount = $(this).text();
        //$("#sleep").fadeOut();
        //$("#howsleep").fadeOut();
        submitData.sleep = sleepAmount;

        $.ajax( { url: "https://api.mlab.com/api/1/databases/moodtracker/collections/mtracked?apiKey=ybAPUS6CcJVkdlwxn0LxCHtbbZVUgtQg",
        data: JSON.stringify( { moodRating: submitData.rating, date : submitData.date, medsTaken: submitData.meds, sleepHours: submitData.sleep } ),
        type: "POST",
        contentType: "application/json" } );
        $("#main").hide();
        $("#success").html("Mood rating of <span id=mshighlight>" + submitData.rating + "</span> successfully recorded!").fadeIn();    
        setTimeout(function() { window.location.href = "index.html"; }, 1000);
                
    });

    $("#moodhelp").on("click", function(){
        $("#main").hide();
        $("#helpwindow").fadeIn();
    });

    $("#closehelp").on("click", function(){
        $("#helpwindow").hide();
        $("#main").fadeIn();
    });

});


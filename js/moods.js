$(document).ready(function(){

    $("#main").fadeIn();

    $("#moodlist").on("click", "div", function() {
                var moodText = $(this).text();
                var moodInt = parseInt(moodText);
                var moodDate = Date();
                $.ajax( { url: "https://api.mlab.com/api/1/databases/moodtracker/collections/mtracked?apiKey=ybAPUS6CcJVkdlwxn0LxCHtbbZVUgtQg",
                    data: JSON.stringify( { moodRating: moodInt, date : moodDate} ),
                    type: "POST",
                    contentType: "application/json" } );
                $("#main").hide();
                $("#success").html("Mood rating of <span id=mshighlight>" + moodText + "</span> successfully recorded!").fadeIn();    
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
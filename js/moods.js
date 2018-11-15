$(document).ready(function(){

    $("#main").fadeIn();

    $("#moodlist").on("click", "div", function () {
                var moodText = $(this).text();
                var moodInt = parseInt(moodText);
                var moodDate = Date();
                console.log(moodText, moodInt, moodDate);
                $("#moodlist").hide();
                $("#meds").fadeIn();
                $("#howmood").hide();
                $("#takemeds").fadeIn();
                var moodArray = [moodText, moodInt, moodDate]; 

                // *** FIND A WAY TO GET THIS ARRAY OUT OF THE FUNCTION SO IT CAN BE ADDED TO AJAX
                // *** IS IT POSSIBLE TO CREATE A NAMED FUNCTION USING JQUERY .ON() - YES SEE BROWSER BOOKMARKS FOR SOLUTION

                console.log(moodArray);
    });
 
    /*

    //

    $("#meds").on("click", "div", function() {
                var tookMeds = $(this).text();                
                $("#meds").hide();
                $("#sleep").fadeIn();
                $("#takemeds").hide();
                $("#howsleep").fadeIn();
    });

    $("#sleep").on("click", "div", function() {
                var sleepAmount = $(this).text();
                $("#sleep").fadeOut();
                $("#howsleep").fadeOut();
    });

    /*

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

    */

});
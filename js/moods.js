$(document).ready(function(){

    /* retrieve possible moods from list and display them */

    $.getJSON("https://api.mlab.com/api/1/databases/moodtracker/collections/moods?apiKey=ybAPUS6CcJVkdlwxn0LxCHtbbZVUgtQg", function (data) {
        var moodList = [];
        for (var i = 0; i < data.length; i++) {
            moodList[i] = [data[i].fieldName, data[i]._id];
        }

        var colors = ['#F44336','#E91E63','#9C27B0','#673AB7','#3F51B5','#2196F3','#009688','#4CAF50','#8BC34A','#FFC107','#FF9800','#FF5722','#795548','#9E9E9E'];
        
        for (var i = 0; i < moodList.length; i++) {


            /* randomly pick a color for each item */

            var randomColor = colors[Math.floor(Math.random() * colors.length)];
            console.log(randomColor);
        
            /* Find and remove selected from an array so it won't be used again */

            var colorIndex = colors.indexOf(randomColor);
            if(colorIndex != -1) {
                colors.splice(colorIndex, 1);
            }
            
            $('<div/>').html(moodList[i][0] + ' </span>' + '<span class="delbutton"><i class="fas fa-times-circle"></i></span>').attr("id", moodList[i][1].$oid ).appendTo('#moodlist').addClass("disc").css('background-color', randomColor); 

        }

        console.log(colors);

        /* add delete function to each item */

        var deleters = document.getElementsByClassName("delbutton"); 

        for (var i = 0; i < deleters.length; i++) {
          deleters[i].addEventListener('click', function (event) {
            event.stopPropagation();
            var itemToDelete = $(this).parent().attr('id');
            var urlForDeletion = 'https://api.mlab.com/api/1/databases/moodtracker/collections/moods/' + itemToDelete + '?apiKey=ybAPUS6CcJVkdlwxn0LxCHtbbZVUgtQg' ;
            console.log(urlForDeletion);
            $.ajax( { url: urlForDeletion,
            type: "DELETE",
            async: true,
            timeout: 300000,
            success: function (data) { },
            error: function (xhr, status, err) { } } );
            setTimeout(location.reload.bind(location), 750);
          })
        }
    });

    $("#moodlist").on("click", "div", function() {
        var submitMood = $(this).text().slice(0, -4);            
    });


    $("#moodlist").on("click", "div", function() {
        var submitMood = $(this).text();
        var submitMoodDate = Date();
        $.ajax( { url: "https://api.mlab.com/api/1/databases/moodtracker/collections/mtracked?apiKey=ybAPUS6CcJVkdlwxn0LxCHtbbZVUgtQg",
            data: JSON.stringify( { moodType : submitMood, moodDate : submitMoodDate} ),
            type: "POST",
            contentType: "application/json" } );
        alert(submitMood + " mood logged at " + submitMoodDate);
    });

    /* toggle delete buttons */

    $("#editmode").on("click", function(){
        $(".delbutton").fadeToggle("slow", "linear");
    });

    /* add a custom event */

    $('#addentry').click(function() {
        var newEntry = $("#nentry").val();
        $.ajax( { url: "https://api.mlab.com/api/1/databases/moodtracker/collections/moods?apiKey=ybAPUS6CcJVkdlwxn0LxCHtbbZVUgtQg",
            data: JSON.stringify( { fieldName : newEntry } ),
            type: "POST",
            contentType: "application/json" } );
        alert("new mood " + newEntry + " added");
        $("#addnewform").trigger("reset");
        setTimeout(location.reload.bind(location), 750);
    });

});
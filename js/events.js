$(document).ready(function(){

    /* retrieve possible moods from list and display them */

    $.getJSON("https://api.mlab.com/api/1/databases/moodtracker/collections/events?apiKey=ybAPUS6CcJVkdlwxn0LxCHtbbZVUgtQg", function (data) {
        var eventsList = [];
        for (var i = 0; i < data.length; i++) {
            eventsList[i] = [data[i].fieldName, data[i]._id];
        }

        var colors = ['#F44336','#E91E63','#9C27B0','#673AB7','#3F51B5','#2196F3','#009688','#4CAF50','#8BC34A','#FFEB3B','#FFC107','#FF9800','#FF5722','#795548','#9E9E9E'];

        for (var i = 0; i < eventsList.length; i++) {

            /* randomly pick a color for each item */

            
            var randomColor = colors[Math.floor(Math.random() * colors.length)];

            /* Find and remove selected from an array so it won't be used again */

            var colorIndex = colors.indexOf(randomColor);
            if(colorIndex != -1) {
                colors.splice(colorIndex, 1);
            }
            
            /* draw the item */

            $('<div/>').html(eventsList[i][0] + ' </span>' + '<span class="delbutton hidden"><i class="fas fa-times-circle"></i></span>').attr("id", eventsList[i][1].$oid ).appendTo('#eventlist').addClass("disc").css('background-color', randomColor);
        }

        /* add delete function to each item */

        var deleters = document.getElementsByClassName("delbutton"); 

        for (var i = 0; i < deleters.length; i++) {
          deleters[i].addEventListener('click', function (event) {
            event.stopPropagation();
            var itemToDelete = $(this).parent().attr('id');
            var urlForDeletion = 'https://api.mlab.com/api/1/databases/moodtracker/collections/events/' + itemToDelete + '?apiKey=ybAPUS6CcJVkdlwxn0LxCHtbbZVUgtQg' ;
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

    $("#eventlist").on("click", "div", function() {
        var submitEvent = $(this).text();
        var submitEventDate = Date();
        $.ajax( { url: "https://api.mlab.com/api/1/databases/moodtracker/collections/etracked?apiKey=ybAPUS6CcJVkdlwxn0LxCHtbbZVUgtQg",
            data: JSON.stringify( { eventType : submitEvent, eventDate : submitEventDate} ),
            type: "POST",
            contentType: "application/json" } );
        alert(submitEvent + " logged at " + submitEventDate);
    });

    /* toggle delete buttons */

    $("#editmode").on("click", function(){
        $(".delbutton").fadeToggle("hidden");
    });



});
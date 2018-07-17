$(document).ready(function(){

    /* retrieve possible moods from list and display them */

    $.getJSON("https://api.mlab.com/api/1/databases/moodtracker/collections/events?apiKey=ybAPUS6CcJVkdlwxn0LxCHtbbZVUgtQg", function (data) {
        var eventsList = [];
        for (var i = 0; i < data.length; i++) {
            eventsList[i] = [data[i].fieldName, data[i]._id];
        }
        
        /* eventsList.sort(); */

        for (var i = 0; i < eventsList.length; i++) {
            $('<div/>').html(eventsList[i][0] + ' </span>' + '<span class="delbutton hidden"><i class="fas fa-times-circle"></i></span>').attr("id", eventsList[i][1].$oid ).appendTo('#eventlist').addClass("disc");
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
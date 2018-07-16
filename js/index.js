$(document).ready(function(){

	/* use standard links for navigation now, but save this for dynamic content later 

	$('.disc').click(function(){
		var whichOne = $(this).attr('id');
		console.log(whichOne);
		$('.disc').not('#' + whichOne + "page").hide();
		$('#' + whichOne +'page').show();

	});

	*/

	/* add a new mood */

	$('#addentry').click(function() {
		var entryType = $("#addtype").val();
		var whichCollection = entryType + "s";
        var newEntry = $("#nentry").val();
        var fieldName = entryType + "class"
        console.log(entryType);
        console.log(whichCollection);
        console.log(newEntry);
        console.log(fieldName);
        $.ajax( { url: "https://api.mlab.com/api/1/databases/moodtracker/collections/" + whichCollection + "?apiKey=ybAPUS6CcJVkdlwxn0LxCHtbbZVUgtQg",
        	data: JSON.stringify( { fieldName : newEntry } ),
        	type: "POST",
        	contentType: "application/json" } );
        alert("new " + entryType + " added");
        $("#addnewform").trigger("reset");
        setTimeout(location.reload.bind(location), 750);
    });

});
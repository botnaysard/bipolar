$(document).ready(function(){

    // $("#main").fadeIn();  

    // get recorded mood rankings and add them to an array

    var moodTimeline = [];
    var nodeNumber = []

    $.getJSON("https://api.mlab.com/api/1/databases/moodtracker/collections/mtracked?apiKey=ybAPUS6CcJVkdlwxn0LxCHtbbZVUgtQg", function (data) {
        for (var i = 0; i < data.length; i++) {
            moodTimeline.push(data[i].moodRating);
            nodeNumber.push(i);
        }    
    });

    console.log(moodTimeline);
    console.log(nodeNumber);
    var lineData = {
      labels: nodeNumber,
      series: moodTimeline
    };
    var options = {
    };
    new Chartist.Line('.ct-chart', lineData, options);
    

});


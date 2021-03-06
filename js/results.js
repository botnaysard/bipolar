// Mood vs. Date

fetch("https://api.mlab.com/api/1/databases/moodtracker/collections/mtracked?apiKey=ybAPUS6CcJVkdlwxn0LxCHtbbZVUgtQg")
  .then(function(response) {
    return response.json();
  })
  .then(function(moods) {
    var data = {
      labels: moods.map(function(mood) {
        return mood.date.slice(4, 10);
      }),
      series: [ moods.map(function(mood) {
        return mood.moodRating;
      }) ]
    };
    var options = {
      high: 3,
      low: -3,
      onlyInteger: true,
      axisY: {
        onlyInteger: true
      }
    };
  
    new Chartist.Line('#chart1', data, options);
  });

// Percentage of each mood out of total moods entered (pie chart)

    $.getJSON('https://api.mlab.com/api/1/databases/moodtracker/collections/mtracked?apiKey=ybAPUS6CcJVkdlwxn0LxCHtbbZVUgtQg', function (data) {
        var allMoods = [];
        for (var i = 0; i < data.length; i++) {
            allMoods[i] = data[i].moodRating;
        }   
        function getOccurrence(array, value) {
            return array.filter((v) => (v === value)).length;
        }

        var n3 = getOccurrence(allMoods, -3);  
        var n2 = getOccurrence(allMoods, -2);  
        var n1 = getOccurrence(allMoods, -1);  
        var zilch = getOccurrence(allMoods, 0);
        var p1 = getOccurrence(allMoods, 1);  
        var p2 = getOccurrence(allMoods, 2);  
        var p3 = getOccurrence(allMoods, 3);  

        var pieMatrix = [n3, n2, n1, zilch, p1, p2, p3];

        var data = {
        labels: ['-3', '-2', '-1', '0', '1', '2', '3'],
        series: pieMatrix
        };

        var negatives = n1 + n2 + n3;
        var positives = p1 + p2 +p3;

        var posNeg = [negatives, zilch, positives];
        
        var pnMatrix = {
        labels: ['Negative', 'Neutral', 'Positive'],
        series: posNeg
        };

        var options = {

        };

    new Chartist.Pie('#chart2', pnMatrix, options);

    new Chartist.Bar('#chart3', {
        labels: ['-3', '-2', '-1', '0', '1', '2', '3'],
        series: pieMatrix
    }, {
    distributeSeries: true
    });  

    });

// jQuery clicker to scroll throught the various charts

$(document).ready(function(){


    $('.charttag').on('click', function(){
        console.log('click!');
        if ($(this).attr('id') == "timeline") {
            $('.chartholder').animate({ scrollTop: "0px" });    
            $(this).addClass('underline');
            $(this).siblings().removeClass('underline');
        } else if ($(this).attr('id') == "prevbytype") {
            $('.chartholder').animate({ scrollTop: "410px" }); 
            $(this).addClass('underline');
            $(this).siblings().removeClass('underline');   
        } else if ($(this).attr('id') == "prevbyrating") {
            $('.chartholder').animate({ scrollTop: "800px" });   
            $(this).addClass('underline');
            $(this).siblings().removeClass('underline');
        }

    });
});        


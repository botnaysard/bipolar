fetch("https://api.mlab.com/api/1/databases/moodtracker/collections/mtracked?apiKey=ybAPUS6CcJVkdlwxn0LxCHtbbZVUgtQg")
  .then(function(response) {
    return response.json();
  })
  .then(function(moods) {
    var data = {
      labels: moods.map(function(mood) {
        return mood.date;
      }),
      series: [ moods.map(function(mood) {
        return mood.moodRating;
      }) ]
    };
    var options = {
     width: 400,
      height: 300,
      distributeSeries: true
    };
  
    new Chartist.Line('#chart', data, options);
  });


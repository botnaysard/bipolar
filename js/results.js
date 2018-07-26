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
  
    new Chartist.Line('#chart', data, options);
  });


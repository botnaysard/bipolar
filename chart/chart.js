fetch("https://api.mlab.com/api/1/databases/moodtracker/collections/mtracked?apiKey=ybAPUS6CcJVkdlwxn0LxCHtbbZVUgtQg")
  .then(function(response) {
    return response.json();
  })
  .then(function(moods) {
    var data = {
      labels: moods.map(function(mood) {
        return mood.date;
      }),
      series: moods.map(function(mood) {
        return mood.moodRating;
      })
    };
  
    var chart = new Chartist.Bar('#chart', data, {
      distributeSeries: true
    });
  });


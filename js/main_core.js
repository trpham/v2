$(document).ready(function() {

  var categories = ["Profile", "Economy", "Politics", "Science & Technology", "U.S."]
  var articles = {} // { Category: [article] }
  var sources = {}
  var articlesRead = []  // [article]
  var biasAverage = 0.0
  var selectedCategory = "" // Current selected category
  var selectedArticleIndex = -1  // Current selected article index in articles
  
  // Fetch data from local json files
  $.ajax({
    url:'files/articles.json',
    dataType: 'json',
    type: 'get',
    cache: 'true',
    success: function(data) {
      $(data.articles).each(function(index, article) {
        // Initialize article list
        if (!articles.hasOwnProperty(article.category)) {
          articles[article.category] = [];
        }
        articles[article.category].push(article)
      });
    }
  }),

  $.ajax({
    url:'files/user.json',
    dataType: 'json',
    type: 'get',
    cache: 'true',
    success: function(user) {
      biasAverage = user.biasAverage
      articlesRead = user.articlesRead
    }
  }),

  $.ajax({
    url:'files/sources.json',
    dataType: 'json',
    type: 'get',
    cache: 'true',
    success: function(data) {
      sources = data.sources
    }
  })


  $(".category-nav").click(function(event) {

    // console.log("HII")

    // Get the category
    selectedCategory = $(event.target).text();

    // Clear any innerHTML inside #articles-container
    $("#fh5co-main").empty();

    // Append category name
    $("#fh5co-main").append('<div><h2>' + selectedCategory +  '</h2></div>');

    // Append articles data
    $.each(articles[selectedCategory], function(index, article) {
      $("#fh5co-main").append(
        '<a class="article" href="' + article.link + '" target="_blank">' +
          '<div class="col-md-3 col-sm-6 col-padding">' +
            '<div class="blog-entry">' +
            '<div class="blog-img"><img src="' + article.image + '"' + ' class="img-responsive"></div>' +
            '<div class="desc">' +
                '<h3>' + article.title + '</h3>' +
                '<div class="lead">Read More <i class="icon-arrow-right3"></i></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</a>'
      );
    });
  });


  // Index of clicked article is equivalent to the index of the <a> tag child under #articles-container
  $("#fh5co-main").on("click", "a", function() {
    selectedArticleIndex = $(this).index() - 1 // Array starts at 0
    console.log(selectedArticleIndex)
    selectedArticle = articles[selectedCategory][selectedArticleIndex]
    articlesRead.push(selectedArticle)
    // console.log(articlesRead)
    // console.log(calcuateBiasAverage(articlesRead, sources))
  });

});

// Helper method to calcuate bias average
function calcuateBiasAverage(articlesRead, sources) {

  var sum = 0;

  if (articlesRead.length > 0) {
    articlesRead.forEach(function(article, index) {
      sum += sources[article.source]
    });
    return (sum / articlesRead.length);
  }

  return sum
}





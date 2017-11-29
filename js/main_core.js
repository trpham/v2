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


//   <!-- <div class="col-md-3 col-sm-6 col-padding">
//   <div class="blog-entry">
//     <a href="#" class="blog-img"><img src="images/img-1.jpg" class="img-responsive" alt="Free HTML5 Bootstrap Template by FreeHTML5.co"></a>
//     <div class="desc">
//       <h3><a href="#">Inspirational Website</a></h3>
//       <span><small>by Admin </small> / <small> Web Design </small> / <small> <i class="icon-comment"></i> 14</small></span>
//       <p>Design must be functional and functionality must be translated into visual aesthetics</p>
//       <a href="#" class="lead">Read More <i class="icon-arrow-right3"></i></a>
//     </div>
//   </div>
// </div> -->

  $(".category-nav").click(function(event) {

    // console.log("HII")

    // Get the category
    selectedCategory = $(event.target).text();

    // Clear any innerHTML inside #articles-container
    $("#fh5co-main").empty();

    // Append category name
    $("#fh5co-main").append('<div><h3>' + selectedCategory +  '</h3></div>');

    // Append articles data
    $.each(articles[selectedCategory], function(index, article) {
      $("#fh5co-main").append(
        '<a class="article" href="' + article.url + '" target="_blank">' +
          '<div class="col-md-3 col-sm-6 col-padding" id="' + index + '">' +
            '<div class="blog-entry">' +
              '<a href="' + article.link + '" target="_blank"' + ' id="' + index + '"' + ' class="blog-img"><img src="' + article.image + '"' + ' class="img-responsive"></a>' +
              '<div class="desc">' +
                '<h3>' + article.title + '</h3>' +
                // '<p>' + article.source + '</p>' +
                '<a href="#" class="lead">Read More <i class="icon-arrow-right3"></i></a>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</a>'           

        // '<a class="article" href="' + article.url + '" target="_blank">' +
        //   '<div class="row">' +   
        //       '<p>' + article.title + '</p>' + 
        //       '<p>' + article.source + '</p>' +
        //       '<p>' + article.content + '</p>' +
        //       '<p>' + article.date + '</p>' +
        //       '<img src="' + article.imageURL + '" width="200">' +
        //   '</div>' +
        // '</a>'

      );
    });
  });
  // Index of clicked article is equivalent to the index of the <a> tag child under #articles-container
  $("#fh5co-main").on("click", "a", function(event) {

    console.log("HIIIII")
    selectedArticleIndex = $(this).index() - 1 // Array starts at 0
    console.log($(selectedArticleIndex))
    // selectedArticle = articles[selectedCategory][selectedArticleIndex]
    // articlesRead.push(selectedArticle)
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





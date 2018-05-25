var colors = ["#657A88", "#69C9F3", "#E258DC", "#7C4CDB", "#39D6A9"];
var fullPost = "";

$(document).ready(function() {
  // $("#newQuote").on("click", function() {
  //   $.getJSON(
  //     "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",
  //     function(a) {
  //       $("#quote-content").append(
  //         a[0].content + "<p>&mdash; " + a[0].title + "</p>"
  //       );
  //     }
  //   );
  // });

  // New Quote Event Handler
  $("#newQuote2").on("click", function(e) {
    e.preventDefault();

    // random color
    var random_color = colors[Math.floor(Math.random() * colors.length)];
    $("body").css("background-color", random_color);
    $("body").css("transition", "2s");
    $(".twitter").css("background", random_color);
    $(".twitter").css("border-radius", "5px");
    $(".twitter").css("transition", "2s");
    $(".tumblr").css("background", random_color);
    $(".tumblr").css("border-radius", "5px");
    $(".tumblr").css("transition", "2s");
    $(".newQuote2").css("background", random_color);
    $(".newQuote2").css("transition", "2s");

    $(".quote-content").css("transition", "3s");
    $(".quote-content").css("transition-timing-function", "ease-in-out");
    $(".quote-content").css("opacity", "1");

    $.ajax({
      url:
        "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",
      success: function(data) {
        var post = data.shift(); // The data is an array of posts. Grab the first one.

        var fullPost =
          post.content.replace("<p>", "").replace("</p>", "") +
          "-" +
          post.title;
        console.log(fullPost);

        $("#quote-title").text("—" + post.title);
        $("#quote-content").html(post.content);

        // If the Source is available, use it. Otherwise hide it.
        if (
          typeof post.custom_meta !== "undefined" &&
          typeof post.custom_meta.Source !== "undefined"
        ) {
          $("#quote-source").html("Source:" + post.custom_meta.Source);
        } else {
          $("#quote-source").text("");
        }
      },
      cache: false
    });
  });

  // Tweet button event handler
  $("#rqtweetit").click(function() {
    $(this).attr("href", "https://twitter.com/intent/tweet?text=" + fullPost);
  });
});

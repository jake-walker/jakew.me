$(document).ready(function() {
  getBadges();
});

function getBadges() {
  $.get("https://backpack.openbadges.org/displayer/" + config.earnerId + "/group/" + config.groupId + ".json", function(data) {
    console.log("Fetched Badges!");
    
    for (var i = 0; i < data.badges.length; i++) {
      var b = data.badges[i];
      $("#badges").append(`<a href='${(b.assertion.evidence || b.hostedUrl)}'><img src='${b.imageUrl}' class='jw-badge img-fluid'></a>`);
    }

    $("#badges").delay(1000).fadeIn(1000);
  });  
}
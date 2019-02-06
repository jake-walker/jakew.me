function getBadges(cb) {
  $.get("https://backpack.openbadges.org/displayer/" + config.earnerId + "/group/" + config.groupId + ".json", function(data) {
    console.log("Fetched Badges!");
    
    for (var i = 0; i < data.badges.length; i++) {
      var b = data.badges[i];
      $("#obadges").append(`<a href='${(b.assertion.evidence || b.hostedUrl)}'><img src='${b.imageUrl}' class='jw-obadge img-fluid'></a>`);
    }

    $("#obadges").show();
  }).always(function() {
    cb();
  });
}
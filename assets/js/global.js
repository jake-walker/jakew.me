$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

function doPreload() {
  $(".preloader").delay(500).fadeOut(1000);
}
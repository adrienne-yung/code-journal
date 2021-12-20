/* global data */
/* exported data */

var $image = document.querySelector('.placeholder-image');
var $inputPhotoUrl = document.querySelector('#photo');

$inputPhotoUrl.addEventListener('input', inputPhoto);
function inputPhoto(event) {
  var $inputPhotoUrlValue = $inputPhotoUrl.value;
  $image.setAttribute('src', $inputPhotoUrlValue);
}

/* global data */
/* exported data */
var $inputPhotoUrl = document.querySelector('#photo');
var $image = document.querySelector('.placeholder-image');

$inputPhotoUrl.addEventListener('input', inputPhoto);
function inputPhoto(event) {
  var $inputPhotoUrlValue = $inputPhotoUrl.value;
  $image.setAttribute('src', $inputPhotoUrlValue);
}

var $form = document.querySelector('#entry-form');
$form.addEventListener('submit', submitHandler);
function submitHandler(event) {
  var entryValues = {
    entryId: data.nextEntryId,
    photoURL: $form.photo.value,
    title: $form.title.value,
    notes: $form.notes.value
  };
  event.preventDefault();
  data.nextEntryId++;
  data.entries.push(entryValues);
  $image.setAttribute('src', './images/placeholder-image-square.jpg');
  $form.reset();
}

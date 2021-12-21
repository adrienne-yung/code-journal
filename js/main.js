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
  data.entries.unshift(entryValues);
  var entry = renderEntry(entryValues);
  unorderedList.prepend(entry);
  $image.setAttribute('src', './images/placeholder-image-square.jpg');
  $form.reset();
  switchViews('entries');
}

function renderEntry(entry) {
  var list = document.createElement('li');
  var divOne = document.createElement('div');
  divOne.setAttribute('class', 'row');
  list.appendChild(divOne);
  var divTwo = document.createElement('div');
  divTwo.setAttribute('class', 'column-half');
  divOne.appendChild(divTwo);
  var newImage = document.createElement('img');
  newImage.setAttribute('src', entry.photoURL);
  divTwo.appendChild(newImage);
  var divThree = document.createElement('div');
  divThree.setAttribute('class', 'column-half');
  divOne.appendChild(divThree);
  var header = document.createElement('h4');
  header.textContent = entry.title;
  divThree.appendChild(header);
  var paragraph = document.createElement('p');
  paragraph.textContent = entry.notes;
  divThree.appendChild(paragraph);
  return list;
}

var unorderedList = document.querySelector('ul');
window.addEventListener('DOMContentLoaded', newEntryUpload);
function newEntryUpload(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var render = renderEntry(data.entries[i]);
    unorderedList.appendChild(render);
  }
  switchViews(data.view);
  noEntriesListed();
}

var $view = document.querySelectorAll('.view');
var $paragraph = document.querySelector('p');
function switchViews(viewName) {
  for (var i = 0; i < $view.length; i++) {
    if ($view[i].getAttribute('data-view') === viewName) {
      $view[i].className = 'view';
      data.view = viewName;
    } else {
      $view[i].className = 'view hidden';
    }
  }
  noEntriesListed();
}

function noEntriesListed() {
  if (data.entries.length === 0) {
    $paragraph.className = 'no-entries-paragraph text-align-center';
  } else {
    $paragraph.className = 'no-entries-paragraph text-align-center hidden';
  }
}

var $a = document.querySelector('a');
var $newButton = document.querySelector('.new-button');
$a.addEventListener('click', grabView);
$newButton.addEventListener('click', grabView);
function grabView(event) {
  var displayView = event.target.getAttribute('data-view');
  switchViews(displayView);
}

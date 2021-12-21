/* global data */
/* exported data */
var $inputPhotoUrl = document.querySelector('#photo');
var $image = document.querySelector('.placeholder-image');

$inputPhotoUrl.addEventListener('input', inputPhoto);
function inputPhoto(event) {
  var $inputPhotoUrlValue = $inputPhotoUrl.value;
  $image.setAttribute('src', $inputPhotoUrlValue);
}
var $notes = document.querySelector('.notes');
var $title = document.querySelector('.title');
var $form = document.querySelector('#entry-form');
var $unorderedList = document.querySelector('ul');
$form.addEventListener('submit', submitHandler);
function submitHandler(event) {
  if (data.editing === null) {
    var entryValues = {
      entryId: data.nextEntryId,
      photoURL: $form.photo.value,
      title: $title.value,
      notes: $notes.value
    };
    data.nextEntryId++;
    data.entries.unshift(entryValues);
    var entry = renderEntry(entryValues);
    $unorderedList.prepend(entry);
  } else {
    var entryValuesEdit = {
      entryId: data.editing,
      photoURL: $form.photo.value,
      title: $title.value,
      notes: $notes.value
    };
    for (var i = 0; i < data.entries.length; i++) {
      if (entryValuesEdit.entryId === data.entries[i].entryId) {
        data.entries[i] = entryValuesEdit;
      }
    }
    var $listOfEntries = document.querySelectorAll('li');
    for (var j = 0; j < $listOfEntries.length; j++) {
      if (entryValuesEdit.entryId === parseInt($listOfEntries[j].getAttribute('data-entry-id'))) {
        $listOfEntries[j].replaceWith(renderEntry(entryValuesEdit));
      }
    }
  }
  event.preventDefault();
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
  var divFour = document.createElement('div');
  divFour.setAttribute('class', 'display-flex-icon justify-content-space-between');
  divThree.appendChild(divFour);
  var header = document.createElement('h4');
  header.textContent = entry.title;
  divFour.appendChild(header);
  var divFive = document.createElement('div');
  divThree.appendChild(divFive);
  var paragraph = document.createElement('p');
  paragraph.textContent = entry.notes;
  divFive.appendChild(paragraph);
  var editIcon = document.createElement('i');
  editIcon.setAttribute('class', 'fas fa-pen icon-padding');
  divFour.appendChild(editIcon);
  return list;
}

// var $unorderedList = document.querySelector('ul');
window.addEventListener('DOMContentLoaded', newEntryUpload);
function newEntryUpload(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var render = renderEntry(data.entries[i]);
    $unorderedList.appendChild(render);
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

$unorderedList.addEventListener('click', editIconHandler);
function editIconHandler(event) {
  if (event.target.tagName === 'I') {
    var grabEditEntryId = parseInt(event.target.closest('li').getAttribute('data-entry-id'));
    data.editing = grabEditEntryId;
    for (var i = 0; i < data.entries.length; i++) {
      if (grabEditEntryId === data.entries[i].entryId) {
        $form.title.value = data.entries[i].title;
        $inputPhotoUrl.value = data.entries[i].photoURL;
        $form.notes.value = data.entries[i].notes;
        $image.setAttribute('src', $inputPhotoUrl.value);
        switchViews('entry-form');
      }
    }
  }
}

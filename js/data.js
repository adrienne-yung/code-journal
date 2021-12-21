/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', stringifyData);
function stringifyData(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data-local-storage', dataJSON);
}

var pastData = localStorage.getItem('data-local-storage');
if (pastData !== null) {
  data = JSON.parse(pastData);
}

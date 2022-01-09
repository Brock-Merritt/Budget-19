const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

let db;


const request = indexedDB.open('budget',1);

request.onupgradeneeded= function(event) {
    const db = event.target.result;
    db.createObjectStore('new_budget', {autoIncrement: true});

}

request.onsuccess = function(event) {
    db = event.target.result;

    if(navigator.onLine){
        uploadBudgeto();
    }


};

request.onerror = function(event) {
    console.log(event.target.errorCode);
};

function saveRecord(record) {
    console.log(db);
    console.log(record)
    const transaction = db.transaction(['new_budget'], "readwrite");
    

    const budgetObjectStore = transaction.objectStore('new_budget');

    budgetObjectStore.add(record);
}


function uploadBudgeto() {
    // open a transaction on your db
    const transaction = db.transaction(['new_budget'], 'readwrite');
  
    // access your object store
    const budgetObjectStore = transaction.objectStore('new_budget');
  
    // get all records from store and set to a variable
    const getAll = budgetObjectStore.getAll();
  
    // more to come...
  }

window.addEventListener('online',saveRecord);
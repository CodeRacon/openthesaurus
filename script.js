function initSynonyms() {
  let query = document.getElementById('searchQuery').value.trim();
  let setAmount = document.getElementById('set-amount');

  if (query === '') {
    setAmount.innerHTML = /*html*/ `
  		<div class="synset-amount" >
  			Bitte gib einen Begriff ein.
  		</div>
  	`;
    return;
  } else {
    fetchSynonyms(query);
  }
}

async function fetchSynonyms(query) {
  let url = `https://www.openthesaurus.de/synonyme/search?q=${query}&format=application/json`;

  let response = await fetch(url);
  let responseAsJSON = await response.json();
  let synsets = responseAsJSON['synsets'];

  renderSynsets(synsets);
}

function renderSynsets(synsets, query) {
  let container = document.getElementById('container');
  let setAmount = document.getElementById('set-amount');

  container.innerHTML = ''; // Leere den Container zuerst
  setAmount.innerHTML = '';

  if (synsets.length === 0) {
    setAmount.innerHTML = /*html*/ `
  		<div class="synset-amount" >
  			Dazu konnten keine Synonyme gefunden werden. Tippfehler?
  		</div>
  	`;
  } else if (synsets.length === 1) {
    setAmount.innerHTML = /*html*/ `
  		<div class="synset-amount" >
  			Es wurde <span> 1 </span>Synonym-Set gefunden:
  		</div>
  	`;
  } else {
    setAmount.innerHTML = /*html*/ `
  		<div class="synset-amount" >
  			Es wurden <span> ${synsets.length} </span>Synonym-Sets gefunden:
  		</div>
  	`;
  }

  for (let i = 0; i < synsets.length; i++) {
    const synset = synsets[i];
    let terms = synset['terms'];

    let ul = document.createElement('ul'); // Erstelle ein neues <ul> Element für jedes Synset
    ul.innerHTML += `<h3>Set ${i + 1}:</h3>`; // Füge die Set-Überschrift hinzu

    for (let j = 0; j < terms.length; j++) {
      const term = terms[j];
      let li = document.createElement('li'); // Erstelle ein <li> Element für jedes Synonym
      li.textContent = term['term']; // Füge das Synonym zum <li> hinzu
      ul.appendChild(li); // Füge das <li> zum <ul> hinzu
    }

    container.appendChild(ul); // Füge das <ul> zum Hauptcontainer hinzu
  }
}

function renderInputNotion() {
  let container = document.getElementById('container');
  let setAmount = document.getElementById('set-amount');
  let query = document.getElementById('searchQuery').value;

  container.innerHTML = ''; // Leere den Container zuerst
  setAmount.innerHTML = ''; // Leere den Container zuerst

  if (query === '') {
    setAmount.innerHTML = /*html*/ `
  		<div class="synset-amount" >
  			Gib bitte ein Wort ein, für das du ein Synonym brauchst!
  		</div>
  	`;
  }
}

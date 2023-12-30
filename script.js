async function getSynonyms() {
  let url =
    'https://www.openthesaurus.de/synonyme/search?q=test&format=application/json';

  let response = await fetch(url);
  let responseAsJSON = await response.json();
  let synsets = responseAsJSON['synsets'];
  renderSynsets(synsets);
}

function renderSynsets(synsets) {
  let container = document.getElementById('container');

  container.innerHTML = /*html*/ `
    <div>
      Es wurden <b> ${synsets.length} </b>Synonym-Sets geladen.
    </div>
  `;
}

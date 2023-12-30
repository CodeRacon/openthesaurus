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
    <div class="synset-amount mb-2" >
      Es wurden <span> ${synsets.length} </span>Synonym-Sets geladen:
    </div>
  `;
}

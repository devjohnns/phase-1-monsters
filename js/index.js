const monsterContainer = document.getElementById('monster-container');
const createMonsterForm = document.getElementById('create-monster');
const forwardBtn = document.getElementById('forward');

let currentPage = 1;

// Fetch and display monsters
function fetchMonsters(page = 1) {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(res => res.json())
    .then(monsters => {
      monsterContainer.innerHTML = '';
      monsters.forEach(renderMonster);
    });
}

// Render a single monster
function renderMonster(monster) {
  const div = document.createElement('div');
  div.innerHTML = `
    <h2>${monster.name}</h2>
    <h4>Age: ${monster.age}</h4>
    <p>${monster.description}</p>
  `;
  monsterContainer.appendChild(div);
}

// Handle form submission
createMonsterForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = e.target.name.value;
  const age = e.target.age.value;
  const description = e.target.description.value;

  fetch('http://localhost:3000/monsters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ name, age, description })
  })
    .then(res => res.json())
    .then(monster => {
      renderMonster(monster);
      createMonsterForm.reset();
    });
});

// Handle next page button
forwardBtn.addEventListener('click', function() {
  currentPage++;
  fetchMonsters(currentPage);
});

// Initial load
fetchMonsters(currentPage);
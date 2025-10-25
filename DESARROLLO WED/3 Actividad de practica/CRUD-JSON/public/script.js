const list = document.getElementById('list');
const nameInput = document.getElementById('name');

async function loadItems() {
  const res = await fetch('/api/items');
  const data = await res.json();
  list.innerHTML = data.map(item => `
    <li>
      ${item.name}
      <button onclick="deleteItem(${item.id})">X</button>
    </li>
  `).join('');
}

async function addItem() {
  const name = nameInput.value;
  if (!name) return alert('Ingresa un nombre');
  await fetch('/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  nameInput.value = '';
  loadItems();
}

async function deleteItem(id) {
  await fetch('/api/items/' + id, { method: 'DELETE' });
  loadItems();
}

loadItems();

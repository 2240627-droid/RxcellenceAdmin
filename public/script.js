fetch('/api/medicines')
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector('#medicines-table tbody');
    data.forEach(medicines => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${medicines.id}</td><td>${medicines.name}</td><td>${medicines.brand}</td><td>${medicines.category}</td><td>${medicines.dosage}</td><td>${medicines.form}</td><td>${medicines.price}</td>`;
      tbody.appendChild(tr);
    });
  })
  .catch(err => console.error('Error fetching medicines:', err));
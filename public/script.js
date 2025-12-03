fetch('/api/admins')
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector('#admins-table tbody');
    data.forEach(admin => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${admin.id}</td><td>${admin.name}</td>`;
      tbody.appendChild(tr);
    });
  })
  .catch(err => console.error('Error fetching admins:', err));
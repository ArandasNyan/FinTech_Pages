const navItems = document.querySelectorAll('.nav-list-item');
const classe = 'selected';

navItems.forEach(item => {
  item.addEventListener('click', () => {
    navItems.forEach(navItem => navItem.classList.remove(classe));
    item.classList.add(classe);
  });
});

function addDespesa() {
  const descricao = document.getElementById('descricao').value;
  const valor = document.getElementById('valor').value;
  const data = document.getElementById('data').value;

  const table = document.querySelector('.despesas-table tbody');
  const newRow = table.insertRow();

  newRow.innerHTML = `
    <td class="despesa-description">${descricao}</td>
    <td class="despesa-amount">$${valor}</td>
    <td class="despesa-date">${data}</td>
    <td class="despesa-status">Pendente</td>
    <td class="despesa-actions">
      <button class="edit-button" onclick="editDespesa(this)">Editar</button>
      <button class="concluir-button" onclick="concluirDespesa(this)">Concluir</button>
      <button class="delete-button" onclick="excluirDespesa(this)">Excluir</button>
    </td>
  `;
}

function editDespesa(button) {
  const row = button.closest('tr');

  const descricao = row.querySelector('.despesa-description').innerText;
  const valor = row.querySelector('.despesa-amount').innerText.replace('$', '');
  const data = row.querySelector('.despesa-date').innerText;

  document.getElementById('editDescricao').value = descricao;
  document.getElementById('editValor').value = valor;
  document.getElementById('editData').value = data;

  document.getElementById('editDespesaModal').style.display = 'block';
}

function concluirDespesa(button) {
  const row = button.closest('tr');

  row.querySelector('.despesa-status').innerText = 'Concluído';
}

function excluirDespesa(button) {
  if (confirm('Tem certeza que deseja excluir esta despesa?')) {
    const row = button.closest('tr');
    row.remove();
  }
}

document.getElementById('closeEditDespesaButton').addEventListener('click', function () {
  document.getElementById('editDespesaModal').style.display = 'none';
});

document.getElementById('editSubmitDespesaButton').addEventListener('click', function () {
  const newDescricao = document.getElementById('editDescricao').value;
  const newValor = document.getElementById('editValor').value;
  const newData = document.getElementById('editData').value;

  const editedRow = document.querySelector('.despesas-table tbody .being-edited');
  editedRow.querySelector('.despesa-description').innerText = newDescricao;
  editedRow.querySelector('.despesa-amount').innerText = `$${newValor}`;
  editedRow.querySelector('.despesa-date').innerText = newData;

  document.getElementById('editDespesaModal').style.display = 'none';
});

document.getElementById('editDespesaModal').addEventListener('show.bs.modal', function () {
  const editedRow = document.querySelector('.despesas-table tbody tr');
  editedRow.classList.add('being-edited');
});

const navItems = document.querySelectorAll('.nav-list-item');
const classe = 'selected';

navItems.forEach(item => {
  item.addEventListener('click', () => {
    navItems.forEach(navItem => navItem.classList.remove(classe));
    item.classList.add(classe);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const editButtons = document.querySelectorAll('.edit-button');
  const deleteButtons = document.querySelectorAll('.delete-button');

  // Função para editar
  const handleEditClick = (event) => {
    const row = event.target.closest('tr');
    const nameElement = row.querySelector('.investment-name');
    const typeElement = row.querySelector('.investment-type');
    const amountElement = row.querySelector('.investment-amount');
    const dateElement = row.querySelector('.investment-date');

    const newName = prompt('Novo nome:', nameElement.textContent);
    const newType = prompt('Novo tipo:', typeElement.textContent);
    const newAmount = prompt('Novo valor:', amountElement.textContent);
    const newDate = prompt('Nova data:', dateElement.textContent);

    // Atualiza os valores na tabela
    nameElement.textContent = newName;
    typeElement.textContent = newType;
    amountElement.textContent = newAmount;
    dateElement.textContent = newDate;
  };

  // Função para excluir
  const handleDeleteClick = (event) => {
    const row = event.target.closest('tr');
    row.remove();
  };

  editButtons.forEach((button) => {
    button.addEventListener('click', handleEditClick);
  });

  deleteButtons.forEach((button) => {
    button.addEventListener('click', handleDeleteClick);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.complete-button').forEach(function (button) {
    button.addEventListener('click', function () {
      const row = button.closest('tr');
      row.style.border = '1px solid limegreen';
      row.style.backgroundColor = 'rgba(50, 205, 50, 0.2)';
      setTimeout(function () {
        row.remove();
      }, 3000); // 3000 milissegundos = 3 segundos
    });
  });

  document.querySelectorAll('.delete-button').forEach(function (button) {
    button.addEventListener('click', function () {
      const row = button.closest('tr');
      row.style.transition = 'opacity 0.8s, height 0.8s';
      row.style.opacity = 0;
      row.style.height = 0;
      setTimeout(function () {
        row.remove();
      }, 800); // 800 milissegundos = 0.8 segundos
    });
  });
});

const navItems = document.querySelectorAll('.nav-list-item');
const classe = 'selected';

navItems.forEach(item => {
  item.addEventListener('click', () => {
    navItems.forEach(navItem => navItem.classList.remove(classe));
    item.classList.add(classe);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Dados fictícios para as receitas
  const receitasData = [
    { descricao: "Salário", valor: 3500.0, data: "2023-01-02" },
    // Adicione outras receitas conforme necessário
  ];

  // Referências aos elementos do HTML
  const receitasTable = document.querySelector(".receitas-table tbody");
  const addReceitaButton = document.getElementById("addReceitaButton");
  const addReceitaModal = document.getElementById("addReceitaModal");
  const closeAddButton = document.getElementById("closeButton");
  const addReceitaForm = document.getElementById("addReceitaForm");
  const editReceitaModal = document.getElementById("editReceitaModal");
  const closeEditButton = document.getElementById("closeEditButton");
  const editReceitaForm = document.getElementById("editReceitaForm");
  const editSubmitButton = document.getElementById("editSubmitButton");

  // Função para formatar valor como moeda
  const formatCurrency = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

  // Função para adicionar uma nova linha à tabela
  const addReceitaRow = (receita) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td class="receita-description">${receita.descricao}</td>
      <td class="receita-amount">${formatCurrency(receita.valor)}</td>
      <td class="receita-date">${receita.data}</td>
      <td class="receita-actions">
        <button class="edit-button" data-descricao="${receita.descricao}" data-valor="${receita.valor}" data-data="${receita.data}">Editar</button>
        <button class="delete-button">Excluir</button>
      </td>
    `;
    receitasTable.appendChild(newRow);

    // Adiciona listeners aos botões de editar e excluir
    const editButton = newRow.querySelector(".edit-button");
    const deleteButton = newRow.querySelector(".delete-button");

    editButton.addEventListener("click", () => {
      editReceitaModal.style.display = "block";
      // Preenche o formulário de edição com os dados da receita
      editReceitaForm.descricao.value = editButton.getAttribute("data-descricao");
      editReceitaForm.valor.value = editButton.getAttribute("data-valor");
      editReceitaForm.data.value = editButton.getAttribute("data-data");
    });

    deleteButton.addEventListener("click", () => {
      newRow.remove();
    });
  };

  // Adiciona as receitas iniciais à tabela
  receitasData.forEach((receita) => addReceitaRow(receita));

  // Exibe o modal ao clicar no botão Adicionar Receita
  addReceitaButton.addEventListener("click", () => {
    addReceitaModal.style.display = "block";
  });

  // Fecha o modal ao clicar no botão Fechar
  closeAddButton.addEventListener("click", () => {
    addReceitaModal.style.display = "none";
    addReceitaForm.reset();
  });

  // Fecha o modal de edição ao clicar no botão Fechar
  closeEditButton.addEventListener("click", () => {
    editReceitaModal.style.display = "none";
    editReceitaForm.reset();
  });

  // Adiciona uma nova receita ao enviar o formulário
  addReceitaForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const descricao = addReceitaForm.descricao.value;
    const valor = parseFloat(addReceitaForm.valor.value);
    const data = addReceitaForm.data.value;
    const novaReceita = { descricao, valor, data };
    addReceitaRow(novaReceita);
    addReceitaModal.style.display = "none";
    addReceitaForm.reset();
  });

  // Salva as alterações ao enviar o formulário de edição
  editReceitaForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const descricao = editReceitaForm.descricao.value;
    const valor = parseFloat(editReceitaForm.valor.value);
    const data = editReceitaForm.data.value;

    // Atualiza os dados da linha na tabela
    const editButton = document.querySelector(".edit-button:focus");
    const row = editButton.parentElement.parentElement;
    row.querySelector(".receita-description").textContent = descricao;
    row.querySelector(".receita-amount").textContent = formatCurrency(valor);
    row.querySelector(".receita-date").textContent = data;

    editReceitaModal.style.display = "none";
    editReceitaForm.reset();
  });

  // Fecha o modal ao clicar fora dele
  window.addEventListener("click", (event) => {
    if (event.target === addReceitaModal) {
      addReceitaModal.style.display = "none";
      addReceitaForm.reset();
    } else if (event.target === editReceitaModal) {
      editReceitaModal.style.display = "none";
      editReceitaForm.reset();
    }
  });
});

// Seleciona os elementos do formulário.
const form = document.querySelector("form"); // Seleciona o formulário inteiro
const amount = document.getElementById("amount"); // Campo de valor da despesa
const expense = document.getElementById("expense"); // Campo de nome da despesa
const category = document.getElementById("category"); // Campo de categoria da despesa

// Seleciona o elemento da lista onde as despesas serão exibidas.
const expenseList = document.querySelector("ul"); // Lista (<ul>) das despesas
const expenseQuantity = document.querySelector("aside header p span");
const expensesTotal = document.querySelector("aside header h2");

// Captura o evento de input no campo de valor para formatar automaticamente em Real (R$).
amount.oninput = () => {
  let value = amount.value.replace(/\D/g, ""); // Remove qualquer caractere não numérico

  value = Number(value) / 100; // Converte para centavos (ex: 1234 => 12,34)

  amount.value = formatCurrencyBRL(value); // Atualiza o campo com valor formatado
};

// Função que formata o número para o padrão BRL (Real brasileiro).
function formatCurrencyBRL(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return value; // Retorna o valor formatado como R$ X,XX
}

// Captura o evento de envio do formulário para criar uma nova despesa.
form.onsubmit = (event) => {
  event.preventDefault(); // Impede o recarregamento da página ao enviar o formulário

  // Cria um objeto contendo os detalhes da nova despesa.
  const newExpense = {
    id: new Date().getTime(), // ID único baseado no timestamp atual
    expense: expense.value, // Nome da despesa digitado pelo usuário
    category_id: category.value, // ID da categoria selecionada
    category_name: category.options[category.selectedIndex].text, // Nome (texto) da categoria selecionada
    amount: amount.value, // Valor da despesa (já formatado)
    created_at: new Date(), // Data e hora atual da criação
  };

  expenseAdd(newExpense); // Chama a função para adicionar essa despesa na lista
};

// Função que cria e adiciona o item da despesa na lista (<ul>).
function expenseAdd(newExpense) {
  try {
    // Cria o item da lista (<li>) que irá conter a despesa.
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense"); // Adiciona uma classe para estilização

    // Cria o ícone da categoria da despesa.
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`); // Define o caminho da imagem baseado no ID da categoria
    expenseIcon.setAttribute("alt", newExpense.category_name); // Define o texto alternativo da imagem

    // Cria uma <div> para armazenar o nome e a categoria da despesa.
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info"); // Classe para estilização da <div>

    // Cria o elemento <strong> para exibir o nome da despesa.
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense; // Define o texto com o nome da despesa

    // Cria o elemento <span> para exibir o nome da categoria.
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name; // Define o texto com o nome da categoria

    // Adiciona o nome e a categoria dentro da <div> de informações.
    expenseInfo.append(expenseName, expenseCategory);

    // Adiciona o item <li> na lista (<ul>).
    expenseList.append(expenseItem);

    // Cria o valor da despesa
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small> ${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`;

    // Cria o icone de remover
    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "img/remove.svg");
    removeIcon.setAttribute("alt", "remover");

    // Adiciona o ícone e a <div> com informações dentro do item <li>.
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

    // Atualiza os totais da lista.
    updateTotals();
  } catch (error) {
    // Se algo der errado, exibe um alerta e registra o erro no console.
    alert("Erro inesperavado, não foi possivel atualizar a lista de despesas");
    console.log(error);
  }
}

function updateTotals() {
  try {
    const items = expenseList.children;
    let total = 0;

    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount");

      let value = itemAmount.textContent
        .replace(/[^\d,]/g, "")
        .replace(",", ".");

      value = parseFloat(value);

      if (isNaN(value)) {
        alert("Não foi possivel calcular o total. O valor não parece ser um número");
      }

      total += Number(value); // Corrigido: soma o valor ao total
    }

    expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`;

    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"

    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")
    
    expensesTotal.innerHTML = ""

    expensesTotal.append(symbolBRL, total)

  } catch (error) {
    console.log(error);
    alert("algo deu errado, tente novamente mais tarde");
  }
}


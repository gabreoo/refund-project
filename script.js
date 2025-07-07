// seleciona os elementos do formulário.
const form = document.querySelector("form")
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category")



// Captura o evento de input para formatar o valor.
amount.oninput = () => {
  let value = amount.value.replace(/\D/g, "");

  // Primeiro troca o valor de texto para número e depois converte para centavos para fazer a mudança de formato
  // (exemplo: 150 / 100 = 1.5 que é 1,50)
  value = Number(value) / 100;

  amount.value = formatCurrencyBRL(value);
};

function formatCurrencyBRL(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return value;
}

form.onsubmit = (event) => {
  event.preventDefault()

  // Cria um objeto com os detalhes da nova despesa
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date()
  }

}

function expenseAdd (newExpense) {
  try {
    
  } catch (error) {
    alert("Erro inesperavado, não foi possivel atualizar a lista de despesas")
    console.log(error)
  }
}


document.getElementById("expForm").addEventListener("submit", addExpense);

const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense(e) {
  e.preventDefault();

  let date = document.getElementById("date").value;
  let amount = document.getElementById("amount").value;
  let category = document.getElementById("category").value;

  if (date != 0 && amount > 0 && category.length > 0) {
    const expense = {
      date,
      amount,
      category,
      id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
    };
    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
  document.getElementById("expForm").reset();
  showExpenses();
}

const showExpenses = () => {
  const expenseTable = document.getElementById("expenseTable");

  expenseTable.innerHTML = "";

  for (let i = 0; i < expenses.length; i++) {
    expenseTable.innerHTML += `
            <tr class="text-center">
                <td>${expenses[i].date}</td>
                <td>${expenses[i].amount}</td>
                <td>${expenses[i].category}</td>
                <td><a class="btn btn-danger" onclick="deleteExpense(${expenses[i].id})">
                    <i class="fa-solid fa-trash"></i></td>
            </tr>      
        `;
  }
};

const deleteExpense = (id) => {
  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].id == id) {
      expenses.splice(i, 1);
    }
  }

  localStorage.setItem("expenses", JSON.stringify(expenses));
  showExpenses();
};

showExpenses();

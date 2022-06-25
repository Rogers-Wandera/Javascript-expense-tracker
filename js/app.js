class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }
  submitBudgetForm() {
    if(this.budgetInput.value === "" || this.budgetInput < 0) {
      this.budgetFeedback.classList.add("showItem");
      this.budgetFeedback.innerHTML = `<p> Value must not be empty or negative </p>`
      const self = this;
      setTimeout(function() {
        self.budgetFeedback.classList.remove("showItem");
      },4000)
    } else {
      this.budgetAmount.textContent = this.budgetInput.value;
      this.budgetInput.value = "";
      this.showBalance()
    }
  }

  submitExpenseForm() {
    const expenseTitle = this.expenseInput.value;
    const expenseValueAmount = this.amountInput.value;

    if(expenseTitle === "" || expenseValueAmount === "" || expenseValueAmount < 0) {
      this.expenseFeedback.classList.add("showItem");
      this.expenseFeedback.innerHTML = `Values must not be empty or negative </p>`
      const self = this;

      setTimeout(function() {
        self.expenseFeedback.classList.remove("showItem");
      })
    } else {
      let amount = parseInt(expenseValueAmount);

      this.expenseInput.value = "";
      this.amountInput.value = "";
      let expenseObject = {
        title: expenseTitle,
        amount: amount,
        id: this.itemID
      }
      this.itemID++
      this.itemList.push(expenseObject);
      this.showBalance()
      this.showExpenseItems(expenseObject)
    }
  }

  showBalance() {
    let expense = this.expenseTotal()
    const total = parseInt(this.budgetAmount.textContent) - expense
    this.balanceAmount.textContent = total
  }

  expenseTotal() {
    let total = 0;
    total = this.itemList.reduce(function(accumulator, currentValue) {
      accumulator += currentValue.amount
      return accumulator;
    },0)
    this.expenseAmount.textContent = total
    return total
  }

  showExpenseItems(expense) {
    let div = document.createElement("div");
    div.classList.add("expense");
    div.innerHTML = `
    <div class="expense-item d-flex justify-content-between align-items-baseline">

    <h6 class="expense-title mb-0 text-uppercase list-item">- ${expense.title}</h6>
    <h5 class="expense-amount mb-0 list-item"> ${expense.amount}</h5>

    <div class="expense-icons list-item">

     <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
      <i class="fas fa-edit"></i>
     </a>
     <a href="#" class="delete-icon" data-id="${expense.id}">
      <i class="fas fa-trash"></i>
     </a>
    </div>
   </div>
    `
    this.expenseList.appendChild(div)
  }

  editItem(element) {
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement
    console.log(parent)
    // remove from dom
    this.expenseList.removeChild(parent);
    let expense = this.itemList.filter(function(item) {
      return item.id === id;
    })
    // show value in input fields
    this.expenseInput.value = expense[0].title;
    this.amountInput.value = expense[0].amount;

    // remove from List
    let tempList = this.itemList.filter(function(item) {
      return item.id !==id;
    })
    this.itemList = tempList
    this.showBalance()
  }

  deleteItem(element) {
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement
    console.log(parent)
    // remove from dom
    this.expenseList.removeChild(parent);
    // remove from List
    let tempList = this.itemList.filter(function(item) {
      return item.id !==id;
    })
    this.itemList = tempList
    this.showBalance()
  }
}

function addEventListeners() {
  const budgetFormListener = document.getElementById("budget-form");
  const expenseFormListener = document.getElementById("expense-form");
  const expenseListListener = document.getElementById("expense-list");

  const ui = new UI();

  budgetFormListener.addEventListener("submit", function(e) {
    e.preventDefault()
    ui.submitBudgetForm();
  })

  expenseFormListener.addEventListener("submit", function(e){
    e.preventDefault()
    ui.submitExpenseForm()
  })

  expenseListListener.addEventListener("click", function(e) {
    if(e.target.parentElement.classList.contains("edit-icon")){
      ui.editItem(e.target.parentElement)
    }
    else if(e.target.parentElement.classList.contains("delete-icon")){
      ui.deleteItem(e.target.parentElement)
    }
  })
}

document.addEventListener("DOMContentLoaded", function() {
  addEventListeners();
})
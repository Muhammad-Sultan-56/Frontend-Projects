import { useEffect, useState } from "react";
import "./App.css";
import IncomeModal from "./components/IncomeModal";
import ExpenseModal from "./components/ExpenseModal";

function App() {
  const [income, setIncome] = useState(0);
  const [balance, setBalance] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [isIncomModalOpen, setIsIncomModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  // open the income modal function
  const openIncomModal = () => {
    setIsIncomModalOpen(true);
  };

  // close income modal function
  const handleIncomModalClose = () => {
    setIsIncomModalOpen(false);
  };

  // open the expense modal function
  const openExpenseModal = () => {
    setIsExpenseModalOpen(true);
  };

  // close income modal function
  const closeExpenseModal = () => {
    setIsExpenseModalOpen(false);
  };

  // add income
  const handleIncome = (amount) => {
    // es6 +amount is converting string amount to number
    setIncome(income + +amount);
    handleIncomModalClose();
  };

  // add expense func
  const addExpense = (expeseObj) => {
    const newExpAr = [...expenses, expeseObj];

    // update remaining balance
    setExpenses(newExpAr);
  };

  useEffect(() => {
    // calculations
    let totalExp = 0;

    expenses.forEach((exp) => {
      totalExp += +exp.expense;
    });

    setBalance(income - totalExp);
    setTotalExpense(totalExp);
  }, [expenses, income]);

  // remove/delete
  const deleteExpense = (index) => {
    const text = expenses.filter((el, i) => i != index);
    setExpenses(text);
  };

  return (
    <>
      <div className="container">
        <div className="bg-dark text-white p-3">
          <h1 className="text-center mb-5">Expense Tracker</h1>
          <div className="row">
            <div className="col-md-4 text-center">
              <h3>Amount In</h3>
              <h5 className="text-success">${income}</h5>
              <button className="btn btn-success" onClick={openIncomModal}>
                Add Income
              </button>

              <IncomeModal
                handleIncome={handleIncome}
                isIncomModalOpen={isIncomModalOpen}
                handleIncomModalClose={handleIncomModalClose}
              />
            </div>

            <div className="col-md-4 text-center">
              <h3>Expenses</h3>
              <h5 className="text-warning">${totalExpense}</h5>
            </div>

            <div className="col-md-4 text-center">
              <h3>Balance</h3>
              <h5 className="text-danger">${balance}</h5>
              <button className="btn btn-danger" onClick={openExpenseModal}>
                Add Expense
              </button>
              <ExpenseModal
                addExpense={addExpense}
                isExpenseModalOpen={isExpenseModalOpen}
                closeExpenseModal={closeExpenseModal}
                setIsExpenseModalOpen={setIsExpenseModalOpen}
              />
            </div>
          </div>
        </div>
        <div className="p-3 bg-white">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp, i) => {
                return (
                  <tr key={i}>
                    <td>{exp.date}</td>
                    <td>{exp.detail}</td>
                    <td>{exp.category}</td>
                    <td>${exp.expense}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteExpense(i)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;

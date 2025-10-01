import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { AuthContext } from "../contexts/AuthContext";

const COLORS = ["#4CAF50", "#F44336", "#2196F3", "#FFC107", "#9C27B0"];

const BudgetTracker = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    type: "income",
    description: "",
    amount: "",
  });

  // Fetch transactions from backend
  useEffect(() => {
    if (!user?.email) return;
    axios
      .get(
        `https://eduorbit-server.vercel.app/api/transactions?email=${user.email}`
      )
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error(err));
  }, [user]);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    const newTransaction = {
      ...formData,
      amount: parseFloat(formData.amount),
      userEmail: user.email,
    };

    try {
      const res = await axios.post(
        "https://eduorbit-server.vercel.app/api/transactions",
        newTransaction
      );
      setTransactions([...transactions, res.data]);
      setFormData({ type: "income", description: "", amount: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await axios.delete(
        `https://eduorbit-server.vercel.app/api/transactions/${id}`
      );
      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const chartData = [
    { name: "Income", value: totalIncome },
    { name: "Expenses", value: totalExpenses },
  ];

  return (
    <div className="w-11/12 mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-4xl text-center font-bold mb-4">💰 Budget Tracker</h2>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
        <div className="bg-green-100 p-4 rounded">
          <h3 className="text-lg font-semibold text-green-800">Income</h3>
          <p className="text-2xl font-bold text-green-700">${totalIncome}</p>
        </div>
        <div className="bg-red-100 p-4 rounded">
          <h3 className="text-lg font-semibold text-red-800">Expenses</h3>
          <p className="text-2xl font-bold text-red-700">${totalExpenses}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded">
          <h3 className="text-lg font-semibold text-blue-800">Balance</h3>
          <p className="text-2xl font-bold text-blue-700">${balance}</p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleAddTransaction}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
      >
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      {/* Transactions */}
      <div className="mb-6">
        <h3 className="text-4xl text-center font-bold mb-2">Transactions</h3>
        {transactions.length === 0 ? (
          <p className="text-4xl text-center text-gray-500">
            No transactions yet.
          </p>
        ) : (
          <ul className="divide-y">
            {transactions.map((t) => (
              <li
                key={t._id}
                className="flex justify-between items-center py-2"
              >
                <div>
                  <p className="font-medium">{t.description}</p>
                  <p className="text-sm text-gray-500">{t.type}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p
                    className={`font-bold ${
                      t.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"}${t.amount}
                  </p>
                  <button
                    onClick={() => handleDeleteTransaction(t._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BudgetTracker;

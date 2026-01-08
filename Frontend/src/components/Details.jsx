import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function Details() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ Categoty: "", Amount: "", Date: "" });
  const [editId, setEditId] = useState(null);
  const [startDate, setStartDate] = useState(null);

  const API = "http://localhost:5000/users";

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await axios.get(API);
    setUsers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      Categoty: form.Categoty,
      Amount: Number(form.Amount),
      Date: startDate,
    };

    try {
      if (editId) {
        await axios.put(`${API}/sr/${editId}`, payload);

        setEditId(null);
      } else {
        await axios.post(API, payload);
      }

      setForm({ Categoty: "", Amount: "", Date: "" });
      setStartDate(null);

      loadUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/sr/${id}`);
    loadUsers();
  };

  const handleEdit = (u) => {
    if (!u) return; // safety check

    setForm({
      Categoty: u.Categoty || "",
      Amount: u.Amount || "",
      Date: u.Date || "",
    });

    setStartDate(u?.Date ? new Date(u.Date) : null);

    setEditId(u.srNo);
  };

  return (
    <div className="flex justify-center m-5 select-none">
      <div className="border-2 p-6 rounded-xl shadow-2xl">
        <form onSubmit={handleSubmit}>
          <label>Categoty:</label>
          <input
            className="border-2 border-blue-400 rounded ml-5"
            type="text"
            value={form.Categoty}
            onChange={(e) => setForm({ ...form, Categoty: e.target.value })}
            placeholder="Enter Category"
            required
          />
          <br />

          <label className="mt-3">Amount:</label>
          <input
            className="border-2 border-blue-400 rounded ml-6"
            type="number"
            value={form.Amount}
            onChange={(e) => setForm({ ...form, Amount: e.target.value })}
            placeholder="Enter Amount"
            required
          />
          <br />

          <label className="mt-3">Date:</label>
          <DatePicker className="ml-12 border-blue-400 border-2 rounded"
            selected={
              startDate instanceof Date && !isNaN(startDate) ? startDate : null
            }
            onChange={(date) => setStartDate(date)}
            placeholderText="Select a date"
            required
          />
          <br />

          <button
            className="bg-blue-500 text-white px-4 rounded mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!form.Categoty || !form.Amount || !startDate}
          >
            {editId ? "Update" : "Add"}
          </button>
        </form>

        <h1 className="font-bold mt-5">Items</h1>
        <br />
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Sr. No.</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 font-semibold">
                  Nothing in the cart
                </td>
              </tr>
            ) : (
              users.map((u, index) => (
                <tr key={u._id}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">{u.Categoty}</td>
                  <td className="border p-2">{u.Amount}</td>
                  <td className="border p-2">
                    {u.Date ? new Date(u.Date).toLocaleDateString() : ""}
                  </td>
                  <td className="border p-2">
                    <button
                      className="m-2 border-2 border-green-500 hover:bg-green-500 hover:text-white rounded-lg p-2"
                      onClick={() => handleEdit(u)}
                    >
                      Edit
                    </button>

                    <button
                      className="m-2 border-2 border-red-500 hover:bg-red-500 hover:text-white rounded-lg p-2"
                      onClick={() => handleDelete(u.srNo)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <br />
        <p className="font-bold">Summary : </p>
        <div className="mt-4 font-bold text-lg">
          Total Amount: ₹
          {users.reduce((sum, u) => sum + Number(u.Amount || 0), 0)}
        </div>
      </div>
    </div>
  );
}

export default Details;

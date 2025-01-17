import React, { useState } from "react";

const Incomes = () => {
  const [incomes, setIncomes] = useState([]);
  const [billingID, setBillingID] = useState("001");
  const [selectedBillingID, setSelectedBillingID] = useState("001");
  const [isEditingOldBilling, setIsEditingOldBilling] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null); // Track row being edited
  const [editIncome, setEditIncome] = useState(null); // Temp storage for editing
  const [newIncome, setNewIncome] = useState({
    name: "",
    category: "Restaurant",
    quantityKg: "",
    quantityG: "",
    quantity: "",
    unitPrice: "",
    total: 0,
    date: new Date().toISOString().split("T")[0],
    billingID: billingID,
    unitType: "Count",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIncome((prev) => ({
      ...prev,
      [name]: value,
      billingID: isEditingOldBilling ? selectedBillingID : billingID,
    }));
  };

  const handleCategoryChange = (e) => {
    setNewIncome((prev) => ({
      ...prev,
      category: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const total =
      newIncome.unitType === "Weight"
        ? (Number(newIncome.quantityKg) + Number(newIncome.quantityG) / 1000) *
          Number(newIncome.unitPrice)
        : Number(newIncome.quantity) * Number(newIncome.unitPrice);

    const incomeToAdd = { ...newIncome, total };
    setIncomes([...incomes, incomeToAdd]);

    setNewIncome({
      name: "",
      category: "Restaurant",
      quantityKg: "",
      quantityG: "",
      quantity: "",
      unitPrice: "",
      total: 0,
      date: new Date().toISOString().split("T")[0],
      billingID: billingID,
      unitType: "Count",
    });
  };

  const handleNewBillingID = () => {
    const nextID = (parseInt(billingID) + 1).toString().padStart(3, "0");
    setBillingID(nextID);
    setSelectedBillingID(nextID);
    setIsEditingOldBilling(false);
  };

  const toggleEditingOldBilling = () => {
    setIsEditingOldBilling((prev) => !prev);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditIncome({ ...incomes[index] });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditIncome((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = () => {
    const total =
      editIncome.unitType === "Weight"
        ? (Number(editIncome.quantityKg) + Number(editIncome.quantityG) / 1000) *
          Number(editIncome.unitPrice)
        : Number(editIncome.quantity) * Number(editIncome.unitPrice);

    const updatedIncomes = [...incomes];
    updatedIncomes[editingIndex] = { ...editIncome, total };
    setIncomes(updatedIncomes);
    setEditingIndex(null);
  };

  const deleteIncome = (index) => {
    setIncomes(incomes.filter((_, i) => i !== index));
  };

  const handleBillingIDChange = (e) => {
    setSelectedBillingID(e.target.value);
  };

  const getIncomesByBillingID = (id) => {
    return incomes.filter((income) => income.billingID === id);
  };

  const getTotalIncomesByBillingID = (id) => {
    return getIncomesByBillingID(id).reduce(
      (sum, income) => sum + Number(income.total),
      0
    );
  };

  const handleUnitTypeChange = (e) => {
    const { value } = e.target;
    setNewIncome((prev) => ({
      ...prev,
      unitType: value,
    }));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Income Tracker</h2>

      {/* Current Billing ID Section */}
      <div className="mb-4">
        <p>
          Current Billing ID: <strong>{billingID}</strong>
        </p>

        <button
          onClick={toggleEditingOldBilling}
          className={`p-2 rounded mb-2 ${
            isEditingOldBilling ? "bg-yellow-500" : "bg-gray-500"
          }`}
        >
          {isEditingOldBilling
            ? "Stop Adding Previously Created Billing ID Details"
            : "Add Previously Created Billing ID Details"}
        </button>

        {isEditingOldBilling && (
          <select
            value={selectedBillingID}
            onChange={(e) => setSelectedBillingID(e.target.value)}
            className="border p-2 mt-2"
          >
            {[...new Set(incomes.map((income) => income.billingID))].map(
              (id) => (
                <option key={id} value={id}>
                  Billing ID: {id}
                </option>
              )
            )}
          </select>
        )}

        {!isEditingOldBilling && (
          <button
            onClick={handleNewBillingID}
            className="bg-green-500 text-white p-2 rounded"
          >
            Start New Billing ID
          </button>
        )}
      </div>

      {/* Form to Add New Income */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-5 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Income source name"
            value={newIncome.name}
            onChange={handleInputChange}
            className="border p-2"
            required
          />
          <select
            name="category"
            value={newIncome.category}
            onChange={handleCategoryChange}
            className="border p-2"
          >
            <option value="Restaurant">Restaurant</option>
            <option value="Functions">Functions</option>
          </select>

          {/* Select Unit Type */}
          <select
            name="unitType"
            onChange={handleUnitTypeChange}
            className="border p-2"
          >
            <option value="Count">Count</option>
            <option value="Weight">Weight (Kg & Grams)</option>
          </select>

          {newIncome.unitType === "Weight" ? (
            <>
              <input
                type="number"
                name="quantityKg"
                placeholder="Kg"
                value={newIncome.quantityKg}
                onChange={handleInputChange}
                className="border p-2"
              />
              <input
                type="number"
                name="quantityG"
                placeholder="Grams"
                value={newIncome.quantityG}
                onChange={handleInputChange}
                className="border p-2"
              />
            </>
          ) : (
            <input
              type="number"
              name="quantity"
              placeholder="Quantity (Count)"
              value={newIncome.quantity}
              onChange={handleInputChange}
              className="border p-2"
            />
          )}

          <input
            type="number"
            name="unitPrice"
            placeholder="Unit Price"
            value={newIncome.unitPrice}
            onChange={handleInputChange}
            className="border p-2"
            required
          />
          <input
            type="date"
            name="date"
            value={newIncome.date}
            onChange={handleInputChange}
            className="border p-2"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Income
          </button>
        </div>
      </form>

      {/* Display incomes for selected Billing ID */}
      <div>
        <h3>Select a Billing ID to View Incomes</h3>
        <select
          value={selectedBillingID}
          onChange={handleBillingIDChange}
          className="border p-2 mt-2"
        >
          {[...new Set(incomes.map((income) => income.billingID))].map((id) => (
            <option key={id} value={id}>
              Billing ID: {id}
            </option>
          ))}
        </select>

        {/* Income Table */}
        <table className="w-full mt-4 border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Date</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Unit Type</th>
              <th className="border p-2">Quantity (Count)</th>
              <th className="border p-2">Weight (Kg & G)</th>
              <th className="border p-2">Unit Price</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getIncomesByBillingID(selectedBillingID).map((income, index) => (
               <tr key={index}>
               {editingIndex === index ? (
                    <>
                      <td className="border p-2">
                        <input
                          type="date"
                          name="date"
                          value={editIncome.date}
                          onChange={handleEditChange}
                          className="border p-2"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="text"
                          name="name"
                          value={editIncome.name}
                          onChange={handleEditChange}
                          className="border p-2"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="number"
                          name="quantity"
                          value={editIncome.quantity}
                          onChange={handleEditChange}
                          className="border p-2"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="number"
                          name="unitPrice"
                          value={editIncome.unitPrice}
                          onChange={handleEditChange}
                          className="border p-2"
                        />
                      </td>
                      <td className="border p-2">${editIncome.total}</td>
                      <td className="border p-2">
                        <button onClick={saveEdit} className="bg-green-500 text-white p-2 rounded">
                          Save
                        </button>
                      </td>
                    </>
                  ) :(
                    <>
                     <td className="border p-2">{income.date}</td>
                    <td className="border p-2">{income.name}</td>
                    <td className="border p-2">{income.category}</td>
                    <td className="border p-2">{income.unitType}</td>
                    <td className="border p-2">
                      {income.unitType === "Count" ? income.quantity : "-"}
                    </td>
                    <td className="border p-2">
                      {income.unitType === "Weight"
                        ? `${income.quantityKg} Kg ${income.quantityG} g`
                        : "-"}
                    </td>
                    <td className="border p-2">{income.unitPrice}</td>
                    <td className="border p-2">{income.total.toFixed(2)}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="bg-yellow-500 text-white p-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteIncome(index)}
                        className="bg-red-500 text-white p-2 rounded ml-2"
                      >
                        Delete
                      </button>
                    </td>
                    </>
                   
                  )

                    
                  

                }
             </tr>
            ))
            }
          </tbody>
        </table>

        <p className="mt-4">
          <strong>Total for ID {selectedBillingID}:</strong> ${getTotalIncomesByBillingID(selectedBillingID).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Incomes;

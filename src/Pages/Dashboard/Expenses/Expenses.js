import React, { useState,useEffect,useMemo } from "react";
import apiService from "../../../http/index";
import { toast } from "react-toastify";


const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [billingId, setBillingID] = useState("001");
  const [isEditingOldBilling, setIsEditingOldBilling] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null); // Track row being edited
  const [editExpense, setEditExpense] = useState(null); // Temp storage for editing
  const [newExpense, setNewExpense] = useState({
    billingID: billingId,
    name: "",
    unitType: "Count",
    quantityKg: "",
    quantityG: "",
    quantity: "",
    unitPrice: "",
    total: "",
    date: new Date().toISOString().split("T")[0],
  }); 

  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [billingIdS, setBillingIDs] = useState({});


  const handleInputChange = (e) => {
    
    const { name, value } = e.target;
    setNewExpense((prev) => {
      const updated = { ...prev, [name]: value };
      return updated;
    });
  };

  const handleUnitTypeChange = (e) => {
    const { value } = e.target;
    setNewExpense((prev) => ({
      ...prev,
      unitType: value
    }));
  };

  const handleNewBillingID = () => {
    const nextID = (parseInt(billingId) + 1).toString().padStart(3, "0");
    setBillingID(nextID);
    setIsEditingOldBilling(false);
  };

//  //Just created billing ID
//   const [ currentBillingID, setCurrentBillingID] = useState(billingID);


  const handleSubmit = async () => {
    const event = window.event;
    event.preventDefault();

    const expenseToPost = {
      ...newExpense,
      billingID: billingId, // Use the correct billingID
    };


try{

  if(isEditingOldBilling){
    console.log("Editing old billing");
   

  }else{

    await apiService.post("/expenses/add", expenseToPost);

    toast.success("Expense added successfully");

    setExpenses([...expenses, expenseToPost]);
    setNewExpense({
    billingID: billingId,
    name: "",
    unitType: "Count",
    quantityKg: "",
    quantityG: "",
    quantity: "",
    unitPrice: "",
    total: "",
    date: new Date().toISOString().split("T")[0],
    totalWheight: 0,
    });

    fetchfxpenses();
    fetchBillingIDs();
  }
}catch(error){
  toast.error("Error adding expense");
  console.log(error);}
};

// useEffect(() => {
//   setNewExpense((prev) => ({
//     ...prev,
//     billingID: billingID, // Update the billingID in newExpense
//   }));
// }, [billingID]); // Runs whenever billingID changes

  const toggleEditingOldBilling = () => {
    setIsEditingOldBilling((prev) => !prev);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditExpense({ ...expenses[index] });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditExpense((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = () => {
    const updatedExpenses = [...expenses];
    updatedExpenses[editingIndex] = editExpense;
    setExpenses(updatedExpenses);
    setEditingIndex(null);
  };

  const handleDelete = async (index) => {

    try {
      const response = await apiService.delete(`/expenses/delete/${index}`);
      console.log(response);
      toast.success("Expense deleted successfully");
      fetchfxpenses();
    } catch (error) {
      toast.error("Error deleting expense");
      console.log(error);
    }
    setExpenses(expenses.filter((_, i) => i !== index));
  };
 

const fetchBillingIDs = async () => {
  try {
   const response = await apiService.get('/expenses/billing-ids');
    console.log(response)
    setBillingIDs(response); // Save the list of IDs

     // Automatically select the last billing ID after fetching billing IDs
     if (billingIdS.length > 0 > 0) {
      const lastBillingID = response.data[response.data.length - 1];
      setBillingID(lastBillingID);
    }
  } catch (error) {
    console.error('Failed to fetch billing IDs', error);
    toast.error('Error fetching billing IDs');
  }
};

useEffect(() => {
  return () => { 
    fetchBillingIDs();
  };
},[]);

useEffect(() => {
  if (billingIdS.length > 0) {
    const lastBillingID = billingIdS[billingIdS.length - 1];
    setBillingID(lastBillingID);

  }
}, [billingIdS]);

// This useEffect updates the newExpense billingID when billingID changes
// useEffect(() => {
//   setNewExpense((prev) => ({
//     ...prev,
//     billingID: billingID, // Update the billingID in newExpense
//   }));
// }, [billingID])

  const getExpensesByBillingID = async (fetchedBillingID) => {
    try {
      const response = await apiService.get(`/expenses/get/${fetchedBillingID}`);
      const filteredExpenses = response.filter((expense) => expense.billingID === fetchedBillingID);
      toast.success("Expenses fetched successfully");
     
      return filteredExpenses;
    } catch (error) {
      console.error(error);
      toast.error("Error fetching expenses");
      return []; // Return an empty array on error
    }
  };

  const fetchfxpenses = async (fetchedBillingID) => {
    const expenses = await getExpensesByBillingID(fetchedBillingID);
    // console.log("Expense :",expenses)
    console.log("1")
    console.log("CurrentBillingId :",fetchedBillingID);
    
    const updatedExpenses = expenses.map(expense => {
      const totalWeight = 
          parseFloat(expense.quantityKg || 0) + parseFloat(expense.quantityG || 0) / 1000;
      const total = 
          expense.unitType === "Weight" 
              ? (totalWeight * parseFloat(expense.unitPrice || 0)).toFixed(2)
              : (parseFloat(expense.quantity || 0) * parseFloat(expense.unitPrice || 0)).toFixed(2);
  
      return {
          ...expense,
          totalWeight,
          total: parseFloat(total),
      };
  });
    setFilteredExpenses(updatedExpenses);
  };  

  useEffect(() => {
    fetchfxpenses(billingId);
    console.log(billingId)
    console.log("2")
    return () => { 
      console.log("3")
      // fetchfxpenses(billingId);
    };
  },[]);

//  console.log("filterd :",filteredExpenses);

// const getTotalExpensesByBillingID = useMemo(() => {
//   return filteredExpenses.reduce((sum, expense) => sum + Number(expense.total), 0);
// }, [filteredExpenses]);


  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Expense Tracker</h2>

      {/* Current Billing ID Section */}
      <div className="mb-4">
        <p>Current Billing ID: <strong>{billingId}</strong></p>

        <button
          onClick={toggleEditingOldBilling}
          className={`p-2 rounded mb-2 ${isEditingOldBilling ? "bg-yellow-500" : "bg-gray-500"}`}
        >
          {isEditingOldBilling ? "Stop Adding Previously Created Billing ID Details" : "Add Previously Created Billing ID Details"}
        </button>

        {isEditingOldBilling && (
          <select
          value={billingId} // Use appropriate billing ID
          onChange={(e) => {
            const selectedID = e.target.value;
            setBillingID(selectedID)
            fetchfxpenses(selectedID);
           //  getExpensesByBillingID(selectedID);
            console.log("Selected Billing ID:", selectedID);
            console.log(filteredExpenses);
          }}
            className="border p-2 mt-2"
          >
            {billingIdS.length > 0 ? (
        billingIdS.map((id) => (
          <option key={id} value={id}>
            Billing ID: {id}
          </option>
        ))
      ) : (
        <option value="">No Billing IDs available</option>
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

      {/* Form to Add New Expense */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-5 gap-4">

          <input
            type="text"
            name="name"
            placeholder="Expense name"
            value={newExpense.name}
            onChange={handleInputChange}
            className="border p-2"
            required
          />
          {/* Select Unit Type */}

          <select name="unitType" onChange={handleUnitTypeChange} className="border p-2">
                <option value="Count" className="border p-2">Count</option>
                <option value="Weight" className="border p-2">Weight (Kg & Grams)</option>
          </select>
          
          <div>
          {newExpense.unitType === "Weight" ? (
                <>
                  {/* Fields for Kg & Gram Input */}
   
                  <input type="number" placeholder="Kg" name="quantityKg" value={newExpense.quantityKg} onChange={handleInputChange} className="border p-2" required /> 

                  <input type="number" placeholder="Grams" name="quantityG" value={newExpense.quantityG} onChange={handleInputChange} className="border p-2" required  />
            
                </>
              ) : (
                <>
                  <input type="number" placeholder="Quantity (Count)" name="quantity" value={newExpense.quantity} onChange={handleInputChange} className="border p-2" required />
                </>
              )}

          </div>
          <input
            type="number"
            name="unitPrice"
            placeholder="Unit price"
            value={newExpense.unitPrice}
            onChange={handleInputChange}
            className="border p-2"
            required
          />
          <input
            type="date"
            name="date"
            placeholder="Date"
            value={newExpense.date}
            onChange={handleInputChange}
            className="border p-2"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Expense
            
          </button>
        </div>
      </form>

      {/* Dropdown to select a Billing ID and view expenses */}
      <div>
        <h3>Select a Billing ID to View Expenses</h3>
        <select
         value={billingId} // Use appropriate billing ID
         onChange={(e) => {
          const selectedID = e.target.value;

          setBillingID(selectedID)
          fetchfxpenses(selectedID);
         //  getExpensesByBillingID(selectedID);
          console.log("Selected Billing ID:", selectedID);
          console.log(filteredExpenses);
         }}
          className="border p-2 mt-2"
        >
        {billingIdS.length > 0 ? (
        billingIdS.map((id) => (
          <option key={id} value={id}>
            Billing ID: {id}
          </option>
        ))
      ) : (
        <option value="">No Billing IDs available</option>
      )}
        </select>

        {/* Display selected Billing ID's expenses */}
        <div className="mt-4">
          <table className="w-full mt-2 border-collapse">
            <thead>
              <tr>
              <th className="border p-2">Date</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Unit Type</th>
              <th className="border p-2">Quantity (Count)</th>
              <th className="border p-2">Total Weight</th>
              <th className="border p-2">Unit Price (RS)</th>
              <th className="border p-2">Total (RS)</th>
              <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
          {filteredExpenses.map((expense, index) => (
            <tr key={index}>
              {editingIndex === index ? (
                <>
                  <td className="border p-2">
                    <input
                      type="date"
                      name="date"
                      value={editExpense.date}
                      onChange={handleEditChange}
                      className="border p-2"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      name="name"
                      value={editExpense.name}
                      onChange={handleEditChange}
                      className="border p-2"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      name="UnitType"
                      value={editExpense.unitType}
                      onChange={handleEditChange}
                      className="border p-2"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      name="quantity"
                      value={editExpense.quantity}
                      onChange={handleEditChange}
                      className="border p-2"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      name="quantityKg"
                      value={editExpense.totalWeight}
                      onChange={handleEditChange}
                      className="border p-2"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      name="unitPrice"
                      value={editExpense.unitPrice}
                      onChange={handleEditChange}
                      className="border p-2"
                    />
                  </td>

                  <td className="border p-2">${editExpense.total}</td>
                  <td className="border p-2">
                    <button onClick={saveEdit} className="bg-green-500 text-white p-2 rounded">
                      Save
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border p-2">{expense.date}</td>
                  <td className="border p-2">{expense.name}</td>
                  <td className="border p-2">{expense.unitType}</td>
                  <td className="border p-2">{expense.quantity}</td>
                  <td className="border p-2">{expense.totalWeight}</td>
                  <td className="border p-2">{expense.unitPrice}</td>
                  <td className="border p-2">{expense.total}</td>
                  <td className="border p-2"> 
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-yellow-500 text-white p-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(expense._id)}
                      className="bg-red-500 text-white p-2 rounded ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
          </table>

          {/* <p><strong>Total for ID {selectedBillingID}:</strong> ${getTotalExpensesByBillingID(selectedBillingID)}</p> */}
        </div>
      </div>
    </div>
  );
};

export default Expenses;

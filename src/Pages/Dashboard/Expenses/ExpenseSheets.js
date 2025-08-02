import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../../http/index';
import { toast } from 'react-toastify';

const ExpenseSheets = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterBillingId, setFilterBillingId] = useState('');
  const [billingIds, setBillingIds] = useState([]);
  
  // Date filter states
  const [useFilterDate, setUseFilterDate] = useState(true); // Default to filter by date
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]); // Today's date by default
  
  // Fetch all expenses
  useEffect(() => {
    const fetchAllExpenses = async () => {
      try { 
        setLoading(true);
        const response = await apiService.get('/expenses/billing-details');
        console.log('Fetched expenses:', response);
        
        // Transform the data to include calculated fields
        const processedExpenses = response.map(expense => {
          let total = 0;
          let totalWeight = 0;
          let totalVolume = 0;
          let quantity = expense.quantity || 0;

          // Make sure unitType exists and is handled correctly
          const unitType = expense.unitType || "Count";

          if (unitType === "Weight") {
            // Make sure to handle potential missing values
            const kg = parseFloat(expense.quantityKg || 0);
            const g = parseFloat(expense.quantityG || 0);
            totalWeight = kg + (g / 1000);
            total = totalWeight * parseFloat(expense.unitPrice || 0);
          } else if (unitType === "Liter") {
            const l = parseFloat(expense.quantityL || 0);
            const ml = parseFloat(expense.quantityMl || 0);
            totalVolume = l + (ml / 1000);
            total = totalVolume * parseFloat(expense.unitPrice || 0);
          } else {
            // Default to Count type
            total = parseFloat(quantity) * parseFloat(expense.unitPrice || 0);
          }

          return {
            ...expense,
            unitType: unitType,
            quantity: quantity,
            totalWeight: totalWeight,
            totalVolume: totalVolume,
            unitPrice: parseFloat(expense.unitPrice || 0),
            total: parseFloat(total.toFixed(2))
          };
        });

        setExpenses(processedExpenses);
        setFilteredExpenses(processedExpenses);
        
        // Extract unique billing IDs with fallback
        const uniqueBillingIds = [...new Set(processedExpenses.map(item => 
          item.billingID ? item.billingID : 'Unknown'
        ).filter(id => id))];
        setBillingIds(uniqueBillingIds.sort());
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching expenses:', error);
        setError('Failed to fetch expenses. Please try again later.');
        toast.error('Error fetching expenses');
        setLoading(false);
      }
    };

    fetchAllExpenses();
  }, []);

  // Handle search and filtering - KEEP ONLY THIS ONE USEEFFECT FOR FILTERING
  useEffect(() => {
    // Debug logs to help troubleshoot date filtering
    console.log('Current filter date:', filterDate);
    console.log('Sample expense date:', 
      expenses.length > 0 ? 
      new Date(expenses[0]?.date).toISOString().split('T')[0] : 'No expenses');
    
    let result = [...expenses];
    
    // Filter by date if the filter is active
    if (useFilterDate && filterDate) {
      result = result.filter(expense => {
        // Convert both dates to YYYY-MM-DD format for comparison
        const expenseDate = expense.date ? 
          new Date(expense.date).toISOString().split('T')[0] : '';
        return expenseDate === filterDate;
      });
    }
    
    // Filter by billing ID
    if (filterBillingId) {
      result = result.filter(expense => expense.billingID === filterBillingId);
    }
    
    // Filter by search term
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(expense => 
        expense.name?.toLowerCase().includes(lowercasedTerm) ||
        expense.billingID?.toString().includes(lowercasedTerm)
      );
    }
    
    // Sort results
    result.sort((a, b) => {
      let fieldA = a[sortField];
      let fieldB = b[sortField];
      
      // Convert string dates to Date objects for proper comparison
      if (sortField === 'date') {
        fieldA = new Date(fieldA);
        fieldB = new Date(fieldB);
      }
      
      // Handle numeric sorting
      if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return sortDirection === 'asc' ? fieldA - fieldB : fieldB - fieldA;
      }
      
      // Handle string sorting
      if (sortDirection === 'asc') {
        return fieldA > fieldB ? 1 : -1;
      } else {
        return fieldA < fieldB ? 1 : -1;
      }
    });
    
    setFilteredExpenses(result);
  }, [expenses, searchTerm, sortField, sortDirection, filterBillingId, useFilterDate, filterDate]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Format date for display
  const formatDisplayDate = (dateString) => {
    if (!dateString) return 'Today';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Calculate totals for filtered expenses
  const totalAmount = filteredExpenses.reduce((sum, exp) => sum + Number(exp.total || 0), 0);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Expense Sheets</h2>
        <button
          onClick={() => navigate('/dashboard/expenses')}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded flex items-center"
        >
          <span className="mr-1">Back to Expenses</span>
        </button>
      </div>
      
      {/* Date filter section */}
      <div className="mb-6 bg-gray-50 p-4 rounded border">
        <div className="flex flex-wrap items-center gap-4">
          <div className="font-semibold">Daily Expenses:</div>
          
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={useFilterDate}
              onChange={() => setUseFilterDate(!useFilterDate)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2">Filter by date</span>
          </label>
          
          {useFilterDate && (
            <>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="border p-2 rounded"
              />
              
              <button
                onClick={() => setFilterDate(new Date().toISOString().split('T')[0])}
                className="bg-blue-100 hover:bg-blue-200 p-2 rounded"
              >
                Today
              </button>
              
              {/* Quick date navigation */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    setFilterDate(yesterday.toISOString().split('T')[0]);
                  }}
                  className="bg-blue-100 hover:bg-blue-200 p-1 rounded text-sm"
                >
                  Yesterday
                </button>
               
              </div>
            </>
          )}
        </div>
        
        {useFilterDate && (
          <div className="mt-2 font-medium">
            Showing expenses for: <span className="text-blue-700">{formatDisplayDate(filterDate)}</span>
            {filteredExpenses.length === 0 && (
              <span className="ml-2 text-red-500">
                (No expenses found for this date)
              </span>
            )}
          </div>
        )}
      </div>
      
      {/* Search and filter controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[250px]">
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>
        
        <div>
          <select 
            value={filterBillingId} 
            onChange={(e) => setFilterBillingId(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Billing IDs</option>
            {billingIds.map(id => (
              <option key={id} value={id}>
                Billing ID: {id}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <select 
            value={sortField} 
            onChange={(e) => {
              setSortField(e.target.value);
              setSortDirection('asc');
            }}
            className="border p-2 rounded"
          >
            <option value="date">Sort by Date</option>
            <option value="billingID">Sort by Billing ID</option>
            <option value="name">Sort by Name</option>
            <option value="total">Sort by Amount</option>
          </select>
        </div>
        
        <div>
          <button 
            onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
            className="border p-2 rounded bg-gray-100 hover:bg-gray-200"
          >
            {sortDirection === 'asc' ? '↑ Ascending' : '↓ Descending'}
          </button>
        </div>
      </div>
      
      {loading ? (
        <p>Loading expenses...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {useFilterDate && (
            <div className="mb-4 bg-blue-50 p-3 rounded">
              <div className="font-bold text-lg">
                Daily Summary: {formatDisplayDate(filterDate)}
              </div>
              <div>
                Total Items: {filteredExpenses.length} | 
                Total Amount: Rs {totalAmount.toFixed(2)}
              </div>
            </div>
          )}
          
          <div className="overflow-x-auto">
            <table className="w-full mt-2 border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 cursor-pointer" onClick={() => handleSort('date')}>
                    Date {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="border p-2 cursor-pointer" onClick={() => handleSort('billingID')}>
                    Billing ID {sortField === 'billingID' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="border p-2 cursor-pointer" onClick={() => handleSort('name')}>
                    Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="border p-2">Unit Type</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Weight (kg)</th>
                  <th className="border p-2">Volume (L)</th>
                  <th className="border p-2">Unit Price (RS)</th>
                  <th className="border p-2 cursor-pointer" onClick={() => handleSort('total')}>
                    Total (RS) {sortField === 'total' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.length > 0 ? (
                  filteredExpenses.map((expense, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border p-2">{expense.date || 'N/A'}</td>
                      <td className="border p-2">{expense.billingID || 'N/A'}</td>
                      <td className="border p-2">{expense.name || 'N/A'}</td>
                      <td className="border p-2">{expense.unitType || 'N/A'}</td>
                      <td className="border p-2">
                        {expense.unitType === 'Count' ? (expense.quantity || '-') : '-'}
                      </td>
                      <td className="border p-2">
                        {expense.unitType === 'Weight' ? (expense.totalWeight ? expense.totalWeight.toFixed(3) : '-') : '-'}
                      </td>
                      <td className="border p-2">
                        {expense.unitType === 'Liter' ? (expense.totalVolume ? expense.totalVolume.toFixed(3) : '-') : '-'}
                      </td>
                      <td className="border p-2">{expense.unitPrice || '-'}</td>
                      <td className="border p-2">{expense.total || '-'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center p-4 border">
                      {useFilterDate 
                        ? `No expenses found for ${formatDisplayDate(filterDate)}`
                        : "No expenses found matching your filters"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Summary */}
          <div className="mt-4 p-3 bg-blue-50 rounded flex justify-between items-center">
            <div>
              <span className="font-bold">Total Items:</span> {filteredExpenses.length}
            </div>
            <div className="text-right font-bold">
              Total Amount: Rs {totalAmount.toFixed(2)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseSheets;
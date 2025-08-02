import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../../http/index";
import { toast } from "react-toastify";

const IncomeSheets = () => {
  const navigate = useNavigate();
  const [incomes, setIncomes] = useState([]);
  const [filteredIncomes, setFilteredIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterIncomeId, setFilterIncomeId] = useState('');
  const [incomeIds, setIncomeIds] = useState([]);
  
  // Date filter states
  const [useFilterDate, setUseFilterDate] = useState(true);
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);

  // Fetch all incomes
  useEffect(() => {
    const fetchAllIncomes = async () => {
      try { 
        setLoading(true);
        const response = await apiService.get('/income/all');
        console.log('Fetched incomes:', response);
        setIncomes(response);
        setFilteredIncomes(response);
        
        // Extract unique income IDs
        const uniqueIds = [...new Set(response.map(item => item.incomeID))];
        setIncomeIds(uniqueIds.sort());
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching incomes:', error);
        setError('Failed to fetch incomes. Please try again later.');
        toast.error('Error fetching incomes');
        setLoading(false);
      }
    };

    fetchAllIncomes();
  }, []);

  // Handle search and filtering
  useEffect(() => {
    // Debug logs to help troubleshoot date filtering
    console.log('Current filter date:', filterDate);
    console.log('Sample income date:', 
      incomes.length > 0 ? 
      new Date(incomes[0]?.date).toISOString().split('T')[0] : 'No incomes');
    
    let result = [...incomes];
    
    // Filter by date if the filter is active
    if (useFilterDate && filterDate) {
      result = result.filter(income => {
        // Convert both dates to YYYY-MM-DD format for comparison
        const incomeDate = income.date ? 
          new Date(income.date).toISOString().split('T')[0] : '';
        return incomeDate === filterDate;
      });
    }
    
    // Filter by income ID
    if (filterIncomeId) {
      result = result.filter(income => income.incomeID === filterIncomeId);
    }
    
    // Filter by search term
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(income => 
        income.source?.toLowerCase().includes(lowercasedTerm) ||
        income.description?.toLowerCase().includes(lowercasedTerm) ||
        income.incomeID?.toString().includes(lowercasedTerm)
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
    
    setFilteredIncomes(result);
  }, [incomes, searchTerm, sortField, sortDirection, filterIncomeId, useFilterDate, filterDate]);

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
  
  // Calculate total for filtered incomes
  const totalAmount = filteredIncomes.reduce((sum, inc) => sum + parseFloat(inc.amount || 0), 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Income Reports</h2>
        <button
          onClick={() => navigate('/dashboard/income')}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Back to Income
        </button>
      </div>
      
      {/* Date filter section */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-wrap items-center gap-4">
          <div className="font-semibold text-gray-700">Filter by Date:</div>
          
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={useFilterDate}
              onChange={() => setUseFilterDate(!useFilterDate)}
              className="form-checkbox h-5 w-5 text-blue-600 rounded"
            />
            <span className="ml-2">Enable date filter</span>
          </label>
          
          {useFilterDate && (
            <>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              
              <button
                onClick={() => setFilterDate(new Date().toISOString().split('T')[0])}
                className="bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-3 rounded-md"
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
                  className="bg-gray-100 hover:bg-gray-200 py-1 px-2 rounded text-sm"
                >
                  Yesterday
                </button>
                <button
                  onClick={() => {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    setFilterDate(tomorrow.toISOString().split('T')[0]);
                  }}
                  className="bg-gray-100 hover:bg-gray-200 py-1 px-2 rounded text-sm"
                >
                  Tomorrow
                </button>
              </div>
            </>
          )}
        </div>
        
        {useFilterDate && (
          <div className="mt-2 font-medium text-gray-700">
            Showing income for: <span className="text-blue-700">{formatDisplayDate(filterDate)}</span>
            {filteredIncomes.length === 0 && (
              <span className="ml-2 text-red-500">
                (No income found for this date)
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
            placeholder="Search income records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <select 
            value={filterIncomeId} 
            onChange={(e) => setFilterIncomeId(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Income IDs</option>
            {incomeIds.map(id => (
              <option key={id} value={id}>
                ID: {id}
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
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="date">Sort by Date</option>
            <option value="incomeID">Sort by Income ID</option>
            <option value="source">Sort by Source</option>
            <option value="amount">Sort by Amount</option>
          </select>
        </div>
        
        <div>
          <button 
            onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
            className="border border-gray-300 py-2 px-3 rounded-md bg-white hover:bg-gray-50"
          >
            {sortDirection === 'asc' ? '↑ Ascending' : '↓ Descending'}
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 flex justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-3"></div>
            <p className="text-gray-600">Loading income records...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-700">{error}</div>
      ) : (
        <>
          {useFilterDate && (
            <div className="mb-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="font-bold text-lg text-blue-800">
                Daily Summary: {formatDisplayDate(filterDate)}
              </div>
              <div className="text-blue-700">
                Total Records: {filteredIncomes.length} | 
                Total Amount: Rs {totalAmount.toFixed(2)}
              </div>
            </div>
          )}
          
          <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    onClick={() => handleSort('date')}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    Date {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    onClick={() => handleSort('incomeID')}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    Income ID {sortField === 'incomeID' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    onClick={() => handleSort('source')}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    Source {sortField === 'source' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th 
                    onClick={() => handleSort('amount')}
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    Amount (RS) {sortField === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredIncomes.length > 0 ? (
                  filteredIncomes.map((income, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(income.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {income.incomeID}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {income.source}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {income.description || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                        Rs {parseFloat(income.amount).toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-500">
                      {useFilterDate 
                        ? `No income records found for ${formatDisplayDate(filterDate)}`
                        : "No income records found matching your filters"}
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan="4" className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                    Total
                  </td>
                  <td className="px-6 py-3 text-right text-sm font-bold text-blue-700">
                    Rs {totalAmount.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          {/* Summary */}
          <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex justify-between items-center">
            <div>
              <span className="font-bold text-gray-700">Total Records:</span> {filteredIncomes.length}
            </div>
            <div className="text-right">
              <span className="font-bold text-gray-700">Total Amount:</span>
              <span className="ml-2 text-xl font-bold text-green-600">Rs {totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IncomeSheets;
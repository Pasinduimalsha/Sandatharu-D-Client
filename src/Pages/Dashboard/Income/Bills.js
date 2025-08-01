import React, { useState , useEffect} from 'react';
import apiService from '../../../http/index';
import { toast } from "react-toastify";

// Sample KOTs array for demonstration


const FinalBill = () => {
  const [selectedKOTNumbers, setSelectedKOTNumbers] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [serviceCharge, setServiceCharge] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [address, setAddress] = useState('');
  const [invoiceNo] = useState(`INV-${Date.now().toString().slice(-6)}`);
  const [kotsList, setKotsList] = useState([]);
  const [status, setStatus] = useState('accepted');
  const [payment, setpayment] = useState('pending')

  useEffect(() => {
  const fetchKOTs = async () => {
    try {
      const response = await apiService.get(
          `kot?status=${status}&payment=${payment}`
        );
        console.log(response)
      toast.success('KOTs fetched successfully!');
      // Map response to sampleKOTs format
      const mappedKOTs = response.map(kot => ({
        id: kot._id,
        kotNumber: kot.kotID,
        accepted: kot.status === 'accepted',
        items: kot.items.map(item => ({
          item: item.item,
          portion: item.portion,
          quantity: item.quantity,
          price: item.price
        })),

      }));
      setKotsList(mappedKOTs);
    } catch (err) {
        toast.error('Error fetching KOTs!');
      // handle error
    }
  };
  fetchKOTs();
}, []);


  // Filter selected KOTs
  const selectedKOTs = kotsList.filter(kot => selectedKOTNumbers.includes(kot.kotNumber));
  console.log(kotsList)
  console.log(selectedKOTs)

  // Group items by item, portion, and sum quantities
  const groupedItems = selectedKOTs.flatMap(k => k.items).reduce((acc, item) => {
    const key = `${item.item}_${item.portion || ''}_${item.price || ''}`;
    const existingItem = acc.find(i =>
      `${i.item}_${i.portion || ''}_${i.price || ''}` === key
    );
    if (existingItem) {
      existingItem.quantity += item.quantity;
      existingItem.totalPrice += item.price;
    } else {
      acc.push({
        ...item,
        totalPrice: item.price
      });
    }
    return acc;
  }, []);

  // Calculate unit price from total price and quantity
  const itemsWithPrices = groupedItems.map(item => ({
    ...item,
    unitPrice: item.totalPrice / item.quantity,
  }));

  const subtotal = itemsWithPrices.reduce((sum, item) => sum + item.totalPrice, 0);
  const serviceChargeAmount = (subtotal * serviceCharge) / 100;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + serviceChargeAmount - discountAmount;
  const balance = amountPaid - total;

  const handleCompleteBill = async () => {
  const billData = {
    invoiceNo,
    customerName,
    address,
    paymentMethod,
    amountPaid,
    serviceCharge,
    discount,
    total,
    balance,
    kotNumbers: selectedKOTNumbers,
    items: itemsWithPrices,
    payment: "done",
    createdAt: new Date().toISOString()
  };
  try {
    await apiService.post('finalbill', billData);
    // Optionally show a success message or reset form

    await apiService.patch(`kot/${selectedKOTs[0].id}/status`, { payment: billData.payment});

    toast.success('Bill saved successfully!');
    
    setSelectedKOTNumbers([]);
    setCustomerName('');
    setAddress('');
    setAmountPaid(0);
    setServiceCharge(0);
    setDiscount(0);
    // ...reset other fields as needed
  } catch (err) {
    toast.error('Error saving bill!');
  }
};



  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Final Bill</h2>

      {/* KOT Number Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select KOT Numbers
        </label>
        <select
          multiple
          value={selectedKOTNumbers}
          onChange={e => {
            const options = Array.from(e.target.selectedOptions).map(opt => opt.value);
            setSelectedKOTNumbers(options);
          }}
          className="w-full border border-gray-300 rounded-md py-2 px-3"
        >
          {kotsList.map(kot => (
            <option key={kot.kotNumber} value={kot.kotNumber}>
              {kot.kotNumber}
            </option>
          ))}
        </select>
        <div className="text-xs text-gray-500 mt-1">
          Hold Ctrl (Windows) or Cmd (Mac) to select multiple KOTs.
        </div>
      </div>

      {/* Customer Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={e => setCustomerName(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            placeholder="Address (optional)"
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>
      </div>

      {/* Bill Table */}
      {selectedKOTs.length > 0 ? (
        <>
          <div className="border rounded-md overflow-hidden mb-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Portion</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {itemsWithPrices.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2 text-sm text-gray-800">{item.item}</td>
                    <td className="px-4 py-2 text-sm text-gray-800 text-right">{item.portion || '-'}</td>
                    <td className="px-4 py-2 text-sm text-gray-800 text-right">{item.quantity}</td>
                    <td className="px-4 py-2 text-sm text-gray-800 text-right">Rs {item.unitPrice.toFixed(2)}</td>
                    <td className="px-4 py-2 text-sm text-gray-800 text-right">Rs {item.totalPrice.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Charges and Payment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Charge (%)
                </label>
                <input
                  type="number"
                  placeholder="Service Charge"
                  value={serviceCharge}
                  onChange={e => setServiceCharge(parseFloat(e.target.value) || 0)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount (%)
                </label>
                <input
                  type="number"
                  placeholder="Discount"
                  value={discount}
                  onChange={e => setDiscount(parseFloat(e.target.value) || 0)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3"
                />
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">Rs {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Charge ({serviceCharge}%):</span>
                  <span className="font-medium">Rs {serviceChargeAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount ({discount}%):</span>
                  <span className="font-medium">Rs {discountAmount.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-blue-700">Rs {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3"
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="online">Online Transfer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount Paid <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="Amount Paid"
                value={amountPaid}
                onChange={e => setAmountPaid(parseFloat(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-md py-2 px-3"
              />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-md flex justify-between items-center mb-4">
            <div>
              <span className="block text-sm text-gray-700">Balance:</span>
              <span className={`text-xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                Rs {balance.toFixed(2)}
              </span>
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium"
              disabled={amountPaid < total || !customerName}
              onClick={handleCompleteBill}
            >
              Complete Bill
            </button>
          </div>
        </>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-6 text-center">
          <div className="text-yellow-600 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="text-lg font-medium">No Items to Bill</h4>
          </div>
          <p className="text-yellow-700 text-sm">
            Please select KOT numbers to generate a bill.
          </p>
        </div>
      )}
    </div>
  );
};

export default FinalBill;
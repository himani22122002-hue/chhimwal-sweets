import React, { useState, useEffect } from 'react';
import { getCustomers, updateCustomerStatus, deleteCustomer, bulkUpdateStatus, bulkDeleteCustomers } from '../../services/CustomerService';
import CustomerTable from '../../components/admin/CustomerTable';
import CustomerDetailsModal from '../../components/admin/CustomerDetailsModal';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const data = getCustomers();
    setCustomers(data);
    setFilteredCustomers(data);
  }, []);

  useEffect(() => {
    setFilteredCustomers(customers.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, customers]);

  const toggleSelectCustomer = (id) => {
    setSelectedCustomers(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    setSelectedCustomers(selectedCustomers.length === filteredCustomers.length ? [] : filteredCustomers.map(c => c.id));
  };

  const handleStatusChange = (id, status) => {
    setCustomers(updateCustomerStatus(id, status));
  };

  const handleDelete = (id) => {
    setCustomers(deleteCustomer(id));
  };

  return (
    <div className="p-6 bg-[#FFF8E7] min-h-screen text-[#7B1E2B]">
      <h1 className="text-3xl font-bold mb-6">Customer Management</h1>
      <input type="text" placeholder="Search customers..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="mb-4 p-2 border border-[#D4AF37] rounded" />
      
      <div className="mb-4 flex gap-2">
        <button onClick={() => setCustomers(bulkUpdateStatus(selectedCustomers, 'Active'))} className="bg-[#7B1E2B] text-[#FFF8E7] p-2 rounded">Bulk Active</button>
        <button onClick={() => setCustomers(bulkDeleteCustomers(selectedCustomers))} className="bg-red-600 text-white p-2 rounded">Bulk Delete</button>
      </div>

      <CustomerTable 
        customers={filteredCustomers} 
        onView={setSelectedCustomer} 
        onStatusChange={handleStatusChange} 
        onDelete={handleDelete}
        selectedCustomers={selectedCustomers}
        toggleSelectCustomer={toggleSelectCustomer}
        toggleSelectAll={toggleSelectAll}
      />
      <CustomerDetailsModal customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
    </div>
  );
};

export default Customers;

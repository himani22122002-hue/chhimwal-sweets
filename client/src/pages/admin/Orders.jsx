import React, { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus, deleteOrder } from '../../services/OrderService';
import OrderTable from '../../components/admin/OrderTable';
import OrderDetailsModal from '../../components/admin/OrderDetailsModal';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    const data = getOrders();
    setOrders(data);
    setFilteredOrders(data);
  }, []);

  useEffect(() => {
    let result = orders.filter(order => 
      (filter === 'All' || order.status === filter) &&
      (order.customer.name.toLowerCase().includes(search.toLowerCase()) || 
       order.customer.phone.includes(search) ||
       order.id.toLowerCase().includes(search.toLowerCase()))
    );
    setFilteredOrders(result);
    setCurrentPage(1);
  }, [search, filter, orders]);

  const handleStatusChange = (id, status) => {
    setOrders(updateOrderStatus(id, status));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(deleteOrder(id));
    }
  };

  const paginatedOrders = filteredOrders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

  return (
    <div className="p-6 bg-[#FFF8E7] min-h-screen">
      <h1 className="text-2xl font-bold text-[#7B1E2B] mb-6">Order Management</h1>
      
      <div className="flex gap-4 mb-6">
        <input 
          type="text" 
          placeholder="Search orders..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-[#D4AF37] rounded px-4 py-2 w-full max-w-sm"
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border border-[#D4AF37] rounded px-4 py-2">
          {['All', 'Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <OrderTable 
        orders={paginatedOrders} 
        onView={setSelectedOrder} 
        onStatusChange={handleStatusChange} 
        onDelete={handleDelete}
      />

      {selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
    </div>
  );
};

export default Orders;

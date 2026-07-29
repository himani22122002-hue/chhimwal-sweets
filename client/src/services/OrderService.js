const STORAGE_KEY = 'chhimwal_orders';

const SAMPLE_ORDERS = [
  {
    id: 'ORD-001',
    customer: { name: 'Rahul Sharma', phone: '+91 98765 43210', address: '12, MG Road, Dehradun' },
    products: [{ id: 1, name: 'Besan Ladoo', price: 250, qty: 2 }, { id: 2, name: 'Singodi', price: 300, qty: 1 }],
    subtotal: 800,
    deliveryFee: 50,
    total: 850,
    paymentMethod: 'COD',
    date: '2023-10-25',
    status: 'Delivered'
  },
  {
    id: 'ORD-002',
    customer: { name: 'Priya Verma', phone: '+91 91234 56789', address: '45, Civil Lines, Haridwar' },
    products: [{ id: 3, name: 'Milk Cake', price: 400, qty: 1 }],
    subtotal: 400,
    deliveryFee: 50,
    total: 450,
    paymentMethod: 'Online',
    date: '2023-10-27',
    status: 'Pending'
  }
];

export const getOrders = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_ORDERS));
    return SAMPLE_ORDERS;
  }
  return JSON.parse(stored);
};

export const updateOrderStatus = (id, status) => {
  const orders = getOrders();
  const updatedOrders = orders.map(order => 
    order.id === id ? { ...order, status } : order
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
  return updatedOrders;
};

export const deleteOrder = (id) => {
  const orders = getOrders();
  const filteredOrders = orders.filter(order => order.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredOrders));
  return filteredOrders;
};

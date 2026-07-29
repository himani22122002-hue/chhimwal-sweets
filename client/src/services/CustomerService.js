const STORAGE_KEY = 'chhimwal_customers';

const initialData = [
  { id: 1, name: 'Amit Kumar', mobile: '9876543210', email: 'amit@example.com', orders: 5, spent: 2500, date: '2025-01-15', status: 'Active' },
  { id: 2, name: 'Priya Sharma', mobile: '9988776655', email: 'priya@example.com', orders: 2, spent: 1200, date: '2025-02-01', status: 'Blocked' },
];

export const getCustomers = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : initialData;
};

export const updateCustomerStatus = (id, status) => {
  const customers = getCustomers();
  const updated = customers.map(c => c.id === id ? { ...c, status } : c);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const deleteCustomer = (id) => {
  const customers = getCustomers();
  const updated = customers.filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const bulkUpdateStatus = (ids, status) => {
  const customers = getCustomers();
  const updated = customers.map(c => ids.includes(c.id) ? { ...c, status } : c);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const bulkDeleteCustomers = (ids) => {
  const customers = getCustomers();
  const updated = customers.filter(c => !ids.includes(c.id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

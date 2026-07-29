const STORAGE_KEY = 'chhimwal_reviews';

// Mock initial data
const initialReviews = [
  { id: 1, customer: 'John Doe', product: 'Milk Cake', rating: 5, title: 'Amazing!', message: 'Best milk cake ever!', date: '2023-10-01', status: 'Approved' },
  { id: 2, customer: 'Jane Smith', product: 'Besan Ladoo', rating: 4, title: 'Good', message: 'Tastes authentic.', date: '2023-10-05', status: 'Pending' },
];

const getReviews = () => {
  const reviews = localStorage.getItem(STORAGE_KEY);
  if (!reviews) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialReviews));
    return initialReviews;
  }
  return JSON.parse(reviews);
};

const saveReviews = (reviews) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
};

export const ReviewService = {
  getReviews,
  updateReviewStatus: (id, status) => {
    const reviews = getReviews();
    const updated = reviews.map(r => r.id === id ? { ...r, status } : r);
    saveReviews(updated);
    return updated;
  },
  deleteReview: (id) => {
    const reviews = getReviews();
    const updated = reviews.filter(r => r.id !== id);
    saveReviews(updated);
    return updated;
  },
  bulkUpdateStatus: (ids, status) => {
    const reviews = getReviews();
    const updated = reviews.map(r => ids.includes(r.id) ? { ...r, status } : r);
    saveReviews(updated);
    return updated;
  },
  bulkDeleteReviews: (ids) => {
    const reviews = getReviews();
    const updated = reviews.filter(r => !ids.includes(r.id));
    saveReviews(updated);
    return updated;
  }
};

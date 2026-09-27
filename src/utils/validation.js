export const validateTransaction = (data) => {
  const errors = {};

  if (!data.title?.trim()) errors.title = 'Title is required';

  const amount = Number(data.amount);
  if (!data.amount && data.amount !== 0) errors.amount = 'Amount is required';
  else if (Number.isNaN(amount)) errors.amount = 'Amount must be a number';
  else if (amount <= 0) errors.amount = 'Amount must be greater than 0';

  if (!data.type) errors.type = 'Type is required';
  if (!data.category) errors.category = 'Category is required';
  if (!data.date) errors.date = 'Date is required';

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

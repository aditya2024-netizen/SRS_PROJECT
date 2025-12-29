import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { ProductProvider } from '../context/ProductContext';
import { BrowserRouter as Router } from 'react-router-dom';

const customRender = (ui) => render(<ProductProvider><Router>{ui}</Router></ProductProvider>);

test('renders product list page and checks for initial products', () => {
  customRender(<App />);
  const productList = screen.getByText(/product list/i);
  expect(productList).toBeInTheDocument();
});

test('adds new product and checks if it appears in the list', async () => {
  customRender(<App />);

  // Navigate to the add product page
  fireEvent.click(screen.getByText(/add product/i));

  // Fill in the form
  fireEvent.change(screen.getByPlaceholderText(/product name/i), { target: { value: 'New Product' } });
  fireEvent.change(screen.getByPlaceholderText(/product description/i), { target: { value: 'This is a new product' } });
  fireEvent.change(screen.getByPlaceholderText(/stock quantity/i), { target: { value: '10' } });

  // Submit the form
  fireEvent.click(screen.getByText(/Save product/i));
  fireEvent.click(screen.getByText(/Product List/i));

  // Check if the product was added to the list
  await waitFor(() => {
    expect(screen.getByText('New Product')).toBeInTheDocument();
  });
});

test('displays correct details for a product when clicked', async () => {
  customRender(<App />);

  // Add a new product first
  fireEvent.click(screen.getByText(/add product/i));
  fireEvent.change(screen.getByPlaceholderText(/product name/i), { target: { value: 'Product 1' } });
  fireEvent.change(screen.getByPlaceholderText(/product description/i), { target: { value: 'Description of Product 1' } });
  fireEvent.change(screen.getByPlaceholderText(/stock quantity/i), { target: { value: '5' } });
  fireEvent.click(screen.getByText(/Save product/i));
  fireEvent.click(screen.getByText(/Product List/i));

  // Navigate to the product details page
  fireEvent.click(screen.getByText('Product 1'));

  // Check if the product details are displayed correctly
  expect(screen.getByText('Product 1')).toBeInTheDocument();
  expect(screen.getByText('Description of Product 1')).toBeInTheDocument();
  expect(screen.getByText('Stock: 5')).toBeInTheDocument();
});

test('increases stock correctly', async () => {
  customRender(<App />);

  // Add a product
  fireEvent.click(screen.getByText(/add product/i));
  fireEvent.change(screen.getByPlaceholderText(/product name/i), { target: { value: 'Product 2' } });
  fireEvent.change(screen.getByPlaceholderText(/product description/i), { target: { value: 'Description of Product 2' } });
  fireEvent.change(screen.getByPlaceholderText(/stock quantity/i), { target: { value: '5' } });
  fireEvent.click(screen.getByText(/Save product/i));
  fireEvent.click(screen.getByText(/Product List/i));

  // Go to stock management page
  fireEvent.click(screen.getByText('Product 2'));
  fireEvent.click(screen.getByText(/manage stock/i));

  // Increase the stock
  fireEvent.click(screen.getByText('+'));

  // Check if the stock is updated
  expect(screen.getByText('Current Stock: 6')).toBeInTheDocument();
});

test('decreases stock correctly', async () => {
  customRender(<App />);

  // Add a product
  fireEvent.click(screen.getByText(/add product/i));
  fireEvent.change(screen.getByPlaceholderText(/product name/i), { target: { value: 'Product 3' } });
  fireEvent.change(screen.getByPlaceholderText(/product description/i), { target: { value: 'Description of Product 3' } });
  fireEvent.change(screen.getByPlaceholderText(/stock quantity/i), { target: { value: '5' } });
  fireEvent.click(screen.getByText(/Save product/i));
  fireEvent.click(screen.getByText(/Product List/i));

  // Go to stock management page
  fireEvent.click(screen.getByText('Product 3'));
  fireEvent.click(screen.getByText(/manage stock/i));

  // Decrease the stock
  fireEvent.click(screen.getByText('-'));

  // Check if the stock is updated
  expect(screen.getByText('Current Stock: 4')).toBeInTheDocument();
});

test('renders product list heading', () => {
  customRender(<App />);

  // Navigate to a non-existent product details page
  fireEvent.click(screen.getByText(/product list/i));
//   fireEvent.click(screen.getByText('Non-existent Product'));

  // Check for "Product not found"
  expect(screen.getByText(/List of Products/i)).toBeInTheDocument();
});

test('displays the correct text on product list page', () => {
  customRender(<App />);

  // Check if "Product List" text is present
  expect(screen.getByText(/Product List/)).toBeInTheDocument();
});

test('displays the correct text on Add Product page', () => {
  customRender(<App />);

  // Go to Add Product page
  fireEvent.click(screen.getByText(/add product/i));

  // Check if the form inputs and button are present
  expect(screen.getByPlaceholderText(/product name/i)).toBeInTheDocument();
  expect(screen.getByText(/Add Product/)).toBeInTheDocument();
});

test('checks if Back to Product button works in Stock page', () => {
  customRender(<App />);

  // Add product and navigate to stock page
  fireEvent.click(screen.getByText(/add product/i));
  fireEvent.change(screen.getByPlaceholderText(/product name/i), { target: { value: 'Product 4' } });
  fireEvent.change(screen.getByPlaceholderText(/product description/i), { target: { value: 'Description of Product 4' } });
  fireEvent.change(screen.getByPlaceholderText(/stock quantity/i), { target: { value: '10' } });
  fireEvent.click(screen.getByText(/Save product/i));
  fireEvent.click(screen.getByText(/Product List/i));
  fireEvent.click(screen.getByText('Product 4'));
  fireEvent.click(screen.getByText(/manage stock/i));

  // Click the "Back to Product" button and check if we return to Product Details
  fireEvent.click(screen.getByText(/Back to Product/));
  expect(screen.getByText('Product 4')).toBeInTheDocument();
});

test('checks if Add Product button is working after adding a product', async () => {
  customRender(<App />);

  // Click Add Product
  fireEvent.click(screen.getByText(/add product/i));
  fireEvent.change(screen.getByPlaceholderText(/product name/i), { target: { value: 'Product 5' } });
  fireEvent.change(screen.getByPlaceholderText(/product description/i), { target: { value: 'Description of Product 4' } });
  fireEvent.change(screen.getByPlaceholderText(/stock quantity/i), { target: { value: '10' } });
  fireEvent.click(screen.getByText(/Save product/i));
  fireEvent.click(screen.getByText(/Product List/i));

  // Verify product list contains the new product
  await waitFor(() => {
    expect(screen.getByText(/Product 5/i)).toBeInTheDocument();
  });
});

// data/invoices.ts (Hoặc file data của bạn)

export const invoices = [
  {
    id: "INV-001",
    vendor: "Amazon Web Services",
    amount: 125.50,
    status: "Paid",
    date: "2023-12-20",
    category: "Software"
  },
  {
    id: "INV-002",
    vendor: "Google Cloud",
    amount: 89.00,
    status: "Pending",
    date: "2023-12-24",
    category: "Infrastructure"
  },
  {
    id: "INV-003",
    vendor: "Adobe Creative Cloud",
    amount: 52.99,
    status: "Paid",
    date: "2023-12-15",
    category: "Design"
  }
];

// Xuất ra một hàm đơn giản để lấy dữ liệu, không gọi API Plaid nữa
export const getInvoices = () => {
  return invoices;
};
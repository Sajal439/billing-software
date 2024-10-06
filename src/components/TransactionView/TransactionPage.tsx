"use client";

import React, { useState } from "react";
import { TransactionFilters } from "@/components/TransactionView/TransactionFilters";
import { TransactionList } from "@/components/TransactionView/TransactionList";

interface Transaction {
  id: number;
  date: string;
  invoiceNumber: string;
  partyName: string;
  voucherType: string;
  totalAmount: number;
}

interface Filters {
  startDate: string;
  endDate: string;
  partyName: string;
  voucherType: string;
}

// Mock data for demonstration
const initialTransactions: Transaction[] = [
  {
    id: 1,
    date: "2023-06-01",
    invoiceNumber: "INV001",
    partyName: "Acme Corp",
    voucherType: "sales",
    totalAmount: 1000.0,
  },
  {
    id: 2,
    date: "2023-06-02",
    invoiceNumber: "INV002",
    partyName: "Globex Corporation",
    voucherType: "purchase",
    totalAmount: 1500.5,
  },
  {
    id: 3,
    date: "2023-06-03",
    invoiceNumber: "INV003",
    partyName: "Acme Corp",
    voucherType: "receipt",
    totalAmount: 500.0,
  },
  {
    id: 4,
    date: "2023-06-04",
    invoiceNumber: "INV004",
    partyName: "Stark Industries",
    voucherType: "payment",
    totalAmount: 2000.0,
  },
  {
    id: 5,
    date: "2023-06-05",
    invoiceNumber: "INV005",
    partyName: "Wayne Enterprises",
    voucherType: "sales",
    totalAmount: 3000.0,
  },
];

const initialFilters: Filters = {
  startDate: "",
  endDate: "",
  partyName: "",
  voucherType: "all",
};

export function TransactionPage() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    // Apply filters to the transactions
    const filteredTransactions = initialTransactions.filter((transaction) => {
      return (
        (!newFilters.startDate || transaction.date >= newFilters.startDate) &&
        (!newFilters.endDate || transaction.date <= newFilters.endDate) &&
        (!newFilters.partyName ||
          transaction.partyName
            .toLowerCase()
            .includes(newFilters.partyName.toLowerCase())) &&
        (newFilters.voucherType === "all" ||
          transaction.voucherType === newFilters.voucherType)
      );
    });
    setTransactions(filteredTransactions);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Transactions</h1>
      <TransactionFilters
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <TransactionList transactions={transactions} />
    </div>
  );
}

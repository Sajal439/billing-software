"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Transaction {
  id: number;
  date: string;
  description: string;
  debit: number;
  credit: number;
}

interface Party {
  id: number;
  name: string;
}

// Mock data for demonstration
const parties: Party[] = [
  { id: 1, name: "Acme Corp" },
  { id: 2, name: "Globex Corporation" },
  { id: 3, name: "Stark Industries" },
];

const transactions: Transaction[] = [
  {
    id: 1,
    date: "2023-06-01",
    description: "Invoice #001",
    debit: 1000,
    credit: 0,
  },
  {
    id: 2,
    date: "2023-06-05",
    description: "Payment received",
    debit: 0,
    credit: 500,
  },
  {
    id: 3,
    date: "2023-06-10",
    description: "Invoice #002",
    debit: 750,
    credit: 0,
  },
  {
    id: 4,
    date: "2023-06-15",
    description: "Payment received",
    debit: 0,
    credit: 1000,
  },
  {
    id: 5,
    date: "2023-06-20",
    description: "Invoice #003",
    debit: 1200,
    credit: 0,
  },
];

export function PartyLedger() {
  const [selectedParty, setSelectedParty] = useState<Party | null>(null);
  const [partyTransactions, setPartyTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (selectedParty) {
      // In a real application, you would fetch transactions for the selected party from an API
      setPartyTransactions(transactions);
      calculateBalance(transactions);
    }
  }, [selectedParty]);

  const calculateBalance = (transactions: Transaction[]) => {
    const newBalance = transactions.reduce((acc, transaction) => {
      return acc + transaction.debit - transaction.credit;
    }, 0);
    setBalance(newBalance);
  };

  const handlePartyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const partyId = parseInt(event.target.value);
    const party = parties.find((p) => p.id === partyId) || null;
    setSelectedParty(party);
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Party Ledger</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label htmlFor="party-select">Select Party</Label>
            <select
              id="party-select"
              className="w-full p-2 border rounded mt-1"
              onChange={handlePartyChange}
              value={selectedParty?.id || ""}
            >
              <option value="">Select a party</option>
              {parties.map((party) => (
                <option key={party.id} value={party.id}>
                  {party.name}
                </option>
              ))}
            </select>
          </div>

          {selectedParty && (
            <>
              <h2 className="text-2xl font-bold mb-4">{selectedParty.name}</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Debit</TableHead>
                    <TableHead className="text-right">Credit</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partyTransactions.map((transaction, index) => {
                    const runningBalance = partyTransactions
                      .slice(0, index + 1)
                      .reduce((acc, t) => acc + t.debit - t.credit, 0);

                    return (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell className="text-right">
                          {transaction.debit.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          {transaction.credit.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          {runningBalance.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <div className="mt-4 text-right">
                <strong>Final Balance: {balance.toFixed(2)}</strong>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

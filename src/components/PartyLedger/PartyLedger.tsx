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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export default function PartyLedger() {
  const [parties, setParties] = useState<Party[]>([]);
  const [selectedParty, setSelectedParty] = useState<Party | null>(null);
  const [partyTransactions, setPartyTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchParties();
  }, []);

  useEffect(() => {
    if (selectedParty) {
      fetchTransactions(selectedParty.id);
    }
  }, [selectedParty]);

  const fetchParties = async () => {
    const response = await fetch("/api/parties");
    if (response.ok) {
      const data = await response.json();
      setParties(data);
    }
  };

  const fetchTransactions = async (partyId: number) => {
    const response = await fetch(`/api/transactions?partyId=${partyId}`);
    if (response.ok) {
      const data = await response.json();
      setPartyTransactions(data);
      calculateBalance(data);
    }
  };

  const calculateBalance = (transactions: Transaction[]) => {
    const newBalance = transactions.reduce((acc, transaction) => {
      return acc + transaction.debit - transaction.credit;
    }, 0);
    setBalance(newBalance);
  };

  const handlePartyChange = (value: string) => {
    const partyId = parseInt(value);
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
            <Select onValueChange={handlePartyChange}>
              <SelectTrigger id="party-select">
                <SelectValue placeholder="Select a party" />
              </SelectTrigger>
              <SelectContent>
                {parties.map((party) => (
                  <SelectItem key={party.id} value={party.id.toString()}>
                    {party.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                        <TableCell>
                          {new Date(transaction.date).toLocaleDateString()}
                        </TableCell>
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

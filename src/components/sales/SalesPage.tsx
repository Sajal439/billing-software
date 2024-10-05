"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Plus } from "lucide-react";
import Link from "next/link";

interface Party {
  id: number;
  name: string;
  mobile: string;
  address: string;
}

interface TableItem {
  id: number;
  name: string;
  quantity: number;
  rate: number;
  amount: number;
}

export default function SalesRecordForm() {
  const [date, setDate] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [voucherType, setVoucherType] = useState("");
  const [partyName, setPartyName] = useState("");
  const [partyMobile, setPartyMobile] = useState("");
  const [suggestions, setSuggestions] = useState<Party[]>([]);
  const [tableItems, setTableItems] = useState<TableItem[]>([]);
  const [newItem, setNewItem] = useState<TableItem>({
    id: 1,
    name: "",
    quantity: 0,
    rate: 0,
    amount: 0,
  });
  const [allParties, setAllParties] = useState<Party[]>([]);

  useEffect(() => {
    fetchParties();
  }, []);

  const fetchParties = async () => {
    try {
      const response = await fetch("/api/parties");
      if (response.ok) {
        const parties = await response.json();
        setAllParties(parties);
      } else {
        console.error("Failed to fetch parties");
      }
    } catch (error) {
      console.error("Error fetching parties:", error);
    }
  };

  const handlePartyNameChange = (value: string) => {
    setPartyName(value);
    setPartyMobile("");
    if (value.length > 0) {
      const filtered = allParties.filter((party) =>
        party.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: Party) => {
    setPartyName(suggestion.name);
    setPartyMobile(suggestion.mobile);
    setSuggestions([]);
  };

  const calculateAmount = (quantity: number, rate: number) => {
    return quantity * rate;
  };

  const handleAddItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent form submission
    const amount = calculateAmount(newItem.quantity, newItem.rate);
    setTableItems([...tableItems, { ...newItem, amount }]);
    setNewItem({
      id: tableItems.length + 2,
      name: "",
      quantity: 0,
      rate: 0,
      amount: 0,
    });
  };

  const handleItemChange = (
    id: number,
    field: keyof TableItem,
    value: string | number
  ) => {
    const updatedItems = tableItems.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === "quantity" || field === "rate") {
          updatedItem.amount = calculateAmount(
            Number(updatedItem.quantity),
            Number(updatedItem.rate)
          );
        }
        return updatedItem;
      }
      return item;
    });
    setTableItems(updatedItems);
  };

  const handleDeleteItem = (id: number) => {
    const updatedItems = tableItems.filter((item) => item.id !== id);
    // Update serial numbers
    const reindexedItems = updatedItems.map((item, index) => ({
      ...item,
      id: index + 1,
    }));
    setTableItems(reindexedItems);
    // Update newItem id
    setNewItem((prev) => ({ ...prev, id: reindexedItems.length + 1 }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted", {
      date,
      invoiceNumber,
      voucherType,
      partyName,
      partyMobile,
      tableItems,
    });
  };

  useEffect(() => {
    const amount = calculateAmount(newItem.quantity, newItem.rate);
    setNewItem((prev) => ({ ...prev, amount }));
  }, [newItem.quantity, newItem.rate]);

  return (
    <Card className="w-full max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Sales Record Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="voucherType">Voucher Type</Label>
              <Select value={voucherType} onValueChange={setVoucherType}>
                <SelectTrigger id="voucherType">
                  <SelectValue placeholder="Select voucher type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="purchase">Purchase</SelectItem>
                  <SelectItem value="receipt">Receipt</SelectItem>
                  <SelectItem value="payment">Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="partyName">Party Name</Label>
            <div className="relative flex items-center">
              <Input
                id="partyName"
                type="text"
                value={partyName}
                onChange={(e) => handlePartyNameChange(e.target.value)}
                placeholder="Search for party name"
                className="flex-grow"
              />
              <Link href="/addparty" passHref>
                <Button className="ml-2" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-background border border-input rounded-md mt-1 max-h-60 overflow-auto">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    className="px-4 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="partyMobile">Party Mobile Number</Label>
            <Input
              id="partyMobile"
              type="tel"
              value={partyMobile}
              onChange={(e) => setPartyMobile(e.target.value)}
              placeholder="Enter party mobile number"
            />
          </div>
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Serial No.</TableHead>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>
                      <Input
                        value={item.name}
                        onChange={(e) =>
                          handleItemChange(item.id, "name", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(
                            item.id,
                            "quantity",
                            Number(e.target.value)
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.rate}
                        onChange={(e) =>
                          handleItemChange(
                            item.id,
                            "rate",
                            Number(e.target.value)
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>{item.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>{newItem.id}</TableCell>
                  <TableCell>
                    <Input
                      value={newItem.name}
                      onChange={(e) =>
                        setNewItem({ ...newItem, name: e.target.value })
                      }
                      placeholder="Enter item name"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={newItem.quantity || ""}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          quantity: Number(e.target.value),
                        })
                      }
                      placeholder="Quantity"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={newItem.rate || ""}
                      onChange={(e) =>
                        setNewItem({ ...newItem, rate: Number(e.target.value) })
                      }
                      placeholder="Rate"
                    />
                  </TableCell>
                  <TableCell>{newItem.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button onClick={handleAddItem}>Add</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}

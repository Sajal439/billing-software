"use client";

import { useEffect, useState } from "react";
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
import { Trash2 } from "lucide-react";

// Mock data for party suggestions
const partySuggestions = [
  "Acme Corp",
  "Globex Corporation",
  "Soylent Corp",
  "Initech",
  "Umbrella Corporation",
  "Hooli",
  "Dunder Mifflin",
  "Stark Industries",
  "Wayne Enterprises",
  "Cyberdyne Systems",
];

interface TableItem {
  id: number;
  name: string;
  quantity: number;
  rate: number;
  amount: number;
}

export default function SalesPage() {
  const [date, setDate] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [voucherType, setVoucherType] = useState("");
  const [partyName, setPartyName] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [tableItems, setTableItems] = useState<TableItem[]>([]);
  const [newItem, setNewItem] = useState<TableItem>({
    id: 1,
    name: "",
    quantity: 0,
    rate: 0,
    amount: 0,
  });

  const handlePartyNameChange = (value: string) => {
    setPartyName(value);
    if (value.length > 0) {
      const filtered = partySuggestions.filter((party) =>
        party.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setDate(currentDate);
  });
  useEffect(() => {
    const amount = calculateAmount(newItem.quantity, newItem.rate);
    setNewItem((prev) => ({ ...prev, amount }));
  }, [newItem.quantity, newItem.rate]);
  const handleSuggestionClick = (suggestion: string) => {
    setPartyName(suggestion);
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted", {
      date,
      invoiceNumber,
      voucherType,
      partyName,
      tableItems,
    });
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
  return (
    <Card className="w-full max-w-4xl mx-auto mt-8 rounded-xl">
      <CardHeader>
        <CardTitle>Sales Record Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                className="rounded-xl border-2 border-gray-400 focus:border-black"
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                className="rounded-xl focus:border-black border-2 border-gray-400"
                id="invoiceNumber"
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2 ">
              <Label htmlFor="voucherType">Voucher Type</Label>
              <Select value={voucherType} onValueChange={setVoucherType}>
                <SelectTrigger
                  className="rounded-xl border-2 border-gray-400 focus:border-black"
                  id="voucherType"
                >
                  <SelectValue placeholder="Select voucher type" />
                </SelectTrigger>
                <SelectContent className="bg-white opacity-100 rounded-xl">
                  <SelectItem
                    className="cursor-pointer hover:font-bold"
                    value="sales"
                  >
                    Sales
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer hover:font-bold"
                    value="purchase"
                  >
                    Purchase
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer hover:font-bold"
                    value="receipt"
                  >
                    Receipt
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer hover:font-bold"
                    value="payment"
                  >
                    Payment
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="partyName">Party Name</Label>
            <div className="relative">
              <Input
                className="rounded-xl border-2 border-gray-400 focus:border-black"
                id="partyName"
                type="text"
                value={partyName}
                onChange={(e) => handlePartyNameChange(e.target.value)}
                placeholder="Search for party name"
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-background border border-input rounded-md mt-1 max-h-60 overflow-auto bg-white opacity-100">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
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
                    <Button onClick={handleAddItem}>Add Item</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <Button className="bg-blue-500 rounded-xl" type="submit">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

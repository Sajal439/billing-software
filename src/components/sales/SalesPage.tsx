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

interface Item {
  id: number;
  name: string;
  rate: number;
}
interface TableItem {
  id: number;
  name: string;
  quantity: number;
  rate: number;
  amount: number;
}

// Mock database of items
const itemDatabase: Item[] = [
  { id: 1, name: "Item A", rate: 10.0 },
  { id: 2, name: "Item B", rate: 15.5 },
  { id: 3, name: "Item C", rate: 20.75 },
  { id: 4, name: "Item D", rate: 5.25 },
  { id: 5, name: "Item E", rate: 30.0 },
];
const partySuggestions = [
  { name: "Acme Corp", mobile: "1234567890" },
  { name: "Globex Corporation", mobile: "2345678901" },
  { name: "Soylent Corp", mobile: "3456789012" },
  { name: "Initech", mobile: "4567890123" },
  { name: "Umbrella Corporation", mobile: "5678901234" },
  { name: "Hooli", mobile: "6789012345" },
  { name: "Dunder Mifflin", mobile: "7890123456" },
  { name: "Stark Industries", mobile: "8901234567" },
  { name: "Wayne Enterprises", mobile: "9012345678" },
  { name: "Cyberdyne Systems", mobile: "0123456789" },
];

export default function SalesRecordForm() {
  const [date, setDate] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [voucherType, setVoucherType] = useState("");
  const [partyName, setPartyName] = useState("");
  const [partyMobile, setPartyMobile] = useState("");
  const [suggestions, setSuggestions] = useState<typeof partySuggestions>([]);
  const [tableItems, setTableItems] = useState<TableItem[]>([]);
  const [newItem, setNewItem] = useState<TableItem>({
    id: 1,
    name: "",
    quantity: 0,
    rate: 0,
    amount: 0,
  });
  const [itemSuggestions, setItemSuggestions] = useState<Item[]>([]);

  const handlePartyNameChange = (value: string) => {
    setPartyName(value);
    setPartyMobile("");
    if (value.length > 0) {
      const filtered = partySuggestions.filter((party) =>
        party.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: {
    name: string;
    mobile: string;
  }) => {
    setPartyName(suggestion.name);
    setPartyMobile(suggestion.mobile);
    setSuggestions([]);
  };

  const handleItemNameChange = (value: string) => {
    setNewItem((prev) => ({ ...prev, name: value, rate: 0 }));
    if (value.length > 0) {
      const filtered = itemDatabase.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setItemSuggestions(filtered);
    } else {
      setItemSuggestions([]);
    }
  };

  const handleItemSuggestionClick = (suggestion: Item) => {
    setNewItem((prev) => ({
      ...prev,
      name: suggestion.name,
      rate: suggestion.rate,
      amount: calculateAmount(prev.quantity, suggestion.rate),
    }));
    setItemSuggestions([]);
  };

  const calculateAmount = (quantity: number, rate: number) => {
    return quantity * rate;
  };

  const handleAddItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent form submission
    setTableItems([...tableItems, newItem]);
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
    <Card className="w-full max-w-4xl mx-auto mt-8 rounded-xl shadow-xl shadow-slate-300">
      <CardHeader>
        <CardTitle>Sales Record Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                className="w-full rounded-xl focus:border-black border-gray-400 border-1"
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                className="w-full rounded-xl focus:border-black border-gray-400 border-1"
                id="invoiceNumber"
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="voucherType">Voucher Type</Label>
              <Select value={voucherType} onValueChange={setVoucherType}>
                <SelectTrigger
                  id="voucherType"
                  className="w-full rounded-xl focus:border-black border-gray-400 border-1"
                >
                  <SelectValue placeholder="Select voucher type" />
                </SelectTrigger>
                <SelectContent className="bg-white opacity-100 cursor-pointer">
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
            <div className="relative flex items-center">
              <Input
                className="w-full rounded-xl focus:border-black border-gray-400 border-1"
                id="partyName"
                type="text"
                value={partyName}
                onChange={(e) => handlePartyNameChange(e.target.value)}
                placeholder="Search for party name"
              />
              <Link href="/add-party" passHref>
                <Button
                  className="ml-2 hover:bg-black hover:text-white rounded-xl "
                  size="icon"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-background border border-input rounded-xl mt-1 max-h-60 overflow-auto">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:font-bold bg-white opacity-100 cursor-pointer"
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
              className="w-full rounded-xl focus:border-black border-gray-400 border-1"
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
                    <TableCell>{item.name}</TableCell>
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
                    <TableCell>{item.rate.toFixed(2)}</TableCell>
                    <TableCell>{item.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button
                        className="rounded-xl hover:bg-red-400 hover:text-white"
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
                    <div className="relative">
                      <Input
                        className="w-full rounded-xl focus:border-black border-gray-400 border-1"
                        value={newItem.name}
                        onChange={(e) => handleItemNameChange(e.target.value)}
                        placeholder="Search for item"
                      />
                      {itemSuggestions.length > 0 && (
                        <ul className="absolute z-10 w-full bg-background border border-input rounded-xl mt-1 max-h-60 overflow-auto">
                          {itemSuggestions.map((suggestion) => (
                            <li
                              key={suggestion.id}
                              className="px-4 py-2 z-10 hover:font-bold bg-white opacity-100 cursor-pointer"
                              onClick={() =>
                                handleItemSuggestionClick(suggestion)
                              }
                            >
                              {suggestion.name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Input
                      className="w-full rounded-xl focus:border-black border-gray-400 border-1"
                      type="number"
                      value={newItem.quantity || ""}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          quantity: Number(e.target.value),
                          amount: calculateAmount(
                            Number(e.target.value),
                            newItem.rate
                          ),
                        })
                      }
                      placeholder="Quantity"
                    />
                  </TableCell>
                  <TableCell>{newItem.rate.toFixed(2)}</TableCell>
                  <TableCell>{newItem.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      className="hover:bg-black hover:text-white rounded-xl"
                      onClick={handleAddItem}
                    >
                      Add
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <Button
            className="hover:bg-black hover:text-white rounded-xl"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

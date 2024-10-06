import React from "react";
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

interface Filters {
  startDate: string;
  endDate: string;
  partyName: string;
  voucherType: string;
}

interface FilterProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export function TransactionFilters({ filters, onFilterChange }: FilterProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const handleSelectChange = (value: string) => {
    onFilterChange({ ...filters, voucherType: value });
  };

  return (
    <div className="bg-background p-4 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={filters.startDate || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            value={filters.endDate || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="partyName">Party Name</Label>
          <Input
            id="partyName"
            name="partyName"
            type="text"
            value={filters.partyName || ""}
            onChange={handleInputChange}
            placeholder="Enter party name"
          />
        </div>
        <div>
          <Label htmlFor="voucherType">Voucher Type</Label>
          <Select
            value={filters.voucherType}
            onValueChange={handleSelectChange}
          >
            <SelectTrigger id="voucherType">
              <SelectValue placeholder="Select voucher type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="purchase">Purchase</SelectItem>
              <SelectItem value="receipt">Receipt</SelectItem>
              <SelectItem value="payment">Payment</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={() => onFilterChange(filters)} className="mt-4">
        Apply Filters
      </Button>
    </div>
  );
}

import { Suspense } from "react";
import { TransactionList } from "@/components/TransactionView/TransactionList";
import { TransactionFilters } from "@/components/TransactionView/TransactionFilters";

type Filters = {
  // Define the structure of Filters here
  [key: string]: any;
};

export default function TransactionsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Transactions</h1>
      <TransactionFilters
        filters={{ startDate: "", endDate: "", partyName: "", voucherType: "" }}
        onFilterChange={function (filters: Filters): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Suspense fallback={<div>Loading transactions...</div>}>
        <TransactionList />
      </Suspense>
    </div>
  );
}

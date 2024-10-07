import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

async function getTransactions(searchParams: URLSearchParams) {
  const response = await fetch(`/api/transactions?${searchParams.toString()}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }
  return response.json();
}

export async function TransactionList() {
  const searchParams = useSearchParams();
  const transactions = await getTransactions(searchParams);

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Party Name</TableHead>
              <TableHead className="text-right">Debit</TableHead>
              <TableHead className="text-right">Credit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction: any) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.party.name}</TableCell>
                <TableCell className="text-right">
                  {transaction.debit.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  {transaction.credit.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

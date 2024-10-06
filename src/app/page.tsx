import AddItemForm from "@/components/addItem/AddItem";
import AddPartyForm from "@/components/addParty/AddParty";
import Navbar from "@/components/global/Navbar";
import SalesPage from "@/components/sales/SalesPage";
import { TransactionPage } from "@/components/TransactionView/TransactionPage";

export default function Home() {
  return (
    <div>
      <Navbar />
      {/* <SalesPage /> */}
      <TransactionPage/>
      {/* <AddItemForm /> */}
      {/* <AddPartyForm /> */}
    </div>
  );
}

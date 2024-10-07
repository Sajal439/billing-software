import AddItemForm from "@/components/addItem/AddItem";
import AddPartyForm from "@/components/addParty/AddParty";
import Navbar from "@/components/global/Navbar";
// import { PartyLedger } from "@/components/PartyLedger/PartyLedger";
import SalesRecordForm from "@/components/sales/SalesPage";
// import { TransactionPage } from "@/components/TransactionView/TransactionPage";

export default function Home() {
  return (
    <div>
      {/* <Navbar /> */}
      <SalesRecordForm />
      {/* <TransactionPage/> */}
      {/* <PartyLedger /> */}

      {/* <AddItemForm /> */}
      {/* <AddPartyForm /> */}
    </div>
  );
}

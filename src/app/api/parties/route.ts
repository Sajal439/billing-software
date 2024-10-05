import { NextResponse } from "next/server";

let parties = [
  { id: 1, name: "Acme Corp", mobile: "1234567890", address: "123 Acme St" },
  {
    id: 2,
    name: "Globex Corporation",
    mobile: "2345678901",
    address: "456 Globex Ave",
  },
];

export async function GET() {
  return NextResponse.json(parties);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newParty = {
    id: parties.length + 1,
    name: body.name,
    mobile: body.mobile,
    address: body.address,
  };
  parties.push(newParty);
  return NextResponse.json(newParty, { status: 201 });
}

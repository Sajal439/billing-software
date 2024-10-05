import { useRouter } from "next/router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddPartyForm() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("party added", { name, mobile, address });

    router.push("/");
  };

  return (
    <Card className="w-full mx-auto mt-8">
      <CardHeader>
        <CardTitle>Add new Party</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Enter Party Name"
              required
            ></Input>
          </div>
          <div className="space-y-4">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              type="tel"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
              }}
              placeholder="Enter Mobile Number"
              required
            ></Input>
          </div>
          <div className="space-y-4">
            <Label htmlFor="mobile">Addrress</Label>
            <Input
              id="address"
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              placeholder="Enter Address"
              required
            ></Input>
          </div>
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/")}
            >
              Cancel
            </Button>
            <Button type="submit">Add Party</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

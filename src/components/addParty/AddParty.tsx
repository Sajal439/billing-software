"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function AddPartyForm() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("New party added", { name, mobile, address });

    router.push("/");
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8 rounded-xl shadow-xl shadow-slate-300">
      <CardHeader>
        <CardTitle>Add New Party</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              className="w-full rounded-xl border-gray-300 border-2 focus:border-black"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter party name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              className="w-full rounded-xl border-gray-300 border-2 focus:border-black"
              id="mobile"
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter mobile number"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              className="w-full rounded-xl border-gray-300 border-2 focus:border-black"
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
              required
            />
          </div>
          <div className="flex justify-between">
            <Button
              className="rounded-xl border-gray-300 border-2 hover:border-black hover:font-bold"
              type="button"
              variant="outline"
              onClick={() => router.push("/")}
            >
              Cancel
            </Button>
            <Button
              className="rounded-xl hover:bg-pink-300 hover:font-bold"
              type="submit"
            >
              Add Party
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

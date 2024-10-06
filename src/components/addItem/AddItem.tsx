"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function AddItemForm() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("New party added", { name, quantity, price });

    router.push("/");
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8 rounded-xl shadow-xl shadow-slate-300">
      <CardHeader>
        <CardTitle>Add New Item</CardTitle>
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
            <Label htmlFor="mobile">Quantity</Label>
            <Input
              className="w-full rounded-xl border-gray-300 border-2 focus:border-black"
              id="mobile"
              type="tel"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Price</Label>
            <Input
              className="w-full rounded-xl border-gray-300 border-2 focus:border-black"
              id="address"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              required
            />
          </div>
          <div className="flex justify-between">
            <Button
              className="rounded-xl border-gray-300 border-2 hover:border-black"
              type="button"
              variant="outline"
              onClick={() => router.push("/")}
            >
              Cancel
            </Button>
            <Button className="rounded-xl hover:bg-pink-300" type="submit">
              Add Item
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

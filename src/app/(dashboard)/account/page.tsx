"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddAccountModal from "@/components/AddAccountModal";
import { Input } from "@/components/ui/input";

function page() {
  return (
    <div>
      <AccountsInterface />
    </div>
  );
}

export default page;

const AccountsInterface = () => {
  const [accounts, setAccounts] = useState([
    { id: 1, name: "Cash", type: "cash", balance: "RWF 29,989,012" },
    { id: 2, name: "Savings", type: "bank", balance: "RWF 15,450,000" },
    { id: 3, name: "Credit Card", type: "credit", balance: "RWF -2,500,000" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredAccounts = accounts.filter((account) =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex ">
      {/* Left Sidebar */}
      <div className="w-64 bg-neutral-800 p-4  rounded-md">
        <h2 className="text-xl font-semibold mb-4">Accounts</h2>
        <Dialog>
          <DialogTrigger asChild>
            <button className="w-full font-bold rounded-lg p-2 flex justify-center items-center mb-4 bg-emerald-500 hover:bg-emerald-600">
              <Plus className="w-4 h-4 " />
              Add
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl mt-3 bg-neutral-800 border-none">
            <AddAccountModal />
          </DialogContent>
        </Dialog>

        {/* Search section */}
        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          {filteredAccounts.map((account) => (
            <Card key={account.id} className="hover:bg-gray-50 cursor-pointer">
              <CardContent className="p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{account.name}</div>
                    <div className="text-sm text-gray-500">{account.type}</div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-sm ${
                        account.balance.includes("-")
                          ? "text-red-600"
                          : "text-emerald-500"
                      }`}
                    >
                      {account.balance}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex-1 px-3">
        <div className="text-gray-500 text-center  flex gap-3 flex-col">
          {filteredAccounts.map((account) => (
            <Card
              key={account.id}
              className="hover:bg-neutral-700 bg-neutral-800 border-none cursor-pointer"
            >
              <CardContent className="p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{account.name}</div>
                    <div className="text-sm text-gray-500">{account.type}</div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-sm ${
                        account.balance.includes("-")
                          ? "text-red-600"
                          : "text-emerald-500"
                      }`}
                    >
                      {account.balance}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

import React from "react";
import {
  ArrowRightLeft,
  CircleDollarSign,
  CreditCard,
  LayoutDashboard,
  Plus,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ExpenseForm from "@/components/TransactionUI";
import AmountChart from "@/components/AmountCharts";
import AmountTotalChart from "@/components/AmountTotalCharts";
import Progress from "@/components/ui/progress";
import LastRecordedComponents from "@/components/LastRecoreded";

function page() {
  const CardData = [
    {
      Name: "Accounts",
      Description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam sequi,",
      icons: <CreditCard size={40} />,
      number: 3,
    },
    {
      Name: "Transaction",
      Description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam sequi,",
      icons: <ArrowRightLeft size={40} />,
      number: 10,
    },
    {
      Name: "category",
      Description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam sequi,",
      icons: <LayoutDashboard size={40} />,
      number: 9,
    },
    {
      Name: "Total Amount",
      Description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam sequi,",
      icons: <CircleDollarSign size={40} />,
    },
  ];

  return (
    <div className="">
      {" "}
      <div className="w-full items-center flex justify-end text-white mb-3">
        <Dialog>
          <DialogTrigger asChild>
            <button className="px-3  bg-cyan-500 text-xs hover:bg-neutral-700 py-0 border  justify-center items-center rounded-full flex gap-2">
              <Plus size={18} />
              Record
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl mt-3 bg-neutral-800 border-none">
            <ExpenseForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex gap-2">
        {CardData.map((data) => (
          <div
            key={"first-array" + data.Name}
            className="h-28 w-full flex justify-center items-center rounded-lg px-3  bg-neutral-800 animate-pulse"
          >
            <div className="flex w-full gap-2 justify-between text-white">
              <div className="w-3/4">
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{data.Name}</p>
                  {data.number && (
                    <p
                      className="text-2xl font-bold text-[10px] bg-neutral-600 text-center flex justify-center items-center
                   border rounded-full w-6 h-6"
                    >
                      {data.number}
                    </p>
                  )}
                </div>

                <p className="text-xs mt-3">{data.Description}</p>
              </div>
              <div className="flex-1 flex items-center justify-center">
                {data.icons}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 gap-3 grid grid-cols-1 sm:grid-cols-2">
        <div
          key={"first-array"}
          className=" w-full flex flex-col justify-center items-center rounded-lg px-3  bg-neutral-800"
        >
          <p className="w-full text-start font-bold mt-3">Dashboard</p>
          <div className=" flex gap-2">
            <div className="flex items-center justify-center flex-col my-5">
              <AmountChart name="Totatal amount" color="cyan" number={300} />
              <p className="font-bold">Total Amount</p>
            </div>
            <div className="flex items-center justify-center flex-col my-5">
              <AmountChart
                name="Totatal expense"
                color="#E84056"
                number={150}
              />
              <p className="font-bold">Totatal expenses</p>
            </div>
            <div className="flex items-center justify-center flex-col my-5">
              <AmountTotalChart
                name="Totatal expense"
                color1="cyan"
                color2="#E84056"
                number1={300}
                number2={150}
              />
              <p className="font-bold">Totatal expenses</p>
            </div>
          </div>
        </div>
        <div
          key={"first-array"}
          className=" w-full flex flex-col justify-center items-center rounded-lg px-3  bg-neutral-800"
        >
          <p className="w-full text-start font-bold mt-3">Cash Flow</p>
          <div className="w-full mt-5">
            <p className="uppercase">This Month</p>
            <p className="uppercase font-bold text-3xl">-Rfw 124500</p>
          </div>
          <div className=" flex gap-1 w-full flex-col">
            <div className="flex w-full items-center justify-start flex-col my-5">
              <p className="font-bold text-start mb-3 w-full">Total Expense</p>
              <Progress
                value={50}
                primaryColor="bg-[#E84056]"
                secondaryColor="bg-gray-700"
              />
            </div>
            <div className="flex w-full items-center justify-start flex-col my-5">
              <p className="font-bold text-start mb-3 w-full">Total Cash</p>
              <Progress
                value={70}
                primaryColor="bg-cyan-300"
                secondaryColor="bg-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Back sectio */}
        <div
          key={"first-array"}
          className=" w-full flex flex-col justify-center items-center rounded-lg px-3  bg-neutral-800"
        >
          <p className="w-full text-start font-bold mt-3">Last Record</p>
          <LastRecordedComponents />
        </div>
      </div>
    </div>
  );
}

export default page;

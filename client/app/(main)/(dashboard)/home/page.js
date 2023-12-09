"use client";
import StatusCard from "@/components/layout/guardian/StatusCard";
import {
  ArrowUpRightIcon,
  CircleStackIcon,
  CurrencyDollarIcon,
  DocumentDuplicateIcon,
  QrCodeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardBody,
  CardHeader,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

export default function Home() {
  const status = "Good";
  const [balance, setBalance] = useState(25.5);
  const [client, setClient] = useState(null);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    client && (
      <div className="w-full h-full z-10 flex items-center justify-center">
        <Card className="w-[30rem] p-4 flex flex-col gap-4">
          <StatusCard status={status} />
          <CardHeader
            variant="gradient"
            color="gray"
            className="mt-4 flex flex-col p-4 mx-0 my-0"
          >
            <div className="flex justify-between items-center">
              <h1 className="font-uni text-white/80 text-2xl font-extrabold">
                Your Balance
              </h1>
              <div className="flex gap-2 items-center">
                <Popover>
                  <PopoverHandler>
                    <QrCodeIcon className="h-8 w-8 hover:cursor-pointer" />
                  </PopoverHandler>
                  <PopoverContent className="z-10">QR Code</PopoverContent>
                </Popover>
                <DocumentDuplicateIcon className="h-8 w-8 hover:cursor-pointer" />
              </div>
            </div>

            <p className="font-uni text-7xl flex gap-1 font-extrabold mt-2 items-center">
              <CurrencyDollarIcon className="h-16 w-16" />
              {balance.toFixed(2)
                ? balance.toFixed(2) > 1000
                  ? balance.toFixed(2) / 1000 + "K"
                  : balance.toFixed(2) > 1000000
                  ? balance.toFixed(2) / 1000000 + "M"
                  : balance.toFixed(2)
                : "0"}
            </p>
          </CardHeader>

          <CardBody className="py-0 px-0 pb-1">
            <h2 className="text-4xl font-extrabold">Quick Links</h2>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex gap-4 items-center hover:cursor-pointer hover:underline underline-offset-4">
                <ArrowUpRightIcon className="h-8 w-8" />
                <p className="font-uni text-2xl font-bold">Transfer</p>
              </div>
              <div className="flex gap-4 items-center hover:cursor-pointer hover:underline underline-offset-4">
                <CircleStackIcon className="h-8 w-8" />
                <p className="font-uni text-2xl font-bold">Tokens</p>
              </div>
              <div className="flex gap-4 items-center hover:cursor-pointer hover:underline underline-offset-4">
                <UserIcon className="h-8 w-8" />
                <p className="font-uni text-2xl font-bold">Contacts</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    )
  );
}

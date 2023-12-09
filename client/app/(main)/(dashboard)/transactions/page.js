"use client";
import TransactionButton from "@/components/layout/main/dashboard/transactions/TransactionButton";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ChainConfig } from "@/lib/ChainConfig";

export default function Transactions() {
  const searchParams = useSearchParams();
  const currentConfig = ChainConfig.find(
    (c) => c.chainId.toString() === "80001"
  );
  const transactions = [
    {
      from_address: "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
      to_address: "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
      value: "1000000000000000000",
      type: "send",
      block_signed_at: new Date(),
      explorers: [
        {
          name: "Etherscan",
          url: "https://etherscan.io/tx/0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
        },
      ],
    },
    {
      from_address: "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
      to_address: "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
      value: "1000000000000000000",
      type: "send",
      block_signed_at: new Date(),
      explorers: [
        {
          name: "Etherscan",
          url: "https://etherscan.io/tx/0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
        },
      ],
    },
    {
      from_address: "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
      to_address: "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
      value: "1000000000000000000",
      type: "send",
      block_signed_at: new Date(),
      explorers: [
        {
          name: "Etherscan",
          url: "https://etherscan.io/tx/0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
        },
      ],
    },
    {
      from_address: "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
      to_address: "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
      value: "1000000000000000000",
      type: "send",
      block_signed_at: new Date(),
      explorers: [
        {
          name: "Etherscan",
          url: "https://etherscan.io/tx/0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
        },
      ],
    },
  ];

  return (
    <div className="w-full h-full z-10 flex items-center justify-center">
      <Card className="w-[30rem] p-4 flex flex-col gap-4">
        <CardHeader
          variant="gradient"
          color="gray"
          className="w-full py-6 mx-0 my-0"
        >
          <h1 className="font-uni text-white text-3xl font-bold text-center">
            Transactions
          </h1>
        </CardHeader>

        <CardBody className="flex flex-col gap-4 py-0 px-1 h-96 overflow-x-hidden overflow-y-scroll hide-scroll">
          {transactions.map((transaction, index) => {
            return (
              <TransactionButton
                pubKey={transaction.from_address}
                amount={
                  Number(transaction.value) / 10 ** currentConfig.decimals
                }
                symbol={currentConfig.symbol}
                type={transaction.type}
                date={transaction.block_signed_at.getTime()}
                key={index}
                to={transaction.to_address}
                scanUrl={transaction.explorers[0].url}
              />
            );
          })}
        </CardBody>
      </Card>
    </div>
  );
}

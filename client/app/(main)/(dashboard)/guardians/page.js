"use client";
import GuardianCard from "@/components/layout/main/dashboard/guardians/GuardianCard";
import { Card, CardHeader } from "@material-tailwind/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useContractEvent } from "wagmi";

export default function Guardians() {

  const guardians=[{
    name:"Rahul",
    address:"0x2160D41c9D711Ca3fA7777211148538eeb431970"
  }]

  return (
    <div className="w-full h-full z-10 flex items-center justify-center">
      <Card className="w-[30rem] p-4 flex flex-col gap-4">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mt-4 grid h-20 place-items-center mx-0 my-0"
        >
          <h1 className="font-uni text-white text-3xl font-bold">Guardians</h1>
        </CardHeader>

        {guardians.map((guardian, index) => (
          <GuardianCard
            key={index}
            name={guardian.name}
            address={guardian.address}
            id={index}
          />
        ))}

        {!guardians && (
          <div className="flex items-center justify-center gap-3">
            <XCircleIcon className="w-6 h-6 text-black" />
            No Guardians
          </div>
        )}
      </Card>
    </div>
  );
}

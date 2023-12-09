"use client";
import GuardianRequests from "@/components/layout/main/dashboard/requests/GuardianRequests";
import RecoveryRequests from "@/components/layout/main/dashboard/requests/RecoveryRequests";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Requests() {
  
  const AllRecoveryRequests=[{
    from:"0xb6Ec0f5CE5b561981fe65968505F90e241aC7280",
    requests:{
        proposedOwner:"0x2160D41c9D711Ca3fA7777211148538eeb431970"
    }
  }]

  const AllGuardianRequests=[{
    from:"0xb6Ec0f5CE5b561981fe65968505F90e241aC7280",
    requests:{
        guardianToChange:"0x3C700d88616C9e186aed7dd59B2e7f60819bf863",
        proposedGuardian:"0x2160D41c9D711Ca3fA7777211148538eeb431970"
    }
  }]
 
  return (
    <div className="w-full h-full z-10 flex items-center justify-center">
      <Card className="w-[30rem] p-4 flex flex-col gap-4">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mt-4 grid h-20 place-items-center mx-0 my-0"
        >
          <h1 className="font-uni text-white text-3xl font-bold">Requests</h1>
        </CardHeader>

        <CardBody className="flex flex-col gap-4 p-0">
          {AllRecoveryRequests.map((request, index) => (
            <RecoveryRequests
              key={index}
              name={null}
              address={request.from}
              proposedOwner={request.requests.proposedOwner}
            />
          ))}

          {(!AllRecoveryRequests || AllRecoveryRequests.length === 0) && (
            <div className="flex items-center justify-center gap-3">
              <XCircleIcon className="w-6 h-6 text-black" />
              No Recovery Requests
            </div>
          )}

          <div className="flex items-center justify-center text-center gap-3">
            <div className="w-[20%] bg-black h-[1px]" /> Guardian Requests
            <div className="w-[20%] bg-black h-[1px]" />
          </div>

          {AllGuardianRequests.map((request, index) => (
            <GuardianRequests
              key={index}
              name={null}
              from={request.from}
              address={request.requests.guardianToChange}
              proposedGuardian={request.requests.proposedGuardian}
            />
          ))}
        </CardBody>

        {(!AllGuardianRequests || AllGuardianRequests.length === 0) && (
          <div className="flex items-center justify-center gap-3">
            <XCircleIcon className="w-6 h-6 text-black" />
            No Guardian Requests
          </div>
        )}
      </Card>
    </div>
  );
}
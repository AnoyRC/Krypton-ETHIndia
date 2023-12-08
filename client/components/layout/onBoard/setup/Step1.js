'use client';
import {
  ArbitrumChip,
  BaseChip,
  CeloChip,
  PolygonChip,
  PolygonZKChip,
  ScrollChip,
} from '@/components/ui/chainChips';
import { setActiveStep, setChain, setName } from '@/redux/slice/setupSlice';
import { Button, Input, Select, Option, Alert } from '@material-tailwind/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function Step1() {
  const dispatch = useDispatch();
  const chain = useSelector((state) => state.setup.chain);
  const name = useSelector((state) => state.setup.name);

  return (
    <div className="w-full flex flex-col gap-4">
      <h6 className="font-uni text-lg font-bold">Wallet Name</h6>
      <Input
        size="lg"
        placeholder="my-awesome-wallet"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 -my-2"
        labelProps={{
          className: 'before:content-none after:content-none',
        }}
        value={name}
        onChange={(e) => dispatch(setName(e.target.value))}
      />

      <h6 className="font-uni text-lg font-bold">Chain</h6>
      <Select
        variant="static"
        label=""
        containerProps={{
          className: '-mt-5 mb-2',
        }}
        labelProps={{
          className: 'my-2',
        }}
        className="my-2"
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
        value={chain}
        onChange={(e) => dispatch(setChain(e))}
      >
        <Option value="1">
          <PolygonChip />
        </Option>
        <Option value="2">
          <PolygonZKChip />
        </Option>
        <Option value="3">
          <ArbitrumChip />
        </Option>
        <Option value="4">
          <CeloChip />
        </Option>
        <Option value="5">
          <BaseChip />
        </Option>
        <Option value="6">
          <ScrollChip />
        </Option>
      </Select>

      <Alert variant="gradient" icon={<Icon />} className="mb-2 mr-0">
        <h6 className="font-bold text-lg mb-2">Change your Wallet Network</h6>
        <p className="text-sm">
          You are trying to deploy Krypton on a network that is not selected
        </p>
        <Button
          size="sm"
          variant="outlined"
          className="mt-4 border-white text-white mb-1"
        >
          Change Network
        </Button>
      </Alert>

      <div className="flex justify-between">
        <Button
          size="md"
          variant="outlined"
          className="capitalize font-uni font-bold"
        >
          Cancel
        </Button>

        <Button
          size="md"
          className="capitalize font-uni font-bold"
          onClick={() => {
            dispatch(setActiveStep(1));
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

'use client';

import { useAccount } from 'wagmi';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useEthersSigner } from '@/wagmi/EthersSigner';

import RequestsItem from './RequestsItem';

const Contacts = () => {
  return (
    <div className="relative flex-1">
      <div className="flex flex-col gap-2">
        <RequestsItem />
      </div>
    </div>
  );
};

export default Contacts;

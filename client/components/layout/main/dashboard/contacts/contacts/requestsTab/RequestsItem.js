'use client';

import { Button } from '@material-tailwind/react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const RequestsItem = ({ request, initializeRequests }) => {
  const pubKey = '0xRioedflksfjiesjfisfkjgklsjrj2';

  const handleAcceptRequest = async () => {
    console.log('accept request');
  };

  const handleRejectRequest = async () => {
    console.log('reject request');
  };

  return (
    <div className="flex justify-between border-b borde-gray-200 px-2 py-3 hover:bg-gray-50">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full mr-3 overflow-hidden bg-red-200"></div>

        <div>
          <h3 className="text-base font-bold text-black">
            {pubKey.slice(0, 6)}...{pubKey.slice(-4)}
          </h3>

          <p className="text-xs">gjdfjkfgdk</p>
        </div>
      </div>

      <div className="flex items-center">
        <Button
          className="bg-transparent border-2 border-green-500/20 p-1.5 rounded-full text-primary-blue mr-2 shadow-none hover:shadow-sm"
          onClick={handleAcceptRequest}
        >
          <CheckIcon className="h-4 w-4 text-green-500" />
        </Button>

        <Button
          className="border-2 border-red-500/20 bg-red-500/20 rounded-full text-primary-blue p-1.5 shadow-none hover:shadow-sm"
          onClick={handleRejectRequest}
        >
          <XMarkIcon className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
};

export default RequestsItem;

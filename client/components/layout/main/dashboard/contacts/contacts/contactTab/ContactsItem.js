'use strict';

import { ChevronRightIcon } from '@heroicons/react/24/outline';

import { useEffect, useState } from 'react';

const ContactsItem = ({ chat }) => {
  const [message, setMessage] = useState(null);
  const pubKey = '0xRioedflksfjiesjfisfkjgklsjrj2';

  const handleClick = () => {
    console.log('clicked');
  };

  return (
    <>
      <li
        className="flex justify-between items-center border-b borde-gray-200 px-2 hover:bg-gray-50 cursor-pointer rounded-lg"
        onClick={handleClick}
      >
        <div className="flex items-center my-2">
          <div className="w-10 h-10 bg-red-200 rounded-full mr-3 overflow-hidden bg-red-200">
            {/* <Image
              src={chat?.profilePicture}
              alt="profile picture"
              width={40}
              height={40}
            /> */}
          </div>

          <div>
            <h3 className="text-base font-bold text-black">
              {pubKey.slice(0, 8)}...
              {pubKey.slice(-4)}
            </h3>

            {/* <div className="text-xs font-medium w-24 hide-scroll overflow-hidden whitespace-nowrap text-ellipsis">
              {message}
            </div> */}

            <div className="text-xs font-medium w-24 hide-scroll overflow-hidden whitespace-nowrap scroll-on-hover">
              <p>{message}</p>
            </div>
          </div>
        </div>

        <ChevronRightIcon className="h-5 w-5 text-black" />
      </li>
    </>
  );
};

export default ContactsItem;

'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Chat = () => {
  const [loading, setLoading] = useState(true);

  const pushSign = useSelector((state) => state.contacts.pushSign);
  const messageHistory = useSelector((state) => state.contacts.messages);
  const currentContact = useSelector((state) => state.contacts.currentContact);

  const initializeChat = async () => {
    return true;
  };

  useEffect(() => {
    if (currentContact && pushSign) {
      setLoading(true);
      initializeChat();
    }
  }, [currentContact, pushSign]);

  return (
    <div className="mb-6 flex-1 relative font-uni">
      {loading ? (
        <div className="text-primary-white/60 z-10 w-fit mx-auto">
          <Image
            src="/images/onboard/setup/loading.svg"
            alt="Loading spinner"
            width={32}
            height={32}
            className="animate-spin opacity-60"
          />
        </div>
      ) : messageHistory.length === 0 ? (
        <div className="flex text-primary-white/60 py-2 px-6 bg-gray-100 rounded-lg mt-2 items-start">
          <p className="text-sm text-center flex mx-auto">
            Messages are end-to-end encrypted. Only users in this chat can view
            or listen to them.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-1 z-10">Hello</div>
      )}
    </div>
  );
};

export default Chat;

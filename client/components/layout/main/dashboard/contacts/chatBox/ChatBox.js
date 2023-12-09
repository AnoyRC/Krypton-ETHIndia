'use client';

import { useSelector } from 'react-redux';

import Chat from './Chat';
import SendMessageContainer from './sendMessage/SendMessageContainer';

const ChatBox = () => {
  const currentContact = useSelector((state) => state.contacts.currentContact);

  return (
    <>
      <h1>Header</h1>
      <section className="px-5 py-2 h-full flex flex-col justify-between overflow-hidden relative">
        <div className="overflow-y-auto hide-scroll">
          <Chat />
        </div>

        <SendMessageContainer />
      </section>
    </>
  );
};

export default ChatBox;

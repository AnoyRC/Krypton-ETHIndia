'use client';

import ContactsContainer from '@/components/layout/main/dashboard/contacts/ContactsContainer';

function Chat() {
  return (
    <div className="flex h-[calc(100vh-80px)] z-10 gap-2">
      <ContactsContainer />
    </div>
  );
}

export default Chat;

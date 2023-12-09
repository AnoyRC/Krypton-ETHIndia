import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

const SendMessageContainer = () => {
  return (
    <div className="flex items-center">
      <div className="flex flex-1 items-center rounded-full bg-[#fffaf9] pl-5 border border-gray-200 py-1">
        <ChatBubbleLeftIcon className="w-5 h-5" />

        <input type="text" placeholder="Type a message" className="flex-1" />
      </div>
    </div>
  );
};

export default SendMessageContainer;

import React from "react";
import Message from "./Message";
import UseGetMessages from "../hooks/useGetMessages";
import { useSelector } from "react-redux";

const Messages = () => {
  UseGetMessages();
  const { messages } = useSelector((store) => store.message);
  if (!messages) return;
  return (
<>
    <div className="px-4 flex-1 overflow-auto h-full w-full">
      {messages && messages?.map((message) => {
        return <Message key={message._id} message={message} />;
      })}

    </div>
    </>
  );
};

export default Messages;

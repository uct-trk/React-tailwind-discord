import React, { useRef } from "react";
import {
  HashtagIcon,
  UserIcon,
  BellIcon,
  ChatIcon,
  SearchIcon,
  InboxIcon,
  QuestionMarkCircleIcon,
  PlusCircleIcon,
  GiftIcon,
  EmojiHappyIcon,
} from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import {
  selectChannelId,
  selectChannelName,
} from "../../features/channelSlice";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "firebase";
import Message from "../Message/Message";

const Chat = () => {
  const channelName = useSelector(selectChannelName);
  const channelId = useSelector(selectChannelId);
  const [user] = useAuthState(auth);
  const [messages] = useCollection(
    channelId &&
      db
        .collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );
  const inputRef = useRef("");
  const chatRef = useRef(null);

  const scrollToBottom = () => {
    chatRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (inputRef.current.value !== "") {
      db.collection("channels").doc(channelId).collection("messages").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: inputRef.current.value,
        name: user?.displayName,
        photoURL: user?.photoURL,
        email: user?.email,
      });
    }
    inputRef.current.value = "";
    // mesaj yazdığımız zaman oto scroll ile aşağıya iner
    scrollToBottom();
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between space-x-5 border-b border-gray-800 p-4 -mt-1">
        <div className="flex items-center space-x-1">
          <HashtagIcon className="h-6 text-discord_chatHeaderIcon" />
          <h4 className="text-white font-semibold">{channelName}</h4>
        </div>
        <div className="flex space-x-3">
          <BellIcon className="icon" />
          <ChatIcon className="icon" />
          <UserIcon className="icon" />
          <div className="flex bg-discord_chatHeaderInputBg text-xs p-1">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent focus:outline-none text-white pl-1 placeholder-discord_chatHeaderIcon"
            />
            <SearchIcon className="h-4 text-discord_chatHeaderIcon mr-1" />
          </div>
          <InboxIcon className="icon" />
          <QuestionMarkCircleIcon className="icon" />
        </div>
      </header>
      <main className="flex-grow overflow-y-scroll scrollbar-hide">
        {messages?.docs.map((doc) => {
          const { message, timestamp, name, photoURL, email } = doc.data();
          return (
            <Message
              key={doc.id}
              id={doc.id}
              message={message}
              timestamp={timestamp}
              email={email}
              photoURL={photoURL}
              name={name}
            />
          );
        })}
        <div ref={chatRef} className="pb-16"></div>
      </main>
      <div className="flex items-center p-2.5 bg-discord_chatInputBg mx-5 mb-7 rounded-lg">
        <PlusCircleIcon className="icon mr-4" />
        <form className="flex-grow">
          <input
            type="text"
            disabled={!channelId}
            placeholder={
              channelId ? `Message #${channelName}` : "Select a channel"
            }
            className="bg-transparent focus:outline-none text-discord_chatInputText w-full placeholder-discord_chatInput text-sm"
            ref={inputRef}
          />
          <button hidden type="submit" onClick={sendMessage}>
            Send
          </button>
        </form>
        <GiftIcon className="icon mr-2" />
        <EmojiHappyIcon className="icon" />
      </div>
    </div>
  );
};

export default Chat;

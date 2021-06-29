import React from "react";
import moment from "moment";
import { TrashIcon } from "@heroicons/react/solid";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { selectChannelId } from "../../features/channelSlice";

const Message = ({ id, message, timestamp, name, email, photoURL }) => {
  const [user] = useAuthState(auth);

  const channelId = useSelector(selectChannelId);

  return (
    <div className="flex items-center p-1 pl-5 my-5 mr-2 hover:bg-discord_messageBg group">
      <img
        src={photoURL}
        alt="user"
        className="h-7 rounded-full cursor-pointer mr-3 hover:shadow-2xl"
      />
      <div className="flex flex-col">
        <h4 className="flex items-center space-x-2 font-medium">
          <span className="hover:underline text-white text-sm cursor-pointer">
            {name}
          </span>
          <span className="text-discord_chatMessage text-xs">
            {moment(timestamp?.toDate().getTime()).format("lll")}
          </span>
        </h4>
        <p className="text-sm text-discord_message">{message}</p>
      </div>
      {user?.email === email && (
        <div
          onClick={() =>
            db
              .collection("channels")
              .doc(channelId)
              .collection("messages")
              .doc(id)
              .delete()
          }
          className="hover:text-white hover:bg-discord_deleteColor p-1 ml-auto cursor-pointer rounded-sm text-discord_deleteColor"
        >
          <TrashIcon className="h-5 hidden group-hover:inline" />
        </div>
      )}
    </div>
  );
};

export default Message;

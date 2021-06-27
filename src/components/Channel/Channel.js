import { HashtagIcon } from "@heroicons/react/outline";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setChannelInfo } from "../../features/channelSlice";

const Channel = ({ id, channelName }) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const setChannel = () => {
    dispatch(setChannelInfo({
      channelId : id,
      channelName: channelName,
    }))
    history.push(`/channels/${id}`);
  }

  return (
    <div onClick={setChannel} className="font-medium flex items-center cursor-pointer hover:bg-discord_channelHoverBg p-1 rounded-md hover:text-white">
      <HashtagIcon className="h-5 mr-2"/> {channelName}
    </div>
  );
};

export default Channel;

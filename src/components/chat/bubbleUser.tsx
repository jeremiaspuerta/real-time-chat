"use client";

import { Avatar, Chip } from "@nextui-org/react";

interface Props {
  user_id: number;
  username: string;
  is_online: boolean;
  handleClick?: (user_id: number) => void;
}

export const BubbleUser = ({
  user_id,
  username,
  is_online,
  handleClick,
}: Props) => {
  const bgHoverStyle = handleClick != null ? "hover:bg-slate-200" : "";

  return (
    <div
      className={
        "w-full flex flex-row gap-5 items-center p-4 bg-slate-100 rounded-2xl " +
        bgHoverStyle
      }
      onClick={() => handleClick(user_id)}
    >
      <Avatar
        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        className="w-14 h-14 text-large"
      />
      <div className="flex flex-col text-slate-900 font-bold">
        <p>{username}</p>
        {is_online && (
          <Chip
            color="success"
            variant="dot"
            className="text-slate-600 border-0 p-0"
          >
            Active now
          </Chip>
        )}
        {!is_online && (
          <Chip
            color="default"
            variant="dot"
            className="text-slate-600 border-0 p-0"
          >
            Offline
          </Chip>
        )}
      </div>
    </div>
  );
};

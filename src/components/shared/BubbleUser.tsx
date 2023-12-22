"use client";

import { Avatar, Chip } from "@nextui-org/react";

type Props = {
  name: string;
  isOnline: boolean;
  // eslint-disable-next-line no-unused-vars
  handleClick?: () => Promise<void>;
};

export const BubbleUser = ({ name, isOnline, handleClick }: Props) => {
  const bgHoverStyle = handleClick ? "hover:bg-slate-200" : "";

  return (
    <div
      className={
        "w-full flex flex-row gap-5 items-center p-4 bg-slate-100 rounded-2xl " +
        bgHoverStyle
      }
      onClick={() => handleClick}
    >
      <Avatar
        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        className="w-14 h-14 text-large"
      />
      <div className="flex flex-col text-slate-900 font-bold">
        <p>{name}</p>
        {isOnline && (
          <Chip
            color="success"
            variant="dot"
            className="text-slate-600 border-0 p-0"
          >
            Active now
          </Chip>
        )}
        {!isOnline && (
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

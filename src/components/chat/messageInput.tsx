import { Textarea } from "@nextui-org/react";
import { PLACEHOLDERS } from "../constants/placeholders";

export const MessageInput = () => {
  return (
    <>
      <Textarea
        classNames={{
          base: "max-w-screen max-h-24",
          input: "resize-y min-h-[14px] text-md",
          inputWrapper: "bg-slate-100",
        }}
        placeholder={PLACEHOLDERS.CHAT_MESSAGE}
        disableAutosize
      />
    </>
  );
};

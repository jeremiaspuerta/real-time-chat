import { Textarea } from "@nextui-org/react";
import { PLACEHOLDER_CHAT_MESSAGE } from "@/constants/Placeholders";

export const ChatTextBoxComponent = () => {
  return (
    <Textarea
      classNames={{
        base: "max-w-screen max-h-24",
        input: "resize-y min-h-[14px] text-md",
        inputWrapper: "bg-slate-100",
      }}
      placeholder={PLACEHOLDER_CHAT_MESSAGE as string}
      disableAutosize
    />
  );
};

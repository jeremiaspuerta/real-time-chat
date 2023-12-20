import { ContainerCurrentChat } from "@/components/chat/containerCurrentChat";
import { HistoryMessages } from "@/components/chat/historyMessages";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-row gap-4 bg-white">
      <HistoryMessages />
      <ContainerCurrentChat />
    </div>
  );
}

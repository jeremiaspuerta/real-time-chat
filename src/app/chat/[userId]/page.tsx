import { ContainerCurrentChat } from "@/components/chat/containerCurrentChat";

type Params = {
  userId: string;
}

type Props = {
  params: Params;
}

export default function ChatPage({params}:  Readonly<Props>) {
  const { userId } = params;

  return (
      <ContainerCurrentChat />
  );
}

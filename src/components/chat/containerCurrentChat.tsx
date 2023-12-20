import { Component } from "react"
import { MessageInput } from "./messageInput"
import { CurrentChatMessages } from "./currentChatMessages"
import { BubbleUser } from "./bubbleUser"

interface PropsInterface {
    inputMessage?: Component
    messages?: Component
}

export const ContainerCurrentChat = ({inputMessage, messages}: PropsInterface) => {
    return (
        <div className="flex flex-col h-screen w-screen p-5 gap-5 bg-white shadow-lg">
            <BubbleUser user_id={1} username="Carlos Perez" is_online={true}/>
            <CurrentChatMessages/>
            <MessageInput />
        </div>
    )
}
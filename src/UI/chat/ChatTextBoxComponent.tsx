import { Button, Textarea } from "@nextui-org/react";
import { PLACEHOLDER_CHAT_MESSAGE } from "../../Constants/Placeholders";
import styles from "../styles/chat-text-box.module.css";
import { FiSend } from "react-icons/fi";
import { useState } from "react";

type Props = {
  // eslint-disable-next-line no-unused-vars
  handleSendMessage(message: string): Promise<void>;
};

export const ChatTextBoxComponent = ({ handleSendMessage }: Props) => {
  const [message, setMessage] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleClick = () => {
    if (message.trim() !== "") {
      void handleSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Evitar el salto de línea en el Textarea
      void handleClick();
    }
  };

  return (
    <div className={styles.container}>
      <Textarea
        classNames={{
          base: styles.base,
          input: styles.input,
          inputWrapper: styles.input_wrapper,
        }}
        placeholder={PLACEHOLDER_CHAT_MESSAGE as string}
        disableAutosize
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={message}
      />
      <Button
        className={styles.button}
        isIconOnly
        color="primary"
        aria-label="Send"
        onClick={handleClick}
      >
        <FiSend size={"20px"} />
      </Button>
    </div>
  );
};

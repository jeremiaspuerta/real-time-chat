import { Button, Textarea } from "@nextui-org/react";
import { PLACEHOLDER_CHAT_MESSAGE } from "../../Constants/Placeholders";
import styles from "../styles/chat-text-box.module.css";
import { FiSend } from "react-icons/fi";

export const ChatTextBoxComponent = () => {
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
      />
      <Button
        className={styles.button}
        isIconOnly
        color="primary"
        aria-label="Send"
      >
        <FiSend size={"20px"} />
      </Button>
    </div>
  );
};

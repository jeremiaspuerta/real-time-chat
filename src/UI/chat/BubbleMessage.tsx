import styles from "../../UI/styles/bubble-message.module.css";

type Props = {
  align: "start" | "end";
  text: string;
};

export const BubbleMessage = ({ align, text }: Props) => {
  const containerClassname =
    align === "end" ? styles.flex_container_end : styles.flex_container_start;
  const messageContainerClassname =
    align === "end"
      ? styles.message_container_violet
      : styles.message_container_slate;
  const textClassname = align === "end" ? styles.text_white : styles.text_slate;
  const dateClassname =
    align === "end" ? styles.date_container_white : styles.date_container_slate;

  return (
    <div className={containerClassname}>
      <div className={messageContainerClassname}>
        <p className={textClassname}>{text}</p>
        <p className={dateClassname}>22/04/2023 13:04</p>
      </div>
    </div>
  );
};

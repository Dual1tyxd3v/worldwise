import styles from "./message.module.css";

type MessageProps = {
  message: string;
}

export default function Message({ message }: MessageProps) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}

import Button from "../Button";
import styles from "./TokenButton.module.css";

function TokenButton({ id, value, action, disabled, style, status, children }) {
  return (
    <Button
      id={id}
      value={value}
      action={action}
      disabled={disabled}
      style={style}
      className={`${styles.TokenButton} ${styles[status]}`}
    >
      {children}
    </Button>
  );
}

export default TokenButton;

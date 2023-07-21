import { ReactNode } from 'react';
import styles from './button.module.css'

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type: string;
};

export default function Button({ children, onClick, type }: ButtonProps) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

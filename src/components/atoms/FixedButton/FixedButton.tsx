import { MouseEventHandler } from 'react';
import styles from './FixedButton.module.css';

type Props = {
  handleClick?: MouseEventHandler<HTMLAnchorElement>
}

const FixedButton = ({handleClick}: Props) => {
  return (
    <a
      className={styles.root}
      href="/compare"
      onClick={handleClick}
    >比較</a>
  );
}

export default FixedButton;
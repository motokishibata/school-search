import styles from './FixedButton.module.css';

type Props = {
  onClick?: Function
}

const FixedButton = ({onClick}: Props) => {
  return (
    <a className={styles.root} href="/compare" >比較</a>
  );
}

export default FixedButton;
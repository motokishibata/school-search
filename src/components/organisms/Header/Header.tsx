import styles from './Header.module.css';

type Props = {
  icon: string,
  title: string
}

const Header = ({icon, title}: Props) => {
  return (
    <header className={styles.root}>
      <div className={styles.logo_container}>
        <a href="/">
          <img src={icon} width={50} height={50} />
        </a>
        <h1 className={styles.title}>{title}</h1>
      </div>
    </header>
  );
}

export default Header;
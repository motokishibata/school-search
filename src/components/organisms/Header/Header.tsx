import Image from 'next/image';
import styles from './Header.module.css';

type Props = {
	icon: StaticImageData,
	title: string
}

const Header = ({icon, title}: Props) => {
	return (
		<header className={styles.root}>
			<div className={styles.logo_container}>
				<Image src={icon} width={50} height={50} />
				<h1 className={styles.title}>{title}</h1>
			</div>
		</header>
	);
}

export default Header;
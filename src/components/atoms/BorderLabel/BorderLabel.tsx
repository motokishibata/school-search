import styles from './BorderLabel.module.css';

type Props = {
	text: string
};

const BorderLabel = ({text}: Props) => {
	return (
		<div className={styles.root}>
			<label>{text}</label>
		</div>
	);
}

export default BorderLabel;
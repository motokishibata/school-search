import styles from './BorderLabel.module.css';

type Props = {
	text: string
	addCss?: string
};

const BorderLabel = ({text, addCss}: Props) => {
	return (
		<div className={`${styles.root} ${addCss}`}>
			<label>{text}</label>
		</div>
	);
}

export default BorderLabel;
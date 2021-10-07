import styles from './LabelCheckbox.module.css';

type Props = {
	name: string
	labelText: string
};

const LabelCheckbox = ({name, labelText}: Props) => {
	return (
		<div className={styles.root}>
			<input type="checkbox" name={name} id={name} />
			<label htmlFor={name}>{labelText}</label>
		</div>
	);
}

export default LabelCheckbox;
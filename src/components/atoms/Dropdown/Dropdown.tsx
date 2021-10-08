import styles from './Dropdown.module.css';

type Props = {
  id?: string,
  name: string,
  options: string[][]
};

const Dropdown = ({id, name, options}: Props) => {
  return (
    <select className={styles.root} name={name} id={id}>
      {options.map(op => <option value={op[0]}>{op[1]}</option>)}
    </select>
  );
}

export default Dropdown;
import styles from './Checkbox.module.css';

type Props = {
  id:string,
  name:string,
  text?:string
};

const Checkbox = ({id, name, text}: Props) => {
  return (
    <div className={styles.root}>
      <input type="checkbox" name={name} id={id}/>
      <label htmlFor={id}>{text}</label>
    </div>
    
  );
}

export default Checkbox;
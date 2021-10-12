import { ChangeEventHandler } from 'react';
import styles from './Checkbox.module.css';

type Props = {
  id:string,
  name:string,
  text?:string,
  handleChange?: ChangeEventHandler<HTMLInputElement>
};

const Checkbox = ({id, name, text, handleChange}: Props) => {
  return (
    <div className={styles.root}>
      <input type="checkbox" name={name} id={id} onChange={handleChange}/>
      <label htmlFor={id}>{text}</label>
    </div>
    
  );
}

export default Checkbox;
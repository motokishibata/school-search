import Image from 'next/image';
import { School } from '../../../repositories/schoolList';
import BorderLabel from '../../atoms/BorderLabel';
import styles from './SchoolCard.module.css';

type Props = {
  school: School
};

const SchoolCard = ({school}: Props) => {
  const labels = school.skills.map(skill => {
    return <BorderLabel text={skill} />;
  });
  return (
    <div className={styles.root}>
      <h3>{school.name}</h3>
      <hr />
      <div className={styles.flexContainer}>
        <div className={styles.thumbnail}>
          <Image src={school.thumbnail}/>
        </div>
        <div>
          {labels}
          <p>{school.summary}</p>
          <a href={school.url.detail} target="_blank"><button>詳細</button></a>
          <a href={school.url.official} target="_blank"><button>公式</button></a>
        </div>
      </div>
    </div>
  );
}

export default SchoolCard;
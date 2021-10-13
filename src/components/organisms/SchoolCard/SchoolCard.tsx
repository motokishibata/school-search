import { ChangeEventHandler } from 'react';
import { School } from '../../../repositories/schoolList';
import BorderLabel from '../../atoms/BorderLabel';
import Checkbox from '../../atoms/Checkbox';
import styles from './SchoolCard.module.css';

type Props = {
  schoolKey: string,
  school: School,
  handleChange: ChangeEventHandler<HTMLInputElement>
};

const SchoolCard = ({schoolKey, school, handleChange}: Props) => {
  const labels = school.skills.map(skill => {
    return <BorderLabel text={skill} addCss={styles.skill} />;
  });
  return (
    <div className={styles.root}>
      <div className={styles.flexContainer}>
        <div className={styles.checkbox}>
          <Checkbox id={schoolKey} name={schoolKey} handleChange={handleChange}/>
        </div>
        <h3 className={styles.schoolName}>{school.name}</h3>
      </div>
      <div className={styles.flexContainer}>
        <div className={styles.thumbnail}>
          <img src="/150x150.png" width={150} height={150}/>
        </div>
        <div>
          <LearnStyle
            isOnline={school.learnStyle.includes("オンライン")}
            isOffline={school.learnStyle.includes("通学")}
          />
          {labels}
          <p>{school.summary}</p>
          <HorizontalButtons detail={school.url.detail} official={school.url.official} />
        </div>
      </div>
    </div>
  );
}

type LearnStyleProps = {
  isOnline: boolean
  isOffline: boolean
}

const LearnStyle = ({isOnline, isOffline}: LearnStyleProps) => {
  return (
    <div className={styles.flexContainer}>
      {isOnline && <p className={styles.learnStyle}>オンライン</p>}
      {isOffline && <p className={styles.learnStyle}>通学</p>}
    </div>
  );
}

type HorizontalButtonsProps = {
  detail: string
  official: string
};

const HorizontalButtons = (url : HorizontalButtonsProps) => {
  return (
    <div>
        <a className={styles.linkButton} href={url.detail}>詳細</a>
        <a className={styles.linkButton} href={url.official} target="_blank">公式</a>
    </div>
  );
}

export default SchoolCard;
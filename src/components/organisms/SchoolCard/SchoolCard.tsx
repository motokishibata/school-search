import React, { ChangeEventHandler } from 'react';
import { School } from '../../../repositories/schoolList';
import BorderLabel from '../../atoms/BorderLabel';
import Checkbox from '../../atoms/Checkbox';
import SchoolCardHeader from '../SchoolCardHeader';
import styles from './SchoolCard.module.css';

type Props = {
  schoolKey: string,
  school: School,
  handleChange: ChangeEventHandler<HTMLInputElement>
};

const SKILL_MAXCOUNT = 15;
const SchoolCard = ({schoolKey, school, handleChange}: Props) => {
  const allSkills = school.courses.flatMap(c => c.skills);
  let skills = allSkills.filter((x, i, self) => {
    return self.indexOf(x) === i;
  });

  if (skills.length > SKILL_MAXCOUNT) {
    skills = skills.slice(0, SKILL_MAXCOUNT);
  }

  const labels = skills.map(skill => {
    return <BorderLabel text={skill} addCss={styles.skill} />;
  });
  return (
    <div className={styles.root}>
      <div className={styles.flexContainer}>
        <SchoolCardHeader id={schoolKey}
          title={school.name}
          handleChange={handleChange}
          checked={false}
        />
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.thumbnail}>
          <img src={school.thumbnail} width={150} height={150}/>
        </div>
        <div>
          <LearnStyle
            isOnline={school.learnStyle.includes("オンライン")}
            isOffline={school.learnStyle.includes("通学")}
          />
          {labels}
          {allSkills.length > 10 &&
            <label className={styles.moreLabel}>...</label>
          }
          <p>{wordBreak(school.summary)}</p>
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
    <div>
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

function wordBreak(word: string): JSX.Element {
  const texts = word.split(/(\n)/).map((item, index) => {
    return (
      <React.Fragment key={index}>
        { item.match(/\n/) ? <br /> : item }
      </React.Fragment>
    );
  });
  return <>{texts}</>;
}

export default SchoolCard;
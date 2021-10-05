import { useRouter } from 'next/router';
import styles from './Search.module.css';

const Search = () => {
  const router = useRouter();

  const clickSearchButton = () => {
    router.push({
      pathname: "/",
      query: {
        language: "Python"
      }
    });
  }

  return (
    <div className={styles.root}>
      <p>検索</p>
      <div className={styles.flexContainer}>
        <div className={styles.flexItem}>
          <label htmlFor="">言語</label>
          <select>
            <option value="HTML/CSS">HTML/CSS</option>
            <option value="Ruby">Ruby</option>
            <option value="Ruby on Rails">Ruby on Rails</option>
          </select>
        </div>
        <p className={styles.flexItem}>価格</p>
        <p className={styles.flexItem}>期間</p>
        <p className={styles.flexItem}>スキル</p>
        <p className={styles.flexItem}>場所</p>
        <p className={styles.flexItem}>対象</p>
      </div>
      <div className={styles.flexContainer}>
        <div className={styles.flexCheckbox}>
          <input type="checkbox" name="free" id="free" />
          <label htmlFor="free">無料体験・説明会あり</label>
        </div>
        <div className={styles.flexCheckbox}>
          <input type="checkbox" name="jobchange" id="jobchange" />
          <label htmlFor="jobchange">就職・転職に強い</label>
        </div>
        <div className={styles.flexCheckbox}>
          <input type="checkbox" name="mantoman" id="mantoman" />
          <label htmlFor="mantoman">マンツーマンあり</label>
        </div>
        <div className={styles.flexCheckbox}>
          <input type="checkbox" name="training" id="training" />
          <label htmlFor="training">企業研修に使える</label>
        </div>
        <div className={styles.flexCheckbox}>
          <input type="checkbox" name="campaign" id="campaign" />
          <label htmlFor="campaign">キャンペーンあり</label>
        </div>
      </div>
      <button onClick={clickSearchButton}>検索</button>
    </div>
  );
}

export default Search;
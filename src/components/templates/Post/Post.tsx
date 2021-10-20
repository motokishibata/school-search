import Head from 'next/head';

import SchoolInfo from '../../organisms/SchoolInfo';
import styles from './Post.module.css';

const Post = ({ postData }) => {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article className={styles.root}>
        <h1 className={styles.title}>{postData.title}</h1>
        <SchoolInfo school={postData.school} />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </>
  );
}

export default Post;
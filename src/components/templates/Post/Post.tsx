import Head from 'next/head';
import styles from './Post.module.css';

const Post = ({ postData }) => {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article className={styles.root}>
        <h1 className={styles.title}>{postData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </>
  );
}

export default Post;
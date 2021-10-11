import { getPostData, getAllPostIds } from '../../lib/posts';
import { default as Template } from '../../components/templates/Post';

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData
    }
  };
}

export function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  };
}

const Post = ({ postData }) => {
  return (
    <>
      <Template postData={postData}/>
    </>
  )
};

export default Post;
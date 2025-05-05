import React, { Suspense } from 'react'
import getPost from '../../../lib/getPost';
import getPostComments from '../../../lib/getPostComment';
import Comments from '../../component/comments';

export async function generateMetadata({ params }) {
    const { id } = params;
    const post = await getPost(id);

    return {
        title: post.title,
        description: post.body,
    }
}



export default async function PostPage({ params }) {
    const { id } = params;
    const postPromise = getPost(id);
    const commentPromise = getPostComments(id);

    //const [post, comments] = await Promise.all([postPromise, commentPromise]);

    const post = await postPromise;
    return (
        <div className='mt-6'>
            <h2>{post.title}</h2>
            <p>
                {post.body}
            </p>
            <hr></hr>
            <Suspense fallback={<h1>Loading comments ...</h1>}>
                <Comments promise={commentPromise} />
            </Suspense>
        </div>
    )
}

import React, { Suspense } from 'react';
import getPost from '../../../lib/getPost';
import getPostComments from '../../../lib/getPostComment';
import Comments from '../../component/comments';
import getAllPosts from '../../../lib/getAllPosts';

// ✅ Fixing async params for metadata
export async function generateMetadata({ params }) {
    const { id } = await params;
    const post = await getPost(id);

    return {
        title: post.title,
        description: post.body,
    };
}

// ✅ Fixing async params for page
export default async function PostPage({ params }) {
    const { id } = await params;

    const postPromise = getPost(id);
    const commentPromise = getPostComments(id);

    const post = await postPromise;

    return (
        <div className="mt-6">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <hr />
            <Suspense fallback={<h1>Loading comments ...</h1>}>
                <Comments promise={commentPromise} />
            </Suspense>
        </div>
    );
}

// ✅ Static site generation for all post routes
export async function generateStaticParams() {
    const posts = await getAllPosts();

    return posts.map((post) => ({
        id: post.id.toString(),
    }));
}

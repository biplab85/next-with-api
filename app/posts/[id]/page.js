import React from 'react'
import getPost from '../../../lib/getPost';

export default async function PostPage({ params }) {
    const { id } = params;
    const post = await getPost(id);
    return (
        <div className='mt-6'>
            <h2>{post.title}</h2>
            <p>
                {post.body}
            </p>
        </div>
    )
}

import React from 'react'
import getAllPosts from '../../lib/getAllPosts'
import Link from 'next/link';

export default async function Posts() {

    const posts = await getAllPosts();

    //console.log(posts);

    return (
        <div>
            <h2>All post</h2>
            <div className='mt-6'>
                <ul className='list-disc'>
                    {posts.map(post =>
                        <li key={post.id}>
                            <Link href={`/posts/${post.id}`}>
                                {post.title}
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

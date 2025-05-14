import React from 'react'
import getAlbums from '../../lib/getAlbums';
import Link from 'next/link';

export default async function AlbumsPage() {
    const albums = await getAlbums();
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Album List</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 list-none">
                {albums.map((album) => (
                    <li
                        key={album.id}
                        className="w-full rounded-md shadow-md p-5 bg-[#efefef]"
                    >
                        <Link href={`/album/${album.id}`}>
                            {album.id}
                            <br />
                            {album.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

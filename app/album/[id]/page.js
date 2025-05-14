import React from 'react';
import getPhotosByAlbum from '../../../lib/getPhotosByAlbum';

export default async function AlbumPhotosPage({ params }) {
    const photos = await getPhotosByAlbum(params.id);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Photos in Album #{params.id}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {photos.map((photo) => (
                    <div key={photo.id} className="border p-2 rounded shadow-sm">
                        <img src={photo.thumbnailUrl} alt={photo.title} className="mb-2 rounded" />
                        <p className="text-sm">{photo.title}</p>
                        {photo.id}
                    </div>
                ))}
            </div>
        </div>
    );
}

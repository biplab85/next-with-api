export default async function getPhotosByAlbum(albumId) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
    if (!res.ok) throw new Error('Failed to fetch photos');
    return res.json();
}

export default async function getAlbums() {
    const res = await fetch('https://jsonplaceholder.typicode.com/albums');
    if (!res.ok) throw new Error('Failed to fetch albums');
    return res.json();
}

import React from 'react';

interface Props {
    params: { id: string };
}

const UserDetailPage = async (props: Props) => {
    const { id } = props.params; // ✅ Destructure inside the function

    try {
        const res = await fetch(`https://dummyjson.com/users/${id}`);

        if (!res.ok) {
            throw new Error('User not found');
        }

        const user = await res.json();

        return (
            <div>
                <h1>User Details</h1>
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
        );
    } catch (error) {
        return <div>Error: User not found.</div>;
    }
};

export default UserDetailPage;

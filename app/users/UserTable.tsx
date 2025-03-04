import React from 'react'

interface User {
    id: number;
    username: string;
    email: string;
}

const UserTable = async () => {
    const res = await fetch('https://dummyjson.com/users');
    const data = await res.json(); // Extract the response data
    const users: User[] = data.users; // Extract the `users` array
    return (

        <table className='table-auto'>
            <thead>
                <tr>
                    <th className='bg-[#efefef]'>Name</th>
                    <th className='bg-[#efefef]'>Email</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                </tr>)}
            </tbody>
        </table>
    )
}

export default UserTable
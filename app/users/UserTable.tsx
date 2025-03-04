import Link from 'next/link';
import React from 'react';
import { sort } from 'fast-sort';

interface User {
    id: number;
    username: string;
    email: string;
}

interface Props {
    sortOrder: string;
}

const UserTable = async ({ sortOrder }: Props) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users: User[] = await res.json();

    const sortedUsers = sort(users).asc(
        sortOrder === 'email' ? user => user.email : user => user.username
    );

    return (
        <div className="max-w-4xl mx-auto my-6 p-4 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">User List</h2>
            <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        <th className="p-3 text-left">
                            <Link
                                href="/users/?sortOrder=username"
                                className="text-blue-600 hover:text-blue-800 transition"
                            >
                                Name
                            </Link>
                        </th>
                        <th className="p-3 text-left">
                            <Link
                                href="/users/?sortOrder=email"
                                className="text-blue-600 hover:text-blue-800 transition"
                            >
                                Email
                            </Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map((user, index) => (
                        <tr
                            key={user.id}
                            className={`border-t border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition`}
                        >
                            <td className="p-3 text-gray-700">{user.username}</td>
                            <td className="p-3 text-gray-600">{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;

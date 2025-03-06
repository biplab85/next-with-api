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
        <table className="border-solid mt-4 w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
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
    );
};

export default UserTable;

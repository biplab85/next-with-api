"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { sort } from 'fast-sort';

interface User {
    id: number;
    username: string;
    email: string;
    phone: string;
}

interface Props {
    sortOrder: string;
}

const UserTable = ({ sortOrder }: Props) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [nameFilter, setNameFilter] = useState('');
    const [emailFilter, setEmailFilter] = useState('');
    const [phoneFilter, setPhoneFilter] = useState('');

    React.useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/users');
            const data: User[] = await res.json();
            setUsers(data);
            setLoading(false); // Stop loading
        };
        fetchUsers();
    }, []);

    const sortedUsers = sort(users).asc(
        sortOrder === 'email' ? user => user.email
            : sortOrder === 'phone' ? user => user.phone
                : user => user.username
    );


    const filteredUsers = sortedUsers.filter(user =>
        user.username.toLowerCase().includes(nameFilter.toLowerCase()) &&
        user.email.toLowerCase().includes(emailFilter.toLowerCase()) &&
        user.phone.toLowerCase().includes(phoneFilter.toLowerCase())
    );

    const clearFilters = () => {
        setNameFilter('');
        setEmailFilter('');
        setPhoneFilter('');
    }

    return (
        <div>
            <div className="flex space-x-2 mb-4 p-4 bg-[#e5e7eb]">
                <input
                    type="text"
                    placeholder="Filter by name..."
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                    type="text"
                    placeholder="Filter by email..."
                    value={emailFilter}
                    onChange={(e) => setEmailFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                    type="text"
                    placeholder="Filter by phone..."
                    value={phoneFilter}
                    onChange={(e) => setPhoneFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <button
                    onClick={clearFilters}
                    className="whitespace-nowrap px-4 py-2 bg-[#2563eb] text-white rounded-md hover:bg-[#4879e5] transition"
                >
                    Clear
                </button>
            </div>
            
            {loading ? (
                //Loader
                <p className="text-center text-gray-500">User loading...</p>
            ) : filteredUsers.length === 0 ? (
                <p className="text-center text-gray-500">No user found</p>
            ) : (
                <table className="border-solid mt-4 w-full text-[14px] border-collapse border border-gray-300 rounded-lg overflow-hidden">
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
                            <th className="p-3 text-left">
                                <Link
                                    href="/users/?sortOrder=phone"
                                    className="text-blue-600 hover:text-blue-800 transition"
                                >
                                    Phone
                                </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr
                                key={user.id}
                                className={`border-t border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition`}
                            >
                                <td className="p-3 text-gray-700">{user.username}</td>
                                <td className="p-3 text-gray-600">{user.email}</td>
                                <td className="p-3 text-gray-600">{user.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )

            }
        </div>
    );
};

export default UserTable;
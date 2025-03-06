import React, { Suspense } from 'react';
import Link from 'next/link';
import UserTable from './UserTable';
import UserLoading from '../component/keleton/userLoading';

interface Props {
    searchParams: { sortOrder?: string }; // ✅ Made sortOrder optional
}

const UsersPage = async ({ searchParams }: Props) => {
    const params = await searchParams; // ✅ Await the entire object
    const sortOrder = params.sortOrder || 'username'; // ✅ Provide a default value
    //console.log(sortOrder);
    return (
        <>
            <div className="max-w-4xl mx-auto  bg-white shadow-lg rounded-xl">
                <div className='my-6 p-4 flex items-center justify-between'>
                    <h2 className="m-0 text-2xl font-semibold text-gray-700 text-center">User List</h2>
                    <Link className="text-blue-600 hover:text-blue-800 transition" href="/users/new">New user</Link>
                </div>
                <Suspense fallback={
                    <UserLoading />
                }>
                    <UserTable sortOrder={sortOrder} />
                </Suspense>

            </div>
        </>
    );
};

export default UsersPage;

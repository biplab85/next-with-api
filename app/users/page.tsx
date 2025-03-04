import React from 'react';
import UserTable from './UserTable';

interface Props {
    searchParams: { sortOrder?: string }; // ✅ Made sortOrder optional
}

const UsersPage = async ({ searchParams }: Props) => {
    const params = await searchParams; // ✅ Await the entire object
    const sortOrder = params.sortOrder || 'username'; // ✅ Provide a default value
    //console.log(sortOrder);
    return (
        <>
            <UserTable sortOrder={sortOrder} />
        </>
    );
};

export default UsersPage;

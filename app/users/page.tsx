import React from 'react'
import UserList from './userList'

interface Props {
    searchParams: { sortOrder: string }
}

const UsersPage = async ({ searchParams: { sortOrder } }: Props) => {
    //console.log(sortOrder);
    return (
        <UserList sortOrder={sortOrder} />
    )
}

export default UsersPage
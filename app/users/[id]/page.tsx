import React from 'react';

interface Props {
    params: { id: string };
}

const UserDetailPage = async (params: { id }: Props) => {



    return (
        <div>
            User Details page {id}
        </div>
    );
};

export default UserDetailPage;

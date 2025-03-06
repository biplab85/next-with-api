import { notFound } from 'next/navigation';
import React from 'react';

interface Props {
    params: { id: number };
}

const UserDetailPage = async ({ params }: Props) => {
    const { id } = await params; // ✅ Await params before using
    if (id > 10) notFound();
    return (
        <div>
            User Details page {id}
        </div>
    );
};

export default UserDetailPage;

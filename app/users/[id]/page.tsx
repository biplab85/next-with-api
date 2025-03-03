"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Address {
    address: string;
    city: string;
    state: string;
    country: string;
}

interface User {
    id: number;
    firstName: string;
    lastName: string;
    address: Address;
}

const UserPage = () => {
    const { id } = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;

        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/users/${id}`);
                if (!res.ok) throw new Error("User not found");

                const data = await res.json();
                setUser(data);
            } catch (err) {
                setError("Failed to load user details.");
            }
        };

        fetchUser();
    }, [id]);

    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h2>{user.firstName} {user.lastName}</h2>
            <p>City: {user.address?.city}</p>
            <p>State: {user.address?.state}</p>
            <p>Country: {user.address?.country}</p>
        </div>
    );
};

export default UserPage;

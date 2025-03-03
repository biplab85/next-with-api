"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import UserFilter from "../component/userFilter";
import { sort } from "fast-sort";

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
    email: string;
    image: string;
    address: Address;
}

interface Props {
    sortOrder: string;
}

const UsersPage = ({ sortOrder }: Props) => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [searchName, setSearchName] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [totalUsers, setTotalUsers] = useState(0);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const limit = 30;

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError("");

            try {
                const res = await fetch(
                    `/api/users?limit=${limit}&skip=${page * limit}`,
                    { next: { revalidate: 10 } }
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch users");
                }

                const data = await res.json();
                setUsers(data.users || []);
                setTotalUsers(data.total || 0);
            } catch (err) {
                setError("Failed to load users.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [page]);

    // Extract unique cities & states for dropdowns
    const cities = Array.from(new Set(users.map((user) => user.address.city))).sort();
    const states = Array.from(new Set(users.map((user) => user.address.state))).sort();

    // Filtering & Sorting logic
    useEffect(() => {
        let filtered = users;

        if (searchName.trim() !== "") {
            const lowercasedSearch = searchName.toLowerCase();
            filtered = filtered.filter(
                (user) =>
                    user.firstName.toLowerCase().includes(lowercasedSearch) ||
                    user.lastName.toLowerCase().includes(lowercasedSearch)
            );
        }

        if (selectedCity) {
            filtered = filtered.filter((user) => user.address.city === selectedCity);
        }

        if (selectedState) {
            filtered = filtered.filter((user) => user.address.state === selectedState);
        }

        // Apply sorting
        const sortedUsers = sort(filtered).asc((user) => {
            if (sortOrder === "email") {
                return user.email.toLowerCase();
            }
            return `${user.firstName} ${user.lastName}`.toLowerCase();
        });

        setFilteredUsers(sortedUsers);
    }, [searchName, selectedCity, selectedState, users, sortOrder]);

    // Reset filters
    const resetFilters = () => {
        setSearchName("");
        setSelectedCity("");
        setSelectedState("");
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="w-full">
            {/* User Filter Component */}
            <UserFilter
                searchName={searchName}
                setSearchName={setSearchName}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                selectedState={selectedState}
                setSelectedState={setSelectedState}
                cities={cities}
                states={states}
                resetFilters={resetFilters}
            />

            {/* Sorting Links */}
            <div className="flex items-center justify-center">
                <Link className="p-2" href="/users?sortOrder=name">User Name</Link>
                <Link className="p-2" href="/users?sortOrder=email">User Email</Link>
            </div>

            {/* If No Users Found */}
            {filteredUsers.length === 0 ? (
                <p className="text-center text-red-500 mt-5">No users found.</p>
            ) : (
                <>
                    {/* User List Header */}
                    <div className="container m-auto flex items-center justify-between bg-gray-200 rounded-md p-4 mt-4">
                        <h2>User List</h2>
                        <h3>Total Users: {filteredUsers.length}</h3>
                    </div>

                    {/* User List */}
                    <ul className="container m-auto grid grid-cols-3 gap-4 pt-5">
                        {filteredUsers.map((user, index) => (
                            <li className="p-4 bg-gray-200 rounded-md gap-4" key={user.id}>
                                <Link className="flex items-center justify-start" href={`/users/${user.id}`}>
                                    {page * limit + index + 1}.
                                    <img
                                        className="border border-indigo-600 mr-2"
                                        src={user.image}
                                        alt={`${user.firstName} ${user.lastName}`}
                                        width={50}
                                        height={50}
                                        style={{ borderRadius: "50%" }}
                                    />
                                    {user.firstName} {user.lastName} - {user.address?.city}, {user.address?.state}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Pagination */}
                    {filteredUsers.length >= limit && (
                        <div className="m-10 flex items-center justify-center">
                            <button
                                type="button"
                                className="w-[200px] m-5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 disabled:opacity-50"
                                onClick={() => setPage(page - 1)}
                                disabled={page === 0}
                            >
                                Previous
                            </button>
                            <button
                                className="w-[200px] m-5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 disabled:opacity-50"
                                onClick={() => setPage(page + 1)}
                                disabled={(page + 1) * limit >= totalUsers}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default UsersPage;

"use client";

import React from "react";

interface UserFilterProps {
    searchName: string;
    setSearchName: (name: string) => void;
    selectedCity: string;
    setSelectedCity: (city: string) => void;
    selectedState: string;
    setSelectedState: (state: string) => void;
    cities: string[];
    states: string[];
    resetFilters: () => void;
}

const UserFilter: React.FC<UserFilterProps> = ({
    searchName,
    setSearchName,
    selectedCity,
    setSelectedCity,
    selectedState,
    setSelectedState,
    cities,
    states,
    resetFilters
}) => {
    return (
        <div className="container m-auto flex flex-wrap justify-center gap-4 bg-gray-200 p-4 rounded-md">
            {/* Name Search */}
            <input
                type="text"
                placeholder="Search by name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="p-2 border border-gray-400 rounded-md"
            />

            {/* City Dropdown */}
            <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="p-2 border border-gray-400 rounded-md"
            >
                <option value="">Select City</option>
                {cities.map((city) => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                ))}
            </select>

            {/* State Dropdown */}
            <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="p-2 border border-gray-400 rounded-md"
            >
                <option value="">Select State</option>
                {states.map((state) => (
                    <option key={state} value={state}>
                        {state}
                    </option>
                ))}
            </select>

            {/* Reset Button */}
            <button
                onClick={resetFilters}
                className="w-[200px] rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 disabled:opacity-50"
            >
                Reset
            </button>
        </div>
    );
};

export default UserFilter;

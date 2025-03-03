import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://dummyjson.com/users";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get("limit") || "30";
        const skip = searchParams.get("skip") || "0";

        console.log(`Fetching users: ${BASE_URL}?limit=${limit}&skip=${skip}`);

        const res = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);

        if (!res.ok) {
            console.error("Failed to fetch users:", res.status, await res.text());
            return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

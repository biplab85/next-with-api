import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://dummyjson.com/users";

export async function GET(
    request: NextRequest,
    context: { params: { id?: string } }
) {
    try {
        console.log("Received Params:", context.params); // ✅ Debugging step

        if (!context.params || !context.params.id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const userId = context.params.id;
        console.log("Fetching user with ID:", userId);

        const res = await fetch(`${BASE_URL}/${userId}`);

        if (!res.ok) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}

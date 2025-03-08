// Fetch data from db
// If not found, return 404 error
// Else return data

import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export function GET(
    request: NextRequest,
    { params }: { params: { id: number } }) {
    if (params.id > 10)
        return NextResponse.json({ error: 'User not found' }, { status: 404 })

    return NextResponse.json({ id: 1, name: 'mosh' })
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: number } }) {
    // Validate the request body
    // If invalid, return 400
    const body = await request.json();
    if (!body.name)
        return NextResponse.json({ error: ' Name is require' }, { status: 400 })

    // Fetch the user with the given id
    // If does not exit, return 404
    if (params.id > 10)
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
    // Update the user
    // Return the update user

    return NextResponse.json({ id: 1, name: body.name })
}

export function DELETE(
    request: NextResponse,
    { params }: { params: { id: number } }) {
    // Fetch user from db
    // If not found, return 404
    if (params.id > 10)
        return NextResponse.json({ error: 'User not found' }, { status: 404 })

    // Delete user
    // Return 200
    return NextResponse.json({})
}
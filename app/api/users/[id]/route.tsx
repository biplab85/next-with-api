// Fetch data from db
// If not found, return 404 error
// Else return data

import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    const users = await prisma.user.findUnique({
        where: { id: parseInt(params.id) }
    })
    if (!users)
        return NextResponse.json({ error: 'User not found' }, { status: 404 })

    return NextResponse.json({ users })
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    // Validate the request body
    // If invalid, return 400
    const body = await request.json();
    if (!body.name)
        return NextResponse.json({ error: ' Name is require' }, { status: 400 });

    // Fetch the user with the given id
    // If does not exit, return 404

    const user = await prisma.user.findUnique({
        where: { id: parseInt(params.id) }
    })


    if (!user)
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    // Update the user
    // Return the update user

    const updateUser = await prisma.user.update({
        where: { id: user.id },
        data: {
            name: body.name,
            email: body.email,
        }
    })

    return NextResponse.json({ updateUser })
}

export async function DELETE(
    request: NextResponse,
    { params }: { params: { id: string } }) {

    const user = await prisma.user.findUnique({
        where: { id: parseInt(params.id) }
    })
    // Fetch user from db
    // If not found, return 404
    if (!user)
        return NextResponse.json({ error: 'User not found' }, { status: 404 })

    // Delete user
    // Return 200
    await prisma.user.delete({
        where: { id: user.id },
    })

    return NextResponse.json({})
}
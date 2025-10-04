import { NextRequest, NextResponse } from 'next/server';

// Mock user data - replace with your database
const users = [
    {
        id: '1',
        email: 'zeensr@live.com',
        password: 'newKnowno.456!', // In real app, this should be hashed
        name: 'Admin User',
        role: 'admin'
    },
    {
        id: '2',
        email: 'user@example.com',
        password: 'password123',
        name: 'Regular User',
        role: 'user'
    }
];

export async function POST(request: NextRequest) {
    try {
        const { email, password, action } = await request.json();

        if (action === 'login') {
            // Find user
            const user = users.find(u => u.email === email && u.password === password);

            if (!user) {
                return NextResponse.json(
                    { error: 'Invalid credentials' },
                    { status: 401 }
                );
            }

            // In a real app, you'd create a JWT token here
            const { password: _, ...userWithoutPassword } = user;

            return NextResponse.json({
                user: userWithoutPassword,
                token: 'mock-jwt-token'
            });
        }

        if (action === 'register') {
            // Check if user already exists
            const existingUser = users.find(u => u.email === email);

            if (existingUser) {
                return NextResponse.json(
                    { error: 'User already exists' },
                    { status: 400 }
                );
            }

            // Create new user
            const newUser = {
                id: String(users.length + 1),
                email,
                password, // In real app, hash this
                name: email.split('@')[0],
                role: 'user' as const
            };

            users.push(newUser);

            const { password: _, ...userWithoutPassword } = newUser;

            return NextResponse.json({
                user: userWithoutPassword,
                token: 'mock-jwt-token'
            });
        }

        return NextResponse.json(
            { error: 'Invalid action' },
            { status: 400 }
        );

    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    // Mock getting current user - in real app, verify JWT token
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        );
    }

    // Mock user data - in real app, decode JWT and get user from database
    const mockUser = {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin'
    };

    return NextResponse.json({ user: mockUser });
}
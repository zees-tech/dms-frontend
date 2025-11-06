import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: 'No token provided' },
                { status: 401 }
            );
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        // Validate token with your backend
        const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;

        if (!backendUrl) {
            console.error('Backend URL not configured');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        try {
            // Call your backend to validate the token and get user info
            const response = await fetch(`${backendUrl}/api/Auth/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                return NextResponse.json(
                    { error: 'Invalid or expired token' },
                    { status: 401 }
                );
            }

            const userData = await response.json();

            return NextResponse.json(
                { user: userData.user || userData },
                { status: 200 }
            );

        } catch (error) {
            console.error('Backend validation error:', error);
            return NextResponse.json(
                { error: 'Token validation failed' },
                { status: 401 }
            );
        }

    } catch (error) {
        console.error('Auth validation error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { action } = body;

        if (action === 'register') {
            const { email, password, name, departmentId, roleId } = body;

            const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;

            if (!backendUrl) {
                return NextResponse.json(
                    { error: 'Server configuration error' },
                    { status: 500 }
                );
            }

            try {
                // Call your backend registration endpoint
                const response = await fetch(`${backendUrl}/api/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        name,
                        departmentId,
                        roleId
                    })
                });

                if (!response.ok) {
                    const error = await response.json();
                    return NextResponse.json(
                        { error: error.message || 'Registration failed' },
                        { status: response.status }
                    );
                }

                const data = await response.json();

                return NextResponse.json(data, { status: 201 });

            } catch (error) {
                console.error('Registration error:', error);
                return NextResponse.json(
                    { error: 'Registration failed' },
                    { status: 500 }
                );
            }
        }

        return NextResponse.json(
            { error: 'Invalid action' },
            { status: 400 }
        );

    } catch (error) {
        console.error('Auth POST error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
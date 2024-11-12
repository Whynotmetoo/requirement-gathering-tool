// pages/login.js
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";

import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';


import { get } from '@/lib/axios';
import { useGlobalState } from '@/lib/userContext';
import { USER_TYPE } from '@/constants/USER_TYPE'

const LoginPage = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useGlobalState()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
        const response = await get<{role: USER_TYPE}>(`/reqlicit/api/v1/user/${username}`, {
            auth: {
                username: 'mfernando',
                password: 'password1'
            },
        });
        if (response && response.role) {
            setUser({name: username, type: response.role ,password});
            if(response.role === USER_TYPE.MEDICAL_PRACTITIONER) router.push('/reqlicit');
            if(response.role === USER_TYPE.ADMIN) router.push('/reqlicit/user');
            if(response.role === USER_TYPE.PATIENT) router.push('/reqlicit/review');
        } else {
            toast.error('Login failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-96">
                <CardContent className="p-8">
                    <h1 className="text-2xl font-bold mb-6 text-center">Login into Reqlicit</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Label htmlFor="username" className="block text-sm font-medium text-gray-700">Email:</Label>
                            <Input type="username" id="username" name="username" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</Label>
                            <Input type="password" id="password" name="password" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <Button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Login</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginPage;
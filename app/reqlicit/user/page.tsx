"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { USER_TYPE } from '@/constants/USER_TYPE';
import { post, get } from '@/lib/axios'
import { useGlobalState } from '@/lib/userContext'

interface User {
    username: string;
    password: string
    email: string;
    role: USER_TYPE;
}

const UserManagementPage = () => {
    const [users, setUsers] = useState<(User & {id: number})[]>();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState(USER_TYPE.PATIENT);
    const { user } = useGlobalState();

    const fetchUserData = async () => {
        const response = await get<(User & {id: number})[]>(`/reqlicit/api/v1/user`, {
            auth: {
                username: user?.name,
                password: user?.password
            },
        });
        if(response) setUsers(response)
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleAddUser = async () => {
        if (!name || !password) {
            toast.error("Name and password are required");
            return;
        }

        const newUser: User = {
            username: name,
            email,
            password,
            role: userType,
        };
        const response = await post('/reqlicit/api/v1/user', newUser, {
            auth: {
                username: user?.name,
                password: user?.password
            }
        })
        if (response) {
            fetchUserData();
            toast.success("User added successfully");
        }
        setName('');
        setEmail('');
        setPassword('');
        setUserType(USER_TYPE.PATIENT);
    };

    const handleDeleteUser = (id: number) => {
        setUsers(users?.filter(user => user.id !== id));
        toast.success("User deleted successfully");
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Left Sidebar */}
                <div className="md:col-span-2">
                    {/* ... existing code ... */}
                </div>

                {/* Main Form */}
                <div className="md:col-span-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>User Management</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter user name"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter user password"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter user email"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="userType">User Type</Label>
                                    <Select value={userType} onValueChange={(value) => setUserType(value as USER_TYPE)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select user type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={USER_TYPE.ADMIN}>Administrator</SelectItem>
                                            <SelectItem value={USER_TYPE.PATIENT}>Patient</SelectItem>
                                            <SelectItem value={USER_TYPE.MEDICAL_PRACTITIONER}>Practitioner</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button onClick={handleAddUser} className="w-full text-white">
                                    Add User
                                </Button>
                            </div>
                            <div className="mt-6">
                                <h2 className="text-lg font-semibold">User List</h2>
                                <table className="min-w-full mt-4 border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border border-gray-300 p-2 text-center">Name</th>
                                            <th className="border border-gray-300 p-2 text-center">Email</th>
                                            <th className="border border-gray-300 p-2 text-center">User Type</th>
                                            <th className="border border-gray-300 p-2 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users?.map(user => (
                                            <tr key={user.id} className="hover:bg-gray-50">
                                                <td className="border border-gray-300 p-2 text-center">{user.username}</td>
                                                <td className="border border-gray-300 p-2 text-center">{user.email}</td>
                                                <td className="border border-gray-300 p-2 text-center">{user.role}</td>
                                                <td className="border border-gray-300 p-2 text-center">
                                                    <Button onClick={() => handleDeleteUser(user.id)} variant="destructive">
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Sidebar */}
                <div className="md:col-span-2">
                    {/* ... existing code ... */}
                </div>
            </div>
        </div>
    );
};

export default UserManagementPage;
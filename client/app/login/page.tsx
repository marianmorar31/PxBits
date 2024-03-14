"use client"

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { setUserInfo } from '@/slices/authSlice';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { CustomButton } from '@/components';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/users/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
    
        const dataUser = await response.json();
        dispatch(setUserInfo(dataUser));
        alert("Login Succesfull")
       
        router.push('/');
      } else {
        const data = await response.json();
        setError(data.message || 'An error occurred during login');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-200">
      <div className="bg-white p-8 rounded shadow-md w-96 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border rounded"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="flex justify-between w-full">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Login
            </button>
            <Link href="/register">
              <CustomButton
                title="REGISTER"
                btnType="button"
                containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
              />
            </Link>
          </div>
          {error && (
            <p className="text-red-500 mt-2">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
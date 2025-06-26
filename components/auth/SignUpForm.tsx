'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { SignUpData } from '@/types/auth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function SignUpForm() {
  const [error, setError] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpData>();
  const password = watch('password');

  const signUpMutation = useMutation({
    mutationFn: async (data: SignUpData) => {
      const response = await axios.post('/api/auth/signup', data);
      return response.data;
    },
    onSuccess: () => {
      router.push('/login?message=Account created successfully');
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'An error occurred');
      } else {
        setError('An error occurred');
      }
    },
  });

  const onSubmit = (data: SignUpData) => {
    setError('');
    signUpMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Full Name"
        {...register('name', {
          required: 'Name is required',
          minLength: {
            value: 2,
            message: 'Name must be at least 2 characters',
          },
        })}
        error={errors.name?.message}
      />

      <Input
        label="Email"
        type="email"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Invalid email address',
          },
        })}
        error={errors.email?.message}
      />

      <Input
        label="Password"
        type="password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        })}
        error={errors.password?.message}
      />

      <Input
        label="Confirm Password"
        type="password"
        {...register('confirmPassword', {
          required: 'Please confirm your password',
          validate: (value) => value === password || 'Passwords do not match',
        })}
        error={errors.confirmPassword?.message}
      />

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <Button
        type="submit"
        disabled={signUpMutation.isPending}
        className="w-full"
      >
        {signUpMutation.isPending ? 'Creating account...' : 'Sign Up'}
      </Button>
    </form>
  );
}

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to Next.js Auth App
        </h1>
        
        {session ? (
          <div className="space-y-4">
            <p className="text-xl text-gray-600">
              Hello, {session.user?.name || session.user?.email}!
            </p>
            <Link 
              href="/dashboard"
              className="inline-block btn-primary"
            >
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xl text-gray-600">
              Get started by signing in or creating an account
            </p>
            <div className="space-x-4">
              <Link href="/login" className="btn-primary">
                Sign In
              </Link>
              <Link href="/signup" className="btn-secondary">
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
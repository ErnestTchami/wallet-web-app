"use client";
import React from "react";
import { signIn } from "next-auth/react";

const Authentication = () => {
  const handleOAuthLogin = async (provider: string) => {
    await signIn(provider, { redirect: true, callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="flex w-full max-w-[1000px] rounded-xl overflow-hidden bg-gray-100 border shadow-sm ">
        {/* Left side - Dark Section */}
        <div className="hidden md:flex md:w-1/2 bg-neutral-700 p-8 flex-col justify-center gap-5">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-white rounded flex items-center justify-center">
              <span className="text-slate-900 text-sm font-bold">M</span>
            </div>
            <span className="text-white font-medium">
              Manage Your Money Smarter
            </span>
          </div>
          <div className="space-y-1">
            <blockquote className="text-white text-xs font-medium leading-relaxed">
              Take control of your finances with our wallet application. Track
              expenses, set budgets, and gain insights into your spending—all in
              one secure and user-friendly platform. Log in now to get started!
            </blockquote>
            <p className="text-slate-400">Iradukunda Ernest App</p>
          </div>
          <div className=" text-xs text-gray-400">
            Enjoy the best managements
          </div>
        </div>

        {/* Right side - Auth form */}
        <div className="flex-1 bg-white p-8">
          <div className="w-full max-w-md mx-auto space-y-3">
            <div className="space-y-2 text-center">
              <h1 className="text-1xl font-semibold tracking-tight">
                Login to your account
              </h1>
              <p className="text-xs text-slate-500">
                Welcome back! Please login to your account
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">
                  continue with
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleOAuthLogin("google")}
                className="w-full border border-slate-300 py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>

              {/* GitHub Auth Button */}
              <button
                onClick={() => handleOAuthLogin("github")}
                className="w-full border border-slate-300 py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  />
                </svg>
                Continue with GitHub
              </button>
            </div>

            <p className="text-xs text-center text-slate-500">
              By clicking continue, you agree to our
              <a href="#" className="underline hover:text-slate-900">
                Terms of Service
              </a>
              and
              <a href="#" className="underline hover:text-slate-900">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;

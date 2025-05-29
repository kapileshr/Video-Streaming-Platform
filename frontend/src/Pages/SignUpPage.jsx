import React from "react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex item-center justify-between p-4">
        <Link>
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>
      <div className="flex justify-centre items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl front-bold mb-4">
            Sign Up
          </h1>
          <form className="space-y-4">
            <div>
              <lable htmlFor="email" classname="w-full px-3 py-2">
                Email
              </lable>
              <input
                type="email"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="you@example.com"
                id="email"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

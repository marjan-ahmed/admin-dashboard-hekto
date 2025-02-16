"use client";

import { useState } from "react";
import { useSignIn, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLogin() {
  const { isSignedIn, user } = useUser();
  const { signIn, isLoaded } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Admin credentials (fixed)
  const ADMIN_EMAIL = "marjanahmed.dev@gmail.com";
  const ADMIN_PASSWORD = "admingatepass";

  // Redirect already signed-in admin users
  if (isSignedIn && user?.publicMetadata.isAdmin) {
    router.push("/dashboard");
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isLoaded) return;

    // Check if entered credentials match the predefined admin credentials
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      setError("Invalid admin credentials!");
      return;
    }

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        router.push("/dashboard"); // Redirect to admin dashboard
      }
    } catch (err: any) {
      setError(err.errors[0]?.message || "Login failed. Try again.");
    }
  };

  // 🌟 Social Login Handlers
  const handleSocialLogin = async (provider: "oauth_google" | "oauth_facebook") => {
    if (!isLoaded) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/dashboard", // Redirect after login
        redirectUrlComplete: "/dashboard",
      });
    } catch (error) {
      setError("Social login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-purple-400 to-emerald-300 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <h1 className="font-lato text-2xl font-bold text-black">
            Welcome to <span className="text-[#cd3476]">Hekto</span> Store
          </h1>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Left Column - Illustration */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[300px] aspect-square">
                <Image
                  src="/admin-image.png"
                  alt="Login illustration"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Right Column - Login Form */}
            <div className="flex flex-col justify-center max-w-md mx-auto w-full">
              <h1 className="text-xl font-semibold font-lato text-gray-900 mb-8">
                Login as an Admin
              </h1>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Email"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>

                <div className="relative">
                  <Input
                    type="password"
                    placeholder="Password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                  LOGIN
                </Button>
              </form>

              {/* Social Login */}
              <div className="mt-6">
                <p className="text-center text-sm text-gray-600">Or sign in with</p>
                <div className="flex space-x-4 mt-4">
                  <Button
                    onClick={() => handleSocialLogin("oauth_google")}
                    className="flex-1 bg-gray-50 hover:bg-gray-100 text-black flex items-center justify-center"
                  >
                    <Image src="/google-icon.svg" alt="Google" width={20} height={20} className="mr-2" />
                    Google
                  </Button>

                  <Button
                    onClick={() => handleSocialLogin("oauth_facebook")}
                    className="flex-1 bg-gray-50 hover:bg-gray-100 text-black flex items-center justify-center"
                  >
                    <Image src="/facebook-icon.svg" alt="Facebook" width={20} height={20} className="mr-2" />
                    Facebook
                  </Button>
                </div>
              </div>

              <div className="mt-6 text-center space-y-4">
                <p className="text-sm text-gray-600">
                  <Link href="/forgot-password" className="text-sm hover:text-gray-900">
                    Forgot your password?
                  </Link>
                </p>
                <p className="text-sm text-purple-600 hover:text-purple-700">
                  Get help signing in
                </p>
              </div>

              <div className="mt-8 text-center text-sm text-gray-500">
                <p className="hover:text-gray-700">Terms of use</p>
                {" · "}
                <p className="hover:text-gray-700">Privacy policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client"

import { useSignIn } from "@clerk/nextjs"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ForgotPassword() {
  const { signIn } = useSignIn();
  const [email, setEmail] = useState("marjanahmed.dev@gmail.com"); // Admin email
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    // ✅ Check if signIn is available before using it
    if (!signIn) {
      setMessage("Authentication not initialized. Please try again.");
      setLoading(false);
      return;
    }

    try {
      await signIn.create({
        identifier: email,
        strategy: "reset_password_email_code",
      });
      setMessage("Password reset email sent! Check your inbox.");
    } catch (error: any) {
      setMessage(error.errors[0]?.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Forgot Password</h2>
        <p className="text-sm text-gray-600 mb-4">Enter your email to reset your password.</p>
        <form className="space-y-4" onSubmit={handleForgotPassword}>
          <Input type="email" value={email} disabled className="w-full" />
          <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Email"}
          </Button>
        </form>
        {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
      </div>
    </div>
  );
}

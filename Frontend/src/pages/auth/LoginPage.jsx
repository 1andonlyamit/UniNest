import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../../components/forms/AuthForm";
import { useAuth } from "../../context/AuthContext";

const roleToLanding = {
  admin: "/admin",
  company: "/company",
  student: "/student",
  university: "/university",
};

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const { user } = await login({ email, password });
      navigate(roleToLanding[user.role] || "/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[var(--color-background)] p-6">
      <div className="w-full max-w-2xl space-y-6">
        <AuthForm mode="login" onSubmit={handleLogin} submitting={loading} />
        {/* <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p> */}
      </div>
    </div>
  );
}

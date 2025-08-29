import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/forms/AuthForm";
import { loginApi, saveAuth } from "../../api/auth";

const roleIdToLanding = {
  1: "/admin",
  2: "/university",
  3: "/company",
  4: "/student",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async ({ role_id, email, password }) => {
    setLoading(true);
    try {
      const data = await loginApi({ role_id, email, password });
      // Store the raw response and role_id for guards
      saveAuth({ user: data });
      navigate(roleIdToLanding[data.role_id] || "/");
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

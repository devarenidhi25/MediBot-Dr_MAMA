"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { ArrowLeft } from "lucide-react"

export default function SignIn({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Login failed");

      const user = await response.json();
      onLogin(user);
      navigate("/chat");
    } catch (error) {
      console.error("Login error:", error);
      // Optionally show error message to user
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="back-button">
            <ArrowLeft className="icon" />
          </Button>
          <h1 className="auth-title">
            Sign in to medi<span className="text-sky-500 font-bold">BOT</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="auth-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="auth-input"
            />
          </div>

          <div className="forgot-password">
            <a href="#" className="forgot-link">
              Forgot password?
            </a>
          </div>

          <Button type="submit" className="auth-submit-button" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="auth-divider">
          <span className="divider-text">OR</span>
        </div>


        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <Button variant="link" onClick={() => navigate("/signup")} className="auth-link">
              Sign up
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}


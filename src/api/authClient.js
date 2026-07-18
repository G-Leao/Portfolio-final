// Local authentication client
// This provides authentication functionality without external dependencies

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export const auth = {
  // Get current token
  getToken: () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  // Set token
  setToken: (token) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, token);
  },

  // Remove token
  removeToken: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  // Get current user
  getUser: () => {
    if (typeof window === "undefined") return null;
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  // Set current user
  setUser: (user) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!auth.getToken();
  },

  // Login with email and password (mock implementation)
  loginViaEmailPassword: async (email, password) => {
    // This is a mock implementation
    // In a real app, this would call your backend API
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    const data = await response.json();
    auth.setToken(data.access_token);
    if (data.user) {
      auth.setUser(data.user);
    }
    return data;
  },

  // Register new user (mock implementation)
  register: async (email, password) => {
    // This is a mock implementation
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    return await response.json();
  },

  // Verify OTP (mock implementation)
  verifyOtp: async (email, otpCode) => {
    // This is a mock implementation
    const response = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otpCode }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Verification failed");
    }

    const data = await response.json();
    if (data.access_token) {
      auth.setToken(data.access_token);
    }
    if (data.user) {
      auth.setUser(data.user);
    }
    return data;
  },

  // Resend OTP (mock implementation)
  resendOtp: async (email) => {
    const response = await fetch("/api/auth/resend-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to resend code");
    }

    return await response.json();
  },

  // Reset password request (mock implementation)
  resetPasswordRequest: async (email) => {
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to send reset link");
    }

    return await response.json();
  },

  // Reset password (mock implementation)
  resetPassword: async (resetToken, newPassword) => {
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resetToken, newPassword }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to reset password");
    }

    return await response.json();
  },

  // Get current user (mock implementation)
  me: async () => {
    const token = auth.getToken();
    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      auth.removeToken();
      throw new Error("Unauthorized");
    }

    const user = await response.json();
    auth.setUser(user);
    return user;
  },

  // Logout
  logout: (redirectUrl) => {
    auth.removeToken();
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  },

  // Login with provider (mock implementation)
  loginWithProvider: (provider, redirectUrl) => {
    // This would typically redirect to an OAuth flow
    window.location.href = `/api/auth/${provider}?redirect=${encodeURIComponent(redirectUrl || window.location.href)}`;
  },

  // Redirect to login
  redirectToLogin: (redirectUrl) => {
    window.location.href = `/login?redirect=${encodeURIComponent(redirectUrl || window.location.href)}`;
  },
};

export default auth;

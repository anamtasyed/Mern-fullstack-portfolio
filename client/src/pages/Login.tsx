import {useState, type FormEvent, type ChangeEvent } from "react";
import {Link, useNavigate } from "react-router-dom";
import "./login.css";

interface User {
    _id: string;
    username?: string,
    email: string;
    role: "Admin" | "User";
}
function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const[loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement> ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if(!formData.email || !formData.password) {
            setError("Please enter your email and password. ");
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/auth/signin`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)

                }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Login failed.");
            }
            // Save JWT token 
            localStorage.setItem("token", data.token);

            // Save logged-in user
            const user: User = data.user;
            localStorage.setItem("user", JSON.stringify(user));

            // Redirect based on user role
            if (user.role === "Admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (err) {
            setError(
                err instanceof Error
                  ? err.message
                  : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="login-container">
            <div className="login-card">
               <h2>Welcome Back</h2>
               <p>Sign in to your portfolio account</p>

                {error && (
                  <div className="error-message">{error}</div>
                )}

                <form onSubmit={handleSubmit}>
                   <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" name="email" placeholder="Please enter your email" value={formData.email} onChange={handleChange} required
                      />
                   </div>

                   <div className="form-group">
                       <label htmlFor="password">Password</label>
                       <input type="password" id="password" name="password" placeholder="Please enter your password" value={formData.password} onChange={handleChange} required
                       />
                   </div>
                   <button type="submit" className="auth-submit-button" disabled={loading}>{loading ? "Logging in..." : "Login"} </button>
               </form>
                <p className="signup-link">Don't have an account?{" "} <Link to="/register">Create a new account</Link></p>
           </div>
       </div>
    );
}
export default Login;
import { Imagepaths } from "../assets/Global_Need_files/ImagesPaths";
import "./login.css";
import { useState } from "react";
import { useAuth } from "../authContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProfile } from "../redux/profileSlice";
import { useSelector } from "react-redux";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      // First try to get user type from the login form or UI
      // If not available, it will be handled by the backend
      const userType = document.querySelector('input[name="userType"]:checked')?.value;
      
      // Call login with the userType if available
      const userData = await login(email, password, userType);
      
      try {
        await dispatch(fetchProfile()).unwrap();
      } catch (profileError) {
        console.warn("Profile fetch failed:", profileError);
        // Continue even if profile fetch fails
      }
      
      // Redirect based on user type
      if (userData.userType === 'employer') {
        navigate('/employer');
      } else {
        navigate('/app');
      }
    } catch (error) {
      console.error("Login Failed:", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("Login failed. Please check your credentials and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const userProfile = useSelector((state) => state.usrProfile)
  console.log(userProfile)
  return (
    <div className="LoginContainer">
      <div className="topSectionLogin">
        <img
          className="imagelogo"
          src={Imagepaths.HiringstoreslogoPath}
          alt="HiringStores Logo"
        />
        <p id="txtWelcome">Welcome Back</p>
        <p className="subtitle">Sign in to continue</p>
      </div>

      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}

      <form className="LoginForm" onSubmit={handleSubmit}>
        <div className="FormGroup">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            required
            disabled={isLoading}
          />
          <label htmlFor="email">Email Address</label>
          <div className="inputHighlight"></div>
        </div>

        <div className="FormGroup">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
            required
            disabled={isLoading}
          />
          <label htmlFor="password">Password</label>
          <div className="inputHighlight"></div>
        </div>

        <div className="user-type-selection">
          <p className="user-type-label">Login as:</p>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="userType"
                value="job_seeker"
                defaultChecked
                disabled={isLoading}
              />
              <span>Job Seeker</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="userType"
                value="employer"
                disabled={isLoading}
              />
              <span>Employer</span>
            </label>
          </div>
        </div>

        <button
          className={`LoginButton ${isLoading ? 'loading' : ''}`}
          type="submit"
          disabled={isLoading}
        >
          <span>{isLoading ? 'Signing in...' : 'Login'}</span>
          <div className="buttonHighlight"></div>
        </button>
      </form>

      <a href="/Reset-password" className="forgotPassword">
        Forgot Password?
      </a>

      <div className="signUp">
        <p className="SignupTxt">
          Don't have an account?
          <a href="/signUp" id="signupTxturl">
            {" "}
            Sign up
          </a>
        </p>
      </div>

      <div className="brandMessage">
        <p>Elevate your hiring experience</p>
      </div>
    </div>
  );
}

export default Login;
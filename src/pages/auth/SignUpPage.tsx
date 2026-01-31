import { Imagepaths } from "../../assets/Global_Need_files/ImagesPaths";
import { useState, FormEvent } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";
import { SignupProps, UserTypeOption } from "../../types/authForms";

function SignUpPage({ }: SignupProps) {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [typeOfUser, setTypeOfUser] = useState<UserTypeOption>("job_seeker");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const validateForm = (): boolean => {
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return false;
        }

        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("");

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            await register(username, email, password, typeOfUser);
            // Redirect based on user type
            if (typeOfUser === "employer") {
                navigate("/employer");
            } else {
                navigate("/app");
            }
        } catch (error: any) {
            console.error("SignUp Failed:", error);
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Registration failed. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cn(
            "flex flex-col justify-center items-center min-h-screen gap-5 font-sans",
            "bg-gradient-to-br from-secondary-950 to-secondary-900 p-5"
        )}>
            <div className="text-center">
                <img
                    className="w-32 h-32 mx-auto mb-4"
                    src={Imagepaths.HiringstoreslogoPath}
                    alt="HiringStores Logo"
                />
                <h2 className="text-3xl font-bold text-white mb-2">Create Your Account</h2>
                <p className="text-gray-400">Join our community today</p>
            </div>

            {errorMessage && (
                <div className="bg-error-100 border border-error-400 text-error-700 px-4 py-3 rounded-lg max-w-md">
                    {errorMessage}
                </div>
            )}

            <form className={cn(
                "p-10 rounded-2xl shadow-strong flex flex-col gap-7 w-full max-w-md",
                "bg-secondary-800/65 border border-purple-600/20 backdrop-blur-md"
            )} onSubmit={handleSubmit}>
                <div className="relative">
                    <input
                        type="text"
                        id="Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder=" "
                        required
                        disabled={isLoading}
                        className={cn(
                            "w-full px-4 py-4 border border-secondary-600 bg-secondary-800/80 rounded-lg",
                            "text-white placeholder-transparent focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
                            "peer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        )}
                    />
                    <label
                        htmlFor="Name"
                        className={cn(
                            "absolute left-4 top-4 px-1 text-gray-400 font-medium pointer-events-none transition-all duration-200 z-10",
                            "peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400",
                            "peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-500 peer-focus:bg-secondary-800"
                        )}
                    >
                        User Name
                    </label>
                </div>

                <div className="relative">
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder=" "
                        required
                        disabled={isLoading}
                        className={cn(
                            "w-full px-4 py-4 border border-secondary-600 bg-secondary-800/80 rounded-lg",
                            "text-white placeholder-transparent focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
                            "peer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        )}
                    />
                    <label
                        htmlFor="email"
                        className={cn(
                            "absolute left-4 top-4 px-1 text-gray-400 font-medium pointer-events-none transition-all duration-200 z-10",
                            "peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400",
                            "peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-500 peer-focus:bg-secondary-800"
                        )}
                    >
                        Email Address
                    </label>
                </div>

                <div className="space-y-3">
                    <p className="text-gray-400 text-sm font-medium">Register as:</p>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="userType"
                                value="job_seeker"
                                checked={typeOfUser === "job_seeker"}
                                onChange={() => setTypeOfUser("job_seeker")}
                                disabled={isLoading}
                                className="w-4 h-4 text-primary-500 focus:ring-primary-500 disabled:opacity-50"
                            />
                            <span className="text-gray-300">Job Seeker</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="userType"
                                value="employer"
                                checked={typeOfUser === "employer"}
                                onChange={() => setTypeOfUser("employer")}
                                disabled={isLoading}
                                className="w-4 h-4 text-primary-500 focus:ring-primary-500 disabled:opacity-50"
                            />
                            <span className="text-gray-300">Employer</span>
                        </label>
                    </div>
                </div>

                <div className="relative">
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder=" "
                        required
                        disabled={isLoading}
                        className={cn(
                            "w-full px-4 py-4 border border-secondary-600 bg-secondary-800/80 rounded-lg",
                            "text-white placeholder-transparent focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
                            "peer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        )}
                    />
                    <label
                        htmlFor="password"
                        className={cn(
                            "absolute left-4 top-4 px-1 text-gray-400 font-medium pointer-events-none transition-all duration-200 z-10",
                            "peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400",
                            "peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-500 peer-focus:bg-secondary-800"
                        )}
                    >
                        Password
                    </label>
                </div>

                <div className="relative">
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder=" "
                        required
                        disabled={isLoading}
                        className={cn(
                            "w-full px-4 py-4 border border-secondary-600 bg-secondary-800/80 rounded-lg",
                            "text-white placeholder-transparent focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
                            "peer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        )}
                    />
                    <label
                        htmlFor="confirmPassword"
                        className={cn(
                            "absolute left-4 top-4 px-1 text-gray-400 font-medium pointer-events-none transition-all duration-200 z-10",
                            "peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400",
                            "peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-500 peer-focus:bg-secondary-800"
                        )}
                    >
                        Confirm Password
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={cn(
                        "relative px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg",
                        "hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-secondary-900",
                        "disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 hover:shadow-medium"
                    )}
                >
                    <span>{isLoading ? "Creating account..." : "Sign Up"}</span>
                </button>
            </form>

            <div className="text-center">
                <p className="text-gray-400 text-sm">
                    Already have an account?
                    <a
                        href="/login"
                        className="text-primary-400 hover:text-primary-300 font-medium ml-1 transition-colors duration-200"
                    >
                        Login
                    </a>
                </p>
            </div>

            <div className="text-center">
                <p className="text-gray-500 text-sm italic">Elevate your hiring experience</p>
            </div>
        </div>
    );
}

export default SignUpPage;

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
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
            "flex flex-col justify-center items-center min-h-screen gap-5 font-sans transition-colors duration-300",
            "bg-primary-50 dark:bg-secondary-950 p-5"
        )}>
            <div className="text-center">
                <img
                    className="w-24 h-24 mx-auto mb-4 object-contain"
                    src={Imagepaths.HiringstoreslogoPath}
                    alt="HiringStores Logo"
                />
                <h2 className="text-3xl font-bold text-primary-900 dark:text-primary-50 mb-2">Create Account</h2>
                <p className="text-primary-500 dark:text-primary-400">Join our community today</p>
            </div>

            {errorMessage && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-[12px] max-w-md w-full text-center text-sm font-medium">
                    {errorMessage}
                </div>
            )}

            <div className={cn(
                "p-8 rounded-[24px] shadow-xl flex flex-col gap-6 w-full max-w-md transition-all duration-300",
                "bg-white dark:bg-secondary-900 border border-primary-100 dark:border-secondary-800"
            )}>
                {/* User Type Slider Toggle */}
                <div className="relative flex p-1 bg-primary-100 dark:bg-secondary-800 rounded-full border border-primary-200 dark:border-secondary-700 h-14 select-none">
                    <div
                        className={cn(
                            "absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-green-400 dark:bg-primary-500 border-[2px] border-primary-800 dark:border-primary-300 shadow-md transition-all duration-300 ease-in-out z-0",
                            typeOfUser === 'job_seeker' ? "left-1" : "left-[calc(50%+0px)]"
                        )}
                    />
                    <button
                        type="button"
                        onClick={() => setTypeOfUser('job_seeker')}
                        className={cn(
                            "flex-1 relative z-20 text-sm font-bold transition-colors duration-300 rounded-full bg-transparent",
                            typeOfUser === 'job_seeker'
                                ? "text-primary-50 dark:text-primary-900"
                                : "text-primary-500 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-200"
                        )}
                    >
                        Job Seeker
                    </button>
                    <button
                        type="button"
                        onClick={() => setTypeOfUser('employer')}
                        className={cn(
                            "flex-1 relative z-20 text-sm font-bold transition-colors duration-300 rounded-full bg-transparent",
                            typeOfUser === 'employer'
                                ? "text-primary-50 dark:text-primary-900"
                                : "text-primary-500 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-200"
                        )}
                    >
                        Employer
                    </button>
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="relative group">
                        <label className="text-xs font-semibold uppercase tracking-wider text-primary-500 dark:text-primary-400 mb-1.5 block ml-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="John Doe"
                            required
                            disabled={isLoading}
                            className={cn(
                                "w-full px-4 py-3.5 border-[0.5px] rounded-[12px] transition-all duration-200 outline-none font-medium",
                                "bg-primary-50 dark:bg-secondary-800/50",
                                "border-primary-200 dark:border-secondary-700",
                                "text-primary-900 dark:text-primary-50",
                                "placeholder:text-primary-300 dark:placeholder:text-secondary-500",
                                "focus:border-[2px] focus:border-primary-900 dark:focus:border-primary-100 focus:ring-0",
                                "disabled:opacity-50 disabled:cursor-not-allowed"
                            )}
                        />
                    </div>

                    <div className="relative group">
                        <label className="text-xs font-semibold uppercase tracking-wider text-primary-500 dark:text-primary-400 mb-1.5 block ml-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            required
                            disabled={isLoading}
                            className={cn(
                                "w-full px-4 py-3.5 border-[0.5px] rounded-[12px] transition-all duration-200 outline-none font-medium",
                                "bg-primary-50 dark:bg-secondary-800/50",
                                "border-primary-200 dark:border-secondary-700",
                                "text-primary-900 dark:text-primary-50",
                                "placeholder:text-primary-300 dark:placeholder:text-secondary-500",
                                "focus:border-[2px] focus:border-primary-900 dark:focus:border-primary-100 focus:ring-0",
                                "disabled:opacity-50 disabled:cursor-not-allowed"
                            )}
                        />
                    </div>

                    <div className="relative group">
                        <label className="text-xs font-semibold uppercase tracking-wider text-primary-500 dark:text-primary-400 mb-1.5 block ml-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Min 6 characters"
                                required
                                disabled={isLoading}
                                className={cn(
                                    "w-full px-4 py-3.5 border-[2px] rounded-[12px] transition-all duration-200 outline-none font-medium pr-10",
                                    "bg-primary-50 dark:bg-secondary-800/50",
                                    "border-primary-200 dark:border-secondary-700",
                                    "text-primary-900 dark:text-primary-50",
                                    "placeholder:text-primary-300 dark:placeholder:text-secondary-500",
                                    "focus:border-[2px] focus:border-primary-900 dark:focus:border-primary-100 focus:ring-0",
                                    "disabled:opacity-50 disabled:cursor-not-allowed"
                                )}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-400 hover:text-primary-600 dark:text-primary-500 dark:hover:text-primary-300 transition-colors"
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                    </div>

                    <div className="relative group">
                        <label className="text-xs font-semibold uppercase tracking-wider text-primary-500 dark:text-primary-400 mb-1.5 block ml-1">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Re-enter password"
                                required
                                disabled={isLoading}
                                className={cn(
                                    "w-full px-4 py-3.5 border-[2px] rounded-[12px] transition-all duration-200 outline-none font-medium pr-10",
                                    "bg-primary-50 dark:bg-secondary-800/50",
                                    "border-primary-200 dark:border-secondary-700",
                                    "text-primary-900 dark:text-primary-50",
                                    "placeholder:text-primary-300 dark:placeholder:text-secondary-500",
                                    "focus:border-[2px] focus:border-primary-900 dark:focus:border-primary-100 focus:ring-0",
                                    "disabled:opacity-50 disabled:cursor-not-allowed"
                                )}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-400 hover:text-primary-600 dark:text-primary-500 dark:hover:text-primary-300 transition-colors"
                            >
                                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={cn(
                            "mt-4 w-full px-6 py-3.5 rounded-[50px] font-bold text-sm uppercase tracking-wide transition-all duration-200 shadow-md hover:shadow-lg transform active:scale-[0.98]",
                            "bg-primary-900 dark:bg-primary-50 text-primary-50 dark:text-primary-900",
                            "hover:bg-primary-800 dark:hover:bg-primary-200",
                            "disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                        )}
                    >
                        {isLoading ? "Creating account..." : "Sign Up"}
                    </button>
                </form>

                <div className="text-center pt-2 border-t border-primary-100 dark:border-secondary-800">
                    <p className="text-primary-500 dark:text-primary-400 text-sm">
                        Already have an account?
                        <a
                            href="/login"
                            className="text-primary-900 dark:text-primary-50 font-bold ml-1 hover:underline transition-all"
                        >
                            Login
                        </a>
                    </p>
                </div>
            </div>

            <p className="text-primary-400 dark:text-primary-600 text-xs mt-4">
                © 2024 HiringStores. All rights reserved.
            </p>
        </div>
    );
}

export default SignUpPage;

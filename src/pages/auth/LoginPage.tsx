import { Imagepaths } from "../../assets/Global_Need_files/ImagesPaths";
import { cn } from "../../lib/utils";
import { useState, FormEvent } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProfile } from "../../redux/profileSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../types/redux";
import { LoginProps, UserTypeOption } from "../../types/authForms";

function LoginPage({ }: LoginProps) {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [userType, setUserType] = useState<UserTypeOption>('job_seeker');
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("");
        setIsLoading(true);

        try {
            // Call login with the selected userType
            const userData = await login(email, password, userType);

            try {
                const result = await dispatch(fetchProfile() as any);
                await result.unwrap();
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
        } catch (error: any) {
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

    const userProfile = useSelector((state: RootState) => state.usrProfile);
    console.log(userProfile);

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
                <h2 className="text-3xl font-bold text-primary-900 dark:text-primary-50 mb-2">Welcome Back</h2>
                <p className="text-primary-500 dark:text-primary-400">Sign in to continue to your account</p>
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
                {/* User Type Toggle */}
                <div className="flex p-1 bg-primary-50 dark:bg-secondary-800 rounded-[12px] border border-primary-200 dark:border-secondary-700">
                    <button
                        type="button"
                        onClick={() => setUserType('job_seeker')}
                        className={cn(
                            "flex-1 py-2 text-sm font-semibold rounded-[8px] transition-all duration-200",
                            userType === 'job_seeker'
                                ? "bg-white dark:bg-secondary-700 text-primary-900 dark:text-primary-50 shadow-sm"
                                : "text-primary-500 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                        )}
                    >
                        Job Seeker
                    </button>
                    <button
                        type="button"
                        onClick={() => setUserType('employer')}
                        className={cn(
                            "flex-1 py-2 text-sm font-semibold rounded-[8px] transition-all duration-200",
                            userType === 'employer'
                                ? "bg-white dark:bg-secondary-700 text-primary-900 dark:text-primary-50 shadow-sm"
                                : "text-primary-500 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                        )}
                    >
                        Employer
                    </button>
                </div>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="relative group">
                        <label className="text-xs font-semibold uppercase tracking-wider text-primary-500 dark:text-primary-400 mb-1.5 block ml-1">
                            Email Address
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
                                "w-full px-4 py-3.5 border rounded-[12px] transition-all duration-200 outline-none font-medium",
                                "bg-primary-50 dark:bg-secondary-800/50",
                                "border-primary-200 dark:border-secondary-700",
                                "text-primary-900 dark:text-primary-50",
                                "placeholder:text-primary-300 dark:placeholder:text-secondary-500",
                                "focus:border-primary-500 dark:focus:border-primary-400 focus:ring-4 focus:ring-primary-500/10 dark:focus:ring-primary-400/10",
                                "disabled:opacity-50 disabled:cursor-not-allowed"
                            )}
                        />
                    </div>

                    <div className="relative group">
                        <div className="flex justify-between items-center mb-1.5 ml-1">
                            <label className="text-xs font-semibold uppercase tracking-wider text-primary-500 dark:text-primary-400">
                                Password
                            </label>
                            <a
                                href="/Reset-password"
                                className="text-xs font-semibold text-primary-600 dark:text-primary-300 hover:text-primary-800 dark:hover:text-primary-100 transition-colors"
                            >
                                Forgot?
                            </a>
                        </div>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            disabled={isLoading}
                            className={cn(
                                "w-full px-4 py-3.5 border rounded-[12px] transition-all duration-200 outline-none font-medium",
                                "bg-primary-50 dark:bg-secondary-800/50",
                                "border-primary-200 dark:border-secondary-700",
                                "text-primary-900 dark:text-primary-50",
                                "placeholder:text-primary-300 dark:placeholder:text-secondary-500",
                                "focus:border-primary-500 dark:focus:border-primary-400 focus:ring-4 focus:ring-primary-500/10 dark:focus:ring-primary-400/10",
                                "disabled:opacity-50 disabled:cursor-not-allowed"
                            )}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={cn(
                            "mt-2 w-full px-6 py-3.5 rounded-[50px] font-bold text-sm uppercase tracking-wide transition-all duration-200 shadow-md hover:shadow-lg transform active:scale-[0.98]",
                            "bg-primary-900 dark:bg-primary-50 text-primary-50 dark:text-primary-900",
                            "hover:bg-primary-800 dark:hover:bg-primary-200",
                            "disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                        )}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="text-center pt-2 border-t border-primary-100 dark:border-secondary-800">
                    <p className="text-primary-500 dark:text-primary-400 text-sm">
                        Don't have an account?
                        <a
                            href="/signUp"
                            className="text-primary-900 dark:text-primary-50 font-bold ml-1 hover:underline transition-all"
                        >
                            Create Account
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

export default LoginPage;

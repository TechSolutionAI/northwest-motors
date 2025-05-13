"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, ArrowRight, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Validation types
type ValidationError = {
    email?: string
    password?: string
    name?: string
    repeatPassword?: string
}

export function LoginForm() {

    const router = useRouter();

    // Toggle password visibility
    const [showPassword, setShowPassword] = useState(false)
    const [showCreatePassword, setShowCreatePassword] = useState(false)
    const [showRepeatPassword, setShowRepeatPassword] = useState(false)

    // Login form state
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const [loginErrors, setLoginErrors] = useState<ValidationError>({})
    const [loginTouched, setLoginTouched] = useState({
        email: false,
        password: false,
    })

    // Registration form state
    const [createName, setCreateName] = useState("")
    const [createEmail, setCreateEmail] = useState("")
    const [createPassword, setCreatePassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [registerErrors, setRegisterErrors] = useState<ValidationError>({})
    const [registerTouched, setRegisterTouched] = useState({
        name: false,
        email: false,
        password: false,
        repeatPassword: false,
    })

    // Form validity state
    const [isLoginValid, setIsLoginValid] = useState(false)
    const [isRegisterValid, setIsRegisterValid] = useState(false)

    // Validation functions
    const validateEmail = (email: string): string | undefined => {
        if (!email) return "Email is required"
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) return "Please enter a valid email address"
        return undefined
    }

    const validatePassword = (password: string): string | undefined => {
        if (!password) return "Password is required"
        if (password.length < 8) return "Password must be at least 8 characters"
        return undefined
    }

    const validateName = (name: string): string | undefined => {
        if (!name) return "Name is required"
        if (name.length < 2) return "Name must be at least 2 characters"
        return undefined
    }

    const validatePasswordMatch = (password: string, repeatPassword: string): string | undefined => {
        if (!repeatPassword) return "Please confirm your password"
        if (password !== repeatPassword) return "Passwords do not match"
        return undefined
    }

    // Validate login form
    useEffect(() => {
        const errors: ValidationError = {}

        if (loginTouched.email) {
            errors.email = validateEmail(loginEmail)
        }

        if (loginTouched.password) {
            errors.password = validatePassword(loginPassword)
        }

        setLoginErrors(errors)
        setIsLoginValid(!errors.email && !errors.password && loginEmail !== "" && loginPassword !== "")
    }, [loginEmail, loginPassword, loginTouched])

    // Validate registration form
    useEffect(() => {
        const errors: ValidationError = {}

        if (registerTouched.name) {
            errors.name = validateName(createName)
        }

        if (registerTouched.email) {
            errors.email = validateEmail(createEmail)
        }

        if (registerTouched.password) {
            errors.password = validatePassword(createPassword)
        }

        if (registerTouched.repeatPassword) {
            errors.repeatPassword = validatePasswordMatch(createPassword, repeatPassword)
        }

        setRegisterErrors(errors)
        setIsRegisterValid(
            !errors.name &&
            !errors.email &&
            !errors.password &&
            !errors.repeatPassword &&
            createName !== "" &&
            createEmail !== "" &&
            createPassword !== "" &&
            repeatPassword !== "",
        )
    }, [createName, createEmail, createPassword, repeatPassword, registerTouched])

    // Handle login form submission
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()

        // Mark all fields as touched to show any validation errors
        setLoginTouched({
            email: true,
            password: true,
        })

        // Only proceed if form is valid
        if (isLoginValid) {
            console.log("Login attempt with:", { loginEmail, loginPassword, rememberMe })
            // Handle login logic here

            router.push("/dashboard");
        }
    }

    // Handle registration form submission
    const handleCreateAccount = (e: React.FormEvent) => {
        e.preventDefault()

        // Mark all fields as touched to show any validation errors
        setRegisterTouched({
            name: true,
            email: true,
            password: true,
            repeatPassword: true,
        })

        // Only proceed if form is valid
        if (isRegisterValid) {
            console.log("Create account attempt with:", { createName, createEmail, createPassword })
            // Handle account creation logic here
        }
    }

    // Field touch handlers
    const handleLoginBlur = (field: keyof typeof loginTouched) => {
        setLoginTouched({ ...loginTouched, [field]: true })
    }

    const handleRegisterBlur = (field: keyof typeof registerTouched) => {
        setRegisterTouched({ ...registerTouched, [field]: true })
    }

    return (
        <div className="flex flex-col lg:flex-row max-w-6xl mx-auto">
            {/* Sign In Form */}
            <div className="w-full lg:w-1/2 bg-white p-8 lg:p-16">
                <h2 className="text-3xl font-bold mb-8">
                    Sign into your <span className="text-[#8E6F00]">Account</span>
                </h2>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-1">
                        <div className="relative">
                            <Input
                                type="email"
                                placeholder="Email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                onBlur={() => handleLoginBlur("email")}
                                className={`border-b border-t-0 border-l-0 border-r-0 rounded-none px-4 pr-8 ${loginTouched.email && (loginErrors.email ? "border-red-500" : "border-green-500")
                                    }`}
                                required
                            />
                            {loginTouched.email && (
                                <div className="absolute right-0 top-3">
                                    {loginErrors.email ? (
                                        <XCircle className="h-4 w-4 text-red-500" />
                                    ) : (
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    )}
                                </div>
                            )}
                        </div>
                        {loginTouched.email && loginErrors.email && (
                            <p className="text-red-500 text-xs mt-1">{loginErrors.email}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                onBlur={() => handleLoginBlur("password")}
                                className={`border-b border-t-0 border-l-0 border-r-0 rounded-none px-4 pr-8  ${loginTouched.password && (loginErrors.password ? "border-red-500" : "border-green-500")
                                    }`}
                                required
                            />
                            <button
                                type="button"
                                aria-label="Show or hide password"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-0 top-3 text-gray-700"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {loginTouched.password && loginErrors.password && (
                            <p className="text-red-500 text-xs mt-1">{loginErrors.password}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remember-me"
                                checked={rememberMe}
                                onCheckedChange={(checked: boolean) => setRememberMe(checked as boolean)}
                            />
                            <label htmlFor="remember-me" className="text-sm">
                                Remember me
                            </label>
                        </div>

                        <Link href="/forgot-password" className="text-sm">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        aria-label="Login"
                        className="w-full mt-4 p-4 mb-4 flex items-center justify-center bg-[#414042] text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in cursor-pointer"
                        disabled={!isLoginValid}
                    >
                        LOGIN <ArrowRight className="ml-2" />
                    </button>

                </form>
            </div>

            {/* Create Account Form */}
            <div className="w-full lg:w-1/2 bg-[#1A1A1A] text-white p-8 lg:p-16">
                <h2 className="text-3xl font-bold mb-8">
                    Create an <span className="text-[#8E6F00]">Account</span>
                </h2>

                <form onSubmit={handleCreateAccount} className="space-y-6">
                    <div className="space-y-1">
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Name"
                                value={createName}
                                onChange={(e) => setCreateName(e.target.value)}
                                onBlur={() => handleRegisterBlur("name")}
                                className={`border-b border-t-0 border-l-0 border-r-0 rounded-none px-4 pr-8 bg-transparent text-white  ${registerTouched.name && (registerErrors.name ? "border-red-500" : "border-green-500")
                                    }`}
                                required
                            />
                            {registerTouched.name && (
                                <div className="absolute right-0 top-3">
                                    {registerErrors.name ? (
                                        <XCircle className="h-4 w-4 text-red-500" />
                                    ) : (
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    )}
                                </div>
                            )}
                        </div>
                        {registerTouched.name && registerErrors.name && (
                            <p className="text-red-500 text-xs mt-1">{registerErrors.name}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <div className="relative">
                            <Input
                                type="email"
                                placeholder="Email"
                                value={createEmail}
                                onChange={(e) => setCreateEmail(e.target.value)}
                                onBlur={() => handleRegisterBlur("email")}
                                className={`border-b border-t-0 border-l-0 border-r-0 rounded-none  px-4 pr-8 bg-transparent text-white  ${registerTouched.email && (registerErrors.email ? "border-red-500" : "border-green-500")
                                    }`}
                                required
                            />
                            {registerTouched.email && (
                                <div className="absolute right-0 top-3">
                                    {registerErrors.email ? (
                                        <XCircle className="h-4 w-4 text-red-500" />
                                    ) : (
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    )}
                                </div>
                            )}
                        </div>
                        {registerTouched.email && registerErrors.email && (
                            <p className="text-red-500 text-xs mt-1">{registerErrors.email}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <div className="relative">
                            <Input
                                type={showCreatePassword ? "text" : "password"}
                                placeholder="Password"
                                value={createPassword}
                                onChange={(e) => setCreatePassword(e.target.value)}
                                onBlur={() => handleRegisterBlur("password")}
                                className={`border-b border-t-0 border-l-0 border-r-0 rounded-none  px-4 pr-10 bg-transparent text-white  ${registerTouched.password && (registerErrors.password ? "border-red-500" : "border-green-500")
                                    }`}
                                required
                            />
                            <button
                                type="button"
                                aria-label="Show or hide password"
                                onClick={() => setShowCreatePassword(!showCreatePassword)}
                                className="absolute right-0 top-3 text-gray-700"
                            >
                                {showCreatePassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {registerTouched.password && registerErrors.password && (
                            <p className="text-red-500 text-xs mt-1">{registerErrors.password}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <div className="relative">
                            <Input
                                type={showRepeatPassword ? "text" : "password"}
                                placeholder="Repeat Password"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                onBlur={() => handleRegisterBlur("repeatPassword")}
                                className={`border-b border-t-0 border-l-0 border-r-0 rounded-none  px-4 pr-10 bg-transparent text-white  ${registerTouched.repeatPassword &&
                                    (registerErrors.repeatPassword ? "border-red-500" : "border-green-500")
                                    }`}
                                required
                            />
                            <button
                                type="button"
                                aria-label="Show or hide password"
                                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                                className="absolute right-0 top-3 text-gray-700"
                            >
                                {showRepeatPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {registerTouched.repeatPassword && registerErrors.repeatPassword && (
                            <p className="text-red-500 text-xs mt-1">{registerErrors.repeatPassword}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        aria-label="Create"
                        className="w-full mt-4 p-4 mb-4 flex items-center justify-center bg-[#414042] text-white hover:bg-[#8E6F00] transition-colors duration-300 ease-in cursor-pointer"
                        disabled={!isRegisterValid}
                    >
                        CREATE <ArrowRight className="ml-2" />
                    </button>
                </form>
            </div>
        </div>
    )
}

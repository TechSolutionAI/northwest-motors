"use client"

import type React from "react"

import { MoveRight, Upload, AlertCircle } from "lucide-react"
import { useState, useRef } from "react"
import { Textarea } from "../ui/textarea"
import { Input } from "../ui/input"
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input"
import "react-phone-number-input/style.css"
import Link from "next/link"

// Define file validation types
type FileError = {
    size?: string
    type?: string
    required?: string
}

export default function CareerForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    })

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    })

    const [touched, setTouched] = useState({
        name: false,
        email: false,
        phone: false,
        message: false,
        resume: false,
        coverLetter: false,
    })

    // File upload states
    const [resumeFile, setResumeFile] = useState<File | null>(null)
    const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null)
    const [resumeError, setResumeError] = useState<FileError>({})
    const [coverLetterError, setCoverLetterError] = useState<FileError>({})
    const resumeInputRef = useRef<HTMLInputElement>(null)
    const coverLetterInputRef = useRef<HTMLInputElement>(null)

    // File validation constants
    const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
    const ALLOWED_FILE_TYPES = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    const ALLOWED_FILE_EXTENSIONS = [".pdf", ".doc", ".docx"]

    // Validate form fields
    const validateField = (name: string, value: string) => {
        switch (name) {
            case "name":
                return value.trim() === "" ? "Name is required" : ""
            case "email":
                return value.trim() === ""
                    ? "Email is required"
                    : !/^\S+@\S+\.\S+$/.test(value)
                        ? "Please enter a valid email"
                        : ""
            case "message":
                return value.trim() === "" ? "Please provide more detail" : ""
            default:
                return ""
        }
    }

    // Validate phone number
    const validatePhoneNumber = (phoneNumber: string) => {
        if (!phoneNumber) {
            return "Phone number is required"
        }

        if (!isValidPhoneNumber(phoneNumber)) {
            return "Please enter a valid phone number"
        }

        return ""
    }

    // Validate file
    const validateFile = (file: File | null, isRequired = true): FileError => {
        const errors: FileError = {}

        // Check if file is required but missing
        if (isRequired && !file) {
            errors.required = "This file is required"
            return errors
        }

        // If no file is provided, return empty errors
        if (!file) {
            return errors
        }

        // Check file size
        if (file.size > MAX_FILE_SIZE) {
            errors.size = `File size exceeds 5MB limit`
        }

        // Check file type
        const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf("."))
        if (!ALLOWED_FILE_TYPES.includes(file.type) || !ALLOWED_FILE_EXTENSIONS.includes(fileExtension)) {
            errors.type = `Only PDF, DOC, and DOCX files are allowed`
        }

        return errors
    }

    // Format file size for display
    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + " bytes"
        else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
        else return (bytes / 1048576).toFixed(1) + " MB"
    }

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        if (touched[name as keyof typeof touched]) {
            setErrors((prev) => ({
                ...prev,
                [name]: validateField(name, value),
            }))
        }
    }

    // Handle phone input change
    const handlePhoneChange = (value: string | undefined) => {
        const phoneValue = value || ""
        setFormData((prev) => ({ ...prev, phone: phoneValue }))

        if (touched.phone) {
            setErrors((prev) => ({
                ...prev,
                phone: validatePhoneNumber(phoneValue),
            }))
        }
    }

    // Handle blur events to validate
    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setTouched((prev) => ({ ...prev, [name]: true }))
        setErrors((prev) => ({
            ...prev,
            [name]: validateField(name, value),
        }))
    }

    // Handle phone input blur
    const handlePhoneBlur = () => {
        setTouched((prev) => ({ ...prev, phone: true }))
        setErrors((prev) => ({
            ...prev,
            phone: validatePhoneNumber(formData.phone),
        }))
    }

    // Handle file uploads
    const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTouched((prev) => ({ ...prev, resume: true }))

        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            const fileErrors = validateFile(file)

            setResumeFile(file)
            setResumeError(fileErrors)
        }
    }

    const handleCoverLetterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTouched((prev) => ({ ...prev, coverLetter: true }))

        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            const fileErrors = validateFile(file)

            setCoverLetterFile(file)
            setCoverLetterError(fileErrors)
        }
    }

    // Trigger file input click
    const triggerResumeUpload = () => {
        setTouched((prev) => ({ ...prev, resume: true }))
        validateResumeFile()

        if (resumeInputRef.current) {
            resumeInputRef.current.click()
        }
    }

    const triggerCoverLetterUpload = () => {
        setTouched((prev) => ({ ...prev, coverLetter: true }))
        validateCoverLetterFile()

        if (coverLetterInputRef.current) {
            coverLetterInputRef.current.click()
        }
    }

    // Validate files explicitly
    const validateResumeFile = () => {
        setResumeError(validateFile(resumeFile))
    }

    const validateCoverLetterFile = () => {
        setCoverLetterError(validateFile(coverLetterFile))
    }

    // Remove file
    const removeResumeFile = () => {
        setResumeFile(null)
        if (touched.resume) {
            setResumeError({ required: "Resume is required" })
        } else {
            setResumeError({})
        }

        if (resumeInputRef.current) {
            resumeInputRef.current.value = ""
        }
    }

    const removeCoverLetterFile = () => {
        setCoverLetterFile(null)
        if (touched.coverLetter) {
            setCoverLetterError({ required: "Cover letter is required" })
        } else {
            setCoverLetterError({})
        }

        if (coverLetterInputRef.current) {
            coverLetterInputRef.current.value = ""
        }
    }

    // Check if there are any file errors
    const hasFileErrors = (): boolean => {
        return Object.keys(resumeError).length > 0 || Object.keys(coverLetterError).length > 0
    }

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Mark all fields as touched
        setTouched({
            name: true,
            email: true,
            phone: true,
            message: true,
            resume: true,
            coverLetter: true,
        })

        // Validate all fields
        const newErrors = {
            name: validateField("name", formData.name),
            email: validateField("email", formData.email),
            message: validateField("message", formData.message),
            phone: validatePhoneNumber(formData.phone),
        }

        // Validate files
        const newResumeError = validateFile(resumeFile)
        const newCoverLetterError = validateFile(coverLetterFile)

        setErrors(newErrors)
        setResumeError(newResumeError)
        setCoverLetterError(newCoverLetterError)

        // Check if there are any errors in form fields or files
        const hasFormErrors = Object.values(newErrors).some((error) => error !== "")
        const hasFileValidationErrors =
            Object.keys(newResumeError).length > 0 || Object.keys(newCoverLetterError).length > 0

        if (!hasFormErrors && !hasFileValidationErrors) {
            // Submit the form - would normally send to server
            console.log("Form submitted:", formData)
            console.log("Resume:", resumeFile)
            console.log("Cover Letter:", coverLetterFile)

            // Reset form after submission
            setFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
            })
            setTouched({
                name: false,
                email: false,
                phone: false,
                message: false,
                resume: false,
                coverLetter: false,
            })
            setResumeFile(null)
            setCoverLetterFile(null)
            setResumeError({})
            setCoverLetterError({})
        }
    }

    return (
        <div className="px-10 py-16">
            <p className="text-5xl mt-8 font-krona">JOIN US</p>
            <p className="mt-8">
                To best help your application, please provide your most recent resume and cover letter below.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="space-y-1">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full"
                        />
                        {touched.name && errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full"
                        />
                        {touched.email && errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                </div>

                {/* Phone Field */}
                <div className="space-y-1">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone
                    </label>
                    <div className="phone-input-container">
                        <PhoneInput
                            international
                            defaultCountry="US"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            onBlur={handlePhoneBlur}
                            className="w-full phone-input bg-white"
                        />
                    </div>
                    {touched.phone && errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {/* Message Field */}
                    <div className="space-y-1">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                            Message
                        </label>
                        <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full min-h-[100px]"
                        />
                        {touched.message && errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                    </div>
                </div>

                {/* File Upload Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                    {/* Resume Upload */}
                    <div className="col-span-1">
                        <div className="flex items-center mb-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Resume <span className="text-red-500">*</span>
                            </label>
                        </div>
                        <button
                            type="button"
                            aria-label="Upload resume"
                            onClick={triggerResumeUpload}
                            className={`bg-white px-4 py-2 w-full ${(touched.resume && !resumeFile) || Object.keys(resumeError).length > 0 ? "border-red-500 border" : ""
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <label className="block font-medium text-[#8E6F00]">Upload Resume</label>
                                <div className="bg-gray-200 py-4 px-8">
                                    <Upload className="" />
                                </div>
                                <input
                                    type="file"
                                    ref={resumeInputRef}
                                    onChange={handleResumeUpload}
                                    className="hidden"
                                    accept=".pdf,.doc,.docx"
                                />
                            </div>
                        </button>

                        {resumeFile && (
                            <div className={`mt-2 ${Object.keys(resumeError).length > 0 ? "text-red-500" : ""}`}>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        {Object.keys(resumeError).length > 0 && <AlertCircle className="h-4 w-4 mr-1 text-red-500" />}
                                        <p className="text-sm truncate max-w-[200px]">{resumeFile.name}</p>
                                    </div>
                                    <button
                                        type="button"
                                        aria-label="Remove resume"
                                        onClick={removeResumeFile}
                                        className="text-gray-700 hover:text-gray-700 text-sm ml-2"
                                    >
                                        Remove
                                    </button>
                                </div>
                                <p className="text-xs text-gray-700">{formatFileSize(resumeFile.size)}</p>

                                {resumeError.size && <p className="text-red-500 text-xs mt-1">{resumeError.size}</p>}
                                {resumeError.type && <p className="text-red-500 text-xs mt-1">{resumeError.type}</p>}
                            </div>
                        )}

                        {!resumeFile && (
                            <>
                                <p className="text-xs text-gray-700 mt-1">Accepted formats: PDF, DOC, DOCX (max 5MB)</p>
                                {touched.resume && resumeError.required && (
                                    <p className="text-red-500 text-xs mt-1">{resumeError.required}</p>
                                )}
                            </>
                        )}
                    </div>

                    {/* Cover Letter Upload */}
                    <div className="col-span-1">
                        <div className="flex items-center mb-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Cover Letter <span className="text-red-500">*</span>
                            </label>
                        </div>
                        <button
                            type="button"
                            aria-label="Upload cover letter"
                            onClick={triggerCoverLetterUpload}
                            className={`bg-white px-4 py-2 w-full ${(touched.coverLetter && !coverLetterFile) || Object.keys(coverLetterError).length > 0
                                ? "border-red-500 border"
                                : ""
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <label className="block font-medium text-[#8E6F00]">Upload Cover Letter</label>
                                <div className="bg-gray-200 py-4 px-8">
                                    <Upload className="" />
                                </div>
                                <input
                                    type="file"
                                    ref={coverLetterInputRef}
                                    onChange={handleCoverLetterUpload}
                                    className="hidden"
                                    accept=".pdf,.doc,.docx"
                                />
                            </div>
                        </button>

                        {coverLetterFile && (
                            <div className={`mt-2 ${Object.keys(coverLetterError).length > 0 ? "text-red-500" : ""}`}>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        {Object.keys(coverLetterError).length > 0 && <AlertCircle className="h-4 w-4 mr-1 text-red-500" />}
                                        <p className="text-sm truncate max-w-[200px]">{coverLetterFile.name}</p>
                                    </div>
                                    <button
                                        aria-label="Remove cover letter"
                                        type="button"
                                        onClick={removeCoverLetterFile}
                                        className="text-gray-700 hover:text-gray-700 text-sm ml-2"
                                    >
                                        Remove
                                    </button>
                                </div>
                                <p className="text-xs text-gray-700">{formatFileSize(coverLetterFile.size)}</p>

                                {coverLetterError.size && <p className="text-red-500 text-xs mt-1">{coverLetterError.size}</p>}
                                {coverLetterError.type && <p className="text-red-500 text-xs mt-1">{coverLetterError.type}</p>}
                            </div>
                        )}

                        {!coverLetterFile && (
                            <>
                                <p className="text-xs text-gray-700 mt-1">Accepted formats: PDF, DOC, DOCX (max 5MB)</p>
                                {touched.coverLetter && coverLetterError.required && (
                                    <p className="text-red-500 text-xs mt-1">{coverLetterError.required}</p>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        aria-label="Submit"
                        className={`w-full lg:w-1/2 inline-flex items-center justify-center p-4  bg-[#414042] hover:bg-[#8E6F00] text-white transition-colors duration-300`}
                    >
                        <span className="mr-2">SUBMIT</span>
                        <MoveRight className="h-5 w-5" />
                    </button>
                </div>
            </form>

            <div className="flex flex-col items-end mt-8">
                <Link href="mailto:info@duttonone.com.au" className="text-3xl text-gray-700">
                    <span>info@duttonone.com.au</span>
                </Link>
                <Link href="tel:+1300341911" className="mt-2 text-5xl font-krona text-gray-700">
                    <span>+1300 341 911</span>
                </Link>
            </div>
        </div>
    )
}

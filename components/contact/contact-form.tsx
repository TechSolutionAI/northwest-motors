"use client"

import { MoveRight } from "lucide-react";
import { useState } from "react";
import { interestOptions } from "@/lib/mock-data";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input"
import "react-phone-number-input/style.css"
import DropdownSelect from "../main/dropdown-select";
import Link from "next/link";

interface ContactFormProps {
    type?: string | null
}
export default function ContactForm({ type }: ContactFormProps) {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        interest: type || "",
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
    })

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

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Validate all fields
        const newErrors = {
            name: validateField("name", formData.name),
            email: validateField("email", formData.email),
            message: validateField("message", formData.message),
            phone: validatePhoneNumber(formData.phone),
        }

        setErrors(newErrors)
        setTouched({
            name: true,
            email: true,
            phone: true,
            message: true,
        })

        // Check if there are any errors
        if (!Object.values(newErrors).some((error) => error !== "")) {
            // Submit the form - would normally send to server
            console.log("Form submitted:", formData)
            // Reset form after submission
            setFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
                interest: "",
            })
            setTouched({
                name: false,
                email: false,
                phone: false,
                message: false,
            })
        }
    }

    return (
        <div className="px-10 py-16">
            <p className="text-5xl mt-8 font-krona">SEND A MESSAGE</p>
            <p className="mt-8">Enquire today and we will get back to you within 24 hours.</p>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Message Field */}
                    <div className="space-y-1">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                            Tell us how we can help
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

                    {/* Interest Dropdown */}
                    <div className="space-y-1">
                        <label htmlFor="interest" className="block text-sm font-medium text-gray-700">
                            I'm interested in
                        </label>
                        <DropdownSelect
                            options={interestOptions}
                            value={formData.interest}
                            onChange={(value) => setFormData((prev) => ({ ...prev, interest: value }))}
                            placeholder="SELECT"
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full lg:w-1/2 inline-flex items-center justify-center p-4 bg-[#414042]  text-white hover:bg-[#8E6F00] transition-colors duration-300"
                    >
                        <span className="mr-2">SUBMIT</span>
                        <MoveRight className="h-5 w-5" />
                    </button>
                </div>
            </form >

            <div className="flex flex-col items-end mt-8">
                <Link
                    href="mailto:info@duttonone.com.au"
                    className="text-3xl text-gray-500">
                    <span>info@duttonone.com.au</span>
                </Link>
                <Link
                    href="tel:+1300341911"
                    className="mt-2 text-5xl font-krona text-gray-500">
                    <span>+1300 341 911</span>
                </Link>
            </div>
        </div >
    );
}
"use client"

import { MoveRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { referralOptions } from "@/lib/mock-data";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input"
import "react-phone-number-input/style.css"
import DropdownSelect from "../main/dropdown-select";

interface EnquireFormProps {
    vehicle: Vehicle;
}

export default function EnquireForm({ vehicle }: EnquireFormProps) {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        referral: "",
        tradeIn: false,
        financing: false,
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

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

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

    // Handle checkbox changes
    const handleCheckboxChange = (name: string, checked: boolean) => {
        setFormData((prev) => ({ ...prev, [name]: checked }))
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

    // Handle referral selection
    const handleReferralSelect = (value: string) => {
        setFormData((prev) => ({ ...prev, referral: value }))
        setIsDropdownOpen(false)
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
                referral: "",
                tradeIn: false,
                financing: false,
            })
            setTouched({
                name: false,
                email: false,
                phone: false,
                message: false,
            })
        }
    }

    // Find the selected referral option label
    const selectedReferral = referralOptions.find((option) => option.value === formData.referral)?.label || "SELECT"

    return (
        <div className="px-10 py-16">
            <Image
                src={vehicle.image || "/car-placeholder.png"}
                alt={`${vehicle.make} ${vehicle.model}`}
                width={300}
                height={300}
                className="object-cover"
                priority
            />
            <h1 className="mt-8 text-4xl font-krona text-gray-500">ENQUIRE NOW</h1>
            <p className="mt-8 text-gray-600">Enquire about this specific car today! Leave us a message and one of our specialists will get the wheels rolling for you!
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
                            className="w-full phone-input"
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

                    {/* Referral Dropdown */}
                    <div className="space-y-1">
                        <label htmlFor="referral" className="block text-sm font-medium text-gray-700">
                            How did you here about us
                        </label>
                        <DropdownSelect
                            options={referralOptions}
                            value={formData.referral}
                            onChange={(value) => setFormData((prev) => ({ ...prev, referral: value }))}
                            placeholder="SELECT"
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Checkboxes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start">
                        <Checkbox
                            id="tradeIn"
                            checked={formData.tradeIn}
                            onCheckedChange={(checked: boolean) => handleCheckboxChange("tradeIn", checked === true)}
                            className="h-5 w-5 mt-0.5 border-gray-300 text-[#8E6F00]"
                        />
                        <label htmlFor="tradeIn" className="ml-2 text-sm text-gray-700">
                            I have a vehicle that I want to trade in
                        </label>
                    </div>

                    <div className="flex items-start">
                        <Checkbox
                            id="financing"
                            checked={formData.financing}
                            onCheckedChange={(checked: boolean) => handleCheckboxChange("financing", checked === true)}
                            className="h-5 w-5 mt-0.5 border-gray-300 text-[#8E6F00]"
                        />
                        <label htmlFor="financing" className="ml-2 text-sm text-gray-700">
                            I'm interested in financing
                        </label>
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
        </div >
    );
}
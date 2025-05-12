"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { MoveLeft, MoveRight } from "lucide-react"
import DropdownSelect from "@/components/main/dropdown-select"
import { makeOptions, modelOptions, carTypeOptions } from "@/lib/mock-data"

interface FormData {
    budget: string
    carType: string
    carMake: string
    carModel: string
    features: string
    color: string
    financing: string
    tradeIn: string
    timeline: string
    name: string
    email: string
    phone: string
    contactPreference: string
    comments: string
}

interface FormErrors {
    budget?: string
    carType?: string
    carMake?: string
    carModel?: string
    features?: string
    color?: string
    financing?: string
    tradeIn?: string
    timeline?: string
    name?: string
    email?: string
    phone?: string
    contactPreference?: string
}

export default function FormConcierge() {
    const router = useRouter()

    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState<FormData>({
        budget: "",
        carType: "",
        carMake: "",
        carModel: "",
        features: "",
        color: "",
        financing: "no",
        tradeIn: "no",
        timeline: "1month",
        name: "",
        email: "",
        phone: "",
        contactPreference: "email",
        comments: "",
    })

    const [formErrors, setFormErrors] = useState<FormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    // Validate a specific field
    const validateField = (name: string, value: string): string | undefined => {
        switch (name) {
            case "budget":
                return value.trim() === "" ? "Budget is required" : undefined
            case "carType":
                return value.trim() === "" ? "Car type is required" : undefined
            case "carMake":
                return value.trim() === "" ? "Car make is required" : undefined
            case "carModel":
                return value.trim() === "" ? "Car model is required" : undefined
            case "name":
                return value.trim() === "" ? "Name is required" : undefined
            case "email":
                if (value.trim() === "") return "Email is required"
                if (!/^\S+@\S+\.\S+$/.test(value)) return "Invalid email format"
                return undefined
            case "phone":
                if (value.trim() === "") return "Phone number is required"
                if (!/^\d{10}$/.test(value.replace(/\D/g, ""))) return "Phone should be 10 digits"
                return undefined
            case "contactPreference":
                return value.trim() === "" ? "Contact preference is required" : undefined
            default:
                return undefined
        }
    }

    // Handle field change with real-time validation
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        setFormData((prev) => ({ ...prev, [name]: value }))

        // Real-time validation
        const error = validateField(name, value)
        setFormErrors((prev) => ({
            ...prev,
            [name]: error,
        }))
    }

    // Handle select change
    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }))

        // Clear model if make changes
        if (name === "carMake") {
            setFormData((prev) => ({ ...prev, carModel: "" }))
        }

        // Real-time validation
        const error = validateField(name, value)
        setFormErrors((prev) => ({
            ...prev,
            [name]: error,
        }))
    }

    // Handle radio button change
    const handleRadioChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Validate current step
    const validateStep = (step: number): boolean => {
        const errors: FormErrors = {}
        let isValid = true

        if (step === 1) {
            // Validate step 1 fields
            if (!formData.budget) {
                errors.budget = "Budget is required"
                isValid = false
            }
            if (!formData.carType) {
                errors.carType = "Car type is required"
                isValid = false
            }
            if (!formData.carMake) {
                errors.carMake = "Car make is required"
                isValid = false
            }
            if (!formData.carModel) {
                errors.carModel = "Car model is required"
                isValid = false
            }
        } else if (step === 2) {
            // Validate step 2 fields
            if (!formData.name) {
                errors.name = "Name is required"
                isValid = false
            }
            if (!formData.email) {
                errors.email = "Email is required"
                isValid = false
            } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
                errors.email = "Invalid email format"
                isValid = false
            }
            if (!formData.phone) {
                errors.phone = "Phone number is required"
                isValid = false
            } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
                errors.phone = "Phone should be 10 digits"
                isValid = false
            }
            if (!formData.contactPreference) {
                errors.contactPreference = "Contact preference is required"
                isValid = false
            }
        }

        setFormErrors(errors)
        return isValid
    }

    // Handle continue to next step
    const handleContinue = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateStep(currentStep)) {
            if (currentStep < 3) {
                setCurrentStep(currentStep + 1)
            }
        }
    }

    // Handle back to previous step
    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (validateStep(currentStep)) {
            setIsSubmitting(true)

            // Simulate API call
            try {
                await new Promise((resolve) => setTimeout(resolve, 1500))
                setIsSubmitted(true)
                // In a real app, you would submit the form data to your API here
                console.log("Form submitted:", formData)
            } catch (error) {
                console.error("Error submitting form:", error)
            } finally {
                setIsSubmitting(false)
            }
        }
    }

    // Reset form
    const handleReset = () => {
        setFormData({
            budget: "",
            carType: "",
            carMake: "",
            carModel: "",
            features: "",
            color: "",
            financing: "no",
            tradeIn: "no",
            timeline: "1month",
            name: "",
            email: "",
            phone: "",
            contactPreference: "email",
            comments: "",
        })
        setFormErrors({})
        setCurrentStep(1)
        setIsSubmitted(false)
    }

    // If form is submitted successfully, show thank you message
    if (isSubmitted) {
        return (
            <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
                <div className="text-center py-10">
                    <h2 className="text-3xl font-bold text-primary mb-4">Thank You!</h2>
                    <p className="text-lg mb-6">
                        Your concierge request has been submitted successfully. Our team will contact you shortly to discuss your
                        dream car preferences.
                    </p>
                    <Button onClick={handleReset} className="mt-4" aria-label="Submit Another Request">
                        Submit Another Request
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-primary">CONCIERGE</h2>
                <p className="mt-2">
                    Let us know your preferences & how best to reach you by filling out our online form
                </p>
            </div>

            {/* Progress indicator */}
            <div className="flex justify-between mb-8">
                {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                        <div
                            className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center font-bold",
                                currentStep === step
                                    ? "bg-primary text-white"
                                    : currentStep > step
                                        ? "bg-[#8E6F00] text-white"
                                        : "bg-gray-200 text-gray-700",
                            )}
                        >
                            {step}
                        </div>
                        <div className="ml-2">
                            <span className={cn("text-sm font-medium", currentStep === step ? "text-primary" : "text-gray-700")}>
                                {step === 1 ? "Car Details" : step === 2 ? "Contact Info" : "Review"}
                            </span>
                        </div>
                        {step < 3 && <div className="mx-2 border-t border-gray-300 w-8"></div>}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit}>
                {/* Step 1: Car Details */}
                {currentStep === 1 && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="budget" className="text-base">
                                    What's your budget? ($)
                                </Label>
                                <Input
                                    id="budget"
                                    name="budget"
                                    type="text"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    className={cn(formErrors.budget && "border-red-500")}
                                />
                                {formErrors.budget && <p className="text-red-500 text-sm mt-1">{formErrors.budget}</p>}
                            </div>

                            <div>
                                <Label htmlFor="carType" className="text-base">
                                    What type of car are you looking for?
                                </Label>
                                <DropdownSelect
                                    options={carTypeOptions}
                                    value={formData.carType}
                                    onChange={(value) => handleSelectChange("carType", value)}
                                    placeholder="Select car type"
                                    className={cn(formErrors.carType && "border-red-500")}
                                />
                                {formErrors.carType && <p className="text-red-500 text-sm mt-1">{formErrors.carType}</p>}
                            </div>

                            <div>
                                <Label htmlFor="carMake" className="text-base">
                                    What make of car are you interested in?
                                </Label>
                                <DropdownSelect
                                    options={makeOptions}
                                    value={formData.carMake}
                                    onChange={(value) => handleSelectChange("carMake", value)}
                                    placeholder="Select car make"
                                    className={cn(formErrors.carMake && "border-red-500")}
                                />
                                {formErrors.carMake && <p className="text-red-500 text-sm mt-1">{formErrors.carMake}</p>}
                            </div>

                            <div>
                                <Label htmlFor="carModel" className="text-base">
                                    What model of car are you interested in?
                                </Label>
                                <DropdownSelect
                                    options={modelOptions}
                                    value={formData.carModel}
                                    onChange={(value) => handleSelectChange("carModel", value)}
                                    placeholder={formData.carMake ? "Select car model" : "Select make first"}
                                    className={cn(formErrors.carModel && "border-red-500")}
                                />
                                {formErrors.carModel && <p className="text-red-500 text-sm mt-1">{formErrors.carModel}</p>}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="features" className="text-base">
                                Do you have any specific features or options that you want in your dream car?
                            </Label>
                            <Textarea id="features" name="features" value={formData.features} onChange={handleChange} rows={3} />
                        </div>

                        <div>
                            <Label htmlFor="color" className="text-base">
                                Do you have a preferred color for your dream car?
                            </Label>
                            <Input id="color" name="color" type="text" value={formData.color} onChange={handleChange} />
                        </div>

                        <div>
                            <Label className="text-base">Would you be interested in financing options for your dream car?</Label>
                            <RadioGroup
                                value={formData.financing}
                                onValueChange={(value: any) => handleRadioChange("financing", value)}
                                className="flex space-x-4 mt-2"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="yes" id="financing-yes" />
                                    <Label htmlFor="financing-yes">Yes</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="no" id="financing-no" />
                                    <Label htmlFor="financing-no">No</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div>
                            <Label className="text-base">
                                Do you have a trade-in vehicle that you would like to use as part of the transaction?
                            </Label>
                            <RadioGroup
                                value={formData.tradeIn}
                                onValueChange={(value: any) => handleRadioChange("tradeIn", value)}
                                className="flex space-x-4 mt-2"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="yes" id="trade-in-yes" />
                                    <Label htmlFor="trade-in-yes">Yes</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="no" id="trade-in-no" />
                                    <Label htmlFor="trade-in-no">No</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div>
                            <Label className="text-base">
                                Is there a specific timeline for when you would like to purchase your dream car?
                            </Label>
                            <RadioGroup
                                value={formData.timeline}
                                onValueChange={(value: any) => handleRadioChange("timeline", value)}
                                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="now" id="timeline-now" />
                                    <Label htmlFor="timeline-now">Now</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="1month" id="timeline-1month" />
                                    <Label htmlFor="timeline-1month">1 month</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="2months" id="timeline-2months" />
                                    <Label htmlFor="timeline-2months">2 months</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="3months" id="timeline-3months" />
                                    <Label htmlFor="timeline-3months">3 months</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                )}

                {/* Step 2: Contact Information */}
                {currentStep === 2 && (
                    <div className="space-y-6">
                        <div>
                            <Label htmlFor="name" className="text-base">
                                Full Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                className={cn(formErrors.name && "border-red-500")}
                            />
                            {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                        </div>

                        <div>
                            <Label htmlFor="email" className="text-base">
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={cn(formErrors.email && "border-red-500")}
                            />
                            {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                        </div>

                        <div>
                            <Label htmlFor="phone" className="text-base">
                                Phone Number
                            </Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                className={cn(formErrors.phone && "border-red-500")}
                            />
                            {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                        </div>

                        <div>
                            <Label className="text-base">Preferred Contact Method</Label>
                            <RadioGroup
                                value={formData.contactPreference}
                                onValueChange={(value: any) => handleRadioChange("contactPreference", value)}
                                className="flex space-x-4 mt-2"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="email" id="contact-email" />
                                    <Label htmlFor="contact-email">Email</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="phone" id="contact-phone" />
                                    <Label htmlFor="contact-phone">Phone</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="text" id="contact-text" />
                                    <Label htmlFor="contact-text">Text</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div>
                            <Label htmlFor="comments" className="text-base">
                                Additional Comments or Questions
                            </Label>
                            <Textarea id="comments" name="comments" value={formData.comments} onChange={handleChange} rows={4} />
                        </div>
                    </div>
                )}

                {/* Step 3: Review Information */}
                {currentStep === 3 && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold">Review Your Information</h3>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-lg mb-3">Car Details</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-700">Budget</p>
                                    <p className="font-medium">${formData.budget}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-700">Car Type</p>
                                    <p className="font-medium">{formData.carType}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-700">Make</p>
                                    <p className="font-medium">{formData.carMake}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-700">Model</p>
                                    <p className="font-medium">{formData.carModel}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-700">Preferred Color</p>
                                    <p className="font-medium">{formData.color || "No preference"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-700">Timeline</p>
                                    <p className="font-medium">{formData.timeline}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-700">Financing Interest</p>
                                    <p className="font-medium">{formData.financing}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-700">Trade-in Vehicle</p>
                                    <p className="font-medium">{formData.tradeIn}</p>
                                </div>
                            </div>

                            {formData.features && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-700">Desired Features</p>
                                    <p className="font-medium">{formData.features}</p>
                                </div>
                            )}
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-lg mb-3">Contact Information</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-700">Name</p>
                                    <p className="font-medium">{formData.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-700">Email</p>
                                    <p className="font-medium">{formData.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-700">Phone</p>
                                    <p className="font-medium">{formData.phone}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-700">Preferred Contact</p>
                                    <p className="font-medium">{formData.contactPreference}</p>
                                </div>
                            </div>

                            {formData.comments && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-700">Additional Comments</p>
                                    <p className="font-medium">{formData.comments}</p>
                                </div>
                            )}
                        </div>

                        <div className="text-sm text-gray-700">
                            <p>
                                By submitting this form, you agree to be contacted by our concierge team regarding your vehicle
                                preferences.
                            </p>
                        </div>
                    </div>
                )}

                {/* Navigation buttons */}
                <div className="flex justify-between mt-8">
                    {currentStep > 1 ? (
                        <Button aria-label="Back" type="button" variant="outline" className="hover:bg-[#8E6F00] hover:text-white" onClick={handleBack}>
                            <MoveLeft className="mr-1 h-4 w-4" /> Back
                        </Button>
                    ) : (
                        <div></div> // Empty div to maintain flex spacing
                    )}

                    {currentStep < 3 ? (
                        <Button
                            type="button"
                            aria-label="Next"
                            onClick={handleContinue}
                            className="hover:bg-[#8E6F00] text-white font-medium px-6 py-2 rounded-md"
                        >
                            Next <MoveRight className="ml-1 h-4 w-4" />
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            aria-label="Submit"
                            className="hover:bg-[#8E6F00] text-white font-medium px-6 py-2 rounded-md"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit Request"}
                        </Button>
                    )}
                </div>
            </form>

            {/* Step indicator */}
            <div className="flex justify-center mt-8">
                <div className="text-sm text-gray-700">Step {currentStep} of 3</div>
            </div>
        </div>
    )
}

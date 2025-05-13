"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { MoveRight, Upload, Pencil, X, MoveLeft } from "lucide-react"
import { colourOptions, vehicleData, yearOptions } from "@/lib/mock-data"
import DropdownSelect from "../main/dropdown-select"
import { US_STATES } from "@/lib/cosntants"

export function SellForm() {
    const [currentStep, setCurrentStep] = useState(1)
    const [expandedSection, setExpandedSection] = useState(1)
    const [entryMethod, setEntryMethod] = useState("make-model")
    const [selectedYear, setSelectedYear] = useState("")
    const [selectedMake, setSelectedMake] = useState("")
    const [selectedModel, setSelectedModel] = useState("")
    const [selectedTrim, setSelectedTrim] = useState("")
    const [selectedDrivetrain, setSelectedDrivetrain] = useState("")
    const [keyCount, setKeyCount] = useState<string>("")
    const [loanStatus, setLoanStatus] = useState<string>("")

    const [lienHolder, setLienHolder] = useState<string>("")
    const [remainingBalance, setRemainingBalance] = useState<string>("")

    // License Plate and VIN state
    const [licensePlate, setLicensePlate] = useState<string>("")
    const [licensePlateState, setLicensePlateState] = useState<string>("")
    const [vinNumber, setVinNumber] = useState<string>("")

    const [mileage, setMileage] = useState<string>("")
    const [postalCode, setPostalCode] = useState<string>("")
    const [exteriorColor, setExteriorColor] = useState<string>("")
    const [interiorColor, setInteriorColor] = useState<string>("")

    // History & Condition state
    const [vehicleCondition, setVehicleCondition] = useState<string>("")
    const [hasCleanTitle, setHasCleanTitle] = useState<string>("")
    const [doesRun, setDoesRun] = useState<string>("")
    const [hasBeenInAccident, setHasBeenInAccident] = useState<string>("")
    const [hasWarningLights, setHasWarningLights] = useState<string>("")
    const [hasBeenSmoked, setHasBeenSmoked] = useState<string>("")
    const [damageTypes, setDamageTypes] = useState<string[]>([])

    // Photos state
    const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([])

    // Contact Information state
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [contactPreference, setContactPreference] = useState<string>("email")
    const [questions, setQuestions] = useState<string>("")

    const [formErrors, setFormErrors] = useState<{
        mileage?: string
        postalCode?: string
        exteriorColor?: string
        interiorColor?: string
        keyCount?: string
        loanStatus?: string
        lienHolder?: string
        remainingBalance?: string
        vehicleCondition?: string
        hasCleanTitle?: string
        doesRun?: string
        hasBeenInAccident?: string
        hasWarningLights?: string
        hasBeenSmoked?: string
        firstName?: string
        lastName?: string
        email?: string
        phone?: string
        contactPreference?: string
        photos?: string
        licensePlate?: string
        licensePlateState?: string
        vinNumber?: string
    }>({})

    const [isSubmitted, setIsSubmitted] = useState(false)

    // Validate individual field and update errors
    const validateField = (field: string, value: any): string | undefined => {
        switch (field) {
            case "licensePlate":
                if (!value.trim()) return "License plate number is required"
                if (!/^[A-Za-z0-9]{1,8}$/.test(value.trim())) return "Please enter a valid license plate number"
                break
            case "licensePlateState":
                if (!value) return "State is required"
                break
            case "vinNumber":
                if (!value.trim()) return "VIN number is required"
                if (!/^[A-HJ-NPR-Za-hj-npr-z0-9]{17}$/.test(value.trim())) return "Please enter a valid 17-character VIN"
                break
            case "mileage":
                if (!value) return "Mileage is required"
                if (Number.parseInt(value) < 0) return "Mileage cannot be negative"
                break
            case "postalCode":
                if (!value) return "Postal code is required"
                if (!/^\d{5}$/.test(value)) return "Postal code must be 5 digits"
                break
            case "exteriorColor":
                if (!value) return "Exterior color is required"
                break
            case "interiorColor":
                if (!value) return "Interior color is required"
                break
            case "keyCount":
                if (!value) return "Please select how many keys you have"
                break
            case "loanStatus":
                if (!value) return "Please select your loan status"
                break
            case "lienHolder":
                if ((loanStatus === "loan" || loanStatus === "lease") && !value)
                    return "Please enter the name of the bank or dealership"
                break
            case "remainingBalance":
                if ((loanStatus === "loan" || loanStatus === "lease") && !value) return "Please enter the remaining balance"
                break
            case "vehicleCondition":
                if (!value) return "Please rate your vehicle's condition"
                break
            case "hasCleanTitle":
                if (!value) return "Please indicate if the vehicle has a clean title"
                break
            case "doesRun":
                if (!value) return "Please indicate if the vehicle runs and drives"
                break
            case "hasBeenInAccident":
                if (!value) return "Please indicate if the vehicle has been in an accident"
                break
            case "hasWarningLights":
                if (!value) return "Please indicate if there are any active warning lights"
                break
            case "hasBeenSmoked":
                if (!value) return "Please indicate if the vehicle has been smoked in"
                break
            case "firstName":
                if (!value.trim()) return "First name is required"
                break
            case "lastName":
                if (!value.trim()) return "Last name is required"
                break
            case "email":
                if (!value.trim()) return "Email address is required"
                if (!/\S+@\S+\.\S+/.test(value)) return "Please enter a valid email address"
                break
            case "phone":
                if (!value.trim()) return "Phone number is required"
                if (!/^($$\d{3}$$ \d{3}-\d{4}|\d{10})$/.test(value.replace(/\D/g, "")))
                    return "Please enter a valid phone number"
                break
            case "contactPreference":
                if (!value) return "Please select a contact preference"
                break
            case "photos":
                if (uploadedPhotos.length === 0) return "Please upload at least one photo of your vehicle"
                break
        }
        return undefined
    }

    // Get available models based on selected make
    const availableModels =
        selectedMake && vehicleData.models[selectedMake as keyof typeof vehicleData.models]
            ? vehicleData.models[selectedMake as keyof typeof vehicleData.models]
            : []

    // Get available trims based on selected model
    const availableTrims =
        selectedModel && vehicleData.trims[selectedModel as keyof typeof vehicleData.trims]
            ? vehicleData.trims[selectedModel as keyof typeof vehicleData.trims]
            : []

    // Get available drivetrains based on selected model
    const availableDrivetrains =
        selectedModel &&
            vehicleData.drivetrains &&
            vehicleData.drivetrains[selectedModel as keyof typeof vehicleData.drivetrains]
            ? vehicleData.drivetrains[selectedModel as keyof typeof vehicleData.drivetrains]
            : []

    // Determine if we should show the detailed form
    const shouldShowForm =
        selectedDrivetrain ||
        (selectedTrim && availableDrivetrains.length === 0) ||
        (selectedModel && availableTrims.length === 0)

    const handleLicensePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setLicensePlate(value)
        setFormErrors((prev) => ({
            ...prev,
            licensePlate: validateField("licensePlate", value),
        }))
    }

    const handleLicensePlateStateChange = (value: string) => {
        setLicensePlateState(value)
        setFormErrors((prev) => ({
            ...prev,
            licensePlateState: validateField("licensePlateState", value),
        }))
    }

    const handleVinNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toUpperCase()
        setVinNumber(value)
        setFormErrors((prev) => ({
            ...prev,
            vinNumber: validateField("vinNumber", value),
        }))
    }

    const handleMileageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setMileage(value)
        setFormErrors((prev) => ({
            ...prev,
            mileage: validateField("mileage", value),
        }))
    }

    const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^\d]/g, "").slice(0, 5)
        setPostalCode(value)
        setFormErrors((prev) => ({
            ...prev,
            postalCode: validateField("postalCode", value),
        }))
    }

    const handleExteriorColorChange = (value: string) => {
        setExteriorColor(value)
        setFormErrors((prev) => ({
            ...prev,
            exteriorColor: validateField("exteriorColor", value),
        }))
    }

    const handleInteriorColorChange = (value: string) => {
        setInteriorColor(value)
        setFormErrors((prev) => ({
            ...prev,
            interiorColor: validateField("interiorColor", value),
        }))
    }

    const handleKeyCountChange = (value: string) => {
        setKeyCount(value)
        setFormErrors((prev) => ({
            ...prev,
            keyCount: validateField("keyCount", value),
        }))
    }

    const handleLoanStatusChange = (value: string) => {
        setLoanStatus(value)
        setFormErrors((prev) => ({
            ...prev,
            loanStatus: validateField("loanStatus", value),
        }))

        // Clear lienHolder and remainingBalance errors if "none" is selected
        if (value === "none") {
            setFormErrors((prev) => ({
                ...prev,
                lienHolder: undefined,
                remainingBalance: undefined,
            }))
        }
    }

    const handleLienHolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setLienHolder(value)
        setFormErrors((prev) => ({
            ...prev,
            lienHolder: validateField("lienHolder", value),
        }))
    }

    const handleRemainingBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^\d.]/g, "")
        setRemainingBalance(value)
        setFormErrors((prev) => ({
            ...prev,
            remainingBalance: validateField("remainingBalance", value),
        }))
    }

    // Vehicle condition handlers
    const handleVehicleConditionChange = (value: string) => {
        setVehicleCondition(value)
        setFormErrors((prev) => ({
            ...prev,
            vehicleCondition: validateField("vehicleCondition", value),
        }))
    }

    const handleCleanTitleChange = (value: string) => {
        setHasCleanTitle(value)
        setFormErrors((prev) => ({
            ...prev,
            hasCleanTitle: validateField("hasCleanTitle", value),
        }))
    }

    const handleDoesRunChange = (value: string) => {
        setDoesRun(value)
        setFormErrors((prev) => ({
            ...prev,
            doesRun: validateField("doesRun", value),
        }))
    }

    const handleAccidentHistoryChange = (value: string) => {
        setHasBeenInAccident(value)
        setFormErrors((prev) => ({
            ...prev,
            hasBeenInAccident: validateField("hasBeenInAccident", value),
        }))
    }

    const handleWarningLightsChange = (value: string) => {
        setHasWarningLights(value)
        setFormErrors((prev) => ({
            ...prev,
            hasWarningLights: validateField("hasWarningLights", value),
        }))
    }

    const handleSmokedInChange = (value: string) => {
        setHasBeenSmoked(value)
        setFormErrors((prev) => ({
            ...prev,
            hasBeenSmoked: validateField("hasBeenSmoked", value),
        }))
    }

    // Contact information handlers
    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setFirstName(value)
        setFormErrors((prev) => ({
            ...prev,
            firstName: validateField("firstName", value),
        }))
    }

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setLastName(value)
        setFormErrors((prev) => ({
            ...prev,
            lastName: validateField("lastName", value),
        }))
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setEmail(value)
        setFormErrors((prev) => ({
            ...prev,
            email: validateField("email", value),
        }))
    }

    const handleContactPreferenceChange = (value: string) => {
        setContactPreference(value)
        setFormErrors((prev) => ({
            ...prev,
            contactPreference: validateField("contactPreference", value),
        }))
    }

    const handleContinue = () => {
        if (expandedSection === 1) {
            if (entryMethod === "license-plate") {
                // Validate license plate
                const errors: {
                    licensePlate?: string
                    licensePlateState?: string
                } = {}

                if (!licensePlate.trim()) {
                    errors.licensePlate = "License plate number is required"
                } else if (!/^[A-Za-z0-9]{1,8}$/.test(licensePlate.trim())) {
                    errors.licensePlate = "Please enter a valid license plate number"
                }

                if (!licensePlateState) {
                    errors.licensePlateState = "State is required"
                }

                setFormErrors(errors)

                // Only proceed if there are no errors
                if (Object.keys(errors).length === 0) {
                    const nextSection = 2
                    setCurrentStep(nextSection)
                    setExpandedSection(nextSection)
                }
            } else if (entryMethod === "vin") {
                // Validate VIN
                const errors: {
                    vinNumber?: string
                } = {}

                if (!vinNumber.trim()) {
                    errors.vinNumber = "VIN number is required"
                } else if (!/^[A-HJ-NPR-Za-hj-npr-z0-9]{17}$/.test(vinNumber.trim())) {
                    errors.vinNumber = "Please enter a valid 17-character VIN"
                }

                setFormErrors(errors)

                // Only proceed if there are no errors
                if (Object.keys(errors).length === 0) {
                    const nextSection = 2
                    setCurrentStep(nextSection)
                    setExpandedSection(nextSection)
                }
            } else if (shouldShowForm) {
                // Validate form inputs for step 1
                const errors: {
                    mileage?: string
                    postalCode?: string
                    exteriorColor?: string
                    interiorColor?: string
                    keyCount?: string
                    loanStatus?: string
                    lienHolder?: string
                    remainingBalance?: string
                } = {}

                // Validate mileage
                if (!mileage) {
                    errors.mileage = "Mileage is required"
                } else if (Number.parseInt(mileage) < 0) {
                    errors.mileage = "Mileage cannot be negative"
                }

                // Validate postal code
                if (!postalCode) {
                    errors.postalCode = "Postal code is required"
                } else if (!/^\d{5}$/.test(postalCode)) {
                    errors.postalCode = "Postal code must be 5 digits"
                }

                // Validate exterior color
                if (!exteriorColor) {
                    errors.exteriorColor = "Exterior color is required"
                }

                // Validate interior color
                if (!interiorColor) {
                    errors.interiorColor = "Interior color is required"
                }

                // Validate key count
                if (!keyCount) {
                    errors.keyCount = "Please select how many keys you have"
                }

                // Validate loan status
                if (!loanStatus) {
                    errors.loanStatus = "Please select your loan status"
                }

                // Validate lien holder if loan or lease is selected
                if ((loanStatus === "loan" || loanStatus === "lease") && !lienHolder) {
                    errors.lienHolder = "Please enter the name of the bank or dealership"
                }

                // Validate remaining balance if loan or lease is selected
                if ((loanStatus === "loan" || loanStatus === "lease") && !remainingBalance) {
                    errors.remainingBalance = "Please enter the remaining balance"
                }

                setFormErrors(errors)

                // Only proceed if there are no errors
                if (Object.keys(errors).length === 0) {
                    const nextSection = 2
                    setCurrentStep(nextSection)
                    setExpandedSection(nextSection)
                }
            }
        } else if (expandedSection === 2) {
            // Validate form inputs for step 2
            const errors: {
                vehicleCondition?: string
                hasCleanTitle?: string
                doesRun?: string
                hasBeenInAccident?: string
                hasWarningLights?: string
                hasBeenSmoked?: string
            } = {}

            // Validate vehicle condition
            if (!vehicleCondition) {
                errors.vehicleCondition = "Please rate your vehicle's condition"
            }

            // Validate clean title
            if (!hasCleanTitle) {
                errors.hasCleanTitle = "Please indicate if the vehicle has a clean title"
            }

            // Validate if vehicle runs
            if (!doesRun) {
                errors.doesRun = "Please indicate if the vehicle runs and drives"
            }

            // Validate accident history
            if (!hasBeenInAccident) {
                errors.hasBeenInAccident = "Please indicate if the vehicle has been in an accident"
            }

            // Validate warning lights
            if (!hasWarningLights) {
                errors.hasWarningLights = "Please indicate if there are any active warning lights"
            }

            // Validate smoking history
            if (!hasBeenSmoked) {
                errors.hasBeenSmoked = "Please indicate if the vehicle has been smoked in"
            }

            setFormErrors(errors)

            // Only proceed if there are no errors
            if (Object.keys(errors).length === 0) {
                const nextSection = 3
                setCurrentStep(nextSection)
                setExpandedSection(nextSection)
            }
        } else if (expandedSection === 3) {
            // Validate photos
            const errors: {
                photos?: string
            } = {}

            // Validate that at least one photo is uploaded
            if (uploadedPhotos.length === 0) {
                errors.photos = "Please upload at least one photo of your vehicle"
            }

            setFormErrors(errors)

            // Only proceed if there are no errors
            if (Object.keys(errors).length === 0) {
                const nextSection = 4
                setCurrentStep(nextSection)
                setExpandedSection(nextSection)
            }
        } else if (expandedSection === 4) {
            // Validate contact information
            const errors: {
                firstName?: string
                lastName?: string
                email?: string
                phone?: string
                contactPreference?: string
            } = {}

            // Validate first name
            if (!firstName.trim()) {
                errors.firstName = "First name is required"
            }

            // Validate last name
            if (!lastName.trim()) {
                errors.lastName = "Last name is required"
            }

            // Validate email
            if (!email.trim()) {
                errors.email = "Email address is required"
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                errors.email = "Please enter a valid email address"
            }

            // Validate phone
            if (!phone.trim()) {
                errors.phone = "Phone number is required"
            } else if (!/^($$\d{3}$$ \d{3}-\d{4}|\d{10})$/.test(phone.replace(/\D/g, ""))) {
                errors.phone = "Please enter a valid phone number"
            }

            // Validate contact preference
            if (!contactPreference) {
                errors.contactPreference = "Please select a contact preference"
            }

            setFormErrors(errors)

            // Only proceed if there are no errors
            if (Object.keys(errors).length === 0) {
                // Submit the form or move to a confirmation step
                setIsSubmitted(true)
                alert("Form submitted successfully!")
            }
        } else {
            // For any other case, move to the next step and expand that section
            const nextSection = expandedSection + 1
            setCurrentStep(nextSection)
            setExpandedSection(nextSection)
        }
    }

    const resetVehicleSelection = () => {
        setSelectedYear("")
        setSelectedMake("")
        setSelectedModel("")
        setSelectedTrim("")
        setSelectedDrivetrain("")
    }

    const toggleDamageType = (value: string) => {
        setDamageTypes((prev) => {
            if (prev.includes(value)) {
                return prev.filter((item) => item !== value)
            } else {
                return [...prev, value]
            }
        })
    }

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files)
            const updatedPhotos = [...uploadedPhotos, ...newFiles]
            setUploadedPhotos(updatedPhotos)

            // Clear photo error if photos are uploaded
            if (updatedPhotos.length > 0) {
                setFormErrors((prev) => ({
                    ...prev,
                    photos: undefined,
                }))
            }
        }
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "")
        if (value.length <= 10) {
            let formattedValue = value
            if (value.length > 3) {
                formattedValue = `(${value.slice(0, 3)}) ${value.slice(3)}`
                if (value.length > 6) {
                    formattedValue = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`
                }
            }
            setPhone(formattedValue)

            // Validate phone
            setFormErrors((prev) => ({
                ...prev,
                phone: validateField("phone", formattedValue),
            }))
        }
    }

    const resetAllFields = () => {
        // Reset vehicle selection
        resetVehicleSelection()

        // Reset license plate and VIN
        setLicensePlate("")
        setLicensePlateState("")
        setVinNumber("")

        // Reset vehicle details
        setMileage("")
        setPostalCode("")
        setExteriorColor("")
        setInteriorColor("")
        setKeyCount("")
        setLoanStatus("")
        setLienHolder("")
        setRemainingBalance("")

        // Reset history & condition
        setVehicleCondition("")
        setHasCleanTitle("")
        setDoesRun("")
        setHasBeenInAccident("")
        setHasWarningLights("")
        setHasBeenSmoked("")
        setDamageTypes([])

        // Reset photos
        setUploadedPhotos([])

        // Reset contact information
        setFirstName("")
        setLastName("")
        setEmail("")
        setPhone("")
        setContactPreference("email")
        setQuestions("")

        // Reset form errors
        setFormErrors({})

        // Reset steps
        setCurrentStep(1)
        setExpandedSection(1)
        setEntryMethod("make-model")
    }

    const renderVehicleDetailsForm = () => {
        if (!shouldShowForm) return null

        return (
            <div className="mt-6 border-t border-border pt-6">
                <h4 className="text-lg font-medium mb-4">
                    {selectedYear} {selectedMake} {selectedModel} {selectedTrim} {selectedDrivetrain && `(${selectedDrivetrain})`}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Exact Mileage <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            className={`w-full p-2 border ${formErrors.mileage ? "border-red-500" : "border-border"} rounded-md`}
                            placeholder="Exact Mileage"
                            value={mileage}
                            onChange={handleMileageChange}
                            min="0"
                            required
                        />
                        {formErrors.mileage && <p className="text-red-500 text-xs mt-1">{formErrors.mileage}</p>}
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Postal Code <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className={`w-full p-2 border ${formErrors.postalCode ? "border-red-500" : "border-border"} rounded-md`}
                            placeholder="_____"
                            value={postalCode}
                            onChange={handlePostalCodeChange}
                            maxLength={5}
                            required
                        />
                        {formErrors.postalCode && <p className="text-red-500 text-xs mt-1">{formErrors.postalCode}</p>}
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Exterior Color <span className="text-red-500">*</span>
                        </label>
                        <DropdownSelect
                            options={colourOptions}
                            value={exteriorColor}
                            onChange={handleExteriorColorChange}
                            placeholder="[Select]"
                            className={formErrors.exteriorColor ? "border-red-500" : ""}
                        />
                        {formErrors.exteriorColor && <p className="text-red-500 text-xs mt-1">{formErrors.exteriorColor}</p>}
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Interior Color <span className="text-red-500">*</span>
                        </label>
                        <DropdownSelect
                            options={colourOptions}
                            value={interiorColor}
                            onChange={handleInteriorColorChange}
                            placeholder="[Select]"
                            className={formErrors.interiorColor ? "border-red-500" : ""}
                        />
                        {formErrors.interiorColor && <p className="text-red-500 text-xs mt-1">{formErrors.interiorColor}</p>}
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium">
                        How many keys do you have? <span className="text-red-500">*</span>
                    </label>
                    <Tabs value={keyCount} onValueChange={handleKeyCountChange} className="w-full p-0">
                        <TabsList
                            className={`grid grid-cols-2 w-full rounded-lg overflow-hidden border ${formErrors.keyCount ? "border-red-500" : "border-border"} [&>*]:px-0 p-0 bg-gray-100`}
                        >
                            <TabsTrigger
                                value="1"
                                className="h-full data-[state=active]:bg-[#8E6F00] data-[state=active]:text-primary-foreground data-[state=inactive]:text-gray-700"
                            >
                                1
                            </TabsTrigger>
                            <TabsTrigger
                                value="2"
                                className="h-full data-[state=active]:bg-[#8E6F00] data-[state=active]:text-primary-foreground data-[state=inactive]:text-gray-700"
                            >
                                2+
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                    {formErrors.keyCount && <p className="text-red-500 text-xs mt-1">{formErrors.keyCount}</p>}
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium">
                        Do you have a loan or lease on the vehicle? <span className="text-red-500">*</span>
                    </label>
                    <Tabs value={loanStatus} onValueChange={handleLoanStatusChange} className="w-full">
                        <TabsList
                            className={`grid grid-cols-3 w-full rounded-lg overflow-hidden border ${formErrors.loanStatus ? "border-red-500" : "border-border"} [&>*]:px-0 p-0 bg-gray-100`}
                        >
                            <TabsTrigger
                                value="loan"
                                className="h-full data-[state=active]:bg-[#8E6F00] data-[state=active]:text-primary-foreground data-[state=inactive]:text-gray-700"
                            >
                                Loan
                            </TabsTrigger>
                            <TabsTrigger
                                value="lease"
                                className="h-full data-[state=active]:bg-[#8E6F00] data-[state=active]:text-primary-foreground data-[state=inactive]:text-gray-700"
                            >
                                Lease
                            </TabsTrigger>
                            <TabsTrigger
                                value="none"
                                className="h-full data-[state=active]:bg-[#8E6F00] data-[state=active]:text-primary-foreground data-[state=inactive]:text-gray-700"
                            >
                                No, I own it
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                    {formErrors.loanStatus && <p className="text-red-500 text-xs mt-1">{formErrors.loanStatus}</p>}
                </div>

                {(loanStatus === "loan" || loanStatus === "lease") && (
                    <div className="mt-4 mb-6 space-y-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Who holds the lien on the loan/lease? <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className={`w-full p-2 border ${formErrors.lienHolder ? "border-red-500" : "border-border"} rounded-md`}
                                placeholder="Name of bank or dealership"
                                value={lienHolder}
                                onChange={handleLienHolderChange}
                                required
                            />
                            {formErrors.lienHolder && <p className="text-red-500 text-xs mt-1">{formErrors.lienHolder}</p>}
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                What remaining balance do you owe? <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <span className="text-gray-700">$</span>
                                </div>
                                <input
                                    type="text"
                                    className={`w-full p-2 pl-7 border ${formErrors.remainingBalance ? "border-red-500" : "border-border"} rounded-md`}
                                    placeholder="Loan Amount"
                                    value={remainingBalance}
                                    onChange={handleRemainingBalanceChange}
                                    required
                                />
                            </div>
                            {formErrors.remainingBalance && (
                                <p className="text-red-500 text-xs mt-1">{formErrors.remainingBalance}</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        )
    }

    const renderHistoryConditionForm = () => {
        return (
            <div className="space-y-6">
                <div>
                    <label className="block mb-2 text-sm font-medium">
                        How would you rate your vehicle overall? <span className="text-red-500">*</span>
                    </label>
                    <RadioGroup value={vehicleCondition} onValueChange={handleVehicleConditionChange} className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="like-new" id="like-new" />
                            <label htmlFor="like-new" className="text-sm">
                                Like-new condition with little signs of wear or tear
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="average" id="average" />
                            <label htmlFor="average" className="text-sm">
                                Average condition with normal wear and tear (dents, dings, scratches)
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="visible-rust" id="visible-rust" />
                            <label htmlFor="visible-rust" className="text-sm">
                                Visible rust, cosmetic damage, or signs of vehicle repainting
                            </label>
                        </div>
                    </RadioGroup>
                    {formErrors.vehicleCondition && <p className="text-red-500 text-xs mt-1">{formErrors.vehicleCondition}</p>}
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium">
                        Does the vehicle have a clean title? <span className="text-red-500">*</span>
                    </label>
                    <Tabs value={hasCleanTitle} onValueChange={handleCleanTitleChange} className="w-full">
                        <TabsList className="grid grid-cols-2 w-full rounded-lg overflow-hidden border border-border [&>*]:px-0 p-0 bg-gray-10">
                            <TabsTrigger
                                value="yes"
                                className="h-full data-[state=active]:bg-[#8E6F00] data-[state=active]:text-primary-foreground data-[state=inactive]:text-gray-700 "
                            >
                                Yes
                            </TabsTrigger>
                            <TabsTrigger
                                value="no"
                                className="h-full data-[state=active]:bg-[#8E6F00] data-[state=active]:text-primary-foreground data-[state=inactive]:text-gray-700"
                            >
                                No
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                    {formErrors.hasCleanTitle && <p className="text-red-500 text-xs mt-1">{formErrors.hasCleanTitle}</p>}
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium">
                        Does your vehicle run and drive? <span className="text-red-500">*</span>
                    </label>
                    <Tabs value={doesRun} onValueChange={handleDoesRunChange} className="w-full">
                        <TabsList className="grid grid-cols-2 w-full rounded-lg overflow-hidden border border-border [&>*]:px-0 p-0 bg-gray-100">
                            <TabsTrigger
                                value="yes"
                                className="h-full data-[state=active]:bg-[#8E6F00] data-[state=active]:text-primary-foreground data-[state=inactive]:text-gray-700"
                            >
                                Yes
                            </TabsTrigger>
                            <TabsTrigger
                                value="no"
                                className="h-full data-[state=active]:bg-[#8E6F00] data-[state=active]:text-primary-foreground data-[state=inactive]:text-gray-70"
                            >
                                No
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                    {formErrors.doesRun && <p className="text-red-500 text-xs mt-1">{formErrors.doesRun}</p>}
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium">
                        Has your vehicle been in an accident? <span className="text-red-500">*</span>
                    </label>
                    <Tabs value={hasBeenInAccident} onValueChange={handleAccidentHistoryChange} className="w-full">
                        <TabsList className="grid grid-cols-2 w-full rounded-lg overflow-hidden border border-border [&>*]:px-0 p-0 bg-gray-100">
                            <TabsTrigger
                                value="yes"
                                className="h-full data-[state=active]:bg-[#8E6F00] data-[state=active]:text-primary-foreground data-[state=inactive]:text-gray-700"
                            >
                                Yes
                            </TabsTrigger>
                            <TabsTrigger
                                value="no"
                                className="h-full data-[state=active]:bg-[#8E6F00] data-[state=active]:text-primary-foreground data-[state=inactive]:text-gray-700"
                            >
                                No
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                    {formErrors.hasBeenInAccident && <p className="text-red-500 text-xs mt-1">{formErrors.hasBeenInAccident}</p>}
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium">
                        Are there any active warning or service lights? <span className="text-red-500">*</span>
                    </label>
                    <Tabs value={hasWarningLights} onValueChange={handleWarningLightsChange} className="w-full">
                        <TabsList className="grid grid-cols-2 w-full rounded-lg overflow-hidden border border-border [&>*]:px-0 p-0 bg-gray-100">
                            <TabsTrigger
                                value="yes"
                                className="h-full data-[state=active]:bg-[#8E6F00] data-[state=active]:text-primary-foreground data-[state=inactive]:text-gray-70"
                            >
                                Yes
                            </TabsTrigger>
                            <TabsTrigger
                                value="no"
                                className="h-full data-[state=active]:bg-[#8E6F00] data-[state=active]:text-primary-foreground data-[state=inactive]:text-gray-700"
                            >
                                No
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                    {formErrors.hasWarningLights && <p className="text-red-500 text-xs mt-1">{formErrors.hasWarningLights}</p>}
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium">
                        Has the vehicle been smoked in? <span className="text-red-500">*</span>
                    </label>
                    <Tabs value={hasBeenSmoked} onValueChange={handleSmokedInChange} className="w-full">
                        <TabsList className="grid grid-cols-2 w-full rounded-lg overflow-hidden border border-border [&>*]:px-0 p-0 bg-gray-100">
                            <TabsTrigger
                                value="yes"
                                className="h-full data-[state=active]:bg-[#8E6F00] data-[state=active]:text-primary-foreground data-[state=inactive]:text-gray-700"
                            >
                                Yes
                            </TabsTrigger>
                            <TabsTrigger
                                value="no"
                                className="h-full data-[state=active]:bg-[#8E6F00] data-[state=active]:text-primary-foreground data-[state=inactive]:text-gray-700"
                            >
                                No
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                    {formErrors.hasBeenSmoked && <p className="text-red-500 text-xs mt-1">{formErrors.hasBeenSmoked}</p>}
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium">
                        Does your vehicle have any of the following? <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="hail-damage"
                                checked={damageTypes.includes("hail-damage")}
                                onCheckedChange={() => toggleDamageType("hail-damage")}
                            />
                            <label
                                htmlFor="hail-damage"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Hail damage
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="dents"
                                checked={damageTypes.includes("dents")}
                                onCheckedChange={() => toggleDamageType("dents")}
                            />
                            <label
                                htmlFor="dents"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Dents
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="scratched-paint"
                                checked={damageTypes.includes("scratched-paint")}
                                onCheckedChange={() => toggleDamageType("scratched-paint")}
                            />
                            <label
                                htmlFor="scratched-paint"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Scratched paint
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="fading-paint"
                                checked={damageTypes.includes("fading-paint")}
                                onCheckedChange={() => toggleDamageType("fading-paint")}
                            />
                            <label
                                htmlFor="fading-paint"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Fading or chipping paint
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="interior-wear"
                                checked={damageTypes.includes("interior-wear")}
                                onCheckedChange={() => toggleDamageType("interior-wear")}
                            />
                            <label
                                htmlFor="interior-wear"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Interior wear and tear, stains
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="none"
                                checked={damageTypes.includes("none")}
                                onCheckedChange={() => toggleDamageType("none")}
                            />
                            <label
                                htmlFor="none"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                None of the above
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderPhotosForm = () => {
        return (
            <div className="space-y-6">
                <h4 className="text-lg font-medium">Recommended Photos</h4>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Exterior: front left, front right, back left, back right</li>
                    <li>Wheels and tires: front left, front right, back left, back right</li>
                    <li>Dashboard, odometer, service lights</li>
                    <li>Front seats, back seats</li>
                    <li>Engine bay, including front bumper</li>
                </ul>

                <div className="mt-6 border border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 ">
                    <div className="flex flex-col items-center justify-center">
                        <Upload className="h-12 w-12 text-gray-700 mb-4" />
                        <p className="text-sm text-gray-700 mb-4">
                            Drag and drop images or click here to select files. Non-image files will be discarded.
                        </p>
                        <input
                            type="file"
                            id="photo-upload"
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={handlePhotoUpload}
                        />
                        <Button aria-label="Select files" variant="outline" onClick={() => document.getElementById("photo-upload")?.click()} className="mt-2">
                            Select Files
                        </Button>
                        {formErrors.photos && <p className="text-red-500 text-xs mt-2">{formErrors.photos}</p>}
                    </div>
                </div>

                {uploadedPhotos.length > 0 && (
                    <div className="mt-6">
                        <h5 className="text-md font-medium mb-2">Uploaded Photos ({uploadedPhotos.length})</h5>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {uploadedPhotos.map((photo, index) => (
                                <div key={index} className="relative aspect-square bg-gray-100 rounded-md overflow-hidden">
                                    <img
                                        src={photo ? URL.createObjectURL(photo) : "/placeholder.svg"}
                                        alt={`Uploaded photo ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setUploadedPhotos((prev) => prev.filter((_, i) => i !== index))
                                        }}
                                        className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-70 transition-all"
                                        aria-label="Remove photo"
                                    >
                                        <X className="h-4 w-4 text-white" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex justify-between mt-6">
                    <Button onClick={handleContinue} className="w-full md:w-auto hover:text-white hover:bg-[#8E6F00]">
                        Continue <MoveRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                        aria-label="Skip photos"
                        variant="outline"
                        onClick={() => {
                            setFormErrors((prev) => ({ ...prev, photos: undefined }))
                            setCurrentStep(currentStep + 1)
                            setExpandedSection(4)
                        }}
                        className="w-full md:w-auto ml-4"
                    >
                        Skip Photos
                    </Button>
                </div>
            </div>
        )
    }

    const renderContactForm = () => {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className={`w-full p-2 border ${formErrors.firstName ? "border-red-500" : "border-border"} rounded-md`}
                            placeholder="First"
                            value={firstName}
                            onChange={handleFirstNameChange}
                            required
                        />
                        {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className={`w-full p-2 border ${formErrors.lastName ? "border-red-500" : "border-border"} rounded-md`}
                            placeholder="Last"
                            value={lastName}
                            onChange={handleLastNameChange}
                            required
                        />
                        {formErrors.lastName && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            className={`w-full p-2 border ${formErrors.email ? "border-red-500" : "border-border"} rounded-md`}
                            placeholder="you@email.com"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                        {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            className={`w-full p-2 border ${formErrors.phone ? "border-red-500" : "border-border"} rounded-md`}
                            placeholder="(___) ___-____"
                            value={phone}
                            onChange={handlePhoneChange}
                            required
                        />
                        {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                    </div>
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium">
                        What is the best way to contact you? <span className="text-red-500">*</span>
                    </label>
                    <RadioGroup value={contactPreference} onValueChange={handleContactPreferenceChange} className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="email" id="contact-email" />
                            <label htmlFor="contact-email" className="text-sm">
                                Email
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="text" id="contact-text" />
                            <label htmlFor="contact-text" className="text-sm">
                                Text Message
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="call" id="contact-call" />
                            <label htmlFor="contact-call" className="text-sm">
                                Phone Call
                            </label>
                        </div>
                    </RadioGroup>
                    {formErrors.contactPreference && <p className="text-red-500 text-xs mt-1">{formErrors.contactPreference}</p>}
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium">What questions can we answer for you?</label>
                    <Textarea
                        className="w-full p-2 border border-border rounded-md"
                        placeholder="Add a question or comment"
                        value={questions}
                        onChange={(e) => setQuestions(e.target.value)}
                        rows={4}
                    />
                </div>

                <Button aria-label="Submit" onClick={handleContinue} className="w-full md:w-auto hover:text-white hover:bg-[#8E6F00]">
                    Submit
                </Button>

                <p className="text-xs text-gray-700 mt-4">
                    If you have entered a cell phone number, or another number that you later convert to a cell phone number, you
                    agree that we may contact you at this number. You also agree to receive calls and messages such as,
                    pre-recorded messages, calls and messages from automated dialing systems, or text messages. Normal cell phone
                    charges may apply.
                </p>
            </div>
        )
    }

    const isFormValid = () => {
        if (entryMethod === "make-model") {
            return shouldShowForm
        } else if (entryMethod === "license-plate") {
            return licensePlate.trim() !== "" && licensePlateState !== ""
        } else if (entryMethod === "vin") {
            return vinNumber.trim() !== ""
        }
        return false
    }

    return (
        <Card className="border rounded-lg overflow-hidden">
            <CardContent className="p-0">
                {/* Reset Button - only shown after first step and before submission */}
                {currentStep > 1 && !isSubmitted && (
                    <div className="p-6 border-b border-border">
                        <Button
                            aria-label="Start over"
                            variant="outline"
                            onClick={resetAllFields}
                            className="flex items-center hover:text-white hover:bg-[#8E6F00]"
                        >
                            <MoveLeft className="mr-2 h-4 w-4" />
                            Start Over
                        </Button>
                    </div>
                )}

                {/* Submission confirmation */}
                {isSubmitted && (
                    <div className="p-6 text-center">
                        <h3 className="text-xl font-medium text-green-600 mb-4">Thank You For Your Submission!</h3>
                        <p className="text-gray-700mb-6">We've received your vehicle information and will be in touch shortly.</p>
                        <Button
                            aria-label="Submit another vehicle"
                            onClick={() => {
                                resetAllFields()
                                setIsSubmitted(false)
                            }}
                            className="w-full md:w-auto"
                        >
                            Submit Another Vehicle
                        </Button>
                    </div>
                )}

                {/* Main form content - hidden when submitted */}
                {!isSubmitted && (
                    <>
                        {/* Step 1: Vehicle Information */}
                        <div className={`border-b border-border ${expandedSection === 1 ? "p-6" : "p-0"}`}>
                            <div className={`flex justify-between items-center ${expandedSection !== 1 ? "p-6" : ""}`}>
                                <h3 className="text-lg font-medium text-primary">Vehicle Information</h3>
                                <div className="flex items-center">
                                    {expandedSection !== 1 ? (
                                        <span
                                            className="text-sm text-primary underline flex items-center cursor-pointer"
                                            onClick={() => setExpandedSection(1)}
                                        >
                                            Edit <Pencil className="h-3 w-3 ml-1" />
                                        </span>
                                    ) : (
                                        <span className="text-sm text-muted-foreground mr-2">1 / 4</span>
                                    )}
                                </div>
                            </div>

                            {expandedSection === 1 && (
                                <>
                                    {!shouldShowForm && (
                                        <p className="mb-4 text-gray-700">
                                            Get started by entering your Vehicle Identification Number (VIN), make and model, or your license
                                            plate.
                                        </p>
                                    )}

                                    {!shouldShowForm && (
                                        <Tabs
                                            value={entryMethod}
                                            defaultValue="make-model"
                                            className="mb-6 p-0"
                                            onValueChange={setEntryMethod}
                                        >
                                            <TabsList className="grid grid-cols-3 w-full p-0 max-w-md rounded-lg overflow-hidden border border-border [&>*]:px-0 bg-gray-100">
                                                <TabsTrigger
                                                    value="make-model"
                                                    className="h-full data-[state=active]:bg-[#8E6F00] data-[state=active]:text-primary-foreground data-[state=inactive]:text-gray-700 "
                                                >
                                                    Make & Model
                                                </TabsTrigger>
                                                <TabsTrigger
                                                    value="license-plate"
                                                    className="h-full data-[state=active]:bg-[#8E6F00] data-[state=active]:text-primary-foreground data-[state=inactive]:text-gray-700"
                                                >
                                                    License Plate
                                                </TabsTrigger>
                                                <TabsTrigger
                                                    value="vin"
                                                    className="h-full data-[state=active]:bg-[#8E6F00] data-[state=active]:text-primary-foreground data-[state=inactive]:text-gray-700"
                                                >
                                                    VIN Number
                                                </TabsTrigger>
                                            </TabsList>
                                        </Tabs>
                                    )}

                                    {entryMethod === "make-model" && (
                                        <>
                                            {!shouldShowForm ? (
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                                    <div>
                                                        <label className="block mb-2 text-sm font-medium">Year</label>
                                                        <DropdownSelect
                                                            options={yearOptions}
                                                            value={selectedYear}
                                                            onChange={setSelectedYear}
                                                            placeholder="Select Year"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block mb-2 text-sm font-medium">Make</label>
                                                        <DropdownSelect
                                                            options={vehicleData.makes.map((make) => ({ value: make, label: make }))}
                                                            value={selectedMake}
                                                            onChange={(value) => {
                                                                setSelectedMake(value)
                                                                setSelectedModel("")
                                                                setSelectedTrim("")
                                                            }}
                                                            placeholder="[Select Make]"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block mb-2 text-sm font-medium">Model</label>
                                                        <DropdownSelect
                                                            options={availableModels.map((model) => ({ value: model, label: model }))}
                                                            value={selectedModel}
                                                            onChange={(value) => {
                                                                setSelectedModel(value)
                                                                setSelectedTrim("")
                                                                setSelectedDrivetrain("")
                                                            }}
                                                            placeholder="[Select Model]"
                                                        />
                                                    </div>

                                                    {selectedModel && availableTrims.length > 0 && (
                                                        <div className="lg:col-start-1">
                                                            <label className="block mb-2 text-sm font-medium">Trim</label>
                                                            <DropdownSelect
                                                                options={availableTrims.map((trim) => ({ value: trim, label: trim }))}
                                                                value={selectedTrim}
                                                                onChange={(value) => {
                                                                    setSelectedTrim(value)
                                                                    setSelectedDrivetrain("")
                                                                }}
                                                                placeholder="[Select Trim]"
                                                            />
                                                        </div>
                                                    )}

                                                    {selectedTrim && availableDrivetrains.length > 0 && (
                                                        <div>
                                                            <label className="block mb-2 text-sm font-medium">Drivetrain</label>
                                                            <DropdownSelect
                                                                options={availableDrivetrains.map((drivetrain) => ({
                                                                    value: drivetrain,
                                                                    label: drivetrain,
                                                                }))}
                                                                value={selectedDrivetrain}
                                                                onChange={setSelectedDrivetrain}
                                                                placeholder="[Select Drivetrain]"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            ) : null}

                                            {renderVehicleDetailsForm()}
                                        </>
                                    )}

                                    {entryMethod === "license-plate" && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                            <div>
                                                <label className="block mb-2 text-sm font-medium">
                                                    License Plate Number <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className={`w-full p-2 border ${formErrors.licensePlate ? "border-red-500" : "border-border"} rounded-md`}
                                                    placeholder="Enter license plate number"
                                                    value={licensePlate}
                                                    onChange={handleLicensePlateChange}
                                                    maxLength={8}
                                                />
                                                {formErrors.licensePlate && (
                                                    <p className="text-red-500 text-xs mt-1">{formErrors.licensePlate}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium">
                                                    State <span className="text-red-500">*</span>
                                                </label>
                                                <DropdownSelect
                                                    options={US_STATES}
                                                    value={licensePlateState}
                                                    onChange={handleLicensePlateStateChange}
                                                    placeholder="Select State"
                                                    className={formErrors.licensePlateState ? "border-red-500" : ""}
                                                />
                                                {formErrors.licensePlateState && (
                                                    <p className="text-red-500 text-xs mt-1">{formErrors.licensePlateState}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {entryMethod === "vin" && (
                                        <div className="mb-6">
                                            <label className="block mb-2 text-sm font-medium">
                                                VIN Number <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className={`w-full p-2 border ${formErrors.vinNumber ? "border-red-500" : "border-border"} rounded-md`}
                                                placeholder="Enter 17-digit VIN number"
                                                value={vinNumber}
                                                onChange={handleVinNumberChange}
                                                maxLength={17}
                                            />
                                            {formErrors.vinNumber && <p className="text-red-500 text-xs mt-1">{formErrors.vinNumber}</p>}
                                        </div>
                                    )}

                                    <Button
                                        aria-label="Continue"
                                        onClick={handleContinue}
                                        className="w-full md:w-auto hover:text-white hover:bg-[#8E6F00]"
                                        disabled={!isFormValid()}
                                    >
                                        Continue <MoveRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </>
                            )}
                        </div>

                        {/* Step 2: History & Condition */}
                        <div className={`border-b border-border ${expandedSection === 2 ? "p-6" : "p-0"}`}>
                            <div className={`flex justify-between items-center ${expandedSection !== 2 ? "p-6" : ""}`}>
                                <h3 className="text-lg font-medium text-primary">History & Condition</h3>
                                <div className="flex items-center">
                                    {expandedSection !== 2 && currentStep >= 2 ? (
                                        <span
                                            className="text-sm text-primary underline flex items-center cursor-pointer"
                                            onClick={() => setExpandedSection(2)}
                                        >
                                            Edit <Pencil className="h-3 w-3 ml-1" />
                                        </span>
                                    ) : (
                                        <span className="text-sm text-muted-foreground mr-2">2 / 4</span>
                                    )}
                                </div>
                            </div>

                            {expandedSection === 2 && (
                                <>
                                    <div className="w-full border-b border-border mt-4 mb-6"></div>
                                    {renderHistoryConditionForm()}
                                    <div className="mt-6">
                                        <Button aria-label="Continue" onClick={handleContinue} className="w-full md:w-auto hover:text-white hover:bg-[#8E6F00]">
                                            Continue <MoveRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Step 3: Photos (Optional) */}
                        <div className={`border-b border-border ${expandedSection === 3 ? "p-6" : "p-0"}`}>
                            <div className={`flex justify-between items-center ${expandedSection !== 3 ? "p-6" : ""}`}>
                                <h3 className="text-lg font-medium text-primary">Photos (Optional)</h3>
                                <div className="flex items-center">
                                    {expandedSection !== 3 && currentStep >= 3 ? (
                                        <span
                                            className="text-sm text-primary underline flex items-center cursor-pointer"
                                            onClick={() => setExpandedSection(3)}
                                        >
                                            Edit <Pencil className="h-3 w-3 ml-1" />
                                        </span>
                                    ) : (
                                        <span className="text-sm text-muted-foreground mr-2">3 / 4</span>
                                    )}
                                </div>
                            </div>

                            {expandedSection === 3 && (
                                <>
                                    <div className="w-full border-b border-border mt-4 mb-6"></div>
                                    {renderPhotosForm()}
                                </>
                            )}
                        </div>

                        {/* Step 4: Contact Information */}
                        <div className={`${expandedSection === 4 ? "p-6" : "p-0"}`}>
                            <div className={`flex justify-between items-center ${expandedSection !== 4 ? "p-6" : ""}`}>
                                <h3 className="text-lg font-medium text-primary">Contact Information</h3>
                                <div className="flex items-center">
                                    {expandedSection !== 4 && currentStep >= 4 ? (
                                        <span
                                            className="text-sm text-primary underline flex items-center cursor-pointer"
                                            onClick={() => setExpandedSection(4)}
                                        >
                                            Edit <Pencil className="h-3 w-3 ml-1" />
                                        </span>
                                    ) : (
                                        <span className="text-sm text-muted-foreground mr-2">4 / 4</span>
                                    )}
                                </div>
                            </div>

                            {expandedSection === 4 && (
                                <>
                                    <div className="w-full border-b border-border mt-4 mb-6"></div>
                                    {renderContactForm()}
                                </>
                            )}
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    )
}

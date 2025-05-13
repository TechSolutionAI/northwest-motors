import { CreditCard, Globe, Star, ThumbsUp } from "lucide-react";

export function WhyChooseUs() {

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-5xl font-krona text-center mb-16">Why NorthWest Motors?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="flex flex-col items-center px-4 py-8 border rounded-lg">
                    <CreditCard className="h-10 w-10" />
                    <p className="mt-4 text-lg font-medium">Credit Financing</p>
                    <p className="mt-4">Good Credit, Bad Credit, First Time Buyer? With relations with multiple lenders, we are bound to get you financed!</p>
                </div>
                <div className="flex flex-col items-center px-4 py-8 border rounded-lg">
                    <Globe className="h-10 w-10" />
                    <p className="mt-4 text-lg font-medium">Quality Brands</p>
                    <p className="mt-4">We make sure to only stock vehicles that are known for their reliability and dependability.</p>
                </div>
                <div className="flex flex-col items-center px-4 py-8 border rounded-lg">
                    <Star className="h-10 w-10" />
                    <p className="mt-4 text-lg font-medium">Trusted Dealer</p>
                    <p className="mt-4">With repeat customers and high consumer feedback, we make it easy to purchase your next vehicle.</p>
                </div>
                <div className="flex flex-col items-center px-4 py-8 border rounded-lg">
                    <ThumbsUp className="h-10 w-10" />
                    <p className="mt-4 text-lg font-medium">Best Car Services</p>
                    <p className="mt-4">Keep your vehicles running longer. Our full service center will help you keep your car in tip top shape.</p>
                </div>
            </div>
        </div>
    );
}
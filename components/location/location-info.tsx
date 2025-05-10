import { MoveRight } from "lucide-react";
import Link from "next/link";

interface LocationInfoProps {
    tabClicked: (index: number) => void;
}

export default function LocationInfo({ tabClicked }: LocationInfoProps) {
    return (
        <div className="px-10 py-20">
            <h1 className="text-3xl">Locations</h1>
            <h2 className="text-4xl mt-8">We are a nationwide Australian brand</h2>
            <p className="mt-8">
                Zoom in and click on the icons to see our site addresses. We currently have over 17 dealerships and counting, across Queensland, New South Wales, South Australia, and ACT. Follow us on our socials to stay up to date on future launches.
            </p>
            <div className="mt-8">
                <Link onClick={() => { tabClicked(0) }} href="#adelaide" className="w-full flex justify-between border-b py-4">Adelaide <MoveRight /></Link>
                <Link onClick={() => { tabClicked(1) }} href="#sydeny" className="w-full flex justify-between border-b py-4">Sydeny <MoveRight /></Link>
                <Link onClick={() => { tabClicked(2) }} href="#brisbane" className="w-full flex justify-between border-b py-4">Brisbane <MoveRight /></Link>
                <Link onClick={() => { tabClicked(3) }} href="#melbourne" className="w-full flex justify-between border-b py-4">Melbourne <MoveRight /></Link>
            </div>
        </div>
    )
}
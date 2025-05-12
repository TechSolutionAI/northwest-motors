import { MoveLeft, MoveRight } from "lucide-react"
import type { BlogPost } from "@/lib/blog-data"
import { BlogCard } from "./blog-card"

interface KeepReadingProps {
    posts: BlogPost[]
}

export function KeepReading({ posts }: KeepReadingProps) {
    return (
        <section className="px-10">
            <h2 className="mb-6 text-4xl font-medium">Keep Reading</h2>

            <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
                <button className="mx-1 flex h-8 w-8 items-center justify-center rounded-full border border-gray-300" aria-label="Next">
                    <MoveLeft size={16} />
                </button>
                <button
                    aria-label="1"
                    className="mx-1 flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-black text-white"
                >
                    1
                </button>
                <button
                    aria-label="2"
                    className="mx-1 flex h-8 w-8 items-center justify-center rounded-full border border-gray-300">
                    2
                </button>
                <button
                    aria-label="3"
                    className="mx-1 flex h-8 w-8 items-center justify-center rounded-full border border-gray-300">
                    3
                </button>
                <button
                    aria-label="Previous"
                    className="mx-1 flex h-8 w-8 items-center justify-center rounded-full border border-gray-300">
                    <MoveRight size={16} />
                </button>
            </div>
        </section>
    )
}

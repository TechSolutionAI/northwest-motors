"use client"

import { blogPosts } from "@/lib/blog-data"
import { LatestNews } from "@/components/blog/latest-news"
import { KeepReading } from "@/components/blog/keep-reading"

export default function BlogPage() {
    // Sort posts by date (newest first)
    const sortedPosts = [...blogPosts].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )

    // Get the first 10 posts for the featured section
    const featuredPosts = sortedPosts.slice(0, 10)

    // Get the rest of the posts for the "Keep Reading" section
    const regularPosts = sortedPosts.slice(0, 10)

    return (
        <main className="container mx-auto px-4 py-8">
            {/* Latest News Section */}
            <LatestNews posts={featuredPosts} />

            {/* Keep Reading Section */}
            <KeepReading posts={regularPosts} />
        </main>
    )
}

import Image from "next/image"
import Link from "next/link"
import type { BlogPost } from "@/lib/blog-data"

interface BlogCardProps {
    post: BlogPost
    featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {

    return (
        <Link href={`/blog/${post.slug}`} key={post.id} className="group block">
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={post.coverImage || "/car-placeholder.png"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <h3 className="mt-3 text-lg font-medium">{post.title}</h3>
            <p className="mt-1 text-sm text-gray-700">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })}
            </p>
        </Link>
    )
}

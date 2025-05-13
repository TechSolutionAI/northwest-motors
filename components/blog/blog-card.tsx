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
                    // src={post.coverImage || "/car-placeholder.webp"}
                    src="/car-placeholder.webp"
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw,
                        (max-width: 1024px) 50vw,
                        (max-width: 1280px) 33vw,
                        25vw"
                    quality={80}
                />
            </div>
            <p className="mt-3 text-lg font-medium">{post.title}</p>
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

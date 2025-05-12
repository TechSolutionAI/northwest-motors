import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { getPostBySlug, getRelatedPosts } from "@/lib/blog-data"
import type { Metadata } from "next"

interface BlogPostPageProps {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const post = getPostBySlug(params.slug)

    if (!post) {
        return {
            title: "Post Not Found | RM Motors Blog",
            description: "The requested blog post could not be found.",
        }
    }

    return {
        title: `${post.title} | RM Motors Blog`,
        description: post.excerpt,
    }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
    const post = getPostBySlug(params.slug)

    if (!post) {
        notFound()
    }

    const relatedPosts = getRelatedPosts(post.id, 3)
    const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })

    return (
        <main className="container mx-auto px-4 py-8">
            <Link href="/blog" className="mb-6 inline-flex items-center text-gray-600 hover:text-black">
                <ChevronLeft size={16} className="mr-1" />
                Back to Blog
            </Link>

            <article className="mx-auto max-w-3xl">
                <h1 className="mb-4 text-3xl font-medium md:text-4xl">{post.title}</h1>

                <div className="mb-6 flex items-center text-sm text-gray-500">
                    <span>{formattedDate}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime} min read</span>
                    <span className="mx-2">•</span>
                    <span>{post.category}</span>
                </div>

                <div className="relative mb-8 h-[400px] w-full overflow-hidden">
                    <Image src={post.coverImage || "/car-placeholder.png"} alt={post.title} fill className="object-cover" priority />
                </div>

                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

                <div className="mt-8 flex items-center border-t border-gray-200 pt-6">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                        <Image
                            src={post.author.avatar || "/car-placeholder.png"}
                            alt={post.author.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="ml-4">
                        <p className="font-medium">{post.author.name}</p>
                        <p className="text-sm text-gray-500">Author</p>
                    </div>
                </div>
            </article>

            {relatedPosts.length > 0 && (
                <section className="mx-auto mt-16 max-w-5xl">
                    <h2 className="mb-6 text-2xl font-medium">Related Articles</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {relatedPosts.map((relatedPost) => (
                            <Link href={`/blog/${relatedPost.slug}`} key={relatedPost.id} className="group block">
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={relatedPost.coverImage || "/car-placeholder.png"}
                                        alt={relatedPost.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="mt-3 text-lg font-medium">{relatedPost.title}</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {new Date(relatedPost.publishedAt).toLocaleDateString("en-US", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })}
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </main>
    )
}

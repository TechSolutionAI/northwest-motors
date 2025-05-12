import RecentlyAdded from "@/components/wishlist/recently-added";
import StepsToPurchase from "@/components/wishlist/steps-to-purchase";
import Wishlists from "@/components/wishlist/wishlists";

export default function WishlistPage() {
    return (
        <main className="">
            {/*Wishlists */}
            <section className="container">
                <Wishlists />
            </section>

            {/*Steps to Purchase */}
            <section className="container">
                <StepsToPurchase />
            </section>

            {/*Recently Added */}
            <section >
                <RecentlyAdded />
            </section>
        </main>
    );
}
import HeaderWrapper from "../../components/HeaderWrapper";
import { Footer } from "../../components/Footer";
import DiscordButton from "../../components/DiscordButton";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | KastoChha",
  description: "At KastoChha, we don't track who you are. Read our simple zero-logs privacy commitment.",
};

export default function PrivacyPage() {
  const brandGradient = "bg-gradient-to-r from-[#FF4B4B] to-[#1E40AF]";

  return (
    <div className="flex flex-col min-h-screen pt-4 md:pt-8 bg-white font-sans">
      <HeaderWrapper />

      {/* Hero Banner */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-16 mt-4">
        <div
          className="relative w-full h-[25vh] md:h-[30vh] bg-cover rounded-xl overflow-hidden mx-auto shadow-lg"
          style={{
            backgroundImage: "url('https://auopgtcysaaexozjgcbh.supabase.co/storage/v1/object/public/Assets/Banner%20Image%20Final.jpg'",
            backgroundPosition: "center 15%",
            backgroundSize: "cover",
          }}
        />
      </div>

      {/* Main Content Card */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-16">
        <main className="relative max-w-3xl mx-auto -mt-10 bg-white border border-gray-100 rounded-2xl shadow-xl p-6 sm:p-10 md:p-12 z-20 mb-16">
          
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheckIcon className="w-8 h-8 text-[#1E40AF]" />
            <h1 className={`text-2xl md:text-3xl font-black text-transparent bg-clip-text ${brandGradient}`}>
              Privacy by Design
            </h1>
          </div>

          <section className="space-y-8">
            <p className="text-gray-800 leading-relaxed text-sm md:text-base font-medium">
              KastoChha is built on a simple principle: <strong>We want to give you answers, not take your data.</strong> Our architecture is designed to be anonymous from the ground up.
            </p>

            <div className={`h-[1px] w-16 my-8 rounded-full ${brandGradient} opacity-40`} />

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">1. Zero Logging</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                We do not have a user registration or logging system. We don't track who you are, what device you use, or your IP address. Your identity remains completely separate from your search.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">2. Anonymous Searches</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                The only information that interacts with our AI is the question you type. Since we don't store "profiles," we have no way of linking a specific question back to a specific person.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">3. Community Privacy</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Our Discord community is an open space managed by Discord. KastoChha does not collect or store your email address from your Discord profile. If you email us directly, we only use your address to reply to your inquiry.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">4. No Data Selling</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                We will never sell or share your search data or contact information with third parties. We are here to build a better engine for Nepal, not a database of users.
              </p>
            </div>
          </section>

          <div className="mt-12 text-center pt-8 border-t border-gray-100">
             <p className="text-gray-400 text-xs md:text-sm italic">
               Tapaiko Data KastoChha - Safe Chha, Dhukka vayera aafno KastoChha Query Search Garnuhos. 
               Search freely, KastoChha is built for YOU with ❤️.
             </p>
          </div>
        </main>
      </div>

      <Footer />
      <DiscordButton />
    </div>
  );
}
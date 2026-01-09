import HeaderWrapper from "../../components/HeaderWrapper";
import { Footer } from "../../components/Footer";
import DiscordButton from "../../components/DiscordButton";
import { EnvelopeIcon, ChatBubbleLeftRightIcon, RocketLaunchIcon } from "@heroicons/react/24/solid";
import { Metadata } from "next";

// Modern Next.js SEO Metadata
export const metadata: Metadata = {
  title: "Contact Us | Kasto Chha - Join the Community",
  description: "Have a question or feedback? Connect with the Kasto Chha team via Discord or Email. Join Nepal's growing AI community.",
};

export default function ContactPage() {
  const brandGradient = "bg-gradient-to-r from-[#FF4B4B] to-[#1E40AF]";

  return (
    <div className="flex flex-col min-h-screen pt-4 md:pt-8 bg-white font-sans">
      <HeaderWrapper />

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Contact Kasto Chha Team</h1>

      {/* Hero Banner Section - 100% Brightness & Restored About Page Image */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-16 mt-4">
        <div
          className="relative w-full h-[25vh] md:h-[30vh] bg-cover rounded-xl overflow-hidden mx-auto shadow-lg"
          style={{
            backgroundImage: "url('https://auopgtcysaaexozjgcbh.supabase.co/storage/v1/object/public/Assets/Banner%20Image%20Final.jpg')",
            backgroundPosition: "center 15%",
            backgroundSize: "cover",
          }}
        />
      </div>

      {/* Main Content Card */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-16">
        <main className="relative max-w-3xl mx-auto -mt-10 bg-white border border-gray-100 rounded-2xl shadow-xl p-6 sm:p-10 md:p-12 z-20 mb-16">
          
          <h2 className={`text-2xl md:text-3xl font-black mb-6 text-transparent bg-clip-text ${brandGradient}`}>
            We Love Hearing From You!
          </h2>

          <section className="space-y-8">
            {/* Discord Focus Section */}
            <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-[#5865F2] rounded-lg shadow-lg">
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="ml-4 text-xl font-bold text-gray-900">Join the Conversation</h3>
              </div>
              
              <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-6">
                Be an integral part of the <strong>KastoChha Community!</strong> Our open Discord space is where users share real "Kasto Chha" experiences, exchange ideas, ask questions, and help shape the platform together.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start text-sm text-gray-700">
                  <RocketLaunchIcon className="w-5 h-5 text-[#FF4B4B] mr-3 shrink-0" />
                  <span><strong>Share Experiences:</strong> Post your own and get to know members' "KastoChha" stories.</span>
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <RocketLaunchIcon className="w-5 h-5 text-[#FF4B4B] mr-3 shrink-0" />
                  <span><strong>Influence KastoChha:</strong> Suggest features, provide feedback, and see your ideas come to life.</span>
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <RocketLaunchIcon className="w-5 h-5 text-[#FF4B4B] mr-3 shrink-0" />
                  <span><strong>Stay Updated:</strong> Know what's going on at KastoChha - From trending to most popular searches, get exclusive insights.</span>
                </li>
              </ul>

              <a 
                href="https://discord.gg/yourlink" // Replace with your actual link
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-[#5865F2] text-white font-bold rounded-full hover:bg-[#4752C4] transition-all transform hover:scale-105 shadow-md"
              >
                Join KastoChha Discord
              </a>
            </div>

            {/* Email Section */}
            <div className="border-t border-gray-100 pt-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <EnvelopeIcon className="w-6 h-6 text-[#FF4B4B] mr-2" />
                Let's Grow Together
              </h3>
              <p className="text-gray-600 text-sm md:text-base mb-4">
                We believe in growing together. For extended business inquiries, collaborations, or formal support, drop us a line at our official email address.
              </p>
              
              <a
                href="mailto:kastochhaofficial@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors w-full md:w-max"
              >
                <span className="font-mono text-[#1E40AF] font-bold">kastochhaofficial@gmail.com</span>
                <div className="ml-4 p-2 bg-white rounded-full group-hover:bg-red-50 transition-colors shadow-sm">
                  <EnvelopeIcon className="w-5 h-5 text-red-500" />
                </div>
              </a>
            </div>
          </section>

          {/* Bottom Brand Message */}
          <div className="mt-12 text-center">
             <p className="text-gray-400 text-xs md:text-sm italic">
               KastoChha is built for YOU with ❤️. Every message from our users helps us build a better ground-reality engine for Nepal.
             </p>
          </div>
        </main>
      </div>

      <Footer />
      <DiscordButton />
    </div>
  );
}
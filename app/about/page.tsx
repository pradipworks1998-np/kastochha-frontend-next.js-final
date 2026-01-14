import HeaderWrapper from "../../components/HeaderWrapper";
import { Footer } from "../../components/Footer";
import DiscordButton from "../../components/DiscordButton";
import Link from "next/link";
import { Metadata } from "next";

// Modern Next.js SEO Metadata
export const metadata: Metadata = {
  title: "About KastoChha | Nepal's AI-Powered Answer Engine",
  description: "Kasto Chha: Nepal's AI-powered answer engine. From 'Momo kasto chha?' to local trends, we provide instant, reliable answers without the scroll.",
};

export default function AboutPage() {
  const brandGradient = "bg-gradient-to-r from-[#FF4B4B] to-[#1E40AF]";

  return (
    <div className="flex flex-col min-h-screen pt-4 md:pt-8 bg-white font-sans">
      <HeaderWrapper />

      <h1 className="sr-only">KastoChha | Nepal's First AI Answer Engine</h1>

      {/* Hero Banner - NO OPACITY/OVERLAY */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-16 mt-4">
        <div
          className="relative w-full h-[25vh] md:h-[30vh] bg-cover rounded-xl overflow-hidden mx-auto shadow-lg"
          style={{
            backgroundImage: "url('https://auopgtcysaaexozjgcbh.supabase.co/storage/v1/object/public/Assets/Banner%20Image%20Final.jpg')",
            backgroundPosition: "center 15%",
            backgroundSize: "cover",
          }}
        >
          {/* Black opacity div has been removed to keep image bright */}
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-12 lg:px-16">
        <main className="relative max-w-3xl mx-auto -mt-10 bg-white border border-gray-100 rounded-2xl shadow-xl p-6 sm:p-10 md:p-12 z-20 mb-16">

          <h1 className="text-3xl md:text-5xl font-black mb-8 text-[#1E40AF] tracking-tight">
            About KastoChha
          </h1>

          {/* Section 1: The Brand Promise */}
          <section className="space-y-5 mb-10">
            <p className="text-gray-800 leading-relaxed text-sm md:text-base font-medium">
              <strong>KastoChha</strong> is Nepal's Curiosity Engine — an AI-powered Answer Engine built for people who want the ground reality, not just search results. 
              We built KastoChha to specifically answer someone wondering "Kasto chha?" — about food, places, films, people, trends, or everyday experiences in Nepal.
            </p>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base font-medium">
              From "Momo kasto chha?" to "Australia Jane Process Kasto Chha?", the platform is designed to combine local insight and AI intelligence to deliver answers that are simple, relevant, and easy to trust, that too in friendly Nepali conversational language.
            </p>
            <div className="py-4 px-6 bg-gray-50 rounded-xl border-l-4 border-[#FF4B4B]">
              <p className="text-[#1E40AF] font-black text-base md:text-lg italic">
                No dherai scroll. No random opinions. Sidhai answer — Kasto Chha?
              </p>
            </div>
          </section>

          <div className={`h-[1px] w-16 my-10 rounded-full ${brandGradient} opacity-40`} />

          {/* Section 2: The Cultural Story */}
          <section className="space-y-6">
            <h2 className={`text-xl md:text-2xl font-black text-transparent bg-clip-text ${brandGradient}`}>
              The KastoChha Story
            </h2>
            <h3 className="text-lg font-bold text-gray-800 italic">
              Understanding "Kasto Chha" (कस्तो छ): The Swiss Army Knife of Nepali Phrases
            </h3>

            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              If <strong>Namaste</strong> is the door to a conversation in Nepal, <strong>"Kasto Chha"</strong> is the key to everything inside. 
              Literally translating to "How is it?", this phrase is the go-to expression for anyone seeking an honest opinion before making a decision.
            </p>

            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            It reflects a deeply rooted Nepali habit, seeking honest, practical opinions rather than polished promises.
            </p>

            <h3 className="text-lg font-bold text-gray-800 italic">
              The Universal Formula
            </h3>

            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            At its core, "Kasto Chha" follows a simple and powerful structure:
            </p>

            <div className={`p-[1.5px] rounded-lg ${brandGradient} inline-block shadow-md`}>
              <div className="bg-white px-5 py-2 rounded-[7px] font-mono text-[#1E40AF] font-bold text-base md:text-lg">
                [Subject] + Kasto Chha?
              </div>
            </div>
    
           <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            This flexibility allows the same phrase to work across everyday life, from food and travel to technology and personal well-being. For example,
            </p>      

            <div className="grid md:grid-cols-2 gap-6 pt-6">
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 text-sm">
                <h3 className="font-bold mb-3 text-gray-800 flex items-center">🍲 <span className="ml-2">Experience Search</span></h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• "Momo kasto chha?"</li>
                  <li>• "Thakali khana kasto chha?"</li>
                  <li>• "Jhamsikhel café kasto chha?"</li>
                </ul>
              </div>

              <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 text-sm">
                <h3 className="font-bold mb-3 text-gray-800 flex items-center">⛰️ <span className="ml-2">Reliability Search</span></h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• "iPhone 15 kasto chha?"</li>
                  <li>• "Mughling ko baato kasto chha?"</li>
                  <li>• "Tapailai kasto chha?"</li>
                </ul>
              </div>
            </div>
          </section>

          <div className={`h-[1px] w-16 my-10 rounded-full ${brandGradient} opacity-40`} />

          {/* Section 3: Platform & Methodology */}
          <section className="space-y-5">
            <h2 className={`text-xl md:text-2xl font-black text-transparent bg-clip-text ${brandGradient}`}>
              KastoChha Platform
            </h2>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              KastoChha is built as a Nepal-focused AI Answer Engine designed for the Curious Community Network to deliver the ground reality before you decide to buy, eat, or travel. Our core strength lies in understanding local context, lived experience, and comparison-based intent behind "kasto chha" questions.
            </p>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base italic">
              At the heart of the platform is our interactive AI Answer Engine, which leverages advanced models to curate instant, personalized insights for "how is it" queries that traditional search results often miss.
            </p>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              Alongside this, we publish deeply researched, handcrafted blogs to provide editorial depth, cultural nuance, and long-form context that strengthens the overall quality of our answers.
            </p>
          </section>

          {/* Quick Answers Section */}
          <section className="mt-12 p-6 md:p-8 bg-gray-50 rounded-2xl border border-gray-200">
            <h2 className={`text-lg md:text-xl font-bold mb-6 text-transparent bg-clip-text ${brandGradient} border-b border-gray-200 pb-2`}>
              Quick Answers
            </h2>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm md:text-base font-extrabold text-gray-900 mb-1">How do you curate answers?</p>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                 We use custom-tuned AI models designed specifically for the "kasto chha" (how is it) intent. These models synthesize insights from current data, local context, and real-world signals to deliver clear, experience-based answers, instead of vague or generic responses commonly associated with general-purpose LLMs.
                </p>
              </div>

              <div>
                <p className="text-sm md:text-base font-extrabold text-gray-900 mb-1">What is the difference between blogs and AI answers?</p>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                 Our blogs are handcrafted for deep exploration, storytelling, and cultural context. Our AI Answer Engine delivers instant, experience-based summaries for specific "kasto chha" questions when you want a quick, practical answer.
                </p>
              </div>

              <div>
                <p className="text-sm md:text-base font-extrabold text-gray-900 mb-1">Is this a general search engine?</p>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  No. Kasto Chha is intentionally not built for generic or purely factual searches. It is designed for questions where quality, experience, comparison, and local context matter, the kind of questions people naturally ask in the Kasto Chha style.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
      <DiscordButton />
    </div>
  );
}
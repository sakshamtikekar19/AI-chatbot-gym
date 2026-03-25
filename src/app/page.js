import Chatbot from "@/components/Chatbot";
import { Dumbbell, Utensils, Zap, ArrowRight, CheckCircle2, Star } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-red-600/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform cursor-pointer">
              <Dumbbell className="text-white" size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">
              AI <span className="text-red-600">GYM</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Workouts</a>
            <a href="#" className="hover:text-white transition-colors">Nutrition</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <button className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-red-600 hover:text-white transition-all active:scale-95">
            Join Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-red-900/10 rounded-full blur-[120px] -z-10"></div>

        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-red-500 mb-8 animate-fade-in">
            <Star size={14} fill="currentColor" />
            THE FUTURE OF FITNESS IS HERE
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-gradient">
            TRAIN SMARTER WITH <br />
            <span className="text-red-600 italic">AI FITNESS COACH</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Get personalized workout & diet plans instantly. Our AI understands your goals and crafts the perfect roadmap for your transformation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 group transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(220,38,38,0.3)]">
              Start Your Plan
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto glass hover:bg-white/10 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all border border-white/10">
              View Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Workout Plans",
                desc: "Custom routines designed for your body type and fitness goals.",
                icon: <Zap className="text-red-600" size={32} />,
                delay: "0s"
              },
              {
                title: "Smart Diet Suggestions",
                desc: "Personalized nutrition plans including simple Indian recipes.",
                icon: <Utensils className="text-red-600" size={32} />,
                delay: "0.1s"
              },
              {
                title: "24/7 Fitness Assistant",
                desc: "Your personal trainer is always available to answer your questions.",
                icon: <Dumbbell className="text-red-600" size={32} />,
                delay: "0.2s"
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className="glass p-10 rounded-3xl border border-white/5 hover:border-red-600/30 transition-all group hover:-translate-y-2"
              >
                <div className="mb-6 p-4 bg-white/5 w-fit rounded-2xl group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto glass p-12 md:p-20 rounded-[40px] text-center border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-[100px] -z-10 group-hover:scale-150 transition-transform duration-1000"></div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">
            READY TO TRANSFORM?
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-xl mx-auto">
            Join thousands of others who have already started their AI-powered fitness journey.
          </p>
          <button className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xl hover:bg-red-600 hover:text-white transition-all active:scale-95 shadow-2xl">
            Try AI Coach
          </button>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-500 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-red-600" />
              No Credit Card Required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-red-600" />
              Instant Access
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-red-600" />
              Cancel Anytime
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>© 2026 AI GYM. All rights reserved. Powered by OpenAI.</p>
      </footer>

      {/* Chatbot Component */}
      <Chatbot />
    </main>
  );
}

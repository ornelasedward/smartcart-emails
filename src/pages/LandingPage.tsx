
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { ArrowRight, Mail, ShoppingCart, RefreshCcw } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight animate-fade-in">
              <span className="bg-clip-text text-transparent smartcart-gradient">Emails for your SaaS</span>
              <br />Made easy
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
              Automate your transactional emails with Vibe Sends. Connect your Stripe account and
              send perfectly timed emails for purchases, abandoned carts, and more.
            </p>
            <div className="mt-12">
              <Link to="/signup">
                <Button size="lg" className="px-8 py-6 text-lg">
                  Sign Up <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How Vibe Sends Works</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <ShoppingCart className="text-brand-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Purchase Confirmations</h3>
                <p className="text-gray-600">
                  Automatically send branded confirmation emails when customers complete a purchase.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <RefreshCcw className="text-brand-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Abandoned Cart Recovery</h3>
                <p className="text-gray-600">
                  Recover lost sales with automated emails including discount codes for abandoned carts.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                  <Mail className="text-brand-teal" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Subscription Management</h3>
                <p className="text-gray-600">
                  Send renewal notices, cancellation follow-ups, and win-back campaigns automatically.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to automate your emails?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Join thousands of businesses using Vibe Sends to increase revenue and customer satisfaction.
            </p>
            <Link to="/signup">
              <Button size="lg" className="px-8">
                Get Started Today
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="h-8 w-8 rounded-full smartcart-gradient mr-2"></div>
              <span className="text-lg font-semibold">Vibe Sends</span>
            </div>
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} Vibe Sends. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

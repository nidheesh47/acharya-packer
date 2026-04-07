import { Sparkles, Package, Star, Users, CheckCircle, Scan, Rocket } from "lucide-react";
import { Link } from "react-router";
import { Form } from "react-router";
import { TrustIndicators } from "./TrustIndicators";

export function HeroSection({ showForm }) {
  return (
    <section id="hero" className="relative pt-24 md:pt-32 pb-12 md:pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              Streamline Your Logistics Operations
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800 mb-6 leading-tight">
              Smart Packing & Scanning
              <span className="block bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
              Transform your logistics workflow with our comprehensive packing and scanning solution. 
              Real-time tracking, efficient management, and seamless operations in one platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {showForm && (
                <Form method="post" action="/auth/login" className="flex-1 max-w-md mx-auto lg:mx-0">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      name="shop"
                      placeholder="your-store.myshopify.com"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-medium rounded-lg hover:from-yellow-600 hover:to-amber-600 transition-all duration-200 shadow-md"
                    >
                      Connect Store
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Enter your Shopify store domain</p>
                </Form>
              )}
              
              <Link
                to="/user/login"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-yellow-600 text-yellow-600 font-medium rounded-lg hover:bg-yellow-50 transition-all duration-200"
              >
                <Package className="mr-2 h-5 w-5" />
                User Dashboard
              </Link>
            </div>

            <TrustIndicators />
          </div>
          
          <HeroCard />
        </div>
      </div>
    </section>
  );
}

function HeroCard() {
  return (
    <div className="relative">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 bg-green-50 p-4 rounded-lg border border-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <h3 className="font-semibold text-gray-800">Real-time Scanning</h3>
              <p className="text-sm text-gray-600">Instant package tracking updates</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
            <BarChart className="h-6 w-6 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-800">Analytics Dashboard</h3>
              <p className="text-sm text-gray-600">Comprehensive performance metrics</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 bg-purple-50 p-4 rounded-lg border border-purple-100">
            <Shield className="h-6 w-6 text-purple-600" />
            <div>
              <h3 className="font-semibold text-gray-800">Secure Platform</h3>
              <p className="text-sm text-gray-600">Enterprise-grade security</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-4 -right-4 bg-yellow-100 p-4 rounded-2xl shadow-lg transform -rotate-12">
        <Scan className="h-8 w-8 text-yellow-600" />
      </div>
      <div className="absolute -bottom-4 -left-4 bg-red-100 p-4 rounded-2xl shadow-lg transform rotate-12">
        <Rocket className="h-8 w-8 text-red-600" />
      </div>
    </div>
  );
}

// Import BarChart and Shield for the hero card
import { BarChart, Shield } from "lucide-react";
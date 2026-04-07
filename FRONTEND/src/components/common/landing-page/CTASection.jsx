import { Shield, Globe, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Form } from "react-router";

export function CTASection({ showForm }) {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-yellow-500 to-amber-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Logistics?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust Acharya Pack and Scan for their logistics management
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {showForm && (
              <Form method="post" action="/auth/login" className="flex-1 max-w-md">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    name="shop"
                    placeholder="your-store.myshopify.com"
                    className="flex-1 px-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent bg-white/10 text-white placeholder-white/70 border border-white/30"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-white text-yellow-600 font-medium rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-md"
                  >
                    Get Started Free
                  </button>
                </div>
              </Form>
            )}
            
            <Link
              to="/user/login"
              className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-yellow-600 transition-all duration-200"
            >
              Access User Panel
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/80">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              <span>Secure & Reliable</span>
            </div>
            <div className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>14-Day Free Trial</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
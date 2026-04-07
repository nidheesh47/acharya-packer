import { Send, CheckCircle } from "lucide-react";
import { Form } from "react-router";

export function ContactForm({ formSubmitted, actionData, isSending, setIsSending }) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Send us a message</h3>
      
      {formSubmitted ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
          <h4 className="font-semibold text-green-800 mb-2">Message Sent Successfully!</h4>
          <p className="text-sm text-green-700">
            {actionData?.message || "Thank you for contacting us! We'll get back to you within 2 hours."}
          </p>
        </div>
      ) : (
        <Form method="post" onSubmit={() => setIsSending(true)}>
          <input type="hidden" name="intent" value="contact" />
          <input type="hidden" name="shopDomain" value={typeof window !== 'undefined' ? window.location.hostname : ''} />
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
              <input
                type="text"
                name="name"
                required
                disabled={isSending}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input
                type="email"
                name="email"
                required
                disabled={isSending}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select
                name="subject"
                disabled={isSending}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Account Setup">Account Setup</option>
                <option value="Billing Question">Billing Question</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Report Bug">Report Bug</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
              <textarea
                name="message"
                rows="4"
                required
                disabled={isSending}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Please describe your question or issue in detail..."
              ></textarea>
            </div>
            
            {actionData?.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-700">{actionData.error}</p>
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSending}
              className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-medium rounded-lg hover:from-yellow-600 hover:to-amber-600 transition-all duration-200 shadow-md flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </>
              )}
            </button>
          </div>
        </Form>
      )}
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          We'll get back to you within 2 hours during business hours (Mon-Sat, 9AM-7PM IST)
        </p>
      </div>
    </div>
  );
}
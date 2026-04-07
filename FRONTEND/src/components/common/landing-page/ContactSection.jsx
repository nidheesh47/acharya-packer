import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Form } from "react-router";
import { ContactInfoCard } from "./ContactInfoCard";
import { ContactForm } from "./ContactForm";

export function ContactSection({ formSubmitted, actionData, isSending, setIsSending }) {
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-yellow-600" />,
      title: "Email Support",
      value: "it@acharyapanchakarma.com",
      link: "mailto:it@acharyapanchakarma.com",
      description: "Response within 2 hours"
    },
    {
      icon: <Phone className="h-6 w-6 text-yellow-600" />,
      title: "Phone Support",
      value: "+91 8075146088",
      link: "tel:+918075146088",
      description: "Mon-Sat, 9:00 AM - 7:00 PM IST"
    },
    {
      icon: <MapPin className="h-6 w-6 text-yellow-600" />,
      title: "Office Location",
      value: "Acharya Panchakarma, Kerala, India",
      link: null,
      description: null
    }
  ];

  return (
    <section id="contact" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium mb-4">
            <Mail className="h-4 w-4 mr-2" />
            Get in Touch
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Contact Our Support Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to our support team
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            {contactInfo.map((info, idx) => (
              <ContactInfoCard key={idx} {...info} />
            ))}
          </div>

          <ContactForm 
            formSubmitted={formSubmitted}
            actionData={actionData}
            isSending={isSending}
            setIsSending={setIsSending}
          />
        </div>
      </div>
    </section>
  );
}
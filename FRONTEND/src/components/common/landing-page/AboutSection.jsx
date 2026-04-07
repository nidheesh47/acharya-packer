import { Award, Rocket, Users, Globe } from "lucide-react";

export function AboutSection() {
  const stats = [
    { value: "5K+", label: "Businesses Served", color: "blue" },
    { value: "99.9%", label: "Accuracy Rate", color: "green" },
    { value: "24/7", label: "Support", color: "purple" }
  ];

  const benefits = [
    { icon: <Award className="h-5 w-5" />, text: "Industry-leading accuracy and reliability" },
    { icon: <Rocket className="h-5 w-5" />, text: "10x faster processing than manual systems" },
    { icon: <Users className="h-5 w-5" />, text: "Dedicated customer support team" },
    { icon: <Globe className="h-5 w-5" />, text: "Global shipping integrations" }
  ];

  return (
    <section id="about" className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AboutStory stats={stats} />
          <AboutContent benefits={benefits} />
        </div>
      </div>
    </section>
  );
}

function AboutStory({ stats }) {
  return (
    <div className="order-2 lg:order-1">
      <div className="bg-white rounded-2xl shadow-md p-8 relative border border-gray-200">
        <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md">
          Since 2020
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h3>
        <p className="text-gray-600 mb-4">
          Founded in 2020, Acharya Pack and Scan emerged from a simple observation: logistics operations 
          were too complex and time-consuming for growing businesses. We set out to create a solution 
          that combines intelligent packing algorithms with seamless scanning technology.
        </p>
        <p className="text-gray-600 mb-6">
          Today, we serve over 5,000+ businesses worldwide, processing millions of orders monthly with 
          99.9% accuracy. Our commitment to innovation and customer success drives everything we do.
        </p>
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className={`text-center p-3 bg-${stat.color}-50 rounded-lg`}>
              <div className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutContent({ benefits }) {
  return (
    <div className="order-1 lg:order-2">
      <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium mb-4">
        <Award className="h-4 w-4 mr-2" />
        Why Choose Us
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        The Smart Choice for Logistics
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        We're dedicated to providing the best logistics management solution for businesses of all sizes.
      </p>
      <div className="space-y-4">
        {benefits.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-3 p-4 bg-white rounded-lg hover:shadow-md transition-all border border-gray-100">
            <div className="text-yellow-500">{item.icon}</div>
            <span className="text-gray-700 font-medium">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
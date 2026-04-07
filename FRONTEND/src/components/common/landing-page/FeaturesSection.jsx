import { Zap, Package, Scan, BarChart, Clock, TrendingUp, Smartphone } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

export function FeaturesSection() {
  const features = [
    { 
      icon: <Package className="h-8 w-8" />, 
      title: "Smart Packing", 
      description: "Optimize packing processes with intelligent suggestions and automated workflows.", 
      color: "from-blue-500 to-cyan-500", 
      badge: "New" 
    },
    { 
      icon: <Scan className="h-8 w-8" />, 
      title: "QR/Barcode Scanning", 
      description: "Fast and accurate scanning with real-time data synchronization.", 
      color: "from-green-500 to-emerald-500", 
      badge: "Popular" 
    },
    { 
      icon: <BarChart className="h-8 w-8" />, 
      title: "Real-time Analytics", 
      description: "Monitor performance with comprehensive dashboards and reports.", 
      color: "from-purple-500 to-pink-500", 
      badge: "Pro" 
    },
    { 
      icon: <Clock className="h-8 w-8" />, 
      title: "Time Tracking", 
      description: "Monitor packing times and optimize operational efficiency.", 
      color: "from-yellow-500 to-amber-500", 
      badge: null 
    },
    { 
      icon: <TrendingUp className="h-8 w-8" />, 
      title: "Performance Metrics", 
      description: "Track KPIs and improve your logistics operations.", 
      color: "from-indigo-500 to-purple-500", 
      badge: null 
    },
    { 
      icon: <Smartphone className="h-8 w-8" />, 
      title: "Mobile Ready", 
      description: "Access from any device with responsive design and mobile apps.", 
      color: "from-pink-500 to-rose-500", 
      badge: "Coming Soon" 
    }
  ];

  return (
    <section id="features" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium mb-4">
            <Zap className="h-4 w-4 mr-2" />
            Powerful Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive tools to manage your logistics operations efficiently
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  UtensilsCrossed, 
  Clock, 
  TrendingUp, 
  Shield, 
  Check,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Users,
  BarChart3,
  Smartphone,
  Headphones,
  Zap,
  Receipt,
  Star,
  IndianRupee,
  Printer,
  ChefHat,
  QrCode
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Restaurant data for the trusted section
const trustedRestaurants = [
  {
    id: 1,
    name: "Spice Garden",
    location: "Airoli",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    rating: 4.8
  },
  {
    id: 2,
    name: "The Coastal Kitchen",
    location: "Koparkhairane",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop",
    rating: 4.9
  },
  {
    id: 3,
    name: "Mumbai Masala House",
    location: "Airoli",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    rating: 4.7
  },
  {
    id: 4,
    name: "Green Leaf Bistro",
    location: "Koparkhairane",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=300&fit=crop",
    rating: 4.6
  },
  {
    id: 5,
    name: "Royal Punjab Dhaba",
    location: "Airoli",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
    rating: 4.8
  },
  {
    id: 6,
    name: "Saffron Tales",
    location: "Koparkhairane",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop",
    rating: 4.9
  },
  {
    id: 7,
    name: "The Italian Corner",
    location: "Airoli",
    image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=400&h=300&fit=crop",
    rating: 4.5
  },
  {
    id: 8,
    name: "Dragon Wok",
    location: "Koparkhairane",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&h=300&fit=crop",
    rating: 4.7
  }
];

// Infinite scrolling restaurant cards
const TrustedRestaurantsCarousel = () => {
  const duplicatedRestaurants = [...trustedRestaurants, ...trustedRestaurants, ...trustedRestaurants];
  
  return (
    <div className="overflow-hidden py-8">
      <motion.div
        className="flex gap-6"
        animate={{
          x: [0, -288 * trustedRestaurants.length],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          },
        }}
      >
        {duplicatedRestaurants.map((restaurant, index) => (
          <div
            key={`${restaurant.id}-${index}`}
            className="flex-shrink-0 w-72"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 h-64">
              <div className="relative h-40 overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-semibold">{restaurant.rating}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 truncate">{restaurant.name}</h3>
                <div className="flex items-center gap-1 text-gray-600 mt-1">
                  <MapPin className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">{restaurant.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// Animated Background Component
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Orb 1 - Orange */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(249,115,22,0.8) 0%, rgba(249,115,22,0) 70%)",
        }}
        initial={{ x: "-20%", y: "-20%" }}
        animate={{
          x: ["-20%", "10%", "-10%", "-20%"],
          y: ["-20%", "10%", "20%", "-20%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Gradient Orb 2 - Red */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-25 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(239,68,68,0.8) 0%, rgba(239,68,68,0) 70%)",
        }}
        initial={{ x: "60%", y: "60%" }}
        animate={{
          x: ["60%", "40%", "70%", "60%"],
          y: ["60%", "30%", "50%", "60%"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Gradient Orb 3 - Yellow */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(251,191,36,0.8) 0%, rgba(251,191,36,0) 70%)",
        }}
        initial={{ x: "80%", y: "-10%" }}
        animate={{
          x: ["80%", "50%", "90%", "80%"],
          y: ["-10%", "20%", "0%", "-10%"],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Gradient Orb 4 - Pink/Purple */}
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.6) 0%, rgba(236,72,153,0) 70%)",
        }}
        initial={{ x: "20%", y: "70%" }}
        animate={{
          x: ["20%", "40%", "10%", "20%"],
          y: ["70%", "50%", "80%", "70%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Mesh gradient overlay */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(at 40% 20%, rgba(249,115,22,0.15) 0px, transparent 50%),
            radial-gradient(at 80% 0%, rgba(239,68,68,0.1) 0px, transparent 50%),
            radial-gradient(at 0% 50%, rgba(251,191,36,0.1) 0px, transparent 50%),
            radial-gradient(at 80% 50%, rgba(236,72,153,0.1) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(249,115,22,0.15) 0px, transparent 50%),
            radial-gradient(at 80% 100%, rgba(239,68,68,0.1) 0px, transparent 50%)
          `,
        }}
      />
    </div>
  );
};

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const getPrice = (monthlyPrice: number) => {
    if (billingCycle === 'yearly') {
      return Math.round(monthlyPrice * 10);
    }
    return monthlyPrice;
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navbar */}
      <motion.nav 
        className={`border-b bg-white/95 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <UtensilsCrossed className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">KHAO PEEO</h1>
          </div>
          
          <div className="hidden lg:flex items-center gap-8">
            {["Features", "Pricing", "About Us", "Contact"].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(" ", "")}`} 
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
              >
                {item}
              </a>
            ))}
          </div>
          
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost" className="text-gray-700">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                Start Free Trial
              </Button>
            </Link>
          </div>

          <button 
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="lg:hidden border-t bg-white"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                {["Features", "Pricing", "About Us", "Contact"].map((item, index) => (
                  <motion.a 
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "")}`} 
                    className="text-gray-700 hover:text-orange-600 py-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item}
                  </motion.a>
                ))}
                <Link to="/auth">
                  <Button variant="ghost" className="w-full">Sign In</Button>
                </Link>
                <Link to="/auth">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">Start Free Trial</Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section with Animated Background */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Animated Background */}
        <AnimatedBackground />
        
        {/* Content */}
        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-6"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-orange-700 font-semibold text-sm border border-orange-200 shadow-sm"
                variants={itemVariants}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                India's #1 Restaurant POS & Billing Software
              </motion.div>
              
              <motion.h1 
                className="text-4xl lg:text-6xl font-bold leading-tight text-gray-900"
                variants={itemVariants}
              >
                Smart{" "}
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Restaurant Billing
                </span>{" "}
                Made Simple
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 leading-relaxed"
                variants={itemVariants}
              >
                All-in-one POS system for restaurants, cafes & cloud kitchens. Generate GST-compliant bills, manage orders with KOT, track inventory & boost your revenue — all from one powerful dashboard.
              </motion.p>

              {/* Key Features Pills */}
              <motion.div 
                className="flex flex-wrap gap-3"
                variants={itemVariants}
              >
                {[
                  { icon: Receipt, text: "GST Billing" },
                  { icon: Printer, text: "KOT Printing" },
                  { icon: QrCode, text: "QR Ordering" },
                  { icon: ChefHat, text: "Kitchen Display" },
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium text-gray-700"
                  >
                    <feature.icon className="h-4 w-4 text-orange-600" />
                    {feature.text}
                  </div>
                ))}
              </motion.div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-4"
                variants={itemVariants}
              >
                <Link to="/auth">
                  <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white text-lg px-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                    Start Free Trial
                    <span className="ml-2 text-sm bg-white/20 px-2 py-0.5 rounded">14 Days</span>
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-lg px-8 border-gray-300 text-orange-600 transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <Phone className="h-5 w-5 mr-2" />
                  Request Demo
                </Button>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-6 pt-6 text-sm text-gray-600"
                variants={itemVariants}
              >
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Free setup assistance</span>
                </div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div 
                className="flex items-center gap-4 pt-4"
                variants={itemVariants}
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-bold text-gray-900">5,000+</span>
                  <span className="text-gray-600"> restaurants trust us</span>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-red-600/20 rounded-3xl blur-3xl" />
              
              {/* Main Dashboard Image */}
              <a 
                href="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
                  alt="Restaurant POS Billing System Dashboard"
                  className="relative rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-[1.02] w-full"
                />
              </a>
              
              {/* Floating Cards */}
              <motion.div
                className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <IndianRupee className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Today's Sales</p>
                    <p className="font-bold text-gray-900">₹45,250</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Receipt className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Bills Generated</p>
                    <p className="font-bold text-gray-900">127 Today</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-8 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg shadow-lg px-4 py-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
              >
                <p className="text-sm font-medium">GST Compliant ✓</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted Restaurants Section */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-red-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Trusted by Leading Restaurants
            </h2>
            <p className="text-xl text-gray-600">
              Join hundreds of successful restaurants in Airoli and Koparkhairane
            </p>
          </motion.div>
          <TrustedRestaurantsCarousel />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-br from-gray-50 to-orange-50/30 py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { value: "5000+", label: "Active Restaurants" },
              { value: "₹50Cr+", label: "Monthly Transactions" },
              { value: "99.9%", label: "Uptime Guaranteed" },
              { value: "24/7", label: "Customer Support" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-xl bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-300"
                variants={itemVariants}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Everything You Need to Run Your Restaurant</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful billing, seamless operations, and real-time insights — all in one platform
          </p>
        </motion.div>
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {[
            { icon: Receipt, color: "bg-orange-100", iconColor: "text-orange-600", title: "GST-Compliant Billing", description: "Generate accurate GST invoices instantly. Supports CGST, SGST, and IGST calculations with automatic tax reports for hassle-free filing." },
            { icon: Printer, color: "bg-blue-100", iconColor: "text-blue-600", title: "KOT & Kitchen Printing", description: "Send orders directly to kitchen printers. Manage multiple KOT printers for different sections — main kitchen, bar, desserts, and more." },
            { icon: Users, color: "bg-green-100", iconColor: "text-green-600", title: "Table & Order Management", description: "Visual table layout with real-time status. Split bills, merge tables, transfer orders, and manage dine-in, takeaway & delivery." },
            { icon: BarChart3, color: "bg-purple-100", iconColor: "text-purple-600", title: "Sales & Inventory Reports", description: "Track daily sales, best-selling items, stock levels, and profit margins. Get insights to make smarter business decisions." },
            { icon: QrCode, color: "bg-red-100", iconColor: "text-red-600", title: "QR Code Ordering", description: "Let customers scan, browse menu, and order from their phones. Reduce wait time and increase table turnover." },
            { icon: Smartphone, color: "bg-yellow-100", iconColor: "text-yellow-600", title: "Works Offline", description: "No internet? No problem. Continue billing offline and sync automatically when connection is restored." }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              variants={itemVariants}
            >
              <div className={`h-14 w-14 ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                <feature.icon className={`h-7 w-7 ${feature.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 mb-8">
              Choose the perfect plan for your restaurant. All plans include 14-day free trial.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4">
              <span className={`font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                  billingCycle === 'yearly' ? 'bg-orange-600' : 'bg-gray-300'
                }`}
              >
                <motion.div
                  className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
                  animate={{ x: billingCycle === 'yearly' ? 32 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              </button>
              <span className={`font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
                Yearly
              </span>
              {billingCycle === 'yearly' && (
                <motion.span 
                  className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Save 2 months!
                </motion.span>
              )}
            </div>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {/* Starter Plan */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 h-full flex flex-col"
              variants={itemVariants}
            >
              <div className="flex-grow">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Starter</h3>
                <p className="text-gray-600 mb-6">Perfect for small restaurants & cafes</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">₹{getPrice(2999).toLocaleString()}</span>
                  <span className="text-gray-600">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {["Up to 10 tables", "GST billing & invoicing", "Basic KOT printing", "Daily sales reports", "Email & chat support"].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link to="/auth" className="block mt-auto">
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                  Start Free Trial
                </Button>
              </Link>
            </motion.div>

            {/* Professional Plan */}
            <motion.div 
              className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-2xl p-8 relative h-full flex flex-col lg:scale-105"
              variants={itemVariants}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-bold mb-2 text-white">Professional</h3>
                <p className="text-orange-100 mb-6">For growing restaurants</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">₹{getPrice(5999).toLocaleString()}</span>
                  <span className="text-orange-100">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {["Up to 30 tables", "Advanced billing & multiple KOT", "Full inventory management", "Staff & attendance tracking", "QR code ordering", "Priority phone support"].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                      <span className="text-white">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link to="/auth" className="block mt-auto">
                <Button className="w-full bg-white hover:bg-gray-100 text-orange-600">
                  Start Free Trial
                </Button>
              </Link>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 h-full flex flex-col"
              variants={itemVariants}
            >
              <div className="flex-grow">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Enterprise</h3>
                <p className="text-gray-600 mb-6">For chains & franchises</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">₹{getPrice(12999).toLocaleString()}</span>
                  <span className="text-gray-600">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {["Unlimited tables & outlets", "Multi-location dashboard", "Central menu management", "Custom integrations & API", "Dedicated account manager", "24/7 priority support"].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link to="/auth" className="block mt-auto">
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                  Contact Sales
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-20">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Why Restaurant Owners Choose KHAO PEEO</h2>
        </motion.div>
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {[
            { icon: Zap, color: "bg-orange-100", iconColor: "text-orange-600", title: "Lightning Fast", description: "Generate bills in under 10 seconds" },
            { icon: Receipt, color: "bg-blue-100", iconColor: "text-blue-600", title: "100% GST Compliant", description: "Auto-calculate & file GST returns" },
            { icon: Headphones, color: "bg-green-100", iconColor: "text-green-600", title: "Expert Support", description: "Free setup & training included" },
            { icon: Smartphone, color: "bg-purple-100", iconColor: "text-purple-600", title: "Works Anywhere", description: "Cloud-based with offline mode" }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="text-center"
              variants={itemVariants}
            >
              <div className={`h-16 w-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <item.icon className={`h-8 w-8 ${item.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="bg-gradient-to-r from-orange-600 to-red-600 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold mb-6 text-white"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to Simplify Your Restaurant Billing?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 text-orange-100 max-w-2xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join 5,000+ restaurants using KHAO PEEO to streamline billing, manage orders, and grow their business.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/auth">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 transition-all duration-300 hover:scale-105">
                Start 14-Day Free Trial
              </Button>
            </Link>
            <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 transition-all duration-300 hover:scale-105">
              <Phone className="h-5 w-5 mr-2" />
              Call: +91 98765 43210
            </Button>
          </motion.div>
          <motion.p 
            className="text-orange-100 mt-6 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            No credit card required • Free setup assistance • Cancel anytime
          </motion.p>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <UtensilsCrossed className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">KHAO PEEO</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                India's leading restaurant POS & billing software. Trusted by 5,000+ restaurants for GST-compliant billing, order management, and business growth.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors duration-300"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Product */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-white font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-3">
                {["Billing Software", "KOT Management", "Inventory", "Reports & Analytics", "QR Ordering", "Integrations"].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-orange-500 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-white font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                {["About Us", "Careers", "Blog", "Press Kit", "Partners", "Refer & Earn"].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-orange-500 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Airoli, Navi Mumbai, Maharashtra 400708</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-orange-500 flex-shrink-0" />
                  <a href="tel:+919876543210" className="text-sm hover:text-orange-500">+91 98765 43210</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-orange-500 flex-shrink-0" />
                  <a href="mailto:hello@khaopeeo.com" className="text-sm hover:text-orange-500">hello@khaopeeo.com</a>
                </li>
              </ul>
            </motion.div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2025 KHAO PEEO. All rights reserved. Made with ❤️ in India
              </p>
              <div className="flex gap-6 text-sm">
                {["Privacy Policy", "Terms of Service", "Refund Policy"].map((item, i) => (
                  <a 
                    key={i}
                    href="#" 
                    className="hover:text-orange-500 transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
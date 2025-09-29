"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Building2,
  Users,
  Mail,
  Phone,
  DollarSign,
  Tag,
  Package,
  User,
  CheckCircle,
  Zap,
  TrendingUp,
  Target,
} from "lucide-react"

type FormType = "business" | "rep" | null
type Category = "Real Estate" | "Tech" | "Fashion" | "Food" | "Health" | "Education" | "Other"
type PriceRange = "<$100" | "$100+" | "$200+" | "$500+" | "$1000+"

interface BusinessFormData {
  type: "business"
  businessName: string
  product: string
  category: Category
  priceRange: PriceRange
  commission: string
  email: string
  phone: string
}

interface RepFormData {
  type: "rep"
  repName: string
  categoryPreference: Category
  preferredPriceRange: PriceRange
  email: string
  phone: string
  status: "Available"
}

const categories: Category[] = ["Real Estate", "Tech", "Fashion", "Food", "Health", "Education", "Other"]
const priceRanges: PriceRange[] = ["<$100", "$100+", "$200+", "$500+", "$1000+"]

export default function TechWaveLanding() {
  const [activeForm, setActiveForm] = useState<FormType>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [showContact, setShowContact] = useState(false)

  const [businessForm, setBusinessForm] = useState<BusinessFormData>({
    type: "business",
    businessName: "",
    product: "",
    category: "Tech",
    priceRange: "$200+",
    commission: "",
    email: "",
    phone: "",
  })

  const [repForm, setRepForm] = useState<RepFormData>({
    type: "rep",
    repName: "",
    categoryPreference: "Tech",
    preferredPriceRange: "$200+",
    email: "",
    phone: "",
    status: "Available",
  })

  const handleSubmit = async (formData: BusinessFormData | RepFormData) => {
    setIsLoading(true)

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwN0eK_m_jLijnA4LPfeA0K7KniFdoqy2C2yVDiuiMcHE3trRQC_y-0MbOgi4y65Wl1/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          mode: "no-cors", // Added no-cors mode to handle Google Apps Script CORS restrictions
        },
      )

      console.log("[v0] Form submitted successfully:", formData)
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setActiveForm(null)
        if (formData.type === "business") {
          setBusinessForm({
            type: "business",
            businessName: "",
            product: "",
            category: "Tech",
            priceRange: "$200+",
            commission: "",
            email: "",
            phone: "",
          })
        } else {
          setRepForm({
            type: "rep",
            repName: "",
            categoryPreference: "Tech",
            preferredPriceRange: "$200+",
            email: "",
            phone: "",
            status: "Available",
          })
        }
      }, 3000)
    } catch (error) {
      console.error("[v0] Submission error:", error)
      alert("There was an error submitting your form. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSectionClick = (section: "about" | "contact") => {
    if (section === "about") {
      setShowAbout(true)
      setShowContact(false)
    } else {
      setShowContact(true)
      setShowAbout(false)
    }
    setActiveForm(null)
  }

  const CategorySelector = ({
    value,
    onChange,
    categories,
  }: {
    value: Category
    onChange: (category: Category) => void
    categories: Category[]
  }) => (
    <div className="grid grid-cols-2 gap-2">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          className={`p-3 rounded-xl text-sm font-medium transition-all ${
            value === category
              ? "gradient-teal text-primary-foreground shadow-lg"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )

  const PriceRangeSelector = ({
    value,
    onChange,
    ranges,
  }: {
    value: PriceRange
    onChange: (range: PriceRange) => void
    ranges: PriceRange[]
  }) => (
    <div className="grid grid-cols-3 gap-2">
      {ranges.map((range) => (
        <button
          key={range}
          type="button"
          onClick={() => onChange(range)}
          className={`p-3 rounded-xl text-sm font-medium transition-all ${
            value === range
              ? "gradient-teal text-primary-foreground shadow-lg"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          {range}
        </button>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-teal rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gradient">RepLinker</span>
                <span className="text-xs text-muted-foreground -mt-1">Smart Connections. Faster Closings.</span>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => handleSectionClick("about")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </button>
              <button
                onClick={() => handleSectionClick("contact")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact Us
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {showAbout && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
            <Card className="p-12 rounded-3xl shadow-2xl border-border/50">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 gradient-teal rounded-3xl mx-auto flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-4xl font-bold">About RepLinker</h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  <p>
                    RepLinker is a commission-only SaaS platform that connects businesses with sales representatives.
                  </p>
                  <p>
                    Businesses sign up and list their products/services with details, price ranges, and target
                    customers.
                  </p>
                  <p>
                    Sales reps sign up, select the types of products or price ranges they want to sell, and input their
                    experience.
                  </p>
                  <p>RepLinker automatically matches businesses to the right sales reps.</p>
                  <p>
                    This gives businesses faster access to closers, while sales reps get unlimited commission-only
                    opportunities.
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setShowAbout(false)
                    setShowContact(false)
                  }}
                  className="gradient-teal hover:gradient-teal-hover text-primary-foreground font-semibold px-8 py-3 rounded-2xl"
                >
                  Back to Home
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {showContact && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
            <Card className="p-12 rounded-3xl shadow-2xl border-border/50">
              <div className="text-center space-y-8">
                <div className="w-16 h-16 gradient-teal rounded-3xl mx-auto flex items-center justify-center">
                  <Mail className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-4xl font-bold">Contact Us</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-center space-x-3 text-lg">
                    <span className="text-2xl">📧</span>
                    <span className="text-muted-foreground">Email:</span>
                    <a href="mailto:contact@replinker.com" className="text-primary hover:underline">
                      contact@replinker.com
                    </a>
                  </div>
                  <div className="flex items-center justify-center space-x-3 text-lg">
                    <span className="text-2xl">🐦</span>
                    <span className="text-muted-foreground">Twitter:</span>
                    <a
                      href="https://twitter.com/RepLinker"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @RepLinker
                    </a>
                  </div>
                  <div className="flex items-center justify-center space-x-3 text-lg">
                    <span className="text-2xl">📘</span>
                    <span className="text-muted-foreground">Facebook:</span>
                    <a
                      href="https://facebook.com/RepLinker"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      RepLinker
                    </a>
                  </div>
                  <div className="flex items-center justify-center space-x-3 text-lg">
                    <span className="text-2xl">📱</span>
                    <span className="text-muted-foreground">Instagram:</span>
                    <a
                      href="https://instagram.com/RepLinker"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @RepLinker
                    </a>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setShowAbout(false)
                    setShowContact(false)
                  }}
                  className="gradient-teal hover:gradient-teal-hover text-primary-foreground font-semibold px-8 py-3 rounded-2xl"
                >
                  Back to Home
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {!showAbout && !showContact && (
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Side - Hero */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-secondary/50 rounded-full px-4 py-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">AI-Powered Sales Matching</span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-balance">
                  Grow Sales. <span className="text-gradient">Pay Only on Commission.</span>
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                  RepLinker instantly connects ambitious businesses with motivated sales reps. No upfront cost, just
                  results that drive your growth forward.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => setActiveForm("business")}
                  className="gradient-teal hover:gradient-teal-hover text-primary-foreground font-semibold px-8 py-6 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Building2 className="w-5 h-5 mr-2" />
                  {"I'm a Business"}
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setActiveForm("rep")}
                  className="border-primary/20 hover:bg-primary/10 font-semibold px-8 py-6 text-lg rounded-2xl transition-all"
                >
                  <Users className="w-5 h-5 mr-2" />
                  {"I'm a Sales Rep"}
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient">500+</div>
                  <div className="text-sm text-muted-foreground">Active Businesses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient">2K+</div>
                  <div className="text-sm text-muted-foreground">Sales Reps</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient">$2M+</div>
                  <div className="text-sm text-muted-foreground">Sales Generated</div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Form Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-md">
                <AnimatePresence mode="wait">
                  {!activeForm && (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center space-y-6"
                    >
                      <div className="w-24 h-24 gradient-teal rounded-3xl mx-auto flex items-center justify-center">
                        <Target className="w-12 h-12 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
                        <p className="text-muted-foreground">Choose your path and join the RepLinker community</p>
                      </div>
                    </motion.div>
                  )}

                  {activeForm === "business" && !isSubmitted && (
                    <motion.div
                      key="business-form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <Card className="p-8 rounded-3xl shadow-2xl border-border/50">
                        <div className="space-y-6">
                          <div className="text-center space-y-2">
                            <div className="w-12 h-12 gradient-teal rounded-2xl mx-auto flex items-center justify-center">
                              <Building2 className="w-6 h-6 text-primary-foreground" />
                            </div>
                            <h3 className="text-2xl font-bold">Business Registration</h3>
                            <p className="text-muted-foreground">Connect with top sales talent</p>
                          </div>

                          <form
                            onSubmit={(e) => {
                              e.preventDefault()
                              handleSubmit(businessForm)
                            }}
                            className="space-y-6"
                          >
                            <div className="space-y-2">
                              <Label htmlFor="businessName" className="flex items-center gap-2">
                                <Building2 className="w-4 h-4" />
                                Business Name
                              </Label>
                              <Input
                                id="businessName"
                                value={businessForm.businessName}
                                onChange={(e) => setBusinessForm({ ...businessForm, businessName: e.target.value })}
                                className="rounded-xl"
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="product" className="flex items-center gap-2">
                                <Package className="w-4 h-4" />
                                Product/Service
                              </Label>
                              <Input
                                id="product"
                                value={businessForm.product}
                                onChange={(e) => setBusinessForm({ ...businessForm, product: e.target.value })}
                                className="rounded-xl"
                                required
                              />
                            </div>

                            <div className="space-y-3">
                              <Label className="flex items-center gap-2">
                                <Tag className="w-4 h-4" />
                                Category
                              </Label>
                              <CategorySelector
                                value={businessForm.category}
                                onChange={(category) => setBusinessForm({ ...businessForm, category })}
                                categories={categories}
                              />
                            </div>

                            <div className="space-y-3">
                              <Label className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4" />
                                Price Range
                              </Label>
                              <PriceRangeSelector
                                value={businessForm.priceRange}
                                onChange={(priceRange) => setBusinessForm({ ...businessForm, priceRange })}
                                ranges={priceRanges}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="commission" className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4" />
                                Commission Offered (%)
                              </Label>
                              <Input
                                id="commission"
                                type="number"
                                min="1"
                                max="50"
                                value={businessForm.commission}
                                onChange={(e) => setBusinessForm({ ...businessForm, commission: e.target.value })}
                                className="rounded-xl"
                                required
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="email" className="flex items-center gap-2">
                                  <Mail className="w-4 h-4" />
                                  Email
                                </Label>
                                <Input
                                  id="email"
                                  type="email"
                                  value={businessForm.email}
                                  onChange={(e) => setBusinessForm({ ...businessForm, email: e.target.value })}
                                  className="rounded-xl"
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="phone" className="flex items-center gap-2">
                                  <Phone className="w-4 h-4" />
                                  Phone
                                </Label>
                                <Input
                                  id="phone"
                                  type="tel"
                                  value={businessForm.phone}
                                  onChange={(e) => setBusinessForm({ ...businessForm, phone: e.target.value })}
                                  className="rounded-xl"
                                  required
                                />
                              </div>
                            </div>

                            <Button
                              type="submit"
                              disabled={isLoading}
                              className="w-full gradient-teal hover:gradient-teal-hover text-primary-foreground font-semibold py-6 rounded-2xl shadow-lg transition-all"
                            >
                              {isLoading ? "Submitting..." : "Join RepLinker"}
                            </Button>
                          </form>
                        </div>
                      </Card>
                    </motion.div>
                  )}

                  {activeForm === "rep" && !isSubmitted && (
                    <motion.div
                      key="rep-form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <Card className="p-8 rounded-3xl shadow-2xl border-border/50">
                        <div className="space-y-6">
                          <div className="text-center space-y-2">
                            <div className="w-12 h-12 gradient-teal rounded-2xl mx-auto flex items-center justify-center">
                              <Users className="w-6 h-6 text-primary-foreground" />
                            </div>
                            <h3 className="text-2xl font-bold">Sales Rep Registration</h3>
                            <p className="text-muted-foreground">Start earning commissions today</p>
                          </div>

                          <form
                            onSubmit={(e) => {
                              e.preventDefault()
                              handleSubmit(repForm)
                            }}
                            className="space-y-6"
                          >
                            <div className="space-y-2">
                              <Label htmlFor="repName" className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Full Name
                              </Label>
                              <Input
                                id="repName"
                                value={repForm.repName}
                                onChange={(e) => setRepForm({ ...repForm, repName: e.target.value })}
                                className="rounded-xl"
                                required
                              />
                            </div>

                            <div className="space-y-3">
                              <Label className="flex items-center gap-2">
                                <Tag className="w-4 h-4" />
                                Category Preference
                              </Label>
                              <CategorySelector
                                value={repForm.categoryPreference}
                                onChange={(categoryPreference) => setRepForm({ ...repForm, categoryPreference })}
                                categories={categories}
                              />
                            </div>

                            <div className="space-y-3">
                              <Label className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4" />
                                Preferred Price Range
                              </Label>
                              <PriceRangeSelector
                                value={repForm.preferredPriceRange}
                                onChange={(preferredPriceRange) => setRepForm({ ...repForm, preferredPriceRange })}
                                ranges={priceRanges}
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="repEmail" className="flex items-center gap-2">
                                  <Mail className="w-4 h-4" />
                                  Email
                                </Label>
                                <Input
                                  id="repEmail"
                                  type="email"
                                  value={repForm.email}
                                  onChange={(e) => setRepForm({ ...repForm, email: e.target.value })}
                                  className="rounded-xl"
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="repPhone" className="flex items-center gap-2">
                                  <Phone className="w-4 h-4" />
                                  Phone
                                </Label>
                                <Input
                                  id="repPhone"
                                  type="tel"
                                  value={repForm.phone}
                                  onChange={(e) => setRepForm({ ...repForm, phone: e.target.value })}
                                  className="rounded-xl"
                                  required
                                />
                              </div>
                            </div>

                            <Button
                              type="submit"
                              disabled={isLoading}
                              className="w-full gradient-teal hover:gradient-teal-hover text-primary-foreground font-semibold py-6 rounded-2xl shadow-lg transition-all"
                            >
                              {isLoading ? "Submitting..." : "Start Selling"}
                            </Button>
                          </form>
                        </div>
                      </Card>
                    </motion.div>
                  )}

                  {isSubmitted && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <Card className="p-8 rounded-3xl shadow-2xl border-border/50 text-center">
                        <div className="space-y-6">
                          <div className="w-16 h-16 gradient-teal rounded-3xl mx-auto flex items-center justify-center">
                            <CheckCircle className="w-8 h-8 text-primary-foreground" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold mb-2">{"You're in!"}</h3>
                            <p className="text-muted-foreground">RepLinker will notify you when matched.</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>

                {activeForm && !isSubmitted && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-center">
                    <Button
                      variant="ghost"
                      onClick={() => setActiveForm(null)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      ← Back to options
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  )
}

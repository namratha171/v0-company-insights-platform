"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import CompanyList from "@/components/company-list"
import { BarChart3, Briefcase, TrendingUp, Users } from "lucide-react"

export default function Home() {
  const [showList, setShowList] = useState(false)

  if (showList) {
    return (
      <main className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Company Insights Platform</h1>
                <p className="text-sm text-muted-foreground">Placement Preparation Hub</p>
              </div>
              <Button variant="outline" onClick={() => setShowList(false)}>
                Back to Home
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CompanyList />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold">Company Insights Platform</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Your Ultimate Placement Preparation Hub
            </h2>
            <p className="text-xl text-muted-foreground mb-8 text-balance">
              Access comprehensive hiring patterns, eligibility criteria, compensation data, and interview insights for
              100+ companies
            </p>
            <Button size="lg" onClick={() => setShowList(true)}>
              Explore Companies
            </Button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <p className="text-muted-foreground">Companies Listed</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground">Active Roles</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">₹24 LPA</div>
                <p className="text-muted-foreground">Avg Package</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">85%</div>
                <p className="text-muted-foreground">Avg Placement</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">Platform Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <Briefcase className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-semibold mb-2">Company Profiles</h4>
                <p className="text-sm text-muted-foreground">
                  Detailed company information, industry, size, and description
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <TrendingUp className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-semibold mb-2">Hiring Patterns</h4>
                <p className="text-sm text-muted-foreground">Active roles, hiring trends, and seasonal patterns</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <BarChart3 className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-semibold mb-2">Compensation Data</h4>
                <p className="text-sm text-muted-foreground">Salary ranges by role level and location</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-semibold mb-2">Interview Insights</h4>
                <p className="text-sm text-muted-foreground">Round breakdown, topics, and difficulty ratings</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-12 md:py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">Eligibility Criteria</h3>
              <p className="text-muted-foreground mb-4">Know your eligibility at a glance</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Minimum CGPA requirements
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Degree requirements (B.Tech, M.Tech, etc.)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Accepted branches and specializations
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Work experience requirements
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Search & Filter</h3>
              <p className="text-muted-foreground mb-4">Find companies matching your preferences</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Filter by industry and location
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Filter by package range
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Search by company name
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Sort by hiring trend and placement rate
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Start Your Placement Journey</h3>
          <p className="text-lg text-muted-foreground mb-8">
            Explore 100+ companies, understand their hiring patterns, and prepare with confidence.
          </p>
          <Button size="lg" onClick={() => setShowList(true)}>
            Browse Companies Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>Company Insights Platform • Your guide to placement success</p>
        </div>
      </footer>
    </main>
  )
}

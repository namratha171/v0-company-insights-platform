"use client"

import { companies } from "@/lib/companies-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { MapPin, Users, Building2, Calendar, TrendingUp, Award } from "lucide-react"

interface CompanyProfileProps {
  companyId: string
}

export default function CompanyProfile({ companyId }: CompanyProfileProps) {
  const company = companies.find((c) => c.id === companyId)

  if (!company) {
    return <div className="p-8 text-center text-muted-foreground">Company not found</div>
  }

  const salaryData = company.salaryRanges.map((range) => ({
    name: range.level,
    min: range.min,
    max: range.max,
    avg: (range.min + range.max) / 2,
  }))

  const hiringTrendData = [
    { month: "Jan", roles: company.activeRoles.length * 0.6 },
    { month: "Feb", roles: company.activeRoles.length * 0.7 },
    { month: "Mar", roles: company.activeRoles.length * 0.8 },
    { month: "Apr", roles: company.activeRoles.length * 0.7 },
    { month: "May", roles: company.activeRoles.length * 0.6 },
    { month: "Jun", roles: company.activeRoles.length * 0.5 },
    { month: "Jul", roles: company.activeRoles.length * 0.5 },
    { month: "Aug", roles: company.activeRoles.length * 0.8 },
    { month: "Sep", roles: company.activeRoles.length },
    { month: "Oct", roles: company.activeRoles.length },
    { month: "Nov", roles: company.activeRoles.length * 0.9 },
    { month: "Dec", roles: company.activeRoles.length * 0.7 },
  ]

  return (
    <div className="space-y-6 py-8">
      {/* Header */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10">
        <CardContent className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="text-6xl mb-4">{company.logo}</div>
              <h1 className="text-4xl font-bold mb-2">{company.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{company.description}</p>
              <div className="flex flex-wrap gap-2">
                <Badge>{company.industry}</Badge>
                <Badge variant="outline">{company.size} Company</Badge>
                <Badge variant="secondary">{company.placementRate}% Placement Rate</Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div>
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">Location</span>
              </div>
              <p className="font-semibold">{company.headquarters}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Founded</span>
              </div>
              <p className="font-semibold">{company.founded}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Avg Package</span>
              </div>
              <p className="font-semibold">{company.averagePackage} LPA</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Award className="w-4 h-4" />
                <span className="text-sm font-medium">Min CGPA</span>
              </div>
              <p className="font-semibold">{company.minCGPA}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="hiring">Hiring</TabsTrigger>
          <TabsTrigger value="salary">Compensation</TabsTrigger>
          <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
          <TabsTrigger value="interview">Interview</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-muted-foreground">{company.description}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Active Roles</h3>
                <div className="flex flex-wrap gap-2">
                  {company.activeRoles.map((role) => (
                    <Badge key={role} variant="secondary">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-primary/5 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="font-semibold">Hiring Trend</span>
                  </div>
                  <p className="capitalize text-sm">{company.hiringTrend} Hiring</p>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-semibold">Last Hiring</span>
                  </div>
                  <p className="text-sm">{company.lastHiringCycle}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Seasonal Hiring Pattern</h3>
                <p className="text-muted-foreground text-sm">{company.seasonalPattern}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hiring Tab */}
        <TabsContent value="hiring" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Hiring Patterns</CardTitle>
              <CardDescription>Monthly hiring trends throughout the year</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hiringTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="roles" stroke="#3b82f6" strokeWidth={2} name="Active Roles" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Salary Tab */}
        <TabsContent value="salary" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Compensation by Level</CardTitle>
              <CardDescription>Salary ranges for different positions</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salaryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="min" fill="#9333ea" name="Min Salary" />
                  <Bar dataKey="max" fill="#3b82f6" name="Max Salary" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            {company.salaryRanges.map((range) => (
              <Card key={range.level}>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{range.level}</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Min:</span>
                      <span className="font-semibold">{range.min} LPA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max:</span>
                      <span className="font-semibold">{range.max} LPA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-semibold">{range.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Eligibility Tab */}
        <TabsContent value="eligibility" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Eligibility Criteria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold">Minimum CGPA</h3>
                </div>
                <p className="text-2xl font-bold text-primary">{company.minCGPA}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold">Degree Requirements</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {company.degreeRequirements.map((degree) => (
                    <Badge key={degree}>{degree}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold">Branches Accepted</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {company.branchesAccepted.map((branch) => (
                    <Badge key={branch} variant="outline">
                      {branch}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Interview Tab */}
        <TabsContent value="interview" className="space-y-6 mt-6">
          <div className="space-y-4">
            {company.interviewProcess.map((round) => (
              <Card key={round.roundNumber}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        Round {round.roundNumber}: {round.name}
                      </CardTitle>
                      <CardDescription>{round.description}</CardDescription>
                    </div>
                    <Badge
                      className={
                        round.difficulty === "easy"
                          ? "bg-green-100 text-green-800"
                          : round.difficulty === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {round.difficulty.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Topics Covered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {round.topics.map((topic) => (
                        <Badge key={topic} variant="secondary">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

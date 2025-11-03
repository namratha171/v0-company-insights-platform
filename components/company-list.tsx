"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { companies } from "@/lib/companies-data"
import { Search, MapPin, Briefcase, TrendingUp, ExternalLink, ArrowRight } from "lucide-react"

const industries = Array.from(new Set(companies.map((c) => c.industry))).sort()
const locations = Array.from(new Set(companies.map((c) => c.headquarters.split(",")[1]?.trim() || "")))
  .filter(Boolean)
  .sort()

export default function CompanyList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>("all")
  const [selectedLocation, setSelectedLocation] = useState<string | null>("all")
  const [minPackage, setMinPackage] = useState<number | null>(null)

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesIndustry = selectedIndustry === "all" || company.industry === selectedIndustry
      const matchesLocation = selectedLocation === "all" || company.headquarters.includes(selectedLocation)
      const matchesPackage = !minPackage || company.averagePackage >= minPackage

      return matchesSearch && matchesIndustry && matchesLocation && matchesPackage
    })
  }, [searchQuery, selectedIndustry, selectedLocation, minPackage])

  const getTrendColor = (trend: string) => {
    if (trend === "increasing") return "text-green-600"
    if (trend === "decreasing") return "text-red-600"
    return "text-blue-600"
  }

  const handleViewWebsite = (website?: string) => {
    if (website) {
      window.open(`https://${website}`, "_blank")
    }
  }

  return (
    <div className="space-y-6 py-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Search Companies</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Industry</label>
          <Select value={selectedIndustry || "all"} onValueChange={(v) => setSelectedIndustry(v || "all")}>
            <SelectTrigger>
              <SelectValue placeholder="All Industries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {industries.map((ind) => (
                <SelectItem key={ind} value={ind}>
                  {ind}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Location</label>
          <Select value={selectedLocation || "all"} onValueChange={(v) => setSelectedLocation(v || "all")}>
            <SelectTrigger>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Min Package (LPA)</label>
          <Select
            value={minPackage?.toString() || "any"}
            onValueChange={(v) => setMinPackage(v ? Number.parseFloat(v) : null)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="5">5+ LPA</SelectItem>
              <SelectItem value="10">10+ LPA</SelectItem>
              <SelectItem value="15">15+ LPA</SelectItem>
              <SelectItem value="20">20+ LPA</SelectItem>
              <SelectItem value="25">25+ LPA</SelectItem>
              <SelectItem value="30">30+ LPA</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredCompanies.length} of {companies.length} companies
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCompanies.map((company) => (
          <Card key={company.id} className="h-full hover:shadow-lg transition-shadow flex flex-col">
            <CardContent className="p-6 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{company.logo}</span>
                <Badge variant="outline">{company.size}</Badge>
              </div>

              <h3 className="font-bold text-lg mb-1">{company.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{company.industry}</p>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {company.headquarters}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="w-4 h-4" />
                  {company.activeRoles.length} Active Roles
                </div>
                <div className={`flex items-center gap-2 font-semibold ${getTrendColor(company.hiringTrend)}`}>
                  <TrendingUp className="w-4 h-4" />
                  {company.hiringTrend.charAt(0).toUpperCase() + company.hiringTrend.slice(1)} Hiring
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div className="bg-primary/10 p-2 rounded">
                  <div className="font-semibold">{company.averagePackage} LPA</div>
                  <div className="text-muted-foreground">Avg Package</div>
                </div>
                <div className="bg-primary/10 p-2 rounded">
                  <div className="font-semibold">{company.placementRate}%</div>
                  <div className="text-muted-foreground">Placement</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-auto">
                <Button
                  size="sm"
                  variant="default"
                  className="w-full"
                  onClick={() => {
                    // Navigate to company detail page
                    window.location.href = `/company/${company.id}`
                  }}
                >
                  <ArrowRight className="w-4 h-4 mr-1" />
                  View Details
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleViewWebsite(company.website)}>
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Website
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground text-lg">No companies found matching your filters.</p>
            <p className="text-muted-foreground text-sm mt-2">Try adjusting your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

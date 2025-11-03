"use client"

import { Button } from "@/components/ui/button"
import CompanyProfile from "@/components/company-profile"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CompanyPage({ params }: PageProps) {
  const { id } = await params

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Company Details</h1>
            <Button variant="outline" onClick={() => (window.location.href = "/")}>
              Back to Companies
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CompanyProfile companyId={id} />
      </div>
    </main>
  )
}

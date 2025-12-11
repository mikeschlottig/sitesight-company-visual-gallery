import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CompanyCard, CompanyCardSkeleton } from '@/components/CompanyCard';
import { useCompaniesQuery } from '@/lib/hooks/useCompaniesQuery';
import React from 'react';
import { Company } from '@/lib/api';
import { CompanyDetailSheet } from '@/components/CompanyDetailSheet';
export function HomePage() {
  const { data, isLoading } = useCompaniesQuery({ pageSize: 4 });
  const [selectedCompany, setSelectedCompany] = React.useState<Company | null>(null);
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-20 md:py-32 lg:py-40 text-center">
          <div className="relative">
            <div className="absolute -inset-20 top-0 bg-gradient-mesh opacity-15 dark:opacity-25 blur-3xl" style={{
              background: 'radial-gradient(at 40% 20%, hsla(28,100%,74%,.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,.3) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,.3) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(340,100%,76%,.3) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(22,100%,77%,.3) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(242,100%,70%,.3) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(343,100%,76%,.3) 0px, transparent 50%)'
            }} />
            <div className="relative z-10">
              <h1 className="text-5xl md:text-7xl font-bold font-display text-balance leading-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
                Discover Companies, Visually
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                SiteSight transforms company discovery into a visual experience. Explore businesses through their digital storefronts with our curated gallery.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <Button asChild size="lg" className="btn-gradient px-8 py-4 text-lg font-semibold hover:-translate-y-0.5 transition-all duration-200">
                  <Link to="/gallery">
                    Explore Gallery <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/table">View as Table</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        {/* Featured Companies Section */}
        <section className="py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground flex items-center justify-center gap-3">
              <Zap className="text-primary" /> Featured Companies
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A glimpse into our ever-growing directory.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <CompanyCardSkeleton key={i} />)
              : data?.data.map((company) => (
                  <CompanyCard key={company.id} company={company} onDetailsClick={setSelectedCompany} />
                ))}
          </div>
        </section>
      </div>
      <CompanyDetailSheet
        company={selectedCompany}
        open={!!selectedCompany}
        onOpenChange={(open) => !open && setSelectedCompany(null)}
      />
    </>
  );
}
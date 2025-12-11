import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CompanyCard, CompanyCardSkeleton } from '@/components/CompanyCard';
import { useCompaniesQuery } from '@/lib/hooks/useCompaniesQuery';
import { CompanyDetailSheet } from '@/components/CompanyDetailSheet';
import { Company } from '@/lib/api';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Search } from 'lucide-react';
export function GalleryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCompany, setSelectedCompany] = React.useState<Company | null>(null);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const q = searchParams.get('q') || '';
  const { data, isLoading, isError, error, refetch } = useCompaniesQuery({ page, pageSize: 12, q });
  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => {
      prev.set('page', newPage.toString());
      return prev;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {Array.from({ length: 12 }).map((_, i) => <CompanyCardSkeleton key={i} />)}
        </div>
      );
    }
    if (isError) {
      return (
        <div className="text-center py-12">
          <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
          <h3 className="text-xl font-semibold text-destructive mb-2">Something went wrong</h3>
          <p className="text-muted-foreground mb-6">{error?.message || 'Failed to load company data.'}</p>
          <Button onClick={() => refetch()}>Retry</Button>
        </div>
      );
    }
    if (!data?.data || data.data.length === 0) {
      return (
        <div className="text-center py-12">
          <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No companies found</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your search or filters.</p>
          <Button asChild>
            <Link to="/gallery?q=">Clear Search</Link>
          </Button>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {data.data.map((company) => (
          <CompanyCard key={company.id} company={company} onDetailsClick={setSelectedCompany} />
        ))}
      </div>
    );
  };
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground">Company Gallery</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Visually explore our curated list of innovative companies.
            </p>
          </div>
          {renderContent()}
          {!isLoading && !isError && data && data.totalPages > 1 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => { e.preventDefault(); handlePageChange(Math.max(1, page - 1)); }}
                      className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  {[...Array(data.totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        isActive={page === i + 1}
                        onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => { e.preventDefault(); handlePageChange(Math.min(data.totalPages, page + 1)); }}
                      className={page >= data.totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
      <CompanyDetailSheet
        company={selectedCompany}
        open={!!selectedCompany}
        onOpenChange={(open) => !open && setSelectedCompany(null)}
      />
    </>
  );
}
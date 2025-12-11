import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { CompanyCard, CompanyCardSkeleton } from '@/components/CompanyCard';
import { useCompaniesQuery } from '@/lib/hooks/useCompaniesQuery';
import { CompanyDetailSheet } from '@/components/CompanyDetailSheet';
import { Company } from '@/lib/api';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
export function GalleryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCompany, setSelectedCompany] = React.useState<Company | null>(null);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const q = searchParams.get('q') || '';
  const { data, isLoading, isError, error } = useCompaniesQuery({ page, pageSize: 12, q });
  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => {
      prev.set('page', newPage.toString());
      return prev;
    });
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
          {isError && <div className="text-center text-destructive">Error: {error.message}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {isLoading
              ? Array.from({ length: 12 }).map((_, i) => <CompanyCardSkeleton key={i} />)
              : data?.data.map((company) => (
                  <CompanyCard key={company.id} company={company} onDetailsClick={setSelectedCompany} />
                ))}
          </div>
          {!isLoading && data && data.totalPages > 1 && (
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
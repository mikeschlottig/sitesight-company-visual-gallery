import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { CompanyCard, CompanyCardSkeleton } from '@/components/CompanyCard';
import { useCompaniesQuery } from '@/lib/hooks/useCompaniesQuery';
import { CompanyDetailSheet } from '@/components/CompanyDetailSheet';
import { Company } from '@/lib/api';
import { Button } from '@/components/ui/button';
export function ListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCompany, setSelectedCompany] = React.useState<Company | null>(null);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const q = searchParams.get('q') || '';
  const { data, isLoading, isError, error } = useCompaniesQuery({ page, pageSize: 8, q });
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
            <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground">Company List</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Scan through detailed entries of each company in our directory.
            </p>
          </div>
          {isError && <div className="text-center text-destructive">Error: {error.message}</div>}
          <div className="space-y-6">
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => <CompanyCardSkeleton key={i} variant="list" />)
              : data?.data.map((company) => (
                  <CompanyCard key={company.id} company={company} variant="list" onDetailsClick={setSelectedCompany} />
                ))}
          </div>
          {!isLoading && data && data.totalPages > 1 && (
            <div className="mt-12 flex justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
              >
                Previous
              </Button>
              <span className="p-2 text-sm text-muted-foreground">Page {page} of {data.totalPages}</span>
              <Button
                variant="outline"
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= data.totalPages}
              >
                Next
              </Button>
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
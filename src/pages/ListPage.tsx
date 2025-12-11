import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CompanyCard, CompanyCardSkeleton } from '@/components/CompanyCard';
import { useCompaniesQuery } from '@/lib/hooks/useCompaniesQuery';
import { CompanyDetailSheet } from '@/components/CompanyDetailSheet';
import { Company } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Search } from 'lucide-react';
export function ListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCompany, setSelectedCompany] = React.useState<Company | null>(null);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const q = searchParams.get('q') || '';
  const { data, isLoading, isError, error, refetch } = useCompaniesQuery({ page, pageSize: 8, q });
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);
  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => {
      prev.set('page', newPage.toString());
      return prev;
    });
  };
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-8 md:space-y-10">
          {Array.from({ length: 5 }).map((_, i) => <CompanyCardSkeleton key={i} variant="list" />)}
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
            <Link to="/list?q=">Clear Search</Link>
          </Button>
        </div>
      );
    }
    return (
      <div className="space-y-8 md:space-y-10">
        {data.data.map((company) => (
          <CompanyCard key={company.id} company={company} variant="list" onDetailsClick={setSelectedCompany} />
        ))}
      </div>
    );
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
          {renderContent()}
          {!isLoading && !isError && data && data.totalPages > 1 && (
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
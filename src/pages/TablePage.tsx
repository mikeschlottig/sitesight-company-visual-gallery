import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { CompanyTable } from '@/components/CompanyTable';
import { useCompaniesQuery } from '@/lib/hooks/useCompaniesQuery';
import { CompanyDetailSheet } from '@/components/CompanyDetailSheet';
import { Company } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
export function TablePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCompany, setSelectedCompany] = React.useState<Company | null>(null);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const q = searchParams.get('q') || '';
  const sort = searchParams.get('sort') || 'name:asc';
  const { data, isLoading, isError, error, refetch } = useCompaniesQuery({ page, pageSize: 15, q, sort });
  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => {
      prev.set('page', newPage.toString());
      return prev;
    });
  };
  const handleSort = (column: keyof Company) => {
    const [currentCol, currentDir] = sort.split(':');
    let newDir = 'asc';
    if (currentCol === column && currentDir === 'asc') {
      newDir = 'desc';
    }
    setSearchParams(prev => {
      prev.set('sort', `${column}:${newDir}`);
      return prev;
    });
  };
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12">
          {isError ? (
            <div className="text-center py-12">
              <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
              <h3 className="text-xl font-semibold text-destructive mb-2">Something went wrong</h3>
              <p className="text-muted-foreground mb-6">{error?.message || 'Failed to load company data.'}</p>
              <Button onClick={() => refetch()}>Retry</Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <CompanyTable
                companies={data?.data || []}
                isLoading={isLoading}
                onSort={handleSort}
                onDetailsClick={setSelectedCompany}
              />
            </div>
          )}
          {!isLoading && !isError && data && (data.totalPages ?? 1) > 1 && (
            <div className="mt-8 flex justify-center gap-2">
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
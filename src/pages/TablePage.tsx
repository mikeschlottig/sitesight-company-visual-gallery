import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { CompanyTable } from '@/components/CompanyTable';
import { useCompaniesQuery } from '@/lib/hooks/useCompaniesQuery';
import { CompanyDetailSheet } from '@/components/CompanyDetailSheet';
import { Company } from '@/lib/api';
import { Button } from '@/components/ui/button';
export function TablePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCompany, setSelectedCompany] = React.useState<Company | null>(null);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const q = searchParams.get('q') || '';
  const sort = searchParams.get('sort') || 'name:asc';
  const { data, isLoading, isError, error } = useCompaniesQuery({ page, pageSize: 15, q, sort });
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
          {isError && <div className="text-center text-destructive">Error: {(error as Error).message}</div>}
          <CompanyTable
            companies={data?.data || []}
            isLoading={isLoading}
            onSort={handleSort}
            onDetailsClick={setSelectedCompany}
          />
          {!isLoading && data && data.totalPages > 1 && (
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
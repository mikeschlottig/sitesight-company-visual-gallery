import { useQuery } from '@tanstack/react-query';
import { getCompanies, GetCompaniesParams } from '@/lib/api';
export const useCompaniesQuery = (params: GetCompaniesParams) => {
  return useQuery({
    queryKey: ['companies', params],
    queryFn: () => getCompanies(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    keepPreviousData: true,
  });
};
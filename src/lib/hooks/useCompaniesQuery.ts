import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getCompanies, GetCompaniesParams, GetCompaniesResponse } from '@/lib/api';
export const useCompaniesQuery = (params: GetCompaniesParams): UseQueryResult<GetCompaniesResponse, Error> => {
  return useQuery<GetCompaniesResponse, Error>({
    queryKey: ['companies', params],
    queryFn: () => getCompanies(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: (previousData) => previousData,
  });
};
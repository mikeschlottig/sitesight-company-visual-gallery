export interface Company {
  id: string;
  name: string;
  domain: string;
  description: string;
  ogImage?: string;
  tags: string[];
  lastUpdated: string;
  techStack?: string[];
}
export interface GetCompaniesParams {
  q?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
}
export interface GetCompaniesResponse {
  data: Company[];
  totalPages: number;
  currentPage: number;
}
const API_BASE = '/api';
export async function getCompanies(params: GetCompaniesParams = {}): Promise<GetCompaniesResponse> {
  const query = new URLSearchParams();
  if (params.q) query.set('q', params.q);
  if (params.page) query.set('page', params.page.toString());
  if (params.pageSize) query.set('pageSize', params.pageSize.toString());
  if (params.sort) query.set('sort', params.sort);
  const url = `${API_BASE}/companies?${query.toString()}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'API returned an error');
    }
    return data.data;
  } catch (error) {
    console.error("Failed to fetch companies:", error);
    // In a real app, you might want to re-throw a more specific error
    // or return a default error structure.
    throw error;
  }
}
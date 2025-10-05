import api from '@/lib/api';

export interface Company {
  id: string;
  name: string;
  gpsCoordinates: {
    lat: number;
    lng: number;
  };
  email: string;
  contactPerson: string;
  address: string;
}

export const companyService = {
  // Get all companies
  getAllCompanies: async (filters?: { name?: string }) => {
    const params = new URLSearchParams();
    if (filters?.name) params.append('name', filters.name);
    
    const response = await api.get(`/companies?${params.toString()}`);
    return response.data;
  },

  // Get company by ID
  getCompanyById: async (id: string) => {
    const response = await api.get(`/companies/${id}`);
    return response.data;
  },

  // Create company
  createCompany: async (company: Omit<Company, 'id'>) => {
    const response = await api.post('/companies', company);
    return response.data;
  },

  // Update company
  updateCompany: async (id: string, company: Omit<Company, 'id'>) => {
    const response = await api.put(`/companies/${id}`, company);
    return response.data;
  },

  // Delete company
  deleteCompany: async (id: string) => {
    await api.delete(`/companies/${id}`);
  },
};


import api from '@/lib/api';

export interface License {
  id: string;
  companyName: string;
  licenseType: 'CTL' | 'PRSL';
  issueDate: string;
  gpsCoordinates: {
    lat: number;
    lng: number;
  };
  email: string;
  applicationFeePaid: number;
  licenseFeePaid: number;
  validityPeriodYears: number;
}

export const licenseService = {
  // Get all licenses
  getAllLicenses: async (filters?: { type?: string; companyName?: string }) => {
    const params = new URLSearchParams();
    if (filters?.type) params.append('type', filters.type);
    if (filters?.companyName) params.append('companyName', filters.companyName);
    
    const response = await api.get(`/licenses?${params.toString()}`);
    return response.data;
  },

  // Get license by ID
  getLicenseById: async (id: string) => {
    const response = await api.get(`/licenses/${id}`);
    return response.data;
  },

  // Create license
  createLicense: async (license: Omit<License, 'id'>) => {
    const response = await api.post('/licenses', license);
    return response.data;
  },

  // Update license
  updateLicense: async (id: string, license: Omit<License, 'id'>) => {
    const response = await api.put(`/licenses/${id}`, license);
    return response.data;
  },

  // Delete license
  deleteLicense: async (id: string) => {
    await api.delete(`/licenses/${id}`);
  },
};


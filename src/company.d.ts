// Esta es la única interfaz que necesitas para representar tus acciones.
// Coincide directamente con el StockDto de tu backend de ASP.NET Core.
export interface Company {
  id: number;
  symbol: string;
  companyName: string;
  purchase: number; // Este es el 'precio' en tu aplicación
  lastDiv: number;
  industry: string;
  marketCap: number;
  sector: string;
  description: string;
  dcf: number;
  
  // Estos campos son opcionales. El componente Card los usa.
  // Si quieres que aparezcan, añádelos a tu entidad Stock y al DTO en el backend.
  // Si no, puedes eliminarlos del componente Card.tsx.
  currency?: string;
  exchangeShortName?: string;
}

// Ya no necesitas CompanySearch, CompanyProfile, CompanyKeyMetrics, CompanyIncomeStatement, etc.
// Hemos unificado todo en la interfaz 'Company', que es lo que tu API devuelve.
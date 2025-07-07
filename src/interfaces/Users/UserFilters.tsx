// src/interfaces/Users/UserFilters.ts
export interface UserFilters {
  active?: boolean;
  registeredFrom?: Date;
  registeredTo?: Date;
  searchTerm?: string;
  orderBy?: string;
  pageNumber?: number;
  pageSize?: number;
}

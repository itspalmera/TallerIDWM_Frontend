export interface ProductFilters {
    pageNumber?: number;
    pageSize?: number;
    search?: string;
    conditions?: string;
    categories?: string;
    brands?: string;
    sortBy?: string;
    minPrice?: number;
    maxPrice?: number;
}
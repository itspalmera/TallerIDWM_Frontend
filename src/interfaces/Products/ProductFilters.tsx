export interface ProductFilters {
    pageNumber: number;
    pageSize: number;
    search?: string;
    categories?: string;
    brands?: string;
    sortBy?: string;
}
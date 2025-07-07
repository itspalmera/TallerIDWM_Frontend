import { ApiBackend } from "@/clients/axios"
import { UserFilters } from "@/interfaces/Users/UserFilters"
import { User } from "@/interfaces/Users/User"

export const UserService = {
  async fetchUsers(filters?: UserFilters): Promise<User[]> {
    const params = new URLSearchParams()

    if (filters?.active !== undefined) {
      params.append("active", String(filters.active))
    }
    if (filters?.registeredFrom) {
      params.append("registeredFrom", filters.registeredFrom.toISOString())
    }
    if (filters?.registeredTo) {
      params.append("registeredTo", filters.registeredTo.toISOString())
    }
    if (filters?.searchTerm) {
      params.append("searchTerm", filters.searchTerm)
    }
    if (filters?.orderBy) {
      params.append("orderBy", filters.orderBy)
    }
    if (filters?.pageNumber) {
      params.append("pageNumber", String(filters.pageNumber))
    }
    if (filters?.pageSize) {
      params.append("pageSize", String(filters.pageSize))
    }

    const response = await ApiBackend.get("/user", { params })
    return response.data.data
  },

}



export const UserServiceFilter = {
  async fetchUsers(filters?: UserFilters): Promise<User[]> {
    const response = await ApiBackend.get('/api/User', {
      params: filters,
    })
    return response.data
  },

  async deactivateUser(id: number): Promise<void> {
    await ApiBackend.put(`/api/User/${id}/deactivate`)
  },
}
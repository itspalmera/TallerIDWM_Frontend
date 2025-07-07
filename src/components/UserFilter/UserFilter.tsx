'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { UserFilters } from '@/interfaces/Users/UserFilters'

interface Props {
  onFilterChange: (filters: UserFilters) => void
}

export default function UserFilter({ onFilterChange }: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [active, setActive] = useState<'todos' | 'activo' | 'inactivo'>('todos')
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  const handleApplyFilters = () => {
    const filtros: UserFilters = {
      searchTerm: searchTerm || undefined,
      registeredFrom: dateRange?.from,
      registeredTo: dateRange?.to,
      pageNumber: 1,
      pageSize: 10,
    }

    if (active === 'activo') filtros.active = true
    if (active === 'inactivo') filtros.active = false

    onFilterChange(filtros)
  }

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-2">
        <Label htmlFor="search">Buscar por nombre o correo</Label>
        <Input
          id="search"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Estado</Label>
        <Select value={active} onValueChange={(value) => setActive(value as any)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="activo">Activo</SelectItem>
            <SelectItem value="inactivo">Desactivado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Rango de fechas</Label>
        <div className="max-h-[300px] overflow-auto">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={1}
            className="rounded-md border"
          />
        </div>
        {dateRange?.from && dateRange?.to && (
          <p className="text-sm text-muted-foreground">
            {format(dateRange.from, 'PPP')} → {format(dateRange.to, 'PPP')}
          </p>
        )}
      </div>

      <div className="pt-2">
        <Button onClick={handleApplyFilters} className="w-full">
          Aplicar filtros
        </Button>
      </div>
    </div>
  )
}

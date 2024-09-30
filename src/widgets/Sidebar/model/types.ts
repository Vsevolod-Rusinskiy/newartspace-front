// widgets/Sidebar/model/types.ts

export interface FilterItem {
  id: number
  priority?: number
  value: string
}

export interface Filters {
  artTypesList: FilterItem[]
  colorsList: FilterItem[]
  formatsList: FilterItem[]
  materialsList: FilterItem[]
  stylesList: FilterItem[]
  themesList: FilterItem[]
  techniquesList: FilterItem[]
  priceList: FilterItem[]
}

export interface SideBarFiltersState {
  filters: Filters | null
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null | undefined
}

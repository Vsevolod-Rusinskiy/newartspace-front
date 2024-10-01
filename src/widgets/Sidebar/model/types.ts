// widgets/Sidebar/model/types.ts

export interface FilterItem {
  id: number
  priority?: number
  value: string
  isChecked: boolean
}

export interface Filters {
  artTypesList: FilterItem[]
  colorsList: FilterItem[]
  formatsList: FilterItem[]
  materialsList: FilterItem[]
  stylesList: FilterItem[]
  themesList: FilterItem[]
  priceList: FilterItem[]
  sizeList: FilterItem[]
}

export interface SideBarFiltersState {
  filters: Filters | null
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null | undefined
}

export type TabType = 'password' | 'orders' | 'favorites'

export interface TabItem {
  id: TabType
  title: string
}

export interface ProfileTabsProps {
  className?: string
}

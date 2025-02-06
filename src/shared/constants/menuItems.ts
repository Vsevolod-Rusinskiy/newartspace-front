interface Translation {
  main_menu: {
    catalog: string
    names: string
    about_us: string
    services: string
    another: string
    events: string
    contacts: string
    payment_and_delivery_conditions?: string
    privacy_policy?: string
    agreement?: string
  }
}

interface Translations {
  en: Translation
  ru: Translation
}

interface MenuItem {
  href: string
  label: string
}

export const menuItems = (
  translations: Translations,
  lang: keyof Translations
): MenuItem[] => [
  { href: '/about', label: translations[lang].main_menu.about_us },
  { href: '/names', label: translations[lang].main_menu.names },
  { href: '/catalog', label: translations[lang].main_menu.catalog },
  // { href: '/another', label: translations[lang].main_menu.another },
  // { href: '/services', label: translations[lang].main_menu.services },
  { href: '/events', label: translations[lang].main_menu.events },
  { href: '/contacts', label: translations[lang].main_menu.contacts },
]

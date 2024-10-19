export const generateUniqueId = () =>
  `id_${Math.random().toString(36).slice(2, 11)}`

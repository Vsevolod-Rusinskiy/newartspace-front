export const listItemAnimations = {
  initial: { opacity: 1, height: 'auto' },
  exit: {
    opacity: 0,
    height: 0,
    marginBottom: 0,
    transition: { duration: 0.3 },
  },
}

// Можно добавить разные пресеты анимаций
export const animationPresets = {
  fadeSlide: {
    initial: { opacity: 1, x: 0, height: 'auto' },
    exit: {
      opacity: 0,
      x: -20,
      height: 0,
      marginBottom: 0,
      transition: { duration: 0.3 },
    },
  },
  fade: {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  },
}

import React from 'react'
// import Bugsnag from '@bugsnag/js'
// import BugsnagPluginReact from '@bugsnag/plugin-react'
// import BugsnagPerformance from '@bugsnag/browser-performance'

let ErrorBoundary = ({ children }) => <>{children}</>

// Временно отключаем Bugsnag
// if (typeof window !== 'undefined') {
//   Bugsnag.start({
//     apiKey: '622519d9fb58dc777705ab4131cb670b',
//     plugins: [new BugsnagPluginReact()],
//   })

//   BugsnagPerformance.start({ apiKey: '622519d9fb58dc777705ab4131cb670b' })

//   ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)
// }

export { ErrorBoundary }

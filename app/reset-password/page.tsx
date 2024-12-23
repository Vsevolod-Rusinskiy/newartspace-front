import { Suspense } from 'react'
import { ResetPasswordPage } from '@/src/pages/ResetPasswordPage'

export default function Page() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <ResetPasswordPage />
    </Suspense>
  )
}

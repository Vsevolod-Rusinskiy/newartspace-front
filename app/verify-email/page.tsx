import { Suspense } from 'react'
import { VerifyEmailPage } from '@/src/pages/VerifyEmailPage'

export default function Page() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <VerifyEmailPage />
    </Suspense>
  )
}

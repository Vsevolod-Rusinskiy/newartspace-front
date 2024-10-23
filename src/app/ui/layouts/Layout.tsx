'use client'
import { Header } from '@/src/widgets/Header'
import { Footer } from '@/src/widgets/Footer'
import { Sidebar } from '@/src/widgets/Sidebar'
import { Modal } from '@/src/shared/ui/modals/Modal/Modal'
import { useState } from 'react'
const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div>
        <button onClick={() => setIsModalOpen(true)}>toggle</button>
        <Header />
        {children}
        <Footer />
      </div>
      <Sidebar />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industrys standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum
      </Modal>
    </>
  )
}

export default Layout

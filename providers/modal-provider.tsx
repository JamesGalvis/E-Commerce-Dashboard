"use client"

import { StoreModal } from '@/components/modals/store-modal'
import { useState, useEffect } from 'react'

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div>
      <StoreModal />
    </div>
  )
}
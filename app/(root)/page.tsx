"use client"

import { useEffect } from "react"

import { UserButton } from "@clerk/nextjs"
import { useStoreModal } from "@/hooks/use-store-modal"

export default function SetupPage() {
  const { isOpen, onOpen } = useStoreModal()

  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])

  return (
    <div className="p-4">
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  )
}

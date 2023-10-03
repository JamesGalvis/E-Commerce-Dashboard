"use client"

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "../ui/modal"
import { Button } from "../ui/button"

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  loading: boolean
  onConfirm: () => void
}

export function AlertModal({ loading, onConfirm, isOpen, onClose }: AlertModalProps) {
  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex items-center justify-end pt-6 space-x-2 w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  )
}
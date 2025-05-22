"use client";

import { useState } from "react";
import { ItemPayload } from ".";

export function useItems(initial: ItemPayload[]) {
  const [items, setItems] = useState<ItemPayload[]>(initial);

  /* modal control */
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);

  const openAdd = () => {
    setEditingIdx(null);
    setModalOpen(true);
  };

  const openEdit = (idx: number) => {
    setEditingIdx(idx);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const saveItem = (vals: ItemPayload, idx: number | null) => {
    setItems((prev) =>
      idx === null ? [...prev, vals] : prev.map((it, i) => (i === idx ? vals : it))
    );
    closeModal();
  };

  const removeItem = (idx: number) =>
    setItems((prev) => prev.filter((_, i) => i !== idx));

  return {
    items,
    modalOpen,
    editingIdx,
    openAdd,
    openEdit,
    closeModal,
    saveItem,
    removeItem,
  };
}

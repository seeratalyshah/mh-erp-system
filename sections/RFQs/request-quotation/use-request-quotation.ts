import { useMemo, useState } from "react";
import { message } from "antd";
import { useVendorTable } from "../vendor-table/use-vendor-table";

export function useRequestQuotation() {
  const vendor = useVendorTable();

  /* modal visibility */
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => setModalOpen(true);
  const hideModal = () => setModalOpen(false);

  /* selected vendors built with id  */
  const selectedVendors = useMemo(
    () =>
      vendor.data
        .filter((v) => vendor.selectedRowKeys.includes(v.id))
        .map((v) => ({
          key: String(v.id), // ← make it a string
          name: v.name,
          email: v.email,
        })),
    [vendor.data, vendor.selectedRowKeys]
  );

  const canEmail = vendor.selectedRowKeys.length > 0;

  const emailSelected = () =>
    message.success(
      `📧 Bulk-email vendors: ${vendor.selectedRowKeys.join(", ")}`
    );

  return {
    vendor,
    modalOpen,
    showModal,
    hideModal,
    selectedVendors,
    canEmail,
    emailSelected,
  };
}

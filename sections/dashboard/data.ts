import { FiFilePlus, FiClipboard, FiLayers, FiSettings } from "react-icons/fi";

export const quickActions = [
  { label: "Create New GRF", icon: FiFilePlus, href: "/dashboard/new-grf" },
  {
    label: "View Submitted GRFs",
    icon: FiClipboard,
    href: "/dashboard/grf-view",
  },
];

export const featureCards = [
  {
    title: "Procurement Forms",
    description: "Access GRF, PO, QRF, and inspection reports",
    icon: FiLayers,
  },
  {
    title: "Vendor List",
    description: "Browse and manage approved vendors",
    icon: FiClipboard,
  },
  {
    title: "Reports",
    description: "Generate and view procurement analytics",
    icon: FiFilePlus,
  },
  {
    title: "Settings",
    description: "Manage your account preferences",
    icon: FiSettings,
  },
];

export const notifications = [
  { text: "GRF #2025-001 has been approved", time: "2 hours ago" },
  { text: "New vendor registration pending review", time: "5 hours ago" },
  { text: "Monthly procurement report is ready", time: "1 day ago" },
];

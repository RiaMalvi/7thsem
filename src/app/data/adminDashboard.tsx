import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  DocumentDuplicateIcon,
  ClipboardDocumentListIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

export const adminNavigation = [
  {
    name: "Dashboard",
    href: "/adminDashboard",
    icon: HomeIcon,
  },
  {
    name: "Student Management",
    href: "/adminDashboard/studentManagement",
    icon: UsersIcon,
  },
  {
    name: "Faculty Management",
    href: "/adminDashboard/facultyManagement",
    icon: UsersIcon,
  },
  {
    name: "Fee Management",
    href: "/adminDashboard/feeManagement",
    icon: FolderIcon,
  },
  {
    name: "Transaction Management",
    href: "/adminDashboard/transactionManagement",
    icon: DocumentDuplicateIcon,
  },
  {
    name: "Notifications",
    href: "/adminDashboard/notifications",
    icon: ClipboardDocumentListIcon,
  },
  {
    name: "Settings",
    href: "/adminDashboard/settings",
    icon: CogIcon,
  },
];

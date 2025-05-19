"use client";
import Link from "next/link";
import { type IconType } from "react-icons";

type Props = {
  title: string;
  description: string;
  icon: IconType;
  href: string; 
};

export default function FeatureCard({ title, description, icon: Icon, href }: Props) {
  return (
    <Link href={href}>
      <div className="group rounded-xl border border-gray-200 bg-white p-6 transition hover:shadow-[#0488a6] hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-300">
          <Icon size={26} className="text-[#0488a6]" />
        </div>
        <h3 className="mb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </Link>
  );
}

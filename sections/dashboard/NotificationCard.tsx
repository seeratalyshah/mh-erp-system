"use client";
import { FiAlertCircle } from "react-icons/fi";

type Props = { text: string; time: string };

export default function NotificationCard({ text, time }: Props) {
  return (
    <li className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 text-sm dark:border-gray-700 dark:bg-gray-800">
      <FiAlertCircle className="mt-[3px] text-primary-500" />
      <div>
        <p className="text-gray-700 dark:text-gray-200">{text}</p>
        <span className="text-xs text-gray-400">{time}</span>
      </div>
    </li>
  );
}

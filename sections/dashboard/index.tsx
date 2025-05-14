// DashboardSection.tsx
"use client";

import QuickActionsBar from "./QuickActionsBar";
import FeatureCard from "./FeatureCard";
import NotificationCard from "./NotificationCard";
import { featureCards, notifications } from "./data";

export default function DashboardSection() {
  return (
    <div className="h-full max-w-7xl mx-auto">   {/* 👈 added classes */}
      <QuickActionsBar />

      <div className="grid gap-8 lg:grid-cols-[auto_300px]">
        <section className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2">
          {featureCards.map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </section>

        <aside className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Notifications
            </h4>
            <button className="text-xs text-primary-600 hover:underline dark:text-primary-400">
              Mark all as read
            </button>
          </div>

          <ul className="space-y-3">
            {notifications.map((n) => (
              <NotificationCard key={n.text} {...n} />
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}

// app/dashboard/settings/data.ts

export interface UserProfile {
  name: string;
  email: string;
  role: string;
}

export interface UserPrefs {
  theme: "light" | "dark";
  emailNotifications: boolean;
  smsNotifications: boolean;
  language: "en" | "es" | "fr";
}

export const CURRENT_USER: UserProfile = {
  name: "Seerat Ali",
  email: "seerat@gmail.com",
  role: "Procurement Manager",
};

export const CURRENT_PREFS: UserPrefs = {
  theme: "light",
  emailNotifications: true,
  smsNotifications: false,
  language: "en",
};

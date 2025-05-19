// app/dashboard/settings/useSettings.ts
"use client";

import { useState } from "react";
import { CURRENT_USER, CURRENT_PREFS, UserProfile, UserPrefs } from "./data";
import { message } from "antd";

export function useSettings() {
  const [profile, setProfile] = useState<UserProfile>(CURRENT_USER);
  const [prefs, setPrefs] = useState<UserPrefs>(CURRENT_PREFS);
  const [loading, setLoading] = useState(false);

  const saveChanges = async (nextProfile: UserProfile, nextPrefs: UserPrefs) => {
    setLoading(true);
    // pretend to call API
    setTimeout(() => {
      setProfile(nextProfile);
      setPrefs(nextPrefs);
      setLoading(false);
      message.success("Settings saved");
    }, 800);
  };

  return {
    profile,
    prefs,
    saveChanges,
    loading,
  };
}

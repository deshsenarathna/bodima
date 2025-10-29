import { useEffect, useState } from "react";


export function useAuth() {
  const raw = localStorage.getItem("user");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    // fallback if legacy plain string exists
    return raw;
  }
}

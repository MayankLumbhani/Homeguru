"use client";

import { useState } from "react";
import {
  DEFAULT_SESSIONS_PER_WEEK,
  MAX_SESSIONS_PER_WEEK,
  MIN_SESSIONS_PER_WEEK,
  getTotalPrice,
  getTotalSessions,
} from "@/lib/booking";
import { isValidEmail, isValidPhone, sanitizePhone } from "@/lib/validation";

export interface BookingForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  sessionsPerWeek: number;
  preferredTime: string;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;
  setSessionsPerWeek: (value: number) => void;
  setPreferredTime: (value: string) => void;
  isEmailValid: boolean;
  isPhoneValid: boolean;
  totalSessions: number;
  totalPrice: number;
  canContinue: boolean;
}

export function useBookingForm(pricePerSession: number): BookingForm {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sessionsPerWeek, setSessionsPerWeekValue] = useState(DEFAULT_SESSIONS_PER_WEEK);
  const [preferredTime, setPreferredTime] = useState("");

  function setSessionsPerWeek(value: number) {
    setSessionsPerWeekValue(Math.min(MAX_SESSIONS_PER_WEEK, Math.max(MIN_SESSIONS_PER_WEEK, value)));
  }

  function setPhoneValue(value: string) {
    setPhone(sanitizePhone(value));
  }

  const isEmailValid = isValidEmail(email);
  const isPhoneValid = isValidPhone(phone);

  return {
    firstName,
    lastName,
    email,
    phone,
    sessionsPerWeek,
    preferredTime,
    setFirstName,
    setLastName,
    setEmail,
    setPhone: setPhoneValue,
    setSessionsPerWeek,
    setPreferredTime,
    isEmailValid,
    isPhoneValid,
    totalSessions: getTotalSessions(sessionsPerWeek),
    totalPrice: getTotalPrice(pricePerSession, sessionsPerWeek),
    canContinue:
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      isEmailValid &&
      isPhoneValid &&
      preferredTime !== "",
  };
}

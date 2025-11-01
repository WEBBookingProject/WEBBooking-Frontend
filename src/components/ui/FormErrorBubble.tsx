import React from "react";
import "../ui/BookingStep.css";

interface BubbleProps {
  message: string;
  show: boolean;
}

const FormErrorBubble: React.FC<BubbleProps> = ({ message, show }) => {
  if (!show || !message) return null;
  return <span className="error-bubble">{message}</span>;
};

export default FormErrorBubble;

// Тип результату перевірки
export interface ValidationResult {
  isValid: boolean;
  message: string;
}

// Повідомлення
const MSG_REQUIRED = "The field is not filled in";
const MSG_HAS_DIGITS = "The field cannot contain digits";
const MSG_HAS_SYMBOLS = "The field cannot contain special characters";
const MSG_HAS_LETTERS = "The field cannot contain letters";
const MSG_MISSING_AT = "Email must contain @";
const MSG_INVALID_EMAIL = "Invalid email format";
const MSG_EMAIL_MISMATCH = "Email does not match";
const MSG_TOO_SHORT = "The number is too short";
const MSG_TOO_LONG = "The number is too long";
const MSG_INVALID_DATE = "Invalid month";
const MSG_DATE_EXPIRED = "The card has expired";
const MSG_DATE_TOO_FAR = "The expiry date cannot be biger than 10 years";

// Перевірка: поле не порожнє
export function validateRequired(value: string): ValidationResult {
  if (!value.trim()) return { isValid: false, message: MSG_REQUIRED };
  return { isValid: true, message: "" };
}

// Перевірка: заборонено цифри
export function validateNoDigits(value: string): ValidationResult {
  if (/\d/.test(value)) return { isValid: false, message: MSG_HAS_DIGITS };
  return { isValid: true, message: "" };
}

// Перевірка: заборонено спецсимволи
export function validateNoSymbols(value: string): ValidationResult {
  if (/[^a-zA-Zа-яА-ЯіІїЇєЄґҐ\s'-]/.test(value))
    return { isValid: false, message: MSG_HAS_SYMBOLS };
  return { isValid: true, message: "" };
}

// Перевірка: заборонено букви (для номерів)
export function validateNoLetters(value: string): ValidationResult {
  if (/[a-zA-Zа-яА-ЯіІїЇєЄґҐ]/.test(value))
    return { isValid: false, message: MSG_HAS_LETTERS };
  return { isValid: true, message: "" };
}

// Перевірка: email має містити @ 
export function validateHasAt(value: string): ValidationResult {
  if (!/@/.test(value)) return { isValid: false, message: MSG_MISSING_AT };

// Перевірка: коректний формат email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    return { isValid: false, message: MSG_INVALID_EMAIL };

  return { isValid: true, message: "" };
}

// Перевірка: збігається з іншим полем
export function validateMatch(value: string, compareTo: string): ValidationResult {
  if (value !== compareTo) return { isValid: false, message: MSG_EMAIL_MISMATCH };
  return { isValid: true, message: "" };
}

// Перевірка: довжина номера
export function validateLength(value: string, min: number, max: number): ValidationResult {
  const digitsOnly = value.replace(/\D/g, "");
  if (digitsOnly.length < min) return { isValid: false, message: MSG_TOO_SHORT };
  if (digitsOnly.length > max) return { isValid: false, message: MSG_TOO_LONG };
  return { isValid: true, message: "" };
}

// Перевірка: дати дії картки (MM/YY)
export function validateExpiry(value: string): ValidationResult {
  const [monthStr, yearStr] = value.split("/");
  const month = parseInt(monthStr, 10);
  const year = parseInt(yearStr, 10);

  // Перевірка місяця
  if (month < 1 || month > 12)
    return { isValid: false, message: MSG_INVALID_DATE };

  // Поточна дата
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear() % 100;

  // Дата картки
  const fullYear = 2000 + year;

  // Мінімум — поточний місяць/рік
  if (fullYear < now.getFullYear() || (fullYear === now.getFullYear() && month < currentMonth))
    return { isValid: false, message: MSG_DATE_EXPIRED };

  // Максимум — +10 років
  if (fullYear > now.getFullYear() + 10)
    return { isValid: false, message: MSG_DATE_TOO_FAR };

  return { isValid: true, message: "" };
}
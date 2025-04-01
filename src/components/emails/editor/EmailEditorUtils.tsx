
import { EmailRuleType } from "../EmailEditor";

export const getDefaultSubject = (templateType: EmailRuleType | null): string => {
  switch (templateType) {
    case "confirmation":
      return "Thank you for your purchase!";
    case "abandoned-cart":
      return "You left something in your cart";
    case "cancellation":
      return "We're sorry to see you go";
    case "refund":
      return "Your refund has been processed";
    default:
      return "";
  }
};

export const getDefaultContent = (templateType: EmailRuleType | null): string => {
  switch (templateType) {
    case "confirmation":
      return `Thank you for your order. We'll send you another email when your order ships.`;
    case "abandoned-cart":
      return `We noticed you left some items in your cart. Use code COMEBACK for 10% off your purchase if you complete your order within the next 24 hours.`;
    case "cancellation":
      return `We're sorry to see you go. Your subscription has been canceled as requested.`;
    case "refund":
      return `We've processed your refund. It may take 5-10 business days to appear on your statement.`;
    default:
      return "";
  }
};

export const getDefaultHeroTitle = (templateType: EmailRuleType | null): string => {
  switch (templateType) {
    case "confirmation":
      return "ORDER CONFIRMED";
    case "abandoned-cart":
      return "YOU'RE IN LUCK!";
    case "cancellation":
      return "SUBSCRIPTION CANCELLED";
    case "refund":
      return "REFUND PROCESSED";
    default:
      return "";
  }
};

export const getDefaultSubtitle = (templateType: EmailRuleType | null): string => {
  switch (templateType) {
    case "confirmation":
      return "Your order has been confirmed and is being processed";
    case "abandoned-cart":
      return "That item you loved is still waiting for you";
    case "cancellation":
      return "We hope to see you again soon";
    case "refund":
      return "Your money is on its way back to you";
    default:
      return "";
  }
};

export const getTemplateTitle = (templateType: EmailRuleType | null): string => {
  switch (templateType) {
    case "confirmation":
      return "Purchase Confirmation Email";
    case "abandoned-cart":
      return "Abandoned Cart Email";
    case "cancellation":
      return "Cancellation Email";
    case "refund":
      return "Refund Email";
    default:
      return "Email Template";
  }
};

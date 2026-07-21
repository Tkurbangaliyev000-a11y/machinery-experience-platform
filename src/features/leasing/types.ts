export type LeasingApplicationPayload = {
  model: string;
  cost: string;
  name: string;
  phone: string;
  company: string;
  city: string;
  email: string;
  comment: string;
  consent: boolean;
};

export type LeasingFieldErrors = Partial<Record<"name" | "phone" | "consent", string>>;

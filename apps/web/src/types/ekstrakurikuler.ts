export interface Ekstrakurikuler {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  color: string;
  description: string;
  features: Array<{ icon: string; text: string }>;
  schedule: Array<{ day: string; time: string }>;
  rating: number;
  whatsapp: string;
  whatsappContact?: string;
  isActive?: boolean;
}

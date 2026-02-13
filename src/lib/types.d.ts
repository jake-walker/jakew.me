export type Project = {
  name: string;
  badgeText?: string;
  links: {
    icon?: string;
    title: string;
    url: string;
  }[];
  description: string;
  language?: string;
  iconUrl?: string;
  featured?: boolean;
  createdAt: Date,
  updatedAt: Date
};

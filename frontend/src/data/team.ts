// Team and leadership. Add only real people, with their approval.
// When this list is empty the About page shows how the studio works instead of profiles,
// and no Person structured data is published.
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  /** Optional portrait in /public/images/team (provide .webp and .avif). */
  image?: string;
  links?: { label: string; url: string }[];
  leadership?: boolean;
}

export const team: TeamMember[] = [];

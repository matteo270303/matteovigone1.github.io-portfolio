/**
 * Shared types used across the 3D scene and UI overlay.
 */

export type RoomId =
  | 'living'
  | 'studio'
  | 'library'
  | 'bedroom'
  | 'kitchen'
  | 'garden'
  | 'bathroom'
  | 'garage';

export type SectionKind =
  | 'about'
  | 'projects'
  | 'papers'
  | 'notes'
  | 'skills'
  | 'timeline'
  | 'hobbies'
  | 'experiments';

export interface RoomConfig {
  /** Stable identifier */
  id: RoomId;
  /** Display name (Italian) */
  name: string;
  /** Short subtitle/description */
  subtitle: string;
  /** Section associated with this room */
  section: SectionKind;
  /** Numeric shortcut (1-8) */
  shortcut: number;
  /** Pastel accent color (hex) */
  color: string;
  /** Wall color (hex) */
  wallColor: string;
  /** Floor color (hex) */
  floorColor: string;
  /** Top-down grid coordinates inside the house grid */
  gridX: number;
  gridZ: number;
  /** Width / Depth in voxel units (must match grid cell) */
  width: number;
  depth: number;
  /** Doors leading to neighboring rooms (RoomId list) */
  doors: RoomId[];
  /** Emoji-like icon used in the HUD */
  icon: string;
}

export interface Project {
  title: string;
  summary: string;
  tags: string[];
  link?: string;
  image?: string;
}

export interface Paper {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  abstract: string;
  pdf?: string;
  doi?: string;
}

export interface Note {
  title: string;
  field: string;
  description: string;
  pdf?: string;
}

export interface SkillGroup {
  category: string;
  items: { name: string; level: 1 | 2 | 3 | 4 | 5 }[];
}

export interface TimelineEntry {
  year: string;
  role: string;
  org: string;
  description: string;
}

export interface Hobby {
  name: string;
  description: string;
  icon: string;
}

export interface Experiment {
  title: string;
  status: 'in-progress' | 'completed' | 'archived';
  summary: string;
  link?: string;
}

export interface AboutData {
  name: string;
  tagline: string;
  bio: string[];
  location: string;
  email: string;
  social: { label: string; url: string }[];
  avatarColors: { skin: string; hair: string; shirt: string; pants: string };
}

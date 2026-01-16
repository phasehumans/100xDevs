import React from 'react';

export interface TeamMember {
  id: string;
  role: string;
  subRole: string;
  avatar: string; // URL or color
  description: string;
}

export interface ProjectTemplate {
  id: string;
  name: string;
  icon: React.ElementType;
}

export type ViewState = 'landing' | 'builder';
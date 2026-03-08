import { WorkExperience } from '../types';

let workexCache: WorkExperience[] | null = null;

export async function loadWorkExperience(): Promise<WorkExperience[]> {
  if (workexCache) {
    return workexCache;
  }

  try {
    const response = await fetch('/assets/data/workex.json');
    if (!response.ok) {
      throw new Error('Failed to load work experience data');
    }
    workexCache = await response.json();
    return workexCache;
  } catch (error) {
    console.error('Error loading work experience:', error);
    return [];
  }
}

export function getWorkExperienceSync(): WorkExperience[] {
  return workexCache || [];
}

export async function getWorkExperienceById(id: string): Promise<WorkExperience | undefined> {
  const data = await loadWorkExperience();
  return data.find(item => item.id === id);
}

export async function getFeaturedWorkExperience(): Promise<WorkExperience[]> {
  const data = await loadWorkExperience();
  return data.filter(item => item.featured);
}

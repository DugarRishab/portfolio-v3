import { WorkExperience } from '../types';
import { workexData } from './data';

export async function loadWorkExperience(): Promise<WorkExperience[]> {
  return workexData;
}

export function getWorkExperienceSync(): WorkExperience[] {
  return workexData;
}

export async function getWorkExperienceById(id: string): Promise<WorkExperience | undefined> {
  return workexData.find(item => item.id === id);
}

export async function getFeaturedWorkExperience(): Promise<WorkExperience[]> {
  const data = await loadWorkExperience();
  return data.filter(item => item.featured);
}

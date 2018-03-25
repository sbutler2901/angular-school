import { Topic } from './topic';
import {Course} from './course';

export const TOPICS: Topic[] = [
  { id: 'Java', name: 'Java', description: 'Java Description', courses: [
      { id: 'Course0', name: 'Intro', description: 'Into to Java'}, { id: 'Course1', name: 'Second', description: 'Second level Java'},
    ]
  },
  { id: 'Javascript', name: 'Javascript', description: 'Javascript Description', courses: [
      { id: 'Course0', name: 'Intro', description: 'Into to JS'}, { id: 'Course1', name: 'Second', description: 'Second level JS'}
    ]
  },
];

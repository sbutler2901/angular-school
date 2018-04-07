import {Course} from './course';

export class Topic {
  id: string;
  name: string;
  description: string;
  courses: Course[];

  constructor(id: string = '', name: string = '', description: string = '', courses: Course[] = []) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.courses = courses;
  }
}

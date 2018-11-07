export class Course {
  id: number;
  event_type: string;
  institution: string;
  event_name: string;
  start_date: Date;
  finish_date: Date;
  hours: number;
  type_certification: string;
  state: string;

  constructor() {
    this.institution = '';
    this.event_type = '';
    this.event_name = '';
    this.type_certification = '';
  }
}

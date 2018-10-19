export class AcademicFormation {
  id: number;
  professional_id: number;
  institution: string;
  career: string;
  professional_degree: string;
  registration_date: Date;
  senescyt_code: string;

  constructor() {
    this.institution = '';
    this.career = '';
    this.professional_degree = '';
  }
}

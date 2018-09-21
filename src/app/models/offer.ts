export class Offer {
  id: string;
  company_id: string;
  code: string;
  contact: string;
  email: string;
  phone: string;
  cell_phone: string;
  contract_type: string;
  position: string;
  broad_field: string;
  specific_field: string;
  training_hours: string;
  remuneration: string;
  working_day: string;
  number_jobs: number;
  activities: string;
  aditional_information: string;
  experience_time: string;
  start_date: string;
  finish_date: string;
  city: string;
  province: string;
  total: string;

  constructor() {
    this.id = '0';
    this.number_jobs = 1;
    this.contract_type = '';
    this.remuneration = '';
    this.experience_time = '';
    this.training_hours = '';
    this.working_day = '';
    // this.provincia = '';
    this.broad_field = '';
    this.specific_field = '';
  }
}

export class Offer {
  id?: number;
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
  start_date: Date;
  finish_date: Date;
  city: string;
  province: string;
  state: string;

  constructor() {
    this.code = '';
    this.contact = '';
    this.email = '';
    this.phone = '';
    this.cell_phone = '';
    this.contract_type = '';
    this.position = '';
    this.broad_field = '';
    this.specific_field = '';
    this.training_hours = '';
    this.remuneration = '';
    this.working_day = '';
    this.number_jobs = 1;
    this.activities = '';
    this.aditional_information = '';
    this.experience_time = '';
    this.start_date = new Date();
    this.finish_date = new Date();
    this.city = '';
    this.province = '';
    this.state = '';
  }
}

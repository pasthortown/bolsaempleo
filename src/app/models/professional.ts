export class Professional {
  id: string;
  identity: string;
  first_name: string;
  last_name: string;
  nationality: string;
  civil_status: string;
  birthdate: Date;
  gender: string;
  phone: string;
  address: string;
  about_me: string;

  constructor() {
    this.identity = '';
    this.first_name = '';
    this.last_name = '';
    this.nationality = '';
    this.birthdate = new Date();
    this.civil_status = '';
    this.gender = '';
    this.phone = '';
    this.address = '';
    this.about_me = '';
  }
}

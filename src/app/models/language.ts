export class Language {
  id: number;
  description: string;
  written_level: string;
  spoken_level: string;
  reading_level: string;
  state: string;

  constructor() {
    this.description = '';
    this.written_level = '';
    this.spoken_level = '';
    this.reading_level = '';
  }
}

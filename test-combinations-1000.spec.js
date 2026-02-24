/**
 * Playwright Test Suite: 1000 Well-Distributed UI Combinations
 * Auto-generated test cases
 */

import { test, expect } from '@playwright/test';

const TEST_COMBINATIONS = [
  {
    id: 1,
    gender: 'Male',
    loanAmount: 1,
    loanType: 'Secured',
    country: 'Antigua and Barbuda',
    university: 'American University of Antigua (AUA) College of Medicine',
    course: 'Agriculture; Arts; Business & Management; Computer Science & IT; Design & Architecture; Law; Social Sciences'
  },
  {
    id: 2,
    gender: 'Female',
    loanAmount: 1,
    loanType: 'Secured',
    country: 'Australia',
    university: 'Australian National University',
    course: 'Art; Arts; Design; Economics & Econometrics; Law; Management; Performing; STEM and Medical Courses'
  },
  {
    id: 3,
    gender: 'Male',
    loanAmount: 1,
    loanType: 'Secured',
    country: 'Armenia',
    university: 'Yerevan State University',
    course: 'Art; Arts; Design and Management.; Economics & Econometrics; Law; Performing; STEM'
  },
  {
    id: 4,
    gender: 'Female',
    loanAmount: 1,
    loanType: 'Secured',
    country: 'Austria',
    university: 'Karl-Franzens-Universitat Graz',
    course: 'Art; Arts; Design and Management.; Economics & Econometrics; Law; Performing; STEM'
  },
  {
    id: 5,
    gender: 'Male',
    loanAmount: 1,
    loanType: 'Secured',
    country: 'Argentina',
    university: 'Universidad Nacional del Sur',
    course: 'Agriculture; Arts; Business & Management; Computer Science & IT; Design & Architecture; Law; Social Sciences'
  },
  {
    id: 6,
    gender: 'Female',
    loanAmount: 1,
    loanType: 'Secured',
    country: 'Argentina',
    university: 'Universidad Nacional de Cuyo Mendoza',
    course: 'Art; Arts; Design and Management.; Economics & Econometrics; Law; Performing; STEM'
  },
  {
    id: 7,
    gender: 'Male',
    loanAmount: 1,
    loanType: 'Secured',
    country: 'Australia',
    university: 'Flinders University',
    course: 'Art; Arts; Design; Economics & Econometrics; Law; Management; Performing; STEM and Medical Courses'
  },
  {
    id: 8,
    gender: 'Female',
    loanAmount: 1,
    loanType: 'Secured',
    country: 'Austria',
    university: 'Wirtschaftsuniversitat Wien',
    course: 'Art; Arts; Design and Management.; Economics & Econometrics; Law; Performing; STEM'
  },
  {
    id: 9,
    gender: 'Male',
    loanAmount: 1,
    loanType: 'Secured',
    country: 'Australia',
    university: 'University of New England Australia',
    course: 'Agriculture; Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences'
  },
  {
    id: 10,
    gender: 'Female',
    loanAmount: 1,
    loanType: 'Secured',
    country: 'Argentina',
    university: 'Instituto Universitario del Hospital Italiano de Buenos Aires',
    course: 'Art; Design and Management.; Economics & Econometrics; Law; Medical; Performing Arts; STEM'
  },
  {
    id: 11,
    gender: 'Male',
    loanAmount: 1,
    loanType: 'Secured',
    country: 'Azerbaijan',
    university: 'Azerbaijan Technical University',
    course: 'Art; Design and Management.; Economics & Econometrics; Law; Medical; Performing Arts; STEM'
  },
  {
    id: 12,
    gender: 'Female',
    loanAmount: 1,
    loanType: 'Secured',
    country: 'Australia',
    university: 'Griffith University',
    course: 'Art; Arts; Design; Economics & Econometrics; Law; Management; Performing; STEM and Medical Courses'
  },
  {
    id: 13,
    gender: 'Male',
    loanAmount: 1,
    loanType: 'Secured',
    country: 'Argentina',
    university: 'Universidad Nacional de Cordoba',
    course: 'Agriculture; Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences'
  },
  {
    id: 14,
    gender: 'Female',
    loanAmount: 1,
    loanType: 'Secured',
    country: 'Argentina',
    university: 'Universidad Nacional de Rosario',
    course: 'Agriculture; Business & Management; Computer Science & IT; Engineering & Technology'
  },
  {
    id: 15,
    gender: 'Male',
    loanAmount: 1,
    loanType: 'Secured',
    country: 'Argentina',
    university: 'Universidad Nacional de Cuyo Mendoza',
    course: 'Art; Arts; Design and Management.; Economics & Econometrics; Law; Performing; STEM'
  },
  {
    id: 16,
    gender: 'Female',
    loanAmount: 50000,
    loanType: 'Secured',
    country: 'Australia',
    university: 'Central Queensland University Australia (CQUniversity)',
    course: 'Art; Design and Management.; Economics & Econometrics; Law; Medical; Performing Arts; STEM'
  },
  {
    id: 17,
    gender: 'Male',
    loanAmount: 50000,
    loanType: 'Secured',
    country: 'Austria',
    university: 'Sigmund Freud PrivatUniversitat Wien',
    course: 'Agriculture; Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences'
  },
  {
    id: 18,
    gender: 'Female',
    loanAmount: 50000,
    loanType: 'Secured',
    country: 'Armenia',
    university: 'Yerevan State University',
    course: 'Agriculture; Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences'
  },
  {
    id: 19,
    gender: 'Male',
    loanAmount: 50000,
    loanType: 'Secured',
    country: 'Armenia',
    university: 'Yerevan State University',
    course: 'Art; Arts; Design and Management.; Economics & Econometrics; Law; Performing; STEM'
  },
  {
    id: 20,
    gender: 'Female',
    loanAmount: 50000,
    loanType: 'Secured',
    country: 'Armenia',
    university: 'Yerevan State University',
    course: 'Art; Design and Management; Economics & Econometrics; Law; Medical; Performing Arts; STEM'
  },
  {
    id: 21,
    gender: 'Male',
    loanAmount: 50000,
    loanType: 'Secured',
    country: 'Australia',
    university: 'Central Queensland University CQUniversity',
    course: 'Any course'
  },
  {
    id: 22,
    gender: 'Female',
    loanAmount: 50000,
    loanType: 'Secured',
    country: 'Armenia',
    university: 'Yerevan State University',
    course: 'Art; Design Management and All other Courses.; Economics & Econometrics; Law; Medical Courses; Performing Arts; STEM'
  },
  {
    id: 23,
    gender: 'Male',
    loanAmount: 50000,
    loanType: 'Secured',
    country: 'Bahrain',
    university: 'University of Bahrain',
    course: 'Art; Arts; Design and Management.; Economics & Econometrics; Law; Performing; STEM'
  },
  {
    id: 24,
    gender: 'Female',
    loanAmount: 50000,
    loanType: 'Secured',
    country: 'Australia',
    university: 'University of Sydney',
    course: 'Art; Arts; Design; Economics & Econometrics; Law; Management; Performing; STEM and Medical Courses'
  },
  {
    id: 25,
    gender: 'Male',
    loanAmount: 50000,
    loanType: 'Secured',
    country: 'Armenia',
    university: 'Yerevan State University',
    course: 'Art; Design Management and All other Courses.; Economics & Econometrics; Law; Medical Courses; Performing Arts; STEM'
  },
  {
    id: 26,
    gender: 'Female',
    loanAmount: 50000,
    loanType: 'Secured',
    country: 'Azerbaijan',
    university: 'Khazar University',
    course: 'Art; Design and Management.; Economics & Econometrics; Law; Medical; Performing Arts; STEM'
  },
  {
    id: 27,
    gender: 'Male',
    loanAmount: 50000,
    loanType: 'Secured',
    country: 'Armenia',
    university: 'Yerevan State University',
    course: 'Art; Design and Management; Law; Medical; Performing Arts; STEM'
  },
  {
    id: 28,
    gender: 'Female',
    loanAmount: 50000,
    loanType: 'Secured',
    country: 'Australia',
    university: 'Southern Cross University',
    course: 'Art; Design and Management.; Economics & Econometrics; Law; Medical; Performing Arts; STEM'
  },
  {
    id: 29,
    gender: 'Male',
    loanAmount: 50000,
    loanType: 'Secured',
    country: 'Australia',
    university: 'University of Tasmania',
    course: 'Art; Design and Management; Law; Medical; Performing Arts; STEM'
  },
  {
    id: 30,
    gender: 'Female',
    loanAmount: 75000,
    loanType: 'Secured',
    country: 'Bangladesh',
    university: 'Brac University',
    course: 'Art; Design and Management; Economics & Econometrics; Law; Medical; Performing Arts; STEM'
  },
  {
    id: 31,
    gender: 'Male',
    loanAmount: 75000,
    loanType: 'Secured',
    country: 'Australia',
    university: 'Flinders University',
    course: 'Art; Design and Management.; Economics & Econometrics; Law; Medical; Performing Arts; STEM'
  },
  {
    id: 32,
    gender: 'Female',
    loanAmount: 75000,
    loanType: 'Secured',
    country: 'Bahrain',
    university: 'Applied Science University - Bahrain',
    course: 'Art; Design and Management; Law; Medical; Performing Arts; STEM'
  },
  {
    id: 33,
    gender: 'Male',
    loanAmount: 75000,
    loanType: 'Secured',
    country: 'Austria',
    university: 'Sigmund Freud PrivatUniversitat Wien',
    course: 'Art; Design and Management; Law; Medical; Performing Arts; STEM'
  },
  {
    id: 34,
    gender: 'Female',
    loanAmount: 75000,
    loanType: 'Secured',
    country: 'Azerbaijan',
    university: 'Azerbaijan Technical University',
    course: 'Art; Design and Management.; Economics & Econometrics; Law; Medical; Performing Arts; STEM'
  },
  {
    id: 35,
    gender: 'Male',
    loanAmount: 75000,
    loanType: 'Secured',
    country: 'Australia',
    university: 'University of Queensland',
    course: 'Art; Design; Economics & Econometrics; Law; Management Courses and Public Policy.; Medical; Performing Arts; STEM'
  },
  {
    id: 36,
    gender: 'Female',
    loanAmount: 75000,
    loanType: 'Secured',
    country: 'Austria',
    university: 'Medizinische Universitat Wien',
    course: 'Art; Arts; Design; Economics & Econometrics; Law; Management; Performing; STEM and Medical Courses'
  },
  {
    id: 37,
    gender: 'Male',
    loanAmount: 75000,
    loanType: 'Secured',
    country: 'Bahrain',
    university: 'Ahlia University',
    course: 'Art; Design; Economics & Econometrics; Law; Management Courses and Public Policy.; Medical; Performing Arts; STEM'
  },
  {
    id: 38,
    gender: 'Female',
    loanAmount: 75000,
    loanType: 'Secured',
    country: 'Belarus',
    university: 'Belarusian National Technical University',
    course: 'Art; Design and Management; Law; Medical; Performing Arts; STEM'
  },
  {
    id: 39,
    gender: 'Male',
    loanAmount: 75000,
    loanType: 'Secured',
    country: 'Belarus',
    university: 'Belarusian State University',
    course: 'Art; Design; Economics & Econometrics; Law; Management Courses and Public Policy.; Medical; Performing Arts; STEM'
  },
  {
    id: 40,
    gender: 'Female',
    loanAmount: 75000,
    loanType: 'Secured',
    country: 'Bangladesh',
    university: 'Rajshahi University of Engineering and Technology',
    course: 'Art; Design Management and All other Courses.; Economics & Econometrics; Law; Medical Courses; Performing Arts; STEM'
  },
  {
    id: 41,
    gender: 'Male',
    loanAmount: 75000,
    loanType: 'Secured',
    country: 'Austria',
    university: 'Medizinische Universitat Innsbruck',
    course: 'Art; Design; Economics & Econometrics; Law; Management Courses and Public Policy.; Medical; Performing Arts; STEM'
  },
  {
    id: 42,
    gender: 'Female',
    loanAmount: 75000,
    loanType: 'Secured',
    country: 'Azerbaijan',
    university: 'Khazar University',
    course: 'Art; Design; Economics & Econometrics; Law; Management Courses and Public Policy.; Medical; Performing Arts; STEM'
  },
  {
    id: 43,
    gender: 'Male',
    loanAmount: 75000,
    loanType: 'Secured',
    country: 'Austria',
    university: 'Sigmund Freud PrivatUniversitat Wien',
    course: 'Art; Design and Management; Law; Medical; Performing Arts; STEM'
  },
  {
    id: 44,
    gender: 'Female',
    loanAmount: 100000,
    loanType: 'Secured',
    country: 'Austria',
    university: 'Johannes Kepler University Linz',
    course: 'Art; Design and Management; Economics & Econometrics; Law; Medical; Performing Arts; STEM'
  },
  {
    id: 45,
    gender: 'Male',
    loanAmount: 100000,
    loanType: 'Secured',
    country: 'Azerbaijan',
    university: 'Azerbaijan State University of Economics',
    course: 'Art; Design and Management; Law; Medical; Performing Arts; STEM'
  },
  {
    id: 46,
    gender: 'Female',
    loanAmount: 100000,
    loanType: 'Secured',
    country: 'Belgium',
    university: 'University Catholique de Louvain',
    course: 'Art; Design; Economics & Econometrics; Law; Management Courses; Performing Arts; STEM; and Medical.'
  },
  {
    id: 47,
    gender: 'Male',
    loanAmount: 100000,
    loanType: 'Secured',
    country: 'Bahrain',
    university: 'Applied Science University - Bahrain',
    course: 'Art; Design; Economics & Econometrics; Law; Management Courses; Performing Arts; STEM and Medical Courses.'
  },
  {
    id: 48,
    gender: 'Female',
    loanAmount: 100000,
    loanType: 'Secured',
    country: 'Azerbaijan',
    university: 'Azerbaijan State Oil and Industry University',
    course: 'Art; Design and Management.; Economics & Econometrics; Law; Medical; Performing Arts; STEM'
  },
  {
    id: 49,
    gender: 'Male',
    loanAmount: 100000,
    loanType: 'Secured',
    country: 'Bahrain',
    university: 'University of Bahrain',
    course: 'Art; Design and Management; Law; Medical; Performing Arts; STEM'
  },
  {
    id: 50,
    gender: 'Female',
    loanAmount: 100000,
    loanType: 'Secured',
    country: 'Bahrain',
    university: 'Applied Science University - Bahrain',
    course: 'Art; Design; Economics & Econometrics; Law; Management Courses and Public Policy.; Medical; Performing Arts; STEM'
  },
  {
    id: 51,
    gender: 'Male',
    loanAmount: 100000,
    loanType: 'Secured',
    country: 'Bangladesh',
    university: 'Daffodil International University',
    course: 'Art; Design; Economics & Econometrics; Law; Management Courses; Performing Arts; STEM and Medical Courses.'
  },
  {
    id: 52,
    gender: 'Female',
    loanAmount: 100000,
    loanType: 'Secured',
    country: 'Belarus',
    university: 'Belarusian National Technical University',
    course: 'Art; Design and Management.; Economics & Econometrics; Law; Medical; Performing Arts; STEM'
  },
  {
    id: 53,
    gender: 'Male',
    loanAmount: 100000,
    loanType: 'Secured',
    country: 'Belarus',
    university: 'Belarusian National Technical University',
    course: 'Art; Design and Management; Economics & Econometrics; Law; Medical; Performing Arts; STEM'
  },
  {
    id: 54,
    gender: 'Female',
    loanAmount: 100000,
    loanType: 'Secured',
    country: 'Bahrain',
    university: 'Applied Science University - Bahrain',
    course: 'Art; Design; Economics & Econometrics; Law; Management Courses; Performing Arts; STEM and Medical Courses.'
  },
  {
    id: 55,
    gender: 'Male',
    loanAmount: 100000,
    loanType: 'Secured',
    country: 'Bangladesh',
    university: 'Brac University',
    course: 'Art; Design; Economics & Econometrics; Law; Management Courses; Performing Arts; STEM and Medical Courses.'
  },
  {
    id: 56,
    gender: 'Female',
    loanAmount: 100000,
    loanType: 'Secured',
    country: 'Bolivia',
    university: 'Universidad Mayor de San Andres',
    course: 'Art; Design and Management.; Economics & Econometrics; Law; Medical; Performing Arts; STEM'
  },
  {
    id: 57,
    gender: 'Male',
    loanAmount: 100000,
    loanType: 'Secured',
    country: 'Belarus',
    university: 'Belarusian National Technical University',
    course: 'Art; Design and Management; Economics & Econometrics; Law; Medical; Performing Arts; STEM'
  },
  {
    id: 58,
    gender: 'Female',
    loanAmount: 200000,
    loanType: 'Secured',
    country: 'Bahrain',
    university: 'Ahlia University',
    course: 'Art; Design and Management; Law; Medical; Performing Arts; STEM'
  },
  {
    id: 59,
    gender: 'Male',
    loanAmount: 200000,
    loanType: 'Secured',
    country: 'Belgium',
    university: 'University of Antwerp',
    course: 'Art; Design; Economics & Econometrics; Law; Management Courses; Performing Arts; STEM; and Medical.'
  },
  {
    id: 60,
    gender: 'Female',
    loanAmount: 200000,
    loanType: 'Secured',
    country: 'Bahrain',
    university: 'Applied Science University - Bahrain',
    course: 'Art; Design; Economics & Econometrics; Law; Management and All other Courses.; Medical; Performing Arts; STEM'
  },
  {
    id: 61,
    gender: 'Male',
    loanAmount: 200000,
    loanType: 'Secured',
    country: 'Bangladesh',
    university: 'North South University Bangladesh',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Medical.; Performing Arts; STEM'
  },
  {
    id: 62,
    gender: 'Female',
    loanAmount: 200000,
    loanType: 'Secured',
    country: 'Belgium',
    university: 'University of Namur',
    course: 'Art; Design; Economics & Econometrics; Law; Management Courses; Performing Arts; STEM; and Medical.'
  },
  {
    id: 63,
    gender: 'Male',
    loanAmount: 200000,
    loanType: 'Secured',
    country: 'Bolivia',
    university: 'Universidad Mayor de San Andres',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Medical.; Performing Arts; STEM'
  },
  {
    id: 64,
    gender: 'Female',
    loanAmount: 200000,
    loanType: 'Secured',
    country: 'Bangladesh',
    university: 'Daffodil International University',
    course: 'Art; Design and Management; Law; Medical; Performing Arts; STEM'
  },
  {
    id: 65,
    gender: 'Male',
    loanAmount: 200000,
    loanType: 'Secured',
    country: 'Bolivia',
    university: 'Universidad Mayor de San Andres',
    course: 'Art; Design; Economics & Econometrics; Law; Management and All other Courses.; Medical; Performing Arts; STEM'
  },
  {
    id: 66,
    gender: 'Female',
    loanAmount: 200000,
    loanType: 'Secured',
    country: 'Bangladesh',
    university: 'North South University',
    course: 'Art; Design; Economics & Econometrics; Law; Management and All other Courses.; Medical; Performing Arts; STEM'
  },
  {
    id: 67,
    gender: 'Male',
    loanAmount: 200000,
    loanType: 'Secured',
    country: 'Bangladesh',
    university: 'North South University Bangladesh',
    course: 'Art; Design and Management; Law; Medical; Performing Arts; STEM'
  },
  {
    id: 68,
    gender: 'Female',
    loanAmount: 200000,
    loanType: 'Secured',
    country: 'Belgium',
    university: 'Institute of Tropical Medicine Antwerp',
    course: 'Art; Design; Economics & Econometrics; Law; Management and All other Courses.; Medical; Performing Arts; STEM'
  },
  {
    id: 69,
    gender: 'Male',
    loanAmount: 200000,
    loanType: 'Secured',
    country: 'Bangladesh',
    university: 'Bangladesh Agricultural University',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Medical.; Performing Arts; STEM'
  },
  {
    id: 70,
    gender: 'Female',
    loanAmount: 200000,
    loanType: 'Secured',
    country: 'Belarus',
    university: 'Belarusian National Technical University',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Medical; Performing Arts; STEM'
  },
  {
    id: 71,
    gender: 'Male',
    loanAmount: 200000,
    loanType: 'Secured',
    country: 'Belarus',
    university: 'Belarusian State University',
    course: 'Art; Design; Economics & Econometrics; Law; Management Courses; Performing Arts; STEM; and Medical.'
  },
  {
    id: 72,
    gender: 'Female',
    loanAmount: 250000,
    loanType: 'Secured',
    country: 'Bosnia and Herzegovina',
    university: 'University of Sarajevo',
    course: 'Art; Design; Economics & Econometrics; Law; Management Courses and Public Policy.; Medical; Performing Arts; STEM'
  },
  {
    id: 73,
    gender: 'Male',
    loanAmount: 250000,
    loanType: 'Secured',
    country: 'Belarus',
    university: 'Belarusian National Technical University',
    course: 'Art; Design; Economics & Econometrics; Law; Management and All other Courses.; Medical; Performing Arts; STEM'
  },
  {
    id: 74,
    gender: 'Female',
    loanAmount: 250000,
    loanType: 'Secured',
    country: 'Bolivia',
    university: 'Universidad Mayor de San Andres',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Public Affairs.; Medical; Performing Arts; STEM'
  },
  {
    id: 75,
    gender: 'Male',
    loanAmount: 250000,
    loanType: 'Secured',
    country: 'Bolivia',
    university: 'Universidad Mayor de San Andres',
    course: 'Art; Design; Economics & Econometrics; Law; Management Courses and Public Policy.; Medical; Performing Arts; STEM'
  },
  {
    id: 76,
    gender: 'Female',
    loanAmount: 250000,
    loanType: 'Secured',
    country: 'Belgium',
    university: 'University Libre de Bruxelles (ULB)',
    course: 'Art; Design; Economics & Econometrics; Law; Management Courses and Public Policy.; Medical; Performing Arts; STEM'
  },
  {
    id: 77,
    gender: 'Male',
    loanAmount: 250000,
    loanType: 'Secured',
    country: 'Belgium',
    university: 'University of Mons',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Medical; Performing Arts; STEM'
  },
  {
    id: 78,
    gender: 'Female',
    loanAmount: 250000,
    loanType: 'Secured',
    country: 'Botswana',
    university: 'University of Botswana',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Public Affairs.; Medical; Performing Arts; STEM'
  },
  {
    id: 79,
    gender: 'Male',
    loanAmount: 250000,
    loanType: 'Secured',
    country: 'Bosnia and Herzegovina',
    university: 'University of Sarajevo',
    course: 'Art; Design; Economics & Econometrics; Law; Management Courses and Public Policy.; Medical; Performing Arts; STEM'
  },
  {
    id: 80,
    gender: 'Female',
    loanAmount: 250000,
    loanType: 'Secured',
    country: 'Brazil',
    university: 'Universidade Federal do Rio Grande do Sul UFRGS',
    course: 'Art; Design; Economics & Econometrics; Law; Management Courses; Performing Arts; STEM and Medical Courses.'
  },
  {
    id: 81,
    gender: 'Male',
    loanAmount: 250000,
    loanType: 'Secured',
    country: 'Bosnia and Herzegovina',
    university: 'University of Sarajevo',
    course: 'Art; Design; Economics & Econometrics; Law; Management and All other Courses.; Medical; Performing Arts; STEM'
  },
  {
    id: 82,
    gender: 'Female',
    loanAmount: 250000,
    loanType: 'Secured',
    country: 'Bosnia and Herzegovina',
    university: 'University of East Sarajevo',
    course: 'Art; Design; Economics & Econometrics; Law; Management Courses; Performing Arts; STEM and Medical Courses.'
  },
  {
    id: 83,
    gender: 'Male',
    loanAmount: 250000,
    loanType: 'Secured',
    country: 'Brazil',
    university: 'Universidade Estadual de Londrina',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Medical; Performing Arts; STEM'
  },
  {
    id: 84,
    gender: 'Female',
    loanAmount: 250000,
    loanType: 'Secured',
    country: 'Brazil',
    university: 'Universidade Federal do Rio Grande FURG',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Public Affairs.; Medical; Performing Arts; STEM'
  },
  {
    id: 85,
    gender: 'Male',
    loanAmount: 250000,
    loanType: 'Secured',
    country: 'Bosnia and Herzegovina',
    university: 'University of East Sarajevo',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Public Affairs.; Medical; Performing Arts; STEM'
  },
  {
    id: 86,
    gender: 'Female',
    loanAmount: 300000,
    loanType: 'Secured',
    country: 'Bosnia and Herzegovina',
    university: 'University of Sarajevo',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Public Affairs.; Medical; Performing Arts; STEM'
  },
  {
    id: 87,
    gender: 'Male',
    loanAmount: 300000,
    loanType: 'Secured',
    country: 'Bosnia and Herzegovina',
    university: 'University of Banja Luka',
    course: 'Art; Design; Economics & Econometrics; Law; Management Courses; Performing Arts; STEM; and Medical.'
  },
  {
    id: 88,
    gender: 'Female',
    loanAmount: 300000,
    loanType: 'Secured',
    country: 'Bosnia and Herzegovina',
    university: 'University of East Sarajevo',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Medical; Performing Arts; STEM'
  },
  {
    id: 89,
    gender: 'Male',
    loanAmount: 300000,
    loanType: 'Secured',
    country: 'Brunei Darussalam',
    university: 'Universiti Brunei Darussalam (UBD)',
    course: 'Art; Design; Economics & Econometrics; Law; Management Courses; Performing Arts; STEM; and Medical.'
  },
  {
    id: 90,
    gender: 'Female',
    loanAmount: 300000,
    loanType: 'Secured',
    country: 'Bosnia and Herzegovina',
    university: 'University of East Sarajevo',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Public Studies; Medical; Performing Arts; STEM'
  },
  {
    id: 91,
    gender: 'Male',
    loanAmount: 300000,
    loanType: 'Secured',
    country: 'Botswana',
    university: 'University of Botswana',
    course: 'Art; Design; Economics & Econometrics; Law; Management Courses; Performing Arts; STEM; and Medical.'
  },
  {
    id: 92,
    gender: 'Female',
    loanAmount: 300000,
    loanType: 'Secured',
    country: 'Bosnia and Herzegovina',
    university: 'University of East Sarajevo',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Medical; Performing Arts; STEM'
  },
  {
    id: 93,
    gender: 'Male',
    loanAmount: 300000,
    loanType: 'Secured',
    country: 'Botswana',
    university: 'University of Botswana',
    course: 'Art; Design; Economics & Econometrics; Law; Management and All other Courses.; Medical; Performing Arts; STEM'
  },
  {
    id: 94,
    gender: 'Female',
    loanAmount: 300000,
    loanType: 'Secured',
    country: 'Botswana',
    university: 'University of Botswana',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Public Studies; Medical; Performing Arts; STEM'
  },
  {
    id: 95,
    gender: 'Male',
    loanAmount: 300000,
    loanType: 'Secured',
    country: 'Botswana',
    university: 'University of Botswana',
    course: 'Art; Design; Economics & Econometrics; Law; Management and STEM; Medical; Performing Arts'
  },
  {
    id: 96,
    gender: 'Female',
    loanAmount: 300000,
    loanType: 'Secured',
    country: 'Brazil',
    university: 'Universidade Federal do Rio Grande FURG',
    course: 'Art; Design; Economics & Econometrics; Law; Management and All other Courses.; Medical; Performing Arts; STEM'
  },
  {
    id: 97,
    gender: 'Male',
    loanAmount: 300000,
    loanType: 'Secured',
    country: 'Botswana',
    university: 'University of Botswana',
    course: 'Art; Design; Economics & Econometrics; Law; Management and All other Courses.; Medical; Performing Arts; STEM'
  },
  {
    id: 98,
    gender: 'Female',
    loanAmount: 300000,
    loanType: 'Secured',
    country: 'Botswana',
    university: 'University of Botswana',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Public Service.; Medical; Performing Arts; STEM'
  },
  {
    id: 99,
    gender: 'Male',
    loanAmount: 300000,
    loanType: 'Secured',
    country: 'Brazil',
    university: 'Universidade Federal Rural de Pernambuco UFRPE',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Medical; Performing Arts; STEM'
  },
  {
    id: 100,
    gender: 'Female',
    loanAmount: 400000,
    loanType: 'Secured',
    country: 'Bulgaria',
    university: 'Medical University Sofia',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Medical; Performing Arts; STEM'
  },
  {
    id: 101,
    gender: 'Male',
    loanAmount: 400000,
    loanType: 'Secured',
    country: 'Bulgaria',
    university: 'Sofia University St Kliment Ohridski',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Medical; Performing Arts; STEM'
  },
  {
    id: 102,
    gender: 'Female',
    loanAmount: 400000,
    loanType: 'Secured',
    country: 'Botswana',
    university: 'University of Botswana',
    course: 'Art; Design; Economics & Econometrics; Law; Management; Medical; Performing Arts; STEM; and Public Affairs.'
  },
  {
    id: 103,
    gender: 'Male',
    loanAmount: 400000,
    loanType: 'Secured',
    country: 'Brunei Darussalam',
    university: 'Universiti Brunei Darussalam (UBD)',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Public Studies; Medical; Performing Arts; STEM'
  },
  {
    id: 104,
    gender: 'Female',
    loanAmount: 400000,
    loanType: 'Secured',
    country: 'Bulgaria',
    university: 'Sofia University "St. Kliment Ohridski"',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Public Affairs.; Medical; Performing Arts; STEM'
  },
  {
    id: 105,
    gender: 'Male',
    loanAmount: 400000,
    loanType: 'Secured',
    country: 'Bulgaria',
    university: 'Sofia University St Kliment Ohridski',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Public Affairs.; Medical; Performing Arts; STEM'
  },
  {
    id: 106,
    gender: 'Female',
    loanAmount: 400000,
    loanType: 'Secured',
    country: 'Brazil',
    university: 'Universidade Federal de Santa Catarina',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Public Service.; Medical; Performing Arts; STEM'
  },
  {
    id: 107,
    gender: 'Male',
    loanAmount: 400000,
    loanType: 'Secured',
    country: 'Bulgaria',
    university: 'Sofia University St Kliment Ohridski',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Public Studies; Medical; Performing Arts; STEM'
  },
  {
    id: 108,
    gender: 'Female',
    loanAmount: 400000,
    loanType: 'Secured',
    country: 'Brunei Darussalam',
    university: 'Universiti Teknologi Brunei',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Public Affairs.; Medical; Performing Arts; STEM'
  },
  {
    id: 109,
    gender: 'Male',
    loanAmount: 400000,
    loanType: 'Secured',
    country: 'Canada',
    university: 'University du Quebec Chicoutimi',
    course: 'Art; Design; Economics & Econometrics; Law; Management and STEM; Medical; Performing Arts'
  },
  {
    id: 110,
    gender: 'Female',
    loanAmount: 400000,
    loanType: 'Secured',
    country: 'Bulgaria',
    university: 'Sofia University "St. Kliment Ohridski"',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Public Affairs.; Medical; Performing Arts; STEM'
  },
  {
    id: 111,
    gender: 'Male',
    loanAmount: 400000,
    loanType: 'Secured',
    country: 'Bulgaria',
    university: 'Medical University Sofia',
    course: 'Art; Design; Economics & Econometrics; Law; Management and STEM; Medical; Performing Arts'
  },
  {
    id: 112,
    gender: 'Female',
    loanAmount: 400000,
    loanType: 'Secured',
    country: 'Botswana',
    university: 'University of Botswana',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Public Studies; Medical; Performing Arts; STEM'
  },
  {
    id: 113,
    gender: 'Male',
    loanAmount: 400000,
    loanType: 'Secured',
    country: 'Botswana',
    university: 'University of Botswana',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Public Affairs.; Medical; Performing Arts; STEM'
  },
  {
    id: 114,
    gender: 'Female',
    loanAmount: 400001,
    loanType: 'Secured',
    country: 'Canada',
    university: 'Lakehead University',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Public Studies; Medical; Performing Arts; STEM'
  },
  {
    id: 115,
    gender: 'Male',
    loanAmount: 400001,
    loanType: 'Secured',
    country: 'Botswana',
    university: 'University of Botswana',
    course: 'Art; Design; Economics & Econometrics; Law; Medical Courses; Performing Arts; STEM; and Management'
  },
  {
    id: 116,
    gender: 'Female',
    loanAmount: 400001,
    loanType: 'Secured',
    country: 'Brunei Darussalam',
    university: 'Universiti Teknologi Brunei',
    course: 'Art; Design; Economics & Econometrics; Law; Management and STEM; Medical; Performing Arts'
  },
  {
    id: 117,
    gender: 'Male',
    loanAmount: 400001,
    loanType: 'Secured',
    country: 'Brazil',
    university: 'Universidade de Brasilia (UnB)',
    course: 'Art; Design; Economics & Econometrics; Law; Management; Performing Arts; STEM and Medical Courses'
  },
  {
    id: 118,
    gender: 'Female',
    loanAmount: 400001,
    loanType: 'Secured',
    country: 'Brunei Darussalam',
    university: 'Universiti Teknologi Brunei',
    course: 'Art; Design; Economics & Econometrics; Law; Management; Performing Arts; STEM and Medical Courses'
  },
  {
    id: 119,
    gender: 'Male',
    loanAmount: 400001,
    loanType: 'Secured',
    country: 'Bulgaria',
    university: 'Sofia University St Kliment Ohridski',
    course: 'Art; Design; Economics & Econometrics; Law; Medical Courses; Performing Arts; STEM; and Management'
  },
  {
    id: 120,
    gender: 'Female',
    loanAmount: 400001,
    loanType: 'Secured',
    country: 'Bulgaria',
    university: 'Sofia University St Kliment Ohridski',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Public Affairs.; Medical; Performing Arts; STEM'
  },
  {
    id: 121,
    gender: 'Male',
    loanAmount: 400001,
    loanType: 'Secured',
    country: 'Brazil',
    university: 'Universidade Estadual de Santa Cruz UESC',
    course: 'Art; Design; Economics & Econometrics; Law; Management and STEM; Medical; Performing Arts'
  },
  {
    id: 122,
    gender: 'Female',
    loanAmount: 400001,
    loanType: 'Secured',
    country: 'Brunei Darussalam',
    university: 'Universiti Teknologi Brunei',
    course: 'Art; Design; Economics & Econometrics; Law; Management; Medical; Performing Arts; STEM; and Public Affairs.'
  },
  {
    id: 123,
    gender: 'Male',
    loanAmount: 400001,
    loanType: 'Secured',
    country: 'Chile',
    university: 'Pontificia Universidad Catolica de Valparaiso',
    course: 'Art; Design; Economics & Econometrics; Law; Management and STEM; Medical; Performing Arts'
  },
  {
    id: 124,
    gender: 'Female',
    loanAmount: 400001,
    loanType: 'Secured',
    country: 'Brunei Darussalam',
    university: 'Universiti Teknologi Brunei',
    course: 'Art; Design; Economics & Econometrics; Law; Management; Performing Arts; STEM and Medical Courses'
  },
  {
    id: 125,
    gender: 'Male',
    loanAmount: 400001,
    loanType: 'Secured',
    country: 'Canada',
    university: 'University of Lethbridge',
    course: 'Art; Design; Economics & Econometrics; Law; Management and STEM; Medical; Performing Arts'
  },
  {
    id: 126,
    gender: 'Female',
    loanAmount: 400001,
    loanType: 'Secured',
    country: 'Brunei Darussalam',
    university: 'University of Brunei Darussalam',
    course: 'Art; Design; Economics & Econometrics; Law; Management; Performing Arts; STEM and Medical Courses'
  },
  {
    id: 127,
    gender: 'Male',
    loanAmount: 400001,
    loanType: 'Secured',
    country: 'Bulgaria',
    university: 'Sofia University St Kliment Ohridski',
    course: 'Art; Design; Economics & Econometrics; Law; Medical and Management.; Performing Arts; STEM'
  },
  {
    id: 128,
    gender: 'Female',
    loanAmount: 450000,
    loanType: 'Secured',
    country: 'Bulgaria',
    university: 'Medical University Sofia',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Public Studies; Medical; Performing Arts; STEM'
  },
  {
    id: 129,
    gender: 'Male',
    loanAmount: 450000,
    loanType: 'Secured',
    country: 'Bulgaria',
    university: 'Medical University Sofia',
    course: 'Art; Design; Economics & Econometrics; Law; Management and STEM; Medical; Performing Arts'
  },
  {
    id: 130,
    gender: 'Female',
    loanAmount: 450000,
    loanType: 'Secured',
    country: 'Canada',
    university: 'Northeastern University-Vancouver',
    course: 'Art; Design; Economics & Econometrics; Law; Medical Courses; Performing Arts; STEM; and Management'
  },
  {
    id: 131,
    gender: 'Male',
    loanAmount: 450000,
    loanType: 'Secured',
    country: 'Chile',
    university: 'Universidad de los Lagos',
    course: 'Art; Design; Economics & Econometrics; Law; Management; Performing Arts; STEM and Medical Courses'
  },
  {
    id: 132,
    gender: 'Female',
    loanAmount: 450000,
    loanType: 'Secured',
    country: 'Chile',
    university: 'Universidad Mayor Chile',
    course: 'Art; Design; Economics & Econometrics; Law; Management; Medical; Performing Arts; STEM; and Public Affairs.'
  },
  {
    id: 133,
    gender: 'Male',
    loanAmount: 450000,
    loanType: 'Secured',
    country: 'Chile',
    university: 'Universidad de los Lagos',
    course: 'Art; Design; Economics & Econometrics; Law; Management; Medical; Performing Arts; STEM; and Public Affairs.'
  },
  {
    id: 134,
    gender: 'Female',
    loanAmount: 450000,
    loanType: 'Secured',
    country: 'Chile',
    university: 'Pontificia Universidad Catolica de Chile',
    course: 'Art; Design; Economics & Econometrics; Law; Management and Public Studies; Medical; Performing Arts; STEM'
  },
  {
    id: 135,
    gender: 'Male',
    loanAmount: 450000,
    loanType: 'Secured',
    country: 'Bulgaria',
    university: 'Sofia University St Kliment Ohridski',
    course: 'Art; Design; Economics & Econometrics; Law; Medical and Management.; Performing Arts; STEM'
  },
  {
    id: 136,
    gender: 'Female',
    loanAmount: 450000,
    loanType: 'Secured',
    country: 'Colombia',
    university: 'Universidad del Cauca',
    course: 'Art; Design; Economics & Econometrics; Law; Management and STEM; Medical; Performing Arts'
  },
  {
    id: 137,
    gender: 'Male',
    loanAmount: 450000,
    loanType: 'Secured',
    country: 'China',
    university: 'Yunnan University',
    course: 'Art; Design; Economics & Econometrics; Law; Medical; Performing Arts; STEM; and Management'
  },
  {
    id: 138,
    gender: 'Female',
    loanAmount: 450000,
    loanType: 'Secured',
    country: 'China',
    university: 'Chongqing Normal University',
    course: 'Art; Design; Economics & Econometrics; Law; Management and STEM; Medical; Performing Arts'
  },
  {
    id: 139,
    gender: 'Male',
    loanAmount: 450000,
    loanType: 'Secured',
    country: 'China',
    university: 'Hangzhou Normal University',
    course: 'Art; Design; Economics & Econometrics; Law; Medical Courses; Performing Arts; STEM; and Management'
  },
  {
    id: 140,
    gender: 'Female',
    loanAmount: 450000,
    loanType: 'Secured',
    country: 'Chile',
    university: 'Universidad del Bio-Bio',
    course: 'Art; Design; Economics & Econometrics; Law; Medical and Management; Performing Arts; STEM'
  },
  {
    id: 141,
    gender: 'Male',
    loanAmount: 450000,
    loanType: 'Secured',
    country: 'Bulgaria',
    university: 'Medical University Sofia',
    course: 'Art; Design; Economics & Econometrics; Law; Management and STEM; Medical; Performing Arts'
  },
  {
    id: 142,
    gender: 'Female',
    loanAmount: 500000,
    loanType: 'Secured',
    country: 'Canada',
    university: 'University of Toronto',
    course: 'Art; Design; Economics & Econometrics; Law; Management; Performing Arts; STEM and Medical Courses'
  },
  {
    id: 143,
    gender: 'Male',
    loanAmount: 500000,
    loanType: 'Secured',
    country: 'Costa Rica',
    university: 'Universidad Nacional Costa Rica',
    course: 'Art; Design; Economics & Econometrics; Law; Performing Arts; STEM; and Management'
  },
  {
    id: 144,
    gender: 'Female',
    loanAmount: 500000,
    loanType: 'Secured',
    country: 'Canada',
    university: 'University of Sherbrooke',
    course: 'Art; Design; Economics & Econometrics; Law; Performing Arts; STEM; and Management'
  },
  {
    id: 145,
    gender: 'Male',
    loanAmount: 500000,
    loanType: 'Secured',
    country: 'Chile',
    university: 'Pontificia Universidad Catolica de Chile',
    course: 'Art; Design; Economics & Econometrics; Law; Performing Arts; STEM; and Management'
  },
  {
    id: 146,
    gender: 'Female',
    loanAmount: 500000,
    loanType: 'Secured',
    country: 'Costa Rica',
    university: 'Universidad de Costa Rica',
    course: 'Art; Design; Economics & Econometrics; Law; Medical Courses; Performing Arts; STEM; and Management'
  },
  {
    id: 147,
    gender: 'Male',
    loanAmount: 500000,
    loanType: 'Secured',
    country: 'Chile',
    university: 'Universidad Catolica de la Santisima Concepcion',
    course: 'Art; Design; Economics & Econometrics; Law; Management; Medical; Performing Arts; STEM; and Public Affairs.'
  },
  {
    id: 148,
    gender: 'Female',
    loanAmount: 500000,
    loanType: 'Secured',
    country: 'Chile',
    university: 'Universidad de Santiago de Chile - USACH',
    course: 'Art; Design; Economics & Econometrics; Law; Performing Arts; STEM; and Management'
  },
  {
    id: 149,
    gender: 'Male',
    loanAmount: 500000,
    loanType: 'Secured',
    country: 'Costa Rica',
    university: 'Universidad Nacional Costa Rica',
    course: 'Art; Design; Economics & Econometrics; Law; Medical and Management; Performing Arts; STEM'
  },
  {
    id: 150,
    gender: 'Female',
    loanAmount: 500000,
    loanType: 'Secured',
    country: 'Canada',
    university: 'University of Victoria British Columbia',
    course: 'Art; Design; Economics & Econometrics; Law; Medical; Performing Arts; STEM; and Management'
  },
  {
    id: 151,
    gender: 'Male',
    loanAmount: 500000,
    loanType: 'Secured',
    country: 'Colombia',
    university: 'Universidad del Norte Barranquilla',
    course: 'Art; Design; Economics & Econometrics; Law; Performing Arts; STEM; and Management'
  },
  {
    id: 152,
    gender: 'Female',
    loanAmount: 500000,
    loanType: 'Secured',
    country: 'Croatia',
    university: 'University of Zadar',
    course: 'Art; Econamics & Econometrics; Law; Management; Medical; Performing Arts and Design Courses'
  },
  {
    id: 153,
    gender: 'Male',
    loanAmount: 500000,
    loanType: 'Secured',
    country: 'China',
    university: 'Zhejiang University of Science & Technology',
    course: 'Art; Econamics & Econometrics; Law; Management; Medical; Performing Arts and Design Courses'
  },
  {
    id: 154,
    gender: 'Female',
    loanAmount: 500000,
    loanType: 'Secured',
    country: 'Costa Rica',
    university: 'Universidad Nacional Costa Rica',
    course: 'Art; Design; Economics & Econometrics; Law; Medical and Management; Performing Arts; STEM'
  },
  {
    id: 155,
    gender: 'Male',
    loanAmount: 500000,
    loanType: 'Secured',
    country: 'China',
    university: 'Harbin Normal University',
    course: 'Art; Design; Economics & Econometrics; Law; Medical and Management; Performing Arts; STEM'
  },
  {
    id: 156,
    gender: 'Female',
    loanAmount: 500001,
    loanType: 'Secured',
    country: 'Chile',
    university: 'Universidad Catolica de la Santisima Concepcion',
    course: 'Art; Design; Economics & Econometrics; Law; Management; Performing Arts; STEM and Medical Courses'
  },
  {
    id: 157,
    gender: 'Male',
    loanAmount: 500001,
    loanType: 'Secured',
    country: 'Croatia',
    university: 'University of Rijeka',
    course: 'Art; Econamics & Econometrics; Law; Management; Medical; Performing Arts and Design Courses'
  },
  {
    id: 158,
    gender: 'Female',
    loanAmount: 500001,
    loanType: 'Secured',
    country: 'China',
    university: 'Qingdao University',
    course: 'Art; Design; Economics & Econometrics; Law; Performing Arts; STEM; and Management'
  },
  {
    id: 159,
    gender: 'Male',
    loanAmount: 500001,
    loanType: 'Secured',
    country: 'Costa Rica',
    university: 'Universidad de Costa Rica',
    course: 'Art; Econamics & Econometrics; Law; Management; Medical; Performing Arts and Design Courses; STEM'
  },
  {
    id: 160,
    gender: 'Female',
    loanAmount: 500001,
    loanType: 'Secured',
    country: 'Colombia',
    university: 'Universidad del Rosario',
    course: 'Art; Design; Economics & Econometrics; Law; Medical and Management; Performing Arts; STEM'
  },
  {
    id: 161,
    gender: 'Male',
    loanAmount: 500001,
    loanType: 'Secured',
    country: 'Costa Rica',
    university: 'Universidad de Costa Rica',
    course: 'Art; Design; Economics & Econometrics; Law; Medical and Management.; Performing Arts; STEM'
  },
  {
    id: 162,
    gender: 'Female',
    loanAmount: 500001,
    loanType: 'Secured',
    country: 'Croatia',
    university: 'University of Rijeka',
    course: 'Art; Design; Economics & Econometrics; Law; Medical and Management; Performing Arts; STEM'
  },
  {
    id: 163,
    gender: 'Male',
    loanAmount: 500001,
    loanType: 'Secured',
    country: 'Costa Rica',
    university: 'Universidad de Costa Rica',
    course: 'Art; Econamics & Econometrics; Law; Management; Medical; Performing Arts and Design Courses; STEM'
  },
  {
    id: 164,
    gender: 'Female',
    loanAmount: 500001,
    loanType: 'Secured',
    country: 'Cuba',
    university: 'Universidad de la Habana',
    course: 'Art; Design; Economics & Econometrics; Law; Medical and Management; Performing Arts; STEM'
  },
  {
    id: 165,
    gender: 'Male',
    loanAmount: 500001,
    loanType: 'Secured',
    country: 'Colombia',
    university: 'Universidad ICESI',
    course: 'Art; Design; Economics & Econometrics; Law; Medical; Performing Arts; STEM; and Management'
  },
  {
    id: 166,
    gender: 'Female',
    loanAmount: 500001,
    loanType: 'Secured',
    country: 'Costa Rica',
    university: 'Universidad de Costa Rica',
    course: 'Art; Design; Economics & Econometrics; Law; Performing Arts; STEM; and Management'
  },
  {
    id: 167,
    gender: 'Male',
    loanAmount: 500001,
    loanType: 'Secured',
    country: 'Colombia',
    university: 'Universidad Tecnologica de Pereira',
    course: 'Art; Design; Economics & Econometrics; Law; Performing Arts; STEM; and Management'
  },
  {
    id: 168,
    gender: 'Female',
    loanAmount: 500001,
    loanType: 'Secured',
    country: 'Cyprus',
    university: 'University of Cyprus',
    course: 'Art; Design; Economics & Econometrics; Law; Medical and Management; Performing Arts; STEM'
  },
  {
    id: 169,
    gender: 'Male',
    loanAmount: 500001,
    loanType: 'Secured',
    country: 'Cuba',
    university: 'Universidad de la Habana',
    course: 'Art; Econamics & Econometrics; Law; Management; Performing Arts and Design Courses'
  },
  {
    id: 170,
    gender: 'Female',
    loanAmount: 500001,
    loanType: 'Secured',
    country: 'Cyprus',
    university: 'Cyprus University of Technology',
    course: 'Art; Econamics & Econometrics; Law; Management; Medical; Performing Arts and Design Courses'
  },
  {
    id: 171,
    gender: 'Male',
    loanAmount: 625000,
    loanType: 'Secured',
    country: 'Cyprus',
    university: 'University of Cyprus',
    course: 'Art; Design; Economics & Econometrics; Law; Medical and Management; Performing Arts; STEM'
  },
  {
    id: 172,
    gender: 'Female',
    loanAmount: 625000,
    loanType: 'Secured',
    country: 'Cuba',
    university: 'Universidad de la Habana',
    course: 'Art; Design; Economics & Econometrics; Law; Medical and Management; Performing Arts; STEM'
  },
  {
    id: 173,
    gender: 'Male',
    loanAmount: 625000,
    loanType: 'Secured',
    country: 'Cyprus',
    university: 'European University Cyprus',
    course: 'Art; Econamics & Econometrics; Law; Management; Performing Arts and Design Courses'
  },
  {
    id: 174,
    gender: 'Female',
    loanAmount: 625000,
    loanType: 'Secured',
    country: 'Cuba',
    university: 'Universidad de la Habana',
    course: 'Art; Design; Economics & Econometrics; Law; Performing Arts; STEM; and Management'
  },
  {
    id: 175,
    gender: 'Male',
    loanAmount: 625000,
    loanType: 'Secured',
    country: 'Cuba',
    university: 'Universidad de la Habana',
    course: 'Art; Econamics & Econometrics; Law; Management; Performing Arts and Design Courses; STEM'
  },
  {
    id: 176,
    gender: 'Female',
    loanAmount: 625000,
    loanType: 'Secured',
    country: 'Colombia',
    university: 'Universidad Externado de Colombia',
    course: 'Art; Design; Economics & Econometrics; Law; Medical and Management; Performing Arts; STEM'
  },
  {
    id: 177,
    gender: 'Male',
    loanAmount: 625000,
    loanType: 'Secured',
    country: 'Croatia',
    university: 'Josip Juraj Strossmayer University of Osijek',
    course: 'Art; Design; Economics & Econometrics; Law; Medical and Management; Performing Arts; STEM'
  },
  {
    id: 178,
    gender: 'Female',
    loanAmount: 625000,
    loanType: 'Secured',
    country: 'Croatia',
    university: 'University of Zagreb',
    course: 'Art; Econamics & Econometrics; Law; Management; Performing Arts and Design Courses; STEM'
  },
  {
    id: 179,
    gender: 'Male',
    loanAmount: 625000,
    loanType: 'Secured',
    country: 'Cuba',
    university: 'Universidad de la Habana',
    course: 'Art; Econamics & Econometrics; Law; Management; Medical; Performing Arts and Design Courses; STEM'
  },
  {
    id: 180,
    gender: 'Female',
    loanAmount: 625000,
    loanType: 'Secured',
    country: 'Czechia',
    university: 'Czech University of Life Sciences Prague',
    course: 'Art; Econamics & Econometrics; Law; Management; Performing Arts and Design Courses; STEM'
  },
  {
    id: 181,
    gender: 'Male',
    loanAmount: 625000,
    loanType: 'Secured',
    country: 'Cuba',
    university: 'Universidad de la Habana',
    course: 'Art; Economics & Econometrics; Law; Management; Medical and Management; Performing Arts; STEM'
  },
  {
    id: 182,
    gender: 'Female',
    loanAmount: 625000,
    loanType: 'Secured',
    country: 'Cyprus',
    university: 'University of Nicosia',
    course: 'Art; Economics & Econometrics; Law; Management; Medical and Management; Performing Arts; STEM'
  },
  {
    id: 183,
    gender: 'Male',
    loanAmount: 625000,
    loanType: 'Secured',
    country: 'Czechia',
    university: 'University of Ostrava',
    course: 'Art; Econamics & Econometrics; Law; Management; Performing Arts and Design Courses; STEM'
  },
  {
    id: 184,
    gender: 'Female',
    loanAmount: 625000,
    loanType: 'Secured',
    country: 'Costa Rica',
    university: 'Universidad de Costa Rica',
    course: 'Art; Econamics & Econometrics; Law; Management; Medical; Performing Arts and Design Courses; STEM'
  },
  {
    id: 185,
    gender: 'Male',
    loanAmount: 750000,
    loanType: 'Secured',
    country: 'Cuba',
    university: 'Universidad de la Habana',
    course: 'Art; Econamics & Econometrics; Law; Management; Medical; Performing Arts and Design Courses'
  },
  {
    id: 186,
    gender: 'Female',
    loanAmount: 750000,
    loanType: 'Secured',
    country: 'Cuba',
    university: 'Universidad de la Habana',
    course: 'Art; Design; Economics & Econometrics; Law; Performing Arts; STEM; and Management'
  },
  {
    id: 187,
    gender: 'Male',
    loanAmount: 750000,
    loanType: 'Secured',
    country: 'Denmark',
    university: 'Aarhus University',
    course: 'Art; Econamics & Econometrics; Law; Management; Medical; Performing Arts and Design Courses'
  },
  {
    id: 188,
    gender: 'Female',
    loanAmount: 750000,
    loanType: 'Secured',
    country: 'Denmark',
    university: 'Roskilde University',
    course: 'Art; Econamics & Econometrics; Law; Management; Medical; Performing Arts and Design Courses'
  },
  {
    id: 189,
    gender: 'Male',
    loanAmount: 750000,
    loanType: 'Secured',
    country: 'Denmark',
    university: 'University of Copenhagen',
    course: 'Art; Econamics & Econometrics; Law; Management; Performing Arts and Design Courses'
  },
  {
    id: 190,
    gender: 'Female',
    loanAmount: 750000,
    loanType: 'Secured',
    country: 'Croatia',
    university: 'Josip Juraj Strossmayer University of Osijek',
    course: 'Art; Economics & Econometrics; Law; Management; Medical and Management; Performing Arts; STEM'
  },
  {
    id: 191,
    gender: 'Male',
    loanAmount: 750000,
    loanType: 'Secured',
    country: 'Cyprus',
    university: 'European University Cyprus',
    course: 'Art; Design; Economics & Econometrics; Law; Performing Arts; STEM; and Management'
  },
  {
    id: 192,
    gender: 'Female',
    loanAmount: 750000,
    loanType: 'Secured',
    country: 'Denmark',
    university: 'Aarhus University',
    course: 'Art; Econamics & Econometrics; Law; Management; Medical; Performing Arts and Design Courses'
  },
  {
    id: 193,
    gender: 'Male',
    loanAmount: 750000,
    loanType: 'Secured',
    country: 'Denmark',
    university: 'Aarhus University',
    course: 'Art; Economics & Econometrics; Law; Management; Medical and Management; Performing Arts; STEM'
  },
  {
    id: 194,
    gender: 'Female',
    loanAmount: 750000,
    loanType: 'Secured',
    country: 'Ecuador',
    university: 'Universidad San Francisco de Quito',
    course: 'Art; Economics & Econometrics; Law; Performing Arts; STEM; and Management'
  },
  {
    id: 195,
    gender: 'Male',
    loanAmount: 750000,
    loanType: 'Secured',
    country: 'Denmark',
    university: 'Aarhus University',
    course: 'Art; Economics & Econometrics; Law; Performing Arts; STEM; and Management'
  },
  {
    id: 196,
    gender: 'Female',
    loanAmount: 750000,
    loanType: 'Secured',
    country: 'Denmark',
    university: 'Technical University of Denmark',
    course: 'Art; Econamics & Econometrics; Law; Management; Performing Arts and Design Courses'
  },
  {
    id: 197,
    gender: 'Male',
    loanAmount: 750000,
    loanType: 'Secured',
    country: 'Cyprus',
    university: 'Cyprus University of Technology',
    course: 'Art; Econamics & Econometrics; Law; Management; Performing Arts and Design Courses'
  },
  {
    id: 198,
    gender: 'Female',
    loanAmount: 750000,
    loanType: 'Secured',
    country: 'Cuba',
    university: 'Universidad de la Habana',
    course: 'Art; Economics & Econometrics; Law; Performing Arts; STEM; and Management'
  },
  {
    id: 199,
    gender: 'Male',
    loanAmount: 750001,
    loanType: 'Secured',
    country: 'Cyprus',
    university: 'University of Cyprus',
    course: 'Art; Econamics & Econometrics; Law; Management; Performing Arts and Design Courses'
  },
  {
    id: 200,
    gender: 'Female',
    loanAmount: 750001,
    loanType: 'Secured',
    country: 'Czechia',
    university: 'University of Ostrava',
    course: 'Art; Economics & Econometrics; Law; Management; Medical and Management; Performing Arts; STEM'
  },
  {
    id: 201,
    gender: 'Male',
    loanAmount: 750001,
    loanType: 'Secured',
    country: 'Cyprus',
    university: 'University of Nicosia',
    course: 'Art; Economics & Econometrics; Law; Management; Medical and Management; Performing Arts; STEM'
  },
  {
    id: 202,
    gender: 'Female',
    loanAmount: 750001,
    loanType: 'Secured',
    country: 'Cuba',
    university: 'Universidad de la Habana',
    course: 'Art; Economics & Econometrics; Law; Performing Arts; STEM; and Management'
  },
  {
    id: 203,
    gender: 'Male',
    loanAmount: 750001,
    loanType: 'Secured',
    country: 'Czechia',
    university: 'Mendel University in Brno',
    course: 'Art; Economics & Econometrics; Law; Management; Medical and Management; Performing Arts; STEM'
  },
  {
    id: 204,
    gender: 'Female',
    loanAmount: 750001,
    loanType: 'Secured',
    country: 'Czechia',
    university: 'Czech Technical University in Prague',
    course: 'Art; Economics & Econometrics; Law; Performing Arts; STEM; and Management'
  },
  {
    id: 205,
    gender: 'Male',
    loanAmount: 750001,
    loanType: 'Secured',
    country: 'Czechia',
    university: 'Technical University of Liberec',
    course: 'Art; Econamics & Econometrics; Law; Management; Medical; Performing Arts and Design Courses; STEM'
  },
  {
    id: 206,
    gender: 'Female',
    loanAmount: 750001,
    loanType: 'Secured',
    country: 'Ecuador',
    university: 'Escuela Politecnica Nacional',
    course: 'Art; Economics & Econometrics; Law; Performing Arts; STEM; and Management'
  },
  {
    id: 207,
    gender: 'Male',
    loanAmount: 750001,
    loanType: 'Secured',
    country: 'Cyprus',
    university: 'University of Cyprus',
    course: 'Arts; Business & Management; Computer Science & IT; Design & Architecture; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 208,
    gender: 'Female',
    loanAmount: 750001,
    loanType: 'Secured',
    country: 'Egypt',
    university: 'American University in Cairo',
    course: 'Art; Econamics & Econometrics; Law; Management; Performing Arts and Design Courses'
  },
  {
    id: 209,
    gender: 'Male',
    loanAmount: 750001,
    loanType: 'Secured',
    country: 'Egypt',
    university: 'British University in Egypt',
    course: 'Art; Economics & Econometrics; Law; Performing Arts; STEM; and Management'
  },
  {
    id: 210,
    gender: 'Female',
    loanAmount: 750001,
    loanType: 'Secured',
    country: 'Egypt',
    university: 'Assiut University',
    course: 'Arts; Business & Management; Computer Science & IT; Design & Architecture; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 211,
    gender: 'Male',
    loanAmount: 750001,
    loanType: 'Secured',
    country: 'Cyprus',
    university: 'University of Cyprus',
    course: 'Art; Econamics & Econometrics; Law; Management; Performing Arts and Design Courses'
  },
  {
    id: 212,
    gender: 'Female',
    loanAmount: 750001,
    loanType: 'Secured',
    country: 'Egypt',
    university: 'The American University in Cairo',
    course: 'Art; Economics & Econometrics; Law; Management; Medical and Management; Performing Arts; STEM'
  },
  {
    id: 213,
    gender: 'Male',
    loanAmount: 875000,
    loanType: 'Secured',
    country: 'Ecuador',
    university: 'Universidad San Francisco de Quito',
    course: 'Business & Management'
  },
  {
    id: 214,
    gender: 'Female',
    loanAmount: 875000,
    loanType: 'Secured',
    country: 'Egypt',
    university: 'Kafr El Sheikh University',
    course: 'Arts; Business & Management; Computer Science & IT; Design & Architecture; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 215,
    gender: 'Male',
    loanAmount: 875000,
    loanType: 'Secured',
    country: 'Ecuador',
    university: 'Universidad de las Americas Ecuador',
    course: 'Arts; Business & Management; Communications & Journalism; Computer Science & IT; Design & Architecture; Education; Engineering & Technology; Medicine & Health; Natural Sciences; Public Policy'
  },
  {
    id: 216,
    gender: 'Female',
    loanAmount: 875000,
    loanType: 'Secured',
    country: 'Denmark',
    university: 'University of Southern Denmark',
    course: 'Arts; Business & Management; Communications & Journalism; Computer Science & IT; Design & Architecture; Education; Engineering & Technology; Medicine & Health; Natural Sciences; Public Policy'
  },
  {
    id: 217,
    gender: 'Male',
    loanAmount: 875000,
    loanType: 'Secured',
    country: 'Egypt',
    university: 'Future University in Egypt',
    course: 'Arts; Business & Management; Communications & Journalism; Computer Science & IT; Design & Architecture; Education; Engineering & Technology; Medicine & Health; Natural Sciences; Public Policy'
  },
  {
    id: 218,
    gender: 'Female',
    loanAmount: 875000,
    loanType: 'Secured',
    country: 'Egypt',
    university: 'Zagazig University',
    course: 'Art; Economics & Econometrics; Law; Performing Arts; STEM; and Management'
  },
  {
    id: 219,
    gender: 'Male',
    loanAmount: 875000,
    loanType: 'Secured',
    country: 'Ecuador',
    university: 'Universidad Politecnica Salesiana Ecuador',
    course: 'Art; Economics & Econometrics; Law; Management; Medical and Management; Performing Arts; STEM'
  },
  {
    id: 220,
    gender: 'Female',
    loanAmount: 875000,
    loanType: 'Secured',
    country: 'Egypt',
    university: 'The American University in Cairo',
    course: 'Art; Economics & Econometrics; Law; Management; Medical and Management; Performing Arts; STEM'
  },
  {
    id: 221,
    gender: 'Male',
    loanAmount: 875000,
    loanType: 'Secured',
    country: 'Egypt',
    university: 'Arab Academy for Science & Technology and Maritime Transport',
    course: 'Arts; Business & Management; Computer Science & IT; Design & Architecture; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 222,
    gender: 'Female',
    loanAmount: 875000,
    loanType: 'Secured',
    country: 'Denmark',
    university: 'University of Copenhagen',
    course: 'Art; Economics & Econometrics; Law; Performing Arts; STEM; and Management'
  },
  {
    id: 223,
    gender: 'Male',
    loanAmount: 875000,
    loanType: 'Secured',
    country: 'Ethiopia',
    university: 'Addis Ababa University',
    course: 'Business & Management; Computer Science & IT'
  },
  {
    id: 224,
    gender: 'Female',
    loanAmount: 875000,
    loanType: 'Secured',
    country: 'Egypt',
    university: 'Menoufia University',
    course: 'Art; Economics & Econometrics; Law; Performing Arts; STEM; and Management'
  },
  {
    id: 225,
    gender: 'Male',
    loanAmount: 875000,
    loanType: 'Secured',
    country: 'Ethiopia',
    university: 'Addis Ababa University',
    course: 'Business & Management'
  },
  {
    id: 226,
    gender: 'Female',
    loanAmount: 875000,
    loanType: 'Secured',
    country: 'Ethiopia',
    university: 'Bahir Dar University',
    course: 'Art; Economics & Econometrics; Law; Management; Medical and Management; Performing Arts; STEM'
  },
  {
    id: 227,
    gender: 'Male',
    loanAmount: 999000,
    loanType: 'Secured',
    country: 'Ecuador',
    university: 'Pontificia Universidad Catolica del Ecuador',
    course: 'Business & Management; Computer Science & IT'
  },
  {
    id: 228,
    gender: 'Female',
    loanAmount: 999000,
    loanType: 'Secured',
    country: 'Ecuador',
    university: 'Pontificia Universidad Catolica del Ecuador',
    course: 'Business & Management; Computer Science & IT; Education; Engineering & Technology; Public Policy'
  },
  {
    id: 229,
    gender: 'Male',
    loanAmount: 999000,
    loanType: 'Secured',
    country: 'Ethiopia',
    university: 'Addis Ababa University',
    course: 'Business & Management; Computer Science & IT; Education; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 230,
    gender: 'Female',
    loanAmount: 999000,
    loanType: 'Secured',
    country: 'Ethiopia',
    university: 'Bahir Dar University',
    course: 'Arts; Business & Management; Communications & Journalism; Computer Science & IT; Design & Architecture; Education; Engineering & Technology; Medicine & Health; Natural Sciences; Public Policy'
  },
  {
    id: 231,
    gender: 'Male',
    loanAmount: 999000,
    loanType: 'Secured',
    country: 'Fiji',
    university: 'University of the South Pacific',
    course: 'Business & Management; Computer Science & IT; Education; Engineering & Technology; Public Policy'
  },
  {
    id: 232,
    gender: 'Female',
    loanAmount: 999000,
    loanType: 'Secured',
    country: 'Ecuador',
    university: 'Universidad de Cuenca',
    course: 'Business & Management; Computer Science & IT; Education; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 233,
    gender: 'Male',
    loanAmount: 999000,
    loanType: 'Secured',
    country: 'Fiji',
    university: 'University of the South Pacific',
    course: 'Arts; Business & Management; Communications & Journalism; Computer Science & IT; Design & Architecture; Education; Engineering & Technology; Medicine & Health; Natural Sciences; Public Policy'
  },
  {
    id: 234,
    gender: 'Female',
    loanAmount: 999000,
    loanType: 'Secured',
    country: 'Egypt',
    university: 'Mansoura University',
    course: 'Arts; Business & Management; Computer Science & IT; Design & Architecture; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 235,
    gender: 'Male',
    loanAmount: 999000,
    loanType: 'Secured',
    country: 'Ethiopia',
    university: 'Addis Ababa University',
    course: 'Business & Management; Computer Science & IT; Education; Engineering & Technology; Public Policy'
  },
  {
    id: 236,
    gender: 'Female',
    loanAmount: 999000,
    loanType: 'Secured',
    country: 'Fiji',
    university: 'University of the South Pacific',
    course: 'Business & Management; Computer Science & IT'
  },
  {
    id: 237,
    gender: 'Male',
    loanAmount: 999000,
    loanType: 'Secured',
    country: 'Ethiopia',
    university: 'University of Gondar',
    course: 'Business & Management; Computer Science & IT; Education; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 238,
    gender: 'Female',
    loanAmount: 999000,
    loanType: 'Secured',
    country: 'Egypt',
    university: 'Arab Academy for Science & Technology and Maritime Transport',
    course: 'Arts; Business & Management; Computer Science & IT; Design & Architecture; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 239,
    gender: 'Male',
    loanAmount: 999000,
    loanType: 'Secured',
    country: 'Finland',
    university: 'Lappeenranta-Lahti University of Technology LUT',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology'
  },
  {
    id: 240,
    gender: 'Female',
    loanAmount: 999000,
    loanType: 'Secured',
    country: 'Estonia',
    university: 'University of Tartu',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology'
  },
  {
    id: 241,
    gender: 'Male',
    loanAmount: 1000000,
    loanType: 'Secured',
    country: 'Fiji',
    university: 'University of the South Pacific',
    course: 'Business & Management'
  },
  {
    id: 242,
    gender: 'Female',
    loanAmount: 1000000,
    loanType: 'Secured',
    country: 'Estonia',
    university: 'Tallinn University',
    course: 'Business & Management; Computer Science & IT; Education; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 243,
    gender: 'Male',
    loanAmount: 1000000,
    loanType: 'Secured',
    country: 'Fiji',
    university: 'University of the South Pacific',
    course: 'Arts; Business & Management; Computer Science & IT; Design & Architecture; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 244,
    gender: 'Female',
    loanAmount: 1000000,
    loanType: 'Secured',
    country: 'Ethiopia',
    university: 'Addis Ababa University',
    course: 'Business & Management; Computer Science & IT; Education; Engineering & Technology; Public Policy'
  },
  {
    id: 245,
    gender: 'Male',
    loanAmount: 1000000,
    loanType: 'Secured',
    country: 'Estonia',
    university: 'Tallinn University of Technology',
    course: 'Business & Management; Computer Science & IT; Education; Engineering & Technology; Public Policy'
  },
  {
    id: 246,
    gender: 'Female',
    loanAmount: 1000000,
    loanType: 'Secured',
    country: 'Egypt',
    university: 'Ain Shams University',
    course: 'Business & Management; Computer Science & IT; Education; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 247,
    gender: 'Male',
    loanAmount: 1000000,
    loanType: 'Secured',
    country: 'Fiji',
    university: 'University of the South Pacific',
    course: 'Business & Management; Computer Science & IT; Education; Engineering & Technology; Public Policy'
  },
  {
    id: 248,
    gender: 'Female',
    loanAmount: 1000000,
    loanType: 'Secured',
    country: 'Finland',
    university: 'Jyvaskyla University',
    course: 'Business & Management; Computer Science & IT; Education; Engineering & Technology; Public Policy'
  },
  {
    id: 249,
    gender: 'Male',
    loanAmount: 1000000,
    loanType: 'Secured',
    country: 'Ethiopia',
    university: 'Jimma University',
    course: 'Business & Management; Computer Science & IT; Education; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 250,
    gender: 'Female',
    loanAmount: 1000000,
    loanType: 'Secured',
    country: 'Ethiopia',
    university: 'Addis Ababa University',
    course: 'Business & Management; Computer Science & IT'
  },
  {
    id: 251,
    gender: 'Male',
    loanAmount: 1000000,
    loanType: 'Secured',
    country: 'Fiji',
    university: 'University of the South Pacific',
    course: 'Business & Management; Computer Science & IT'
  },
  {
    id: 252,
    gender: 'Female',
    loanAmount: 1000000,
    loanType: 'Secured',
    country: 'Estonia',
    university: 'Tallinn University of Technology',
    course: 'Business & Management'
  },
  {
    id: 253,
    gender: 'Male',
    loanAmount: 1000000,
    loanType: 'Secured',
    country: 'Finland',
    university: 'University of Lapland',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Humanities'
  },
  {
    id: 254,
    gender: 'Female',
    loanAmount: 1000000,
    loanType: 'Secured',
    country: 'France',
    university: 'Ecole Normale Superieure de Lyon',
    course: 'Business & Management'
  },
  {
    id: 255,
    gender: 'Male',
    loanAmount: 1000001,
    loanType: 'Secured',
    country: 'Fiji',
    university: 'University of the South Pacific',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Humanities'
  },
  {
    id: 256,
    gender: 'Female',
    loanAmount: 1000001,
    loanType: 'Secured',
    country: 'France',
    university: 'Toulouse School of Economics',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Hospitality & Leisure; Law; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 257,
    gender: 'Male',
    loanAmount: 1000001,
    loanType: 'Secured',
    country: 'Ethiopia',
    university: 'Addis Ababa University',
    course: 'Business & Management; Computer Science & IT; Education; Engineering & Technology; Public Policy'
  },
  {
    id: 258,
    gender: 'Female',
    loanAmount: 1000001,
    loanType: 'Secured',
    country: 'Ethiopia',
    university: 'Bahir Dar University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Hospitality & Leisure; Law; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 259,
    gender: 'Male',
    loanAmount: 1000001,
    loanType: 'Secured',
    country: 'France',
    university: 'Institut National des Sciences Appliquees de Lyon',
    course: 'Business & Management; Computer Science & IT'
  },
  {
    id: 260,
    gender: 'Female',
    loanAmount: 1000001,
    loanType: 'Secured',
    country: 'Fiji',
    university: 'University of the South Pacific',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Humanities'
  },
  {
    id: 261,
    gender: 'Male',
    loanAmount: 1000001,
    loanType: 'Secured',
    country: 'Fiji',
    university: 'University of the South Pacific',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Humanities; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 262,
    gender: 'Female',
    loanAmount: 1000001,
    loanType: 'Secured',
    country: 'Finland',
    university: 'University of Helsinki',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Humanities; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 263,
    gender: 'Male',
    loanAmount: 1000001,
    loanType: 'Secured',
    country: 'Georgia',
    university: 'Ivane Javakhishvili Tbilisi State University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Humanities; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 264,
    gender: 'Female',
    loanAmount: 1000001,
    loanType: 'Secured',
    country: 'France',
    university: 'Institut de Physique du Globe de Paris IPGP (Alliance Sorbonne Paris Cite)',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Hospitality & Leisure; Law; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 265,
    gender: 'Male',
    loanAmount: 1000001,
    loanType: 'Secured',
    country: 'Fiji',
    university: 'University of the South Pacific',
    course: 'Business & Management; Computer Science & IT; Education; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 266,
    gender: 'Female',
    loanAmount: 1000001,
    loanType: 'Secured',
    country: 'Georgia',
    university: 'Ilia State University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law'
  },
  {
    id: 267,
    gender: 'Male',
    loanAmount: 1000001,
    loanType: 'Secured',
    country: 'Georgia',
    university: 'Ivane Javakhishvili Tbilisi State University',
    course: 'Business & Management; Computer Science & IT; Education; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 268,
    gender: 'Female',
    loanAmount: 1000001,
    loanType: 'Secured',
    country: 'France',
    university: 'University of Paris X',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Humanities'
  },
  {
    id: 269,
    gender: 'Male',
    loanAmount: 1001000,
    loanType: 'Secured',
    country: 'France',
    university: 'Montpellier Business School (MBS)',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Hospitality & Leisure; Law; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 270,
    gender: 'Female',
    loanAmount: 1001000,
    loanType: 'Secured',
    country: 'Germany',
    university: 'Martin Luther Universitat Halle Wittenberg',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Humanities; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 271,
    gender: 'Male',
    loanAmount: 1001000,
    loanType: 'Secured',
    country: 'Germany',
    university: 'Universitat Dusseldorf',
    course: 'Business & Management; Computer Science & IT; Education; Engineering & Technology; Public Policy'
  },
  {
    id: 272,
    gender: 'Female',
    loanAmount: 1001000,
    loanType: 'Secured',
    country: 'Finland',
    university: 'Hanken School of Economics',
    course: 'Business & Management; Computer Science & IT; Education; Engineering & Technology; Public Policy'
  },
  {
    id: 273,
    gender: 'Male',
    loanAmount: 1001000,
    loanType: 'Secured',
    country: 'France',
    university: 'Institut polytechnique de Grenoble - Grenoble Institute of Technology',
    course: 'Business & Management; Computer Science & IT; Education; Engineering & Technology; Public Policy'
  },
  {
    id: 274,
    gender: 'Female',
    loanAmount: 1001000,
    loanType: 'Secured',
    country: 'Ghana',
    university: 'University of Ghana',
    course: 'Business & Management; Computer Science & IT; Education; Engineering & Technology; Public Policy'
  },
  {
    id: 275,
    gender: 'Male',
    loanAmount: 1001000,
    loanType: 'Secured',
    country: 'Ghana',
    university: 'University of Cape Coast',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law'
  },
  {
    id: 276,
    gender: 'Female',
    loanAmount: 1001000,
    loanType: 'Secured',
    country: 'Georgia',
    university: 'Ivane Javakhishvili Tbilisi State University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Humanities'
  },
  {
    id: 277,
    gender: 'Male',
    loanAmount: 1001000,
    loanType: 'Secured',
    country: 'Georgia',
    university: 'Ivane Javakhishvili Tbilisi State University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Humanities; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 278,
    gender: 'Female',
    loanAmount: 1001000,
    loanType: 'Secured',
    country: 'Georgia',
    university: 'Ivane Javakhishvili Tbilisi State University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Hospitality & Leisure; Law; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 279,
    gender: 'Male',
    loanAmount: 1001000,
    loanType: 'Secured',
    country: 'Georgia',
    university: 'Ilia State University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law; Medicine & Health; Natural Sciences'
  },
  {
    id: 280,
    gender: 'Female',
    loanAmount: 1001000,
    loanType: 'Secured',
    country: 'Finland',
    university: 'Lappeenranta University of Technology',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Humanities'
  },
  {
    id: 281,
    gender: 'Male',
    loanAmount: 1001000,
    loanType: 'Secured',
    country: 'Germany',
    university: 'Ernst Moritz Arndt Universitat Greifswald',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Humanities; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 282,
    gender: 'Female',
    loanAmount: 1001000,
    loanType: 'Secured',
    country: 'Germany',
    university: 'Universitat Osnabruck',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Humanities'
  },
  {
    id: 283,
    gender: 'Male',
    loanAmount: 1200000,
    loanType: 'Secured',
    country: 'Ghana',
    university: 'University of Cape Coast',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law; Medicine & Health; Natural Sciences; Public Policy; Social Sciences'
  },
  {
    id: 284,
    gender: 'Female',
    loanAmount: 1200000,
    loanType: 'Secured',
    country: 'Georgia',
    university: 'Ilia State University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Humanities; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 285,
    gender: 'Male',
    loanAmount: 1200000,
    loanType: 'Secured',
    country: 'Ghana',
    university: 'University of Cape Coast',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law; Medicine & Health; Natural Sciences; Public Policy; Social Sciences'
  },
  {
    id: 286,
    gender: 'Female',
    loanAmount: 1200000,
    loanType: 'Secured',
    country: 'Germany',
    university: 'Universitat Rostock',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Hospitality & Leisure; Law; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 287,
    gender: 'Male',
    loanAmount: 1200000,
    loanType: 'Secured',
    country: 'France',
    university: 'Montpellier Business School (MBS)',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Humanities'
  },
  {
    id: 288,
    gender: 'Female',
    loanAmount: 1200000,
    loanType: 'Secured',
    country: 'Germany',
    university: 'University of Munster',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law; Medicine & Health; Natural Sciences; Public Policy; Social Sciences'
  },
  {
    id: 289,
    gender: 'Male',
    loanAmount: 1200000,
    loanType: 'Secured',
    country: 'Georgia',
    university: 'Georgian Technical University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Humanities'
  },
  {
    id: 290,
    gender: 'Female',
    loanAmount: 1200000,
    loanType: 'Secured',
    country: 'Ghana',
    university: 'Kwame Nkrumah University of Science & Technology',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Hospitality & Leisure; Law; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 291,
    gender: 'Male',
    loanAmount: 1200000,
    loanType: 'Secured',
    country: 'Grenada',
    university: 'Saint Georges University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Hospitality & Leisure; Law; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 292,
    gender: 'Female',
    loanAmount: 1200000,
    loanType: 'Secured',
    country: 'Georgia',
    university: 'Ivane Javakhishvili Tbilisi State University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Humanities; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 293,
    gender: 'Male',
    loanAmount: 1200000,
    loanType: 'Secured',
    country: 'Germany',
    university: 'Hochschule Furtwangen',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law; Natural Sciences; Public Policy; Social Sciences'
  },
  {
    id: 294,
    gender: 'Female',
    loanAmount: 1200000,
    loanType: 'Secured',
    country: 'Ghana',
    university: 'Kwame Nkrumah University of Science & Technology',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law; Medicine & Health; Natural Sciences; Public Policy; Social Sciences'
  },
  {
    id: 295,
    gender: 'Male',
    loanAmount: 1200000,
    loanType: 'Secured',
    country: 'Grenada',
    university: 'Saint Georges University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Humanities; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 296,
    gender: 'Female',
    loanAmount: 1200000,
    loanType: 'Secured',
    country: 'Grenada',
    university: 'Saint Georges University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Humanities; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 297,
    gender: 'Male',
    loanAmount: 1250000,
    loanType: 'Secured',
    country: 'Greece',
    university: 'Agricultural University of Athens',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law; Medicine & Health; Natural Sciences; Public Policy; Social Sciences'
  },
  {
    id: 298,
    gender: 'Female',
    loanAmount: 1250000,
    loanType: 'Secured',
    country: 'Greece',
    university: 'Athens University of Economics And Business',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Humanities'
  },
  {
    id: 299,
    gender: 'Male',
    loanAmount: 1250000,
    loanType: 'Secured',
    country: 'Ghana',
    university: 'Kwame Nkrumah University of Science & Technology',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Humanities; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 300,
    gender: 'Female',
    loanAmount: 1250000,
    loanType: 'Secured',
    country: 'Guatemala',
    university: 'Universidad de San Carlos de Guatemala',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law; Medicine & Health; Natural Sciences'
  },
  {
    id: 301,
    gender: 'Male',
    loanAmount: 1250000,
    loanType: 'Secured',
    country: 'Guatemala',
    university: 'Universidad de San Carlos de Guatemala',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law; Medicine & Health; Natural Sciences'
  },
  {
    id: 302,
    gender: 'Female',
    loanAmount: 1250000,
    loanType: 'Secured',
    country: 'Guatemala',
    university: 'Universidad de San Carlos de Guatemala',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law'
  },
  {
    id: 303,
    gender: 'Male',
    loanAmount: 1250000,
    loanType: 'Secured',
    country: 'Ghana',
    university: 'University of Cape Coast',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law; Medicine & Health; Natural Sciences'
  },
  {
    id: 304,
    gender: 'Female',
    loanAmount: 1250000,
    loanType: 'Secured',
    country: 'Guatemala',
    university: 'Universidad de San Carlos de Guatemala',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Humanities; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 305,
    gender: 'Male',
    loanAmount: 1250000,
    loanType: 'Secured',
    country: 'Greece',
    university: 'Agricultural University of Athens',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Humanities; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 306,
    gender: 'Female',
    loanAmount: 1250000,
    loanType: 'Secured',
    country: 'Ghana',
    university: 'University for Development Studies',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law; Natural Sciences; Social Sciences'
  },
  {
    id: 307,
    gender: 'Male',
    loanAmount: 1250000,
    loanType: 'Secured',
    country: 'Germany',
    university: 'University of Tubingen',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law'
  },
  {
    id: 308,
    gender: 'Female',
    loanAmount: 1250000,
    loanType: 'Secured',
    country: 'Guatemala',
    university: 'Universidad de San Carlos de Guatemala',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law; Medicine & Health; Natural Sciences'
  },
  {
    id: 309,
    gender: 'Male',
    loanAmount: 1250000,
    loanType: 'Secured',
    country: 'Hungary',
    university: 'Hungarian University of Agriculture and Life Sciences',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law; Medicine & Health; Natural Sciences'
  },
  {
    id: 310,
    gender: 'Female',
    loanAmount: 1250000,
    loanType: 'Secured',
    country: 'Grenada',
    university: 'Saint Georges University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law; Medicine & Health; Natural Sciences'
  },
  {
    id: 311,
    gender: 'Male',
    loanAmount: 1500000,
    loanType: 'Secured',
    country: 'Guatemala',
    university: 'Universidad de San Carlos de Guatemala',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health'
  },
  {
    id: 312,
    gender: 'Female',
    loanAmount: 1500000,
    loanType: 'Secured',
    country: 'Greece',
    university: 'Ionian University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law'
  },
  {
    id: 313,
    gender: 'Male',
    loanAmount: 1500000,
    loanType: 'Secured',
    country: 'Greece',
    university: 'Agricultural University of Athens',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law; Natural Sciences; Social Sciences'
  },
  {
    id: 314,
    gender: 'Female',
    loanAmount: 1500000,
    loanType: 'Secured',
    country: 'Ghana',
    university: 'University of Ghana',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences'
  },
  {
    id: 315,
    gender: 'Male',
    loanAmount: 1500000,
    loanType: 'Secured',
    country: 'Grenada',
    university: 'Saint Georges University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law; Medicine & Health; Natural Sciences'
  },
  {
    id: 316,
    gender: 'Female',
    loanAmount: 1500000,
    loanType: 'Secured',
    country: 'Guatemala',
    university: 'Universidad de San Carlos de Guatemala',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 317,
    gender: 'Male',
    loanAmount: 1500000,
    loanType: 'Secured',
    country: 'Greece',
    university: 'University of Peloponnese',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences'
  },
  {
    id: 318,
    gender: 'Female',
    loanAmount: 1500000,
    loanType: 'Secured',
    country: 'Hungary',
    university: 'University of Szeged',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences'
  },
  {
    id: 319,
    gender: 'Male',
    loanAmount: 1500000,
    loanType: 'Secured',
    country: 'Guatemala',
    university: 'Universidad de San Carlos de Guatemala',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law; Medicine & Health; Natural Sciences; Public Policy; Social Sciences'
  },
  {
    id: 320,
    gender: 'Female',
    loanAmount: 1500000,
    loanType: 'Secured',
    country: 'Guatemala',
    university: 'Universidad de San Carlos de Guatemala',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law; Medicine & Health; Natural Sciences'
  },
  {
    id: 321,
    gender: 'Male',
    loanAmount: 1500000,
    loanType: 'Secured',
    country: 'Hungary',
    university: 'Central European University Budapest',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 322,
    gender: 'Female',
    loanAmount: 1500000,
    loanType: 'Secured',
    country: 'Grenada',
    university: 'Saint Georges University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences'
  },
  {
    id: 323,
    gender: 'Male',
    loanAmount: 1500000,
    loanType: 'Secured',
    country: 'Greece',
    university: 'National and Kapodistrian University of Athens',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law; Medicine & Health; Natural Sciences; Public Policy; Social Sciences'
  },
  {
    id: 324,
    gender: 'Female',
    loanAmount: 1500000,
    loanType: 'Secured',
    country: 'Grenada',
    university: 'Saint Georges University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 325,
    gender: 'Male',
    loanAmount: 1750000,
    loanType: 'Secured',
    country: 'Grenada',
    university: 'Saint Georges University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law; Medicine & Health; Natural Sciences; Public Policy; Social Sciences'
  },
  {
    id: 326,
    gender: 'Female',
    loanAmount: 1750000,
    loanType: 'Secured',
    country: 'Hungary',
    university: 'University of Debrecen',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health'
  },
  {
    id: 327,
    gender: 'Male',
    loanAmount: 1750000,
    loanType: 'Secured',
    country: 'Indonesia',
    university: 'UNIVERSITAS INDONESIA',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law; Natural Sciences; Social Sciences'
  },
  {
    id: 328,
    gender: 'Female',
    loanAmount: 1750000,
    loanType: 'Secured',
    country: 'Hungary',
    university: 'Pazmany Peter Catholic University Budapest',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences'
  },
  {
    id: 329,
    gender: 'Male',
    loanAmount: 1750000,
    loanType: 'Secured',
    country: 'Iceland',
    university: 'University of Iceland',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 330,
    gender: 'Female',
    loanAmount: 1750000,
    loanType: 'Secured',
    country: 'Grenada',
    university: 'Saint Georges University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 331,
    gender: 'Male',
    loanAmount: 1750000,
    loanType: 'Secured',
    country: 'Guatemala',
    university: 'Universidad de San Carlos de Guatemala',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Law; Natural Sciences; Social Sciences'
  },
  {
    id: 332,
    gender: 'Female',
    loanAmount: 1750000,
    loanType: 'Secured',
    country: 'Guatemala',
    university: 'Universidad de San Carlos de Guatemala',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences'
  },
  {
    id: 333,
    gender: 'Male',
    loanAmount: 1750000,
    loanType: 'Secured',
    country: 'Hungary',
    university: 'Corvinus University of Budapest',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences; Public Policy; Social Sciences'
  },
  {
    id: 334,
    gender: 'Female',
    loanAmount: 1750000,
    loanType: 'Secured',
    country: 'Iceland',
    university: 'University of Iceland',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences; Public Policy'
  },
  {
    id: 335,
    gender: 'Male',
    loanAmount: 1750000,
    loanType: 'Secured',
    country: 'Indonesia',
    university: 'Bandung Institute of Technology (ITB)',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health'
  },
  {
    id: 336,
    gender: 'Female',
    loanAmount: 1750000,
    loanType: 'Secured',
    country: 'Hungary',
    university: 'Corvinus University of Budapest',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 337,
    gender: 'Male',
    loanAmount: 1750000,
    loanType: 'Secured',
    country: 'Iceland',
    university: 'Reykjavik University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health'
  },
  {
    id: 338,
    gender: 'Female',
    loanAmount: 1750000,
    loanType: 'Secured',
    country: 'Iran',
    university: 'University of Tehran',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences; Public Policy'
  },
  {
    id: 339,
    gender: 'Male',
    loanAmount: 1750000,
    loanType: 'Secured',
    country: 'Iceland',
    university: 'University of Iceland',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences; Public Policy; Social Sciences'
  },
  {
    id: 340,
    gender: 'Female',
    loanAmount: 1800000,
    loanType: 'Secured',
    country: 'Iceland',
    university: 'University of Iceland',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health'
  },
  {
    id: 341,
    gender: 'Male',
    loanAmount: 1800000,
    loanType: 'Secured',
    country: 'Indonesia',
    university: 'Universitas Kristen Satya Wacana',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health'
  },
  {
    id: 342,
    gender: 'Female',
    loanAmount: 1800000,
    loanType: 'Secured',
    country: 'Hungary',
    university: 'Obuda University (Budapest Polytechnic)',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences; Public Policy'
  },
  {
    id: 343,
    gender: 'Male',
    loanAmount: 1800000,
    loanType: 'Secured',
    country: 'Iran',
    university: 'Ahvaz Jundishapur University of Medical Sciences',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health'
  },
  {
    id: 344,
    gender: 'Female',
    loanAmount: 1800000,
    loanType: 'Secured',
    country: 'Iceland',
    university: 'Reykjavik University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences; Public Policy'
  },
  {
    id: 345,
    gender: 'Male',
    loanAmount: 1800000,
    loanType: 'Secured',
    country: 'Iceland',
    university: 'University of Iceland',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health'
  },
  {
    id: 346,
    gender: 'Female',
    loanAmount: 1800000,
    loanType: 'Secured',
    country: 'Iceland',
    university: 'University of Iceland',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences; Public Policy; Social Sciences'
  },
  {
    id: 347,
    gender: 'Male',
    loanAmount: 1800000,
    loanType: 'Secured',
    country: 'Iraq',
    university: 'Al Furat Al Awsat Technical University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences; Public Policy; Social Sciences'
  },
  {
    id: 348,
    gender: 'Female',
    loanAmount: 1800000,
    loanType: 'Secured',
    country: 'Indonesia',
    university: 'Universitas Pendidikan Indonesia',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health'
  },
  {
    id: 349,
    gender: 'Male',
    loanAmount: 1800000,
    loanType: 'Secured',
    country: 'Iran',
    university: 'Iran University of Medical Sciences',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Public Policy'
  },
  {
    id: 350,
    gender: 'Female',
    loanAmount: 1800000,
    loanType: 'Secured',
    country: 'Hungary',
    university: 'University of Debrecen',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences'
  },
  {
    id: 351,
    gender: 'Male',
    loanAmount: 1800000,
    loanType: 'Secured',
    country: 'Indonesia',
    university: 'Universitas Bina Nusantara',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences; Public Policy; Social Sciences'
  },
  {
    id: 352,
    gender: 'Female',
    loanAmount: 1800000,
    loanType: 'Secured',
    country: 'Ireland',
    university: 'Technological University of Dublin',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences; Public Policy'
  },
  {
    id: 353,
    gender: 'Male',
    loanAmount: 1800000,
    loanType: 'Secured',
    country: 'Ireland',
    university: 'Technological University of the Shannon',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences; Public Policy; Social Sciences'
  },
  {
    id: 354,
    gender: 'Female',
    loanAmount: 2000000,
    loanType: 'Secured',
    country: 'Iceland',
    university: 'Reykjavik University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences'
  },
  {
    id: 355,
    gender: 'Male',
    loanAmount: 2000000,
    loanType: 'Secured',
    country: 'Iceland',
    university: 'Reykjavik University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health'
  },
  {
    id: 356,
    gender: 'Female',
    loanAmount: 2000000,
    loanType: 'Secured',
    country: 'Iceland',
    university: 'University of Iceland',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences; Public Policy'
  },
  {
    id: 357,
    gender: 'Male',
    loanAmount: 2000000,
    loanType: 'Secured',
    country: 'Iraq',
    university: 'Kufa University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 358,
    gender: 'Female',
    loanAmount: 2000000,
    loanType: 'Secured',
    country: 'Ireland',
    university: 'Technological University of the Shannon',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Social Sciences'
  },
  {
    id: 359,
    gender: 'Male',
    loanAmount: 2000000,
    loanType: 'Secured',
    country: 'Iceland',
    university: 'University of Iceland',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences; Public Policy'
  },
  {
    id: 360,
    gender: 'Female',
    loanAmount: 2000000,
    loanType: 'Secured',
    country: 'Indonesia',
    university: 'Bandung Institute of Technology (ITB)',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences; Public Policy'
  },
  {
    id: 361,
    gender: 'Male',
    loanAmount: 2000000,
    loanType: 'Secured',
    country: 'Israel',
    university: 'Tel Aviv University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences; Public Policy'
  },
  {
    id: 362,
    gender: 'Female',
    loanAmount: 2000000,
    loanType: 'Secured',
    country: 'Iraq',
    university: 'Diyala University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Public Policy'
  },
  {
    id: 363,
    gender: 'Male',
    loanAmount: 2000000,
    loanType: 'Secured',
    country: 'Indonesia',
    university: 'Universitas Bina Nusantara',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Public Policy'
  },
  {
    id: 364,
    gender: 'Female',
    loanAmount: 2000000,
    loanType: 'Secured',
    country: 'Israel',
    university: 'Hebrew University of Jerusalem',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences'
  },
  {
    id: 365,
    gender: 'Male',
    loanAmount: 2000000,
    loanType: 'Secured',
    country: 'Israel',
    university: 'Al Quds University Arab University in Jerusalem',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences; Public Policy'
  },
  {
    id: 366,
    gender: 'Female',
    loanAmount: 2000000,
    loanType: 'Secured',
    country: 'Iraq',
    university: 'University of Babylon',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Social Sciences'
  },
  {
    id: 367,
    gender: 'Male',
    loanAmount: 2000000,
    loanType: 'Secured',
    country: 'Iran',
    university: 'Kharazmi University (Tarbiat Moallem University Tehran)',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences'
  },
  {
    id: 368,
    gender: 'Female',
    loanAmount: 2000001,
    loanType: 'Secured',
    country: 'Israel',
    university: 'Tel Aviv University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences; Public Policy'
  },
  {
    id: 369,
    gender: 'Male',
    loanAmount: 2000001,
    loanType: 'Secured',
    country: 'Israel',
    university: 'Bar-Ilan University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences; Public Policy'
  },
  {
    id: 370,
    gender: 'Female',
    loanAmount: 2000001,
    loanType: 'Secured',
    country: 'Italy',
    university: 'Catania University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Public Policy'
  },
  {
    id: 371,
    gender: 'Male',
    loanAmount: 2000001,
    loanType: 'Secured',
    country: 'Israel',
    university: 'Ben Gurion University of The Negev',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences; Public Policy; Social Sciences'
  },
  {
    id: 372,
    gender: 'Female',
    loanAmount: 2000001,
    loanType: 'Secured',
    country: 'Iraq',
    university: 'University of Baghdad',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 373,
    gender: 'Male',
    loanAmount: 2000001,
    loanType: 'Secured',
    country: 'Israel',
    university: 'Ariel University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences; Public Policy'
  },
  {
    id: 374,
    gender: 'Female',
    loanAmount: 2000001,
    loanType: 'Secured',
    country: 'Israel',
    university: 'Bar Ilan University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences; Public Policy'
  },
  {
    id: 375,
    gender: 'Male',
    loanAmount: 2000001,
    loanType: 'Secured',
    country: 'Ireland',
    university: 'Munster Technological University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences'
  },
  {
    id: 376,
    gender: 'Female',
    loanAmount: 2000001,
    loanType: 'Secured',
    country: 'Ireland',
    university: 'Atlantic Technological University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Social Sciences'
  },
  {
    id: 377,
    gender: 'Male',
    loanAmount: 2000001,
    loanType: 'Secured',
    country: 'Israel',
    university: 'Technion Israel Institute of Technology',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 378,
    gender: 'Female',
    loanAmount: 2000001,
    loanType: 'Secured',
    country: 'Iran',
    university: 'Bu Ali Sina University Hamedan',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences'
  },
  {
    id: 379,
    gender: 'Male',
    loanAmount: 2000001,
    loanType: 'Secured',
    country: 'Iraq',
    university: 'University of Anbar',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 380,
    gender: 'Female',
    loanAmount: 2000001,
    loanType: 'Secured',
    country: 'Iraq',
    university: 'Diyala University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences; Public Policy'
  },
  {
    id: 381,
    gender: 'Male',
    loanAmount: 2000001,
    loanType: 'Secured',
    country: 'Japan',
    university: 'Kyorin University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 382,
    gender: 'Female',
    loanAmount: 2250000,
    loanType: 'Secured',
    country: 'Japan',
    university: 'University of Tokyo',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 383,
    gender: 'Male',
    loanAmount: 2250000,
    loanType: 'Secured',
    country: 'Ireland',
    university: 'Trinity College Dublin University of Dublin',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 384,
    gender: 'Female',
    loanAmount: 2250000,
    loanType: 'Secured',
    country: 'Ireland',
    university: 'University of Limerick',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 385,
    gender: 'Male',
    loanAmount: 2250000,
    loanType: 'Secured',
    country: 'Ireland',
    university: 'University College Dublin',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences'
  },
  {
    id: 386,
    gender: 'Female',
    loanAmount: 2250000,
    loanType: 'Secured',
    country: 'Ireland',
    university: 'Munster Technological University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences; Public Policy; Social Sciences'
  },
  {
    id: 387,
    gender: 'Male',
    loanAmount: 2250000,
    loanType: 'Secured',
    country: 'Japan',
    university: 'Tokyo Medical and Dental University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences; Public Policy'
  },
  {
    id: 388,
    gender: 'Female',
    loanAmount: 2250000,
    loanType: 'Secured',
    country: 'Japan',
    university: 'University of Tsukuba',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences; Public Policy; Social Sciences'
  },
  {
    id: 389,
    gender: 'Male',
    loanAmount: 2250000,
    loanType: 'Secured',
    country: 'Israel',
    university: 'Tel Aviv University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Public Policy'
  },
  {
    id: 390,
    gender: 'Female',
    loanAmount: 2250000,
    loanType: 'Secured',
    country: 'Israel',
    university: 'Ariel University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 391,
    gender: 'Male',
    loanAmount: 2250000,
    loanType: 'Secured',
    country: 'Jordan',
    university: 'Amman Arab University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences; Public Policy; Social Sciences'
  },
  {
    id: 392,
    gender: 'Female',
    loanAmount: 2250000,
    loanType: 'Secured',
    country: 'Israel',
    university: 'University of Haifa',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences; Public Policy; Social Sciences'
  },
  {
    id: 393,
    gender: 'Male',
    loanAmount: 2250000,
    loanType: 'Secured',
    country: 'Jordan',
    university: 'Philadelphia University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Medicine & Health; Social Sciences'
  },
  {
    id: 394,
    gender: 'Female',
    loanAmount: 2250000,
    loanType: 'Secured',
    country: 'Jordan',
    university: 'Al Ahliyya Amman University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences; Public Policy'
  },
  {
    id: 395,
    gender: 'Male',
    loanAmount: 2250000,
    loanType: 'Secured',
    country: 'Japan',
    university: 'Mie University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 396,
    gender: 'Female',
    loanAmount: 2500000,
    loanType: 'Secured',
    country: 'Jordan',
    university: 'Princess Sumaya University for Technology',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 397,
    gender: 'Male',
    loanAmount: 2500000,
    loanType: 'Secured',
    country: 'Jordan',
    university: 'Hashemite University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences; Public Policy; Social Sciences'
  },
  {
    id: 398,
    gender: 'Female',
    loanAmount: 2500000,
    loanType: 'Secured',
    country: 'Jordan',
    university: 'Princess Sumaya University for Technology',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 399,
    gender: 'Male',
    loanAmount: 2500000,
    loanType: 'Secured',
    country: 'Israel',
    university: 'Reichman University (IDC Herzliya)',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Social Sciences'
  },
  {
    id: 400,
    gender: 'Female',
    loanAmount: 2500000,
    loanType: 'Secured',
    country: 'Israel',
    university: 'Tel Aviv University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences'
  },
  {
    id: 401,
    gender: 'Male',
    loanAmount: 2500000,
    loanType: 'Secured',
    country: 'Israel',
    university: 'Ben Gurion University of the Negev',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Social Sciences'
  },
  {
    id: 402,
    gender: 'Female',
    loanAmount: 2500000,
    loanType: 'Secured',
    country: 'Kazakhstan',
    university: 'Karaganda Buketov University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Public Policy'
  },
  {
    id: 403,
    gender: 'Male',
    loanAmount: 2500000,
    loanType: 'Secured',
    country: 'Jordan',
    university: 'German Jordanian University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Public Policy; Social Sciences'
  },
  {
    id: 404,
    gender: 'Female',
    loanAmount: 2500000,
    loanType: 'Secured',
    country: 'Israel',
    university: 'Hebrew University of Jerusalem',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences'
  },
  {
    id: 405,
    gender: 'Male',
    loanAmount: 2500000,
    loanType: 'Secured',
    country: 'Kazakhstan',
    university: 'Al-Farabi Kazakh National University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Public Policy'
  },
  {
    id: 406,
    gender: 'Female',
    loanAmount: 2500000,
    loanType: 'Secured',
    country: 'Japan',
    university: 'Tokyo City University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Public Policy'
  },
  {
    id: 407,
    gender: 'Male',
    loanAmount: 2500000,
    loanType: 'Secured',
    country: 'Japan',
    university: 'Tokyo University of Agriculture',
    course: 'Business & Management; Computer Science & IT; Law'
  },
  {
    id: 408,
    gender: 'Female',
    loanAmount: 2500000,
    loanType: 'Secured',
    country: 'Kazakhstan',
    university: 'Khoja Akhmet Yassawi International Kazakh-Turkish University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Public Policy; Social Sciences'
  },
  {
    id: 409,
    gender: 'Male',
    loanAmount: 2500000,
    loanType: 'Secured',
    country: 'Italy',
    university: 'University of Camerino',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences; Public Policy'
  },
  {
    id: 410,
    gender: 'Female',
    loanAmount: 2750000,
    loanType: 'Secured',
    country: 'Japan',
    university: 'Tokyo University of Agriculture',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Social Sciences'
  },
  {
    id: 411,
    gender: 'Male',
    loanAmount: 2750000,
    loanType: 'Secured',
    country: 'Kenya',
    university: 'University of Nairobi',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences; Public Policy; Social Sciences'
  },
  {
    id: 412,
    gender: 'Female',
    loanAmount: 2750000,
    loanType: 'Secured',
    country: 'Kenya',
    university: 'University of Nairobi',
    course: 'Business & Management; Computer Science & IT; Law'
  },
  {
    id: 413,
    gender: 'Male',
    loanAmount: 2750000,
    loanType: 'Secured',
    country: 'Japan',
    university: 'Chubu University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Public Policy; Social Sciences'
  },
  {
    id: 414,
    gender: 'Female',
    loanAmount: 2750000,
    loanType: 'Secured',
    country: 'Kazakhstan',
    university: 'L.N. Gumilyov Eurasian National University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Social Sciences'
  },
  {
    id: 415,
    gender: 'Male',
    loanAmount: 2750000,
    loanType: 'Secured',
    country: 'Jordan',
    university: 'University of Jordan',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 416,
    gender: 'Female',
    loanAmount: 2750000,
    loanType: 'Secured',
    country: 'Jordan',
    university: 'Al Balqa Applied University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Public Policy'
  },
  {
    id: 417,
    gender: 'Male',
    loanAmount: 2750000,
    loanType: 'Secured',
    country: 'Jordan',
    university: 'Al Balqa Applied University',
    course: 'Business & Management; Computer Science & IT; Law; Medicine & Health; Public Policy; Social Sciences'
  },
  {
    id: 418,
    gender: 'Female',
    loanAmount: 2750000,
    loanType: 'Secured',
    country: 'Kuwait',
    university: 'Kuwait University',
    course: 'Business & Management; Computer Science & IT; Law'
  },
  {
    id: 419,
    gender: 'Male',
    loanAmount: 2750000,
    loanType: 'Secured',
    country: 'Japan',
    university: 'Shibaura Institute of Technology',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Public Policy; Social Sciences'
  },
  {
    id: 420,
    gender: 'Female',
    loanAmount: 2750000,
    loanType: 'Secured',
    country: 'Kenya',
    university: 'Kenyatta University',
    course: 'Business & Management; Computer Science & IT; Law; Natural Sciences; Social Sciences'
  },
  {
    id: 421,
    gender: 'Male',
    loanAmount: 2750000,
    loanType: 'Secured',
    country: 'Kuwait',
    university: 'American University of the Middle East',
    course: 'Business & Management; Computer Science & IT; Law; Medicine & Health; Public Policy; Social Sciences'
  },
  {
    id: 422,
    gender: 'Female',
    loanAmount: 2750000,
    loanType: 'Secured',
    country: 'Kazakhstan',
    university: 'Abylkas Saginov Karaganda Technical University',
    course: 'Business & Management; Computer Science & IT; Law; Natural Sciences; Social Sciences'
  },
  {
    id: 423,
    gender: 'Male',
    loanAmount: 2750000,
    loanType: 'Secured',
    country: 'Kazakhstan',
    university: 'Kazakh National University Al Farabi',
    course: 'Business & Management; Computer Science & IT; Law; Natural Sciences; Social Sciences'
  },
  {
    id: 424,
    gender: 'Female',
    loanAmount: 3000000,
    loanType: 'Secured',
    country: 'Kazakhstan',
    university: 'Satbayev University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Public Policy'
  },
  {
    id: 425,
    gender: 'Male',
    loanAmount: 3000000,
    loanType: 'Secured',
    country: 'Kazakhstan',
    university: 'Kazakh National Pedagogical University Abai',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Public Policy; Social Sciences'
  },
  {
    id: 426,
    gender: 'Female',
    loanAmount: 3000000,
    loanType: 'Secured',
    country: 'Kuwait',
    university: 'College of Technological Studies',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 427,
    gender: 'Male',
    loanAmount: 3000000,
    loanType: 'Secured',
    country: 'Jordan',
    university: 'Al Balqa Applied University',
    course: 'Business & Management; Computer Science & IT; Law; Medicine & Health; Public Policy; Social Sciences'
  },
  {
    id: 428,
    gender: 'Female',
    loanAmount: 3000000,
    loanType: 'Secured',
    country: 'Jordan',
    university: 'Al Balqa Applied University',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Social Sciences'
  },
  {
    id: 429,
    gender: 'Male',
    loanAmount: 3000000,
    loanType: 'Secured',
    country: 'Kuwait',
    university: 'Gulf University for Science and Technology (GUST)',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Public Policy; Social Sciences'
  },
  {
    id: 430,
    gender: 'Female',
    loanAmount: 3000000,
    loanType: 'Secured',
    country: 'Kazakhstan',
    university: 'Auezov South Kazakhstan State University (SKSU)',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Public Policy'
  },
  {
    id: 431,
    gender: 'Male',
    loanAmount: 3000000,
    loanType: 'Secured',
    country: 'Latvia',
    university: 'University of Latvia',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Public Policy; Social Sciences'
  },
  {
    id: 432,
    gender: 'Female',
    loanAmount: 3000000,
    loanType: 'Secured',
    country: 'Kyrgyzstan',
    university: 'Kyrgyz-Turkish Manas University',
    course: 'Business & Management; Computer Science & IT; Law; Natural Sciences; Social Sciences'
  },
  {
    id: 433,
    gender: 'Male',
    loanAmount: 3000000,
    loanType: 'Secured',
    country: 'Kyrgyzstan',
    university: 'Kyrgyz-Turkish Manas University',
    course: 'Business & Management; Computer Science & IT; Law; Social Sciences'
  },
  {
    id: 434,
    gender: 'Female',
    loanAmount: 3000000,
    loanType: 'Secured',
    country: 'Kenya',
    university: 'Jomo Kenyatta University of Agriculture and Technology',
    course: 'Business & Management; Computer Science & IT; Engineering & Technology; Public Policy; Social Sciences'
  },
  {
    id: 435,
    gender: 'Male',
    loanAmount: 3000000,
    loanType: 'Secured',
    country: 'Latvia',
    university: 'Riga Technical University',
    course: 'Business & Management; Computer Science & IT; Law; Medicine & Health; Public Policy; Social Sciences'
  },
  {
    id: 436,
    gender: 'Female',
    loanAmount: 3000000,
    loanType: 'Secured',
    country: 'Kenya',
    university: 'University of Nairobi',
    course: 'Business & Management; Computer Science & IT; Law; Natural Sciences; Social Sciences'
  },
  {
    id: 437,
    gender: 'Male',
    loanAmount: 3000000,
    loanType: 'Secured',
    country: 'Kyrgyzstan',
    university: 'Kyrgyz-Turkish Manas University',
    course: 'Business & Management; Computer Science & IT; Law; Natural Sciences; Social Sciences'
  },
  {
    id: 438,
    gender: 'Female',
    loanAmount: 3000001,
    loanType: 'Secured',
    country: 'Kenya',
    university: 'Jomo Kenyatta University of Agriculture and Technology',
    course: 'Business & Management; Computer Science & IT; Law; Social Sciences'
  },
  {
    id: 439,
    gender: 'Male',
    loanAmount: 3000001,
    loanType: 'Secured',
    country: 'Kyrgyzstan',
    university: 'Kyrgyz-Turkish Manas University',
    course: 'Business & Management; Computer Science & IT; Law; Natural Sciences; Social Sciences'
  },
  {
    id: 440,
    gender: 'Female',
    loanAmount: 3000001,
    loanType: 'Secured',
    country: 'Kuwait',
    university: 'College of Technological Studies',
    course: 'Business & Management; Computer Science & IT; Law; Medicine & Health; Public Policy; Social Sciences'
  },
  {
    id: 441,
    gender: 'Male',
    loanAmount: 3000001,
    loanType: 'Secured',
    country: 'Lebanon',
    university: 'Beirut Arab University',
    course: 'Business & Management; Computer Science & IT; Law; Social Sciences'
  },
  {
    id: 442,
    gender: 'Female',
    loanAmount: 3000001,
    loanType: 'Secured',
    country: 'Lebanon',
    university: 'Saint Joseph University of Beirut (USJ)',
    course: 'Business & Management; Computer Science & IT; Law; Natural Sciences; Social Sciences'
  },
  {
    id: 443,
    gender: 'Male',
    loanAmount: 3000001,
    loanType: 'Secured',
    country: 'Latvia',
    university: 'University of Latvia',
    course: 'Business & Management; Computer Science & IT; Law; Social Sciences'
  },
  {
    id: 444,
    gender: 'Female',
    loanAmount: 3000001,
    loanType: 'Secured',
    country: 'Kyrgyzstan',
    university: 'Kyrgyz-Turkish Manas University',
    course: 'Business & Management; Computer Science & IT; Law; Natural Sciences; Social Sciences'
  },
  {
    id: 445,
    gender: 'Male',
    loanAmount: 3000001,
    loanType: 'Secured',
    country: 'Kuwait',
    university: 'Kuwait University',
    course: 'Business & Management; Computer Science & IT; Law'
  },
  {
    id: 446,
    gender: 'Female',
    loanAmount: 3000001,
    loanType: 'Secured',
    country: 'Kyrgyzstan',
    university: 'Kyrgyz-Turkish Manas University',
    course: 'Business & Management; Computer Science & IT; Law; Social Sciences'
  },
  {
    id: 447,
    gender: 'Male',
    loanAmount: 3000001,
    loanType: 'Secured',
    country: 'Kuwait',
    university: 'American University of the Middle East',
    course: 'Business & Management; Computer Science & IT; Medicine & Health; Natural Sciences; Public Policy'
  },
  {
    id: 448,
    gender: 'Female',
    loanAmount: 3000001,
    loanType: 'Secured',
    country: 'Latvia',
    university: 'University of Latvia',
    course: 'Business & Management; Computer Science & IT; Law'
  },
  {
    id: 449,
    gender: 'Male',
    loanAmount: 3000001,
    loanType: 'Secured',
    country: 'Lithuania',
    university: 'Vilnius Gediminas Technical University',
    course: 'Business & Management; Computer Science & IT; Law; Natural Sciences; Social Sciences'
  },
  {
    id: 450,
    gender: 'Female',
    loanAmount: 3000001,
    loanType: 'Secured',
    country: 'Kyrgyzstan',
    university: 'American University of Central Asia',
    course: 'Business & Management; Computer Science & IT; Law'
  },
  {
    id: 451,
    gender: 'Male',
    loanAmount: 3000001,
    loanType: 'Secured',
    country: 'Kuwait',
    university: 'College of Technological Studies',
    course: 'Business & Management; Computer Science & IT; Medicine & Health; Natural Sciences; Public Policy'
  },
  {
    id: 452,
    gender: 'Female',
    loanAmount: 3500000,
    loanType: 'Secured',
    country: 'Kyrgyzstan',
    university: 'Kyrgyz-Turkish Manas University',
    course: 'Business & Management; Computer Science & IT; Medicine & Health; Natural Sciences'
  },
  {
    id: 453,
    gender: 'Male',
    loanAmount: 3500000,
    loanType: 'Secured',
    country: 'Lithuania',
    university: 'Lithuanian University of Health Sciences',
    course: 'Business & Management; Computer Science & IT; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 454,
    gender: 'Female',
    loanAmount: 3500000,
    loanType: 'Secured',
    country: 'Kyrgyzstan',
    university: 'Kyrgyz-Turkish Manas University',
    course: 'Business & Management; Computer Science & IT; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 455,
    gender: 'Male',
    loanAmount: 3500000,
    loanType: 'Secured',
    country: 'Kuwait',
    university: 'Gulf University for Science and Technology (GUST)',
    course: 'Business & Management; Computer Science & IT; Medicine & Health; Natural Sciences'
  },
  {
    id: 456,
    gender: 'Female',
    loanAmount: 3500000,
    loanType: 'Secured',
    country: 'Lithuania',
    university: 'Vytautas Magnus University',
    course: 'Business & Management; Computer Science & IT; Law; Social Sciences'
  },
  {
    id: 457,
    gender: 'Male',
    loanAmount: 3500000,
    loanType: 'Secured',
    country: 'Lebanon',
    university: 'American University of Beirut (AUB)',
    course: 'Business & Management; Computer Science & IT; Law; Medicine & Health; Public Policy; Social Sciences'
  },
  {
    id: 458,
    gender: 'Female',
    loanAmount: 3500000,
    loanType: 'Secured',
    country: 'Lebanon',
    university: 'Saint Joseph University of Beirut (USJ)',
    course: 'Business & Management; Computer Science & IT; Medicine & Health; Natural Sciences; Public Policy'
  },
  {
    id: 459,
    gender: 'Male',
    loanAmount: 3500000,
    loanType: 'Secured',
    country: 'Kyrgyzstan',
    university: 'Kyrgyz-Turkish Manas University',
    course: 'Business & Management; Computer Science & IT; Law; Natural Sciences; Social Sciences'
  },
  {
    id: 460,
    gender: 'Female',
    loanAmount: 3500000,
    loanType: 'Secured',
    country: 'Lebanon',
    university: 'Beirut Arab University',
    course: 'Business & Management; Computer Science & IT; Law; Social Sciences'
  },
  {
    id: 461,
    gender: 'Male',
    loanAmount: 3500000,
    loanType: 'Secured',
    country: 'Latvia',
    university: 'Riga Technical University',
    course: 'Business & Management; Computer Science & IT; Law; Natural Sciences; Social Sciences'
  },
  {
    id: 462,
    gender: 'Female',
    loanAmount: 3500000,
    loanType: 'Secured',
    country: 'Luxembourg',
    university: 'University of Luxembourg',
    course: 'Business & Management; Computer Science & IT; Natural Sciences; Social Sciences'
  },
  {
    id: 463,
    gender: 'Male',
    loanAmount: 3500000,
    loanType: 'Secured',
    country: 'Lebanon',
    university: 'Saint Joseph University of Beirut (USJ)',
    course: 'Business & Management; Computer Science & IT; Law; Natural Sciences; Social Sciences'
  },
  {
    id: 464,
    gender: 'Female',
    loanAmount: 3500000,
    loanType: 'Secured',
    country: 'Luxembourg',
    university: 'University du Luxembourg',
    course: 'Business & Management; Computer Science & IT; Law; Social Sciences'
  },
  {
    id: 465,
    gender: 'Male',
    loanAmount: 3500000,
    loanType: 'Secured',
    country: 'Latvia',
    university: 'Riga Technical University',
    course: 'Business & Management; Computer Science & IT; Law; Social Sciences'
  },
  {
    id: 466,
    gender: 'Female',
    loanAmount: 4000000,
    loanType: 'Secured',
    country: 'Lithuania',
    university: 'Mykolas Romeris University',
    course: 'Business & Management; Computer Science & IT; Law; Social Sciences'
  },
  {
    id: 467,
    gender: 'Male',
    loanAmount: 4000000,
    loanType: 'Secured',
    country: 'Malaysia',
    university: 'International Islamic University Malaysia (IIUM)',
    course: 'Business & Management; Computer Science & IT; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 468,
    gender: 'Female',
    loanAmount: 4000000,
    loanType: 'Secured',
    country: 'Lithuania',
    university: 'Vilnius University',
    course: 'Business & Management; Computer Science & IT; Law; Natural Sciences; Social Sciences'
  },
  {
    id: 469,
    gender: 'Male',
    loanAmount: 4000000,
    loanType: 'Secured',
    country: 'Malaysia',
    university: 'SEGi University',
    course: 'Business & Management; Computer Science & IT; Law; Natural Sciences; Social Sciences'
  },
  {
    id: 470,
    gender: 'Female',
    loanAmount: 4000000,
    loanType: 'Secured',
    country: 'Lebanon',
    university: 'American University of Beirut (AUB)',
    course: 'Business & Management; Computer Science & IT; Natural Sciences; Social Sciences'
  },
  {
    id: 471,
    gender: 'Male',
    loanAmount: 4000000,
    loanType: 'Secured',
    country: 'Latvia',
    university: 'University of Latvia',
    course: 'Business & Management; Computer Science & IT; Medicine & Health; Natural Sciences; Public Policy'
  },
  {
    id: 472,
    gender: 'Female',
    loanAmount: 4000000,
    loanType: 'Secured',
    country: 'Malaysia',
    university: 'INTI International University',
    course: 'Business & Management; Computer Science & IT; Medicine & Health; Natural Sciences'
  },
  {
    id: 473,
    gender: 'Male',
    loanAmount: 4000000,
    loanType: 'Secured',
    country: 'Latvia',
    university: 'Riga Technical University',
    course: 'Business & Management; Computer Science & IT; Medicine & Health; Natural Sciences; Public Policy'
  },
  {
    id: 474,
    gender: 'Female',
    loanAmount: 4000000,
    loanType: 'Secured',
    country: 'Latvia',
    university: 'University of Latvia',
    course: 'Business & Management; Computer Science & IT; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 475,
    gender: 'Male',
    loanAmount: 4000000,
    loanType: 'Secured',
    country: 'Luxembourg',
    university: 'University du Luxembourg',
    course: 'Business & Management; Computer Science & IT; Natural Sciences'
  },
  {
    id: 476,
    gender: 'Female',
    loanAmount: 4000000,
    loanType: 'Secured',
    country: 'Malaysia',
    university: 'International Islamic University Malaysia (IIUM)',
    course: 'Business & Management; Computer Science & IT; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 477,
    gender: 'Male',
    loanAmount: 4000000,
    loanType: 'Secured',
    country: 'Lebanon',
    university: 'Lebanese American University',
    course: 'Business & Management; Engineering & Technology'
  },
  {
    id: 478,
    gender: 'Female',
    loanAmount: 4000000,
    loanType: 'Secured',
    country: 'Luxembourg',
    university: 'University of Luxembourg',
    course: 'Business & Management; Computer Science & IT; Natural Sciences; Social Sciences'
  },
  {
    id: 479,
    gender: 'Male',
    loanAmount: 4000000,
    loanType: 'Secured',
    country: 'Malta',
    university: 'University of Malta',
    course: 'Business & Management; Engineering & Technology'
  },
  {
    id: 480,
    gender: 'Female',
    loanAmount: 4000001,
    loanType: 'Secured',
    country: 'Lebanon',
    university: 'Lebanese American University',
    course: 'Business & Management; Computer Science & IT; Medicine & Health; Natural Sciences'
  },
  {
    id: 481,
    gender: 'Male',
    loanAmount: 4000001,
    loanType: 'Secured',
    country: 'Luxembourg',
    university: 'University of Luxembourg',
    course: 'Business & Management; Computer Science & IT; Natural Sciences; Social Sciences'
  },
  {
    id: 482,
    gender: 'Female',
    loanAmount: 4000001,
    loanType: 'Secured',
    country: 'Malta',
    university: 'University of Malta',
    course: 'Business & Management; Computer Science & IT; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 483,
    gender: 'Male',
    loanAmount: 4000001,
    loanType: 'Secured',
    country: 'Lithuania',
    university: 'Mykolas Romeris University',
    course: 'Business & Management; Computer Science & IT; Medicine & Health; Natural Sciences; Public Policy'
  },
  {
    id: 484,
    gender: 'Female',
    loanAmount: 4000001,
    loanType: 'Secured',
    country: 'Malta',
    university: 'University of Malta',
    course: 'Business & Management; Computer Science & IT; Natural Sciences; Social Sciences'
  },
  {
    id: 485,
    gender: 'Male',
    loanAmount: 4000001,
    loanType: 'Secured',
    country: 'Luxembourg',
    university: 'University of Luxembourg',
    course: 'Business & Management; Computer Science & IT; Natural Sciences; Social Sciences'
  },
  {
    id: 486,
    gender: 'Female',
    loanAmount: 4000001,
    loanType: 'Secured',
    country: 'Malaysia',
    university: 'Universiti Sains Islam Malaysia',
    course: 'Business & Management; Computer Science & IT; Medicine & Health; Natural Sciences; Social Sciences'
  },
  {
    id: 487,
    gender: 'Male',
    loanAmount: 4000001,
    loanType: 'Secured',
    country: 'Malaysia',
    university: 'UCSI University',
    course: 'Business & Management; Engineering & Technology'
  },
  {
    id: 488,
    gender: 'Female',
    loanAmount: 4000001,
    loanType: 'Secured',
    country: 'Malaysia',
    university: 'Universiti Tunku Abdul Rahman (UTAR)',
    course: 'Business & Management; Computer Science & IT; Social Sciences'
  },
  {
    id: 489,
    gender: 'Male',
    loanAmount: 4000001,
    loanType: 'Secured',
    country: 'Malta',
    university: 'University of Malta',
    course: 'Business & Management; Computer Science & IT; Social Sciences'
  },
  {
    id: 490,
    gender: 'Female',
    loanAmount: 4000001,
    loanType: 'Secured',
    country: 'Mauritius',
    university: 'University of Mauritius',
    course: 'Business & Management; Engineering & Technology'
  },
  {
    id: 491,
    gender: 'Male',
    loanAmount: 4000001,
    loanType: 'Secured',
    country: 'Malta',
    university: 'University of Malta',
    course: 'Business & Management; Computer Science & IT; Natural Sciences'
  },
  {
    id: 492,
    gender: 'Female',
    loanAmount: 4000001,
    loanType: 'Secured',
    country: 'Luxembourg',
    university: 'University du Luxembourg',
    course: 'Business & Management; Computer Science & IT; Natural Sciences'
  },
  {
    id: 493,
    gender: 'Male',
    loanAmount: 4000001,
    loanType: 'Secured',
    country: 'Luxembourg',
    university: 'University du Luxembourg',
    course: 'Business & Management; Engineering & Technology; Natural Sciences'
  },
  {
    id: 494,
    gender: 'Female',
    loanAmount: 4500000,
    loanType: 'Secured',
    country: 'Luxembourg',
    university: 'University du Luxembourg',
    course: 'Business & Management; Computer Science & IT; Social Sciences'
  },
  {
    id: 495,
    gender: 'Male',
    loanAmount: 4500000,
    loanType: 'Secured',
    country: 'Mauritius',
    university: 'University of Mauritius',
    course: 'Business & Management; Engineering & Technology; Law'
  },
  {
    id: 496,
    gender: 'Female',
    loanAmount: 4500000,
    loanType: 'Secured',
    country: 'Mexico',
    university: 'Universidad Autonoma del Estado de Hidalgo',
    course: 'Business & Management; Computer Science & IT; Natural Sciences; Social Sciences'
  },
  {
    id: 497,
    gender: 'Male',
    loanAmount: 4500000,
    loanType: 'Secured',
    country: 'Malaysia',
    university: 'SEGi University',
    course: 'Business & Management; Engineering & Technology; Law'
  },
  {
    id: 498,
    gender: 'Female',
    loanAmount: 4500000,
    loanType: 'Secured',
    country: 'Mexico',
    university: 'Red de Universidades Anahuac',
    course: 'Business & Management; Engineering & Technology; Law'
  },
  {
    id: 499,
    gender: 'Male',
    loanAmount: 4500000,
    loanType: 'Secured',
    country: 'Malaysia',
    university: 'Universiti Tunku Abdul Rahman',
    course: 'Business & Management; Computer Science & IT; Natural Sciences; Social Sciences'
  },
  {
    id: 500,
    gender: 'Female',
    loanAmount: 4500000,
    loanType: 'Secured',
    country: 'Luxembourg',
    university: 'University of Luxembourg',
    course: 'Business & Management; Engineering & Technology'
  },
  {
    id: 501,
    gender: 'Male',
    loanAmount: 4500000,
    loanType: 'Unsecured',
    country: 'Malaysia',
    university: 'Universiti Malaysia Sarawak',
    course: 'Business & Management; Computer Science & IT; Natural Sciences; Social Sciences'
  },
  {
    id: 502,
    gender: 'Female',
    loanAmount: 4500000,
    loanType: 'Unsecured',
    country: 'Malaysia',
    university: 'Universiti Putra Malaysia (UPM)',
    course: 'Business & Management; Engineering & Technology; Law'
  },
  {
    id: 503,
    gender: 'Male',
    loanAmount: 4500000,
    loanType: 'Unsecured',
    country: 'Malta',
    university: 'University of Malta',
    course: 'Business & Management; Engineering & Technology; Natural Sciences'
  },
  {
    id: 504,
    gender: 'Female',
    loanAmount: 4500000,
    loanType: 'Unsecured',
    country: 'Malta',
    university: 'University of Malta',
    course: 'Business & Management; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 505,
    gender: 'Male',
    loanAmount: 4500000,
    loanType: 'Unsecured',
    country: 'Mexico',
    university: 'Universidad Panamericana (UP)',
    course: 'Business & Management; Engineering & Technology; Natural Sciences'
  },
  {
    id: 506,
    gender: 'Female',
    loanAmount: 4500000,
    loanType: 'Unsecured',
    country: 'Montenegro',
    university: 'University of Montenegro',
    course: 'Business & Management; Computer Science & IT; Natural Sciences; Social Sciences'
  },
  {
    id: 507,
    gender: 'Male',
    loanAmount: 4500000,
    loanType: 'Unsecured',
    country: 'Mauritius',
    university: 'University of Mauritius',
    course: 'Business & Management; Engineering & Technology'
  },
  {
    id: 508,
    gender: 'Female',
    loanAmount: 4500000,
    loanType: 'Unsecured',
    country: 'Mauritius',
    university: 'University of Mauritius',
    course: 'Business & Management; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 509,
    gender: 'Male',
    loanAmount: 4999000,
    loanType: 'Unsecured',
    country: 'Malaysia',
    university: 'Universiti Pendidikan Sultan Idris (UPSI)',
    course: 'Business & Management; Engineering & Technology'
  },
  {
    id: 510,
    gender: 'Female',
    loanAmount: 4999000,
    loanType: 'Unsecured',
    country: 'Mauritius',
    university: 'University of Mauritius',
    course: 'Business & Management; Engineering & Technology; Natural Sciences'
  },
  {
    id: 511,
    gender: 'Male',
    loanAmount: 4999000,
    loanType: 'Unsecured',
    country: 'Mauritius',
    university: 'University of Mauritius',
    course: 'Business & Management; Engineering & Technology'
  },
  {
    id: 512,
    gender: 'Female',
    loanAmount: 4999000,
    loanType: 'Unsecured',
    country: 'Montenegro',
    university: 'University of Montenegro',
    course: 'Business & Management; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 513,
    gender: 'Male',
    loanAmount: 4999000,
    loanType: 'Unsecured',
    country: 'Montenegro',
    university: 'University of Montenegro',
    course: 'Business & Management; Medicine & Health'
  },
  {
    id: 514,
    gender: 'Female',
    loanAmount: 4999000,
    loanType: 'Unsecured',
    country: 'Mauritius',
    university: 'University of Mauritius',
    course: 'Business & Management; Engineering & Technology; Public Policy'
  },
  {
    id: 515,
    gender: 'Male',
    loanAmount: 4999000,
    loanType: 'Unsecured',
    country: 'Morocco',
    university: 'University Ibn Tofail Kenitra',
    course: 'Business & Management; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 516,
    gender: 'Female',
    loanAmount: 4999000,
    loanType: 'Unsecured',
    country: 'Montenegro',
    university: 'University of Montenegro',
    course: 'Business & Management; Computer Science & IT; Social Sciences'
  },
  {
    id: 517,
    gender: 'Male',
    loanAmount: 4999000,
    loanType: 'Unsecured',
    country: 'Mauritius',
    university: 'University of Mauritius',
    course: 'Business & Management; Engineering & Technology'
  },
  {
    id: 518,
    gender: 'Female',
    loanAmount: 4999000,
    loanType: 'Unsecured',
    country: 'Montenegro',
    university: 'University of Montenegro',
    course: 'Business & Management; Medicine & Health'
  },
  {
    id: 519,
    gender: 'Male',
    loanAmount: 4999000,
    loanType: 'Unsecured',
    country: 'Mauritius',
    university: 'University of Mauritius',
    course: 'Business & Management; Natural Sciences'
  },
  {
    id: 520,
    gender: 'Female',
    loanAmount: 4999000,
    loanType: 'Unsecured',
    country: 'Montenegro',
    university: 'University of Montenegro',
    course: 'Business & Management; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 521,
    gender: 'Male',
    loanAmount: 4999000,
    loanType: 'Unsecured',
    country: 'Montenegro',
    university: 'University of Montenegro',
    course: 'Business & Management; Engineering & Technology'
  },
  {
    id: 522,
    gender: 'Female',
    loanAmount: 4999000,
    loanType: 'Unsecured',
    country: 'Montenegro',
    university: 'University of Montenegro',
    course: 'Business & Management; Natural Sciences'
  },
  {
    id: 523,
    gender: 'Male',
    loanAmount: 5000000,
    loanType: 'Unsecured',
    country: 'Mozambique',
    university: 'Universidade Eduardo Mondlane',
    course: 'Business & Management; Engineering & Technology'
  },
  {
    id: 524,
    gender: 'Female',
    loanAmount: 5000000,
    loanType: 'Unsecured',
    country: 'Morocco',
    university: 'University Ibn Tofail Kenitra',
    course: 'Business & Management; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 525,
    gender: 'Male',
    loanAmount: 5000000,
    loanType: 'Unsecured',
    country: 'Mauritius',
    university: 'University of Mauritius',
    course: 'Business & Management; Natural Sciences'
  },
  {
    id: 526,
    gender: 'Female',
    loanAmount: 5000000,
    loanType: 'Unsecured',
    country: 'Montenegro',
    university: 'University of Montenegro',
    course: 'Business & Management; Engineering & Technology; Public Policy'
  },
  {
    id: 527,
    gender: 'Male',
    loanAmount: 5000000,
    loanType: 'Unsecured',
    country: 'Mauritius',
    university: 'University of Mauritius',
    course: 'Business & Management; Engineering & Technology; Law'
  },
  {
    id: 528,
    gender: 'Female',
    loanAmount: 5000000,
    loanType: 'Unsecured',
    country: 'Morocco',
    university: 'University Ibn Tofail Kenitra',
    course: 'Business & Management; Engineering & Technology; Law'
  },
  {
    id: 529,
    gender: 'Male',
    loanAmount: 5000000,
    loanType: 'Unsecured',
    country: 'Mozambique',
    university: 'Universidade Eduardo Mondlane',
    course: 'Business & Management; Engineering & Technology; Law'
  },
  {
    id: 530,
    gender: 'Female',
    loanAmount: 5000000,
    loanType: 'Unsecured',
    country: 'Morocco',
    university: 'University Cadi Ayyad Marrakech',
    course: 'Business & Management; Engineering & Technology; Natural Sciences'
  },
  {
    id: 531,
    gender: 'Male',
    loanAmount: 5000000,
    loanType: 'Unsecured',
    country: 'Morocco',
    university: 'University Sultan Moulay Slimane Beni Mellal',
    course: 'Business & Management; Natural Sciences'
  },
  {
    id: 532,
    gender: 'Female',
    loanAmount: 5000000,
    loanType: 'Unsecured',
    country: 'Montenegro',
    university: 'University of Montenegro',
    course: 'Business & Management; Medicine & Health'
  },
  {
    id: 533,
    gender: 'Male',
    loanAmount: 5000000,
    loanType: 'Unsecured',
    country: 'Nepal',
    university: 'Tribhuvan University',
    course: 'Business & Management; Natural Sciences'
  },
  {
    id: 534,
    gender: 'Female',
    loanAmount: 5000000,
    loanType: 'Unsecured',
    country: 'Montenegro',
    university: 'University of Montenegro',
    course: 'Business & Management; Public Policy'
  },
  {
    id: 535,
    gender: 'Male',
    loanAmount: 5000000,
    loanType: 'Unsecured',
    country: 'Morocco',
    university: 'University Sidi Mohammed Ben Abdellah Fes',
    course: 'Business & Management; Medicine & Health'
  },
  {
    id: 536,
    gender: 'Female',
    loanAmount: 5000000,
    loanType: 'Unsecured',
    country: 'Nepal',
    university: 'Tribhuvan University',
    course: 'Business & Management; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 537,
    gender: 'Male',
    loanAmount: 5001000,
    loanType: 'Unsecured',
    country: 'Montenegro',
    university: 'University of Montenegro',
    course: 'Business & Management; Public Policy'
  },
  {
    id: 538,
    gender: 'Female',
    loanAmount: 5001000,
    loanType: 'Unsecured',
    country: 'Nepal',
    university: 'Tribhuvan University',
    course: 'Business & Management; Natural Sciences; Social Sciences'
  },
  {
    id: 539,
    gender: 'Male',
    loanAmount: 5001000,
    loanType: 'Unsecured',
    country: 'Mozambique',
    university: 'Universidade Eduardo Mondlane',
    course: 'Business & Management; Natural Sciences; Social Sciences'
  },
  {
    id: 540,
    gender: 'Female',
    loanAmount: 5001000,
    loanType: 'Unsecured',
    country: 'Nepal',
    university: 'Kathmandu University',
    course: 'Business & Management; Engineering & Technology; Public Policy'
  },
  {
    id: 541,
    gender: 'Male',
    loanAmount: 5001000,
    loanType: 'Unsecured',
    country: 'Morocco',
    university: 'University Ibn Tofail Kenitra',
    course: 'Business & Management; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 542,
    gender: 'Female',
    loanAmount: 5001000,
    loanType: 'Unsecured',
    country: 'Montenegro',
    university: 'University of Montenegro',
    course: 'Business & Management; Medicine & Health'
  },
  {
    id: 543,
    gender: 'Male',
    loanAmount: 5001000,
    loanType: 'Unsecured',
    country: 'Netherlands',
    university: 'Radboud University',
    course: 'Business & Management; Natural Sciences'
  },
  {
    id: 544,
    gender: 'Female',
    loanAmount: 5001000,
    loanType: 'Unsecured',
    country: 'Morocco',
    university: 'University Sultan Moulay Slimane Beni Mellal',
    course: 'Business & Management; Engineering & Technology; Public Policy'
  },
  {
    id: 545,
    gender: 'Male',
    loanAmount: 5001000,
    loanType: 'Unsecured',
    country: 'Morocco',
    university: 'University Ibn Tofail Kenitra',
    course: 'Computer Science & IT'
  },
  {
    id: 546,
    gender: 'Female',
    loanAmount: 5001000,
    loanType: 'Unsecured',
    country: 'Nepal',
    university: 'Kathmandu University',
    course: 'Business & Management; Natural Sciences'
  },
  {
    id: 547,
    gender: 'Male',
    loanAmount: 5001000,
    loanType: 'Unsecured',
    country: 'Nepal',
    university: 'Tribhuvan University',
    course: 'Computer Science & IT'
  },
  {
    id: 548,
    gender: 'Female',
    loanAmount: 5001000,
    loanType: 'Unsecured',
    country: 'Morocco',
    university: 'University Sultan Moulay Slimane Beni Mellal',
    course: 'Computer Science & IT; Engineering & Technology'
  },
  {
    id: 549,
    gender: 'Male',
    loanAmount: 5001000,
    loanType: 'Unsecured',
    country: 'Netherlands',
    university: 'Leiden University',
    course: 'Business & Management; Natural Sciences'
  },
  {
    id: 550,
    gender: 'Female',
    loanAmount: 5001000,
    loanType: 'Unsecured',
    country: 'Mozambique',
    university: 'Universidade Eduardo Mondlane',
    course: 'Business & Management; Public Policy'
  },
  {
    id: 551,
    gender: 'Male',
    loanAmount: 5500000,
    loanType: 'Unsecured',
    country: 'Morocco',
    university: 'University Mohammed V de Rabat',
    course: 'Business & Management; Natural Sciences'
  },
  {
    id: 552,
    gender: 'Female',
    loanAmount: 5500000,
    loanType: 'Unsecured',
    country: 'Nepal',
    university: 'Kathmandu University',
    course: 'Business & Management; Public Policy'
  },
  {
    id: 553,
    gender: 'Male',
    loanAmount: 5500000,
    loanType: 'Unsecured',
    country: 'Morocco',
    university: 'University Sultan Moulay Slimane Beni Mellal',
    course: 'Business & Management; Natural Sciences'
  },
  {
    id: 554,
    gender: 'Female',
    loanAmount: 5500000,
    loanType: 'Unsecured',
    country: 'New Zealand',
    university: 'University of Canterbury',
    course: 'Computer Science & IT; Engineering & Technology'
  },
  {
    id: 555,
    gender: 'Male',
    loanAmount: 5500000,
    loanType: 'Unsecured',
    country: 'Nigeria',
    university: 'University of Benin',
    course: 'Business & Management; Medicine & Health'
  },
  {
    id: 556,
    gender: 'Female',
    loanAmount: 5500000,
    loanType: 'Unsecured',
    country: 'Nepal',
    university: 'Tribhuvan University',
    course: 'Business & Management; Natural Sciences'
  },
  {
    id: 557,
    gender: 'Male',
    loanAmount: 5500000,
    loanType: 'Unsecured',
    country: 'Mozambique',
    university: 'Universidade Eduardo Mondlane',
    course: 'Business & Management; Medicine & Health'
  },
  {
    id: 558,
    gender: 'Female',
    loanAmount: 5500000,
    loanType: 'Unsecured',
    country: 'Mozambique',
    university: 'Universidade Eduardo Mondlane',
    course: 'Business & Management; Public Policy'
  },
  {
    id: 559,
    gender: 'Male',
    loanAmount: 5500000,
    loanType: 'Unsecured',
    country: 'New Zealand',
    university: 'University of Canterbury',
    course: 'Computer Science & IT; Engineering & Technology'
  },
  {
    id: 560,
    gender: 'Female',
    loanAmount: 5500000,
    loanType: 'Unsecured',
    country: 'Mozambique',
    university: 'Universidade Eduardo Mondlane',
    course: 'Business & Management; Public Policy'
  },
  {
    id: 561,
    gender: 'Male',
    loanAmount: 5500000,
    loanType: 'Unsecured',
    country: 'Nigeria',
    university: 'University of Ilorin',
    course: 'Computer Science & IT'
  },
  {
    id: 562,
    gender: 'Female',
    loanAmount: 5500000,
    loanType: 'Unsecured',
    country: 'Mozambique',
    university: 'Universidade Eduardo Mondlane',
    course: 'Computer Science & IT; Engineering & Technology; Natural Sciences'
  },
  {
    id: 563,
    gender: 'Male',
    loanAmount: 5500000,
    loanType: 'Unsecured',
    country: 'North Macedonia',
    university: 'Ss Cyril and Methodius University Skopje',
    course: 'Business & Management; Public Policy'
  },
  {
    id: 564,
    gender: 'Female',
    loanAmount: 5500000,
    loanType: 'Unsecured',
    country: 'New Zealand',
    university: 'Victoria University of Wellington',
    course: 'Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences'
  },
  {
    id: 565,
    gender: 'Male',
    loanAmount: 6000000,
    loanType: 'Unsecured',
    country: 'New Zealand',
    university: 'University of Waikato',
    course: 'Computer Science & IT'
  },
  {
    id: 566,
    gender: 'Female',
    loanAmount: 6000000,
    loanType: 'Unsecured',
    country: 'North Macedonia',
    university: 'Ss Cyril and Methodius University Skopje',
    course: 'Business & Management; Public Policy'
  },
  {
    id: 567,
    gender: 'Male',
    loanAmount: 6000000,
    loanType: 'Unsecured',
    country: 'North Macedonia',
    university: 'Ss Cyril and Methodius University Skopje',
    course: 'Business & Management; Natural Sciences; Social Sciences'
  },
  {
    id: 568,
    gender: 'Female',
    loanAmount: 6000000,
    loanType: 'Unsecured',
    country: 'Netherlands',
    university: 'University of Amsterdam',
    course: 'Computer Science & IT; Engineering & Technology; Natural Sciences'
  },
  {
    id: 569,
    gender: 'Male',
    loanAmount: 6000000,
    loanType: 'Unsecured',
    country: 'New Zealand',
    university: 'Victoria University of Wellington',
    course: 'Computer Science & IT; Engineering & Technology; Natural Sciences'
  },
  {
    id: 570,
    gender: 'Female',
    loanAmount: 6000000,
    loanType: 'Unsecured',
    country: 'North Macedonia',
    university: 'Ss Cyril and Methodius University Skopje',
    course: 'Computer Science & IT; Engineering & Technology'
  },
  {
    id: 571,
    gender: 'Male',
    loanAmount: 6000000,
    loanType: 'Unsecured',
    country: 'Nigeria',
    university: 'Federal University of Technology Akure',
    course: 'Business & Management; Natural Sciences; Social Sciences'
  },
  {
    id: 572,
    gender: 'Female',
    loanAmount: 6000000,
    loanType: 'Unsecured',
    country: 'Northern Cyprus',
    university: 'Near East University',
    course: 'Computer Science & IT; Engineering & Technology; Natural Sciences'
  },
  {
    id: 573,
    gender: 'Male',
    loanAmount: 6000000,
    loanType: 'Unsecured',
    country: 'Nigeria',
    university: 'Federal University of Technology Minna',
    course: 'Computer Science & IT; Engineering & Technology; Natural Sciences'
  },
  {
    id: 574,
    gender: 'Female',
    loanAmount: 6000000,
    loanType: 'Unsecured',
    country: 'North Macedonia',
    university: 'Ss Cyril and Methodius University Skopje',
    course: 'Computer Science & IT; Engineering & Technology; Natural Sciences'
  },
  {
    id: 575,
    gender: 'Male',
    loanAmount: 6000000,
    loanType: 'Unsecured',
    country: 'New Zealand',
    university: 'Auckland University of Technology',
    course: 'Computer Science & IT; Engineering & Technology'
  },
  {
    id: 576,
    gender: 'Female',
    loanAmount: 6000000,
    loanType: 'Unsecured',
    country: 'Northern Cyprus',
    university: 'Eastern Mediterranean University',
    course: 'Computer Science & IT'
  },
  {
    id: 577,
    gender: 'Male',
    loanAmount: 6000000,
    loanType: 'Unsecured',
    country: 'Northern Cyprus',
    university: 'Eastern Mediterranean University',
    course: 'Computer Science & IT'
  },
  {
    id: 578,
    gender: 'Female',
    loanAmount: 6000000,
    loanType: 'Unsecured',
    country: 'Northern Cyprus',
    university: 'Near East University',
    course: 'Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences'
  },
  {
    id: 579,
    gender: 'Male',
    loanAmount: 6100000,
    loanType: 'Unsecured',
    country: 'Nigeria',
    university: 'Ladoke Akintola University of Technology',
    course: 'Computer Science & IT; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 580,
    gender: 'Female',
    loanAmount: 6100000,
    loanType: 'Unsecured',
    country: 'Norway',
    university: 'Inland Norway University of Applied Sciences',
    course: 'Business & Management; Public Policy'
  },
  {
    id: 581,
    gender: 'Male',
    loanAmount: 6100000,
    loanType: 'Unsecured',
    country: 'Norway',
    university: 'Western Norway University of Applied Sciences',
    course: 'Computer Science & IT'
  },
  {
    id: 582,
    gender: 'Female',
    loanAmount: 6100000,
    loanType: 'Unsecured',
    country: 'New Zealand',
    university: 'University of Otago',
    course: 'Business & Management; Public Policy'
  },
  {
    id: 583,
    gender: 'Male',
    loanAmount: 6100000,
    loanType: 'Unsecured',
    country: 'Northern Cyprus',
    university: 'Eastern Mediterranean University',
    course: 'Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences'
  },
  {
    id: 584,
    gender: 'Female',
    loanAmount: 6100000,
    loanType: 'Unsecured',
    country: 'North Macedonia',
    university: 'Ss Cyril and Methodius University Skopje',
    course: 'Computer Science & IT; Natural Sciences'
  },
  {
    id: 585,
    gender: 'Male',
    loanAmount: 6100000,
    loanType: 'Unsecured',
    country: 'New Zealand',
    university: 'University of Waikato',
    course: 'Computer Science & IT; Engineering & Technology; Medicine & Health; Natural Sciences'
  },
  {
    id: 586,
    gender: 'Female',
    loanAmount: 6100000,
    loanType: 'Unsecured',
    country: 'Nigeria',
    university: 'Covenant University Ota',
    course: 'Computer Science & IT; Natural Sciences'
  },
  {
    id: 587,
    gender: 'Male',
    loanAmount: 6100000,
    loanType: 'Unsecured',
    country: 'New Zealand',
    university: 'Auckland University of Technology',
    course: 'DESIGN; LAW; MANAGEMENT; MEDICAL; STEM'
  },
  {
    id: 588,
    gender: 'Female',
    loanAmount: 6100000,
    loanType: 'Unsecured',
    country: 'New Zealand',
    university: 'Lincoln University',
    course: 'Computer Science & IT'
  },
  {
    id: 589,
    gender: 'Male',
    loanAmount: 6100000,
    loanType: 'Unsecured',
    country: 'North Macedonia',
    university: 'Ss Cyril and Methodius University Skopje',
    course: 'Computer Science & IT; Natural Sciences'
  },
  {
    id: 590,
    gender: 'Female',
    loanAmount: 6100000,
    loanType: 'Unsecured',
    country: 'Nigeria',
    university: 'Bayero University Kano',
    course: 'Computer Science & IT; Natural Sciences'
  },
  {
    id: 591,
    gender: 'Male',
    loanAmount: 6100000,
    loanType: 'Unsecured',
    country: 'North Macedonia',
    university: 'Ss Cyril and Methodius University Skopje',
    course: 'Computer Science & IT; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 592,
    gender: 'Female',
    loanAmount: 6100000,
    loanType: 'Unsecured',
    country: 'North Macedonia',
    university: 'Ss Cyril and Methodius University Skopje',
    course: 'Computer Science & IT; Natural Sciences'
  },
  {
    id: 593,
    gender: 'Male',
    loanAmount: 6200000,
    loanType: 'Unsecured',
    country: 'North Macedonia',
    university: 'Ss Cyril and Methodius University Skopje',
    course: 'Computer Science & IT; Engineering & Technology; Natural Sciences'
  },
  {
    id: 594,
    gender: 'Female',
    loanAmount: 6200000,
    loanType: 'Unsecured',
    country: 'Norway',
    university: 'University of Tromso',
    course: 'DESIGN; STEM'
  },
  {
    id: 595,
    gender: 'Male',
    loanAmount: 6200000,
    loanType: 'Unsecured',
    country: 'Norway',
    university: 'Norwegian University of Life Sciences (UMB)',
    course: 'Computer Science & IT; Engineering & Technology'
  },
  {
    id: 596,
    gender: 'Female',
    loanAmount: 6200000,
    loanType: 'Unsecured',
    country: 'Oman',
    university: 'Sultan Qaboos University',
    course: 'DESIGN; LAW; MANAGEMENT; MEDICAL; STEM'
  },
  {
    id: 597,
    gender: 'Male',
    loanAmount: 6200000,
    loanType: 'Unsecured',
    country: 'North Macedonia',
    university: 'Ss Cyril and Methodius University Skopje',
    course: 'Computer Science & IT; Natural Sciences'
  },
  {
    id: 598,
    gender: 'Female',
    loanAmount: 6200000,
    loanType: 'Unsecured',
    country: 'Norway',
    university: 'Western Norway University of Applied Sciences',
    course: 'Computer Science & IT; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 599,
    gender: 'Male',
    loanAmount: 6200000,
    loanType: 'Unsecured',
    country: 'Pakistan',
    university: 'University of Lahore',
    course: 'Design; Management; Medical; STEM'
  },
  {
    id: 600,
    gender: 'Female',
    loanAmount: 6200000,
    loanType: 'Unsecured',
    country: 'Oman',
    university: 'Dhofar University',
    course: 'Computer Science & IT; Engineering & Technology; Natural Sciences'
  },
  {
    id: 601,
    gender: 'Male',
    loanAmount: 6200000,
    loanType: 'Unsecured',
    country: 'Oman',
    university: 'Dhofar University',
    course: 'DESIGN; LAW; MANAGEMENT; MEDICAL; STEM'
  },
  {
    id: 602,
    gender: 'Female',
    loanAmount: 6200000,
    loanType: 'Unsecured',
    country: 'Oman',
    university: 'Sohar University',
    course: 'Design; Management; Medical; STEM'
  },
  {
    id: 603,
    gender: 'Male',
    loanAmount: 6200000,
    loanType: 'Unsecured',
    country: 'Oman',
    university: 'Dhofar University',
    course: 'Computer Science & IT; Natural Sciences'
  },
  {
    id: 604,
    gender: 'Female',
    loanAmount: 6200000,
    loanType: 'Unsecured',
    country: 'Oman',
    university: 'Sohar University',
    course: 'Computer Science & IT; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 605,
    gender: 'Male',
    loanAmount: 6200000,
    loanType: 'Unsecured',
    country: 'North Macedonia',
    university: 'Ss Cyril and Methodius University Skopje',
    course: 'Computer Science & IT; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 606,
    gender: 'Female',
    loanAmount: 6200000,
    loanType: 'Unsecured',
    country: 'Norway',
    university: 'Inland Norway University of Applied Sciences',
    course: 'Computer Science & IT; Engineering & Technology; Natural Sciences'
  },
  {
    id: 607,
    gender: 'Male',
    loanAmount: 6200001,
    loanType: 'Unsecured',
    country: 'Pakistan',
    university: 'Pakistan Institute of Engineering and Applied Sciences (PIEAS)',
    course: 'Computer Science & IT; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 608,
    gender: 'Female',
    loanAmount: 6200001,
    loanType: 'Unsecured',
    country: 'Norway',
    university: 'Høyskolen Kristiania',
    course: 'DESIGN; LAW; MANAGEMENT; MEDICAL; STEM'
  },
  {
    id: 609,
    gender: 'Male',
    loanAmount: 6200001,
    loanType: 'Unsecured',
    country: 'Palestine',
    university: 'Islamic University of Gaza',
    course: 'DESIGN; STEM'
  },
  {
    id: 610,
    gender: 'Female',
    loanAmount: 6200001,
    loanType: 'Unsecured',
    country: 'Norway',
    university: 'Norwegian School of Economics',
    course: 'Computer Science & IT; Engineering & Technology; Natural Sciences'
  },
  {
    id: 611,
    gender: 'Male',
    loanAmount: 6200001,
    loanType: 'Unsecured',
    country: 'Oman',
    university: 'University of Nizwa',
    course: 'Design; Medical and Management; STEM'
  },
  {
    id: 612,
    gender: 'Female',
    loanAmount: 6200001,
    loanType: 'Unsecured',
    country: 'Palestine',
    university: 'Al-Quds University',
    course: 'Design; Medical and Management; STEM'
  },
  {
    id: 613,
    gender: 'Male',
    loanAmount: 6200001,
    loanType: 'Unsecured',
    country: 'Norway',
    university: 'University of Agder',
    course: 'Computer Science & IT; Natural Sciences'
  },
  {
    id: 614,
    gender: 'Female',
    loanAmount: 6200001,
    loanType: 'Unsecured',
    country: 'Palestine',
    university: 'Islamic University of Gaza',
    course: 'DESIGN; LAW; MANAGEMENT; MEDICAL; STEM'
  },
  {
    id: 615,
    gender: 'Male',
    loanAmount: 6200001,
    loanType: 'Unsecured',
    country: 'Palestine',
    university: 'Islamic University of Gaza',
    course: 'DESIGN; STEM'
  },
  {
    id: 616,
    gender: 'Female',
    loanAmount: 6200001,
    loanType: 'Unsecured',
    country: 'Paraguay',
    university: 'Universidad Nacional de Asuncion',
    course: 'Computer Science & IT; Natural Sciences'
  },
  {
    id: 617,
    gender: 'Male',
    loanAmount: 6200001,
    loanType: 'Unsecured',
    country: 'Palestine',
    university: 'Islamic University of Gaza',
    course: 'Computer Science & IT; Engineering & Technology; Natural Sciences; Social Sciences'
  },
  {
    id: 618,
    gender: 'Female',
    loanAmount: 6200001,
    loanType: 'Unsecured',
    country: 'Palestine',
    university: 'Birzeit University',
    course: 'Design; STEM; and Management'
  },
  {
    id: 619,
    gender: 'Male',
    loanAmount: 6200001,
    loanType: 'Unsecured',
    country: 'Paraguay',
    university: 'Universidad Nacional de Asuncion',
    course: 'DESIGN; LAW; MANAGEMENT; MEDICAL; STEM'
  },
  {
    id: 620,
    gender: 'Female',
    loanAmount: 6200001,
    loanType: 'Unsecured',
    country: 'Norway',
    university: 'University of Stavanger',
    course: 'DESIGN; STEM'
  },
  {
    id: 621,
    gender: 'Male',
    loanAmount: 6850000,
    loanType: 'Unsecured',
    country: 'Oman',
    university: 'Sohar University',
    course: 'DESIGN; STEM'
  },
  {
    id: 622,
    gender: 'Female',
    loanAmount: 6850000,
    loanType: 'Unsecured',
    country: 'Palestine',
    university: 'Birzeit University',
    course: 'ECONOMICS; LAW; MANAGEMENT; STEM'
  },
  {
    id: 623,
    gender: 'Male',
    loanAmount: 6850000,
    loanType: 'Unsecured',
    country: 'Norway',
    university: 'Norwegian University of Science & Technology',
    course: 'ECONOMICS; LAW; MANAGEMENT; STEM'
  },
  {
    id: 624,
    gender: 'Female',
    loanAmount: 6850000,
    loanType: 'Unsecured',
    country: 'Palestine',
    university: 'Birzeit University',
    course: 'Design; Management; Medical; STEM'
  },
  {
    id: 625,
    gender: 'Male',
    loanAmount: 6850000,
    loanType: 'Unsecured',
    country: 'Paraguay',
    university: 'Universidad Nacional de Asuncion',
    course: 'Design; Management; Medical; STEM'
  },
  {
    id: 626,
    gender: 'Female',
    loanAmount: 6850000,
    loanType: 'Unsecured',
    country: 'Paraguay',
    university: 'Universidad Nacional de Asuncion',
    course: 'Design; Medical and Management; STEM'
  },
  {
    id: 627,
    gender: 'Male',
    loanAmount: 6850000,
    loanType: 'Unsecured',
    country: 'Paraguay',
    university: 'Universidad Nacional de Asuncion',
    course: 'Design; STEM; and Management'
  },
  {
    id: 628,
    gender: 'Female',
    loanAmount: 6850000,
    loanType: 'Unsecured',
    country: 'Oman',
    university: 'University of Nizwa',
    course: 'Design; STEM; and Management'
  },
  {
    id: 629,
    gender: 'Male',
    loanAmount: 6850000,
    loanType: 'Unsecured',
    country: 'Peru',
    university: 'Universidad Nacional Agraria La Molina',
    course: 'Design; Medical and Management; STEM'
  },
  {
    id: 630,
    gender: 'Female',
    loanAmount: 6850000,
    loanType: 'Unsecured',
    country: 'Peru',
    university: 'Universidad Cientifica del Sur',
    course: 'Design; Medical and Management; STEM'
  },
  {
    id: 631,
    gender: 'Male',
    loanAmount: 6850000,
    loanType: 'Unsecured',
    country: 'Paraguay',
    university: 'Universidad Nacional de Asuncion',
    course: 'Design; Medical and Management; STEM'
  },
  {
    id: 632,
    gender: 'Female',
    loanAmount: 6850000,
    loanType: 'Unsecured',
    country: 'Paraguay',
    university: 'Universidad Nacional de Asuncion',
    course: 'ECONOMICS; LAW; MANAGEMENT; STEM'
  },
  {
    id: 633,
    gender: 'Male',
    loanAmount: 6850000,
    loanType: 'Unsecured',
    country: 'Paraguay',
    university: 'Universidad Nacional de Asuncion',
    course: 'ECONOMICS; LAW; MANAGEMENT; STEM'
  },
  {
    id: 634,
    gender: 'Female',
    loanAmount: 6850000,
    loanType: 'Unsecured',
    country: 'Pakistan',
    university: 'University of Sindh',
    course: 'Design; STEM; and Management'
  },
  {
    id: 635,
    gender: 'Male',
    loanAmount: 7000000,
    loanType: 'Unsecured',
    country: 'Pakistan',
    university: 'Bahauddin Zakariya University',
    course: 'DESIGN; STEM'
  },
  {
    id: 636,
    gender: 'Female',
    loanAmount: 7000000,
    loanType: 'Unsecured',
    country: 'Pakistan',
    university: 'Mehran University of Engineering & Technology',
    course: 'Design; Management; Medical; STEM'
  },
  {
    id: 637,
    gender: 'Male',
    loanAmount: 7000000,
    loanType: 'Unsecured',
    country: 'Paraguay',
    university: 'Universidad Nacional de Asuncion',
    course: 'Design; STEM; and Management'
  },
  {
    id: 638,
    gender: 'Female',
    loanAmount: 7000000,
    loanType: 'Unsecured',
    country: 'Pakistan',
    university: 'Government College University Faisalabad',
    course: 'ECONOMICS; LAW; STEM'
  },
  {
    id: 639,
    gender: 'Male',
    loanAmount: 7000000,
    loanType: 'Unsecured',
    country: 'Paraguay',
    university: 'Universidad Nacional de Asuncion',
    course: 'ECONOMICS; LAW; MANAGEMENT; STEM'
  },
  {
    id: 640,
    gender: 'Female',
    loanAmount: 7000000,
    loanType: 'Unsecured',
    country: 'Paraguay',
    university: 'Universidad Nacional de Asuncion',
    course: 'Design; STEM; and Management'
  },
  {
    id: 641,
    gender: 'Male',
    loanAmount: 7000000,
    loanType: 'Unsecured',
    country: 'Paraguay',
    university: 'Universidad Nacional de Asuncion',
    course: 'Design; STEM; and Management'
  },
  {
    id: 642,
    gender: 'Female',
    loanAmount: 7000000,
    loanType: 'Unsecured',
    country: 'Paraguay',
    university: 'Universidad Nacional de Asuncion',
    course: 'ECONOMICS; LAW; MANAGEMENT; STEM'
  },
  {
    id: 643,
    gender: 'Male',
    loanAmount: 7000000,
    loanType: 'Unsecured',
    country: 'Palestine',
    university: 'Al-Quds University',
    course: 'Design; Medical and Management; STEM'
  },
  {
    id: 644,
    gender: 'Female',
    loanAmount: 7000000,
    loanType: 'Unsecured',
    country: 'Poland',
    university: 'Wroclaw University of Science and Technology (WUST)',
    course: 'Design; STEM; and Management'
  },
  {
    id: 645,
    gender: 'Male',
    loanAmount: 7000000,
    loanType: 'Unsecured',
    country: 'Peru',
    university: 'Universidad Cientifica del Sur',
    course: 'ECONOMICS; MANAGEMENT; STEM'
  },
  {
    id: 646,
    gender: 'Female',
    loanAmount: 7000000,
    loanType: 'Unsecured',
    country: 'Palestine',
    university: 'An Najah National University',
    course: 'ECONOMICS; LAW; MEDICAL; STEM'
  },
  {
    id: 647,
    gender: 'Male',
    loanAmount: 7000000,
    loanType: 'Unsecured',
    country: 'Peru',
    university: 'Universidad de Lima',
    course: 'Design; STEM; and Management'
  },
  {
    id: 648,
    gender: 'Female',
    loanAmount: 7000000,
    loanType: 'Unsecured',
    country: 'Peru',
    university: 'Universidad de Lima',
    course: 'ECONOMICS; LAW; MANAGEMENT; STEM'
  },
  {
    id: 649,
    gender: 'Male',
    loanAmount: 7500000,
    loanType: 'Unsecured',
    country: 'Poland',
    university: 'Warsaw University of Life Sciences (Agricultural University)',
    course: 'ECONOMICS; LAW; STEM'
  },
  {
    id: 650,
    gender: 'Female',
    loanAmount: 7500000,
    loanType: 'Unsecured',
    country: 'Palestine',
    university: 'Islamic University of Gaza',
    course: 'Design; STEM; and Management'
  },
  {
    id: 651,
    gender: 'Male',
    loanAmount: 7500000,
    loanType: 'Unsecured',
    country: 'Poland',
    university: 'Agricultural University of Krakow',
    course: 'ECONOMICS; LAW; MEDICAL; STEM'
  },
  {
    id: 652,
    gender: 'Female',
    loanAmount: 7500000,
    loanType: 'Unsecured',
    country: 'Portugal',
    university: 'Universidade da Beira Interior',
    course: 'ECONOMICS; LAW; MEDICAL; STEM'
  },
  {
    id: 653,
    gender: 'Male',
    loanAmount: 7500000,
    loanType: 'Unsecured',
    country: 'Peru',
    university: 'Universidad Nacional Mayor de San Marcos',
    course: 'ECONOMICS; LAW; MEDICAL; STEM'
  },
  {
    id: 654,
    gender: 'Female',
    loanAmount: 7500000,
    loanType: 'Unsecured',
    country: 'Portugal',
    university: 'Universidade dos Acores',
    course: 'ECONOMICS; LAW; MANAGEMENT; STEM'
  },
  {
    id: 655,
    gender: 'Male',
    loanAmount: 7500000,
    loanType: 'Unsecured',
    country: 'Poland',
    university: 'Poznan University of Medical Sciences',
    course: 'ECONOMICS; MANAGEMENT; STEM'
  },
  {
    id: 656,
    gender: 'Female',
    loanAmount: 7500000,
    loanType: 'Unsecured',
    country: 'Peru',
    university: 'Universidad Nacional Mayor de San Marcos',
    course: 'ECONOMICS; LAW; MANAGEMENT; STEM'
  },
  {
    id: 657,
    gender: 'Male',
    loanAmount: 7500000,
    loanType: 'Unsecured',
    country: 'Philippines',
    university: 'University of the Philippines Diliman',
    course: 'ECONOMICS; LAW; MANAGEMENT; STEM'
  },
  {
    id: 658,
    gender: 'Female',
    loanAmount: 7500000,
    loanType: 'Unsecured',
    country: 'Philippines',
    university: 'College of Nursing and Allied Health Sciences',
    course: 'Design; STEM; and Management'
  },
  {
    id: 659,
    gender: 'Male',
    loanAmount: 7500000,
    loanType: 'Unsecured',
    country: 'Portugal',
    university: 'Instituto Politecnico do Porto',
    course: 'Design; STEM; and Management'
  },
  {
    id: 660,
    gender: 'Female',
    loanAmount: 7500000,
    loanType: 'Unsecured',
    country: 'Poland',
    university: 'Catholic University of Lublin',
    course: 'Design; STEM; and Management'
  },
  {
    id: 661,
    gender: 'Male',
    loanAmount: 7500000,
    loanType: 'Unsecured',
    country: 'Peru',
    university: 'Universidad Peruana de Ciencias Aplicadas',
    course: 'ECONOMICS; LAW; MANAGEMENT; STEM'
  },
  {
    id: 662,
    gender: 'Female',
    loanAmount: 7500000,
    loanType: 'Unsecured',
    country: 'Qatar',
    university: 'Hamad Bin Khalifa University',
    course: 'ECONOMICS; MEDICAL; STEM'
  },
  {
    id: 663,
    gender: 'Male',
    loanAmount: 7750000,
    loanType: 'Unsecured',
    country: 'Portugal',
    university: 'ISCTE Instituto Universitario de Lisboa',
    course: 'ECONOMICS; LAW; MEDICAL; STEM'
  },
  {
    id: 664,
    gender: 'Female',
    loanAmount: 7750000,
    loanType: 'Unsecured',
    country: 'Philippines',
    university: 'College of Nursing and Allied Health Sciences',
    course: 'ECONOMICS; STEM'
  },
  {
    id: 665,
    gender: 'Male',
    loanAmount: 7750000,
    loanType: 'Unsecured',
    country: 'Philippines',
    university: 'De La Salle University Manila',
    course: 'ECONOMICS; LAW; STEM'
  },
  {
    id: 666,
    gender: 'Female',
    loanAmount: 7750000,
    loanType: 'Unsecured',
    country: 'Philippines',
    university: 'University of the Philippines',
    course: 'ECONOMICS; LAW; MANAGEMENT; STEM'
  },
  {
    id: 667,
    gender: 'Male',
    loanAmount: 7750000,
    loanType: 'Unsecured',
    country: 'Poland',
    university: 'Poznan University of Medical Sciences',
    course: 'ECONOMICS; LAW; STEM'
  },
  {
    id: 668,
    gender: 'Female',
    loanAmount: 7750000,
    loanType: 'Unsecured',
    country: 'Portugal',
    university: 'Instituto Politecnico de Santarem',
    course: 'Engineering & Technology'
  },
  {
    id: 669,
    gender: 'Male',
    loanAmount: 7750000,
    loanType: 'Unsecured',
    country: 'Philippines',
    university: 'University of the Philippines',
    course: 'Engineering & Technology; Natural Sciences'
  },
  {
    id: 670,
    gender: 'Female',
    loanAmount: 7750000,
    loanType: 'Unsecured',
    country: 'Poland',
    university: 'Military University of Technology in Warsaw',
    course: 'ECONOMICS; STEM'
  },
  {
    id: 671,
    gender: 'Male',
    loanAmount: 7750000,
    loanType: 'Unsecured',
    country: 'Portugal',
    university: 'Instituto Politecnico de Santarem',
    course: 'ECONOMICS; LAW; STEM'
  },
  {
    id: 672,
    gender: 'Female',
    loanAmount: 7750000,
    loanType: 'Unsecured',
    country: 'Portugal',
    university: 'Instituto Politecnico de Lisboa',
    course: 'ECONOMICS; MANAGEMENT; STEM'
  },
  {
    id: 673,
    gender: 'Male',
    loanAmount: 7750000,
    loanType: 'Unsecured',
    country: 'Poland',
    university: 'Adam Mickiewicz University',
    course: 'Engineering & Technology; Natural Sciences'
  },
  {
    id: 674,
    gender: 'Female',
    loanAmount: 7750000,
    loanType: 'Unsecured',
    country: 'Qatar',
    university: 'Qatar University',
    course: 'ECONOMICS; LAW; MEDICAL; STEM'
  },
  {
    id: 675,
    gender: 'Male',
    loanAmount: 7750000,
    loanType: 'Unsecured',
    country: 'Qatar',
    university: 'Hamad Bin Khalifa University',
    course: 'Engineering & Technology'
  },
  {
    id: 676,
    gender: 'Female',
    loanAmount: 7750000,
    loanType: 'Unsecured',
    country: 'Romania',
    university: 'Carol Davila University of Medicine and Pharmacy',
    course: 'Engineering & Technology; Natural Sciences'
  },
  {
    id: 677,
    gender: 'Male',
    loanAmount: 7750000,
    loanType: 'Unsecured',
    country: 'Qatar',
    university: 'Hamad Bin Khalifa University',
    course: 'ECONOMICS; STEM'
  },
  {
    id: 678,
    gender: 'Female',
    loanAmount: 8000000,
    loanType: 'Unsecured',
    country: 'Portugal',
    university: 'Universidade Catolica Portuguesa',
    course: 'ECONOMICS; MEDICAL; STEM'
  },
  {
    id: 679,
    gender: 'Male',
    loanAmount: 8000000,
    loanType: 'Unsecured',
    country: 'Romania',
    university: 'Politehnica University Timisoara',
    course: 'ECONOMICS; MEDICAL; STEM'
  },
  {
    id: 680,
    gender: 'Female',
    loanAmount: 8000000,
    loanType: 'Unsecured',
    country: 'Portugal',
    university: 'Universidade de Coimbra',
    course: 'Engineering & Technology'
  },
  {
    id: 681,
    gender: 'Male',
    loanAmount: 8000000,
    loanType: 'Unsecured',
    country: 'Russia',
    university: 'Saint Petersburg State Electrotechnical University',
    course: 'ECONOMICS; MANAGEMENT; STEM'
  },
  {
    id: 682,
    gender: 'Female',
    loanAmount: 8000000,
    loanType: 'Unsecured',
    country: 'Poland',
    university: 'University of Warsaw',
    course: 'Engineering & Technology'
  },
  {
    id: 683,
    gender: 'Male',
    loanAmount: 8000000,
    loanType: 'Unsecured',
    country: 'Poland',
    university: 'Tadeusz Kosciuszko Cracow University of Technology',
    course: 'Engineering & Technology'
  },
  {
    id: 684,
    gender: 'Female',
    loanAmount: 8000000,
    loanType: 'Unsecured',
    country: 'Russia',
    university: 'Immanuel Kant Baltic Federal University',
    course: 'Engineering & Technology'
  },
  {
    id: 685,
    gender: 'Male',
    loanAmount: 8000000,
    loanType: 'Unsecured',
    country: 'Poland',
    university: 'Jagiellonian University',
    course: 'Healthcare & MBA (Within 2 yrs of UG); STEM'
  },
  {
    id: 686,
    gender: 'Female',
    loanAmount: 8000000,
    loanType: 'Unsecured',
    country: 'Portugal',
    university: 'Universidade de Coimbra',
    course: 'ECONOMICS; MANAGEMENT; STEM'
  },
  {
    id: 687,
    gender: 'Male',
    loanAmount: 8000000,
    loanType: 'Unsecured',
    country: 'Romania',
    university: 'Gheorghe Asachi Technical University',
    course: 'ECONOMICS; STEM'
  },
  {
    id: 688,
    gender: 'Female',
    loanAmount: 8000000,
    loanType: 'Unsecured',
    country: 'Portugal',
    university: 'Universidade da Beira Interior',
    course: 'Engineering & Technology; Natural Sciences'
  },
  {
    id: 689,
    gender: 'Male',
    loanAmount: 8000000,
    loanType: 'Unsecured',
    country: 'Qatar',
    university: 'Qatar University',
    course: 'Engineering & Technology; Natural Sciences'
  },
  {
    id: 690,
    gender: 'Female',
    loanAmount: 8000000,
    loanType: 'Unsecured',
    country: 'Romania',
    university: 'Babes-Bolyai University',
    course: 'LAW; MANAGEMENT'
  },
  {
    id: 691,
    gender: 'Male',
    loanAmount: 8000000,
    loanType: 'Unsecured',
    country: 'Rwanda',
    university: 'University of Rwanda',
    course: 'Engineering & Technology'
  },
  {
    id: 692,
    gender: 'Female',
    loanAmount: 8000001,
    loanType: 'Unsecured',
    country: 'Rwanda',
    university: 'University of Rwanda',
    course: 'ECONOMICS; MEDICAL; STEM'
  },
  {
    id: 693,
    gender: 'Male',
    loanAmount: 8000001,
    loanType: 'Unsecured',
    country: 'Qatar',
    university: 'Qatar University',
    course: 'ECONOMICS; STEM'
  },
  {
    id: 694,
    gender: 'Female',
    loanAmount: 8000001,
    loanType: 'Unsecured',
    country: 'Romania',
    university: 'Oradea University',
    course: 'Engineering & Technology; Natural Sciences'
  },
  {
    id: 695,
    gender: 'Male',
    loanAmount: 8000001,
    loanType: 'Unsecured',
    country: 'Russia',
    university: 'Tomsk Polytechnic University',
    course: 'Engineering & Technology; Natural Sciences'
  },
  {
    id: 696,
    gender: 'Female',
    loanAmount: 8000001,
    loanType: 'Unsecured',
    country: 'Qatar',
    university: 'Hamad Bin Khalifa University',
    course: 'ECONOMICS; MEDICAL; STEM'
  },
  {
    id: 697,
    gender: 'Male',
    loanAmount: 8000001,
    loanType: 'Unsecured',
    country: 'Russia',
    university: 'ITMO University',
    course: 'LAW and MEDICAL; MANAGEMENT; STEM'
  },
  {
    id: 698,
    gender: 'Female',
    loanAmount: 8000001,
    loanType: 'Unsecured',
    country: 'Romania',
    university: 'Gheorghe Asachi Technical University',
    course: 'LAW and MEDICAL; MANAGEMENT; STEM'
  },
  {
    id: 699,
    gender: 'Male',
    loanAmount: 8000001,
    loanType: 'Unsecured',
    country: 'Russia',
    university: 'Saint Petersburg State University',
    course: 'ECONOMICS; STEM'
  },
  {
    id: 700,
    gender: 'Female',
    loanAmount: 8000001,
    loanType: 'Unsecured',
    country: 'Saint Vincent and the Grenadines',
    university: 'St. James School of Medicine',
    course: 'Engineering & Technology; Natural Sciences'
  },
  {
    id: 701,
    gender: 'Male',
    loanAmount: 8000001,
    loanType: 'Unsecured',
    country: 'Qatar',
    university: 'Hamad Bin Khalifa University',
    course: 'LAW; MANAGEMENT'
  },
  {
    id: 702,
    gender: 'Female',
    loanAmount: 8000001,
    loanType: 'Unsecured',
    country: 'Romania',
    university: 'West University of Timisoara',
    course: 'Healthcare & MBA (Within 2 yrs of UG); STEM'
  },
  {
    id: 703,
    gender: 'Male',
    loanAmount: 8000001,
    loanType: 'Unsecured',
    country: 'Saudi Arabia',
    university: 'Al Imam Muhammad Ibn Saud Islamic University',
    course: 'LAW; MANAGEMENT; MEDICAL'
  },
  {
    id: 704,
    gender: 'Female',
    loanAmount: 8000001,
    loanType: 'Unsecured',
    country: 'Russia',
    university: 'Novosibirsk State University',
    course: 'Engineering & Technology'
  },
  {
    id: 705,
    gender: 'Male',
    loanAmount: 8000001,
    loanType: 'Unsecured',
    country: 'Rwanda',
    university: 'University of Rwanda',
    course: 'Healthcare & MBA (Within 2 yrs of UG); STEM'
  },
  {
    id: 706,
    gender: 'Female',
    loanAmount: 8250000,
    loanType: 'Unsecured',
    country: 'Russia',
    university: 'Russian Presidential Academy of National Economy and Public Administration',
    course: 'LAW; MANAGEMENT; MEDICAL'
  },
  {
    id: 707,
    gender: 'Male',
    loanAmount: 8250000,
    loanType: 'Unsecured',
    country: 'Rwanda',
    university: 'University of Rwanda',
    course: 'Healthcare & MBA (Within 2 yrs of UG); STEM'
  },
  {
    id: 708,
    gender: 'Female',
    loanAmount: 8250000,
    loanType: 'Unsecured',
    country: 'Romania',
    university: 'Dunarea de Jos University Galati',
    course: 'LAW; MANAGEMENT'
  },
  {
    id: 709,
    gender: 'Male',
    loanAmount: 8250000,
    loanType: 'Unsecured',
    country: 'Rwanda',
    university: 'University of Rwanda',
    course: 'Engineering & Technology; Natural Sciences'
  },
  {
    id: 710,
    gender: 'Female',
    loanAmount: 8250000,
    loanType: 'Unsecured',
    country: 'Rwanda',
    university: 'University of Rwanda',
    course: 'LAW and MEDICAL; MANAGEMENT; STEM'
  },
  {
    id: 711,
    gender: 'Male',
    loanAmount: 8250000,
    loanType: 'Unsecured',
    country: 'Saudi Arabia',
    university: 'Jazan University',
    course: 'LAW; MANAGEMENT'
  },
  {
    id: 712,
    gender: 'Female',
    loanAmount: 8250000,
    loanType: 'Unsecured',
    country: 'Saudi Arabia',
    university: 'Imam Muhammad Ibn Saud Islamic University - IMSIU',
    course: 'Engineering & Technology; Natural Sciences'
  },
  {
    id: 713,
    gender: 'Male',
    loanAmount: 8250000,
    loanType: 'Unsecured',
    country: 'Saudi Arabia',
    university: 'Effat University',
    course: 'LAW; MANAGEMENT; MEDICAL'
  },
  {
    id: 714,
    gender: 'Female',
    loanAmount: 8250000,
    loanType: 'Unsecured',
    country: 'Russia',
    university: 'Tomsk State University',
    course: 'LAW; MANAGEMENT; STEM'
  },
  {
    id: 715,
    gender: 'Male',
    loanAmount: 8250000,
    loanType: 'Unsecured',
    country: 'Senegal',
    university: 'University Cheikh Anta Diop de Dakar',
    course: 'LAW; MANAGEMENT'
  },
  {
    id: 716,
    gender: 'Female',
    loanAmount: 8250000,
    loanType: 'Unsecured',
    country: 'Senegal',
    university: 'University Cheikh Anta Diop de Dakar',
    course: 'LAW; MANAGEMENT; STEM'
  },
  {
    id: 717,
    gender: 'Male',
    loanAmount: 8250000,
    loanType: 'Unsecured',
    country: 'Russia',
    university: 'MGIMO University',
    course: 'LAW; MANAGEMENT; STEM'
  },
  {
    id: 718,
    gender: 'Female',
    loanAmount: 8250000,
    loanType: 'Unsecured',
    country: 'Russia',
    university: 'National University of Science & Technology MISIS (Moscow Institute of Steel and Alloys)',
    course: 'LAW; MANAGEMENT'
  },
  {
    id: 719,
    gender: 'Male',
    loanAmount: 8250000,
    loanType: 'Unsecured',
    country: 'Rwanda',
    university: 'University of Rwanda',
    course: 'LAW; MANAGEMENT'
  },
  {
    id: 720,
    gender: 'Female',
    loanAmount: 8500000,
    loanType: 'Unsecured',
    country: 'Rwanda',
    university: 'University of Rwanda',
    course: 'LAW; MANAGEMENT'
  },
  {
    id: 721,
    gender: 'Male',
    loanAmount: 8500000,
    loanType: 'Unsecured',
    country: 'Rwanda',
    university: 'University of Rwanda',
    course: 'LAW; MANAGEMENT; STEM'
  },
  {
    id: 722,
    gender: 'Female',
    loanAmount: 8500000,
    loanType: 'Unsecured',
    country: 'Rwanda',
    university: 'University of Rwanda',
    course: 'LAW; MANAGEMENT; MEDICAL; STEM'
  },
  {
    id: 723,
    gender: 'Male',
    loanAmount: 8500000,
    loanType: 'Unsecured',
    country: 'Serbia',
    university: 'University of Belgrade',
    course: 'LAW; MANAGEMENT; MEDICAL'
  },
  {
    id: 724,
    gender: 'Female',
    loanAmount: 8500000,
    loanType: 'Unsecured',
    country: 'Saint Vincent and the Grenadines',
    university: 'St. James School of Medicine',
    course: 'LAW; MANAGEMENT; STEM'
  },
  {
    id: 725,
    gender: 'Male',
    loanAmount: 8500000,
    loanType: 'Unsecured',
    country: 'Serbia',
    university: 'University of Nis',
    course: 'LAW; MANAGEMENT; STEM'
  },
  {
    id: 726,
    gender: 'Female',
    loanAmount: 8500000,
    loanType: 'Unsecured',
    country: 'Rwanda',
    university: 'University of Rwanda',
    course: 'LAW; MANAGEMENT; MEDICAL; STEM'
  },
  {
    id: 727,
    gender: 'Male',
    loanAmount: 8500000,
    loanType: 'Unsecured',
    country: 'Serbia',
    university: 'University of Belgrade',
    course: 'LAW; MANAGEMENT; MEDICAL; STEM'
  },
  {
    id: 728,
    gender: 'Female',
    loanAmount: 8500000,
    loanType: 'Unsecured',
    country: 'Rwanda',
    university: 'University of Rwanda',
    course: 'LAW; MANAGEMENT; MEDICAL; STEM'
  },
  {
    id: 729,
    gender: 'Male',
    loanAmount: 8500000,
    loanType: 'Unsecured',
    country: 'Saudi Arabia',
    university: 'King Abdulaziz University',
    course: 'LAW; STEM'
  },
  {
    id: 730,
    gender: 'Female',
    loanAmount: 8500000,
    loanType: 'Unsecured',
    country: 'Saint Vincent and the Grenadines',
    university: 'St. James School of Medicine',
    course: 'LAW; STEM'
  },
  {
    id: 731,
    gender: 'Male',
    loanAmount: 8500000,
    loanType: 'Unsecured',
    country: 'Serbia',
    university: 'University of Novi Sad',
    course: 'LAW; STEM'
  },
  {
    id: 732,
    gender: 'Female',
    loanAmount: 8500000,
    loanType: 'Unsecured',
    country: 'Senegal',
    university: 'University Cheikh Anta Diop de Dakar',
    course: 'LAW; MANAGEMENT; MEDICAL'
  },
  {
    id: 733,
    gender: 'Male',
    loanAmount: 8500000,
    loanType: 'Unsecured',
    country: 'Saint Vincent and the Grenadines',
    university: 'St. James School of Medicine',
    course: 'LAW; STEM'
  },
  {
    id: 734,
    gender: 'Female',
    loanAmount: 9000000,
    loanType: 'Unsecured',
    country: 'Senegal',
    university: 'University Cheikh Anta Diop de Dakar',
    course: 'LAW; MANAGEMENT; STEM'
  },
  {
    id: 735,
    gender: 'Male',
    loanAmount: 9000000,
    loanType: 'Unsecured',
    country: 'Serbia',
    university: 'University of Kragujevac',
    course: 'LAW; MANAGEMENT; MEDICAL'
  },
  {
    id: 736,
    gender: 'Female',
    loanAmount: 9000000,
    loanType: 'Unsecured',
    country: 'Senegal',
    university: 'University Cheikh Anta Diop de Dakar',
    course: 'LAW; MANAGEMENT; MEDICAL; STEM'
  },
  {
    id: 737,
    gender: 'Male',
    loanAmount: 9000000,
    loanType: 'Unsecured',
    country: 'Saudi Arabia',
    university: 'Imam Abdulrahman Bin Faisal University',
    course: 'LAW; STEM'
  },
  {
    id: 738,
    gender: 'Female',
    loanAmount: 9000000,
    loanType: 'Unsecured',
    country: 'Senegal',
    university: 'University Cheikh Anta Diop de Dakar',
    course: 'LAW; MEDICAL; STEM'
  },
  {
    id: 739,
    gender: 'Male',
    loanAmount: 9000000,
    loanType: 'Unsecured',
    country: 'Senegal',
    university: 'University Cheikh Anta Diop de Dakar',
    course: 'LAW; MEDICAL; STEM'
  },
  {
    id: 740,
    gender: 'Female',
    loanAmount: 9000000,
    loanType: 'Unsecured',
    country: 'Singapore',
    university: 'Nanyang Technological University, Singapore',
    course: 'LAW; STEM'
  },
  {
    id: 741,
    gender: 'Male',
    loanAmount: 9000000,
    loanType: 'Unsecured',
    country: 'Saudi Arabia',
    university: 'Jazan University',
    course: 'LAW; MANAGEMENT; MEDICAL; STEM'
  },
  {
    id: 742,
    gender: 'Female',
    loanAmount: 9000000,
    loanType: 'Unsecured',
    country: 'Singapore',
    university: 'Singapore University of Technology and Design',
    course: 'LAW; MANAGEMENT; MEDICAL; STEM'
  },
  {
    id: 743,
    gender: 'Male',
    loanAmount: 9000000,
    loanType: 'Unsecured',
    country: 'Senegal',
    university: 'University Cheikh Anta Diop de Dakar',
    course: 'Law and Medical.; Management; STEM'
  },
  {
    id: 744,
    gender: 'Female',
    loanAmount: 9000000,
    loanType: 'Unsecured',
    country: 'Saudi Arabia',
    university: 'Al Imam Muhammad Ibn Saud Islamic University',
    course: 'LAW; MANAGEMENT; STEM'
  },
  {
    id: 745,
    gender: 'Male',
    loanAmount: 9000000,
    loanType: 'Unsecured',
    country: 'Serbia',
    university: 'University of Belgrade',
    course: 'LAW; MEDICAL; STEM'
  },
  {
    id: 746,
    gender: 'Female',
    loanAmount: 9000000,
    loanType: 'Unsecured',
    country: 'Singapore',
    university: 'Nanyang Technological University',
    course: 'LAW; MEDICAL; STEM'
  },
  {
    id: 747,
    gender: 'Male',
    loanAmount: 9000000,
    loanType: 'Unsecured',
    country: 'Slovakia',
    university: 'University of Zilina',
    course: 'LAW; MANAGEMENT; STEM'
  },
  {
    id: 748,
    gender: 'Female',
    loanAmount: 9250000,
    loanType: 'Unsecured',
    country: 'Singapore',
    university: 'Nanyang Technological University, Singapore',
    course: 'LAW; MANAGEMENT; STEM'
  },
  {
    id: 749,
    gender: 'Male',
    loanAmount: 9250000,
    loanType: 'Unsecured',
    country: 'Serbia',
    university: 'University of Novi Sad',
    course: 'LAW; STEM'
  },
  {
    id: 750,
    gender: 'Female',
    loanAmount: 9250000,
    loanType: 'Unsecured',
    country: 'Slovenia',
    university: 'University of Maribor',
    course: 'Law and Management; Medical; STEM'
  },
  {
    id: 751,
    gender: 'Male',
    loanAmount: 9250000,
    loanType: 'Unsecured',
    country: 'Singapore',
    university: 'Singapore University of Technology and Design',
    course: 'Law and Medical; Management; Medical; STEM'
  },
  {
    id: 752,
    gender: 'Female',
    loanAmount: 9250000,
    loanType: 'Unsecured',
    country: 'Senegal',
    university: 'University Cheikh Anta Diop de Dakar',
    course: 'LAW; MANAGEMENT; MEDICAL; STEM'
  },
  {
    id: 753,
    gender: 'Male',
    loanAmount: 9250000,
    loanType: 'Unsecured',
    country: 'Singapore',
    university: 'Singapore University of Technology and Design',
    course: 'LAW; MANAGEMENT; STEM'
  },
  {
    id: 754,
    gender: 'Female',
    loanAmount: 9250000,
    loanType: 'Unsecured',
    country: 'Slovakia',
    university: 'Slovak University of Technology in Bratislava',
    course: 'Law and Medical.; Management; STEM'
  },
  {
    id: 755,
    gender: 'Male',
    loanAmount: 9250000,
    loanType: 'Unsecured',
    country: 'Slovakia',
    university: 'Comenius University Bratislava',
    course: 'LAW; STEM'
  },
  {
    id: 756,
    gender: 'Female',
    loanAmount: 9250000,
    loanType: 'Unsecured',
    country: 'Serbia',
    university: 'University of Nis',
    course: 'LAW; MANAGEMENT; STEM'
  },
  {
    id: 757,
    gender: 'Male',
    loanAmount: 9250000,
    loanType: 'Unsecured',
    country: 'South Africa',
    university: 'University of South Africa',
    course: 'LAW; MANAGEMENT; STEM'
  },
  {
    id: 758,
    gender: 'Female',
    loanAmount: 9250000,
    loanType: 'Unsecured',
    country: 'Slovakia',
    university: 'Matej Bel University in Banska Bystrica',
    course: 'LAW; STEM'
  },
  {
    id: 759,
    gender: 'Male',
    loanAmount: 9250000,
    loanType: 'Unsecured',
    country: 'Singapore',
    university: 'Nanyang Technological University',
    course: 'LAW; STEM'
  },
  {
    id: 760,
    gender: 'Female',
    loanAmount: 9250000,
    loanType: 'Unsecured',
    country: 'Slovakia',
    university: 'Matej Bel University in Banska Bystrica',
    course: 'MANAGEMENT'
  },
  {
    id: 761,
    gender: 'Male',
    loanAmount: 9250000,
    loanType: 'Unsecured',
    country: 'Serbia',
    university: 'University of Belgrade',
    course: 'Law and Management; Medical; STEM'
  },
  {
    id: 762,
    gender: 'Female',
    loanAmount: 9999000,
    loanType: 'Unsecured',
    country: 'South Africa',
    university: 'Stellenbosch University',
    course: 'LAW; MEDICAL; STEM'
  },
  {
    id: 763,
    gender: 'Male',
    loanAmount: 9999000,
    loanType: 'Unsecured',
    country: 'Serbia',
    university: 'University of Nis',
    course: 'Law and Medical; Management; Medical; STEM'
  },
  {
    id: 764,
    gender: 'Female',
    loanAmount: 9999000,
    loanType: 'Unsecured',
    country: 'South Africa',
    university: 'Tshwane University of Technology',
    course: 'LAW; STEM'
  },
  {
    id: 765,
    gender: 'Male',
    loanAmount: 9999000,
    loanType: 'Unsecured',
    country: 'Singapore',
    university: 'Nanyang Technological University, Singapore',
    course: 'Law and Medical; Management; Medical; STEM'
  },
  {
    id: 766,
    gender: 'Female',
    loanAmount: 9999000,
    loanType: 'Unsecured',
    country: 'Singapore',
    university: 'Nanyang Technological University',
    course: 'Law and Management; Medical; STEM'
  },
  {
    id: 767,
    gender: 'Male',
    loanAmount: 9999000,
    loanType: 'Unsecured',
    country: 'South Africa',
    university: 'Durban University of Technology',
    course: 'LAW; STEM'
  },
  {
    id: 768,
    gender: 'Female',
    loanAmount: 9999000,
    loanType: 'Unsecured',
    country: 'Slovakia',
    university: 'Technical University of Kosice',
    course: 'Law and Medical; Management; STEM'
  },
  {
    id: 769,
    gender: 'Male',
    loanAmount: 9999000,
    loanType: 'Unsecured',
    country: 'Slovenia',
    university: 'University of Primorska',
    course: 'MANAGEMENT AND STEM'
  },
  {
    id: 770,
    gender: 'Female',
    loanAmount: 9999000,
    loanType: 'Unsecured',
    country: 'Slovakia',
    university: 'Technical University in Zvolen',
    course: 'MANAGEMENT AND STEM'
  },
  {
    id: 771,
    gender: 'Male',
    loanAmount: 9999000,
    loanType: 'Unsecured',
    country: 'Slovakia',
    university: 'Comenius University in Bratislava',
    course: 'Law and Medical.; Management; STEM'
  },
  {
    id: 772,
    gender: 'Female',
    loanAmount: 9999000,
    loanType: 'Unsecured',
    country: 'South Africa',
    university: 'University of The Witwatersrand',
    course: 'Law and Medical; Management; Medical; STEM'
  },
  {
    id: 773,
    gender: 'Male',
    loanAmount: 9999000,
    loanType: 'Unsecured',
    country: 'Slovenia',
    university: 'University of Ljubljana',
    course: 'Law and Medical; Management; Medical; STEM'
  },
  {
    id: 774,
    gender: 'Female',
    loanAmount: 9999000,
    loanType: 'Unsecured',
    country: 'South Africa',
    university: 'University of Fort Hare',
    course: 'MANAGEMENT'
  },
  {
    id: 775,
    gender: 'Male',
    loanAmount: 9999000,
    loanType: 'Unsecured',
    country: 'Spain',
    university: 'Universidad Catolica de Valencia San Vicente Martir',
    course: 'Law and Medical; Management; Medical; STEM'
  },
  {
    id: 776,
    gender: 'Female',
    loanAmount: 10000000,
    loanType: 'Unsecured',
    country: 'Slovenia',
    university: 'University of Marburg',
    course: 'MANAGEMENT; MEDICAL; STEM'
  },
  {
    id: 777,
    gender: 'Male',
    loanAmount: 10000000,
    loanType: 'Unsecured',
    country: 'South Korea',
    university: 'Hanbat National University',
    course: 'Law and Management; Medical; STEM'
  },
  {
    id: 778,
    gender: 'Female',
    loanAmount: 10000000,
    loanType: 'Unsecured',
    country: 'Spain',
    university: 'Universidad de Las Palmas de Gran Canaria',
    course: 'Law and Medical; Management; STEM'
  },
  {
    id: 779,
    gender: 'Male',
    loanAmount: 10000000,
    loanType: 'Unsecured',
    country: 'South Africa',
    university: 'North-West University',
    course: 'MANAGEMENT AND STEM'
  },
  {
    id: 780,
    gender: 'Female',
    loanAmount: 10000000,
    loanType: 'Unsecured',
    country: 'Spain',
    university: 'Universidad de Sevilla',
    course: 'Law and Medical.; Management; STEM'
  },
  {
    id: 781,
    gender: 'Male',
    loanAmount: 10000000,
    loanType: 'Unsecured',
    country: 'Slovakia',
    university: 'Slovak University of Technology in Bratislava',
    course: 'Law and Medical; Management; Medical; STEM'
  },
  {
    id: 782,
    gender: 'Female',
    loanAmount: 10000000,
    loanType: 'Unsecured',
    country: 'Slovenia',
    university: 'University of Primorska',
    course: 'MANAGEMENT'
  },
  {
    id: 783,
    gender: 'Male',
    loanAmount: 10000000,
    loanType: 'Unsecured',
    country: 'Sri Lanka',
    university: 'University of Peradeniya',
    course: 'MANAGEMENT AND STEM'
  },
  {
    id: 784,
    gender: 'Female',
    loanAmount: 10000000,
    loanType: 'Unsecured',
    country: 'Slovenia',
    university: 'University of Marburg',
    course: 'MANAGEMENT; MEDICAL; STEM'
  },
  {
    id: 785,
    gender: 'Male',
    loanAmount: 10000000,
    loanType: 'Unsecured',
    country: 'Spain',
    university: 'Universitat de Girona',
    course: 'MANAGEMENT AND STEM'
  },
  {
    id: 786,
    gender: 'Female',
    loanAmount: 10000000,
    loanType: 'Unsecured',
    country: 'Sri Lanka',
    university: 'University of Ruhuna',
    course: 'Law and Medical; Management; STEM'
  },
  {
    id: 787,
    gender: 'Male',
    loanAmount: 10000000,
    loanType: 'Unsecured',
    country: 'South Korea',
    university: 'Pohang University of Science & Technology',
    course: 'MANAGEMENT AND STEM'
  },
  {
    id: 788,
    gender: 'Female',
    loanAmount: 10000000,
    loanType: 'Unsecured',
    country: 'Sri Lanka',
    university: 'University of Ruhuna',
    course: 'Law and Medical; Management; STEM'
  },
  {
    id: 789,
    gender: 'Male',
    loanAmount: 10000000,
    loanType: 'Unsecured',
    country: 'Sri Lanka',
    university: 'University of Peradeniya',
    course: 'MANAGEMENT; STEM'
  },
  {
    id: 790,
    gender: 'Female',
    loanAmount: 10000001,
    loanType: 'Unsecured',
    country: 'South Africa',
    university: 'University of Fort Hare',
    course: 'MEDICAL'
  },
  {
    id: 791,
    gender: 'Male',
    loanAmount: 10000001,
    loanType: 'Unsecured',
    country: 'Sudan',
    university: 'Future University',
    course: 'Law and Medical; Management; STEM'
  },
  {
    id: 792,
    gender: 'Female',
    loanAmount: 10000001,
    loanType: 'Unsecured',
    country: 'Sudan',
    university: 'Future University',
    course: 'MANAGEMENT; STEM'
  },
  {
    id: 793,
    gender: 'Male',
    loanAmount: 10000001,
    loanType: 'Unsecured',
    country: 'Spain',
    university: 'Universitat Ramon Llull',
    course: 'MANAGEMENT; STEM'
  },
  {
    id: 794,
    gender: 'Female',
    loanAmount: 10000001,
    loanType: 'Unsecured',
    country: 'Sri Lanka',
    university: 'University of Moratuwa',
    course: 'Law and Medical; Management; Medical; STEM'
  },
  {
    id: 795,
    gender: 'Male',
    loanAmount: 10000001,
    loanType: 'Unsecured',
    country: 'Sri Lanka',
    university: 'University of Sri Jayewardenepura',
    course: 'Law and Medical; Management; STEM'
  },
  {
    id: 796,
    gender: 'Female',
    loanAmount: 10000001,
    loanType: 'Unsecured',
    country: 'Sri Lanka',
    university: 'University of Sri Jayewardenepura',
    course: 'MEDICAL; STEM'
  },
  {
    id: 797,
    gender: 'Male',
    loanAmount: 10000001,
    loanType: 'Unsecured',
    country: 'Sri Lanka',
    university: 'University of Kelaniya',
    course: 'MEDICAL'
  },
  {
    id: 798,
    gender: 'Female',
    loanAmount: 10000001,
    loanType: 'Unsecured',
    country: 'South Korea',
    university: 'Korea Institute for Advanced Study',
    course: 'MANAGEMENT AND STEM'
  },
  {
    id: 799,
    gender: 'Male',
    loanAmount: 10000001,
    loanType: 'Unsecured',
    country: 'Sudan',
    university: 'University of Khartoum',
    course: 'Law and Medical; Management; STEM'
  },
  {
    id: 800,
    gender: 'Female',
    loanAmount: 10000001,
    loanType: 'Unsecured',
    country: 'South Korea',
    university: 'Soonchunhyang University',
    course: 'MANAGEMENT; STEM'
  },
  {
    id: 801,
    gender: 'Male',
    loanAmount: 10000001,
    loanType: 'Unsecured',
    country: 'Sri Lanka',
    university: 'University of Colombo',
    course: 'MANAGEMENT; MEDICAL; STEM'
  },
  {
    id: 802,
    gender: 'Female',
    loanAmount: 10000001,
    loanType: 'Unsecured',
    country: 'Sweden',
    university: 'University of Skovde',
    course: 'MANAGEMENT; MEDICAL; STEM'
  },
  {
    id: 803,
    gender: 'Male',
    loanAmount: 10000001,
    loanType: 'Unsecured',
    country: 'Sweden',
    university: 'Umea University',
    course: 'MANAGEMENT; STEM'
  },
  {
    id: 804,
    gender: 'Female',
    loanAmount: 10001000,
    loanType: 'Unsecured',
    country: 'Sri Lanka',
    university: 'University of Ruhuna',
    course: 'MANAGEMENT; STEM'
  },
  {
    id: 805,
    gender: 'Male',
    loanAmount: 10001000,
    loanType: 'Unsecured',
    country: 'Sudan',
    university: 'Future University',
    course: 'MEDICAL; STEM'
  },
  {
    id: 806,
    gender: 'Female',
    loanAmount: 10001000,
    loanType: 'Unsecured',
    country: 'Spain',
    university: 'Universitat Autonoma de Barcelona',
    course: 'MANAGEMENT; MEDICAL; STEM'
  },
  {
    id: 807,
    gender: 'Male',
    loanAmount: 10001000,
    loanType: 'Unsecured',
    country: 'South Korea',
    university: 'Sungkyunkwan University GSB',
    course: 'MEDICAL'
  },
  {
    id: 808,
    gender: 'Female',
    loanAmount: 10001000,
    loanType: 'Unsecured',
    country: 'Sudan',
    university: 'University of Khartoum',
    course: 'MANAGEMENT; STEM'
  },
  {
    id: 809,
    gender: 'Male',
    loanAmount: 10001000,
    loanType: 'Unsecured',
    country: 'Spain',
    university: 'Universidad Internacional Valenciana',
    course: 'MEDICAL; STEM'
  },
  {
    id: 810,
    gender: 'Female',
    loanAmount: 10001000,
    loanType: 'Unsecured',
    country: 'Switzerland',
    university: 'University of Fribourg',
    course: 'MEDICAL'
  },
  {
    id: 811,
    gender: 'Male',
    loanAmount: 10001000,
    loanType: 'Unsecured',
    country: 'Sri Lanka',
    university: 'University of Moratuwa',
    course: 'MANAGEMENT; MEDICAL; STEM'
  },
  {
    id: 812,
    gender: 'Female',
    loanAmount: 10001000,
    loanType: 'Unsecured',
    country: 'Spain',
    university: 'Universidad Pontificia Comillas',
    course: 'Management & Medical; STEM'
  },
  {
    id: 813,
    gender: 'Male',
    loanAmount: 10001000,
    loanType: 'Unsecured',
    country: 'Sri Lanka',
    university: 'University of Moratuwa',
    course: 'Management & Medical; STEM'
  },
  {
    id: 814,
    gender: 'Female',
    loanAmount: 10001000,
    loanType: 'Unsecured',
    country: 'Switzerland',
    university: 'Fachhochschule Nordwestschweiz',
    course: 'MANAGEMENT AND STEM'
  },
  {
    id: 815,
    gender: 'Male',
    loanAmount: 10001000,
    loanType: 'Unsecured',
    country: 'Sri Lanka',
    university: 'University of Sri Jayewardenepura',
    course: 'Management & Medical; STEM'
  },
  {
    id: 816,
    gender: 'Female',
    loanAmount: 10001000,
    loanType: 'Unsecured',
    country: 'Sweden',
    university: 'Chalmers University of Technology',
    course: 'MANAGEMENT AND STEM'
  },
  {
    id: 817,
    gender: 'Male',
    loanAmount: 10001000,
    loanType: 'Unsecured',
    country: 'Sweden',
    university: 'Stockholm University',
    course: 'MEDICAL; STEM'
  },
  {
    id: 818,
    gender: 'Female',
    loanAmount: 11000000,
    loanType: 'Unsecured',
    country: 'Sweden',
    university: 'KTH Royal Institute of Technology',
    course: 'Management'
  },
  {
    id: 819,
    gender: 'Male',
    loanAmount: 11000000,
    loanType: 'Unsecured',
    country: 'Sudan',
    university: 'Future University',
    course: 'Management & Medical; STEM'
  },
  {
    id: 820,
    gender: 'Female',
    loanAmount: 11000000,
    loanType: 'Unsecured',
    country: 'Syria',
    university: 'Damascus University',
    course: 'MEDICAL'
  },
  {
    id: 821,
    gender: 'Male',
    loanAmount: 11000000,
    loanType: 'Unsecured',
    country: 'Sudan',
    university: 'University of Khartoum',
    course: 'MANAGEMENT; MEDICAL; STEM'
  },
  {
    id: 822,
    gender: 'Female',
    loanAmount: 11000000,
    loanType: 'Unsecured',
    country: 'Syria',
    university: 'Damascus University',
    course: 'MANAGEMENT; STEM'
  },
  {
    id: 823,
    gender: 'Male',
    loanAmount: 11000000,
    loanType: 'Unsecured',
    country: 'Sri Lanka',
    university: 'University of Kelaniya',
    course: 'MEDICAL; STEM'
  },
  {
    id: 824,
    gender: 'Female',
    loanAmount: 11000000,
    loanType: 'Unsecured',
    country: 'Sri Lanka',
    university: 'University of Kelaniya',
    course: 'MEDICAL; STEM'
  },
  {
    id: 825,
    gender: 'Male',
    loanAmount: 11000000,
    loanType: 'Unsecured',
    country: 'Sudan',
    university: 'Future University',
    course: 'Management'
  },
  {
    id: 826,
    gender: 'Female',
    loanAmount: 11000000,
    loanType: 'Unsecured',
    country: 'Switzerland',
    university: 'Universitat Luzern',
    course: 'Management and Law; Medical; STEM'
  },
  {
    id: 827,
    gender: 'Male',
    loanAmount: 11000000,
    loanType: 'Unsecured',
    country: 'Sudan',
    university: 'Future University',
    course: 'Management and Law; Medical; STEM'
  },
  {
    id: 828,
    gender: 'Female',
    loanAmount: 11000000,
    loanType: 'Unsecured',
    country: 'Sweden',
    university: 'Chalmers University of Technology',
    course: 'MEDICAL; STEM'
  },
  {
    id: 829,
    gender: 'Male',
    loanAmount: 11000000,
    loanType: 'Unsecured',
    country: 'Switzerland',
    university: 'University of Geneva',
    course: 'MANAGEMENT; STEM'
  },
  {
    id: 830,
    gender: 'Female',
    loanAmount: 11000000,
    loanType: 'Unsecured',
    country: 'Sweden',
    university: 'Blekinge Institute of Technology',
    course: 'Management and Law; Medical; STEM'
  },
  {
    id: 831,
    gender: 'Male',
    loanAmount: 11000000,
    loanType: 'Unsecured',
    country: 'Syria',
    university: 'Damascus University',
    course: 'Management & Medical; STEM'
  },
  {
    id: 832,
    gender: 'Female',
    loanAmount: 11250000,
    loanType: 'Unsecured',
    country: 'Syria',
    university: 'Damascus University',
    course: 'Management and Law; Medical; STEM'
  },
  {
    id: 833,
    gender: 'Male',
    loanAmount: 11250000,
    loanType: 'Unsecured',
    country: 'Taiwan',
    university: 'National Yang Ming Chiao Tung University‎',
    course: 'Management & Medical; STEM'
  },
  {
    id: 834,
    gender: 'Female',
    loanAmount: 11250000,
    loanType: 'Unsecured',
    country: 'Sweden',
    university: 'Karolinska Institutet',
    course: 'Management & Medical; STEM'
  },
  {
    id: 835,
    gender: 'Male',
    loanAmount: 11250000,
    loanType: 'Unsecured',
    country: 'Sweden',
    university: 'Malardalens Universitet',
    course: 'Management and Law; Medical; STEM'
  },
  {
    id: 836,
    gender: 'Female',
    loanAmount: 11250000,
    loanType: 'Unsecured',
    country: 'Taiwan',
    university: 'National Taiwan University',
    course: 'MEDICAL'
  },
  {
    id: 837,
    gender: 'Male',
    loanAmount: 11250000,
    loanType: 'Unsecured',
    country: 'Taiwan',
    university: 'National Chung Cheng University',
    course: 'Management'
  },
  {
    id: 838,
    gender: 'Female',
    loanAmount: 11250000,
    loanType: 'Unsecured',
    country: 'Sweden',
    university: 'Stockholm School of Economics',
    course: 'Management & Medical; STEM'
  },
  {
    id: 839,
    gender: 'Male',
    loanAmount: 11250000,
    loanType: 'Unsecured',
    country: 'Sweden',
    university: 'Stockholm School of Economics',
    course: 'Management and Law; STEM'
  },
  {
    id: 840,
    gender: 'Female',
    loanAmount: 11250000,
    loanType: 'Unsecured',
    country: 'Tanzania',
    university: 'Sokoine University of Agriculture',
    course: 'Management & Medical; STEM'
  },
  {
    id: 841,
    gender: 'Male',
    loanAmount: 11250000,
    loanType: 'Unsecured',
    country: 'Syria',
    university: 'Damascus University',
    course: 'Management'
  },
  {
    id: 842,
    gender: 'Female',
    loanAmount: 11250000,
    loanType: 'Unsecured',
    country: 'Switzerland',
    university: 'University of St. Gallen',
    course: 'Management and STEM'
  },
  {
    id: 843,
    gender: 'Male',
    loanAmount: 11250000,
    loanType: 'Unsecured',
    country: 'Syria',
    university: 'Damascus University',
    course: 'Management & Medical; STEM'
  },
  {
    id: 844,
    gender: 'Female',
    loanAmount: 11250000,
    loanType: 'Unsecured',
    country: 'Thailand',
    university: 'Asian Institute of Technology Thailand',
    course: 'Management and Law; STEM'
  },
  {
    id: 845,
    gender: 'Male',
    loanAmount: 11250000,
    loanType: 'Unsecured',
    country: 'Syria',
    university: 'Damascus University',
    course: 'Management and Medical; STEM'
  },
  {
    id: 846,
    gender: 'Female',
    loanAmount: 11250000,
    loanType: 'Unsecured',
    country: 'Tanzania',
    university: 'Indian Institute of Technology-Madras',
    course: 'Management and Law; Medical; STEM'
  },
  {
    id: 847,
    gender: 'Male',
    loanAmount: 12500000,
    loanType: 'Unsecured',
    country: 'Thailand',
    university: 'Walailak University',
    course: 'Management and Law; STEM'
  },
  {
    id: 848,
    gender: 'Female',
    loanAmount: 12500000,
    loanType: 'Unsecured',
    country: 'Switzerland',
    university: 'Hochschule Luzern',
    course: 'Management and STEM; Medical'
  },
  {
    id: 849,
    gender: 'Male',
    loanAmount: 12500000,
    loanType: 'Unsecured',
    country: 'Thailand',
    university: 'University of Phayao',
    course: 'Management and Medical; STEM'
  },
  {
    id: 850,
    gender: 'Female',
    loanAmount: 12500000,
    loanType: 'Unsecured',
    country: 'Thailand',
    university: 'Thammasat University',
    course: 'Management and Law; STEM'
  },
  {
    id: 851,
    gender: 'Male',
    loanAmount: 12500000,
    loanType: 'Unsecured',
    country: 'Switzerland',
    university: 'University of Basel',
    course: 'Management & Medical; STEM'
  },
  {
    id: 852,
    gender: 'Female',
    loanAmount: 12500000,
    loanType: 'Unsecured',
    country: 'Syria',
    university: 'Damascus University',
    course: 'Management & Medical; STEM'
  },
  {
    id: 853,
    gender: 'Male',
    loanAmount: 12500000,
    loanType: 'Unsecured',
    country: 'Taiwan',
    university: 'National Chengchi University',
    course: 'Management and STEM; Medical'
  },
  {
    id: 854,
    gender: 'Female',
    loanAmount: 12500000,
    loanType: 'Unsecured',
    country: 'Tanzania',
    university: 'Sokoine University of Agriculture',
    course: 'Management and STEM; Medical'
  },
  {
    id: 855,
    gender: 'Male',
    loanAmount: 12500000,
    loanType: 'Unsecured',
    country: 'Tanzania',
    university: 'Indian Institute of Technology-Madras',
    course: 'Management & Medical; STEM'
  },
  {
    id: 856,
    gender: 'Female',
    loanAmount: 12500000,
    loanType: 'Unsecured',
    country: 'Thailand',
    university: 'Mahidol University',
    course: 'Management & Medical; STEM'
  },
  {
    id: 857,
    gender: 'Male',
    loanAmount: 12500000,
    loanType: 'Unsecured',
    country: 'Taiwan',
    university: 'National Chin Yi University of Technology',
    course: 'Management and STEM'
  },
  {
    id: 858,
    gender: 'Female',
    loanAmount: 12500000,
    loanType: 'Unsecured',
    country: 'Syria',
    university: 'Damascus University',
    course: 'Management and Medical; STEM'
  },
  {
    id: 859,
    gender: 'Male',
    loanAmount: 12500000,
    loanType: 'Unsecured',
    country: 'Tanzania',
    university: 'Indian Institute of Technology-Madras',
    course: 'Management and STEM'
  },
  {
    id: 860,
    gender: 'Female',
    loanAmount: 12500000,
    loanType: 'Unsecured',
    country: 'Tanzania',
    university: 'Sokoine University of Agriculture',
    course: 'Management and Law; STEM'
  },
  {
    id: 861,
    gender: 'Male',
    loanAmount: 13750000,
    loanType: 'Unsecured',
    country: 'Tunisia',
    university: 'University of Tunis El Manar',
    course: 'Management and Law; STEM'
  },
  {
    id: 862,
    gender: 'Female',
    loanAmount: 13750000,
    loanType: 'Unsecured',
    country: 'Taiwan',
    university: 'Tzu Chi University',
    course: 'Management and Medical; STEM'
  },
  {
    id: 863,
    gender: 'Male',
    loanAmount: 13750000,
    loanType: 'Unsecured',
    country: 'Thailand',
    university: 'Rajamangala University of Technology Isan',
    course: 'Management and STEM; Medical'
  },
  {
    id: 864,
    gender: 'Female',
    loanAmount: 13750000,
    loanType: 'Unsecured',
    country: 'Tanzania',
    university: 'Sokoine University of Agriculture',
    course: 'Management and STEM; Medical'
  },
  {
    id: 865,
    gender: 'Male',
    loanAmount: 13750000,
    loanType: 'Unsecured',
    country: 'Turkey',
    university: 'Bogazici University',
    course: 'Management and Law; Medical; STEM'
  },
  {
    id: 866,
    gender: 'Female',
    loanAmount: 13750000,
    loanType: 'Unsecured',
    country: 'Thailand',
    university: 'Chiang Mai University',
    course: 'Management and Medical; STEM'
  },
  {
    id: 867,
    gender: 'Male',
    loanAmount: 13750000,
    loanType: 'Unsecured',
    country: 'Tunisia',
    university: 'University of Tunis El Manar',
    course: 'Management; Medical; STEM'
  },
  {
    id: 868,
    gender: 'Female',
    loanAmount: 13750000,
    loanType: 'Unsecured',
    country: 'Tanzania',
    university: 'University of Dar Es Salaam',
    course: 'Management and STEM'
  },
  {
    id: 869,
    gender: 'Male',
    loanAmount: 13750000,
    loanType: 'Unsecured',
    country: 'Turkey',
    university: 'Izmir Institute of Technology',
    course: 'Management and STEM'
  },
  {
    id: 870,
    gender: 'Female',
    loanAmount: 13750000,
    loanType: 'Unsecured',
    country: 'Uganda',
    university: 'Kampala International University',
    course: 'Management and STEM'
  },
  {
    id: 871,
    gender: 'Male',
    loanAmount: 13750000,
    loanType: 'Unsecured',
    country: 'Tanzania',
    university: 'Indian Institute of Technology-Madras',
    course: 'Management; Medical; STEM'
  },
  {
    id: 872,
    gender: 'Female',
    loanAmount: 13750000,
    loanType: 'Unsecured',
    country: 'Turkey',
    university: 'Bingol University',
    course: 'Management and STEM'
  },
  {
    id: 873,
    gender: 'Male',
    loanAmount: 13750000,
    loanType: 'Unsecured',
    country: 'Uganda',
    university: 'Kampala International University',
    course: 'Management and STEM'
  },
  {
    id: 874,
    gender: 'Female',
    loanAmount: 13750000,
    loanType: 'Unsecured',
    country: 'Uganda',
    university: 'Kampala International University',
    course: 'Management; STEM'
  },
  {
    id: 875,
    gender: 'Male',
    loanAmount: 15000000,
    loanType: 'Unsecured',
    country: 'Uganda',
    university: 'Kampala International University',
    course: 'Management; Medical; STEM'
  },
  {
    id: 876,
    gender: 'Female',
    loanAmount: 15000000,
    loanType: 'Unsecured',
    country: 'Tunisia',
    university: 'University of Tunis El Manar',
    course: 'Management and STEM; Medical'
  },
  {
    id: 877,
    gender: 'Male',
    loanAmount: 15000000,
    loanType: 'Unsecured',
    country: 'Turkey',
    university: 'Bogazici University',
    course: 'Management; STEM'
  },
  {
    id: 878,
    gender: 'Female',
    loanAmount: 15000000,
    loanType: 'Unsecured',
    country: 'Thailand',
    university: 'Chulalongkorn University',
    course: 'Management; Medical; STEM'
  },
  {
    id: 879,
    gender: 'Male',
    loanAmount: 15000000,
    loanType: 'Unsecured',
    country: 'Thailand',
    university: 'Thammasat University',
    course: 'Management and STEM'
  },
  {
    id: 880,
    gender: 'Female',
    loanAmount: 15000000,
    loanType: 'Unsecured',
    country: 'Ukraine',
    university: 'V.N. Karazin Kharkiv National University',
    course: 'Management; Medical; STEM'
  },
  {
    id: 881,
    gender: 'Male',
    loanAmount: 15000000,
    loanType: 'Unsecured',
    country: 'Thailand',
    university: 'Naresuan University',
    course: 'Management; STEM'
  },
  {
    id: 882,
    gender: 'Female',
    loanAmount: 15000000,
    loanType: 'Unsecured',
    country: 'Tunisia',
    university: 'University of Tunis El Manar',
    course: 'Management; STEM'
  },
  {
    id: 883,
    gender: 'Male',
    loanAmount: 15000000,
    loanType: 'Unsecured',
    country: 'Tunisia',
    university: 'University of Tunis El Manar',
    course: 'Management and STEM; Medical'
  },
  {
    id: 884,
    gender: 'Female',
    loanAmount: 15000000,
    loanType: 'Unsecured',
    country: 'Ukraine',
    university: 'Sumy State University',
    course: 'Management; Medical; STEM'
  },
  {
    id: 885,
    gender: 'Male',
    loanAmount: 15000000,
    loanType: 'Unsecured',
    country: 'Turkey',
    university: 'Sinop University',
    course: 'Management; STEM'
  },
  {
    id: 886,
    gender: 'Female',
    loanAmount: 15000000,
    loanType: 'Unsecured',
    country: 'Ukraine',
    university: 'Lviv Polytechnic National University',
    course: 'Management and STEM; Medical'
  },
  {
    id: 887,
    gender: 'Male',
    loanAmount: 15000000,
    loanType: 'Unsecured',
    country: 'Tunisia',
    university: 'University of Tunis El Manar',
    course: 'Management; STEM'
  },
  {
    id: 888,
    gender: 'Female',
    loanAmount: 15000000,
    loanType: 'Unsecured',
    country: 'United Arab Emirates',
    university: 'Ajman University',
    course: 'Medical'
  },
  {
    id: 889,
    gender: 'Male',
    loanAmount: 17500000,
    loanType: 'Unsecured',
    country: 'Ukraine',
    university: 'Taras Shevchenko National University of Kyiv',
    course: 'Management; STEM; and Medical'
  },
  {
    id: 890,
    gender: 'Female',
    loanAmount: 17500000,
    loanType: 'Unsecured',
    country: 'Turkey',
    university: 'Istanbul University',
    course: 'Management; Medical'
  },
  {
    id: 891,
    gender: 'Male',
    loanAmount: 17500000,
    loanType: 'Unsecured',
    country: 'Ukraine',
    university: 'Sumy State University',
    course: 'Medical'
  },
  {
    id: 892,
    gender: 'Female',
    loanAmount: 17500000,
    loanType: 'Unsecured',
    country: 'United Arab Emirates',
    university: 'Abu Dhabi University',
    course: 'Management; Medical'
  },
  {
    id: 893,
    gender: 'Male',
    loanAmount: 17500000,
    loanType: 'Unsecured',
    country: 'Ukraine',
    university: 'Taras Shevchenko National University of Kyiv',
    course: 'Management; STEM; and Medical'
  },
  {
    id: 894,
    gender: 'Female',
    loanAmount: 17500000,
    loanType: 'Unsecured',
    country: 'Ukraine',
    university: 'Taras Shevchenko National University of Kyiv',
    course: 'Management and STEM; Medical'
  },
  {
    id: 895,
    gender: 'Male',
    loanAmount: 17500000,
    loanType: 'Unsecured',
    country: 'Tunisia',
    university: 'University of Tunis El Manar',
    course: 'Medical; STEM'
  },
  {
    id: 896,
    gender: 'Female',
    loanAmount: 17500000,
    loanType: 'Unsecured',
    country: 'Uganda',
    university: 'Kampala International University',
    course: 'Medical and STEM'
  },
  {
    id: 897,
    gender: 'Male',
    loanAmount: 17500000,
    loanType: 'Unsecured',
    country: 'United Kingdom',
    university: 'London Metropolitan University',
    course: 'Management; Medical; STEM'
  },
  {
    id: 898,
    gender: 'Female',
    loanAmount: 17500000,
    loanType: 'Unsecured',
    country: 'Uganda',
    university: 'Kampala International University',
    course: 'Medical; STEM'
  },
  {
    id: 899,
    gender: 'Male',
    loanAmount: 17500000,
    loanType: 'Unsecured',
    country: 'Ukraine',
    university: 'National Technical University of Ukraine "Igor Sikorsky Kyiv Polytechnic Institute"',
    course: 'Management; Medical'
  },
  {
    id: 900,
    gender: 'Female',
    loanAmount: 17500000,
    loanType: 'Unsecured',
    country: 'United Arab Emirates',
    university: 'American University of Ras Al Khaimah ( AURAK )',
    course: 'Management; STEM; and Medical'
  },
  {
    id: 901,
    gender: 'Male',
    loanAmount: 17500000,
    loanType: 'Unsecured',
    country: 'Ukraine',
    university: 'Sumy State University',
    course: 'Management; Medical'
  },
  {
    id: 902,
    gender: 'Female',
    loanAmount: 17500000,
    loanType: 'Unsecured',
    country: 'Turkey',
    university: 'Pamukkale University',
    course: 'Medical; STEM Management and Law'
  },
  {
    id: 903,
    gender: 'Male',
    loanAmount: 18000000,
    loanType: 'Unsecured',
    country: 'United Kingdom',
    university: 'University of the Arts London',
    course: 'Management; STEM; and Medical'
  },
  {
    id: 904,
    gender: 'Female',
    loanAmount: 18000000,
    loanType: 'Unsecured',
    country: 'Ukraine',
    university: 'Sumy State University',
    course: 'Medical'
  },
  {
    id: 905,
    gender: 'Male',
    loanAmount: 18000000,
    loanType: 'Unsecured',
    country: 'United Kingdom',
    university: 'Liverpool Hope University',
    course: 'Medical; STEM'
  },
  {
    id: 906,
    gender: 'Female',
    loanAmount: 18000000,
    loanType: 'Unsecured',
    country: 'Uganda',
    university: 'Kampala International University',
    course: 'Medical; STEM'
  },
  {
    id: 907,
    gender: 'Male',
    loanAmount: 18000000,
    loanType: 'Unsecured',
    country: 'United Kingdom',
    university: 'University of Oxford',
    course: 'Management; STEM; and Medical'
  },
  {
    id: 908,
    gender: 'Female',
    loanAmount: 18000000,
    loanType: 'Unsecured',
    country: 'United Kingdom',
    university: 'Durham University',
    course: 'Medical'
  },
  {
    id: 909,
    gender: 'Male',
    loanAmount: 18000000,
    loanType: 'Unsecured',
    country: 'Ukraine',
    university: 'National Technical University of Ukraine "Igor Sikorsky Kyiv Polytechnic Institute"',
    course: 'Medical; STEM'
  },
  {
    id: 910,
    gender: 'Female',
    loanAmount: 18000000,
    loanType: 'Unsecured',
    country: 'United Kingdom',
    university: 'University of Reading',
    course: 'Medical and STEM'
  },
  {
    id: 911,
    gender: 'Male',
    loanAmount: 18000000,
    loanType: 'Unsecured',
    country: 'United States of America',
    university: 'Ball State University',
    course: 'Management; STEM; and Medical'
  },
  {
    id: 912,
    gender: 'Female',
    loanAmount: 18000000,
    loanType: 'Unsecured',
    country: 'United Arab Emirates',
    university: 'University of Sharjah',
    course: 'Management; STEM'
  },
  {
    id: 913,
    gender: 'Male',
    loanAmount: 18000000,
    loanType: 'Unsecured',
    country: 'United Arab Emirates',
    university: 'Canadian University of Dubai',
    course: 'Medical and STEM'
  },
  {
    id: 914,
    gender: 'Female',
    loanAmount: 18000000,
    loanType: 'Unsecured',
    country: 'Ukraine',
    university: 'Sumy State University',
    course: 'Medical; STEM and Management'
  },
  {
    id: 915,
    gender: 'Male',
    loanAmount: 18000000,
    loanType: 'Unsecured',
    country: 'United Arab Emirates',
    university: 'American University of Ras Al Khaimah ( AURAK )',
    course: 'Medical; STEM Management and Law'
  },
  {
    id: 916,
    gender: 'Female',
    loanAmount: 18000000,
    loanType: 'Unsecured',
    country: 'United Kingdom',
    university: 'Liverpool Hope University',
    course: 'Medical'
  },
  {
    id: 917,
    gender: 'Male',
    loanAmount: 19999000,
    loanType: 'Unsecured',
    country: 'United States of America',
    university: 'Boise State University',
    course: 'Medical'
  },
  {
    id: 918,
    gender: 'Female',
    loanAmount: 19999000,
    loanType: 'Unsecured',
    country: 'Ukraine',
    university: 'Sumy State University',
    course: 'Medical'
  },
  {
    id: 919,
    gender: 'Male',
    loanAmount: 19999000,
    loanType: 'Unsecured',
    country: 'Ukraine',
    university: 'Taras Shevchenko National University of Kyiv',
    course: 'Medical; STEM; and Management'
  },
  {
    id: 920,
    gender: 'Female',
    loanAmount: 19999000,
    loanType: 'Unsecured',
    country: 'Uruguay',
    university: 'Universidad Catolica del Uruguay (UCU)',
    course: 'Medical'
  },
  {
    id: 921,
    gender: 'Male',
    loanAmount: 19999000,
    loanType: 'Unsecured',
    country: 'Ukraine',
    university: 'V.N. Karazin Kharkiv National University',
    course: 'Medical and STEM'
  },
  {
    id: 922,
    gender: 'Female',
    loanAmount: 19999000,
    loanType: 'Unsecured',
    country: 'United Kingdom',
    university: 'University of Manchester',
    course: 'Medical'
  },
  {
    id: 923,
    gender: 'Male',
    loanAmount: 19999000,
    loanType: 'Unsecured',
    country: 'United Arab Emirates',
    university: 'Ajman University',
    course: 'Medical and STEM'
  },
  {
    id: 924,
    gender: 'Female',
    loanAmount: 19999000,
    loanType: 'Unsecured',
    country: 'United Kingdom',
    university: 'Royal College of Art',
    course: 'Natural Sciences; Social Sciences'
  },
  {
    id: 925,
    gender: 'Male',
    loanAmount: 19999000,
    loanType: 'Unsecured',
    country: 'United States of America',
    university: 'Haverford College',
    course: 'Medical; STEM and Management'
  },
  {
    id: 926,
    gender: 'Female',
    loanAmount: 19999000,
    loanType: 'Unsecured',
    country: 'United Kingdom',
    university: 'SOAS University of London',
    course: 'Medical; STEM'
  },
  {
    id: 927,
    gender: 'Male',
    loanAmount: 19999000,
    loanType: 'Unsecured',
    country: 'United Kingdom',
    university: 'University of Chester',
    course: 'Natural Sciences; Social Sciences'
  },
  {
    id: 928,
    gender: 'Female',
    loanAmount: 19999000,
    loanType: 'Unsecured',
    country: 'United Kingdom',
    university: 'Loughborough University',
    course: 'Medical and STEM'
  },
  {
    id: 929,
    gender: 'Male',
    loanAmount: 19999000,
    loanType: 'Unsecured',
    country: 'Uzbekistan',
    university: 'Tashkent Institute of Irrigation and Agricultural Mechanization Engineers - National Research University (TIIAME-NRU)',
    course: 'Medical; STEM'
  },
  {
    id: 930,
    gender: 'Female',
    loanAmount: 19999000,
    loanType: 'Unsecured',
    country: 'United States of America',
    university: 'University of Washington-Tacoma Campus',
    course: 'Medical; STEM and Management'
  },
  {
    id: 931,
    gender: 'Male',
    loanAmount: 20000000,
    loanType: 'Unsecured',
    country: 'Uzbekistan',
    university: 'Tashkent State Technical University',
    course: 'Medical; STEM'
  },
  {
    id: 932,
    gender: 'Female',
    loanAmount: 20000000,
    loanType: 'Unsecured',
    country: 'Venezuela',
    university: 'Universidad Central de Venezuela',
    course: 'Medical; STEM'
  },
  {
    id: 933,
    gender: 'Male',
    loanAmount: 20000000,
    loanType: 'Unsecured',
    country: 'Uruguay',
    university: 'Universidad Catolica del Uruguay (UCU)',
    course: 'Medical; STEM'
  },
  {
    id: 934,
    gender: 'Female',
    loanAmount: 20000000,
    loanType: 'Unsecured',
    country: 'Uruguay',
    university: 'Universidad de Montevideo',
    course: 'Medical; STEM'
  },
  {
    id: 935,
    gender: 'Male',
    loanAmount: 20000000,
    loanType: 'Unsecured',
    country: 'United States of America',
    university: 'Tufts University',
    course: 'Medical; STEM'
  },
  {
    id: 936,
    gender: 'Female',
    loanAmount: 20000000,
    loanType: 'Unsecured',
    country: 'United Kingdom',
    university: 'University of Central Lancashire',
    course: 'Medical; STEM Management and Law'
  },
  {
    id: 937,
    gender: 'Male',
    loanAmount: 20000000,
    loanType: 'Unsecured',
    country: 'Uzbekistan',
    university: 'National University of Uzbekistan',
    course: 'Medical and STEM'
  },
  {
    id: 938,
    gender: 'Female',
    loanAmount: 20000000,
    loanType: 'Unsecured',
    country: 'United States of America',
    university: 'University of Colorado Colorado Springs',
    course: 'Medical; STEM and Management'
  },
  {
    id: 939,
    gender: 'Male',
    loanAmount: 20000000,
    loanType: 'Unsecured',
    country: 'United Kingdom',
    university: 'University of Plymouth',
    course: 'Natural Sciences; Social Sciences'
  },
  {
    id: 940,
    gender: 'Female',
    loanAmount: 20000000,
    loanType: 'Unsecured',
    country: 'Uruguay',
    university: 'Universidad de la Republica (UdelaR)',
    course: 'STEM and Management'
  },
  {
    id: 941,
    gender: 'Male',
    loanAmount: 20000000,
    loanType: 'Unsecured',
    country: 'Uzbekistan',
    university: 'Tashkent Institute of Irrigation and Agricultural Mechanization Engineers - National Research University (TIIAME-NRU)',
    course: 'Medical; STEM; and Management'
  },
  {
    id: 942,
    gender: 'Female',
    loanAmount: 20000000,
    loanType: 'Unsecured',
    country: 'Uzbekistan',
    university: 'National University of Uzbekistan',
    course: 'Medical; STEM; and Management'
  },
  {
    id: 943,
    gender: 'Male',
    loanAmount: 20000000,
    loanType: 'Unsecured',
    country: 'Venezuela',
    university: 'Universidad Central de Venezuela',
    course: 'Medical; STEM; and Management'
  },
  {
    id: 944,
    gender: 'Female',
    loanAmount: 20000000,
    loanType: 'Unsecured',
    country: 'United States of America',
    university: 'University of Washington-Tacoma Campus',
    course: 'Medical; STEM Management and Law'
  },
  {
    id: 945,
    gender: 'Male',
    loanAmount: 20001000,
    loanType: 'Unsecured',
    country: 'Uruguay',
    university: 'Universidad de la Republica (UdelaR)',
    course: 'STEM and Management'
  },
  {
    id: 946,
    gender: 'Female',
    loanAmount: 20001000,
    loanType: 'Unsecured',
    country: 'Uzbekistan',
    university: 'National University of Uzbekistan',
    course: 'Natural Sciences; Social Sciences'
  },
  {
    id: 947,
    gender: 'Male',
    loanAmount: 20001000,
    loanType: 'Unsecured',
    country: 'Vietnam',
    university: 'University of Economics Ho Chi Minh City',
    course: 'STEM and Medical'
  },
  {
    id: 948,
    gender: 'Female',
    loanAmount: 20001000,
    loanType: 'Unsecured',
    country: 'Uruguay',
    university: 'Universidad Catolica del Uruguay (UCU)',
    course: 'Medical; STEM Management and Law'
  },
  {
    id: 949,
    gender: 'Male',
    loanAmount: 20001000,
    loanType: 'Unsecured',
    country: 'Zambia',
    university: 'University of Zambia',
    course: 'Medical; STEM; and Management'
  },
  {
    id: 950,
    gender: 'Female',
    loanAmount: 20001000,
    loanType: 'Unsecured',
    country: 'Venezuela',
    university: 'Universidad Central de Venezuela',
    course: 'STEM and Medical'
  },
  {
    id: 951,
    gender: 'Male',
    loanAmount: 20001000,
    loanType: 'Unsecured',
    country: 'Venezuela',
    university: 'Universidad Catolica Andres Bello - UCAB',
    course: 'Medical; STEM Management and Law'
  },
  {
    id: 952,
    gender: 'Female',
    loanAmount: 20001000,
    loanType: 'Unsecured',
    country: 'Uruguay',
    university: 'Universidad Catolica del Uruguay (UCU)',
    course: 'Medical; STEM; and Management'
  },
  {
    id: 953,
    gender: 'Male',
    loanAmount: 20001000,
    loanType: 'Unsecured',
    country: 'Uzbekistan',
    university: 'Tashkent Institute of Irrigation and Agricultural Mechanization Engineers - National Research University (TIIAME-NRU)',
    course: 'Medical; STEM; and Management'
  },
  {
    id: 954,
    gender: 'Female',
    loanAmount: 20001000,
    loanType: 'Unsecured',
    country: 'Venezuela',
    university: 'Universidad Catolica Andres Bello - UCAB',
    course: 'STEM'
  },
  {
    id: 955,
    gender: 'Male',
    loanAmount: 20001000,
    loanType: 'Unsecured',
    country: 'Venezuela',
    university: 'Universidad Catolica Andres Bello - UCAB',
    course: 'STEM, Management'
  },
  {
    id: 956,
    gender: 'Female',
    loanAmount: 20001000,
    loanType: 'Unsecured',
    country: 'Vietnam',
    university: 'RMIT University Vietnam',
    course: 'Medical; STEM and Management'
  },
  {
    id: 957,
    gender: 'Male',
    loanAmount: 20001000,
    loanType: 'Unsecured',
    country: 'Uzbekistan',
    university: 'National University of Uzbekistan',
    course: 'STEM'
  },
  {
    id: 958,
    gender: 'Female',
    loanAmount: 20001000,
    loanType: 'Unsecured',
    country: 'Uzbekistan',
    university: 'Tashkent Institute of Irrigation and Agricultural Mechanization Engineers - National Research University (TIIAME-NRU)',
    course: 'Natural Sciences; Social Sciences'
  },
  {
    id: 959,
    gender: 'Male',
    loanAmount: 25000000,
    loanType: 'Unsecured',
    country: 'Venezuela',
    university: 'Universidad Central de Venezuela - UCV',
    course: 'Natural Sciences; Social Sciences'
  },
  {
    id: 960,
    gender: 'Female',
    loanAmount: 25000000,
    loanType: 'Unsecured',
    country: 'Vietnam',
    university: 'Hanoi University of Science and Technology',
    course: 'STEM'
  },
  {
    id: 961,
    gender: 'Male',
    loanAmount: 25000000,
    loanType: 'Unsecured',
    country: 'Venezuela',
    university: 'Universidad Central de Venezuela',
    course: 'STEM and Medical'
  },
  {
    id: 962,
    gender: 'Female',
    loanAmount: 25000000,
    loanType: 'Unsecured',
    country: 'Zambia',
    university: 'University of Zambia',
    course: 'STEM and Management'
  },
  {
    id: 963,
    gender: 'Male',
    loanAmount: 25000000,
    loanType: 'Unsecured',
    country: 'Zambia',
    university: 'University of Zambia',
    course: 'Medical; STEM; and Management'
  },
  {
    id: 964,
    gender: 'Female',
    loanAmount: 25000000,
    loanType: 'Unsecured',
    country: 'Venezuela',
    university: 'Universidad Catolica Andres Bello - UCAB',
    course: 'STEM, Management'
  },
  {
    id: 965,
    gender: 'Male',
    loanAmount: 25000000,
    loanType: 'Unsecured',
    country: 'Zimbabwe',
    university: 'University of Zimbabwe',
    course: 'Agriculture; Arts; Business & Management; Computer Science & IT; Design & Architecture; Law; Social Sciences'
  },
  {
    id: 966,
    gender: 'Female',
    loanAmount: 25000000,
    loanType: 'Unsecured',
    country: 'Vietnam',
    university: 'Vietnam National University, Hanoi',
    course: 'Agriculture; Arts; Business & Management; Computer Science & IT; Design & Architecture; Law; Social Sciences'
  },
  {
    id: 967,
    gender: 'Male',
    loanAmount: 25000000,
    loanType: 'Unsecured',
    country: 'Venezuela',
    university: 'Universidad Central de Venezuela',
    course: 'STEM'
  },
  {
    id: 968,
    gender: 'Female',
    loanAmount: 25000000,
    loanType: 'Unsecured',
    country: 'Zambia',
    university: 'University of Zambia',
    course: 'Natural Sciences; Social Sciences'
  },
  {
    id: 969,
    gender: 'Male',
    loanAmount: 25000000,
    loanType: 'Unsecured',
    country: 'Zambia',
    university: 'University of Zambia',
    course: 'STEM'
  },
  {
    id: 970,
    gender: 'Female',
    loanAmount: 25000000,
    loanType: 'Unsecured',
    country: 'Antigua and Barbuda',
    university: 'American University of Antigua (AUA) College of Medicine',
    course: 'STEM'
  },
  {
    id: 971,
    gender: 'Male',
    loanAmount: 25000000,
    loanType: 'Unsecured',
    country: 'Zimbabwe',
    university: 'University of Zimbabwe',
    course: 'Agriculture; Arts; Business & Management; Computer Science & IT; Design & Architecture; Law; Social Sciences'
  },
  {
    id: 972,
    gender: 'Female',
    loanAmount: 25000000,
    loanType: 'Unsecured',
    country: 'Vietnam',
    university: 'RMIT University Vietnam',
    course: 'Agriculture; Business & Management; Computer Science & IT; Engineering & Technology'
  },
  {
    id: 973,
    gender: 'Male',
    loanAmount: 29999000,
    loanType: 'Unsecured',
    country: 'Zimbabwe',
    university: 'University of Zimbabwe',
    course: 'STEM and Medical'
  },
  {
    id: 974,
    gender: 'Female',
    loanAmount: 29999000,
    loanType: 'Unsecured',
    country: 'Vietnam',
    university: 'Nguyen Tat Thanh University',
    course: 'STEM and Management'
  },
  {
    id: 975,
    gender: 'Male',
    loanAmount: 29999000,
    loanType: 'Unsecured',
    country: 'Zimbabwe',
    university: 'University of Zimbabwe',
    course: 'STEM'
  },
  {
    id: 976,
    gender: 'Female',
    loanAmount: 29999000,
    loanType: 'Unsecured',
    country: 'Antigua and Barbuda',
    university: 'American University of Antigua (AUA) College of Medicine',
    course: 'STEM, Management'
  },
  {
    id: 977,
    gender: 'Male',
    loanAmount: 29999000,
    loanType: 'Unsecured',
    country: 'Argentina',
    university: 'Universidad Nacional del Nordeste',
    course: 'STEM and Management'
  },
  {
    id: 978,
    gender: 'Female',
    loanAmount: 29999000,
    loanType: 'Unsecured',
    country: 'Zimbabwe',
    university: 'University of Zimbabwe',
    course: 'Agriculture; Arts; Business & Management; Computer Science & IT; Design & Architecture; Law; Social Sciences'
  },
  {
    id: 979,
    gender: 'Male',
    loanAmount: 29999000,
    loanType: 'Unsecured',
    country: 'Antigua and Barbuda',
    university: 'American University of Antigua (AUA) College of Medicine',
    course: 'STEM, Management'
  },
  {
    id: 980,
    gender: 'Female',
    loanAmount: 29999000,
    loanType: 'Unsecured',
    country: 'Antigua and Barbuda',
    university: 'American University of Antigua (AUA) College of Medicine',
    course: 'STEM and Management'
  },
  {
    id: 981,
    gender: 'Male',
    loanAmount: 29999000,
    loanType: 'Unsecured',
    country: 'Antigua and Barbuda',
    university: 'American University of Antigua (AUA) College of Medicine',
    course: 'Any course'
  },
  {
    id: 982,
    gender: 'Female',
    loanAmount: 29999000,
    loanType: 'Unsecured',
    country: 'Vietnam',
    university: 'Thuyloi University',
    course: 'Agriculture; Business & Management; Computer Science & IT; Engineering & Technology'
  },
  {
    id: 983,
    gender: 'Male',
    loanAmount: 29999000,
    loanType: 'Unsecured',
    country: 'Zimbabwe',
    university: 'University of Zimbabwe',
    course: 'Agriculture; Business & Management; Computer Science & IT; Engineering & Technology'
  },
  {
    id: 984,
    gender: 'Female',
    loanAmount: 29999000,
    loanType: 'Unsecured',
    country: 'Zambia',
    university: 'University of Zambia',
    course: 'Any course'
  },
  {
    id: 985,
    gender: 'Male',
    loanAmount: 29999000,
    loanType: 'Unsecured',
    country: 'Antigua and Barbuda',
    university: 'American University of Antigua (AUA) College of Medicine',
    course: 'STEM and Management'
  },
  {
    id: 986,
    gender: 'Female',
    loanAmount: 29999000,
    loanType: 'Unsecured',
    country: 'Zimbabwe',
    university: 'University of Zimbabwe',
    course: 'Agriculture; Business & Management; Computer Science & IT; Engineering & Technology'
  },
  {
    id: 987,
    gender: 'Male',
    loanAmount: 30000000,
    loanType: 'Unsecured',
    country: 'Zambia',
    university: 'University of Zambia',
    course: 'Any course'
  },
  {
    id: 988,
    gender: 'Female',
    loanAmount: 30000000,
    loanType: 'Unsecured',
    country: 'Zimbabwe',
    university: 'University of Zimbabwe',
    course: 'Agriculture; Business & Management; Computer Science & IT; Engineering & Technology'
  },
  {
    id: 989,
    gender: 'Male',
    loanAmount: 30000000,
    loanType: 'Unsecured',
    country: 'Antigua and Barbuda',
    university: 'American University of Antigua (AUA) College of Medicine',
    course: 'Agriculture; Arts; Business & Management; Computer Science & IT; Design & Architecture; Law; Social Sciences'
  },
  {
    id: 990,
    gender: 'Female',
    loanAmount: 30000000,
    loanType: 'Unsecured',
    country: 'Armenia',
    university: 'Yerevan State University',
    course: 'Agriculture; Business & Management; Computer Science & IT; Engineering & Technology'
  },
  {
    id: 991,
    gender: 'Male',
    loanAmount: 30000000,
    loanType: 'Unsecured',
    country: 'Zambia',
    university: 'University of Zambia',
    course: 'STEM, Management'
  },
  {
    id: 992,
    gender: 'Female',
    loanAmount: 30000000,
    loanType: 'Unsecured',
    country: 'Zimbabwe',
    university: 'University of Zimbabwe',
    course: 'Any course'
  },
  {
    id: 993,
    gender: 'Male',
    loanAmount: 30000000,
    loanType: 'Unsecured',
    country: 'Zimbabwe',
    university: 'University of Zimbabwe',
    course: 'STEM and Medical'
  },
  {
    id: 994,
    gender: 'Female',
    loanAmount: 30000000,
    loanType: 'Unsecured',
    country: 'Armenia',
    university: 'Yerevan State University',
    course: 'Agriculture; Business & Management; Computer Science & IT; Engineering & Technology'
  },
  {
    id: 995,
    gender: 'Male',
    loanAmount: 30000000,
    loanType: 'Unsecured',
    country: 'Antigua and Barbuda',
    university: 'American University of Antigua (AUA) College of Medicine',
    course: 'Agriculture; Business & Management; Computer Science & IT; Engineering & Technology'
  },
  {
    id: 996,
    gender: 'Female',
    loanAmount: 30000000,
    loanType: 'Unsecured',
    country: 'Argentina',
    university: 'Universidad Torcuato Di Tella',
    course: 'Agriculture; Arts; Business & Management; Computer Science & IT; Design & Architecture; Law; Social Sciences'
  },
  {
    id: 997,
    gender: 'Male',
    loanAmount: 30000000,
    loanType: 'Unsecured',
    country: 'Argentina',
    university: 'Universidad Nacional de La Plata',
    course: 'Art; Arts; Design and Management.; Economics & Econometrics; Law; Performing; STEM'
  },
  {
    id: 998,
    gender: 'Female',
    loanAmount: 30000000,
    loanType: 'Unsecured',
    country: 'Antigua and Barbuda',
    university: 'American University of Antigua (AUA) College of Medicine',
    course: 'Any course'
  },
  {
    id: 999,
    gender: 'Male',
    loanAmount: 30000000,
    loanType: 'Unsecured',
    country: 'Australia',
    university: 'University of the Sunshine Coast',
    course: 'Agriculture; Arts; Business & Management; Computer Science & IT; Design & Architecture; Law; Social Sciences'
  },
  {
    id: 1000,
    gender: 'Female',
    loanAmount: 30000000,
    loanType: 'Unsecured',
    country: 'Zimbabwe',
    university: 'University of Zimbabwe',
    course: 'STEM, Management'
  }
];

test.describe('UI Test: 1000 Combinations', () => {
  TEST_COMBINATIONS.forEach((combo) => {
    test(`Test #${combo.id}: ${combo.gender}, ₹${combo.loanAmount}, ${combo.loanType}`, async ({ page }) => {
      await page.goto('http://localhost:3080/');
      
      // Fill form
      await page.check(`input[name='gender'][value='${combo.gender}']`);
      await page.fill('#amount', String(combo.loanAmount));
      await page.check(`input[name='secured'][value='${combo.loanType === 'Secured' ? 'true' : 'false'}']`);
      await page.fill('#country', combo.country);
      await page.fill('#university', combo.university);
      await page.fill('#levelOfStudy', combo.course);
      
      // Submit
      await page.click('#run-btn');
      
      // Wait for results
      await page.waitForSelector('.results-head', { timeout: 10000 });
      
      // Verify results loaded
      const resultsCount = await page.locator('.count').textContent();
      expect(resultsCount).toBeTruthy();
    });
  });
});
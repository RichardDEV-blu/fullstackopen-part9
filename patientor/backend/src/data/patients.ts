import type { Patient } from "../types.ts";

const patients: Patient[] = [
  {
    id: "d2773336-f723-11e9-8f0b-362b9e155667",
    name: "John McClane",
    dateOfBirth: "1986-07-09",
    ssn: "090786-122X",
    gender: "male",
    occupation: "New york city cop",
    entries: [
      {
        id: "d811e46d-70b3-4d90-b090-4535c7cf8fb1",
        date: "2015-01-02",
        type: "Hospital",
        specialist: "MD House",
        diagnosisCodes: ["S62.5"],
        description:
          "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
        discharge: {
          date: "2015-01-16",
          criteria: "Thumb has healed.",
        },
      },
    ],
  },
  {
    id: "d2773598-f723-11e9-8f0b-362b9e155667",
    name: "Martin Riggs",
    dateOfBirth: "1979-01-30",
    ssn: "300179-777A",
    gender: "male",
    occupation: "Cop",
    entries: [
      {
        id: "fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62",
        date: "2019-08-05",
        type: "OccupationalHealthcare",
        specialist: "MD House",
        employerName: "HyPD",
        diagnosisCodes: ["Z57.1", "Z74.3", "M51.2"],
        description:
          "Patient mistakenly found himself in a nuclear plant waste site without protection gear. Very minor radiation poisoning. ",
        sickLeave: {
          startDate: "2019-08-05",
          endDate: "2019-08-28",
        },
      },
    ],
  },
  {
    id: "d27736ec-f723-11e9-8f0b-362b9e155667",
    name: "Hans Gruber",
    dateOfBirth: "1970-04-25",
    ssn: "250470-555L",
    gender: "other",
    occupation: "Technician",
    entries: [],
  },
  {
    id: "d2773822-f723-11e9-8f0b-362b9e155661",
    name: "Dana Scully",
    dateOfBirth: "1974-01-05",
    ssn: "050174-432N",
    gender: "female",
    occupation: "Forensic Pathologist",
    entries: [
      {
        id: "b4f4eca1-2aa7-4b13-9a18-4a5535c3c8da",
        date: "2019-10-20",
        specialist: "MD House",
        type: "HealthCheck",
        description: "Yearly control visit. Cholesterol levels back to normal.",
        healthCheckRating: 0,
      },
      {
        id: "fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62",
        date: "2019-09-10",
        specialist: "MD House",
        type: "OccupationalHealthcare",
        employerName: "FBI",
        description: "Prescriptions renewed.",
      },
      {
        id: "37be178f-a432-4ba4-aac2-f86810e36a15",
        date: "2018-10-05",
        specialist: "MD House",
        type: "HealthCheck",
        description:
          "Yearly control visit. Due to high cholesterol levels recommended to eat more vegetables.",
        healthCheckRating: 1,
      },
    ],
  },
  {
    id: "d2773c6e-f723-11e9-8f0b-362b9e155667",
    name: "Matti Luukkainen",
    dateOfBirth: "1971-04-09",
    ssn: "090471-8890",
    gender: "male",
    occupation: "Digital evangelist",
    entries: [
      {
        id: "54a8746e-34c4-4cf4-bf72-bfecd039be9a",
        date: "2019-05-01",
        specialist: "Dr Byte House",
        type: "HealthCheck",
        description: "Digital overdose, very bytestatic. Otherwise healthy.",
        healthCheckRating: 0,
      },
    ],
  },
  {
    id: "e5b1c7a4-3d92-4f68-a1b0-7c24d9e8f351",
    name: "Ellen Ripley",
    dateOfBirth: "1972-06-14",
    ssn: "140672-309B",
    gender: "female",
    occupation: "Warrant officer",
    entries: [
      {
        id: "3c9e2f81-6a47-4d15-b8e3-0f5a1d7c92b6",
        date: "2018-03-11",
        type: "Hospital",
        specialist: "MD House",
        diagnosisCodes: ["M24.2", "H54.7"],
        description:
          "Prolonged cryosleep recovery. Mild muscle atrophy and light sensitivity.",
        discharge: {
          date: "2018-03-25",
          criteria: "Mobility restored and vitals stable.",
        },
      },
    ],
  },
  {
    id: "f08a4d13-5b6e-4c27-9e91-2a7d3c6b84e0",
    name: "Indiana Jones",
    dateOfBirth: "1958-07-01",
    ssn: "010758-211K",
    gender: "male",
    occupation: "Archaeologist",
    entries: [
      {
        id: "9d4b7e20-1c85-4a36-8f02-b5e6a3d7c149",
        date: "2020-04-02",
        type: "OccupationalHealthcare",
        specialist: "Dr Byte House",
        employerName: "Marshall College",
        diagnosisCodes: ["S03.5"],
        description: "Whiplash after a minor vehicle chase. Rest recommended.",
        sickLeave: {
          startDate: "2020-04-02",
          endDate: "2020-04-16",
        },
      },
      {
        id: "1a6f3c58-e7d2-49b0-a4c1-8e92d05b7f36",
        date: "2019-11-12",
        type: "HealthCheck",
        specialist: "MD House",
        description:
          "Yearly control visit. Old injuries acting up, nothing new.",
        healthCheckRating: 2,
      },
    ],
  },
  {
    id: "0b7d9a46-2e18-4c53-96af-d3c1e58f7a24",
    name: "Sarah Connor",
    dateOfBirth: "1965-02-13",
    ssn: "130265-743F",
    gender: "female",
    occupation: "Waitress",
    entries: [
      {
        id: "7f3a1d90-b5c2-4e68-8d47-a29e0c6b1f53",
        date: "2021-07-20",
        type: "HealthCheck",
        specialist: "MD House",
        description: "Follow-up visit. Sleep slightly improved, still tense.",
        healthCheckRating: 2,
      },
      {
        id: "c2e8f5a1-7b43-4d96-a0e7-4f19b6d3c850",
        date: "2021-06-18",
        type: "HealthCheck",
        specialist: "MD House",
        description:
          "Elevated stress and severe sleep deprivation. Follow-up in one month.",
        healthCheckRating: 3,
      },
    ],
  },
  {
    id: "a4c6e2b9-8d31-4f70-b5a2-6e0d9f1c3748",
    name: "Lara Croft",
    dateOfBirth: "1992-02-14",
    ssn: "140292-654T",
    gender: "female",
    occupation: "Explorer",
    entries: [],
  },
  {
    id: "5e9b0d37-c4a8-4162-8f5d-1b7a3e6c2d09",
    name: "Casey Morgan",
    dateOfBirth: "1990-11-03",
    ssn: "031190-482D",
    gender: "other",
    occupation: "Park ranger",
    entries: [
      {
        id: "d71f4a08-92e3-4b5c-a6d0-3c8e5b1f7a92",
        date: "2022-02-14",
        type: "Hospital",
        specialist: "Dr Byte House",
        diagnosisCodes: ["J06.9"],
        description:
          "Acute respiratory infection after a winter storm rescue. Monitored for two days.",
        discharge: {
          date: "2022-02-16",
          criteria: "Fever gone and oxygen saturation normal.",
        },
      },
    ],
  },
];

export default patients;

/* eslint-disable @typescript-eslint/no-unused-vars */
// This will be used to gather and send data for RMP
// @see https://classic.yarnpkg.com/en/package/ratemyprofessor-api

// TODO : Integreate nur's machine learning scraped data later as something to be more scalable.
import * as rmp from 'ratemyprofessor-api';

// Given the scope of this project, the ideal thing would be to simply use the text file nur has and store the values via a hashmap

// we then parse the hashmap and then store the data as a cache

// This is intended to provide a summary for the data from rate my professor.
// we want to be able to dynamically retrieve the data for the professor

// in terms of flow, we will retrieve the name of the professor from the previous mode, and then plug in that information into this function, and execute it for each of the flatlist values we need

export const createMap = () => {
  // TODO : Modify based on what's listed on RMP
  // list of professors per division
  // NOTE : Names of professors are case sensetive
  // we will use this within the teacher's list itself

  // we will have this as in inner function for now
  // INTENT : randomize the ordering of the department thorugh which we search and render
  // unfortunately, for now, the hashmap will need to be re-constructed every time the re-rendering occurs
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const randomizeDepartment = (_OriginalDepartment: string[]) => {
    throw new Error('Not yet implemented');
  };

  // NOTE : the reason this is hardcoded right now is because we have no method of actually collecting data on them
  // once the setup for collecting data on particular professors is setup, we won't need this, however, the hashamp will still be helpful
  // these datas should be globally accessible as well
  // TODO : make these data globally accessible and migrate them somehwere else
  // this is how we dynamically set interface types in typeScript
  //@see https://stackoverflow.com/questions/55831886/typescript-an-index-signature-parameter-must-be-a-string-or-number-when-try

  interface output {
    /**
     * @department is the placeholder for the key of the object, we use [] to specify that this is mutable
     * @string[] is used to specify array of strings
     */
    [department: string]: string[];
  }

  const department_professor_object: output = {
    Administration: [
      'Shant Shahrigian',
      'Tony Liss',
      'James(jim) Davis',
      'Kara Pernicano',
      'Sameeullah Sher',
      'Paul Occhigrosso',
      'Zeev Dagan',
      'Warren Orange',
      'Gregory Williams',
      'Ashiwel Undieh',
      'Tara Nachtigall',
    ],
    Advisor: [
      'Valerie Poulolo',
      'Arnaldo Melendez',
      'Lavie Margolin',
      'Dawn Marczak',
      'Alice Shepard',
      'Belinda Smith',
      'Debra Kennedy',
      'Nkem Nkem Stanley-Mbamlu',
      'Marie Nazon',
    ],
    'African-American Studies': [
      'Claude Brathwaite',
      'Cheryl Sterling',
      'Zaheer Ali',
      'Heather Denyer',
      'Herb Boyd',
      'Timothy Mangin',
      'Rebecca Wellington',
      'Michelle Thompson',
      'Gregory Baggett',
      'Tanzeem Ajmiri',
      'Paula Austin',
      'Jeniffer Onyedum',
      'Robert Gibbons',
      'Farnia Noel',
      'Micheal Gillepsie',
      'Georgina Falu',
      'Tyrene Wright',
      'Abdul-Qasir Islam',
    ],
    'American Studies': [
      'Kareen Williams',
      'timothy Nicholson',
      'Christopher Burrell',
      'Judy Hilkey',
      'Cody Nager',
      'Hajoe Moderegger',
    ],
    Anthropology: [
      'Bernando Chiachia M',
      'Arthur Spears',
      'Lindsay Parme',
      'Cecillia Salvi',
      'Mohammed Junaid',
      'Simanique Moody',
      'Melissa Maldonando-Salcedo',
      'Kate Riley',
      'Samuel Byrd',
      'Kamal Soleimani',
      'Stanley Thangaraj',
      'Alice Baldwin Jones',
      'Omnia Kalili',
      'Monica Ortiz-Suloway',
      'Jose Vazquez',
      'Miriam Entin',
      'Asha Samad-Matias',
      'Carol Laderman',
      'Melissa Zavala',
      'William(bill) Askins',
      'Andrea Ariza Garcia',
      'Rafael Munia',
      'Dane Ruffin',
      'Lopez Joan Lopez',
      'J Yarwood',
      'Charles Rolph',
      'D. Wall',
      'Maggie Whitten',
      'John Calagione',
      'Stuart Wright',
      'Shanelle Matthews',
      'Marcela Restrepo',
      'Robert Siebert',
      'Adam Mikhail',
      'Katherine Stefatos',
      'Julie Lozano',
      'Micheal Elster',
      'Luis Nieto',
      'Diane Sank',
      'Stuart Rockefeller',
      'Bruce Burnside',
      'Matthew Reilly',
      'Scott Schwartz',
      'Theodor Maghrak',
      'Charles Dolph',
      'Branka Djuknic',
      'Leah Mollin-Kling',
      'Rocio Gil Martinez De Escobar',
      'Miriam Fried',
      'Mohammed Junaid',
      'James Tolleson',
    ],
    Arabic: [
      'Shareah Teleghani',
      'Jeremy Randall',
      'Rhoda Ismail',
      'Karim Elhaies',
      'Iman Issa',
      'Mohammed Tkachmita',
      'Mariam Elhaies',
    ],
    Architecture: [
      'M.T. Chang',
      'Jerrilyn Dodds',
      'Marta Gutman',
      'Lee Weintraub',
      'Ali Hocek',
      'W.Garrison McNeil',
      'Alberto Foyo',
      'Jeremy Edmiston',
      'Peter Gisolfi',
      'Julia Salcedo',
      'Jane Kim',
      'John Yurchyk',
      'Kenneth Petrocca',
      'Howard Duffy',
      'Alfonso Oliva',
      'Joshua Jow',
      'Dexter Ciprian',
      'Abdullah Khawarzad',
      'Burt Goncalves',
      'Frank Melendez',
      'Cesare Birignani',
      'Phillip Lee',
      'Oleksandra Topolnytska',
      'James Khamsi',
      'Micheal King',
      'Pablo Iglesias',
      'Gonzalo Lopez',
      'Kyle Dugdale',
      'Damon Bolhassani',
      'Brad Horn',
      'Gordon Gebert',
      'Sean Weiss',
      'Athanasios Haritos',
      'Robert Twombly',
      'Eliana Dotan',
      'Christian Volkmann',
      'Timothy Collins',
      'Johanna Dickson',
      'Jessica Larson',
      'Suzanne Strum',
      'Olivia Vien',
      'Maria Bermudez',
      'Bradley Horn',
      'Fabian Llonch',
      'Nandini Bagchee',
      'Antonio Di Oronzo',
      'Ivan Rosa',
      'Dominick Pilla',
      'Lance Brown',
      'Cassim Shephard',
      'Irma Ostroff',
      'Ahy Aydogan',
      'June Williamson',
      'Jason Kim',
      'Demir Purisic',
      'Paul Ruppert',
      'John Cunningham',
      'Tyler Survant',
      'David Hotson',
      'Jeffrey Roberson',
      'Kaitlin Faherty',
      'Jeremy Edmiston',
      'Christian Martos',
      'Brandt Graves',
      'Jerome Haferd',
      'Fran Leadon',
      'Maria Berman',
      'David Judelson',
      'Alan Feigenberg',
      'Denis Hoffman-Brandtt',
      'Antonio Furgiuelle',
      'Andrew Zago',
      'Eduardo Alfonso',
      'Hillary Brown',
      'John Murray',
      'Erik Forman',
      'VIREN BRAHMBHATT',
      'Beth Carliner',
      'Mohammad Bolhassani',
      'Alan Cation',
      'Ruo Jia',
    ],
    //Art: [''],
    //'Art History': [''],
    //'Asian Studies': [''],
    // Astronomy: [''],
    // Biology: [''],
    // Biomedical: [''],
    // 'Biomedical Engineering': [''],
    // Business: [''],
    // 'Chemical Engineering': [''],
    // Chemistry: [''],
    // Chinese: [''],
    // 'Civil Engineering': [''],
    // Classics: [''],
    // Communication: [''],
    // 'Computer Science': [''],
    // Design: [''],
    // 'Earth Science': [''],
    // Economics: [''],
    // Education: [''],
    // 'Electrical Engineering': [''],
    // Engineering: [''],
    // English: [''],
    // 'English As A Second Language': [''],
    // Environment: [''],
    // 'Ethnic Studies': [''],
    // Film: [''],
    // Finance: [''],
    // 'Fine Arts': [''],
    // 'Foreign Languages & Literature': [''],
    // French: [''],
    // 'Freshman Year Experience': [''],
    // Geography: [''],
    // Geology: [''],
    // German: [''],
    // 'Graphic Arts': [''],
    // 'Health Science': [''],
    // Hindustani: [''],
    // History: [''],
    // Honors: [''],
    // Hospitality: [''],
    // Humanities: [''],
    // 'Internation Service': [''],
    // 'International Studies': [''],
    // Italian: [''],
    // Japanese: [''],
    // 'Judaic Studies': [''],
    // Languages: [''],
    // Latin: [''],
    // 'Latin American Studies': [''],
    // Law: [''],
    // 'Liberal Studies': [''],
    // Libraries: [''],
    // 'Library & Information Science': [''],
    // Literature: [''],
    // Management: [''],
    // Marketing: [''],
    // Mathematics: [''],
    // 'Mechanical Engineering': [''],
    // 'Media Arts': [''],
    // Medicine: [''],
    // Music: [''],
    // Nursing: [''],
    // Philosophy: [''],
    // Physics: [''],
    // 'Political Science': [''],
    // Portugese: [''],
    // Psychology: [''],
    // 'Public Policy': [''],
    // Science: [''],
    // 'Social Science': [''],
    // Sociology: [''],
    // Spanish: [''],
    // Speech: [''],
    // Theater: [''],
    // 'Urban Design & Development': [''],
    // 'Urban Landscape': [''],
    // "Women's Studies": [''],
    // 'World Civilizations': [''],
    // 'World Humanities': [],
  };
  const department_list: string[] = [
    'Administration',
    'Advisor',
    'African-American Studies',
    'American Studies',
    'Anthropology',
    'Arabic',
    'Architecture',
    // 'Art',
    // 'Art History',
    // 'Asian Studies',
    // 'Astronomy',
    // 'Biology',
    // 'Biomedical',
    // 'Biomedical Engineering',
    // 'Business',
    // 'Chemical Engineering',
    // 'Chemistry',
    // 'Chinese',
    // 'Civil Engineering',
    // 'Classics',
    // 'Communication',
    // 'Computer Science',
    // 'Design',
    // 'Earth Science',
    // 'Economics',
    // 'Education',
    // 'Electrical Engineering',
    // 'Engineering',
    // 'English',
    // 'English As A Second Language',
    // 'Environment',
    // 'Ethnic Studies',
    // 'Film',
    // 'Finance',
    // 'Fine Arts',
    // 'Foreign Languages & Literature',
    // 'French',
    // 'Freshman Year Experience',
    // 'Geography',
    // 'Geology',
    // 'German',
    // 'Graphic Arts',
    // 'Health Science',
    // 'Hindustani',
    // 'History',
    // 'Honors',
    // 'Hospitality',
    // 'Humanities',
    // 'Internation Service',
    // 'International Studies',
    // 'Italian',
    // 'Japanese',
    // 'Judaic Studies',
    // 'Languages',
    // 'Latin',
    // 'Latin American Studies',
    // 'Law',
    // 'Liberal Studies',
    // 'Libraries',
    // 'Library & Information Science',
    // 'Literature',
    // 'Management',
    // 'Marketing',
    // 'Mathematics',
    // 'Mechanical Engineering',
    // 'Media Arts',
    // 'Medicine',
    // 'Music',
    // 'Nursing',
    // 'Philosophy',
    // 'Physics',
    // 'Political Science',
    // 'Portugese',
    // 'Psychology',
    // 'Public Policy',
    // 'Science',
    // 'Social Science',
    // 'Sociology',
    // 'Spanish',
    // 'Speech',
    // 'Theater',
    // 'Urban Design & Development',
    // 'Urban Landscape',
    // "Women's Studies",
    // 'World Civilizations',
    // 'World Humanities',
  ];

  const department_professor_map = new Map<string, string[]>();

  // iterate throguh the list using a for loop
  for (let i = 0; i < department_list.length; i++) {
    department_professor_map.set(
      department_list[i],
      department_professor_object[department_list[i]]
    );
  }
  console.log(department_professor_map);
  return department_professor_map;
};

export const getSpecificProfessorData = async (professorName: string) => {
  // this value will remain static for now
  const school = await rmp.searchSchool('City College of New York');

  if (school !== undefined) {
    const schoolId = school[0].node.id;
    // Attempting to break down the json data so that they can be saved as I iterate over them and send them to the database
    //console.log(JSON.stringify(school[0].node));
    //console.log(Object.keys(JSON.stringify(school[0].node)));
    // to search for professors
    //console.log(schoolId);

    // basic test to check if I can retrieve the information about professor
    // this will provide a list of rating for a particular professor

    const searchResults = await rmp.searchProfessorsAtSchoolId(professorName, schoolId);

    const getProfessorRating = await rmp.getProfessorRatingAtSchoolId(professorName, schoolId);
    const searchRes = searchResults !== undefined ? searchResults : 'unknown';
    console.log(`Summary of ${professorName} : ${JSON.stringify(getProfessorRating)}`);
    //console.log(searchRes);

    return [searchRes, getProfessorRating];
  }
};

// @param inputMap: Map<string, string[]>
export const gatherRMPSummary = async () => {
  const resultMap = createMap();
  const result: any = [];
  resultMap.forEach((value: string[], key: string) => {
    for (let iterator = 0; iterator < value.length; iterator++) {
      const professorSummary = getSpecificProfessorData(value[iterator]);
      result.push(professorSummary);
    }
  });
  console.log(`Current resulting array is : ${JSON.stringify(result)}`);
};

/**
 * Logic that I am trying to implement here is the following:
 * step 1 : Hardcode the list of departments
 * step 2 : itereate throguh the departments
 * and add the corresponding professors within each of the particular depeartments within a hashmap
 * step 3 : iterate throguh the hashamp
 * step 4 : call on the getSepcificProfessorData
 * step 5 : save the resulting value within an array of objects
 * step 6 : This saved data will then be iterated over
 * and stored onto the database itself within the specific model
 *
 */

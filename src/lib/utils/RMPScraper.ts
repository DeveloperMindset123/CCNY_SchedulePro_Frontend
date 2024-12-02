/* eslint-disable @typescript-eslint/no-unused-vars */
// This will be used to gather and send data for RMP
// @see https://classic.yarnpkg.com/en/package/ratemyprofessor-api

// TODO : Integreate nur's machine learning scraped data later as something to be more scalable.
import * as rmp from 'ratemyprofessor-api';
import { department_professor_object_type } from './data/constants'; // interface for professor object
import { db } from './db';
import comments from 'comments.json';

// we then parse the hashmap and then store the data as a cache
// This is intended to provide a summary for the data from rate my professor.
// we want to be able to dynamically retrieve the data for the professor
// in terms of flow, we will retrieve the name of the professor from the previous mode, and then plug in that information into this function, and execute it for each of the flatlist values we need

// randomize data for list of professors
export const arrayShuffler = (inputArray: string[]) => {
  for (let iterator = inputArray.length - 1; iterator > 0; iterator--) {
    const secondIterator = Math.floor(Math.random() * (iterator + 1));
    [inputArray[iterator], inputArray[secondIterator]] = [
      inputArray[secondIterator],
      inputArray[iterator],
    ];
    return inputArray;
  }
};

export const createMap = (inputArray: string[], inputObject: department_professor_object_type) => {
  // list of professors per division
  // we will use this within the teacher's list itself
  // we will have this as in inner function for now
  // INTENT : randomize the ordering of the department through which we search and render
  // unfortunately, for now, the hashmap will need to be re-constructed every time the re-rendering occurs
  // NOTE : the shuffling logic should take place when the map is created, so that the keys within the map matches

  const shuffledArray: string[] | undefined = arrayShuffler(inputArray);
  // once the setup for collecting data on particular professors is setup, we won't need this, however, the hashamp will still be helpful
  // these datas should be globally accessible as well
  // this is how we dynamically set interface types in typeScript
  //@see https://stackoverflow.com/questions/55831886/typescript-an-index-signature-parameter-must-be-a-string-or-number-when-try

  const department_professor_map = new Map<string, string[]>();

  // iterate throguh the list using a for loop
  if (shuffledArray !== undefined && inputObject !== undefined) {
    for (let i = 0; i < inputArray.length; i++) {
      department_professor_map.set(
        // ensure that all the keys are set to lower case
        // this will reduce the issue regarding case sensetive issues arising
        shuffledArray[i].toLowerCase(),
        inputObject[inputArray[i]]
      );
    }
  }

  return department_professor_map;
};

export const getSpecificProfessorData = async (professorName: string) => {
  // school name will remain unchnaged
  const school = await rmp.searchSchool('City College of New York');

  if (school !== undefined) {
    const schoolId = school[0].node.id;
    const getProfessorRating = await rmp.getProfessorRatingAtSchoolId(professorName, schoolId);

    return getProfessorRating;
  }
};

// not very useful of a function
export const getSchoolId = async (nameOfSchool: string) => {
  const school = await rmp.searchSchool(nameOfSchool);
  if (school) {
    return school[0].node.id.toString();
  }
  return 'undefined';
};

// not very useful of a function
export const searchByProfessor = async (professorName: string, nameOfSchool: string) => {
  const searchResults = await rmp.searchProfessorsAtSchoolId(
    professorName,
    await getSchoolId(nameOfSchool)
  ); //--> provides a list of professors, can be used for searching logic potentially during later stages of development
  return searchResults;
};

/**
 *  @param inputMap: Map<string, string[]>
 *  @detail1 problem is that we cannot call on this function on
 * @detail2 instead of iterating thorugh all the data values at once
 * @detail3 we will instead iterate throguh individual values instead
 * @detail4 the hashmap will use constant time complexity to check if the particular department exists or not
 * @detail5 if so, then return the list of teachers associated with it
 * @see https://stackoverflow.com/questions/44956867/how-to-check-if-javascript-map-has-an-object-key
 */
export const gatherSummaryByDepartment = async (
  // note, we are passing in the map that is created using createMap
  inputMap: Map<string, string[]>,
  department: string
) => {
  // variable where data is being stored in array format
  const departmentResult: any = [];
  // search to check if department exist
  const doesKeyExist: boolean = inputMap.has(department);
  if (doesKeyExist) {
    const teacherListByDepartment = inputMap.get(department);
    if (teacherListByDepartment !== undefined) {
      for (let iterator = 0; iterator < teacherListByDepartment.length; iterator++) {
        const professorSummary = await getSpecificProfessorData(teacherListByDepartment[iterator]);
        departmentResult.push(professorSummary);
      }
    }
  }
  return departmentResult;
};

/**
 * @INTENT : This function will parse thorugh the list of departments
 * @function gatherSummaryByDepartment() for each iteraetion
 * @returns an array
 * @NOTE : the correct parameter completeProfessorSummary is supposed to take is the departmentResult
 */

export const completeProfessorSummary = async (mapData: Map<string, string[]>) => {
  // TODO : see how this can be improved, test and check to make sure everything is working as intended.
  /**
   * Algorithm
   * @step1 Iterate throguh the hashamp created using createMap() --> pass in the appropriate parameters
   * @step2 the main function that will be called each iteration is gatherSummaryByDepartment(mapData, someDepartment)
   * @step3 the resulting department result will then be saved in an 2D array in itself
   */
  const finalResult: string[][] = [];
  // NOTE : this would theoretically be O(N * K) in terms of time complexity
  for (const [department, teacherList] of mapData) {
    const dataGathered: string[] = await gatherSummaryByDepartment(mapData, department);
    console.log(`Current Department : ${department}`);
    //console.log(`Gathered Data is : ${dataGathered}`);
    finalResult.push(dataGathered);
  }
  // TODO : Remove this after
  console.log(JSON.stringify(finalResult));
  // returns 2D array
  return finalResult;
};

export const sendToDatabase = async (data: string[][]) => {
  /**
   * @step1 : call on the completeProfessorSummary() function with the appropraite parameters
   * @step2 : iterate through the 2D array
   * @step3 : access the keys of the objects for their corresponding values
   * @step4 : send the values to the postgres database following the schema created
   * @step5 : execute and check if the data has been successfully sent or not
   */
  // link explaining how data can be pushed
  // @see https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/introduction#3-importing-prisma-client

  // NOTE : we are working with list of objects in this case
  // first array contains the array containing professors regarding a particular department

  // list of keys are --> avgRating,avgDifficulty,wouldTakeAgainPercent,numRatings,formattedName,department,link

  for (const row of data) {
    // item in this case is the json object
    for (const item of row) {
      const currentItem: any = item;
      const professors_data = await db.rateMyProfessorDataSummary.create({
        data: {
          professorName: currentItem.formattedName,
          avgRatings: parseFloat(currentItem.avgRating),
          avgDifficulty: parseFloat(currentItem.avgDifficulty),
          numRatings: parseInt(currentItem.numRatings),
          wouldTakeAgain: currentItem.wouldTakeAgainPercent + '%',
          department: currentItem.department,
        },
      });
    }
  }
};

// find unique doesn't work because
export const searchDatabase = async (professorName: string, departmentName: string) => {
  // search database by name of professor
  // as a test run
  // this test run works
  const result = await db.rateMyProfessorDataSummary.findFirst({
    where: {
      professorName: professorName,
      department: departmentName,
    },
  });

  console.log(result?.id);
  return result?.id;
};

export const sendSummaryAndCommentsToDatabase = async () => {
  // this will directly load the json file
  // parse the json file
  // retrieve the name
  // comments
  // rating
  // department
  // the linking value
  // comments represents an array of Json Object
  // we can ignore this error since it's working at the moment
  // at printing out the id

  // define an inner function to store the comments per professor in the form of an array
  // the remaining information will be stored as an outer loop
  // comments is in the form of array of strings
  comments.forEach(async (comment) => {
    // reset the data record here
    const store_comments: string[] = [];
    comment.comments.forEach((individual_comment) => {
      //console.log(`Individual comments : ${JSON.stringify(individual_comment.text)}`);
      store_comments.push(individual_comment.text);
    });

    // TODO : create the data record here
    // this should work once all the data has been pushed to database
    const foreignKeyData = searchDatabase(comment.professor_name, comment.department);
    console.log(`Foregin key data id : ${foreignKeyData}`);
    const
    const professor_comments_data = await db.rateMyProfessorCompleteData.create({
      data: {
        professor_name: comment.professor_name,
        rating: parseFloat(comment.rating),
        department: comment.department,
        comments: store_comments,
        foreign_linker_id: foreignKeyData?.id,
      },
    });
  });
  console.log(`Data Saved Successfully!`);
};

//   // console.log(`stored comments are : ${store_comments[26295]}`);
//   // console.log('End of function execution');
// };

// define a function to map the RMPSummary id with the
/**
 * Logic that I am trying to implement here is the following:
 * step 1 : Hardcode the list of departments --> partially complete
 * step 2 : itereate throguh the departments --> partially complete
 * and add the corresponding professors within each of the particular depeartments within a hashmap
 * step 3 : iterate throguh the hashamp
 * step 4 : call on the getSepcificProfessorData
 * step 5 : save the resulting value within an array of objects
 * step 6 : This saved data will then be iterated over
 * and stored onto the database itself within the specific model
 *
 */

// ? for learning/refresher on how routes work, not relevant to project
// ! Use this for dirty playground for testing/defining any preliminary api calls
//import express from 'express';

// TODO : file for running and testing to better understand how express works as a whole
/*
const app = express();
// define some example routes
// hello world for express
// this
// @param1 method or path for API call being made
// @param2 handler function to determine what to do once the request is recieved and what kind of response logic should take place
app.get('/testRoute', function (_req, res) {
  res.send('Successful api call');
  // the following are various mthods
  // one mthod of using it is to retireve a file from the request and download it to local storage
  res.download('../auth/test.rest');
  res.jsonp({
    // it can be any message as needed
    message: 'File has been donwloaded',
  });
  // end the response
  res.end();
});

app.get('/retrieveID', async (req, res) => {
  //@see https://stackoverflow.com/questions/17007997/how-to-access-the-get-parameters-after-in-express
  // explains how to retrieve query parameters made during an API call
  const queryParams = await req.query.id;
  res.send(`The query param is : ${queryParams}`);
  res.end();
});

// define where the app should be running, meaning define the custom port

//@example call
/**
 * curl -X GET "http://localhost:4000/retrieveID?id=
10"
* must be encased around string based values


// ! understanding how the next() function, aka callback function, also known as middleware works in this scenario
// next allow us to control api flow, and also allows us to overload and call on the same route more than once
app.get('/testRouteWithCallback', function (_req, res, next) {
  res.write('This should execute\n');
  next();
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get('/testRouteWithCallback', function (_req, res, next) {
  res.write('This should execute after');
  // terminates the request
  next();
  res.end();
});
app.listen(4000, () => {
  console.log('App listening to port 5000!');
});
*/

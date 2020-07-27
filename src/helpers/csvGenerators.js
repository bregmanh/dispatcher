import { ExportToCsv } from 'export-to-csv';


export function csvGenerator(driver, tasksDatabase, input) {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const daysUse = [];
  let data = [];
  //number of weeks in database for the driver
  const numOfWeeks = Object.keys(tasksDatabase[driver["id"]]).length;
  //generate day list to iterate through based on number of weeks
  for (let k = 0; k < numOfWeeks; k++) {
    daysUse.push(...daysOfWeek)
  }
  //looping through the days
    for (let i = 0; i < (numOfWeeks * 7); i ++) {
      let pickupCount = 0;
      let dropoffCount = 0;
      let otherCount = 0;
      for (let task of tasksDatabase[driver["id"]][Math.floor(i/8)+1]) {
        let dayCheck = daysUse.slice(i, i+1)
        console.log("dayCheck", dayCheck)
        //if the day of task matches the task being iterated
        if (dayCheck.includes(task.day)) {
          if (task.type === "pickup") {
            pickupCount += 1;
          } else if (task.type === "dropoff") {
            dropoffCount += 1;

          } else {
            otherCount += 1;
          }
        }
      }
      data.push({ "Time-Frame": `Day ${i +1 }-${i +1}`, "Pickup": pickupCount, "Dropoff": dropoffCount, "Other": otherCount })
  }
  // for (let week in tasksDatabase[driver["id"]]) {

  // }
  // const csvExporter = new ExportToCsv(options);
  // console.log("input", input)
  // if (input === 2 || input === 4 || input === 7 || input === 14 || input === 28) {

  //   csvExporter.generateCsv(data);
  // }

  console.log("data", data)
}
// let data = [
//   {
//     name: 'Test 1',
//     age: 13,
//     average: 8.2,
//     approved: true,
//     description: "using 'Content here, content here' "
//   },
//   {
//     name: 'Test 2',
//     age: 11,
//     average: 8.2,
//     approved: true,
//     description: "using 'Content here, content here' "
//   },
//   {
//     name: 'Test 4',
//     age: 10,
//     average: 8.2,
//     approved: true,
//     description: "using 'Content here, content here' "
//   },
// ];

// const options = {
//   fieldSeparator: ',',
//   quoteStrings: '"',
//   decimalSeparator: '.',
//   showLabels: true,
//   showTitle: true,
//   title: 'My Awesome CSV',
//   useTextFile: false,
//   useBom: true,
//   useKeysAsHeaders: true,
//   // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
// };
// for (let i = 0; i < 7; i++) {
//   let pickupCount = 0;
//   let dropoffCount = 0;
//   let otherCount = 0;
//   for (let task of tasksDatabase[driver["id"]][week]) {
//     //out of range

//     if (task.day === daysArr[i] || task.day === daysArr[i + 1]) {
//       if (task.type === "pickup") {
//         pickupCount += 1;
//       } else if (task.type === "dropoff") {
//         dropoffCount += 1;

//       } else {
//         otherCount += 1;

//       }
//     }if(i+1>=daysArr.length){

//     }

//   }

//     data.push({ "Time-Frame": `Day ${i + 1}-${i + 2}`, "Pickup": pickupCount, "Dropoff": dropoffCount, "Other": otherCount })


//   i += (input);

// }
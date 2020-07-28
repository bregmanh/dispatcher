import { ExportToCsv } from "export-to-csv";

export function csvGenerator(driver, tasksDatabase, input) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const daysUse = [];
  let data = [];
  //number of weeks in database for the driver
  const weeks = Object.keys(tasksDatabase[driver["id"]]);
  const numOfWeeks = weeks.length;
  //generate day list to iterate through based on number of weeks
  for (let k = 0; k < numOfWeeks; k++) {
    daysUse.push(...daysOfWeek);
  }
  //looping through the days
  for (let i = 0; i < numOfWeeks * 7; i++) {
    let pickupCount = 0;
    let dropoffCount = 0;
    let otherCount = 0;
    //if the week is empty

    for (let task of tasksDatabase[driver["id"]][weeks[Math.floor(i / 7)]]) {
      let dayCheck = daysUse.slice(i, i + 1);
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
    data.push({
      "Time-Frame": `Day ${i + 1}-${i + 1}`,
      Pickup: pickupCount,
      Dropoff: dropoffCount,
      Other: otherCount,
    });
  }

  //to get data for every few days
  let finalData = [];
  for (let i = 0; i < data.length; i += input) {
    let pickupCount = 0;
    let dropoffCount = 0;
    let otherCount = 0;

    for (let j = i; j < input + i; j++) {
      //data stops existing for certain divisions of time when reaching end of tasks in database
      if (data[j]) {
        if (data[j]["Pickup"] > 0) {
          pickupCount += data[j]["Pickup"];
        }
        if (data[j]["Dropoff"] > 0) {
          dropoffCount += data[j]["Dropoff"];
        }
        if (data[j]["Other"] > 0) {
          otherCount += data[j]["Other"];
        }
      }
    }
    finalData.push({
      "Time-Frame": `Day ${i + 1}-${i + input}`,
      Pickup: pickupCount,
      Dropoff: dropoffCount,
      Other: otherCount,
    });
  }

  const options = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    showTitle: true,
    title: "Driver Schedule",
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };
  const csvExporter = new ExportToCsv(options);
  if (
    input === 2 ||
    input === 4 ||
    input === 7 ||
    input === 14 ||
    input === 28
  ) {
    csvExporter.generateCsv(finalData);
  }
}

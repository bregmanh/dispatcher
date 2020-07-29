import {
  checkConflicts
} from "./formSubmitters";

const driver = { id: "1", name: "Alice" };
const week = 1;
const tasksData = {
  "1": {
    "1": [
      {
        type: "dropoff",
        day: "Monday",
        start_time: 10,
        end_time: 16,
        description: "container #3",
        location: "london",
      },
      {
        type: "other",
        day: "Tuesday",
        start_time: 7,
        end_time: 12,
        description: "container #2",
        location: "toronto",
      },
      {
        type: "pickup",
        day: "Monday",
        start_time: 6,
        end_time: 8,
        description: "container #300",
        location: "ottawa",
      },
    ],
  }
};

describe('conflict checker function returns the correct results', () => {
  test("should flag conflict when new task (same week) overlaps from bottom of one existing task", () => {
    const newTask = {
      type: "dropoff",
      day: "Monday",
      start_time: 8,
      end_time: 15,
      description: "container #3",
      location: "london",
    }
    const [conflict, conflictTask, conflictIndex] = checkConflicts(tasksData, week, newTask, driver);
    expect(conflict).toBe(true);
    expect(conflictTask).toEqual([{
      type: "dropoff",
      day: "Monday",
      start_time: 10,
      end_time: 16,
      description: "container #3",
      location: "london",
    }]);
    expect(conflictIndex).toEqual([0]);
  });

  test("should flag conflict when new task (same week) overlaps from top of one existing task", () => {
    const newTask = {
      type: "dropoff",
      day: "Monday",
      start_time: 15,
      end_time: 17,
      description: "container #3",
      location: "london",
    }
    const [conflict, conflictTask, conflictIndex] = checkConflicts(tasksData, week, newTask, driver);
    expect(conflict).toBe(true);
    expect(conflictTask).toEqual([{
      type: "dropoff",
      day: "Monday",
      start_time: 10,
      end_time: 16,
      description: "container #3",
      location: "london",
    }]);
    expect(conflictIndex).toEqual([0]);
  });

  test("should flag conflict when new task (same week) overlaps from within of one existing task", () => {
    const newTask = {
      type: "dropoff",
      day: "Monday",
      start_time: 11,
      end_time: 16,
      description: "container #3",
      location: "london",
    }
    const [conflict, conflictTask, conflictIndex] = checkConflicts(tasksData, week, newTask, driver);
    expect(conflict).toBe(true);
    expect(conflictTask).toEqual([{
      type: "dropoff",
      day: "Monday",
      start_time: 10,
      end_time: 16,
      description: "container #3",
      location: "london",
    }]);
    expect(conflictIndex).toEqual([0]);
  });

  test("should flag conflict when new task overlaps with multiple existing tasks", () => {
    const newTask = {
      type: "dropoff",
      day: "Monday",
      start_time: 2,
      end_time: 16,
      description: "container #3",
      location: "london",
    }
    const [conflict, conflictTask, conflictIndex] = checkConflicts(tasksData, week, newTask, driver);
    expect(conflict).toBe(true);
    expect(conflictTask).toEqual([{
      type: "dropoff",
      day: "Monday",
      start_time: 10,
      end_time: 16,
      description: "container #3",
      location: "london",
    }, {
      type: "pickup",
      day: "Monday",
      start_time: 6,
      end_time: 8,
      description: "container #300",
      location: "ottawa",
    }]);
    expect(conflictIndex).toEqual([0, 2]);
  });

  test("returns false if no conflict", () => {
    const newTask = {
      type: "dropoff",
      day: "Monday",
      start_time: 8,
      end_time: 10,
      description: "container #3",
      location: "london",
    }
    const conflict = checkConflicts(tasksData, week, newTask, driver);
    expect(conflict).toBe(false);
  });
});
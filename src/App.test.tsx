import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import App from "./App";

const renderApp = () => render(<App />);

afterEach(() => {
  cleanup();
});

// elements in App by data-testids
const testIds = {
  createTaskInput: "create-task-input",
  createTaskButton: "create-task-button",
  moveBackButton: "move-back-button",
  moveForwardButton: "move-forward-button",
  deleteButton: "delete-button",
  stages: ["stage-0", "stage-1", "stage-2", "stage-3"],
} as const;

const getFormElements = async (taskName: string | undefined = undefined) => {
  const createTaskInput = await screen.findByTestId(testIds.createTaskInput);
  const createTaskButton = await screen.findByTestId(testIds.createTaskButton);
  return { createTaskButton, createTaskInput };
};

const getStages = async () => {
  const backlogStage = await screen.findByTestId(testIds.stages[0]);
  const toDoStage = await screen.findByTestId(testIds.stages[1]);
  const onGoingStage = await screen.findByTestId(testIds.stages[2]);
  const doneStage = await screen.findByTestId(testIds.stages[3]);
  return { backlogStage, toDoStage, onGoingStage, doneStage };
};

const getTaskElements = async (taskName: string) => {
  const taskBackIconId = `${taskName.split(" ").join("-")}-back`;
  const taskForwardIconId = `${taskName.split(" ").join("-")}-forward`;
  const taskDeleteIconId = `${taskName.split(" ").join("-")}-delete`;

  const backButton = await screen.findByTestId(taskBackIconId);
  const deleteButton = await screen.findByTestId(taskDeleteIconId);
  const forwardButton = await screen.findByTestId(taskForwardIconId);

  return { backButton, deleteButton, forwardButton };
};

const getTask = (taskName: string) => {
  const taskId = `${taskName.split(" ").join("-")}-name`;
  return screen.queryByTestId(taskId);
};

test("Clicking on Create Task Button should add it to first stage and do nothing if input is empty", async () => {
  renderApp();
  const { createTaskButton, createTaskInput } = await getFormElements();
  const { backlogStage, toDoStage } = await getStages();

  const taskName = "task 1";

  fireEvent.change(createTaskInput, {
    target: { value: taskName },
  });

  expect(backlogStage).not.toContainElement(getTask(taskName));
  expect(toDoStage).not.toContainElement(getTask(taskName));

  fireEvent.click(createTaskButton);
  waitFor(() => {
    expect(backlogStage).toContainElement(getTask(taskName));
    expect(toDoStage).not.toContainElement(getTask(taskName));
    expect((createTaskInput as any).value).toBeFalsy();
  });

  const initialLength = backlogStage.children.length;
  fireEvent.change(createTaskInput, {
    target: { value: "" },
  });

  fireEvent.click(createTaskButton);
  expect(backlogStage.children.length).toBe(initialLength);
});

test("For a task in stage 0, backward icon is disabled and forward icon is enabled", async () => {
  renderApp();

  const { createTaskButton, createTaskInput } = await getFormElements();
  const { backlogStage } = await getStages();

  const taskName = "task 1";

  fireEvent.change(createTaskInput, {
    target: { value: taskName },
  });

  fireEvent.click(createTaskButton);

  const { forwardButton, backButton } = await getTaskElements(taskName);

  waitFor(() => {
    expect(backlogStage).toContainElement(getTask(taskName));
    expect(forwardButton.hasAttribute("disabled")).toBe(true);
    expect(backButton.hasAttribute("disabled")).toBeFalsy();
  });
});

test("For a task in stage 0, can be moved forward till stage 4 and check for icons are enabled/disabled correctly", async () => {
  renderApp();

  const { createTaskButton, createTaskInput } = await getFormElements();
  const { backlogStage, toDoStage, doneStage, onGoingStage } =
    await getStages();

  const taskName = "task 1";
  const { forwardButton, backButton } = await getTaskElements(taskName);

  fireEvent.change(createTaskInput, {
    target: { value: taskName },
  });

  fireEvent.click(createTaskButton);
  waitFor(() => {
    const task = getTask(taskName);
    expect(backlogStage).toContainElement(task);
    expect(toDoStage).not.toContainElement(task);
    expect(onGoingStage).not.toContainElement(task);
    expect(doneStage).not.toContainElement(task);
  });

  fireEvent.click(forwardButton);
  waitFor(() => {
    const task = getTask(taskName);
    expect(backlogStage).not.toContainElement(task);
    expect(toDoStage).toContainElement(task);
    expect(onGoingStage).not.toContainElement(task);
    expect(doneStage).not.toContainElement(task);

    expect(backButton.hasAttribute("disabled")).toBeFalsy();
    expect(forwardButton.hasAttribute("disabled")).toBeFalsy();
  });

  fireEvent.click(forwardButton);
  waitFor(() => {
    const task = getTask(taskName);
    expect(backlogStage).not.toContainElement(task);
    expect(toDoStage).not.toContainElement(task);
    expect(onGoingStage).toContainElement(task);
    expect(doneStage).not.toContainElement(task);

    expect(backButton.hasAttribute("disabled")).toBeFalsy();
    expect(forwardButton.hasAttribute("disabled")).toBeFalsy();
  });

  fireEvent.click(forwardButton);
  waitFor(() => {
    const task = getTask(taskName);
    expect(backlogStage).not.toContainElement(task);
    expect(toDoStage).not.toContainElement(task);
    expect(onGoingStage).not.toContainElement(task);
    expect(doneStage).toContainElement(task);

    expect(backButton.hasAttribute("disabled")).toBeFalsy();
    expect(forwardButton.hasAttribute("disabled")).toBe(true);
  });
});

test("For a task in stage 4, can be moved backward till stage 0 and check for icons are enabled/disabled correctly", async () => {
  renderApp();

  const { createTaskButton, createTaskInput } = await getFormElements();
  const { backlogStage, toDoStage, doneStage, onGoingStage } =
    await getStages();

  const taskName = "task 1";

  fireEvent.change(createTaskInput, {
    target: { value: taskName },
  });

  fireEvent.click(createTaskButton);

  const { forwardButton, backButton } = await getTaskElements(taskName);

  fireEvent.click(forwardButton);
  fireEvent.click(forwardButton);
  fireEvent.click(forwardButton);

  fireEvent.click(backButton);
  waitFor(() => {
    const task = getTask(taskName);
    expect(backlogStage).not.toContainElement(task);
    expect(toDoStage).not.toContainElement(task);
    expect(onGoingStage).toContainElement(task);
    expect(doneStage).not.toContainElement(task);
    expect(backButton.hasAttribute("disabled")).toBeFalsy();
    expect(forwardButton.hasAttribute("disabled")).toBeFalsy();
  });

  fireEvent.click(backButton);
  waitFor(() => {
    const task = getTask(taskName);
    expect(backlogStage).not.toContainElement(task);
    expect(toDoStage).toContainElement(task);
    expect(onGoingStage).not.toContainElement(task);
    expect(doneStage).not.toContainElement(task);
    expect(backButton.hasAttribute("disabled")).toBeFalsy();
    expect(forwardButton.hasAttribute("disabled")).toBeFalsy();
  });

  fireEvent.click(backButton);
  waitFor(() => {
    const task = getTask(taskName);
    expect(backlogStage).toContainElement(task);
    expect(toDoStage).not.toContainElement(task);
    expect(onGoingStage).not.toContainElement(task);
    expect(doneStage).not.toContainElement(task);
    expect(backButton.hasAttribute("disabled")).toBe(true);
    expect(forwardButton.hasAttribute("disabled")).toBeFalsy();
  });
});

test("Clicking on delete should delete the task in stage 0", async () => {
  renderApp();

  const { createTaskButton, createTaskInput } = await getFormElements();
  const { backlogStage } = await getStages();

  const taskName = "task 1";

  fireEvent.change(createTaskInput, {
    target: { value: taskName },
  });

  fireEvent.click(createTaskButton);

  const { deleteButton } = await getTaskElements(taskName);

  waitFor(() => {
    const task = getTask(taskName);
    expect(backlogStage).toContainElement(task);
    expect(deleteButton.hasAttribute("disabled")).toBe(false);
  });

  fireEvent.click(deleteButton);
  waitFor(() => {
    const task = getTask(taskName);
    expect(backlogStage).not.toContainElement(task);
  });
});

test("Clicking on delete should delete the task in stage 1", async () => {
  renderApp();

  const { createTaskButton, createTaskInput } = await getFormElements();
  const { toDoStage } = await getStages();

  const taskName = "task 1";

  fireEvent.change(createTaskInput, {
    target: { value: taskName },
  });

  fireEvent.click(createTaskButton);

  const { forwardButton, deleteButton } = await getTaskElements(taskName);

  fireEvent.click(forwardButton);
  waitFor(() => {
    const task = getTask(taskName);
    expect(toDoStage).toContainElement(task);
    expect(deleteButton.hasAttribute("disabled")).toBe(false);
  });

  fireEvent.click(deleteButton);
  waitFor(() => {
    const task = getTask(taskName);
    expect(toDoStage).not.toContainElement(task);
  });
});

test("Clicking on delete should delete the task in stage 2", async () => {
  renderApp();

  const { createTaskButton, createTaskInput } = await getFormElements();
  const { onGoingStage } = await getStages();

  const taskName = "task 1";

  fireEvent.change(createTaskInput, {
    target: { value: taskName },
  });

  fireEvent.click(createTaskButton);

  const { forwardButton, deleteButton } = await getTaskElements(taskName);

  fireEvent.click(forwardButton);
  fireEvent.click(forwardButton);

  waitFor(() => {
    const task = getTask(taskName);
    expect(onGoingStage).toContainElement(task);
    expect(deleteButton.hasAttribute("disabled")).toBe(false);
  });

  fireEvent.click(deleteButton);
  waitFor(() => {
    const task = getTask(taskName);
    expect(onGoingStage).not.toContainElement(task);
  });
});

test("Clicking on delete should delete the task in stage 3", async () => {
  renderApp();

  const { createTaskButton, createTaskInput } = await getFormElements();

  const taskName = "task 1";

  fireEvent.change(createTaskInput, {
    target: { value: taskName },
  });

  fireEvent.click(createTaskButton);

  const { forwardButton, deleteButton } = await getTaskElements(taskName);
  fireEvent.click(forwardButton);
  fireEvent.click(forwardButton);
  fireEvent.click(forwardButton);

  const { doneStage } = await getStages();

  waitFor(() => {
    const task = getTask(taskName);
    expect(doneStage).toContainElement(task);
    expect(deleteButton.hasAttribute("disabled")).toBe(false);
  });

  fireEvent.click(deleteButton);
  waitFor(() => {
    const task = getTask(taskName);
    expect(doneStage).not.toContainElement(task);
  });
});

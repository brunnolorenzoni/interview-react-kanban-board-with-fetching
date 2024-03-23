import { useRef } from "react";

export default function TaskForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const isSubmitting = false;

  return (
    <section className="mt-50 layout-row align-items-center justify-content-center">
      <form>
        <input
          ref={inputRef}
          id="create-task-input"
          type="text"
          className="large"
          placeholder="New task name"
          data-testid="create-task-input"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          className="ml-30"
          data-testid="create-task-button"
          disabled={isSubmitting}
        >
          Create task
        </button>
      </form>
    </section>
  );
}

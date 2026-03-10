import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@peakon/bedrock/react/button";
import "@peakon/bedrock/css/custom-properties/index.css";
import "@peakon/bedrock/css/reset/index.css";
import "@peakon/bedrock/css/index.css";
import "./App.css";

function MemberEditorForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ defaultValues: { name: "", job: "" } });

  // whether the form is updating an existing member
  const [isUpdating, setIsUpdating] = useState(false);

  // Load a fake profile into the form
  const handleLoadProfile = () => {
    reset({ name: "Jane Doe", job: "Developer" });
    setIsUpdating(true);
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // PUT - Updating mode
      // POST - Creating new user mode
      const method = isUpdating ? "PUT" : "POST";
      const url = isUpdating
        ? "https://jsonplaceholder.typicode.com/users/2"
        : "https://jsonplaceholder.typicode.com/users";
      // send http request to the server(url) using fetch
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      alert(
        `Profile ${isUpdating ? "updated" : "created"} successfully!\n` +
          `Request: ${method} ${url}\n` +
          `Status: ${response.status}\n` +
          `Response: ${JSON.stringify(result)}\n`,
      );
    } catch (error) {
      alert(`Something went wrong: ${error.message}`);
    }
  };

  // Helper to reset back to initial(create) mode
  const resetToCreate = () => {
    reset({ name: "", job: "" });
    setIsUpdating(false);
  };

  return (
    <div>
      <h1 className="title">Member Editor Form</h1>
      <div>
        <p className="current-mode">
          Current Mode:{" "}
          <strong>
            {isUpdating
              ? "Update existing user (PUT)"
              : "Create new user (POST)"}
          </strong>
        </p>
        <form className="member-form" onSubmit={handleSubmit(onSubmit)}>
          {/* Name field */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
            />
            {errors?.name && (
              <p className="form-error">{errors.name.message}</p>
            )}
          </div>
          {/* Job field */}
          <div className="form-group">
            <label htmlFor="job" className="form-label">
              Job
            </label>
            <input
              type="text"
              id="job"
              {...register("job", { required: "Job is required" })}
            />
            {errors?.job && <p className="form-error">{errors.job.message}</p>}
          </div>
          <div className="button-group">
            <span className="button-group-item">
              <Button onClick={resetToCreate}>Reset</Button>
            </span>
            <span className="button-group-item">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Submit"}
              </Button>
            </span>
            <span className="button-group-item">
              <Button onClick={handleLoadProfile}>Load Profile</Button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MemberEditorForm;

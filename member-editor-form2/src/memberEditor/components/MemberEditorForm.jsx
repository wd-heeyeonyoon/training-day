// this is a reusable dumb component - Only concerned with the form UI and Form error handling.
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { memberEditorSchema } from "../memberEditorSchema.js";
import { Button } from "@peakon/bedrock/react/button";
import { InputField } from "@peakon/bedrock/react/form";
import { Box, Stack } from "@peakon/bedrock/react/layout";
import { Card } from "@peakon/bedrock/react/card";
import { Heading1 } from "@peakon/bedrock/react/typography";
import "../../App.css";

function MemberEditorForm({ mode, defaultValues, onSubmit }) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ defaultValues, resolver: zodResolver(memberEditorSchema) });

  // reset the form when defaultValues change (when new member is edited from edit mode -> defaultValues change)
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  // whether the form is updating an existing member
  const isUpdating = mode === "update";

  // Helper to reset back to initial(create) mode
  const handleReset = () => {
    reset({ name: "", company: { name: "" } });
  };

  return (
    <div className="member-editor-page">
      <Box padding={8}>
        <div className="member-form-card">
          <Card noDepth>
            <Box paddingBlock={40} paddingInline={40}>
              <Stack direction="column" spacing={24}>
                <Heading1 level={1} textAlign="center">
                  {isUpdating ? "Member Edit Form" : "Member Add Form"}
                </Heading1>

                {/* Form */}
                <form
                  className="member-form"
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {/* Vertically stacked fields */}
                  <Stack spacing={24}>
                    {/* Name field */}
                    {/* Connect Bedrock InputField with React Hook Form using Controller */}
                    {/* Controller allows this field to be part of the form (like value, onChange, zod validation, reset, etc) */}
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <InputField
                          {...field}
                          label="Name"
                          type="text"
                          status={errors.name ? "error" : undefined}
                          feedbackMessage={errors.name?.message}
                        />
                      )}
                    />

                    {/* Company name field */}
                    <Controller
                      name="company.name"
                      control={control}
                      render={({ field }) => (
                        <InputField
                          {...field}
                          label="Company name"
                          type="text"
                          status={errors.company?.name ? "error" : undefined}
                          feedbackMessage={errors.company?.name?.message}
                        />
                      )}
                    />
                  </Stack>

                  {/* Button group */}
                  <div className="button-row">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : "Submit"}
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  </div>
                </form>
              </Stack>
            </Box>
          </Card>
        </div>
      </Box>
    </div>
  );
}

export default MemberEditorForm;

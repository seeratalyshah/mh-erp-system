"use client";
import { FormEventHandler, ReactNode } from "react";
import { FormProvider as Form, UseFormReturn } from "react-hook-form";

type FormProviderProps = {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
  methods: UseFormReturn<any>;
};

export const FormProvider = ({ children, onSubmit, methods }: FormProviderProps) => {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
};

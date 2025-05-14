import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, defaultValues } from "./schema";
import { useLogin } from "@/hooks/use-auth";

export function useSignIn() {
  const [isHovered, setIsHovered] = useState(false);
  const login = useLogin();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = (data: { email: string; password: string }) => {
  login.mutate(data);         
};

  return {
    handleSubmit: methods.handleSubmit,
    onSubmit,
    methods,
    isHovered,
    setIsHovered,
    login,
  };
}

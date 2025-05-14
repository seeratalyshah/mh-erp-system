"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { buttonVariants, containerVariants, itemVariants } from "@/utils/sign-functions";
import { useSignIn } from "./use-signin";
import { FormProvider } from "@/components/form/rhf-provider";
import { RHFInputField } from "@/components/form/rhf-input";

export default function SignInSection() {
  const { handleSubmit, onSubmit, methods, isHovered, setIsHovered, login } =
    useSignIn();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-sm border border-gray-200 p-10 rounded-lg"
    >
      {/* logo */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-400"
      >
        <p>Logo</p>
      </motion.div>

      {/* heading */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary-400 dark:text-gray-200">
          Welcome Back
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
          Enter your credentials to sign in
        </p>
      </div>

      {/* form */}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div variants={itemVariants}>
            <RHFInputField
              outerLabel="Email"
              placeholder="you@example.com"
              name="email"
              type="email"
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <RHFInputField
              outerLabel="Password"
              placeholder="••••••••"
              name="password"
              type="password"
              required
            />
          </motion.div>

          <div className="flex justify-end text-sm">
            <Link
              href="#"
              className="text-primary-400 hover:text-primary-500 dark:text-gray-300"
            >
              Forgot password?
            </Link>
          </div>

          <motion.div variants={itemVariants}>
            <motion.button
              type="submit"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              disabled={login.isPending}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              className={`flex w-full items-center justify-center gap-2 rounded-lg bg-[#0488a6] py-3.5 text-base font-medium text-white transition-opacity ${
                login.isPending && "cursor-not-allowed opacity-70"
              }`}
            >
              {login.isPending ? (
                <>
                  <span>Signing in</span>
                  <Loader2 className="h-5 w-5 animate-spin" />
                </>
              ) : (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {isHovered ? "Let's go!" : "Sign In"}
                </motion.span>
              )}
            </motion.button>
          </motion.div>
        </motion.div>
      </FormProvider>
    </motion.div>
  );
}

// SignInSection.tsx – Ant Design version
"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/utils/sign-functions";
import { useSignIn } from "./use-signin";
import { Form, Input, Button, Typography, Space } from "antd";

export default function SignInSection() {
  const { login, isHovered, setIsHovered } = useSignIn();
  const [form] = Form.useForm();

  /** antd `onFinish` gives validated values */
  const handleFinish = (values: { email: string; password: string }) => {
    login.mutate(values);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-sm border border-gray-200 p-10 rounded-lg bg-white"
    >
      {/* logo */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-400 text-white"
      >
        <Typography.Title level={4} className="!m-0">Logo</Typography.Title>
      </motion.div>

      {/* heading */}
      <div className="mb-8 text-center">
        <Typography.Title level={3} className="!m-0 text-primary-400">
          Welcome Back
        </Typography.Title>
        <Typography.Text type="secondary">
          Enter your credentials to sign in
        </Typography.Text>
      </div>

      {/* Ant Design form */}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        autoComplete="off"
        requiredMark={false}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.div variants={itemVariants}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }, { type: "email", message: "Not a valid email" }]}
            >
              <Input placeholder="you@example.com" size="large" />
            </Form.Item>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password placeholder="••••••••" size="large" />
            </Form.Item>
          </motion.div>

          <div className="flex justify-end text-sm mb-4">
            <Link href="#">
              <span className="text-primary hover:text-primary/70">Forgot password?</span>
            </Link>
          </div>

          <motion.div variants={itemVariants}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={login.isPending}
              className="flex items-center justify-center gap-2"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {login.isPending ? (
                <Space>
                  Signing in <Loader2 className="animate-spin" />
                </Space>
              ) : (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {isHovered ? "Let's go!" : "Sign In"}
                </motion.span>
              )}
            </Button>
          </motion.div>
        </motion.div>
      </Form>
    </motion.div>
  );
}

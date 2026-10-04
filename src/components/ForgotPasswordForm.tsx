"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../useAuth";
import {
  Container,
  Title,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  ErrorMessage,
  SuccessMessage,
  LinkText,
  WarningMessage,
} from "./FormElements";

export const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { forgotPassword, isConfigured } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsLoading(true);

    try {
      await forgotPassword({ email });
      setSuccess(true);
      setTimeout(() => {
        router.push(`/reset-password?email=${encodeURIComponent(email)}`);
      }, 2000);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to send reset code",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConfigured) {
    return (
      <Container>
        <WarningMessage>
          AWS Cognito is not configured. Call configureAuth() with your
          Cognito pool details on startup.
        </WarningMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Forgot Password</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && (
        <SuccessMessage>
          Password reset code sent! Redirecting to reset page...
        </SuccessMessage>
      )}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
            disabled={isLoading || success}
          />
        </FormGroup>
        <Button type="submit" disabled={isLoading || success}>
          {isLoading ? "Sending..." : "Send Reset Code"}
        </Button>
      </Form>
      <LinkText>
        Remember your password? <Link href="/login">Sign In</Link>
      </LinkText>
    </Container>
  );
};

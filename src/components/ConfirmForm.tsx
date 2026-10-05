"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  SecondaryButton,
  InfoMessage,
  ErrorMessage,
  SuccessMessage,
  LinkText,
  WarningMessage,
} from "./FormElements";

function ConfirmFormContent() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const router = useRouter();
  const { confirmSignUp, resendConfirmationCode, isConfigured } = useAuth();

  const resolvedEmail = email ?? searchParams?.get("email") ?? "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setResendSuccess(false);
    setIsLoading(true);

    try {
      await confirmSignUp({ email: resolvedEmail, code });
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to confirm code. Please try again.");
      } else {
        setError("An unexpected error occurred.");
      }
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError("");
    setSuccess(false);
    setResendSuccess(false);
    setIsLoading(true);

    try {
      await resendConfirmationCode(resolvedEmail);
      setResendSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to resend code. Please try again.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConfigured) {
    return (
      <Container>
        <Title>Confirm Email</Title>
        <WarningMessage>
          <strong>AWS Cognito is not configured.</strong>
          <p>Call configureAuth() with your Cognito pool details on startup.</p>
        </WarningMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Confirm Email</Title>
      <InfoMessage>
        Please enter the verification code sent to your email address.
      </InfoMessage>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && (
        <SuccessMessage>
          Email confirmed successfully! Redirecting to login...
        </SuccessMessage>
      )}
      {resendSuccess && (
        <SuccessMessage>Verification code resent successfully!</SuccessMessage>
      )}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={resolvedEmail}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
            disabled={isLoading || success}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="code">Verification Code</Label>
          <Input
            id="code"
            type="text"
            value={code}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCode(e.target.value)
            }
            required
            disabled={isLoading || success}
            placeholder="Enter 6-digit code"
          />
        </FormGroup>
        <Button type="submit" disabled={isLoading || success}>
          {isLoading ? "Confirming..." : "Confirm"}
        </Button>
        <SecondaryButton
          type="button"
          onClick={handleResendCode}
          disabled={isLoading || success || !resolvedEmail}
        >
          Resend Code
        </SecondaryButton>
      </Form>
      <LinkText>
        Already confirmed? <Link href="/login">Login</Link>
      </LinkText>
    </Container>
  );
}

export const ConfirmForm: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmFormContent />
    </Suspense>
  );
};

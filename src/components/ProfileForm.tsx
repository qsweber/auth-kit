"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../useAuth";
import { useRequireAuth } from "../useRequireAuth";
import type { PasskeyCredential } from "../cognito-service";
import {
  Title,
  Message,
  Section,
  Button,
  ErrorBox,
  LoadingMessage,
  PasskeyList,
  PasskeyItem,
  DeleteButton,
} from "./FormElements";

export const ProfileForm: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useRequireAuth();
  const { registerPasskey, listPasskeys, deletePasskey } = useAuth();

  const [passkeys, setPasskeys] = useState<PasskeyCredential[]>([]);
  const [passkeyError, setPasskeyError] = useState<string | null>(null);
  const [isRegisteringPasskey, setIsRegisteringPasskey] = useState(false);
  const [deletingCredentialId, setDeletingCredentialId] = useState<
    string | null
  >(null);

  const refreshPasskeys = async () => {
    try {
      setPasskeys(await listPasskeys());
    } catch (error) {
      setPasskeyError(
        error instanceof Error ? error.message : "Failed to load passkeys",
      );
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshPasskeys();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const handleRegisterPasskey = async () => {
    setPasskeyError(null);
    setIsRegisteringPasskey(true);

    try {
      await registerPasskey();
      await refreshPasskeys();
    } catch (error) {
      setPasskeyError(
        error instanceof Error ? error.message : "Failed to register passkey",
      );
    } finally {
      setIsRegisteringPasskey(false);
    }
  };

  const handleDeletePasskey = async (credentialId: string) => {
    setPasskeyError(null);
    setDeletingCredentialId(credentialId);

    try {
      await deletePasskey(credentialId);
      await refreshPasskeys();
    } catch (error) {
      setPasskeyError(
        error instanceof Error ? error.message : "Failed to delete passkey",
      );
    } finally {
      setDeletingCredentialId(null);
    }
  };

  if (isLoading) {
    return (
      <div>
        <LoadingMessage>Loading...</LoadingMessage>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useRequireAuth
  }

  return (
    <div>
      <Title>Profile</Title>
      <Message>{user?.email}</Message>
      <Section>
        <h2>Passkeys</h2>
        <p>
          Register a passkey to sign in without a password next time, using your
          device&apos;s fingerprint, face, or screen lock.
        </p>
        <Button onClick={handleRegisterPasskey} disabled={isRegisteringPasskey}>
          {isRegisteringPasskey
            ? "Waiting for passkey..."
            : "Register a passkey"}
        </Button>

        {passkeyError && <ErrorBox>{passkeyError}</ErrorBox>}

        {passkeys.length > 0 && (
          <PasskeyList>
            {passkeys.map((passkey) => (
              <PasskeyItem key={passkey.credentialId}>
                <span>
                  {passkey.friendlyName || "Passkey"}
                  {passkey.createdAt &&
                    ` — added ${passkey.createdAt.toLocaleDateString()}`}
                </span>
                <DeleteButton
                  onClick={() => handleDeletePasskey(passkey.credentialId)}
                  disabled={deletingCredentialId === passkey.credentialId}
                >
                  {deletingCredentialId === passkey.credentialId
                    ? "Removing..."
                    : "Remove"}
                </DeleteButton>
              </PasskeyItem>
            ))}
          </PasskeyList>
        )}
      </Section>
    </div>
  );
};

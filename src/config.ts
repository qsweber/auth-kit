import { Amplify } from "aws-amplify";

export interface AuthKitConfig {
  userPoolId: string;
  userPoolClientId: string;
  region?: string;
}

let authConfig: AuthKitConfig | null = null;

/**
 * Configures this package's Cognito/Amplify auth for the app. Call this once,
 * early, from the consuming app's own code (not from within a component body)
 * so that NEXT_PUBLIC_* env vars referenced in the call are inlined by the
 * consuming app's own Next.js build, not this package's build.
 */
export const configureAuth = (config: AuthKitConfig): void => {
  if (!config.userPoolId || !config.userPoolClientId) {
    return;
  }

  authConfig = config;

  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: config.userPoolId,
        userPoolClientId: config.userPoolClientId,
      },
    },
  });
};

export const isAuthConfigured = (): boolean => authConfig !== null;

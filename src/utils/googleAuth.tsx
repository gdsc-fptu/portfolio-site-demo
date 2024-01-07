/**
 * Client ID of your Google OAuth App. You can get it from Google Cloud Console.
 */
const CLIENT_ID =
  "80984729673-t8pvaeg9l67khflkh1hqmuu57qjvkhgc.apps.googleusercontent.com";

/**
 * Google Authentification Component. Wrap your app with this component to enable Google Authentification.
 */
import { GoogleOAuthProvider } from "@react-oauth/google";

type GoogleAuthProviderProps = {
  children: React.ReactNode;
};
export function GoogleAuthProvider({ children }: GoogleAuthProviderProps) {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>{children}</GoogleOAuthProvider>
  );
}

/**
 * Login Button Wrapper Component. Wrap your login button with this component to enable Google Authentification.
 */
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

export type GoogleResponse = {
  access_token: string;
  authuser: string;
  expires_in: number;
  prompt: string;
  scope: string;
  token_type: string;
};

type GoogleLoginButtonProps = {
  onSuccess: (response: GoogleResponse) => void | Promise<void>;
  children?: React.ReactNode;
  onError?: () => void | Promise<void>;
  [key: string]: any;
};
export function GoogleLoginButton({
  onSuccess,
  children,
  onError,
  ...props
}: GoogleLoginButtonProps) {
  const loginFunction = useGoogleLogin({
    onSuccess: onSuccess as any,
    onError: onError,
  });
  return children ? (
    <div onClick={() => loginFunction()} {...props}>
      {children}
    </div>
  ) : (
    <GoogleLogin onSuccess={onSuccess as any} onError={onError} />
  );
}

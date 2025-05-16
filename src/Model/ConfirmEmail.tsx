export interface EmailConfirmationProps {
    initialEmail?: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
    className?: string;
  }
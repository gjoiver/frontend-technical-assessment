import { Component, type ErrorInfo, type ReactNode } from "react";
import { ErrorState } from "@shared/ui/molecules";

const FALLBACK_MESSAGE = "Algo salió mal. Recarga la página.";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("Unhandled UI error:", error, info.componentStack);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return <ErrorState message={FALLBACK_MESSAGE} />;
    }
    return this.props.children;
  }
}

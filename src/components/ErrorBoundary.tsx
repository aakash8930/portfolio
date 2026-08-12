import { Component, type ReactNode } from "react";

// Smallest possible error boundary. The 3D scenes are decorative, so when a
// canvas fails (headless browsers, sandboxed iframes, blocked WebGL) we
// degrade to the fallback instead of letting React unmount the whole app —
// an uncaught render error here previously blanked the entire page.
type Props = { fallback?: ReactNode; children: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("[ErrorBoundary]", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

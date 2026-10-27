import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#041633] text-white p-8 flex flex-col items-center justify-center font-sans">
          <div className="max-w-2xl bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-2xl space-y-4">
            <div className="inline-block px-3 py-1 bg-red-500/20 text-red-300 border border-red-500/40 rounded-full text-xs font-bold uppercase">
              Runtime Diagnostic
            </div>
            <h1 className="text-2xl font-black uppercase text-white">
              Application Error Detected
            </h1>
            <p className="text-sm text-slate-300">
              {this.state.error?.message || "An unexpected error occurred."}
            </p>
            {this.state.errorInfo && (
              <pre className="p-4 bg-black/50 text-emerald-400 rounded-xl text-xs overflow-x-auto max-h-60">
                {this.state.errorInfo.componentStack}
              </pre>
            )}
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-brand-gold text-[#041633] font-bold text-xs uppercase rounded-xl shadow-md hover:bg-[#b0936e] transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

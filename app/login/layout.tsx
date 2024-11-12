// app/login/layout.js
export default function AuthLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
      <div className="auth-layout">
        {children}
      </div>
    );
  }
  
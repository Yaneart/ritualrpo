import LoginForm from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-[#8a9188] mb-2">
            RitualRPO
          </p>
          <h1 className="text-2xl font-heading">Вход в панель</h1>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}

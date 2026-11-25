import { useSearchParams } from 'react-router';
import AuthLayout from '../components/AuthLayout.jsx';
import PasswordForm from '../components/PasswordForm.jsx';

export default function ResetPasswordPage() {
  const [params] = useSearchParams();
  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold">Reset your password</h1>
      <PasswordForm reset token={params.get('token') || ''} />
    </AuthLayout>
  );
}

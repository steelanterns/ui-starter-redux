import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

const AdminDashboard = async ({
  params: { lang }
}: {
  params: { lang: Locale }
}) => {
  const { page } = await getDictionary(lang);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>The dashboard</p>
    </main>
  );
};

export default AdminDashboard;

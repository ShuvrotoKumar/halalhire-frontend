import './globals.css';
import { AuthProvider } from './context/AuthContext';
import { ModalProvider } from './context/ModalContext';
import ReduxProvider from '../redux/ReduxProvider';
import ApplyModal from './components/ApplyModal/ApplyModal';
import ProfileEditModal from './components/ProfileEditModal/ProfileEditModal';
import JobEditModal from './components/JobEditModal/JobEditModal';
import JobDeleteModal from './components/JobDeleteModal/JobDeleteModal';
import TeamMemberModal from './components/TeamMemberModal/TeamMemberModal';
import AcceptModal from './components/AcceptModal/AcceptModal';
import RejectModal from './components/RejectModal/RejectModal';
import ContactConfirmModal from './components/ContactConfirmModal/ContactConfirmModal';
import type { Metadata } from 'next';
import i18next from 'i18next';
import '../i18n';
import { I18nProvider } from './components/I18nProvider';
import { cookies } from 'next/headers';
import { RegistrationProvider } from './context/RegistrationContext';

export const metadata: Metadata = {
  title: i18next.t('halalhireTheUmmahsTrustedJobNetwork', 'HalalHire - The Ummah\'s Trusted Job Network'),
  description: i18next.t('halalverifiedJobsPrayerOpportunitiesIslamicEthicBasedStandards', 'Halal-Verified Jobs, Prayer Opportunities, Islamic Ethic Based Standards'),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const lng = cookieStore.get('i18next')?.value || 'en';

  return (
    <html lang={lng} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ReduxProvider>
          <I18nProvider initialLocale={lng}>
            <AuthProvider>
              <RegistrationProvider>
                <ModalProvider>
                  {children}
                  <ApplyModal />
                  <ProfileEditModal />
                  <JobEditModal />
                  <JobDeleteModal />
                  <TeamMemberModal />
                  <AcceptModal />
                  <RejectModal />
                  <ContactConfirmModal />
                </ModalProvider>
              </RegistrationProvider>
            </AuthProvider>
          </I18nProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

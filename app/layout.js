import ThemeProvider from '@/provider/ThemeProvider'
import './globals.css'
import { Tajwal, Cairo } from '@/lib/fonts'
import { Toaster } from '@/components/ui/sonner'
import NavBar from '@/components/menu/navbar/NavBar'
import UrlProvider from '@/context/serviceProvider'
import { getServerSession } from 'next-auth'
import AuthProvider from 'authentication/AuthProvider'
import { options } from 'authentication/options'
import { checkMails } from '@/app/_pagecomp/admin/mailsystem/db/inbox'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(options)
  const newMails = await checkMails(session?.user?.email)

  return (
    <html lang='en' dir='rtl' suppressHydrationWarning>
      <body
        className={`${Tajwal.variable} ${Cairo.variable}  container flex h-full w-full flex-col items-center justify-center bg-background`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          // disableTransitionOnChange
        >
          <UrlProvider>
            <AuthProvider session={session}>
              <div className=' mt-[70px] flex w-full flex-col items-center justify-center rounded bg-secondary/20 '>
                {children}
              </div>
            </AuthProvider>
          </UrlProvider>
          <Toaster richColors position='bottom-right' closeButton />
        </ThemeProvider>
      </body>
    </html>
  )
}

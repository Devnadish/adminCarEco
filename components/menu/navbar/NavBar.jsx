'use client'
import GoHome from '@/components/shared/GoHome'
import { Logo } from './Logo'
import MainMenu from './MainMenu'
import { usePathname } from 'next/navigation'
import UserMenu from '@/app/_pagecomp/user/usermenu/UserMenu'
import LoginBtn from '@/app/_pagecomp/user/login/LoginBtn'
import NewMail from '@/app/_pagecomp/admin/mailsystem/NewMail'

const NavBar = ({ session, newMails }) => {
  const pathName = usePathname()
  let urlPrefix

  if (pathName === '/') {
    urlPrefix = 'admin'
  }

  return (
    <nav className='fixed left-0 top-0 z-50 flex h-[60px] w-full items-center justify-center gap-2 bg-secondary  shadow  '>
      <div className='container  flex  w-full items-center justify-between    '>
        {session ? (
          <UserMenu session={session} newMails={newMails} />
        ) : (
          <LoginBtn />
        )}
        {pathName === '/' && (
          <>
            <MainMenu />
            <NewMail
              urlPrefix={urlPrefix}
              session={session}
              to={process.env.NEXT_PUBLIC_ADMIN_EMAIL}
            />
          </>
        )}
        {pathName !== '/' && <GoHome />}

        {/* <Logo /> */}
      </div>
    </nav>
  )
}
export default NavBar

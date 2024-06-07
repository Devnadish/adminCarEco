import { getProviderList } from '@/app/_pagecomp/provider/db/providerList'
import { Bar } from './_pagecomp/home/Bar'
import Loadmore from './_pagecomp/home/Loadmore'
import NewCard from './_pagecomp/home/NewCard'
import Link from 'node_modules/next/link'
export const dynamic = 'force-dynamic'

export default async function Home({ searchParams }) {
  return (
    <main className='  mt-[80px]   flex  w-full  flex-col items-center justify-center rounded-lg    '>
      <Link
        href={'/master/autoaction'}
        className={
          'flex h-12 w-1/4 items-center justify-center border border-destructive bg-gray-700 text-xl text-red-500'
        }
      >
        start
      </Link>
    </main>
  )
}

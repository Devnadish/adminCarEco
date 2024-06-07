import { getProviderList } from '@/app/_pagecomp/provider/db/providerList'
import { Bar } from './_pagecomp/home/Bar'
import Loadmore from './_pagecomp/home/Loadmore'
import NewCard from './_pagecomp/home/NewCard'
export const dynamic = 'force-dynamic'

export default async function Home({ searchParams }) {
  const query = searchParams || ''
  const { providers, pageCount, totalProvidersCount } = await getProviderList(
    1,
    query
  )

  return (
    <main className='  mt-[80px]   flex  w-full  flex-col items-center justify-center rounded-lg    '>
      <Bar query={query} providersLength={totalProvidersCount} />

      <div className='grid w-full   grid-cols-1  justify-items-center gap-4 p-4 md:grid-cols-2 lg:grid-cols-3'>
        {providers.map(provider => (
          <NewCard providerInfo={provider} key={provider.id} />
        ))}
      </div>
      <Loadmore query={query} pageCount={pageCount} />
    </main>
  )
}

// import Counters from '@/components/hooks/Counters'
//  <Counters records={recordCount} pages={pageCount} />
// <Bar recordCount={recordCount} pageCount={pageCount} query={query} />

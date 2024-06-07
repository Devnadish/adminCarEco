import React from 'react'

import { SectionTitle } from '@/components/shared/SectionTitle'
import { Dislike, Like } from '@/components/svg/LikeAndDislike'
// import { getUserActions } from '@/db/utlDb'
import NewCard from '@/app/_pagecomp/home/NewCard'
import Link from 'next/link'
import { StarFilled } from '@/components/svg/StarFilled'
import { HistoryIcon } from '@/components/svg/History'
import { HeartHandshake, Trash } from '@/lib/icons'
import { getUserActions } from '@/app/_pagecomp/user/db/reaction'
import Text from '@/components/shared/Text'
import RemoveActionButton from '@/app/_pagecomp/user/useractions/RemoveAction'
// import { getUserActions } from '@/components/pages/user/reacion/db/reaction'
export const dynamic = 'force-dynamic'

export async function page({ params }) {
  const userId = params.userid[0]
  const requestType = params.userid[1]
  const requestCodeMap = {
    like: 1,
    dislike: 2,
    history: 3,
    rate: 4,
    favorate: 5
  }
  const requestCode = requestCodeMap[requestType]

  const requestMessageMap = {
    1: 'الاعجاب',
    2: 'عدم الاعجاب',
    3: 'السجل',
    4: 'التقييم',
    5: 'المفضلة'
  }
  const requestMessage = requestMessageMap[requestCode]

  const requestIconMap = {
    1: <Like className='size-12 text-primary' />,
    2: <Dislike className='size-12 text-primary' />,
    3: <HistoryIcon className='size-12 text-primary' />,
    4: <StarFilled className='size-12 text-primary' />,
    5: <HeartHandshake className='size-12 text-primary' />
  }
  const requestIcon = requestIconMap[requestCode]

  const favoriteProviders = await getUserActions(userId, requestCode)

  return (
    <div className='absolute top-20 flex w-full flex-wrap items-center justify-center'>
      <div className='mb-4 flex w-full max-w-5xl items-center justify-start'>
        {requestIcon}
        <SectionTitle title={`قائمة ${requestMessage}`} />
      </div>
      {favoriteProviders.msg === 'noData' ? (
        <NoDataToView msg={requestMessage} icon={requestIcon} />
      ) : (
        <div className='flex w-full flex-wrap items-center justify-center gap-4'>
          {favoriteProviders.map(provider => (
            <div key={provider.id}>
              <RemoveActionButton
                providerId={provider.id}
                actionId={requestCode}
                userid={userId}
              />

              <Link
                href={{
                  pathname: `/provider/${provider.id}/${provider.slug}`
                }}
                // key={provider.id}
              >
                <NewCard provider={provider} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default page

const NoDataToView = ({ msg, icon }) => (
  <div className='container flex max-w-sm items-center justify-center rounded-lg border border-dashed p-4'>
    <div className='flex flex-col items-center justify-center gap-2'>
      {icon}
      <Text fontSize={'xl3'}>{msg}</Text>
      <Text fontSize={'xl3'}>لاتوجد بيانات</Text>
    </div>
  </div>
)

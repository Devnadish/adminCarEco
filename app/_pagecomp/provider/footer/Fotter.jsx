import React from 'react'
import { Button } from '@/components/ui/button'
import { CallIcon, EmailIcon } from '@/components/shared/ProviderIcons'
import { WhatsappIcon } from '@/components/svg/Whatsapp'
import {
  Facebook,
  Instagram,
  Tiktok,
  XTwitter,
  Youtube
} from '@/components/svg/Socail'
import { Avatar } from '@/components/shared/Avatar'
import Text from '@/components/shared/Text'

function Fotter({ workingHours }) {
  const parsedWorkingHours = JSON.parse(workingHours)
  return (
    <footer
      className='flex  w-full flex-col flex-wrap items-center justify-center gap-1 rounded  p-4'
      id='footer'
    >
      <WorkingHours days={parsedWorkingHours} />
      {/* <BrInfo branchInfo={branchInfo} /> */}
      <SocalContact />
    </footer>
  )
}

export default Fotter

const BrInfo = ({ branchInfo }) => {
  return (
    <div className='flex w-full flex-grow-0 flex-col flex-wrap items-center justify-center gap-3 md:flex-row'>
      {branchInfo.map(br => {
        return (
          <div
            key={br.id}
            className='flex max-w-xs flex-grow flex-col items-center gap-3 rounded-md border p-4 md:w-1/3'
          >
            <Avatar src={br.image} alt={br.branchName} />
            <Text
              className={
                'j-9 flex w-full items-center justify-center bg-gray-500 '
              }
            >
              {br.branchName}
            </Text>
            <Text
              fontSize={'xs'}
              className={'flex w-full items-center justify-between'}
            >
              <span>السبت</span>
              {br.sat}
            </Text>
            <Text
              fontSize={'xs'}
              className={'flex w-full items-center justify-between'}
            >
              <span>الاحد</span>
              {br.sun}
            </Text>
            <Text
              fontSize={'xs'}
              className={'flex w-full items-center justify-between'}
            >
              <span>الاثنين</span>
              {br.mon}
            </Text>
            <Text
              fontSize={'xs'}
              className={'flex w-full items-center justify-between'}
            >
              <span>الثلاثاء</span>
              {br.tue}
            </Text>
            <Text
              fontSize={'xs'}
              className={'flex w-full items-center justify-between'}
            >
              <span>الاربعاء</span>
              {br.wed}
            </Text>
            <Text
              fontSize={'xs'}
              className={'flex w-full items-center justify-between'}
            >
              <span>الخميس</span>
              {br.thu}
            </Text>
            <Text
              fontSize={'xs'}
              className={'flex w-full items-center justify-between'}
            >
              <span>الجمعه</span>
              {br.fri}
            </Text>
          </div>
        )
      })}
    </div>
  )
}

export const SocalContact = () => {
  return (
    <div className='flex flex-wrap items-center justify-evenly   gap-2 '>
      {/* <Button size='icon' variant='ghost'>
          <ShareIcon className='size-6' />
        </Button> */}
      <Button size='icon' variant='ghost'>
        <CallIcon className='size-6' />
      </Button>
      <Button size='icon' variant='ghost'>
        <EmailIcon className='size-6' />
      </Button>
      <Button size='icon' variant='ghost'>
        <WhatsappIcon className='size-6' />
      </Button>
      <Button size='icon' variant='ghost'>
        <Tiktok className='size-6' />
      </Button>
      <Button size='icon' variant='ghost'>
        <Instagram className='size-6' />
      </Button>
      <Button size='icon' variant='ghost'>
        <Facebook className='size-6' />
      </Button>
      <Button size='icon' variant='ghost'>
        <XTwitter className='size-6' />
      </Button>
      <Button size='icon' variant='ghost'>
        <Youtube className='size-6' />
      </Button>
    </div>
  )
}

export const WorkingHours = ({ days }) => {
  // TODO:  restyleing
  const arabicDays = {
    Sunday: 'الأحد',
    Monday: 'الاثنين',
    Tuesday: 'الثلاثاء',
    Wednesday: 'الأربعاء',
    Thursday: 'الخميس',
    Friday: 'الجمعة',
    Saturday: 'السبت'
  }
  return (
    <div className='flex flex-col items-center justify-center gap-4' dir='ltr'>
      <h2 className='text-xl font-semibold'>مواعيد العمل</h2>
      <div className='grid grid-cols-3 gap-4'>
        {Object.entries(days).map(([key, value]) => (
          <div
            key={key}
            className='flex flex-col justify-center rounded border border-border px-2 text-muted-foreground '
            dir='rtl'
          >
            <div className='flex w-full items-center justify-between'>
              <span className='mr-4 rounded-lg bg-primary px-2 font-tajwal  font-bold text-primary-foreground'>
                {arabicDays[key]}
              </span>
              <span className='mb-3 flex  w-fit  rounded-lg px-2 text-lg text-foreground'>
                {value.workDay ? 'مفتوح' : 'مغلق'}
              </span>
            </div>
            <span className='text-xl font-semibold'>
              {value.hour.map((hour, index) => (
                <span key={index} className='mr-4'>
                  {hour}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

//     Sunday: { workDay: true, hour: [ '08:00', '12:00', '13:00', '18:00' ] },
//     Monday: { workDay: true, hour: [ '08:00', '12:00', '13:00', '18:00' ] },
//     Tuesday: { workDay: true, hour: [ '08:00', '12:00', '13:00', '18:00' ] },
//     Wednesday: { workDay: true, hour: [ '08:00', '12:00', '13:00', '18:00' ] },
//     Thursday: { workDay: true, hour: [ '08:00', '12:00', '13:00', '18:00' ] },
//     Friday: { workDay: false, hour: [ '08:00', '12:00', '13:00', '18:00' ] },
//     Saturday: { workDay: true, hour: [ '08:00', '12:00', '13:00', '18:00' ] }
//   }
//   return (
//     <div className='flex flex-col items-center justify-center gap-4'>
//       <h2 className='text-xl font-semibold'>Working Hours</h2>
//       <div className='grid grid-cols-2 gap-4'>
//         <div className='flex flex-col justify-center'>
//           <span className='text-lg'>{days.Saturday}</span>
//           <span className='text-2xl font-semibold'>
//             {`${days.Saturday.hour[0]} - ${days.Saturday.hour[1]}`}
//             {/* <time className=''>{`${days.Saturday.hour[0]} - ${days.Saturday.hour[1]}`}</time> */}
//           </span>
//         </div>
//       </div>
//     </div>
//   )
// }

import { Avatar } from '@/components/shared/Avatar'
import { LocateFixed } from '@/lib/icons'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { providerType, providerTypeIcon } from '@/lib/provider'
import { Badge } from '@/components/ui/badge'
import Text from '@/components/shared/Text'
import { ScrollArea } from '@/components/ui/scroll-area'

import { Eye, HeartHandshake, MessageCircleMore } from '@/lib/icons'
import { Like } from '@/components/svg/LikeAndDislike'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'

function NewCard({ providerInfo }) {
  const { provider, cars, department, service, rate } = providerInfo
  return (
    <Link
      href={{
        pathname: `/provider/${provider.slug}`
        // pathname: `/provider/${provider.id}/${provider.slug}`
      }}
      className=' flex h-full w-[300px]  rounded-md border border-border  shadow-lg hover:border-primary'
    >
      <Card className='flex w-full flex-grow flex-col items-center justify-between  rounded-md'>
        <CardHeader className='relative mb-4 flex w-full  flex-col items-center bg-primary/10 pb-4 '>
          <Location
            city={provider.city}
            dist={provider.dist}
            typeIcon={providerTypeIcon(provider.type)}
            typeName={providerType(provider.type)}
          />
          <div className='flex w-full items-baseline gap-1 '>
            <Avatar
              src={provider.logo}
              alt={provider.providerName}
              fallBack={'kn'}
            />
            <p className='font-cairo text-muted-foreground '>
              {provider.providerName}
            </p>
          </div>
          <RateAndExtraSevice moreService={service} rate={rate?.percentage} />
        </CardHeader>

        <CardContent className='flex  h-full flex-col items-start justify-between gap-4'>
          <ProviderDepartments departments={department} />

          <CarFix carTypes={cars} />
          <Text fontSize='xs' opacity='O70' className='leading-relaxed'>
            {provider.heroSlogon}
          </Text>
        </CardContent>

        <CardFooter className='flex w-full justify-between p-0'>
          <CardBar
            likeCount={provider.likeCount}
            disLikeCount={provider.disLikeCount}
            starCount={provider.starCount}
            commentCount={provider.commentCount}
            favCount={provider.favCount}
            viewerCount={provider.viewerCount}
          />
        </CardFooter>
      </Card>
    </Link>
  )
}

export default NewCard

function Location({ city, dist, typeName, typeIcon }) {
  return (
    <div className='absolute  top-1 flex  w-full items-center justify-between   px-3'>
      <div className='flex items-center gap-1'>
        <LocateFixed size={14} className='text-muted-foreground' />
        <span className='font-tajwal text-xs text-muted-foreground'>
          {city}-{dist}
        </span>
      </div>

      <Badge variant={'secondary'}>
        {typeIcon}
        {typeName}
      </Badge>
    </div>
  )
}

export const ProviderDepartments = ({ departments }) => {
  return (
    <div className='flex w-full max-w-[300px] flex-wrap items-center justify-evenly gap-2 '>
      {departments.map(({ department }, index) => (
        <Badge
          variant='outline'
          className='flex flex-grow items-center justify-center border-border'
          key={index}
        >
          <Text className='text-primary'>{department}</Text>
        </Badge>
      ))}
      <Separator />
    </div>
  )
}

export const CarFix = ({ carTypes }) => {
  return (
    <ScrollArea className='h-[100px] w-full rounded p-1 pl-3' dir='rtl'>
      <div className='flex w-full flex-wrap items-center justify-center gap-1 '>
        {carTypes.map(({ name }, index) => (
          <Badge
            key={index}
            variant='outline'
            className='flex flex-grow items-center justify-center border-border'
          >
            <Text className='text-muted-foreground'>{name}</Text>
          </Badge>
        ))}
      </div>
    </ScrollArea>
  )
}

export const RateAndExtraSevice = ({ moreService, rate }) => {
  return (
    <div className='relative flex w-full items-end justify-between gap-1 px-2'>
      <div className='flex    flex-wrap items-center justify-center gap-1'>
        {moreService.map(({ logo, name }, index) => {
          //FIXME:will use NAME for toolTip
          return (
            <Image
              key={index}
              src={`/extraservicelogo/${logo}`}
              alt={logo}
              width={14}
              height={14}
              className='size-4 object-contain'
            />
          )
        })}
      </div>
      <div
        className='absolute bottom-3 left-0 flex size-9 items-center justify-center '
        style={{
          backgroundImage: `url(${'/icons/star.svg' || ''})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%'
        }}
      >
        <span className='text-center text-sm font-bold text-black'>
          {rate || 0}
        </span>
        <span className='absolute -bottom-3 flex h-3 w-10 items-center justify-center rounded  bg-yellow-400 text-xs text-black'>
          %
        </span>
      </div>
    </div>
  )
}

export const CardBar = ({ likeCount, viewerCount, commentCount, favCount }) => {
  const style1 =
    'flex h-8 w-12  items-center justify-center rounded  p-1 text-muted-foreground '
  return (
    <div className='flex h-9 w-full items-center justify-evenly  border-t'>
      <Text fontSize={'xs'} className={style1}>
        <MessageCircleMore className='size-4 text-green-500' />
        {commentCount}
      </Text>
      <Separator orientation='vertical' />
      <Text fontSize={'xs'} className={style1}>
        <Like className='size-4 text-blue-800' />
        {likeCount}
      </Text>
      <Separator orientation='vertical' />
      <Text fontSize={'xs'} className={style1}>
        <Eye className='size-4 text-purple-800 ' />
        {viewerCount}
      </Text>
      <Separator orientation='vertical' />
      <Text fontSize={'xs'} className={style1}>
        <HeartHandshake className='size-4 text-red-500' />
        {favCount}
      </Text>
    </div>
  )
}

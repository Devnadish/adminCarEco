'use client'
import React from 'react'
import { SectionTitle } from '@/components/shared/SectionTitle'
import Text from '@/components/shared/Text'
import Image from 'next/image'
import Link from 'next/link'
import { MoveLeft } from '@/lib/icons'

export const Department = ({ department, providerId, providerSlug }) => {
  console.log(department)

  return (
    <section className='flex  w-full flex-col items-center justify-center overflow-hidden border-b  border-l border-primary bg-secondary/40 p-2 py-4'>
      <SectionTitle title={'الاقسام الرئسية'} />
      <div className=' flex w-full flex-wrap items-center justify-center gap-4  '>
        {department.map(service => {
          return (
            <div
              className='flex min-w-[300px] max-w-xs flex-grow flex-col  items-start justify-center gap-4  rounded-lg border border-black p-4 hover:shadow-xl dark:border-border '
              key={service.id}
            >
              <Image
                src={`/extraservicelogo/${service.logo || 'logo.svg'}`} // Handle missing logo
                alt={service.service}
                width={60}
                height={60}
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className='rounded-lg fill-white object-contain '
              />
              <Text fontSize={'large'}>{service.department}</Text>

              <div className='flex w-full  flex-wrap  items-center justify-center  '>
                <Text className='w-full  max-w-xs text-wrap  p-2 text-muted-foreground'>{`${service.description.substring(0, 60)}...`}</Text>
                <Link
                  href={{
                    pathname: `/comment/department/${providerSlug}/${service.slug}`
                    // pathname: `/detail/${providerId}/${providerSlug}/${service.slug}`,
                  }}
                  className='flex  w-full items-end justify-end gap-4 text-primary'
                >
                  <span className='font-tajwal'>عرض المزيد</span>
                  <MoveLeft />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

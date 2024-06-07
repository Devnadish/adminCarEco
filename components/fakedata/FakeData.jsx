'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { createBlock, deleteBlock } from '@/components/fakedata/FakeInsertion'
import Text from '../shared/Text'
import { SubSpinner } from '../shared/Spinner'
import { Notify } from '@/lib/nadish'
import { newProviderData } from './Fakeproviders'
import { GnerateDepartment } from './FakeDepatrment'
import { GnerateServices } from './FakeService'
import { sliderImage } from './FakeImages'
import { GnerateProviderCarFixing } from './FakeCarFixing'
import { rateGnerate } from './FakeRate'
import { GenerateUsers } from './FakeUser'
import { removeDuplicateServiceProvider } from './removeDublicatData'

function FakeData() {
  const [isLoading, setIsLoading] = useState(false)
  const handleFake = async () => {
    setIsLoading(true)
    await deleteBlock()

    await newProviderData(150)
    Notify('Provider Job Done', 'info', 'fake data')
    await GenerateUsers()
    Notify('USERS Job Done', 'info', 'fake data')

    await rateGnerate()
    Notify('Rateing Job Done', 'info', 'fake data')

    await GnerateDepartment()
    Notify('Depatment  Job Done', 'info', 'fake data')

    await GnerateServices()
    Notify('Services  Job Done', 'info', 'fake data')

    await sliderImage()
    Notify('slider Image  Job Done', 'info', 'fake data')
    await GnerateProviderCarFixing()
    Notify('CarFixing  Job Done', 'info', 'fake data')

    // const providers1 = await createBlock(10)
    Notify('Complete Job Done', 'success', 'DONE')
    setIsLoading(false)
  }

  const handleClear = async () => {
    // setIsLoading(true)
    await removeDuplicateServiceProvider()
    Notify('CarFixing  Job Done', 'info', 'fake data')

    // setIsLoading(false)
  }

  return (
    <div className='flex w-full items-center justify-center gap-4'>
      <Button onClick={() => handleFake()} className='h-16 w-1/3'>
        {isLoading ? <SubSpinner /> : <Text> بيانات تجريبية</Text>}
      </Button>
      <Button
        onClick={async () => {
          try {
            await handleClear()
          } catch (error) {
            console.error(error)
          }
        }}
        className='h-16 w-1/3 bg-destructive hover:bg-destructive/90'
      >
        {isLoading ? <SubSpinner /> : <Text>Clear UP</Text>}
      </Button>
    </div>
  )
}

export default FakeData

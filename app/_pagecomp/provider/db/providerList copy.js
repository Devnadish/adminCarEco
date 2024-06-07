'use server'
import db from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import {
  FilterFuncType,
  SortFunc,
  getCarIdRetunCarInfo,
  getServiceIdRetunServiceInfo
} from '@/db/utlDb'
import { getProviderWithCarNames, getProvidersRate } from './providerDButl'

export const getProviders = async (pageNo, query) => {
  const { vechile } = query || {}
  let carId
  if (vechile) {
    carId = await db.car.findFirst({
      where: { name: vechile },
      select: { id: true }
    })
  }
  const carCondition = carId
    ? {
        carType: {
          hasEvery: [carId.id]
        }
      }
    : {}

  const limit = parseInt(process.env.PROVODER_PAGE_LIMIT)
  const skip = (pageNo - 1) * limit
  const providers = await db.provider.findMany({
    take: limit,
    skip,
    where: carCondition
  })

  const totalProvidersCount = await db.provider.count({ where: carCondition })
  const pageCount = Math.ceil(totalProvidersCount / limit)
  return { providers, pageCount, totalProvidersCount }
}

export const getProviderList = async (pageNo, query) => {
  const allProviders = await getProviders(pageNo, query)

  const providersWithCarNames = await getProviderWithCarNames(
    allProviders.providers
  )
  const providersWithRates = await getProvidersRate(providersWithCarNames)
  return {
    providers: providersWithRates,
    pageCount: allProviders.pageCount,
    totalProvidersCount: allProviders.totalProvidersCount
  }
}

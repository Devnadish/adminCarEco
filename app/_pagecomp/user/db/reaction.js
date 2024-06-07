'use server'
import {
  carListWithIdReturnCarNames,
  getProvidersRate,
  serviceistWithIdReturnServiceNames
} from '@/app/_pagecomp/provider/db/providerList'
import db from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const getUserActions = async (userid, actionid) => {
  const providerIds = await db.userAction.findMany({
    where: { userid, actionid },
    select: { providerid: true }
  })
  if (providerIds.length === 0) {
    return { msg: 'noData' }
  }

  const ids = providerIds.map(provider => provider.providerid)

  const requiestedProviders = await db.provider.findMany({
    where: { id: { in: ids } }
  })

  const providersWithCarNames =
    await carListWithIdReturnCarNames(requiestedProviders)
  const providerRate = await getProvidersRate(providersWithCarNames)
  const finalProviders = await serviceistWithIdReturnServiceNames(providerRate)

  return finalProviders
}

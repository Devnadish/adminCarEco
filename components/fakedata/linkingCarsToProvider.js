// carFixing
// department
// extarService
'use server'
import db from '@/lib/prisma'

export const linkingData = async () => {
  await linkingCars()
  // await linkingService()
  // await linkingDepartment()
}

export const linkingCars = async () => {
  console.log('🚀 ~ linkingCars ~ Starting')
  const providers = await db.Provider.findMany()
  console.log('🚀 ~ linkingCars ~ providers:', providers)

  for (const provider of providers) {
    const providerId = provider.id
    console.log('🚀 ~ linkingCars ~ providerId:', providerId)

    const providerCars = await db.ProviderCarFixing.findMany({
      where: { providerid: providerId },
      select: { carid: true }
    })
    console.log('🚀 ~ linkingCars ~ providerCars:', providerCars)

    const carFixing = providerCars.map(el => el.carid)
    console.log('🚀 ~ linkingCars ~ carFixing:', carFixing)

    const updatedProvider = await db.Provider.update({
      where: { id: providerId },
      data: { carFixing: carFixing }
    })
    console.log('🚀 ~ linkingCars ~ updatedProvider:', updatedProvider)
  }
  console.log('🚀 ~ linkingCars ~ Done')
}

export const linkingDepartment = async () => {
  const providers = await db.Provider.findMany()

  for (const provider of providers) {
    const providerId = provider.id
    const providerDepartment = await db.ProviderDepartment.findMany({
      where: { providerid: providerId },
      select: { departmentid: true }
    })
    const departmentid = providerDepartment.map(el => el.departmentid)
    const updatedProvider = await db.Provider.update({
      where: { id: providerId },
      data: { department: departmentid }
    })
    console.log('🚀 ~ linkingData ~ updatedProvider:', updatedProvider)
  }
}

export const linkingService = async () => {
  const providers = await db.Provider.findMany()

  for (const provider of providers) {
    const providerId = provider.id
    const providerDepartment = await db.ProviderService.findMany({
      where: { providerid: providerId },
      select: { serviceid: true }
    })
    const departmentid = providerDepartment.map(el => el.serviceid)
    const updatedProvider = await db.Provider.update({
      where: { id: providerId },
      data: { extarService: departmentid }
    })
    console.log('🚀 ~ linkingData ~ updatedProvider:', updatedProvider)
  }
}

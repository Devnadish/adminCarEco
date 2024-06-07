'use server'
import db from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { addViewer } from './providerVeiwer'
import { CollectRatine } from '@/app/_pagecomp/provider/db/rateDb'
import { CheckUserAction } from '@/db/utlDb'

export const providerData = async (providerSlug, userid) => {
  // get id from the slug
  const providerid = await db.provider.findFirst({
    where: { slug: decodeURIComponent(providerSlug) }
  })
  const id = providerid.id
  const providerInfo = await db.provider.findFirst({ where: { id: id } })
  const whereCondition = { providerid: id }

  const cars = await db.ProviderCarFixing.findMany({
    where: whereCondition,
    select: {
      name: true,
      image: true
    }
  })

  const department = await db.ProviderDepartment.findMany({
    where: whereCondition,
    select: {
      id: true,
      department: true,
      departmentid: true,
      slug: true,
      description: true,
      logo: true
    }
  })
  const service = await db.ProviderService.findMany({
    where: whereCondition,
    select: {
      id: true,
      service: true,
      slug: true,
      description: true,
      logo: true
    }
  })

  const rate = await CollectRatine(id)
  const userActions = await CheckUserAction(id, userid)
  const Imeges = await db.image.findMany({ where: { providerid: id } })

  // const [
  //   Imeges,
  //   carsInfo,
  //   Department,
  //   extraService,
  //   providerRate,
  //   branchWorkingshour,
  //   userActions
  // ] = await Promise.all([
  //   db.image.findMany({ where: { providerid: id } }),
  //   db.car.findMany({
  //     where: {
  //       id: { in: providerInfo.carType } // List of car type IDs
  //     },
  //     select: { name: true, image: true }
  //   }),
  //   db.service.findMany({
  //     where: {
  //       id: { in: providerInfo.service } // List of car type IDs
  //     }
  //   }),
  //   db.service.findMany({
  //     where: {
  //       id: { in: providerInfo.extarService } // List of car type IDs
  //     }
  //   }),
  //   CollectRatine(id),
  //   db.providerBranch.findMany({ where: { providerid: id } }),
  //   CheckUserAction(id, userid)
  // ])

  // Increase viewr By One
  const addProviderViewer = await addViewer(id, userid)

  revalidatePath('/')
  return {
    providerInfo,
    cars,
    Imeges,
    department,
    service,
    rate,
    userActions
  }
}

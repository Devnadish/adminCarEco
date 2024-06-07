'use server'
import db from '@/lib/prisma'
import bcrypt from 'bcrypt'
export const GenerateUsers = async () => {
  await db.user.deleteMany()

  const provider = await db.provider.findMany({
    select: {
      id: true,
      providerName: true,
      email: true,
      mobile: true,
      logo: true
    }
  })

  for (let i = 0; i < provider.length; i++) {
    await db.user.create({
      data: {
        name: provider[i].providerName,
        // mobile: provider[i].mobile,
        email: provider[i].email,
        image: provider[i].logo,
        password: bcrypt.hashSync('0000', 8),
        isVerified: true,
        role: 'provider'
      }
    })
  }
}

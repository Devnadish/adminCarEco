'use server'
import db from '@/lib/prisma'

export const removeDuplicateServiceProvider = async () => {
  // const getAll = await db.ProviderService
  const providerServices = await db.ProviderService.groupBy({
    by: ['providerid', 'serviceid']
  })
  removeDuplicateRows()

  console.log(duplicateProviders)
  console.log(providerServices)
}
// -------------------------------------

// ---------------------------------------------
async function removeDuplicateRows() {
  const allDocuments = await db.ProviderService.findMany() // Replace 'yourModelName' with the actual model name

  const uniqueDocuments = []
  const duplicateIds = []

  allDocuments.forEach(doc => {
    const isDuplicate = uniqueDocuments.some(
      uniqueDoc =>
        uniqueDoc.providerid === doc.providerid &&
        uniqueDoc.serviceid === doc.serviceid
    )

    if (isDuplicate) {
      duplicateIds.push(doc.id)
    } else {
      uniqueDocuments.push(doc)
    }
  })

  // Delete duplicate rows
  await db.ProviderService.deleteMany({
    where: {
      id: {
        in: duplicateIds
      }
    }
  })
}

removeDuplicateRows()
  .catch(error => {
    console.error(error)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

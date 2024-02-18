export default defineEventHandler(async (event) => {
  return await prisma.event.findMany();
});

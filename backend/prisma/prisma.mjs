// No seu arquivo de configuração, por exemplo, prisma.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // ... you will write your Prisma Client queries here
    const todos = await prisma.todoList.findMany()
    console.log("hello wordi")
    console.log(todos)
}

main()
    .catch(async (e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })  
import { execSync } from 'child_process';

const isVercelEngine = process.env.IS_VERCEL_ENGINE === 'true';
const command = isVercelEngine
  ? 'prisma generate --no-engine'
  : 'prisma generate';

execSync(command, { stdio: 'inherit' });

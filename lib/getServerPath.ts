import path from 'path';
import getConfig from 'next/config';

const getServerPath = (staticFilePath: string) => {
  return path.join(
    getConfig().serverRuntimeConfig.PROJECT_ROOT,
    staticFilePath
  );
};

export default getServerPath;

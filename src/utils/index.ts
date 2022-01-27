export const parseQuery = (value: string) => {
  return value.split('/').slice(-2).join('/');
};

export const getRepoQuery = (search: string) => {
  const searchParams = new URLSearchParams(search);
  return searchParams.get('repo');
};

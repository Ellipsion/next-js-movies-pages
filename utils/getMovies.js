export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default async function getMovies(time = 0, shouldError = false) {
  await delay(time);
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_API}&language=en-US&page=1`
  );

  if (!res.ok || shouldError) {
    throw new Error(`An error has occured: ${res.status}`);
  }

  return res.json();
}

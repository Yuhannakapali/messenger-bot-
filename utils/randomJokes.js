const url =
  "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";

const randomJokes = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data.joke;
  // return data.joke;
};

module.exports = { randomJokes };



// To shuffle the constant data from the API
export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const shufflePartialArray = (array, k) => {
  for (let i = 0; i < k; i++) {
    const j = Math.floor(Math.random() * (array.length - i)) + i;
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.slice(0, k); // Return only k shuffled elements
}


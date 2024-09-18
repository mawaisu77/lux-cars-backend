function shuffleArrays(array1, array2) {
    // Combine both arrays into a single array
    const combinedArray = [...array1, ...array2];

    // Shuffle the combined array
    for (let i = combinedArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [combinedArray[i], combinedArray[j]] = [combinedArray[j], combinedArray[i]];
    }

    // Return the shuffled combined array
    return combinedArray;
}
module.exports = {
    shuffleArrays
}
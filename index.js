const emailChecker = emails => emails
  .reduce((map, email) => {
    const [username, domain] = email.split('@')

    /* Brute force approach would update a temp string with each valid letter.
      Let's avoid this because it's O(n^2) time, due to recopying the string.
      Instead, we'll push valid letters to a temp array and join them later. */
    const usernameSanitized = []
    for (let i = 0; i < username.length; i++) {
      const letter = username[i]
      if (letter === '+') break
      if (letter !== '.') usernameSanitized.push(letter)
    }
    const emailSanitized = `${usernameSanitized.join('')}@${domain}`

    // A map is used for the accumulator for O(1) lookup time.
    if (!map.has(emailSanitized)) map.set(emailSanitized)

    return map
  }, new Map())
  .size

// Assumption is there were no validation requirements beyond those in the instructions.
// The following returns 5 because of duplicates at indices [0, 4] & [5, 6, 7].
console.log(emailChecker([
  'joe+woof@dog.com',
  'cat@cat.com',
  'terry@cat.com',
  'joe@rat.com',
  'joe@dog.com',
  'test.email@gmail.com',
  'test.email+spam@gmail.com',
  'testemail@gmail.com'
]))

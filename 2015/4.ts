import crypto from 'crypto'

const input = 'ckczppom'

const getHash = (text: string) => crypto.createHash('md5').update(text).digest('hex')

const part_1 = (input: string) => {
  let number = 0
  while (true) {
    const hash = getHash(`${input}${number}`)
    if (hash.startsWith('00000')) {
      break
    }
    number++
  }

  return number
}

const part_2 = (input: string) => {
  let number = 0
  while (true) {
    const hash = getHash(`${input}${number}`)
    if (hash.startsWith('000000')) {
      break
    }
    number++
  }

  return number
}

const result_1 = part_1(input)
result_1

const result_2 = part_2(input)
result_2

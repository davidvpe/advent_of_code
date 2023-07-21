const input = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`

const part_1 = (input: string) => {
  // const headPositions = new Set<string>()
  const tailPositions = new Set<string>()
  const initialPosition = { x: 1000, y: 1000 }
  const knots = new Array(2).fill(0).map(() => ({ ...initialPosition }))
  let oldKnots = new Array(2).fill(0).map(() => ({ ...initialPosition }))
  // const headPosition = { ...initialPosition }
  // let oldHeadPosition = { ...initialPosition }
  // let tailPosition = { ...headPosition }

  input.split('\n').forEach((instruction, stepIndex) => {
    const [direction, distance] = instruction.split(' ')
    for (let i = 0; i < parseInt(distance); i++) {
      const headPosition = knots[0]
      const tailPosition = knots[1]
      const oldHeadPosition = oldKnots[0]

      // console.log(oldKnots)
      switch (direction) {
        case 'R':
          headPosition.x++
          break
        case 'L':
          headPosition.x--
          break
        case 'U':
          headPosition.y--
          break
        case 'D':
          headPosition.y++
          break
      }
      // console.log(oldKnots)

      const distanceBetweenPoint = Math.abs(tailPosition.x - headPosition.x) + Math.abs(tailPosition.y - headPosition.y)

      // console.log(
      //   'headPosition',
      //   headPosition,
      //   '\ntailPosition',
      //   tailPosition,
      //   '\noldHeadPosition',
      //   oldHeadPosition,
      //   '\ndistanceBetweenPoint',
      //   distanceBetweenPoint
      // )

      if (headPosition.x !== tailPosition.x && headPosition.y !== tailPosition.y) {
        if (distanceBetweenPoint > 2) {
          tailPosition.x = oldHeadPosition.x
          tailPosition.y = oldHeadPosition.y
        }
      } else if (distanceBetweenPoint > 1) {
        tailPosition.x = oldHeadPosition.x
        tailPosition.y = oldHeadPosition.y
      }

      tailPositions.add(`${tailPosition.x},${tailPosition.y}`)

      oldKnots = [...knots.map((a) => ({ ...a }))]
    }
  })

  console.log(tailPositions)

  return tailPositions.size
}

const printMatrix = (matrix: { x: number; y: number }[]) => {
  const matrixSize = 26
  const matrixArray = new Array(matrixSize).fill(0).map(() => new Array(matrixSize).fill('.'))
  matrix.reverse().forEach((point, i) => {
    matrixArray[point.y][point.x] = i === matrix.length - 1 ? 'H' : matrix.length - i - 1
  })
  console.log(matrixArray.map((a) => a.join('')).join('\n'))
}

const part_2 = (input: string) => {
  const tailPositions = new Set<string>()
  const initialPosition = { x: 15, y: 15 }
  const totalKnots = 10
  const knots = new Array(totalKnots).fill(0).map(() => ({ ...initialPosition }))
  // const headPosition = { ...initialPosition }
  // let oldHeadPosition = { ...initialPosition }
  // let tailPosition = { ...headPosition }

  input.split('\n').forEach((instruction, stepIndex) => {
    const [direction, distance] = instruction.split(' ')
    for (let i = 0; i < parseInt(distance); i++) {
      console.log(`====== ${stepIndex} - ${instruction} - ${i} ======`)
      printMatrix(knots)
      const headPosition = knots[0]
      let oldHeadPosition = { ...headPosition }

      // console.log(oldKnots)
      switch (direction) {
        case 'R':
          headPosition.x++
          break
        case 'L':
          headPosition.x--
          break
        case 'U':
          headPosition.y--
          break
        case 'D':
          headPosition.y++
          break
      }
      // console.log(oldKnots)

      for (let knotIndex = 1; knotIndex < knots.length; knotIndex++) {
        if (stepIndex <=1) {
          console.log('printMatrix for step index 1')
          printMatrix(knots)
        }
        const head = knots[knotIndex - 1]
        const tailPosition = knots[knotIndex]
        const distanceBetweenPoint = Math.abs(tailPosition.x - head.x) + Math.abs(tailPosition.y - head.y)

        // console.log(
        //   'headPosition',
        //   head,
        //   `\ntailPosition for ${knotIndex + 1}`,
        //   tailPosition,
        //   '\noldHeadPosition',
        //   oldHeadPosition,
        //   '\ndistanceBetweenPoint',
        //   distanceBetweenPoint
        // )

        // const oldHeadPosition = oldKnots[knotIndex]

        const tailBeforeUpdate = { ...tailPosition }

        if (head.x !== tailPosition.x && head.y !== tailPosition.y) {
          if (distanceBetweenPoint > 2) {
            tailPosition.x = oldHeadPosition.x
            tailPosition.y = oldHeadPosition.y
            // console.log('updating tail position', tailPosition)
          }
        } else if (distanceBetweenPoint > 1) {
          tailPosition.x = oldHeadPosition.x
          tailPosition.y = oldHeadPosition.y
          // console.log('updating tail position', tailPosition)
        }
        if (knotIndex === knots.length - 1) tailPositions.add(`${tailPosition.x},${tailPosition.y}`)

        oldHeadPosition = tailBeforeUpdate
      }
    }
    printMatrix(knots)
  })

  console.log(tailPositions)

  return tailPositions.size
}

const result_1 = part_1(`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`)
result_1

const result_2 = part_2(`R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`)
result_2

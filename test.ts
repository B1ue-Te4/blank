let we1 = [['oops']]
let we2 = [we1[0]]

we2[0][0] = 'ouch'

console.log(we1[0][0])
console.log(we2[0][0])

interface HelloWorld {
  name: string
}

export const doSomething = () => {
  const test: HelloWorld = { name: 'code is craft' }
  return `hello world to ${test.name}`
}

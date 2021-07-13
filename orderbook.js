/* eslint-disable no-console */
const orderBook = (existingBook, incomingOrder) => {
  let updatedBook = []

  if (existingBook.length <= 0) {
    console.log('No Exisitng Orders')

    return updatedBook.concat(incomingOrder)
  }

  if (incomingOrder.type === 'sell') {
    if (existingBook.some(order => order.type === 'buy' && order.price === incomingOrder.price)) {
      console.log('Do Something')
    } else {
      console.log('No Order Matches')
      updatedBook = existingBook.concat(incomingOrder)
    }
  }

  return updatedBook
}




module.exports = orderBook

const existingBook = [{ type: 'sell', quantity: 10, price: 6150 }]
const incomingOrder = { type: 'sell', quantity: 12, price: 6000 }

console.log(orderBook(existingBook, incomingOrder))



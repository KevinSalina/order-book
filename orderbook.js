/* eslint-disable no-console */
const orderBook = (existingBook, incomingOrder) => {
  let updatedBook = []

  if (existingBook.length <= 0) {
    console.log('No Exisitng Orders')

    return updatedBook.concat(incomingOrder)
  }

  if (incomingOrder.type === 'sell') {
    if (existingBook.some(order => order.type === 'buy' && order.price === incomingOrder.price)) {
      existingBook.forEach((order, i) => {
        if (order.type === 'buy' && order.price === incomingOrder.price) {
          let newQty = null

          newQty = incomingOrder.quantity - order.quantity
          if (newQty === 0) {
            existingBook.splice(i, 1)
          } else {
            order.quantity = newQty
          }
        }
        incomingOrder = []
      })
      updatedBook = existingBook
    } else {
      console.log('No Order Matches')
      updatedBook = existingBook.concat(incomingOrder)
    }
  }

  return updatedBook
}




module.exports = orderBook

const existingBook = [{ type: 'buy', quantity: 10, price: 6150 }, { type: 'sell', quantity: 12, price: 6250 }]
const incomingOrder = { type: 'sell', quantity: 10, price: 6150 }

console.log(orderBook(existingBook, incomingOrder))



const orderBook = (existingBook, incomingOrder) => {
  let updatedBook = []

  if (existingBook.length <= 0) {
    return existingBook.concat(incomingOrder)
  }

  for (const [index, currentOrder] of existingBook.entries()) {
    // eslint-disable-next-line max-len
    const misMatchCriteria = ((incomingOrder.type === 'sell' && (incomingOrder.price <= currentOrder.price)) || (incomingOrder.type === 'buy' && incomingOrder.price >= currentOrder.price))
    const matchingPriceCriteria = currentOrder.price === incomingOrder.price

    if (currentOrder.type !== incomingOrder.type && misMatchCriteria) {
      if (currentOrder.quantity === incomingOrder.quantity) {
        existingBook.splice(index, 1)
        updatedBook = existingBook

        return updatedBook
      } else if (currentOrder.quantity > incomingOrder.quantity && matchingPriceCriteria) {
        currentOrder.quantity -= incomingOrder.quantity
        existingBook.push(...existingBook.splice(index, 1))
        updatedBook = existingBook

        return updatedBook
      } else if (incomingOrder.quantity > currentOrder.quantity && matchingPriceCriteria) {
        incomingOrder.quantity -= currentOrder.quantity
        existingBook.splice(index, 1)
        if (existingBook.some(order => order.type !== incomingOrder.type && order.price === incomingOrder.price)) {
          let updatedOrder = incomingOrder

          incomingOrder = []

          return orderBook(existingBook, updatedOrder)
        }
        updatedBook = existingBook.concat(incomingOrder)
      }
    } else {
      updatedBook = existingBook.concat(incomingOrder)
    }
  }

  return updatedBook
}

module.exports = orderBook


const orderBook = (existingBook, incomingOrder) => {
  if (existingBook.length <= 0) return [incomingOrder]

  for (const [index, currentOrder] of existingBook.entries()) {
    // eslint-disable-next-line max-len
    const misMatchCriteria = ((incomingOrder.type === 'sell' && (incomingOrder.price <= currentOrder.price)) || (incomingOrder.type === 'buy' && incomingOrder.price >= currentOrder.price))
    const matchingPriceCriteria = currentOrder.price === incomingOrder.price

    if (currentOrder.type !== incomingOrder.type && misMatchCriteria) {
      if (currentOrder.quantity === incomingOrder.quantity) {
        existingBook.splice(index, 1)

        return existingBook
      } else if (currentOrder.quantity > incomingOrder.quantity && matchingPriceCriteria) {
        currentOrder.quantity -= incomingOrder.quantity
        existingBook.push(...existingBook.splice(index, 1))

        return existingBook
      } else if (incomingOrder.quantity > currentOrder.quantity && matchingPriceCriteria) {
        incomingOrder.quantity -= currentOrder.quantity
        existingBook.splice(index, 1)
        if (existingBook.some(order => order.type !== incomingOrder.type && order.price === incomingOrder.price)) {
          return orderBook(existingBook, incomingOrder)
        }

        return existingBook.concat(incomingOrder)
      }
    } else {
      return existingBook.concat(incomingOrder)
    }
  }

  return existingBook
}

module.exports = orderBook


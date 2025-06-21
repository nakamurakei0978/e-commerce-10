[
  {
    '$match': {
      'product': new ObjectId('68542062490ae3f60cef4ef6')
    }
  }, {
    '$group': {
      '_id': null, 
      'averageRating': {
        '$avg': '$rating'
      }, 
      'numOfReviews': {
        '$sum': 1
      }
    }
  }
]
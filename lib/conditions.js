module.exports = {
  any: function() {
    arguments.some(function(element) {
      return element;
    })
  },

  all: function() {
    arguments.every(function(element) {
      return element;
    })
  },

  body: function() {
    
  }
}

// Legacy JavaScript ES5 code

var app = {
  init: function() {
    var self = this;
    $('#button').click(function() {
      self.handleClick();
    });
  },
  
  handleClick: function() {
    var data = this.getData();
    $.ajax({
      url: '/api/data',
      type: 'POST',
      data: data,
      success: function(response) {
        $('#result').html(response);
      },
      error: function() {
        alert('Error!');
      }
    });
  },
  
  getData: function() {
    return {
      name: $('#name').val(),
      email: $('#email').val()
    };
  }
};

$(document).ready(function() {
  app.init();
});

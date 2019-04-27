# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
jQuery ->
  initializeDatatable = (standard) ->
    $("#dttb").DataTable({
      destroy: true,
      'ajax': '/en/students?standard_id='+ standard,
      "columnDefs": [{
        "targets": 5,
        render: (data, type, full, meta) ->
          '<button type=button style=border:1px solid black; background-color: transparent;>
          <i class="fa fa-trash" ></i>
          </button>'
      }]
      'ajax': '/'+locale+'/students?standard_id='+ standard,
    });

  initializeDatatable("")
  $('.standard-select').on 'change', (e) ->
    initializeDatatable(e.target.value)
    return

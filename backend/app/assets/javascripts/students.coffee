# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
jQuery ->
  initializeDatatable = (standard) ->
    $("#dttb").DataTable({
      destroy: true,
      'ajax': '/en/students?standard_id='+ standard,
    });

  initializeDatatable("")
  $('.standard-select').on 'change', (e) ->
    initializeDatatable(e.target.value)
    return
$(function() {
    $.getJSON('/api/dayssince').then(function (data) {
        $('#funfact').text(data.case)
        $('#days').text(data.daysSince)
    })
})

var selectedTags = [];
var selectedFilterTags = [];
$(document).ready(function () {
    var converter = new showdown.Converter();
    var pad = document.getElementById('note_description');
    var markdownArea = document.getElementById('markdown');
    var convertTextAreaToMarkdown = function () {
        var markdownText = pad.value;
        var html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    };
    $(document).on('input', pad, convertTextAreaToMarkdown);
    convertTextAreaToMarkdown();

    $("#scroll").click(function () {
        $('html,body').animate({scrollTop: $(".navbar").offset().top}, 'slow');
    });

    $(".label-item").click(function (event) {
        event.preventDefault();
        console.log($(this).text());
        for (var i = 0; i < selectedTags.length; i++) {
            if (selectedTags[i] === $(this).text()) return;
        }
        selectedTags.push($(this).text());
        var input = $("#labelList");
        $("#labelList").val(selectedTags);
        $(".tag-list").append(`<span class="badge badge-pill badge-info mr-3">${$(this).text()} <span class="cross" style="margin-left: 5px;color: black;">x</span></span>`)
    });

    $(".label-filter-item").click(function (event) {
        event.preventDefault();
        console.log($(this).text());
        for (var i = 0; i < selectedFilterTags.length; i++) {
            if (selectedFilterTags[i] === $(this).text()) return;
        }
        selectedFilterTags.push($(this).text());
        var input = $("#labelFilterList");
        $("#labelFilterList").val(selectedFilterTags);
        $(".tag-filter-list").append(`<span style="padding: 5px;" class="badge badge-pill badge-warning mr-3">${$(this).text()} <span class="filter-cross" style="margin-left: 5px;color: black;">x</span></span>`)
    });

    $(document).on('click', '.cross', function () {
        var text = $($(this)[0].parentElement).text().split(" ")[0];
        selectedTags = selectedTags.filter(function (value) {
            return value !== text;
        });
        $("#labelList").val(selectedTags);
        $(this)[0].parentElement.remove();
    });

    $(document).on('click', '.filter-cross', function () {
        var text = $($(this)[0].parentElement).text().split(" ")[0];
        selectedFilterTags = selectedFilterTags.filter(function (value) {
            return value !== text;
        });
        $("#labelFilterList").val(selectedFilterTags);
        $(this)[0].parentElement.remove();
    });

    $(function () {
        var $startDate = $('#datetimepicker4');
        var $endDate = $('#datetimepicker5');

        $startDate.datetimepicker({
            format: 'L',
            showTodayButton: true,
            icons: {
                today: 'today-button-pf'
            }
        });
        $endDate.datetimepicker({
            format: 'L',
            useCurrent: false,
            showTodayButton: true,
            icons: {
                today: 'today-button-pf'
            }
        });

        $startDate.on('dp.change', function (e) {
            $endDate.data('DateTimePicker').minDate(e.date);
        });
        $endDate.on('dp.change', function (e) {
            $startDate.data('DateTimePicker').maxDate(e.date);
        });

        $('#range1').on('click', 'a', function (e) {
            e.preventDefault();
            var sDate = $startDate.data('DateTimePicker').date();
            var eDate = $endDate.data('DateTimePicker').date();
            var duration = parseInt(e.target.textContent);
            if (!sDate && !eDate) {
                $startDate.data('DateTimePicker').date(moment());
                $endDate.data('DateTimePicker').date(moment().add(duration, 'days'));
            } else if (sDate && !eDate) {
                $endDate.data('DateTimePicker').date(sDate.add(duration, 'days'));
            } else if (!sDate && eDate) {
                $startDate.data('DateTimePicker').date(eDate.subtract(duration, 'days'));
            } else {
                $endDate.data('DateTimePicker').minDate(false);
                $endDate.data('DateTimePicker').date(sDate.add(duration, 'days'));
            }
        });
    });
});
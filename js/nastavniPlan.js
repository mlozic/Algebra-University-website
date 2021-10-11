var api = "http://www.fulek.com/VUA/SUPIT/GetNastavniPlan";
var details = "http://www.fulek.com/VUA/supit/GetKolegij/";

var selectedClasses = [];
var ects = 0;
var sati = 0;
var tableSize = 0;

$(function () {
  $.getJSON(api, function (data) {
    var availableClasses = [];

    $.each(data, function (key, classObject) {
      availableClasses.push(classObject);
    });
    $("#classes").autocomplete({
      source: availableClasses,
      select: function (event, ui) {
        event.preventDefault();
        $("#classes").val(ui.item.label);
        var className = ui.item.label;
        var classValue = ui.item.value;
        var url = details + classValue;

        $.getJSON(url, function (data) {
          var currentItem = {
            name: data.kolegij,
            ects: data.ects,
            sati: data.sati,
            lectures: data.predavanja,
            exercises: data.vjezbe,
            tip: data.tip,
            semestar: data.semestar,
          };
          selectedClasses.push(currentItem);
          ects += currentItem.ects;
          sati += currentItem.sati;

          if (tableSize === 0) {
            var tableHeader =
              "<tr><th>Kolegij</th><th>ECTS</th><th>Sati</th><th>P</th><th>V</th><th>Tip</th><th></th></tr>";
            var tableFooter =
              '<tr><td id="totalLabel">Ukupno:</td><td class="totalValue" id="total">' +
              ects +
              '</td><td class="totalValue" id="totalsati">' +
              sati +
              "</td><</tr>";
            $("#tableBody > thead").append(tableHeader);
            $("#tableBody > tfoot").append(tableFooter);
          }

          var buttonString =
            "<button id='btn" +
            selectedClasses.length +
            "' class='btn btn-danger btn-obrisi' value='" +
            selectedClasses.length +
            "'>Obriši</button>";

          var newRowContent =
            "<tr id='" +
            selectedClasses.length +
            "'><td>" +
            currentItem.name +
            "</td><td>" +
            currentItem.ects +
            "</td><td>" +
            currentItem.sati +
            "</td><td>" +
            currentItem.lectures +
            "</td><td>" +
            currentItem.exercises +
            "</td><td>" +
            currentItem.tip +
            "</td><td>" +
            buttonString +
            "</td></tr>";

          $("tfoot td#total").text(ects);
          $("tfoot td#totalsati").text(sati);

          $("#tableBody tbody").append(newRowContent);
          tableSize++;
          $("#btn" + selectedClasses.length).click(function () {
            var tableId = $(this).attr("value");
            $("#" + tableId).remove();
            ects -= currentItem.ects;
            sati -= currentItem.sati;
            $("tfoot td#total").text(ects);
            $("tfoot td#totalsati").text(sati);
            tableSize--;
            if (tableSize === 0) {
              $("tfoot > tr").remove();
              $("thead > tr").remove();
            }
          });
        });
      },
    });
  });
});

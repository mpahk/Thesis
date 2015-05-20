$(function () {
    LOPUTOO.tabel.looTabel();
});

(function (tees) {

    (function (abi) {
        abi.conf = { laadimisPildiUrl: "", pohiKonteiner: "container" };
        abi.looElement = function (spec) {
            var elem = document.createElement("td");
            if (!!spec.tuup) {
                elem = document.createElement(spec.tuup);
            }

            elem.innerHTML = spec.sone;
            return elem;
        };
        abi.naitaLaadimist = function () {
            var element = document.createElement("img"), body;

            element.src = abi.conf.laadimisPildiUrl;
            element.id = "loadingImage";
            element.setAttribute("style", "display:block; margin:0px auto; width:40px;");
            body = document.getElementById(abi.conf.pohiKonteiner);
            body.appendChild(element);
        };
        abi.peidaLaadimine = function () {
            $("#loadingImage").remove();
        };

    })(tees.abistaja = tees.abistaja || {});

    (function (tbl) {
        var laeAndmed, lehtLaetud;
        tbl.conf = { url: "", pohiKonteiner: "container" };

        laeAndmed = function () {
            var tagasiViide = $.Deferred();
            $.ajax({
                method: "GET",
                url: tbl.conf.url,
                dataType: "json"
            }).done(function (and) {
                tagasiViide.resolve(and);
            });
            return tagasiViide.promise();
        };

        tbl.looTabel = function () {
            var andmed = laeAndmed(), looElement = tees.abistaja.looElement;

            tees.abistaja.naitaLaadimist();

            $.when(andmed)
             .done(function (data) {
                 var i, tabel, rida, body, keha, pea;
                 tabel = document.createElement("table");
                 tabel.className = "table";
                 pea = document.createElement("thead");

                 rida = document.createElement("tr");
                 rida.appendChild(looElement({ sone: "Eesnimi", tuup: "th" }));
                 rida.appendChild(looElement({ sone: "Perenimi", tuup: "th" }));
                 rida.appendChild(looElement({ sone: "Vanus", tuup: "th" }));

                 pea.appendChild(rida);
                 tabel.appendChild(pea);
                 keha = document.createElement("tbody");

                 for (i = 0; i < data.length; i++) {
                     rida = document.createElement("tr");
                     rida.appendChild(looElement({ sone: data[i].FirstName }));
                     rida.appendChild(looElement({ sone: data[i].LastName }));
                     rida.appendChild(looElement({ sone: data[i].Age }));

                     keha.appendChild(rida);
                 }
                 tabel.appendChild(keha);
                 body = document.getElementById(tbl.conf.pohiKonteiner);
                 body.appendChild(tabel);
                 tees.abistaja.peidaLaadimine();
                 tees.veateateNupp.lisa();
             });
        };

    })(tees.tabel = tees.tabel || {});

    (function (nupp) {
        nupp.conf = { url: "" };
        nupp.lisa = function () {
            var nupp = tees.abistaja.looElement({sone:"Vajuta mind, et veateadet näha", tuup:"button"}),
            pohi = document.getElementById(tees.abistaja.conf.pohiKonteiner);
            nupp.className = "btn btn-xs btn-danger";
            nupp.id = "errorNaitaNupp";
            pohi.appendChild(nupp);

            $.getScript(LOPUTOO.veateateNupp.conf.url, function () {
                $("#" + nupp.id).click(function () {
                    LOPUTOO.veateade.kuvaTavaVeateade();
                });
            });
        };
    })(tees.veateateNupp = tees.veateateNupp || {});

})(window.LOPUTOO = window.LOPUTOO || {});
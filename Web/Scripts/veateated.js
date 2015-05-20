(function (tees) {
    (function (viga) {
        var pariNimi, asendaLingid, hajutaVeateade;
        viga.conf = { url: "/api/ThesisAPI/GetUserName" };
        viga.tagastaVeateade = function (id) {
            var i;
            for (i = 0; i < veateated.length; i++) {
                if (id === veateated[i].Id) {
                    return veateated[i].Message;
                }
            }
            return "";
        };
        pariNimi = function () {
            var def = $.Deferred();
            $.ajax({
                method: "GET",
                url: viga.conf.url,
                dataType: "json"
            })
            .done(function (andmed) {
                def.resolve(andmed);
            });
            return def.promise();
        };

        asendaLingid = function (teade) {
            var i, j, nimekiri = [], puhver, tarkA, tarkB, re;
            for (i = 0; i < teade.length; i++) {
                tarkA = teade.charAt(i);
                if (tarkA === "{") {

                    for (j = i + 1; j < teade.length; j++) {
                        tarkB = teade.charAt(j);
                        if (tarkB === "}") {
                            puhver = teade.substr(i, (j - i + 1));
                            nimekiri.push(puhver);
                            i = j + 1;
                            break;
                        }
                    }
                }
            }
            for (i = 0; i < nimekiri.length; i++) {
                tarkA = nimekiri[i];
                if (tarkA.indexOf("|") > -1) {
                    puhver = tarkA.split("|");
                    tarkB = puhver[1].substr(0, puhver[1].length - 1);
                    tarkA = puhver[0].substr(1, puhver[0].length - 1);
                    puhver = '<a style="color:white;" href="' + tarkB + '">' + tarkA + '</a>';
                    teade = teade.replace(nimekiri[i], puhver);

                }
            }
            return teade;
        };

        viga.tootleVeateade = function (teade) {
            var def = $.Deferred();
            teade = asendaLingid(teade);
            if (teade.indexOf("{nimi}") > -1) {
                $.when(pariNimi())
                .done(function (nimi) {
                    var re = new RegExp("{nimi}", 'g');
                    teade = teade.replace(re, nimi);
                    return def.resolve(teade);
                });
            }

            return def.promise();
        };

        viga.peidaTavaVeateade = function () {
            $("#veateade").remove();
        };

        hajutaVeateade = function () {
            $("#veateade").fadeOut(2000, function () {
                viga.peidaTavaVeateade();
            });
        };

        viga.kuvaTavaVeateade = function () {
            var veateade, peaKonteiner, konteiner;

            if ($("#veateade").length > 0) {
                return;
            }

            $.when(viga.tootleVeateade(viga.tagastaVeateade("E001")))
                .done(function (teade) {
                    konteiner = LOPUTOO.abistaja.looElement({ sone: teade, tuup: "p" })
                    peaKonteiner = document.getElementById("title");
                    konteiner.className = "label label-danger";
                    konteiner.id = "veateade";
                    peaKonteiner.appendChild(konteiner);

                    setTimeout(hajutaVeateade, 2000);
                });
        };

    })(tees.veateade = tees.veateade || {});
})(window.LOPUTOO = window.LOPUTOO || {});
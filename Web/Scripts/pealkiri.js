$(function () {
    $.getScript(LOPUTOO.pealkiri.conf.base64TeekUrl, function () {
        LOPUTOO.pealkiri.kuva();
    });
});

(function (tees) {
    (function (pea) {
        pea.conf = { url: "", base64TeekUrl: "" };
        pea.kuva = function () {
            $.ajax({
                method: "GET",
                url: pea.conf.url,
                dataType: "json"
            }).done(function (andmed) {
                var pealkiri, konteiner, pealkKonteiner;
                pealkiri = $.base64.decode(andmed);
                konteiner = document.getElementById("title");
                pealkKonteiner = document.createElement("h1");
                pealkKonteiner.innerHTML = pealkiri;
                konteiner.appendChild(pealkKonteiner);
            });
        };

    })(tees.pealkiri = tees.pealkiri || {});
})(window.LOPUTOO = window.LOPUTOO || {});
$(function () {
    loputoo.abistaja.aareJooned();
    loputoo.abistaja.joonestaMuutusePeale();
});

(function (tees) {
    (function (abi) {
        abi.aareJooned = function () {
            var korgus = $(document).height();
            $("#container").css("min-height",(korgus-40)+"px");
        };
        abi.joonestaMuutusePeale = function () {
            $(window).resize(function () {
                abi.aareJooned();
            });
        };
    })(tees.abistaja = tees.abistaja || {});
})(window.loputoo = window.loputoo || {});
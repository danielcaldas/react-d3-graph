if (process.env.NODE_ENV !== "development") {
    (function(i, s, o, g, r, a, m) {
        i["GoogleAnalyticsObject"] = r;
        (i[r] =
            i[r] ||
            function() {
                (i[r].q = i[r].q || []).push(arguments);
            }),
            (i[r].l = 1 * new Date());
        (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m);
    })(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga");
    try {
        // eslint-disable-next-line no-undef
        ga("create", "UA-121685077-2", "auto");
        // eslint-disable-next-line no-undef
        ga("send", "pageview");
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.error("react-d3-graph :: ", error);
        }
    }
}

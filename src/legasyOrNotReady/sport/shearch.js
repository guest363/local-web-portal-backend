const sportQueryMaker = id => {
    let query = {};
    let start, end = "";
    if (id[0] === "fio") {
        query.fio = id[1];
    }
    if (id[0] === "squad") {
        query.squad = id[1];
    }
    if (id[2] !== "" && id[3] === "") {
        start = moment(id[2]).format("YYYYMM") - 1;
        start = start + "";
        start = start.replace(/..../, "$&-");
        // приводим год и месяц к одному длинному числу
        // от него отнимаем 1 и приводим к формату даты
        // для того, чтобы месяц начинался на один назад
        query.month = { $gt: start };
    }
    if (id[2] === "" && id[3] !== "") {
        end = moment(id[3]).format("YYYYMM") + 1;
        end = end + "";
        end = end.replace(/..../, "$&-");
        query.month = { $lt: end };
    }
    if (id[2] !== "" && id[3] !== "") {
        start = moment(id[2]).format("YYYYMM") - 1;
        start = start + "";
        start = start.replace(/..../, "$&-");
        end = moment(id[3]).format("YYYYMM") + 1;
        end = end + "";
        end = end.replace(/..../, "$&-");
        query.month = { $gt: start, $lt: end };
    }
    return query;
}
module.exports = sportQueryMaker;
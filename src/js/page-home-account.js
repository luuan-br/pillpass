(() => {
    "use strict";
    const baseURL = "https://ouxnadpkm4.execute-api.us-east-1.amazonaws.com/shopify";

    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const response = await getEconomy("luuan.br@live.com");
            const { total, orders, categories } = JSON.parse(response);

            const economyTotal = document.getElementById("economy-total");
            economyTotal && (economyTotal.innerText = total);

            chartOrder(orders);
            chartCategories(categories);
        } catch (error) {
            console.error(error);
        }
    });

    function chartOrder(orders) {
        const xAxis = orders.map((order) => order.month);
        const yAxisEconomy = orders.map((order) => order.economy);
        const yAxisTotal = orders.map((order) => order.total - order.economy);

        const options = {
            chart: {
                type: 'bar',
                height: "350px",
                stacked: true,
            },
            dataLabels: {
                enabled: true,
                formatter: function (val, opts) {
                    return `R$ ${val}`
                },
            },
            series: [
                {
                    name: 'total',
                    data: yAxisTotal,
                },
                {
                    name: 'economia',
                    data: yAxisEconomy,
                }
            ],
            xaxis: {
                categories: xAxis
            },
            yaxis: {
                labels: {
                    formatter: (val) => {
                        return `R$ ${val}`
                    }
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left'
            }
        }

        const chart = new ApexCharts(document.querySelector("#orders"), options);

        chart.render();
    }

    function chartCategories(categories) {
        const xAxis = categories.map((category) => category.category);
        const yAxisEconomy = categories.map((category) => category.economy);
        const yAxisTotal = categories.map((category) => category.total - category.economy);

        const options = {
            chart: {
                type: "bar",
                height: "350px",
                stacked: true,
                toolbar: {
                    show: false,
                },
            },
            tooltip: {
                style: {
                    fontSize: "12px",
                    fontFamily: undefined,
                },
                onDatasetHover: {
                    style: {
                        fontSize: "12px",
                        fontFamily: undefined,
                    },
                },
                theme: "dark",
            },
            series: [
                {
                    name: 'total',
                    data: yAxisTotal,
                },
                {
                    name: 'economia',
                    data: yAxisEconomy,
                },
            ],
            xaxis: {
                categories: xAxis,
                show: false,
                labels: {
                    show: true,
                    style: {
                        colors: "#A3AED0",
                        fontSize: "12px",
                        fontWeight: "500",
                    },
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            yaxis: {
                show: false,
                color: "black",
                labels: {
                    show: false,
                    style: {
                        colors: "#A3AED0",
                        fontSize: "14px",
                        fontWeight: "500",
                    },
                },
            },
            grid: {
                borderColor: "rgba(163, 174, 208, 0.3)",
                show: true,
                yaxis: {
                    lines: {
                        show: false,
                        opacity: 0.5,
                    },
                },
                row: {
                    opacity: 0.5,
                },
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
            fill: {
                type: "solid",
                colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
            },
            legend: {
                show: false,
            },
            colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
            dataLabels: {
                enabled: false,
            },
            plotOptions: {
                bar: {
                    borderRadius: 10,
                    columnWidth: "20px",
                },
            },
        };

        const chart = new ApexCharts(document.querySelector("#categories"), options);

        chart.render();
    }
    
    async function getEconomy(email) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({ email }),
            redirect: "follow"
        };

        const response = await fetch(`${baseURL}/economy`, requestOptions);

        if (!response.ok) throw new Error("Network response was not ok.");

        return response.text();
    };
})();
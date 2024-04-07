const { createApp } = Vue;

createApp({
    data() {
        return {
            ranges: [
                {
                    label: "Gastos com Medicamentos",
                    value: 700,
                    min: 0,
                    max: 2000,
                    discount: 0.8,
                    position: "10px",
                },
                {
                    label: "Gastos com Higiene Pessoal",
                    value: 50,
                    min: 0,
                    max: 2000,
                    discount: 0.5,
                    position: "10px",
                },
                {
                    label: "Gastos com Beleza e Cosmético",
                    value: 50,
                    min: 0,
                    max: 2000,
                    discount: 0.3,
                    position: "10px",
                },
            ],
        };
    },
    computed: {
        total() {
            return this.ranges.reduce(
                (acc, range) => acc + Number(range.value),
                0
            );
        },
        totalWithDiscount() {
            const discount = this.ranges.reduce(
                (acc, range) =>
                    acc +
                    Number(range.value) -
                    Number(range.value) * range.discount,
                0
            );

            return Number(discount).toFixed(0);
        },
    },
    methods: {
        setValue(index) {
            const input = this.ranges[index].value;
            const min = this.ranges[index].min;
            const max = this.ranges[index].max;

            const newValue = Number(((input - min) * 100) / (max - min));
            const newPosition = 10 - newValue * 0.2;

            this.ranges[
                index
            ].position = `calc(${newValue}% + (${newPosition}px))`;
        },
        changeValueRange(value, index) {
            const newValue = value.replaceAll(/\D/g, "") || 0;

            this.ranges[index].value =
                newValue > this.ranges[index].max
                    ? this.ranges[index].max
                    : newValue;

            this.setValue(index);
        },
    },
    mounted() {
        this.ranges.forEach((range, index) => {
            this.setValue(index);
        });
    },
}).mount("#savings-calculator");

export const filtro_anos = [
    {
        ano: 2023,
        meses: [            
            { num: 1, desc :  "Janeiro"},
            { num: 2, desc :  "Fevereiro"},
            { num: 3, desc :  "Março"},
            { num: 4, desc :  "Abril"},
            { num: 5, desc :  "Maio"},
            { num: 6, desc :  "Junho"},
            { num: 7, desc :  "Julho"},
            { num: 8, desc :  "Agosto"},
            { num: 9, desc :  "Setembro"},
            { num: 10, desc : "Outubro"},
            { num: 11, desc : "Novembro"},
            { num: 12, desc : "Dezembro"}            
        ]
    },
    {
        ano: 2024,
        meses: [            
            { num: 1, desc :  "Janeiro"},
            { num: 2, desc :  "Fevereiro"},
            { num: 3, desc :  "Março"},
            { num: 4, desc :  "Abril"},
            { num: 5, desc :  "Maio"},
            { num: 6, desc :  "Junho"},
            { num: 7, desc :  "Julho"},
            { num: 8, desc :  "Agosto"},
            { num: 9, desc :  "Setembro"},
            { num: 10, desc : "Outubro"}          
        ]
    }
];
export const API_URL = "https://saturn-api.vercel.app";
export const KPI_RESULTS_URL = API_URL+"/results";
export const KPI_INFO_URL = API_URL+"/kpi";
export const LOGOUT_URL = API_URL+"/logout";
export const LOGIN_DEMO_URL = API_URL+"/auth/demo";
export const AUTH_VALIDATION_URL = API_URL+"/auth/validade";
export const operators = {
    '>=': function (a, b){ return a>=b },
    '<=': function (a, b){ return a<=b },
    '>' : function (a, b){ return a>b },
    '<' : function (a, b){ return a<b }
};
export const variacao_c = `<i class="fa-solid fa-angles-up fa-xl"></i>`;
export const variacao_d = `<i class="fa-solid fa-angles-up fa-rotate-180 fa-xl"></i>`;
export const variacao_n = `<i class="fa-solid fa-grip-lines fa-xl"></i>`;
export const variacao = {
    c: variacao_c,
    d: variacao_d,
    n: variacao_n
};

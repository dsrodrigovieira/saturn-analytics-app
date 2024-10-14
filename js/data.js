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

export const indicadores_ans = [
    {
        id: 1,
        titulo: "Proporção de Partos Vaginais",
        unidade: "%",
        dominio: "Efetividade",
        descricao: "O resultado do indicador reflete o percentual de partos normais realizados na instituição no período de interesse. Percentuais maiores de parto normal são desejáveis, pois há menores taxas de complicações relacionadas.",
        meta: "≥ 55% de partos vaginais"
    },
    {
        id: 2,
        titulo: "Proporção de reinternações em até 30 dias da saída hospitalar",
        unidade: "%",
        dominio: "Efetividade",
        descricao: "Refere-se ao número de pacientes que tiveram uma reinternação não programada na instituição em relação ao total de saídas do mês anterior ao mês de competência. Por exemplo: na competência de janeiro houve 1.000 saídas de internações. Destas, 50 apresentaram reinternações não programadas em até 30 dias após a alta. Desta forma, a competência de fevereiro será (50/1.000) x 100, ou seja, 5 reinternações não programadas a cada 100 internações do mês de janeiro. Altas proporções de reinternações podem ser reflexo das ações não resolutivas dos atendimentos aos pacientes.",
        meta: "≤ 20%"
    },
    {
        id: 3,
        titulo: "Taxa de parada cardiorrespiratória em unidade de internação",
        unidade: "/1000 pacientes-dia",
        dominio: "Efetividade",
        descricao: "Este indicador se refere ao número de casos de parada cardiorrespiratória a cada 1000 pacientes-dia hospitalizados na unidade de internação. Quanto menor a taxa, melhor.",
        meta: "0"
    },
    {
        id: 4,
        titulo: "Taxa de mortalidade institucional",
        unidade: "%",
        dominio: "Efetividade",
        descricao: "O resultado do indicador reflete o percentual de óbitos institucionais no período de interesse. Quanto menor a taxa de mortalidade, melhor.",
        meta: "< 3%"
    },
    {
        id: 5,
        titulo: "Tempo médio de internação",
        unidade: "dias",
        dominio: "Eficiência",
        descricao: "O resultado do indicador representa a média de tempo que os pacientes permaneceram internados na instituição. Uma média baixa de tempo de internação é o mais desejável.",
        meta: "≤ 5 dias"
    },
    {
        id: 6,
        titulo: "Tempo médio de permanência na emergência",
        unidade: "horas",
        dominio: "Eficiência",
        descricao: "O resultado do indicador representa a média de tempo que os pacientes permaneceram na unidade de emergência da instituição. Uma média baixa de tempo de permanência é o mais desejável.",
        meta: "≤ 8 horas"
    },
    {
        id: 7,
        titulo: "Tempo médio de espera na emergência para primeiro atendimento",
        unidade: "minutos",
        dominio: "Eficiência",
        descricao: "O resultado do indicador representa a média do tempo de espera até o primeiro atendimento médico. Quanto menor a média, melhor.",
        meta: "Nível 2: ≤ 10 minutos. Nível 3: ≤ 60 minutos."
    },
    {
        id: 8,
        titulo: "Taxa de início de antibiótico intravenoso profilático",
        unidade: "%",
        dominio: "Eficiência",
        descricao: "O resultado do indicador reflete o percentual de pacientes que, submetidos a cirurgias limpas, receberam profilaxia antibiótica no período de 1 hora ou menos de antecedência da incisão na pele. Quanto maior o percentual, melhor.",
        meta: "≥ 90%"
    },
    {
        id: 9,
        titulo: "Taxa de infecção de sítio cirúrgico em cirurgia limpa",
        unidade: "%",
        dominio: "Segurança",
        descricao: "O resultado do indicador reflete o percentual de pacientes que apresentaram infecção de sítio cirúrgico após serem submetidos a uma cirurgia limpa. Quanto menor a taxa de infecção de sítio cirúrgico, melhor.",
        meta: "< 1%"
    },
    {
        id: 10,
        titulo: "Densidade de incidência de infecção primária de corrente sanguínea (IPCS) em pacientes em uso de cateter venoso central (CVC)",
        unidade: "/1000 pacientes-dia",
        dominio: "Segurança",
        descricao: "O resultado do indicador reflete o número de pacientes que apresentaram infecção primária de corrente sanguínea associada a cateter venoso central a cada 1000 pacientes que fazem uso de CVC. Quanto menor a taxa de infecção de corrente sanguínea associada a CVC, melhor.",
        meta: "≤ 1 para cada 1000 pacientes CVC-dia."
    },
    {
        id: 11,
        titulo: "Densidade de incidência de infecção do trato urinário (ITU) associada a um cateter vesical de demora (CVD)",
        unidade: "/1000 pacientes-dia",
        dominio: "Segurança",
        descricao: "O resultado do indicador reflete o número de pacientes que apresentaram infecção de trato urinário associada a cateter vesical de demora a cada 1000 pacientes que fazem uso de CVD. Quanto menor a taxa de infecção de trato urinário associada a CVD, melhor.",
        meta: "≤ 2,7 para cada 1000 pacientes CVD-dia."
    },
    {
        id: 12,
        titulo: "Taxa de profilaxia de tromboembolismo venoso",
        unidade: "%",
        dominio: "Segurança",
        descricao: "O resultado do indicador reflete o percentual de pacientes que receberam profilaxia para TEV em relação ao total de pacientes internados no mesmo período que apresentaram risco trombótico não baixo. Quanto maior o percentual, melhor.",
        meta: "100%"
    },
    {
        id: 13,
        titulo: "Densidade de incidência de queda resultando em lesão em paciente",
        unidade: "/1000 pacientes-dia",
        dominio: "Segurança",
        descricao: "O resultado do indicador reflete o número de quedas que resultaram em danos a cada 1000 pacientes internados. Quanto menor a taxa, melhor.",
        meta: "≤ 2,2 a cada 1.000 pacientes-dia."
    },
    {
        id: 14,
        titulo: "Evento sentinela",
        unidade: "Número absoluto",
        dominio: "Segurança",
        descricao: "Refere-se ao total de pacientes internados que sofreram algum evento sentinela. Quanto menor, melhor.",
        meta: "0"
    }    
];

export const resultados_indicadores = [
    {
        ano: 2024,
        mes: 1,
        resultados: [
            {
                id: 1,
                valor: 70,
                variacao: "d"
            },
            {
                id: 2,
                valor: 10,
                variacao: "c"
            },
            {
                id: 3,
                valor: 0.7,
                variacao: "n"              
            },
            {
                id: 4,
                valor: 5,
                variacao: "d"
            },
            {
                id: 5,
                valor: 3.5,
                variacao: "c"
            },
            {
                id: 6,
                valor: 2.9,
                variacao: "n"
            },
            {
                id: 7,
                valor: 1.2,
                variacao: "d"
            },
            {
                id: 8,
                valor: 92,
                variacao: "c"
            },
            {
                id: 9,
                valor: 0.7,
                variacao: "n"
            },
            {
                id: 10,
                valor: 1.2,
                variacao: "d"
            },
            {
                id: 11,
                valor: 2.5,
                variacao: "c"
            },
            {
                id: 12,
                valor: 98.9,
                variacao: "n"
            },
            {
                id: 13,
                valor: 0.7,
                variacao: "d"
            },
            {
                id: 14,
                valor: 0.3,
                variacao: "c"
            }
        ]        
    },
    {
        ano: 2024,
        mes: 2,
        resultados: [
            {
                id: 1,
                valor: 60,
                variacao: "d"
            },
            {
                id: 2,
                valor: 20,
                variacao: "n"
            },
            {
                id: 3,
                valor: 1,
                variacao: "c"

            },
            {
                id: 4,
                valor: 7,
                variacao: "n"
            },
            {
                id: 5,
                valor: 2,
                variacao: "c"
            },
            {
                id: 6,
                valor: 1.5,
                variacao: "d"
            },
            {
                id: 7,
                valor: 1.7,
                variacao: "c"
            },
            {
                id: 8,
                valor: 95,
                variacao: "n"
            },
            {
                id: 9,
                valor: 0.5,
                variacao: "n"
            },
            {
                id: 10,
                valor: 1.5,
                variacao: "c"
            },
            {
                id: 11,
                valor: 3.1,
                variacao: "d"
            },
            {
                id: 12,
                valor: 95,
                variacao: "c"
            },
            {
                id: 13,
                valor: 0.4,
                variacao: "n"
            },
            {
                id: 14,
                valor: 0.6,
                variacao: "c"
            }
        ]        
    }
]
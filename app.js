const { useState } = React;
const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } = Recharts;

const PerformanceCharts = () => {
  const [activeTab, setActiveTab] = useState('aps');

  // Datos para procesamiento APS
  const apsData = [
    {
      name: '45,000 casos',
      casos: 45000,
      tiempo: 90, // 1:30 en minutos
      tiempoHoras: '1:30'
    },
    {
      name: '200,000 casos',
      casos: 200000,
      tiempo: 360, // 6 hrs en minutos
      tiempoHoras: '6:00'
    }
  ];

  // Datos para etapa "No Considerados"
  const noConsideradosData = [
    {
      proceso: 'Antes de optimización',
      tiempo: 240, // 4 horas en minutos
      tiempoDisplay: '4:00 hrs',
      casos: 200000
    },
    {
      proceso: 'Después de optimización',
      tiempo: 0.5, // 30 segundos en minutos
      tiempoDisplay: '0:30 min',
      casos: 200000
    }
  ];

  // Datos para archivo PGU
  const pguData = [
    {
      name: '40k casos',
      casos: 40000,
      tiempo: 45,
      tiempoDisplay: '45 min',
      tipo: 'Original'
    },
    {
      name: '140k casos (original)',
      casos: 140000,
      tiempo: 70, // 1:10 en minutos
      tiempoDisplay: '1:10 hrs',
      tipo: 'Original'
    },
    {
      name: '140k casos (optimizado)',
      casos: 140000,
      tiempo: 10,
      tiempoDisplay: '10 min',
      tipo: 'Optimizado'
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return React.createElement('div', {
        className: 'bg-white p-4 border border-gray-300 rounded shadow-lg'
      }, [
        React.createElement('p', { className: 'font-semibold', key: 'label' }, label),
        React.createElement('p', { className: 'text-blue-600', key: 'casos' }, 
          `Casos: ${data.casos ? data.casos.toLocaleString() : 'N/A'}`),
        React.createElement('p', { className: 'text-green-600', key: 'tiempo' }, 
          `Tiempo: ${data.tiempoDisplay || data.tiempoHoras || `${payload[0].value} min`}`)
      ]);
    }
    return null;
  };

  const formatTime = (minutes) => {
    if (minutes < 1) {
      return `${Math.round(minutes * 60)}s`;
    } else if (minutes < 60) {
      return `${Math.round(minutes)}m`;
    } else {
      const hours = Math.floor(minutes / 60);
      const mins = Math.round(minutes % 60);
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
  };

  return React.createElement('div', {
    className: 'w-full max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg'
  }, [
    // Título principal
    React.createElement('h1', {
      className: 'text-3xl font-bold text-center mb-8 text-gray-800',
      key: 'title'
    }, '📊 Comparativo de Rendimiento del Sistema'),
    
    // Navegación por pestañas
    React.createElement('div', {
      className: 'flex justify-center mb-6',
      key: 'nav'
    }, [
      React.createElement('div', {
        className: 'bg-white rounded-lg p-1 shadow-md',
        key: 'nav-container'
      }, [
        React.createElement('button', {
          onClick: () => setActiveTab('aps'),
          className: `px-6 py-2 rounded-md transition-all ${
            activeTab === 'aps' 
              ? 'bg-blue-500 text-white shadow-md' 
              : 'text-gray-600 hover:bg-gray-100'
          }`,
          key: 'btn-aps'
        }, 'Procesamiento APS'),
        React.createElement('button', {
          onClick: () => setActiveTab('noConsiderados'),
          className: `px-6 py-2 rounded-md transition-all ${
            activeTab === 'noConsiderados' 
              ? 'bg-blue-500 text-white shadow-md' 
              : 'text-gray-600 hover:bg-gray-100'
          }`,
          key: 'btn-no'
        }, 'Etapa No Considerados'),
        React.createElement('button', {
          onClick: () => setActiveTab('pgu'),
          className: `px-6 py-2 rounded-md transition-all ${
            activeTab === 'pgu' 
              ? 'bg-blue-500 text-white shadow-md' 
              : 'text-gray-600 hover:bg-gray-100'
          }`,
          key: 'btn-pgu'
        }, 'Archivo PGU')
      ])
    ]),

    // Contenido de las pestañas (simplificado para el ejemplo)
    activeTab === 'aps' && React.createElement('div', {
      className: 'bg-white rounded-lg shadow-lg p-6 mb-6',
      key: 'aps-content'
    }, [
      React.createElement('h2', {
        className: 'text-2xl font-semibold mb-4 text-gray-700',
        key: 'aps-title'
      }, '🔄 Procesamiento APS - Tiempo por Volumen'),
      React.createElement(ResponsiveContainer, {
        width: '100%',
        height: 400,
        key: 'aps-chart'
      }, [
        React.createElement(BarChart, {
          data: apsData,
          margin: { top: 20, right: 30, left: 20, bottom: 5 },
          key: 'aps-bar-chart'
        }, [
          React.createElement(CartesianGrid, { strokeDasharray: '3 3', key: 'grid' }),
          React.createElement(XAxis, { dataKey: 'name', key: 'x-axis' }),
          React.createElement(YAxis, {
            label: { value: 'Tiempo (minutos)', angle: -90, position: 'insideLeft' },
            tickFormatter: formatTime,
            key: 'y-axis'
          }),
          React.createElement(Tooltip, { content: CustomTooltip, key: 'tooltip' }),
          React.createElement(Legend, { key: 'legend' }),
          React.createElement(Bar, {
            dataKey: 'tiempo',
            fill: '#3b82f6',
            name: 'Tiempo de procesamiento',
            radius: [4, 4, 0, 0],
            key: 'bar'
          })
        ])
      ])
    ]),

    // Resumen final
    React.createElement('div', {
      className: 'bg-white rounded-lg shadow-lg p-6',
      key: 'summary'
    }, [
      React.createElement('h2', {
        className: 'text-2xl font-semibold mb-6 text-gray-700',
        key: 'summary-title'
      }, '📋 Resumen de Mejoras de Rendimiento'),
      React.createElement('div', {
        className: 'grid grid-cols-1 md:grid-cols-3 gap-4',
        key: 'summary-grid'
      }, [
        React.createElement('div', {
          className: 'bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-lg',
          key: 'summary-aps'
        }, [
          React.createElement('h3', {
            className: 'font-semibold text-blue-800 mb-2',
            key: 'h3-aps'
          }, 'Procesamiento APS'),
          React.createElement('p', {
            className: 'text-sm text-blue-700',
            key: 'p-aps'
          }, [
            React.createElement('strong', { key: '45k' }, '45k casos:'), ' 1:30 hrs',
            React.createElement('br', { key: 'br1' }),
            React.createElement('strong', { key: '200k' }, '200k casos:'), ' 6:00 hrs',
            React.createElement('br', { key: 'br2' }),
            'Tiempo aumenta con volumen de casos'
          ])
        ]),
        React.createElement('div', {
          className: 'bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-lg',
          key: 'summary-optimized'
        }, [
          React.createElement('h3', {
            className: 'font-semibold text-green-800 mb-2',
            key: 'h3-opt'
          }, 'No Considerados'),
          React.createElement('p', {
            className: 'text-sm text-green-700',
            key: 'p-opt'
          }, [
            React.createElement('strong', { key: 'mejora' }, 'Mejora:'), ' 99.9% reducción',
            React.createElement('br', { key: 'br3' }),
            React.createElement('strong', { key: 'antes' }, 'Antes:'), ' 4 horas',
            React.createElement('br', { key: 'br4' }),
            React.createElement('strong', { key: 'despues' }, 'Después:'), ' 30 segundos'
          ])
        ]),
        React.createElement('div', {
          className: 'bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-lg',
          key: 'summary-pgu'
        }, [
          React.createElement('h3', {
            className: 'font-semibold text-purple-800 mb-2',
            key: 'h3-pgu'
          }, 'Archivo PGU'),
          React.createElement('p', {
            className: 'text-sm text-purple-700',
            key: 'p-pgu'
          }, [
            React.createElement('strong', { key: 'mejora-pgu' }, 'Mejora:'), ' 85% reducción',
            React.createElement('br', { key: 'br5' }),
            React.createElement('strong', { key: 'antes-pgu' }, 'Antes:'), ' 1:10 hrs (140k)',
            React.createElement('br', { key: 'br6' }),
            React.createElement('strong', { key: 'despues-pgu' }, 'Después:'), ' 10 min (140k)'
          ])
        ])
      ]),
      
      React.createElement('div', {
        className: 'mt-6 grid grid-cols-1 md:grid-cols-2 gap-4',
        key: 'final-summary'
      }, [
        React.createElement('div', {
          className: 'p-4 bg-gray-50 rounded-lg',
          key: 'impact'
        }, [
          React.createElement('h4', {
            className: 'font-semibold text-gray-800 mb-2',
            key: 'impact-title'
          }, '🎯 Impacto General de las Optimizaciones'),
          React.createElement('ul', {
            className: 'text-sm text-gray-700 space-y-1',
            key: 'impact-list'
          }, [
            React.createElement('li', { key: 'li1' }, '• Reducción dramática en tiempos de espera para los usuarios'),
            React.createElement('li', { key: 'li2' }, '• Mejor utilización de recursos del servidor'),
            React.createElement('li', { key: 'li3' }, '• Capacidad mejorada para manejar volúmenes altos'),
            React.createElement('li', { key: 'li4' }, '• Experiencia de usuario significativamente mejorada')
          ])
        ]),
        
        React.createElement('div', {
          className: 'p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400',
          key: 'improvements'
        }, [
          React.createElement('h4', {
            className: 'font-semibold text-orange-800 mb-2',
            key: 'improvements-title'
          }, '⚠️ Etapas por Mejorar'),
          React.createElement('div', {
            className: 'text-sm text-orange-700 space-y-1',
            key: 'improvements-content'
          }, [
            React.createElement('p', { key: 'calc-aps' }, [
              React.createElement('strong', { key: 'calc-label' }, 'Cálculo APS:'), 
              ' Actualmente tomando casi 2 horas'
            ]),
            React.createElement('p', { key: 'req-analysis' }, '• Requiere análisis y optimización'),
            React.createElement('p', { key: 'opportunity' }, '• Oportunidad de mejora significativa'),
            React.createElement('p', { key: 'priority' }, '• Prioridad alta para próximas iteraciones')
          ])
        ])
      ])
    ])
  ]);
};

// Renderizar la 
ReactDOM.render(React.createElement(PerformanceCharts), document.getElementById('root'));

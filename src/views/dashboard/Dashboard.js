import React from 'react';
import { CCard, CCardBody, CCol, CRow } from '@coreui/react';
import { CChart } from '@coreui/react-chartjs';
import 'chartjs-plugin-datalabels';

import { sales } from '../../mock/sales';

const salesTotals = sales
  .reduce((o, { year, total, ecommerce }) => {
    const occurs = o.reduce((n, item, i) => {
      return item.year === year ? i : n;
    }, -1);

    if (occurs >= 0) {
      o[occurs].total += +total;
      o[occurs].ecommerce += ecommerce;
    } else {
      const obj = {
        year,
        total,
        ecommerce,
      };
      o = o.concat([obj]);
    }

    return o;
  }, [])
  .sort((a, b) => a.year - b.year);

const Dashboard = () => {
  return (
    <CCard>
      <CCardBody>
        <CRow>
          <CCol sm="5">
            <h4 id="traffic" className="card-title mb-0">
              Resumo de Vendas
            </h4>
            <div className="small text-muted">
              Vendas Totais ao decorrer dos anos
            </div>
          </CCol>
        </CRow>
        <CChart
          type="bar"
          datasets={[
            {
              label: 'Vendas Totais',
              backgroundColor: '#3399ff',
              data: salesTotals.map(sale => sale.total),
            },
            {
              label: 'Vendas E-commerce',
              backgroundColor: '#2eb85c',
              data: salesTotals.map(sale => sale.ecommerce),
            },
          ]}
          labels={salesTotals.map(sale => sale.year)}
          options={{
            responsive: true,
            tooltips: {
              enabled: true,
            },
            maintainAspectRatio: true,
            plugins: {
              datalabels: {
                anchor: 'start',
                align: 'end',
                rotation: -90,
                labels: {
                  title: {
                    color: 'black',
                    font: {
                      weight: 'bold',
                    },
                  },
                },
              },
            },
          }}
        />
      </CCardBody>
    </CCard>
  );
};

export default Dashboard;

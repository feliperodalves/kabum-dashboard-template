import React, { useEffect, useMemo, useState } from 'react';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CSelect,
  CFormGroup,
  CLabel,
} from '@coreui/react';
import { CChart } from '@coreui/react-chartjs';
import 'chartjs-plugin-datalabels';

import { sales, years, categories } from '../../mock/sales';

const salesCategoryTotals = sales
  .reduce((o, { total, ecommerce, name }) => {
    const occurs = o.reduce((n, item, i) => {
      return item.name === name ? i : n;
    }, -1);

    if (occurs >= 0) {
      o[occurs].total += +total;
      o[occurs].ecommerce += ecommerce;
    } else {
      const obj = {
        id: name,
        total,
        ecommerce,
        name,
      };
      o = o.concat([obj]);
    }

    return o;
  }, [])
  .sort((a, b) => a.name - b.name);

const randomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const Sales = () => {
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [filteredSales, setFilteredSales] = useState(salesCategoryTotals);

  useEffect(() => {
    if (selectedCategory === '' && selectedYear === 0) {
      setFilteredSales(salesCategoryTotals);
    } else {
      setFilteredSales(
        sales
          .filter(sale =>
            selectedCategory !== '' ? sale.name === selectedCategory : sale,
          )
          .filter(sale =>
            selectedYear > 0 ? sale.year === Number(selectedYear) : sale,
          ),
      );
    }
  }, [selectedCategory, selectedYear]);

  const salesTotalByYear = useMemo(
    () => sales.filter(sale => sale.year === Number(selectedYear)),
    [selectedYear],
  );

  const salesTotalByCategory = useMemo(() => {
    const total = sales
      .filter(sale => sale.name === selectedCategory)
      .reduce((acc, sale) => acc + sale.total, 0);
    const ecommerce = sales
      .filter(sale => sale.name === selectedCategory)
      .reduce((acc, sale) => acc + sale.ecommerce, 0);
    return { total, ecommerce };
  }, [selectedCategory]);

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <CRow>
                <CCol xs="2">
                  <CFormGroup>
                    <CLabel htmlFor="year">Ano</CLabel>
                    <CSelect
                      custom
                      name="year"
                      onChange={e => setSelectedYear(e.target.value)}
                    >
                      <option value="0">Todos</option>
                      {years.map(year => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </CSelect>
                  </CFormGroup>
                </CCol>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="category">Categoria</CLabel>
                    <CSelect
                      custom
                      name="category"
                      onChange={e => setSelectedCategory(e.target.value)}
                    >
                      <option value="">Todas</option>
                      {categories.map(category => (
                        <option key={category.name} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </CSelect>
                  </CFormGroup>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>{`Resumo de Vendas - ${
              selectedCategory === '' ? 'Todas Categorias' : selectedCategory
            } - ${
              Number(selectedYear) === 0 ? 'Lifetime' : `Ano ${selectedYear}`
            }`}</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="12" md="6" xl="6">
                  <div className="legend text-center">
                    <small>
                      <sup className="px-1">
                        <CBadge shape="pill" color="success">
                          &nbsp;
                        </CBadge>
                      </sup>
                      Vendas de E-commerce (Em milhões de Dólares)
                    </small>
                  </div>
                  {filteredSales.map(sale => (
                    <div
                      className="mb-2"
                      key={
                        sale.id
                          ? sale.id
                          : `${sale.year}-${sale.name}-${sale.total}-${sale.ecommerce}`
                      }
                    >
                      <div className="legend">
                        <span>{`${sale.name}${
                          selectedCategory !== '' ? ` (${sale.year})` : ''
                        }`}</span>
                      </div>
                      <div className="progress-group mb-0">
                        <div className="progress-group-bars">
                          <CProgress
                            color="success"
                            value={sale.ecommerce}
                            max={sale.total}
                            animated
                            striped
                            showValue
                            style={{ height: '40px' }}
                          ></CProgress>
                        </div>
                      </div>
                    </div>
                  ))}
                </CCol>
                <CCol xs="12" md="6" xl="6">
                  {selectedYear > 0 && selectedCategory === '' && (
                    <>
                      <CChart
                        type="doughnut"
                        datasets={[
                          {
                            backgroundColor: salesTotalByYear.map(sale =>
                              randomColor(),
                            ),
                            data: salesTotalByYear.map(sale => sale.total),
                          },
                        ]}
                        labels={salesTotalByYear.map(sale => sale.name)}
                        options={{
                          title: {
                            display: true,
                            text: `Vendas por Categoria no Ano de ${selectedYear}`,
                            fontSize: 20,
                            fontColor: '#000',
                          },
                          tooltips: {
                            enabled: true,
                          },
                          plugins: {
                            datalabels: {
                              anchor: 'end',
                              align: 'end',
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
                      <hr className="m-4" />
                    </>
                  )}
                  {selectedCategory !== '' && selectedYear === 0 && (
                    <>
                      <CChart
                        type="bar"
                        datasets={[
                          {
                            label: 'Vendas Totais',
                            backgroundColor: '#3399ff',
                            data: [salesTotalByCategory.total],
                          },
                          {
                            label: 'Vendas E-commerce',
                            backgroundColor: '#2eb85c',
                            data: [salesTotalByCategory.ecommerce],
                          },
                        ]}
                        labels={[selectedCategory]}
                        options={{
                          title: {
                            display: true,
                            text: `Total de Vendas Acumuladas da Categoria - ${selectedCategory}`,
                            fontSize: 20,
                            fontColor: '#000',
                          },
                          tooltips: {
                            enabled: true,
                          },
                          scales: {
                            yAxes: [
                              {
                                ticks: {
                                  beginAtZero: true,
                                },
                              },
                            ],
                          },

                          plugins: {
                            datalabels: {
                              anchor: 'center',
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
                      <hr className="m-4" />
                    </>
                  )}
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Sales;

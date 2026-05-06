"use client";

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import { useTheme } from 'styled-components';
import * as S from './Charts.styles';
import CustomTooltip from './CustomTooltip';

const COLORS = ['#2563eb', '#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const BarChartComponent = ({
  data,
  isLoading,
  title,
  name,
  colors = COLORS
}) => {
  const theme = useTheme();

  if (isLoading) return <S.ChartCard>Chargement...</S.ChartCard>;
  if (!data || data.length === 0)
    return <S.ChartCard>Aucune donnée disponible.</S.ChartCard>;

  return (
    <S.ChartCard>
      <S.ChartTitle>{title}</S.ChartTitle>
      <S.ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 5 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme?.colors?.border}
            />
            <XAxis
              dataKey="label"
              stroke={theme?.colors?.text.secondary}
              interval={0}
              angle={-35}
              textAnchor="end"
              height={75}
              tick={{ fontSize: 13 }}
              tickFormatter={(value) =>
                value.length > 14 ? `${value.slice(0, 14)}...` : value
              }
            />
            <YAxis
              stroke={theme?.colors?.text.secondary}
              tick={{ fontSize: 13 }}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{
                fill: theme?.colors?.background?.secondary || 'rgba(0,0,0,0.04)',
              }}
              content={(props) => (
                <CustomTooltip
                  {...props}
                  theme={theme}
                />
              )}
            />
            <Legend 
              wrapperStyle={{
                fontSize: '13px',
                paddingBottom: '10px',
                color: theme?.colors?.text.secondary,
                fontWeight: theme?.fontWeights?.bold,
              }}
            />
            <Bar dataKey="value" name={name} radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </S.ChartContainer>
    </S.ChartCard>
  );
}

export default BarChartComponent
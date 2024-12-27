import React from 'react';

interface MonthSelectorProps {
    selectedMonth: number;
    onMonthChange: (month: number) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({ selectedMonth, onMonthChange }) => {
    const months = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ];

    return (
        <select
            className="rounded border border-borderColor bg-background p-0 text-textSecondary md:px-2 md:py-1 md:text-sm"
            value={selectedMonth}
            onChange={(e) => onMonthChange(+e.target.value)}
        >
            {months.map((month, i) => (
                <option key={i} value={i + 1}>
                    {month}
                </option>
            ))}
        </select>
    );
};

export default MonthSelector;

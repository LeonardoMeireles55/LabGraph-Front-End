import React, { useState } from 'react';
import { ListingTableProps } from '../types/ListiningTable';


const ListingTable: React.FC<ListingTableProps> = ({ items }) => {

    const ITEMS_PER_PAGE = 12;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

    const currentItems = items.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="flex flex-col justify-between h-full w-full">
            <table className="hidden rounded-lg border border-double border-textSecondary bg-background shadow-md md:table">
                <thead className="bg-muted">
                    <tr>
                        <th className="border-b border-border px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-textSecondary md:text-xs">
                            Teste
                        </th>
                        <th className="border-b border-border px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-textSecondary md:text-xs">
                            Nível
                        </th>
                        <th className="border-b border-border px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-textSecondary md:text-xs">
                            Desvio Padrão
                        </th>
                        <th className="border-b border-border px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-textSecondary md:text-xs">
                            Média
                        </th>
                        <th className="border-b border-border px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-textSecondary md:text-xs">
                            Data
                        </th>
                        <th className="border-b border-border px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-textSecondary md:text-xs">
                            Valores
                        </th>
                        <th className="border-b border-border px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-textSecondary md:text-xs">
                            Unidade
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={index} className="transition-colors duration-200 hover:bg-muted">
                            <td className="border-b border-border px-4 py-3 text-[6px] text-textPrimary md:text-sm">
                                {item.name}
                            </td>
                            <td className="border-b border-border px-4 py-3 text-[6px] text-textPrimary md:text-sm">
                                {item.level}
                            </td>
                            <td className="border-b border-border px-4 py-3 text-[6px] text-textPrimary md:text-sm">
                                {item.sd.toFixed(2)}
                            </td>
                            <td className="border-b border-border px-4 py-3 text-[6px] text-textPrimary md:text-sm">
                                {item.mean.toFixed(2)}
                            </td>
                            <td className="border-b border-border px-4 py-3 text-[6px] text-textPrimary md:text-sm">
                                {item.date}
                            </td>
                            <td className="border-b border-border px-4 py-3 text-[6px] text-textPrimary md:text-sm">
                                {item.value.toFixed(2)}
                            </td>
                            <td className="border-b border-border px-4 py-3 text-[6px] text-textPrimary md:text-sm">
                                {item.unit_value}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="grid gap-4 px-2 grid-cols-4 text-center justify-center content-center md:hidden">
                {currentItems.map((item, index) => (
                    <div key={index} className="rounded-md border border-border bg-surface p-2 shadow-md">
                        <p className="text-[6px] font-semibold text-textSecondary">
                            Teste: <span className="text-textPrimary">{item.name}</span>
                        </p>
                        <p className="text-[6px] font-semibold text-textSecondary">
                            Nível: <span className="text-textPrimary">{item.level}</span>
                        </p>
                        <p className="text-[6px] font-semibold text-textSecondary">
                            Desvio Padrão: <span className="text-textPrimary">{item.sd.toFixed(2)}</span>
                        </p>
                        <p className="text-[6px] font-semibold text-textSecondary">
                            Média: <span className="text-textPrimary">{item.mean.toFixed(2)}</span>
                        </p>
                        <p className="text-[6px] font-semibold text-textSecondary">
                            Data: <span className="text-textPrimary">{item.date}</span>
                        </p>
                        <p className="text-[6px] font-semibold text-textSecondary">
                            Valores: <span className="text-textPrimary">{item.value.toFixed(2)}</span>
                        </p>
                        <p className="text-[6px] font-semibold text-textSecondary">
                            Unidade: <span className="text-textPrimary">{item.unit_value}</span>
                        </p>
                    </div>
                ))}
            </div>

            {items.length === 0 && <div className="bg-background py-2 text-center text-muted">No items to display</div>}

            <div className="mt-8 md:mt-6 flex items-center justify-center space-x-2">
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="hover:bg-primaryDark rounded-md bg-muted bg-opacity-100 px-4 py-2 text-xs text-white transition-colors disabled:cursor-not-allowed disabled:opacity-25 md:text-base"
                >
                    &larr;
                </button>
                <span className="text-xs text-textSecondary">
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="hover:bg-primaryDark rounded-md bg-border bg-opacity-100 px-4 py-2 text-xs text-white transition-colors disabled:cursor-not-allowed disabled:opacity-25 md:text-base"
                >
                    &rarr;
                </button>
            </div>
        </div>
    );
};

export default ListingTable;

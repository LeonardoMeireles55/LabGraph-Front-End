import React, { useState } from 'react';

interface ListingItem {
    name: string;
    level: number;
    sd: number;
    mean: number;
    date: string;
    value: number;
    unit_value: string;
}

interface ListingTableProps {
    items: ListingItem[];
}

const ListingTable: React.FC<ListingTableProps> = ({ items }) => {
    const ITEMS_PER_PAGE = 12; // Itens por página
    const [currentPage, setCurrentPage] = useState(1);

    // Cálculo do total de páginas
    const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

    // Determina os itens da página atual
    const currentItems = items.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Manipuladores de navegação
    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="w-full h-full md:mt-8">
            {/* Tabela no desktop */}
            <table className="w-full border border-double border-textSecondary bg-background shadow-md rounded-lg hidden md:table">
                <thead className="bg-muted ">
                    <tr>
                        <th className="px-4 py-2 text-left text-[10px] md:text-xs font-semibold text-textSecondary uppercase tracking-wider border-b border-border">
                            Teste
                        </th>
                        <th className="px-4 py-2 text-left text-[10px] md:text-xs font-semibold text-textSecondary uppercase tracking-wider border-b border-border">
                            Nível
                        </th>
                        <th className="px-4 py-2 text-left text-[10px] md:text-xs font-semibold text-textSecondary uppercase tracking-wider border-b border-border">
                            Desvio Padrão
                        </th>
                        <th className="px-4 py-2 text-left text-[10px] md:text-xs font-semibold text-textSecondary uppercase tracking-wider border-b border-border">
                            Médio
                        </th>
                        <th className="px-4 py-2 text-left text-[10px] md:text-xs font-semibold text-textSecondary uppercase tracking-wider border-b border-border">
                            Data
                        </th>
                        <th className="px-4 py-2 text-left text-[10px] md:text-xs font-semibold text-textSecondary uppercase tracking-wider border-b border-border">
                            Valores
                        </th>
                        <th className="px-4 py-2 text-left text-[10px] md:text-xs font-semibold text-textSecondary uppercase tracking-wider border-b border-border">
                            Unidade
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr
                            key={index}
                            className="hover:bg-textSecondary hover:bg-opacity-5 transition-colors duration-200"
                        >
                            <td className="px-4 py-3 text-[6px] md:text-sm text-textPrimary border-b border-border">{item.name}</td>
                            <td className="px-4 py-3 text-[6px] md:text-sm text-textPrimary border-b border-border">{item.level}</td>
                            <td className="px-4 py-3 text-[6px] md:text-sm text-textPrimary border-b border-border">{item.sd.toFixed(2)}</td>
                            <td className="px-4 py-3 text-[6px] md:text-sm text-textPrimary border-b border-border">{item.mean.toFixed(2)}</td>
                            <td className="px-4 py-3 text-[6px] md:text-sm text-textPrimary border-b border-border">{item.date}</td>
                            <td className="px-4 py-3 text-[6px] md:text-sm text-textPrimary border-b border-border">{item.value.toFixed(2)}</td>
                            <td className="px-4 py-3 text-[6px] md:text-sm text-textPrimary border-b border-border">{item.unit_value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Cards no mobile */}
            <div className="md:hidden h-full grid grid-cols-2 gap-2 mt-4">
                {currentItems.map((item, index) => (
                    <div
                        key={index}
                        className="bg-surface border border-border rounded-lg shadow-md p-4"
                    >
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

            {/* Mensagem quando não houver itens */}
            {items.length === 0 && (
                <div className="text-center py-4 text-muted bg-background">
                    No items to display
                </div>
            )}

            <div className="flex justify-center items-center mt-8 space-x-2">
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-xs md:text-base bg-textSecondary bg-opacity-50 text-white rounded-md hover:bg-primaryDark disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                >
                    &larr; {/* Seta para a esquerda */}
                </button>
                <span className="text-xs text-textSecondary">
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-xs md:text-base bg-textSecondary bg-opacity-50 text-white  rounded-md hover:bg-primaryDark disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                >
                    &rarr; {/* Seta para a direita */}
                </button>
            </div>
        </div>
    );
};

export default ListingTable;

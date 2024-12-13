const GetStatusMessage = (statusCode: number): string => {
    const statusMap: Record<number, string> = {
        200: 'Requisição bem-sucedida',
        201: 'Recurso criado com sucesso',
        204: 'Requisição concluída sem conteúdo',
        400: 'Requisição inválida ou mal formatada',
        401: 'Autenticação necessária',
        403: 'Acesso proibido',
        404: 'Recurso não encontrado',
        408: 'Tempo de requisição esgotado',
        409: 'Valores ja existentes no banco de dados.',
        429: 'Muitas requisições',
        500: 'Erro interno do servidor',
        502: 'Erro de gateway',
        503: 'Serviço indisponível',
        504: 'Tempo de gateway esgotado'
    };

    return statusMap[statusCode] || 'Status HTTP desconhecido';
};

export default GetStatusMessage;
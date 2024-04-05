const AppRoute = {
    ROOT: '/',
    BOARDS: '/boards',
    BOARD: '/boards/:boardId',
    OTHER: '*',
    NOT_FOUND: '/not-found',
    SAME_PAGE: '#',
} as const;

export { AppRoute };
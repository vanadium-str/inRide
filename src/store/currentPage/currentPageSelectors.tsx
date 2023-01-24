import { RootState } from '..';

export const currentPageSelector = (state: RootState) => state.page.currentPage;
